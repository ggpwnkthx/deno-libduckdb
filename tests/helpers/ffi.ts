/**
 * FFI Test Utilities
 *
 * Shared helpers for DuckDB FFI testing to reduce duplication across test files.
 */

import type { symbols } from "../../src/ffi/symbols.ts";
import { DUCKDB_RESULT_SIZE } from "../../src/ffi/structs.ts";

/**
 * Context object containing a loaded DuckDB library and resources
 */
export interface TestContext {
  /** The loaded DuckDB library */
  lib: Deno.DynamicLibrary<typeof symbols>;
  /** Database pointer buffer (8 bytes) */
  dbPtrBuf: Uint8Array<ArrayBuffer>;
  /** Connection pointer buffer (8 bytes) */
  connPtrBuf: Uint8Array<ArrayBuffer>;
  /** The database pointer as bigint */
  databasePtr: bigint;
  /** The connection pointer as bigint */
  connectionPtr: bigint;
}

/**
 * Result pointer buffer type
 */
export type ResultPtrBuf = Uint8Array<ArrayBuffer>;

/**
 * Create a buffer for FFI calls
 *
 * @param size - The size of the buffer in bytes
 * @returns A new Uint8Array buffer of the specified size
 */
function createBuffer(size: number): Uint8Array<ArrayBuffer> {
  return new Uint8Array(new ArrayBuffer(size));
}

/**
 * Create an in-memory DuckDB database with a connection
 *
 * @param lib - The loaded DuckDB library
 * @returns TestContext with database and connection ready
 */
export function createTestDB(
  lib: Deno.DynamicLibrary<typeof symbols>,
): TestContext {
  // Allocate buffers for pointers
  const dbPtrBuf = createBuffer(8);
  const connPtrBuf = createBuffer(8);

  // Open in-memory database
  const pathPtr = Deno.UnsafePointer.of(
    new TextEncoder().encode(":memory:\0"),
  );
  const openResult = lib.symbols.duckdb_open(pathPtr, dbPtrBuf);
  if (openResult !== 0) {
    throw new Error("Failed to open database");
  }

  // Get database pointer
  const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);

  // Connect to database
  const connectResult = lib.symbols.duckdb_connect(databasePtr, connPtrBuf);
  if (connectResult !== 0) {
    lib.symbols.duckdb_close(dbPtrBuf);
    throw new Error("Failed to connect to database");
  }

  // Get connection pointer
  const connectionPtr = new DataView(connPtrBuf.buffer).getBigUint64(0, true);

  return {
    lib,
    dbPtrBuf,
    connPtrBuf,
    databasePtr,
    connectionPtr,
  };
}

/**
 * Execute a SQL query and return the result buffer
 *
 * @param ctx - Test context with connection
 * @param sql - SQL query to execute
 * @returns Result buffer (caller must destroy)
 */
export function runQuery(
  ctx: TestContext,
  sql: string,
): ResultPtrBuf {
  const resultBuf = createBuffer(DUCKDB_RESULT_SIZE); // duckdb_result struct size

  const queryBytes = new TextEncoder().encode(sql + "\0");
  const queryPtr = Deno.UnsafePointer.of(queryBytes);

  const queryResult = ctx.lib.symbols.duckdb_query(
    ctx.connectionPtr,
    queryPtr,
    resultBuf,
  );

  if (queryResult !== 0) {
    const errorPtr = ctx.lib.symbols.duckdb_result_error(resultBuf);
    const errorMsg = errorPtr
      ? new Deno.UnsafePointerView(errorPtr).getCString()
      : "Unknown error";
    ctx.lib.symbols.duckdb_destroy_result(resultBuf);
    throw new Error(`Query failed: ${errorMsg}`);
  }

  return resultBuf;
}

/**
 * Extract a VARCHAR value from a result and free the memory
 *
 * This is a convenience wrapper that extracts a string value from a DuckDB
 * result and automatically frees the allocated memory.
 *
 * @param lib - The loaded DuckDB library
 * @param result - The result buffer
 * @param colIdx - Column index
 * @param rowIdx - Row index
 * @returns The string value, or null if the pointer is null
 */
export function getStringValue(
  lib: Deno.DynamicLibrary<typeof symbols>,
  result: ResultPtrBuf,
  colIdx: bigint,
  rowIdx: bigint,
): string | null {
  const ptr = lib.symbols.duckdb_value_varchar(result, colIdx, rowIdx);
  if (!ptr) return null;

  const value = new Deno.UnsafePointerView(ptr).getCString();
  lib.symbols.duckdb_free(ptr);

  return value;
}

/**
 * Clean up all resources
 *
 * @param ctx - Test context to clean up
 * @param resultBuf - Optional result buffer to destroy
 */
export function cleanup(
  ctx: TestContext,
  resultBuf?: ResultPtrBuf,
): void {
  // Destroy result if provided
  if (resultBuf) {
    ctx.lib.symbols.duckdb_destroy_result(resultBuf);
  }

  // Disconnect connection
  ctx.lib.symbols.duckdb_disconnect(ctx.connPtrBuf);

  // Close database
  ctx.lib.symbols.duckdb_close(ctx.dbPtrBuf);
}
