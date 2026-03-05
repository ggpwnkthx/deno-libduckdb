/**
 * Tests for DuckDB edge cases
 */

import { assert, assertEquals, assertExists } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "edge - NULL value handling",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table with nullable column
    runQuery(ctx, "CREATE TABLE items (id INTEGER, value INTEGER)");

    // Insert row with NULL value
    runQuery(ctx, "INSERT INTO items VALUES (1, NULL)");

    // Query and verify NULL is returned
    const result = runQuery(ctx, "SELECT value FROM items WHERE id = 1");
    const isNull = lib.symbols.duckdb_value_is_null(result, 0n, 0n);
    assert(isNull);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Empty result set",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE empty_test (id INTEGER)");
    runQuery(ctx, "INSERT INTO empty_test VALUES (1), (2)");

    // Query with no matching rows
    const result = runQuery(ctx, "SELECT * FROM empty_test WHERE id > 10");
    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 0n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Empty string handling",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE strings (id INTEGER, text VARCHAR)");
    runQuery(ctx, "INSERT INTO strings VALUES (1, '')");

    // Query empty string
    const result = runQuery(ctx, "SELECT text FROM strings WHERE id = 1");
    const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
    assertExists(ptr);

    const value = new Deno.UnsafePointerView(ptr).getCString();
    assertEquals(value, "");

    lib.symbols.duckdb_free(ptr);
    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Division by zero",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Division by zero in DuckDB returns 0 for integer division
    const result = runQuery(ctx, "SELECT 1 / 0");
    const value = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(value, 0n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Large result set (pagination)",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table with many rows
    runQuery(ctx, "CREATE TABLE numbers (value INTEGER)");

    // Insert 100 rows
    const insertValues = Array.from({ length: 100 }, (_, i) => `(${i + 1})`)
      .join(",");
    runQuery(ctx, `INSERT INTO numbers VALUES ${insertValues}`);

    // Query with LIMIT (pagination)
    const result = runQuery(ctx, "SELECT * FROM numbers LIMIT 10 OFFSET 90");
    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 10n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Special characters in strings",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table with special characters
    runQuery(ctx, "CREATE TABLE special (id INTEGER, text VARCHAR)");
    runQuery(ctx, "INSERT INTO special VALUES (1, 'Hello\\nWorld')");
    runQuery(ctx, "INSERT INTO special VALUES (2, 'Tab\\there')");
    runQuery(ctx, "INSERT INTO special VALUES (3, 'Quote\"test')");
    runQuery(ctx, "INSERT INTO special VALUES (4, 'Backslash\\\\test')");

    // Query and verify
    const result = runQuery(ctx, "SELECT text FROM special WHERE id = 1");
    const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
    assertExists(ptr);

    const value = new Deno.UnsafePointerView(ptr).getCString();
    assertEquals(value, "Hello\\nWorld");

    lib.symbols.duckdb_free(ptr);
    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Unicode handling",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table with Unicode
    runQuery(ctx, "CREATE TABLE unicode_test (id INTEGER, text VARCHAR)");
    runQuery(ctx, "INSERT INTO unicode_test VALUES (1, 'Hello 世界 🦕')");
    runQuery(ctx, "INSERT INTO unicode_test VALUES (2, '日本語テスト')");
    runQuery(ctx, "INSERT INTO unicode_test VALUES (3, '🎉🎊🎈')");

    // Query first row
    const result = runQuery(ctx, "SELECT text FROM unicode_test WHERE id = 1");
    const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
    assertExists(ptr);

    const value = new Deno.UnsafePointerView(ptr).getCString();
    assertEquals(value, "Hello 世界 🦕");

    lib.symbols.duckdb_free(ptr);
    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Transaction rollback",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE trans_test (id INTEGER, value INTEGER)");

    // Begin transaction
    runQuery(ctx, "BEGIN TRANSACTION");
    runQuery(ctx, "INSERT INTO trans_test VALUES (1, 100)");

    // Rollback
    runQuery(ctx, "ROLLBACK");

    // Verify data was rolled back - count should be 0
    const result = runQuery(ctx, "SELECT count(*) FROM trans_test");
    const count = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(count, 0n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Concurrent queries on same connection",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE concurrent (id INTEGER, value INTEGER)");
    runQuery(ctx, "INSERT INTO concurrent VALUES (1, 10), (2, 20), (3, 30)");

    // Execute multiple queries sequentially on same connection
    const result1 = runQuery(ctx, "SELECT sum(value) FROM concurrent");
    const sum = lib.symbols.duckdb_value_int64(result1, 0n, 0n);
    assertEquals(sum, 60n);

    const result2 = runQuery(ctx, "SELECT avg(value) FROM concurrent");
    const avg = lib.symbols.duckdb_value_double(result2, 0n, 0n);
    assertEquals(avg, 20.0);

    const result3 = runQuery(ctx, "SELECT count(*) FROM concurrent");
    const count = lib.symbols.duckdb_value_int64(result3, 0n, 0n);
    assertEquals(count, 3n);

    cleanup(ctx, result3);
    cleanup(ctx, result2);
    cleanup(ctx, result1);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Boundary values (INT_MIN, INT_MAX)",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE bounds (id INTEGER, value INTEGER)");
    runQuery(ctx, "INSERT INTO bounds VALUES (1, -2147483648)"); // INT_MIN
    runQuery(ctx, "INSERT INTO bounds VALUES (2, 2147483647)"); // INT_MAX
    runQuery(ctx, "INSERT INTO bounds VALUES (3, 0)");

    // Query INT_MIN
    const minResult = runQuery(ctx, "SELECT value FROM bounds WHERE id = 1");
    const minValue = lib.symbols.duckdb_value_int64(minResult, 0n, 0n);
    assertEquals(minValue, -2147483648n);

    // Query INT_MAX
    const maxResult = runQuery(ctx, "SELECT value FROM bounds WHERE id = 2");
    const maxValue = lib.symbols.duckdb_value_int64(maxResult, 0n, 0n);
    assertEquals(maxValue, 2147483647n);

    cleanup(ctx, maxResult);
    cleanup(ctx, minResult);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Float boundary values",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE float_bounds (id INTEGER, value DOUBLE)");
    runQuery(
      ctx,
      "INSERT INTO float_bounds VALUES (1, 1.7976931348623157e+308)",
    ); // MAX_DOUBLE
    runQuery(
      ctx,
      "INSERT INTO float_bounds VALUES (2, -1.7976931348623157e+308)",
    ); // MIN_DOUBLE
    runQuery(ctx, "INSERT INTO float_bounds VALUES (3, 0.0)");

    // Query max value
    const maxResult = runQuery(
      ctx,
      "SELECT value FROM float_bounds WHERE id = 1",
    );
    const maxValue = lib.symbols.duckdb_value_double(maxResult, 0n, 0n);
    assertEquals(maxValue, 1.7976931348623157e+308);

    // Query min value
    const minResult = runQuery(
      ctx,
      "SELECT value FROM float_bounds WHERE id = 2",
    );
    const minValue = lib.symbols.duckdb_value_double(minResult, 0n, 0n);
    assertEquals(minValue, -1.7976931348623157e+308);

    cleanup(ctx, minResult);
    cleanup(ctx, maxResult);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "edge - Query with only whitespace",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(ctx, "CREATE TABLE ws_test (id INTEGER)");
    runQuery(ctx, "INSERT INTO ws_test VALUES (1)");

    // Query with only whitespace - DuckDB accepts this as valid (empty query)
    const resultBuf = new Uint8Array(48);
    const queryBytes = new TextEncoder().encode("   \0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);
    const queryResult = lib.symbols.duckdb_query(
      ctx.connectionPtr,
      queryPtr,
      resultBuf,
    );

    // DuckDB returns 0 (success) for whitespace-only queries
    assertEquals(queryResult, 0);

    lib.symbols.duckdb_destroy_result(resultBuf);
    cleanup(ctx);
    lib.close();
  },
});
