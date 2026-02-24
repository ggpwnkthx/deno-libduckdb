/**
 * Tests for DuckDB FFI bindings
 */

import { assertEquals, assertExists } from "@std/assert";
import { cstringToPtr, loadDuckDB, ptrToCString } from "@ggpwnkthx/libduckdb";

Deno.test({
  name: "duckdb - open library and close",
  async fn() {
    const lib = await loadDuckDB();
    assertExists(lib);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - get library version",
  async fn() {
    const lib = await loadDuckDB();
    const version = ptrToCString(lib.symbols.duckdb_library_version());
    assertExists(version);
    console.log("DuckDB version:", version);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - open and close database",
  async fn() {
    const lib = await loadDuckDB();

    // Allocate buffer for output parameter
    const dbPtrBuf = new Uint8Array(8);

    // Open a database (in-memory)
    const pathPtr = cstringToPtr(":memory:");
    const openResult = lib.symbols.duckdb_open(pathPtr, dbPtrBuf);
    assertEquals(openResult, 0, "Failed to open database");

    // Log the database pointer
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);
    console.log("Database pointer:", databasePtr);

    // Close using buffer (duckdb_close expects to modify the pointer to NULL)
    lib.symbols.duckdb_close(dbPtrBuf);

    lib.close();
  },
});

Deno.test({
  name: "duckdb - connect and disconnect",
  async fn() {
    const lib = await loadDuckDB();

    // Allocate buffers
    const dbPtrBuf = new Uint8Array(8);
    const connPtrBuf = new Uint8Array(8);

    // Open database
    const pathPtr = cstringToPtr(":memory:");
    lib.symbols.duckdb_open(pathPtr, dbPtrBuf);

    // Get database pointer from buffer as bigint
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);

    // Connect using bigint for input database handle
    const connectResult = lib.symbols.duckdb_connect(databasePtr, connPtrBuf);
    assertEquals(connectResult, 0, "Failed to connect");

    // Log the connection pointer
    const connectionPtr = new DataView(connPtrBuf.buffer).getBigUint64(0, true);
    console.log("Connection pointer:", connectionPtr);

    // Disconnect using buffer (duckdb_disconnect expects to modify the pointer to NULL)
    lib.symbols.duckdb_disconnect(connPtrBuf);

    // Close database using buffer
    lib.symbols.duckdb_close(dbPtrBuf);

    lib.close();
  },
});

Deno.test({
  name: "duckdb - execute query",
  async fn() {
    const lib = await loadDuckDB();

    // Allocate buffers
    const dbPtrBuf = new Uint8Array(8);
    const connPtrBuf = new Uint8Array(8);
    // duckdb_result struct has 6 fields (u64 x 3 + pointer x 3) = 48 bytes
    const resultBuf = new Uint8Array(48);

    // Open database and connect
    const pathPtr = cstringToPtr(":memory:");
    lib.symbols.duckdb_open(pathPtr, dbPtrBuf);
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);
    lib.symbols.duckdb_connect(databasePtr, connPtrBuf);
    const connectionPtr = new DataView(connPtrBuf.buffer).getBigUint64(0, true);

    // Execute query: SELECT 42 as answer
    const queryBytes = new TextEncoder().encode("SELECT 42 as answer\0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);
    const queryResult = lib.symbols.duckdb_query(
      connectionPtr,
      queryPtr,
      resultBuf,
    );
    assertEquals(queryResult, 0, "Query failed");

    // Verify result
    const rowCount = lib.symbols.duckdb_row_count(resultBuf);
    const colCount = lib.symbols.duckdb_column_count(resultBuf);
    assertEquals(rowCount, 1n, "Should have 1 row");
    assertEquals(colCount, 1n, "Should have 1 column");

    // Read value
    const value = lib.symbols.duckdb_value_int32(resultBuf, 0n, 0n);
    assertEquals(value, 42, "Value should be 42");

    // Cleanup
    lib.symbols.duckdb_destroy_result(resultBuf);
    lib.symbols.duckdb_disconnect(connPtrBuf);
    lib.symbols.duckdb_close(dbPtrBuf);
    lib.close();
  },
});
