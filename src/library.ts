/**
 * Library loading and management for DuckDB
 */

import {
  dirExists,
  getCommonLibPaths,
  getPlatformLibName,
  pathExists,
} from "@ggpwnkthx/libclang";
import {
  open as openFFI,
  symbols as symbolDefs,
} from "./ffi.ts";
import { DEFAULT_OUTPUT_DIR, download } from "./download.ts";

// Use any for loaded symbols to allow calling them without type issues
// deno-lint-ignore no-explicit-any
type DuckDBSymbols = any;

// Global state
let lib: Deno.DynamicLibrary<typeof symbolDefs> | null = null;
let loadedSymbols: DuckDBSymbols | null = null;

/**
 * Get the default library path based on OS
 */
function getDefaultPath(): string {
  return getPlatformLibName("libduckdb");
}

/**
 * Get the default download location for libraries
 */
function getDefaultLibPath(): string {
  return DEFAULT_OUTPUT_DIR;
}

/**
 * Find a library by searching common locations
 */
function findLibrary(
  libName: string,
  customPaths?: string[],
): string | null {
  const platformLibName = getPlatformLibName(libName);
  const searchPaths: string[] = [];

  // 1. Add custom paths first
  if (customPaths) {
    for (const p of customPaths) {
      if (dirExists(p)) {
        searchPaths.push(`${p}/${platformLibName}`);
      } else {
        searchPaths.push(p);
      }
    }
  }

  // 2. Check default download location first
  const defaultLibDir = getDefaultLibPath();
  if (dirExists(defaultLibDir)) {
    searchPaths.push(`${defaultLibDir}/${platformLibName}`);
  }

  // 3. Also check with just the lib name in the default directory
  searchPaths.push(`${defaultLibDir}/${libName}.so`);
  searchPaths.push(`${defaultLibDir}/${libName}.dylib`);
  searchPaths.push(`${defaultLibDir}/${libName}.dll`);

  // 4. Check common system paths
  const commonPaths = getCommonLibPaths();
  for (const basePath of commonPaths) {
    if (basePath.includes("*")) {
      continue;
    }
    if (dirExists(basePath)) {
      searchPaths.push(`${basePath}/${platformLibName}`);
      searchPaths.push(`${basePath}/${libName}.so.1`);
      searchPaths.push(`${basePath}/${libName}.so.0`);
    }
  }

  // 5. Try system default library paths
  if (Deno.build.os === "linux") {
    searchPaths.push(`/usr/lib/${platformLibName}`);
    searchPaths.push(`/usr/local/lib/${platformLibName}`);
    searchPaths.push(`/usr/lib64/${platformLibName}`);
    searchPaths.push(`/lib/${platformLibName}`);
    searchPaths.push(`/lib64/${platformLibName}`);
  } else if (Deno.build.os === "darwin") {
    searchPaths.push(`/usr/lib/${platformLibName}`);
    searchPaths.push(`/usr/local/lib/${platformLibName}`);
  } else if (Deno.build.os === "windows") {
    searchPaths.push(`C:\\Windows\\System32\\${platformLibName}`);
  }

  // Search all paths
  for (const path of searchPaths) {
    if (pathExists(path)) {
      return path;
    }
  }

  return null;
}

/**
 * Load DuckDB library
 * @param libPath - Optional path to the library (if not provided, searches common locations)
 */
export function loadDuckDB(libPath?: string): void {
  if (lib !== null) return;

  let actualPath: string;

  if (libPath) {
    // Use explicit path if provided
    actualPath = libPath;
  } else {
    // Try to find the library automatically
    const foundPath = findLibrary("libduckdb");
    actualPath = foundPath || getDefaultPath();
  }

  try {
    lib = openFFI(actualPath);
    loadedSymbols = lib.symbols;
  } catch (e) {
    throw new Error(`Failed to load DuckDB from ${actualPath}: ${e}`);
  }
}

/**
 * Load DuckDB library, downloading it automatically if not found
 * @param libPath - Optional explicit path to the library
 * @returns The path to the library that was loaded
 */
export async function loadOrDownloadDuckDB(libPath?: string): Promise<string> {
  if (lib !== null) {
    return findLibrary("libduckdb") || getDefaultPath();
  }

  let actualPath: string;

  if (libPath) {
    // Use explicit path if provided
    actualPath = libPath;
  } else {
    // Try to find the library automatically
    const foundPath = findLibrary("libduckdb");
    if (foundPath) {
      actualPath = foundPath;
    } else {
      // Download the library as fallback
      console.log("DuckDB library not found, downloading...");
      actualPath = await download({ output: DEFAULT_OUTPUT_DIR });
    }
  }

  try {
    lib = openFFI(actualPath);
    loadedSymbols = lib.symbols;
  } catch (e) {
    throw new Error(`Failed to load DuckDB from ${actualPath}: ${e}`);
  }

  return actualPath;
}

/**
 * Unload DuckDB library
 */
export function unloadDuckDB(): void {
  if (lib !== null) {
    lib.close();
    lib = null;
    loadedSymbols = null;
  }
}

/**
 * Get loaded symbols
 * @returns The loaded DuckDB symbols
 * @throws Error if library not loaded
 */
export function getSymbols(): DuckDBSymbols {
  if (!loadedSymbols) {
    loadDuckDB(); // Auto-load with default path
  }
  return loadedSymbols!;
}

/**
 * Get the library version
 * @returns The DuckDB library version string
 */
export function getVersion(): string {
  const sym = getSymbols();
  const versionPtr = sym.duckdb_library_version();
  if (!versionPtr) return "";

  const view = new Deno.UnsafePointerView(versionPtr);
  return view.getCString();
}

// Re-export from shared utils for backwards compatibility
export { cstringToPtr, ptrToCString } from "@ggpwnkthx/libclang";
