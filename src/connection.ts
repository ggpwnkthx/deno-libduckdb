/**
 * Connection functions for DuckDB
 */

import {
  Connection,
  DuckDB,
  DuckDBResult,
  PreparedStatement,
} from "./types.ts";
import { DataResult } from "./result.ts";
import { cstringToPtr, getSymbols, ptrToCString } from "./library.ts";
import { RESULT_SIZE } from "./constants.ts";
import {
  createError,
  createPointerBuffer,
  getPointer,
  setPointer,
} from "./helpers.ts";
import { destroyPrepared } from "./prepared.ts";
import { DatabaseHandle } from "./database.ts";

/**
 * A wrapper class for connection handles that handles cleanup.
 * Use this for connection handles to ensure proper memory management.
 */
export class ConnectionHandle {
  #conn: Connection;
  #destroyed = false;

  constructor(conn: Connection) {
    this.#conn = conn;
  }

  /**
   * Explicit Resource Management - disconnects the connection
   * Allows use with Deno's `using` keyword:
   *   using conn = connect(db);
   *   // conn automatically cleaned up at end of scope
   */
  [Symbol.dispose](): void {
    this.disconnect();
  }

  /**
   * Disconnect from the database and free memory
   */
  disconnect(): void {
    if (!this.#destroyed && this.#conn) {
      disconnect(this.#conn);
      this.#destroyed = true;
    }
  }

  /**
   * Get the underlying connection handle
   */
  get conn(): Connection {
    return this.#conn;
  }

  /**
   * Check if the connection has been disconnected
   */
  get isDestroyed(): boolean {
    return this.#destroyed;
  }
}

/**
 * A wrapper class for prepared statements that handles cleanup.
 * Use this for prepared statements to ensure proper memory management.
 */
export class PreparedStatementHandle {
  #stmt: PreparedStatement;
  #conn: Connection;
  #destroyed = false;

  constructor(stmt: PreparedStatement, conn: Connection) {
    this.#stmt = stmt;
    this.#conn = conn;
  }

  /**
   * Explicit Resource Management - destroys the prepared statement
   * Allows use with Deno's `using` keyword:
   *   using stmt = prepare(conn, "SELECT ?");
   *   // stmt automatically cleaned up at end of scope
   */
  [Symbol.dispose](): void {
    this.destroy();
  }

  /**
   * Destroy the prepared statement and free memory
   */
  destroy(): void {
    if (!this.#destroyed && this.#stmt) {
      destroyPrepared(this.#stmt);
      this.#destroyed = true;
    }
  }

  /**
   * Get the underlying prepared statement handle
   */
  get stmt(): PreparedStatement {
    return this.#stmt;
  }

  /**
   * Get the connection this statement was prepared on
   */
  get conn(): Connection {
    return this.#conn;
  }

  /**
   * Check if the statement has been destroyed
   */
  get isDestroyed(): boolean {
    return this.#destroyed;
  }
}

/**
 * Connect to a DuckDB database
 * @param db - The database handle (or DatabaseHandle)
 * @returns Result tuple with ConnectionHandle or error. Use .disconnect() or `using` to free memory.
 */
export function connect(
  db: DuckDB | DatabaseHandle,
): DuckDBResult<ConnectionHandle> {
  const sym = getSymbols();

  const connPtrBuf = createPointerBuffer();

  // Get the raw DuckDB/DatabaseHandle
  const dbHandle = db instanceof DatabaseHandle ? db.db : db;

  const result = sym.duckdb_connect(dbHandle, connPtrBuf);

  if (result === 0) {
    // Success - extract the pointer from buffer and wrap in ConnectionHandle
    const conn = getPointer(connPtrBuf);
    return [new ConnectionHandle(conn), null];
  } else {
    // Error occurred
    return [null, createError(result, "Failed to connect to database")];
  }
}

/**
 * Disconnect from a DuckDB database
 * @param conn - The connection handle (or ConnectionHandle)
 */
export function disconnect(conn: Connection | ConnectionHandle): void {
  const sym = getSymbols();

  // Get the raw connection handle
  const connHandle = conn instanceof ConnectionHandle ? conn.conn : conn;

  // Create a buffer with the connection pointer
  const connPtrBuf = createPointerBuffer();
  setPointer(connPtrBuf, connHandle);

  sym.duckdb_disconnect(connPtrBuf);
}

/**
 * Execute a query on a connection
 * @param conn - The connection handle (or ConnectionHandle)
 * @param sql - The SQL query string
 * @returns Result tuple with DataResult or error. Call .destroy() on the result when done to free memory.
 */
export function query(
  conn: Connection | ConnectionHandle,
  sql: string,
): DuckDBResult<DataResult> {
  const sym = getSymbols();

  // Get the raw connection handle
  const connHandle = conn instanceof ConnectionHandle ? conn.conn : conn;

  const resultBuf = new Uint8Array(RESULT_SIZE);
  const sqlPtr = cstringToPtr(sql);

  const result = sym.duckdb_query(connHandle, sqlPtr, resultBuf);

  if (result === 0) {
    // Wrap the raw result in DataResult - this takes ownership of the result buffer
    return [DataResult.from(resultBuf), null];
  } else {
    // Get error message from result
    const errorPtr = sym.duckdb_result_error(resultBuf);
    const errorMessage = errorPtr ? ptrToCString(errorPtr) : "Query failed";
    sym.duckdb_destroy_result(resultBuf);
    return [null, createError(result, errorMessage)];
  }
}

/**
 * Prepare a SQL statement
 * @param conn - The connection handle (or ConnectionHandle)
 * @param sql - The SQL query string
 * @returns Result tuple with PreparedStatementHandle or error. Call .destroy() or use `using` to free memory.
 */
export function prepare(
  conn: Connection | ConnectionHandle,
  sql: string,
): DuckDBResult<PreparedStatementHandle> {
  const sym = getSymbols();

  // Get the raw connection handle
  const connHandle = conn instanceof ConnectionHandle ? conn.conn : conn;

  const stmtPtrBuf = createPointerBuffer();
  const sqlPtr = cstringToPtr(sql);

  const result = sym.duckdb_prepare(connHandle, sqlPtr, stmtPtrBuf);

  if (result === 0) {
    // Success - extract the pointer from buffer and wrap in handle
    const stmt = getPointer(stmtPtrBuf);
    return [new PreparedStatementHandle(stmt, connHandle), null];
  } else {
    // Get error message
    const errorPtr = sym.duckdb_prepare_error(stmtPtrBuf);
    const errorMessage = errorPtr
      ? ptrToCString(errorPtr)
      : "Failed to prepare statement";
    sym.duckdb_destroy_prepare(stmtPtrBuf);
    return [null, createError(result, errorMessage)];
  }
}
