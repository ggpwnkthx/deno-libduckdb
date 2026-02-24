/**
 * Type definitions for DuckDB FFI
 */

/** Database handle (pointer as bigint) */
export type DuckDB = bigint;

/** Connection handle */
export type Connection = bigint;

/** Prepared statement handle */
export type PreparedStatement = bigint;

/** Result struct as buffer */
export type Result = Uint8Array;

/** Data chunk handle */
// TODO: Add DataChunkHandle wrapper class with Symbol.dispose for proper cleanup
// Requires duckdb_destroy_data_chunk FFI binding
export type DataChunk = bigint;

/** Appender handle */
// TODO: Add AppenderHandle wrapper class with Symbol.dispose for proper cleanup
// Requires duckdb_destroy_appender FFI binding
export type Appender = bigint;

/** Logical type handle */
export type LogicalType = bigint;

/** Error code and message */
export interface DuckDBError {
  code: number;
  message: string;
}

/**
 * Result tuple type - either success with value or failure with error
 */
export type DuckDBResult<T> = [T, null] | [null, DuckDBError];

/** DuckDB logical type IDs - matching DuckDB's native enum values from duckdb.h */
export enum DuckDBType {
  INVALID = 0,
  BOOLEAN = 1,
  TINYINT = 2,
  SMALLINT = 3,
  INTEGER = 4,
  BIGINT = 5,
  UTINYINT = 6,
  USMALLINT = 7,
  UINTEGER = 8,
  UBIGINT = 9,
  FLOAT = 10,
  DOUBLE = 11,
  TIMESTAMP = 12,
  DATE = 13,
  TIME = 14,
  INTERVAL = 15,
  VARCHAR = 16,
  BLOB = 17,
  DECIMAL = 18,
  STATIC_TIMESTAMP = 19,
  LIST = 20,
  STRUCT = 21,
  MAP = 22,
  ARRAY = 23,
  UUID = 24,
  ENUM = 25,
  SET = 26,
  MAP_ENTRY = 27,
  UNION = 28,
  JSON = 29,
}
