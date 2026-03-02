#!/usr/bin/env -S deno run -A

/**
 * DuckDB Download Script
 *
 * Downloads the DuckDB CLI from GitHub releases based on the version
 * specified in deno.json.
 */

import {
  DEFAULT_OUTPUT_DIR,
  download,
  getArch,
  getDuckDBVersion,
  getPlatform,
  getRelease,
} from "../src/download.ts";

interface CliArgs {
  output?: string;
  help?: boolean;
}

/** Parse command line arguments */
function parseArgs(): CliArgs {
  const args: CliArgs = {};
  const rawArgs = Deno.args;

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "-o" || arg === "--output") {
      args.output = rawArgs[++i];
    } else if (arg === "-h" || arg === "--help") {
      args.help = true;
    }
  }

  return args;
}

/** Show usage information */
function showHelp() {
  console.log(`DuckDB Download Script

Downloads DuckDB library from GitHub releases.

Usage: deno run -A tools/download_duckdb.ts [options]

Options:
  -o, --output <dir>  Output directory (default: ./libduckdb)
  -h, --help          Show this help message

The version is read from deno.json.`);
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    return;
  }

  const outputDir = args.output ?? DEFAULT_OUTPUT_DIR;

  console.log("DuckDB Download Script");
  console.log("======================");

  // Get version from deno.json
  const version = await getDuckDBVersion();
  console.log(`Version: ${version}`);

  // Determine platform and arch
  const platform = getPlatform();
  const arch = getArch();
  console.log(`Platform: ${platform} (${Deno.build.os})`);
  console.log(`Arch: ${arch} (${Deno.build.arch})`);

  // Get release info
  console.log(`Fetching release v${version}...`);
  const release = await getRelease(version);

  console.log(`Found release: ${release.html_url}`);

  // Use the download helper
  const libraryPath = await download({ output: outputDir });

  console.log("");
  console.log(`DuckDB library downloaded to: ${outputDir}`);
  console.log(`Library: ${libraryPath}`);
  console.log("Done!");
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("Error:", err.message);
    Deno.exit(1);
  });
}
