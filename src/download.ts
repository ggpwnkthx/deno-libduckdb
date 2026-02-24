/**
 * DuckDB Download Helper
 *
 * Core downloading and extraction logic that can be used programmatically.
 */

export const DEFAULT_OUTPUT_DIR = `${Deno.cwd()}/libduckdb`;

/** Read version from deno.json */
export async function getVersion(): Promise<string> {
  const denoJsonPath = new URL(`${Deno.cwd()}/deno.json`, import.meta.url);
  const content = await Deno.readTextFile(denoJsonPath);
  const config = JSON.parse(content);
  return config.version;
}

/** Map Deno build OS to DuckDB platform string */
export function getPlatform(): string {
  switch (Deno.build.os) {
    case "linux":
      return "linux";
    case "darwin":
      return "osx";
    case "windows":
      return "windows";
    default:
      throw new Error(`Unsupported platform: ${Deno.build.os}`);
  }
}

/** Map Deno build arch to DuckDB arch string */
export function getArch(): string {
  switch (Deno.build.arch) {
    case "x86_64":
      return "amd64";
    case "aarch64":
      return "arm64";
    default:
      throw new Error(`Unsupported architecture: ${Deno.build.arch}`);
  }
}

/** GitHub release asset */
export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

/** GitHub release response */
export interface Release {
  html_url: string;
  assets: ReleaseAsset[];
}

/** Call GitHub API to get release info */
export async function getRelease(version: string): Promise<Release> {
  const url =
    `https://api.github.com/repos/duckdb/duckdb/releases/tags/v${version}`;
  const response = await fetch(url, {
    headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch release v${version}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

/** Find matching asset in release */
export function findAsset(
  release: Release,
  platform: string,
  arch: string,
): string | null {
  const assets = release.assets;

  // Try exact match first: libduckdb-{platform}-{arch}.zip
  let pattern = `libduckdb-${platform}-${arch}.zip`;
  for (const asset of assets) {
    if (asset.name === pattern) {
      return asset.browser_download_url;
    }
  }

  // Fallback: try universal (macOS)
  if (platform === "osx" && arch !== "universal") {
    pattern = `libduckdb-${platform}-universal.zip`;
    for (const asset of assets) {
      if (asset.name === pattern) {
        return asset.browser_download_url;
      }
    }
  }

  // Fallback: try amd64 if arm64 not found
  if (arch === "arm64") {
    pattern = `libduckdb-${platform}-amd64.zip`;
    for (const asset of assets) {
      if (asset.name === pattern) {
        return asset.browser_download_url;
      }
    }
  }

  return null;
}

/** Download file to path */
export async function downloadFile(
  url: string,
  destPath: string,
): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download: ${response.status} ${response.statusText}`,
    );
  }

  const file = await Deno.open(destPath, { create: true, write: true });
  await response.body?.pipeTo(
    new WritableStream({
      write(chunk) {
        file.write(chunk);
      },
      close() {
        file.close();
      },
    }),
  );
}

/** Extract ZIP file */
export async function extractZip(
  zipPath: string,
  outputDir: string,
): Promise<string> {
  // Create output directory if it doesn't exist
  await Deno.mkdir(outputDir, { recursive: true });

  // Try using unzip command
  const unzipProc = new Deno.Command("unzip", {
    args: ["-o", zipPath, "-d", outputDir],
    stdout: "piped",
    stderr: "piped",
  });

  const unzipResult = await unzipProc.output();
  if (unzipResult.code !== 0) {
    const stderr = new TextDecoder().decode(unzipResult.stderr);
    throw new Error(`Failed to extract ZIP: ${stderr}`);
  }

  return outputDir;
}

/** Extract gz file */
export async function extractGz(
  gzPath: string,
  outputDir: string,
): Promise<string> {
  // Gunzip using command
  const decompressProc = new Deno.Command("gunzip", {
    args: ["-c", gzPath],
    stdout: "piped",
  });

  const result = await decompressProc.output();
  if (result.code !== 0) {
    throw new Error("Failed to extract gz file");
  }

  await Deno.mkdir(outputDir, { recursive: true });
  const outPath = `${outputDir}/duckdb`;
  await Deno.writeFile(outPath, result.stdout);
  await Deno.chmod(outPath, 0o755);

  return outPath;
}

/** List all extracted files and find library */
export function listExtractedFiles(
  outputDir: string,
): { library: string | null; files: string[] } {
  const allFiles: string[] = [];
  const candidates = ["libduckdb.so", "libduckdb.dylib", "libduckdb.dll"];
  let library: string | null = null;

  // Recursively collect all files
  function collectFiles(dir: string, prefix: string = "") {
    try {
      for (const entry of Deno.readDirSync(dir)) {
        const fullPath = `${dir}/${entry.name}`;
        const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
        allFiles.push(relativePath);

        if (entry.isDirectory) {
          collectFiles(fullPath, relativePath);
        } else if (entry.isFile && !library) {
          // Check if this is the library
          for (const candidate of candidates) {
            if (entry.name === candidate) {
              library = fullPath;
              break;
            }
          }
        }
      }
    } catch {
      // Ignore
    }
  }

  collectFiles(outputDir);

  // If no library found in files, try direct path
  if (!library) {
    for (const candidate of candidates) {
      const path = `${outputDir}/${candidate}`;
      try {
        const stat = Deno.statSync(path);
        if (stat.isFile) {
          library = path;
          break;
        }
      } catch {
        // Try subdirectory
      }
    }
  }

  return { library, files: allFiles };
}

export interface DownloadOptions {
  output?: string;
  version?: string;
  platform?: string;
  arch?: string;
}

/**
 * Main download function that orchestrates all steps.
 */
export async function download(options: DownloadOptions = {}): Promise<string> {
  const outputDir = options.output ?? DEFAULT_OUTPUT_DIR;

  // Get version from deno.json or use provided version
  const version = options.version ?? await getVersion();

  // Determine platform and arch (use provided or detect)
  const platform = options.platform ?? getPlatform();
  const arch = options.arch ?? getArch();

  // Get release info
  const release = await getRelease(version);

  // Find matching asset
  const downloadUrl = findAsset(release, platform, arch);
  if (!downloadUrl) {
    throw new Error(
      `No matching asset found for ${platform}-${arch}. ` +
        `Check available assets at ${release.html_url}`,
    );
  }

  // Download
  const tempDir = await Deno.makeTempDir();
  const ext = downloadUrl.endsWith(".gz") ? ".gz" : ".zip";
  const archivePath = `${tempDir}/duckdb${ext}`;

  await downloadFile(downloadUrl, archivePath);

  // Extract
  let libraryPath: string;

  if (ext === ".gz") {
    libraryPath = await extractGz(archivePath, outputDir);
  } else {
    await extractZip(archivePath, outputDir);
    const result = listExtractedFiles(outputDir);
    libraryPath = result.library ?? outputDir;
  }

  // Cleanup temp
  await Deno.remove(tempDir, { recursive: true });

  return libraryPath;
}
