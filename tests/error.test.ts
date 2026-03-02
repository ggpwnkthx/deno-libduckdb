/**
 * Tests for DuckDB FFI error handling
 */

import { assertEquals, assertExists } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - error: result_error on failed query",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Execute an invalid query
    const resultBuf = new Uint8Array(new ArrayBuffer(48));
    const queryBytes = new TextEncoder().encode(
      "SELECT * FROM nonexistent_table\0",
    );
    const queryPtr = Deno.UnsafePointer.of(queryBytes);

    const queryResult = lib.symbols.duckdb_query(
      ctx.connectionPtr,
      queryPtr,
      resultBuf,
    );

    // Query should fail (non-zero)
    assertEquals(queryResult !== 0, true, "Query should fail");

    // Get error message
    const errorPtr = lib.symbols.duckdb_result_error(resultBuf);
    assertExists(errorPtr, "Error pointer should exist");

    const errorMsg = new Deno.UnsafePointerView(errorPtr).getCString();
    assertEquals(
      errorMsg.length > 0,
      true,
      "Error message should not be empty",
    );
    // Error should mention the table name or "not exist"
    assertEquals(
      errorMsg.includes("nonexistent_table") || errorMsg.includes("not exist"),
      true,
      `Error should mention the table or "not exist", got: ${errorMsg}`,
    );

    lib.symbols.duckdb_destroy_result(resultBuf);

    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - error: no error on success",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Execute a valid query
    const resultBuf = new Uint8Array(new ArrayBuffer(48));
    const queryBytes = new TextEncoder().encode("SELECT 1 AS value\0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);

    const queryResult = lib.symbols.duckdb_query(
      ctx.connectionPtr,
      queryPtr,
      resultBuf,
    );

    // Query should succeed
    assertEquals(queryResult, 0, "Query should succeed");

    // Get error - should be null
    const errorPtr = lib.symbols.duckdb_result_error(resultBuf);
    assertEquals(
      errorPtr === null || errorPtr === undefined,
      true,
      "Error should be null on success",
    );

    lib.symbols.duckdb_destroy_result(resultBuf);

    cleanup(ctx);
    lib.close();
  },
});
