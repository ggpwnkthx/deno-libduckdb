/**
 * Library loading and management for DuckDB
 */

import {
  dirExists,
  getCommonLibPaths,
  getPlatformLibName,
  pathExists,
} from "@ggpwnkthx/libclang";
import { symbols } from "./ffi/symbols.ts";
import { DEFAULT_OUTPUT_DIR, download } from "./download.ts";

/** The DuckDB version this binding targets */
export const DUCKDB_VERSION = "1.4.4";

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
  const defaultLibDir = DEFAULT_OUTPUT_DIR;
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
 * Load DuckDB library, downloading it automatically if not found
 * @param libPath - Optional explicit path to the library
 * @returns The loaded DuckDB library
 */
export async function load(
  libPath?: string,
): Promise<Deno.DynamicLibrary<typeof symbols>> {
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
    return Deno.dlopen(actualPath, symbols);
  } catch (e) {
    throw new Error(`Failed to load DuckDB from ${actualPath}: ${e}`);
  }
}

/**
 * Get the library version
 * @param lib - The loaded library
 * @returns The DuckDB library version string
 */
export function getVersion(
  lib: Deno.DynamicLibrary<typeof symbols>,
): string {
  const versionPtr = lib.symbols.duckdb_library_version();
  if (!versionPtr) return "";

  const view = new Deno.UnsafePointerView(versionPtr);
  return view.getCString();
}

/**
 * Convert a C string pointer to a JavaScript string.
 * @param ptr - Pointer to the C string
 * @returns JavaScript string
 */
export { cstringToPtr } from "@ggpwnkthx/libclang";

/**
 * Convert a JavaScript string to a C string pointer.
 * @param str - JavaScript string to convert
 * @returns Pointer to the C string
 */
export { ptrToCString } from "@ggpwnkthx/libclang";

/** The DuckDB FFI function symbols loaded from the native library */
export { symbols };
