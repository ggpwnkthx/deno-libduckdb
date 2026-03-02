/**
 * Tests for DuckDB query features (aggregates, GROUP BY, ORDER BY, etc.)
 */

import { assertEquals } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - query: SUM aggregate",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT sum(x) FROM (VALUES (10), (20), (30)) AS t(x)",
    );
    const sum = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(sum, 60n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: AVG aggregate",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT avg(x) FROM (VALUES (10), (20), (30)) AS t(x)",
    );
    const avg = lib.symbols.duckdb_value_double(result, 0n, 0n);
    assertEquals(avg, 20.0);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: COUNT aggregate",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT count(*) FROM (VALUES (1), (2), (3)) AS t(x)",
    );
    const count = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(count, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: MIN aggregate",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT min(x) FROM (VALUES (10), (5), (20)) AS t(x)",
    );
    const min = lib.symbols.duckdb_value_int32(result, 0n, 0n);
    assertEquals(min, 5);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: MAX aggregate",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT max(x) FROM (VALUES (10), (5), (20)) AS t(x)",
    );
    const max = lib.symbols.duckdb_value_int32(result, 0n, 0n);
    assertEquals(max, 20);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: GROUP BY",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create a table and use GROUP BY
    runQuery(ctx, "CREATE TABLE sales (category VARCHAR, amount INTEGER)");
    runQuery(ctx, "INSERT INTO sales VALUES ('a', 10), ('a', 20), ('b', 30)");

    const result = runQuery(
      ctx,
      "SELECT category, sum(amount) as total FROM sales GROUP BY category",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 2n);

    // Verify we have 2 columns
    const colCount = lib.symbols.duckdb_column_count(result);
    assertEquals(colCount, 2n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: ORDER BY",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use ORDER BY - just verify it returns results
    const result = runQuery(
      ctx,
      "SELECT x FROM (VALUES (3), (1), (2)) AS t(x) ORDER BY x DESC",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: LIMIT",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT x FROM (VALUES (1), (2), (3), (4), (5)) AS t(x) LIMIT 3",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: LIMIT with OFFSET",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use LIMIT/OFFSET - just verify it returns correct number of rows
    const result = runQuery(
      ctx,
      "SELECT x FROM (VALUES (1), (2), (3), (4), (5)) AS t(x) LIMIT 2 OFFSET 2",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 2n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: DISTINCT",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT DISTINCT x FROM (VALUES (1), (1), (2), (2), (3)) AS t(x)",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: multiple aggregates",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use aggregate functions - just verify we get results
    const result = runQuery(
      ctx,
      "SELECT count(*), sum(x), avg(x), min(x), max(x) FROM (VALUES (10), (20), (30)) AS t(x)",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 1n);

    const colCount = lib.symbols.duckdb_column_count(result);
    assertEquals(colCount, 5n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: subquery",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Subquery in FROM clause
    const result = runQuery(
      ctx,
      "SELECT * FROM (SELECT x * 2 AS doubled FROM (VALUES (1), (2), (3)) AS t(x)) AS subq WHERE doubled > 2",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 2n);

    const val = lib.symbols.duckdb_value_int32(result, 0n, 0n);
    assertEquals(val, 4);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: string concatenation",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    const result = runQuery(
      ctx,
      "SELECT 'Hello' || ' ' || 'World' AS greeting",
    );

    const ptr = lib.symbols.duckdb_value_varchar(
      result,
      0n,
      0n,
    ) as Deno.PointerObject;
    const value = new Deno.UnsafePointerView(ptr).getCString();
    assertEquals(value, "Hello World");

    lib.symbols.duckdb_free(ptr);
    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: arithmetic operations",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Test addition
    const result = runQuery(
      ctx,
      "SELECT 10 + 5 AS result",
    );

    const val = lib.symbols.duckdb_value_int32(result, 0n, 0n);
    assertEquals(val, 15);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - query: CASE expression",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Use table instead of VALUES for reliability
    runQuery(ctx, "CREATE TABLE data (x INTEGER)");
    runQuery(ctx, "INSERT INTO data VALUES (5), (15), (10)");

    const result = runQuery(
      ctx,
      "SELECT CASE WHEN x > 10 THEN 'big' ELSE 'small' END AS size FROM data",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 3n);

    // Just verify we can read the first value
    const ptr1 = lib.symbols.duckdb_value_varchar(
      result,
      0n,
      0n,
    ) as Deno.PointerObject;
    const val1 = new Deno.UnsafePointerView(ptr1).getCString();
    assertEquals(val1, "small");

    lib.symbols.duckdb_free(ptr1);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});
