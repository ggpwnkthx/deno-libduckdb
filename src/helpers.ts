/**
 * Helper functions for DuckDB FFI
 */

import { DuckDBError } from "./types.ts";

// Re-export from shared utils
export { createPointerBuffer, getPointer, setPointer } from "@ggpwnkthx/libclang";

/**
 * Create an error object
 */
export function createError(code: number, message: string): DuckDBError {
  return { code, message };
}
