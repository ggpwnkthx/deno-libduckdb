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
import {
  getSystemLibPaths,
  LIBRARY_CANDIDATES,
  LIBRARY_NAME,
} from "./constants.ts";
import { DEFAULT_OUTPUT_DIR, download } from "./download.ts";
import { info } from "./logger.ts";
export {
  assertHandleBuffer,
  createHandleBuffer,
  HANDLE_SIZE,
  readHandle,
  writeHandle,
} from "./handles.ts";

/** The DuckDB version this binding targets */
export const DUCKDB_VERSION = "1.4.4";

/**
 * Find a library by searching common locations
 *
 * @param libName - The name of the library to find (e.g., "libduckdb")
 * @param customPaths - Optional array of custom paths to search first
 * @returns The path to the library if found, or null if not found
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

  // 3. Also check with just the lib name in the default directory using candidates
  for (const candidate of LIBRARY_CANDIDATES) {
    searchPaths.push(`${defaultLibDir}/${candidate}`);
  }

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

  // 5. Try system default library paths using centralized constant
  const systemPaths = getSystemLibPaths();
  for (const sysPath of systemPaths) {
    searchPaths.push(`${sysPath}/${platformLibName}`);
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
 * @param signal - Optional AbortSignal to cancel the operation
 * @returns The loaded DuckDB library
 */
export async function load(
  libPath?: string,
  signal?: AbortSignal,
): Promise<Deno.DynamicLibrary<typeof symbols>> {
  // Check if already aborted
  if (signal?.aborted) {
    throw new DOMException("Load operation was aborted", "AbortError");
  }
  // Validate libPath if provided
  if (libPath !== undefined && typeof libPath !== "string") {
    throw new TypeError("libPath must be a string if provided");
  }

  let actualPath: string;

  if (libPath) {
    // Use explicit path if provided
    actualPath = libPath;
  } else {
    // Try to find the library automatically using centralized constant
    const foundPath = findLibrary(LIBRARY_NAME);
    if (foundPath) {
      actualPath = foundPath;
    } else {
      // Download the library as fallback
      info("DuckDB library not found, downloading...");
      actualPath = await download({ output: DEFAULT_OUTPUT_DIR, signal });
    }
  }

  // Check again after download
  if (signal?.aborted) {
    throw new DOMException("Load operation was aborted", "AbortError");
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

/**
 * Convert a C string pointer to a JavaScript string and automatically free the memory.
 *
 * This is a convenience wrapper around `cstringToPtr` that handles memory cleanup.
 * Use this for string values returned from DuckDB (e.g., via `duckdb_value_varchar`)
 * that need to be freed with `duckdb_free()`.
 *
 * @param lib - The loaded DuckDB library
 * @param ptr - Pointer to the C string (from DuckDB API)
 * @returns JavaScript string, or null if ptr is null
 * @example
 * ```ts
 * const lib = await load();
 * const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
 * const str = ptrToCStringAndFree(lib, ptr);
 * ```
 */
export function ptrToCStringAndFree(
  lib: Deno.DynamicLibrary<typeof symbols>,
  ptr: Deno.PointerValue<unknown>,
): string | null {
  if (!ptr) return null;

  const view = new Deno.UnsafePointerView(ptr);
  const str = view.getCString();

  // Free the memory allocated by DuckDB
  lib.symbols.duckdb_free(ptr);

  return str;
}
