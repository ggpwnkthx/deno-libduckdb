/**
 * Constants for DuckDB FFI
 */

/**
 * Buffer size for storing a pointer (8 bytes on 64-bit)
 */
export const POINTER_SIZE = 8;

/**
 * duckdb_result struct has 6 fields (u64 x 3 + pointer x 3) = 48 bytes
 */
export const RESULT_SIZE = 48;
