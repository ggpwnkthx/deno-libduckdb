/**
 * Centralized constants for DuckDB library loading and downloading
 */

// Library name
export const LIBRARY_NAME = "libduckdb";

// Library file extensions by platform
export const LIBRARY_EXTENSIONS: Record<string, string[]> = {
  linux: [".so"],
  darwin: [".dylib"],
  windows: [".dll"],
};

// Library file name candidates for finding extracted libraries
export const LIBRARY_CANDIDATES = [
  "libduckdb.so",
  "libduckdb.dylib",
  "libduckdb.dll",
];

// System library search paths by platform
export const SYSTEM_LIB_PATHS: Record<string, string[]> = {
  linux: [
    "/usr/lib",
    "/usr/local/lib",
    "/usr/lib64",
    "/lib",
    "/lib64",
  ],
  darwin: [
    "/usr/lib",
    "/usr/local/lib",
  ],
  windows: ["C:\\Windows\\System32"],
};

// Default output directory name (relative)
export const DEFAULT_OUTPUT_DIR_NAME = "libduckdb";

// Default request timeout (30 seconds)
export const DEFAULT_TIMEOUT_MS = 30000;

/** Get system library search paths for the current platform
 * @returns Array of system library paths for the current platform
 */
export function getSystemLibPaths(): string[] {
  const paths = SYSTEM_LIB_PATHS[Deno.build.os];
  return paths ?? [];
}

/** Get library extensions for the current platform
 * @returns Array of library file extensions for the current platform
 */
export function getLibraryExtensions(): string[] {
  const exts = LIBRARY_EXTENSIONS[Deno.build.os];
  return exts ?? [];
}

/** Map Deno build OS to DuckDB platform string
 * @returns The DuckDB platform string (linux, osx, or windows)
 */
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

/** Map Deno build arch to DuckDB arch string
 * @returns The DuckDB arch string (amd64 or arm64)
 */
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

/** Get library file name for the current platform
 * @returns The library file name with the correct extension for the current platform
 */
export function getPlatformLibName(): string {
  const exts = getLibraryExtensions();
  return `${LIBRARY_NAME}${exts[0]}`;
}
