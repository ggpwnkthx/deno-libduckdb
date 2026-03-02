/**
 * Tests for additional DuckDB FFI data types
 */

import { assertEquals, assertExists } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - value extraction: blob",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create blob from hex string
    const resultBuf = runQuery(
      ctx,
      "SELECT '\\x00\\x01\\x02\\xFF'::BLOB AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get blob value - returns pointer to duckdb_blob struct
    const blobPtr = lib.symbols.duckdb_value_blob(resultBuf, 0n, 0n);
    assertExists(blobPtr);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: date",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT '2024-01-15'::DATE AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get date value - returns duckdb_date struct (year, month, day)
    const datePtr = lib.symbols.duckdb_value_date(resultBuf, 0n, 0n);
    assertExists(datePtr);

    // Get column type to verify it's a date
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    // Date type should be a valid type ID
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: time",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT '14:30:00'::TIME AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get time value - duckdb_time is i64 (microseconds)
    const timePtr = lib.symbols.duckdb_value_time(resultBuf, 0n, 0n);
    assertExists(timePtr);

    // Get column type to verify it's a time type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: timestamp",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT '2024-01-15 14:30:00'::TIMESTAMP AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get timestamp value - duckdb_timestamp is i64 (microseconds since epoch)
    const tsPtr = lib.symbols.duckdb_value_timestamp(resultBuf, 0n, 0n);
    assertExists(tsPtr);

    // Get column type to verify it's a timestamp type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: interval",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT INTERVAL '5 DAYS 3 HOURS' AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get interval value - duckdb_interval struct (months, days, micros)
    const intervalPtr = lib.symbols.duckdb_value_interval(resultBuf, 0n, 0n);
    assertExists(intervalPtr);

    // Get column type to verify it's an interval type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: hugeint",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT 170141183460469231731687303715884105727::HUGEINT AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get hugeint value - returns pointer to duckdb_hugeint struct
    const hugePtr = lib.symbols.duckdb_value_hugeint(resultBuf, 0n, 0n);
    assertExists(hugePtr);

    // Get column type to verify it's a hugeint type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: decimal",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT '123.45'::DECIMAL(5,2) AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get decimal value - returns duckdb_decimal struct
    const decPtr = lib.symbols.duckdb_value_decimal(resultBuf, 0n, 0n);
    assertExists(decPtr);

    // Verify column type is DECIMAL
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    // Type ID for DECIMAL should be set
    assertEquals(colType > 0, true);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: uint8",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 255::UTINYINT AS value");

    const value = lib.symbols.duckdb_value_uint8(resultBuf, 0n, 0n);
    assertEquals(value, 255);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: uint16",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(ctx, "SELECT 65535::USMALLINT AS value");

    const value = lib.symbols.duckdb_value_uint16(resultBuf, 0n, 0n);
    assertEquals(value, 65535);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: int8",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use a valid int8 value (range -128 to 127)
    const resultBuf = runQuery(ctx, "SELECT 127::TINYINT AS value");

    const value = lib.symbols.duckdb_value_int8(resultBuf, 0n, 0n);
    assertEquals(value, 127);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: int16",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use a valid int16 value (range -32768 to 32767)
    const resultBuf = runQuery(ctx, "SELECT 32767::SMALLINT AS value");

    const value = lib.symbols.duckdb_value_int16(resultBuf, 0n, 0n);
    assertEquals(value, 32767);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: list",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT [1, 2, 3] AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get column type to verify it's a list type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    // Type ID for LIST is 24 (duckdb_type_id::LIST)
    assertEquals(Number(colType), 24);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: struct",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT {'a': 1, 'b': 'hello'} AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get column type to verify it's a struct type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    // Type ID for STRUCT is 25 (duckdb_type_id::STRUCT)
    assertEquals(Number(colType), 25);

    cleanup(ctx, resultBuf);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - value extraction: map",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const resultBuf = runQuery(
      ctx,
      "SELECT {'a': 1, 'b': 2}::MAP(VARCHAR, INTEGER) AS value",
    );

    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    assertEquals(rowCount, 1n);

    // Get column type to verify it's a map type
    const colType = lib.symbols.duckdb_column_type(resultBuf, 0n);
    // Type ID for MAP is 26 (duckdb_type_id::MAP)
    assertEquals(Number(colType), 26);

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
