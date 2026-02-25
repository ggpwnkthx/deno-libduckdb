/**
 * Tests for DuckDB FFI prepared statements
 */

import { assertEquals } from "@std/assert";
import { loadDuckDB } from "@ggpwnkthx/libduckdb";
import { cleanup, createTestDB } from "./helpers/ffi.ts";

Deno.test({
  name: "duckdb - prepare: create and destroy statement",
  async fn() {
    const lib = await loadDuckDB();
    const ctx = createTestDB(lib);

    // Prepare a simple query
    const queryBytes = new TextEncoder().encode("SELECT 42 AS answer\0");
    const queryPtr = Deno.UnsafePointer.of(queryBytes);
    const prepStmtBuf = new Uint8Array(new ArrayBuffer(8));

    const prepResult = lib.symbols.duckdb_prepare(
      ctx.connectionPtr,
      queryPtr,
      prepStmtBuf,
    );
    assertEquals(prepResult, 0, "Failed to prepare statement");

    // Get the prepared statement pointer as bigint
    const prepStmtPtr = new DataView(prepStmtBuf.buffer).getBigUint64(0, true);
    assertEquals(
      prepStmtPtr !== 0n,
      true,
      "Prepared statement should be valid",
    );

    // Destroy the prepared statement
    lib.symbols.duckdb_destroy_prepare(prepStmtBuf);

    cleanup(ctx);
    lib.close();
  },
});
