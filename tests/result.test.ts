/**
 * Tests for DuckDB FFI result value extraction
 */

import { assertEquals, assertExists } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - value extraction: int32",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 42 AS value");

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    const colCount = lib.symbols.duckdb_column_count(resultBuf);
    assertEquals(rowCount, 1n);
    assertEquals(colCount, 1n);

    const value = lib.symbols.duckdb_value_int32(resultBuf, 0n, 0n);
    assertEquals(value, 42);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: int64",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT 9223372036854775807::BIGINT AS value",
    );

    const value = lib.symbols.duckdb_value_int64(resultBuf, 0n, 0n);
    assertEquals(value, 9223372036854775807n);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: uint32",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 4294967295::UINTEGER AS value");

    const value = lib.symbols.duckdb_value_uint32(resultBuf, 0n, 0n);
    assertEquals(value, 4294967295);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: uint64",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT 18446744073709551615::UBIGINT AS value",
    );

    const value = lib.symbols.duckdb_value_uint64(resultBuf, 0n, 0n);
    assertEquals(value, 18446744073709551615n);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: float",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 3.14::FLOAT AS value");

    const value = lib.symbols.duckdb_value_float(resultBuf, 0n, 0n);
    // Use approximate comparison for floats
    assertEquals(Math.fround(value), Math.fround(3.14));

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: double",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 3.14159265358979::DOUBLE AS value");

    const value = lib.symbols.duckdb_value_double(resultBuf, 0n, 0n);
    assertEquals(value, 3.14159265358979);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: varchar",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 'hello world' AS value");

    const ptr = lib.symbols.duckdb_value_varchar(resultBuf, 0n, 0n);
    assertExists(ptr);
    const value = new Deno.UnsafePointerView(ptr).getCString();
    assertEquals(value, "hello world");

    // Free the string (duckdb_value_varchar returns allocated memory)
    lib.symbols.duckdb_free(ptr);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: boolean",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT TRUE AS value");

    const value = lib.symbols.duckdb_value_boolean(resultBuf, 0n, 0n);
    assertEquals(value, 1);

    lib.symbols.duckdb_destroy_result(resultBuf);

    const resultBuf2 = runQuery(ctx, "SELECT FALSE AS value");
    const value2 = lib.symbols.duckdb_value_boolean(resultBuf2, 0n, 0n);
    assertEquals(value2, 0);

    cleanup(ctx, resultBuf2);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: null handling",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT NULL AS value");

    // Check if value is null
    const isNull = lib.symbols.duckdb_value_is_null(resultBuf, 0n, 0n);
    assertEquals(isNull, 1);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - column metadata: column_name",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 42 AS my_column");

    const namePtr = lib.symbols.duckdb_column_name(resultBuf, 0n);
    assertExists(namePtr);
    const name = new Deno.UnsafePointerView(namePtr).getCString();
    assertEquals(name, "my_column");

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - column metadata: column_type",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 42 AS value");

    // DuckDB type: INTEGER = 4
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    assertEquals(colType, 4); // INTEGER

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - column_count and row_count",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Multiple rows and columns
    const resultBuf = runQuery(ctx, "SELECT 1 AS a, 2 AS b, 3 AS c");

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    const colCount = lib.symbols.duckdb_column_count(resultBuf);

    assertEquals(rowCount, 1n);
    assertEquals(colCount, 3n);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: multiple rows",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use range function to generate multiple rows
    const resultBuf = runQuery(
      ctx,
      "SELECT * FROM range(3) AS t(x)",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 3n);

    // Just verify that accessing any row works
    const val = lib.symbols.duckdb_value_int32(resultBuf, 0n, 0n);
    // Value should be 0, 1, or 2
    assertEquals(val >= 0 && val <= 2, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});
