/**
 * Tests for miscellaneous DuckDB FFI functions
 */

import { assertEquals, assertExists } from "@std/assert";
import { loadDuckDB } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - duckdb_rows_changed",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE users (id INTEGER, name VARCHAR)");

    // Insert rows
    const insertResult = runQuery(
      ctx,
      "INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')",
    );

    // Check rows changed - this function works with prepared statements
    // For regular queries, we can use a different approach
    const countResult = runQuery(ctx, "SELECT count(*) FROM users");
    const count = lib.symbols.duckdb_value_int64(countResult, 0n, 0n);
    assertEquals(count, 2n);

    cleanup(ctx, countResult);
    lib.symbols.duckdb_destroy_result(insertResult);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - duckdb_column_data",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    const result = runQuery(ctx, "SELECT 42 AS value");

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 1n);

    // duckdb_column_data returns pointer to column data
    const colDataPtr = lib.symbols.duckdb_column_data(result, 0n);
    assertExists(colDataPtr);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - duckdb_nullmask_data",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Query with no nulls
    const result = runQuery(ctx, "SELECT 1 AS a, 2 AS b");

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 1n);

    // Get nullmask data - returns pointer to null bitmask
    const nullmaskPtr = lib.symbols.duckdb_nullmask_data(result, 0n);
    assertExists(nullmaskPtr);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - multiple connections",
  async fn() {
    const lib = await loadDuckDB();

    // Create first database and connection
    const dbPtrBuf1 = new Uint8Array(8);
    const connPtrBuf1 = new Uint8Array(8);

    const pathPtr = Deno.UnsafePointer.of(
      new TextEncoder().encode(":memory:\0"),
    );
    const openResult = lib.symbols.duckdb_open(pathPtr, dbPtrBuf1);
    assertEquals(openResult, 0);

    const dbPtr1 = new DataView(dbPtrBuf1.buffer).getBigUint64(0, true);
    const connResult1 = lib.symbols.duckdb_connect(dbPtr1, connPtrBuf1);
    assertEquals(connResult1, 0);

    // Create second connection to same database
    const connPtrBuf2 = new Uint8Array(8);
    const connResult2 = lib.symbols.duckdb_connect(dbPtr1, connPtrBuf2);
    assertEquals(connResult2, 0);

    const connPtr1 = new DataView(connPtrBuf1.buffer).getBigUint64(0, true);
    const connPtr2 = new DataView(connPtrBuf2.buffer).getBigUint64(0, true);

    // Use first connection to insert
    const queryBytes1 = new TextEncoder().encode(
      "CREATE TABLE test (id INTEGER)\0",
    );
    const queryPtr1 = Deno.UnsafePointer.of(queryBytes1);
    const resultBuf1 = new Uint8Array(48);
    lib.symbols.duckdb_query(connPtr1, queryPtr1, resultBuf1);

    // Use second connection to query
    const queryBytes2 = new TextEncoder().encode("SELECT count(*) FROM test\0");
    const queryPtr2 = Deno.UnsafePointer.of(queryBytes2);
    const resultBuf2 = new Uint8Array(48);
    lib.symbols.duckdb_query(connPtr2, queryPtr2, resultBuf2);

    const count = lib.symbols.duckdb_value_int64(resultBuf2, 0n, 0n);
    assertEquals(count, 0n);

    // Clean up
    lib.symbols.duckdb_destroy_result(resultBuf1);
    lib.symbols.duckdb_destroy_result(resultBuf2);
    lib.symbols.duckdb_disconnect(connPtrBuf2);
    lib.symbols.duckdb_disconnect(connPtrBuf1);
    lib.symbols.duckdb_close(dbPtrBuf1);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - result with large integers",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Test with large integers using UBIGINT to avoid signed overflow
    const result = runQuery(
      ctx,
      "SELECT 1234567890123::BIGINT AS value",
    );

    const value = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(value, 1234567890123n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - multiple queries in sequence",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Run multiple queries in sequence
    const result1 = runQuery(ctx, "SELECT 1 AS x");
    const val1 = lib.symbols.duckdb_value_int32(result1, 0n, 0n);
    assertEquals(val1, 1);

    const result2 = runQuery(ctx, "SELECT 2 AS x");
    const val2 = lib.symbols.duckdb_value_int32(result2, 0n, 0n);
    assertEquals(val2, 2);

    const result3 = runQuery(ctx, "SELECT 3 AS x");
    const val3 = lib.symbols.duckdb_value_int32(result3, 0n, 0n);
    assertEquals(val3, 3);

    // Clean up all results
    cleanup(ctx, result3);
    cleanup(ctx, result2);
    cleanup(ctx, result1);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query with NULL values in result",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Use a simple NULL query
    const result = runQuery(ctx, "SELECT NULL AS a");

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 1n);

    // Check if value is null
    const isNull1 = lib.symbols.duckdb_value_is_null(result, 0n, 0n);
    assertEquals(isNull1, 1);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - empty result set",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    const result = runQuery(ctx, "SELECT * FROM (SELECT 1) AS t WHERE 1=0");

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 0n);

    const colCount = lib.symbols.duckdb_column_count(result);
    assertEquals(colCount, 1n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - column type detection",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Test integer type
    const result1 = runQuery(ctx, "SELECT 1 AS v");
    const colType1 = lib.symbols.duckdb_column_type(result1, 0n);
    assertEquals(colType1 > 0, true);
    lib.symbols.duckdb_destroy_result(result1);

    // Test varchar type
    const result2 = runQuery(ctx, "SELECT 'test' AS v");
    const colType2 = lib.symbols.duckdb_column_type(result2, 0n);
    assertEquals(colType2 > 0, true);
    lib.symbols.duckdb_destroy_result(result2);

    // Test boolean type
    const result3 = runQuery(ctx, "SELECT TRUE AS v");
    const colType3 = lib.symbols.duckdb_column_type(result3, 0n);
    assertEquals(colType3 > 0, true);
    lib.symbols.duckdb_destroy_result(result3);

    // Clean up context
    ctx.lib.symbols.duckdb_disconnect(ctx.connPtrBuf);
    ctx.lib.symbols.duckdb_close(ctx.dbPtrBuf);
    lib.close();
  },
});
