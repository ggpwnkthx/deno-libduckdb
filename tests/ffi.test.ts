/**
 * Tests for DuckDB FFI bindings
 */

import { assertEquals, assertExists } from "@std/assert";
import { open } from "../src/ffi.ts";

Deno.test({
  name: "duckdb - open library and close",
  fn() {
    const lib = open("./libduckdb/libduckdb.so");
    assertExists(lib);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - get library version",
  fn() {
    const lib = open("./libduckdb/libduckdb.so");
    const versionPtr = lib.symbols.duckdb_library_version();
    const version = versionPtr
      ? new Deno.UnsafePointerView(versionPtr).getCString()
      : "";
    assertExists(version);
    console.log("DuckDB version:", version);
    lib.close();
  },
});

Deno.test({
  name: "duckdb - open and close database",
  fn() {
    const lib = open("./libduckdb/libduckdb.so");
    const symbols = lib.symbols;

    // Allocate buffer for output parameter
    const dbPtrBuf = new Uint8Array(8);

    // Open a database (in-memory)
    const pathBytes = new TextEncoder().encode(":memory:\0");
    const pathPtr = Deno.UnsafePointer.of(pathBytes);
    const openResult = symbols.duckdb_open(pathPtr, dbPtrBuf);
    assertEquals(openResult, 0, "Failed to open database");

    // Log the database pointer
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);
    console.log("Database pointer:", databasePtr);

    // Close using buffer (duckdb_close expects to modify the pointer to NULL)
    symbols.duckdb_close(dbPtrBuf);

    lib.close();
  },
});

Deno.test({
  name: "duckdb - connect and disconnect",
  fn() {
    const lib = open("./libduckdb/libduckdb.so");
    const symbols = lib.symbols;

    // Allocate buffers
    const dbPtrBuf = new Uint8Array(8);
    const connPtrBuf = new Uint8Array(8);

    // Open database
    const pathBytes = new TextEncoder().encode(":memory:\0");
    const pathPtr = Deno.UnsafePointer.of(pathBytes);
    symbols.duckdb_open(pathPtr, dbPtrBuf);

    // Get database pointer from buffer as bigint
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);

    // Connect using bigint for input database handle
    const connectResult = symbols.duckdb_connect(databasePtr, connPtrBuf);
    assertEquals(connectResult, 0, "Failed to connect");

    // Log the connection pointer
    const connectionPtr = new DataView(connPtrBuf.buffer).getBigUint64(0, true);
    console.log("Connection pointer:", connectionPtr);

    // Disconnect using buffer (duckdb_disconnect expects to modify the pointer to NULL)
    symbols.duckdb_disconnect(connPtrBuf);

    // Close database using buffer
    symbols.duckdb_close(dbPtrBuf);

    lib.close();
  },
});

Deno.test({
  name: "duckdb - execute query",
  fn() {
    const lib = open("./libduckdb/libduckdb.so");
    const symbols = lib.symbols;

    // Allocate buffers
    const dbPtrBuf = new Uint8Array(8);
    const connPtrBuf = new Uint8Array(8);
    // duckdb_result struct has 6 fields (u64 x 3 + pointer x 3) = 48 bytes
    const resultBuf = new Uint8Array(48);

    // Open database and connect
    const pathBytes = new TextEncoder().encode(":memory:\0");
    const pathPtr = Deno.UnsafePointer.of(pathBytes);
    symbols.duckdb_open(pathPtr, dbPtrBuf);
    const databasePtr = new DataView(dbPtrBuf.buffer).getBigUint64(0, true);
    symbols.duckdb_connect(databasePtr, connPtrBuf);
    const connectionPtr = new DataView(connPtrBuf.buffer).getBigUint64(0, true);

    // Execute query: SELECT 42 as answer
    const queryBytes = new TextEncoder().encode("SELECT 42 as answer\0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);
    const queryResult = symbols.duckdb_query(
      connectionPtr,
      queryPtr,
      resultBuf,
    );
    assertEquals(queryResult, 0, "Query failed");

    // Verify result
    const rowCount = symbols.duckdb_row_count(resultBuf);
    const colCount = symbols.duckdb_column_count(resultBuf);
    assertEquals(rowCount, 1n, "Should have 1 row");
    assertEquals(colCount, 1n, "Should have 1 column");

    // Read value
    const value = symbols.duckdb_value_int32(resultBuf, 0n, 0n);
    assertEquals(value, 42, "Value should be 42");

    // Cleanup
    symbols.duckdb_destroy_result(resultBuf);
    symbols.duckdb_disconnect(connPtrBuf);
    symbols.duckdb_close(dbPtrBuf);
    lib.close();
  },
});
