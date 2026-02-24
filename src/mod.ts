/**
 * Typesafe DuckDB FFI Wrapper
 *
 * This module provides a typesafe, functional TypeScript API for DuckDB.
 */

// Re-export FFI configuration
export {
  DUCKDB_BUFFER_TYPES,
  DUCKDB_HANDLE_PARAMS,
  DUCKDB_HANDLE_TYPES,
  DUCKDB_TYPE_MAPPINGS,
} from "./ffi_config.ts";

// Re-export library management functions
export { getSymbols, getVersion, loadDuckDB, unloadDuckDB } from "./library.ts";

// Re-export FFI utilities
export { cstringToPtr, ptrToCString } from "@ggpwnkthx/libclang";

// Re-export database functions and classes
export { close, DatabaseHandle, open } from "./database.ts";

// Re-export connection functions and classes
export {
  connect,
  ConnectionHandle,
  disconnect,
  prepare,
  PreparedStatementHandle,
  query,
} from "./connection.ts";

// Re-export result functions
export {
  columnCount,
  columnName,
  columnType,
  destroyResult,
  getBoolean,
  getDouble,
  getFloat,
  getInt16,
  getInt32,
  getInt64,
  getInt8,
  getUint16,
  getUint32,
  getUint64,
  getUint8,
  getValue,
  getVarchar,
  isNull,
  resultError,
  rowCount,
} from "./result.ts";

// Re-export result classes
export { DataResult, ResultRow } from "./result.ts";

// Re-export prepared statement functions
export {
  destroyPrepared,
  executePrepared,
  paramCount,
  statementColumnCount,
} from "./prepared.ts";

// Re-export types
export type {
  Appender,
  Connection,
  DataChunk,
  DuckDB,
  DuckDBError,
  DuckDBResult,
  LogicalType,
  PreparedStatement,
  Result,
} from "./types.ts";

// Re-export DuckDBType enum
export { DuckDBType } from "./types.ts";
