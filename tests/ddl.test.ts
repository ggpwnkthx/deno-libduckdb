/**
 * Tests for DuckDB DDL operations (CREATE TABLE, INSERT, etc.)
 */

import { assertEquals, assertNotEquals } from "@std/assert";
import { load } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB, runQuery } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - DDL: CREATE TABLE",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create a table
    const createResult = runQuery(
      ctx,
      "CREATE TABLE users (id INTEGER, name VARCHAR, age INTEGER)",
    );

    // Verify the table was created by checking that we can query it
    const selectResult = runQuery(ctx, "SELECT count(*) FROM users");
    const count = lib.symbols.duckdb_value_int64(selectResult, 0n, 0n);
    assertEquals(count, 0n);

    cleanup(ctx, selectResult);
    lib.symbols.duckdb_destroy_result(createResult);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: INSERT INTO",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(
      ctx,
      "CREATE TABLE users (id INTEGER, name VARCHAR)",
    );

    // Insert data
    runQuery(ctx, "INSERT INTO users VALUES (1, 'Alice')");
    runQuery(ctx, "INSERT INTO users VALUES (2, 'Bob')");

    // Verify data was inserted
    const result = runQuery(ctx, "SELECT count(*) FROM users");
    const count = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(count, 2n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: INSERT multiple rows",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(
      ctx,
      "CREATE TABLE numbers (value INTEGER)",
    );

    // Insert multiple rows at once
    runQuery(ctx, "INSERT INTO numbers VALUES (10), (20), (30)");

    // Verify count
    const result = runQuery(ctx, "SELECT count(*) FROM numbers");
    const count = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(count, 3n);

    // Verify sum
    const sumResult = runQuery(ctx, "SELECT sum(value) FROM numbers");
    const sum = lib.symbols.duckdb_value_int64(sumResult, 0n, 0n);
    assertEquals(sum, 60n);

    cleanup(ctx, sumResult);
    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: SELECT with WHERE clause",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create and populate table
    runQuery(
      ctx,
      "CREATE TABLE products (id INTEGER, price DOUBLE, in_stock BOOLEAN)",
    );
    runQuery(
      ctx,
      "INSERT INTO products VALUES (1, 9.99, true), (2, 19.99, true), (3, 29.99, false)",
    );

    // Query with WHERE - just verify it works and returns results
    const result = runQuery(
      ctx,
      "SELECT * FROM products WHERE price > 15",
    );

    const rowCount = lib.symbols.duckdb_row_count(result);
    assertEquals(rowCount, 2n);

    // Check first row has correct column count (3 columns)
    const colCount = lib.symbols.duckdb_column_count(result);
    assertEquals(colCount, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: DELETE",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create and populate table
    runQuery(
      ctx,
      "CREATE TABLE items (id INTEGER, name VARCHAR)",
    );
    runQuery(ctx, "INSERT INTO items VALUES (1, 'a'), (2, 'b'), (3, 'c')");

    // Delete a row
    runQuery(ctx, "DELETE FROM items WHERE id = 2");

    // Verify count
    const result = runQuery(ctx, "SELECT count(*) FROM items");
    const count = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    assertEquals(count, 2n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: UPDATE",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create and populate table
    runQuery(
      ctx,
      "CREATE TABLE items (id INTEGER, value INTEGER)",
    );
    runQuery(ctx, "INSERT INTO items VALUES (1, 10), (2, 20), (3, 30)");

    // Update rows
    runQuery(ctx, "UPDATE items SET value = 100 WHERE id > 1");

    // Verify updated values
    const result = runQuery(ctx, "SELECT sum(value) FROM items");
    const sum = lib.symbols.duckdb_value_int64(result, 0n, 0n);
    // 10 + 100 + 100 = 210
    assertEquals(sum, 210n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: Alter TABLE (ADD COLUMN)",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create table
    runQuery(
      ctx,
      "CREATE TABLE users (id INTEGER, name VARCHAR)",
    );

    // Add a column
    runQuery(ctx, "ALTER TABLE users ADD COLUMN email VARCHAR");

    // Insert with new column
    runQuery(ctx, "INSERT INTO users VALUES (1, 'Alice', 'alice@example.com')");

    // Verify column count
    const result = runQuery(ctx, "SELECT * FROM users");
    const colCount = lib.symbols.duckdb_column_count(result);
    assertEquals(colCount, 3n);

    cleanup(ctx, result);
    cleanup(ctx);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - DDL: DROP TABLE",
  async fn() {
    const lib = await load();
    const ctx = createTestDB(lib);

    // Create and drop table
    runQuery(ctx, "CREATE TABLE temp (id INTEGER)");
    runQuery(ctx, "DROP TABLE temp");

    // Verify table doesn't exist - try to query it (expecting error)
    const resultBuf = new Uint8Array(48);
    const queryBytes = new TextEncoder().encode("SELECT * FROM temp\0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);
    const queryResult = lib.symbols.duckdb_query(
      ctx.connectionPtr,
      queryPtr,
      resultBuf,
    );

    // Should return non-zero indicating error
    assertNotEquals(queryResult, 0);

    lib.symbols.duckdb_destroy_result(resultBuf);
    cleanup(ctx);
    lib.close();
  },
});
