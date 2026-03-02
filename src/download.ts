/**
 * DuckDB Download Helper
 *
 * Core downloading and extraction logic that can be used programmatically.
 */

import { DUCKDB_VERSION } from "./mod.ts";

export const DEFAULT_OUTPUT_DIR = `${Deno.cwd()}/libduckdb`;

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
function findAsset(
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

/** Download file to path with basic validation */
async function downloadFile(
  url: string,
  destPath: string,
): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download: ${response.status} ${response.statusText}`,
    );
  }

  // Validate Content-Type is a valid archive format
  const contentType = response.headers.get("content-type");
  if (
    contentType &&
    !contentType.includes("zip") &&
    !contentType.includes("octet-stream") &&
    !contentType.includes("gzip")
  ) {
    // Could be HTML error page - log warning but proceed
    console.warn(`Unexpected Content-Type: ${contentType}`);
  }

  // Get expected size if available
  const contentLength = response.headers.get("content-length");

  const file = await Deno.open(destPath, { create: true, write: true });
  let bytesWritten = 0;

  await response.body?.pipeTo(
    new WritableStream({
      async write(chunk) {
        await file.write(chunk);
        bytesWritten += chunk.length;
      },
      close() {
        file.close();
      },
    }),
  );

  // Validate size if Content-Length was provided
  if (contentLength && parseInt(contentLength) !== bytesWritten) {
    throw new Error(
      `Downloaded file size mismatch: expected ${contentLength}, got ${bytesWritten}`,
    );
  }
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/** Download with retry logic */
async function downloadWithRetry(
  url: string,
  destPath: string,
  attempt = 1,
): Promise<void> {
  try {
    await downloadFile(url, destPath);
  } catch (error) {
    if (attempt >= MAX_RETRIES) {
      throw error;
    }
    console.warn(
      `Download attempt ${attempt} failed, retrying in ${
        RETRY_DELAY_MS * attempt
      }ms...`,
    );
    await new Promise((resolve) =>
      setTimeout(resolve, RETRY_DELAY_MS * attempt)
    );
    await downloadWithRetry(url, destPath, attempt + 1);
  }
}

/** Validate downloaded file is actually a ZIP or gzip archive */
async function validateArchive(archivePath: string): Promise<void> {
  const fileInfo = await Deno.stat(archivePath);

  // File too small to be valid - could be error page
  if (fileInfo.size < 1000) {
    const content = await Deno.readTextFile(archivePath);
    if (content.includes("<html") || content.includes("<!DOCTYPE")) {
      throw new Error(
        `Downloaded file is HTML, not a ZIP. Check GitHub API rate limits.`,
      );
    }
  }

  // Validate ZIP signature (PK\x03\x04) or gzip signature (0x1f 0x8b)
  const header = new Uint8Array(4);
  const file = await Deno.open(archivePath);
  await file.read(header);
  await file.close();

  const isZip = header[0] === 0x50 &&
    header[1] === 0x4B &&
    header[2] === 0x03 &&
    header[3] === 0x04;
  const isGzip = header[0] === 0x1f && header[1] === 0x8b;

  if (!isZip && !isGzip) {
    throw new Error(
      `Downloaded file is not a valid ZIP or gzip archive. File header: ${
        header[0].toString(16)
      } ${header[1].toString(16)}`,
    );
  }
}

/** Extract ZIP file */
async function extractZip(
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
async function extractGz(
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
function listExtractedFiles(
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

interface DownloadOptions {
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
  const version = options.version ?? DUCKDB_VERSION;

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

  // Download with retry
  const tempDir = await Deno.makeTempDir();
  const ext = downloadUrl.endsWith(".gz") ? ".gz" : ".zip";
  const archivePath = `${tempDir}/duckdb${ext}`;

  await downloadWithRetry(downloadUrl, archivePath);

  // Validate downloaded file is a valid archive
  await validateArchive(archivePath);

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
