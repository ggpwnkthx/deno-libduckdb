/**
 * Custom Assertions for DuckDB FFI Testing
 *
 * Provides specialized assertions for common FFI patterns.
 */

import { assertEquals } from "@std/assert";

/**
 * Assert that duckdb_state is success (0)
 *
 * @param state - The duckdb_state to check
 * @param message - Optional custom error message
 */
export function assertSuccess(
  state: number,
  message = "DuckDB operation failed",
): void {
  assertEquals(state, 0, message);
}

/**
 * Assert that a pointer is valid (non-null and non-zero)
 *
 * @param ptr - The pointer value to check
 * @param message - Optional custom error message
 */
export function assertValidPointer(
  ptr: bigint,
  message = "Expected valid pointer",
): void {
  if (ptr === 0n) {
    throw new Error(message);
  }
}

/**
 * Assert that a pointer is null (zero)
 *
 * @param ptr - The pointer value to check
 * @param message - Optional custom error message
 */
export function assertNullPointer(
  ptr: bigint,
  message = "Expected null pointer",
): void {
  assertEquals(ptr, 0n, message);
}
