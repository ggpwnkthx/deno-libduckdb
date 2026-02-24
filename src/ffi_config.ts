/**
 * DuckDB-specific FFI configuration
 *
 * This module contains all DuckDB-specific type mappings and configurations
 * used by the FFI generator. By keeping these separate, the core generator
 * remains generic and reusable for other libraries.
 */

// Opaque pointer types used as handles in DuckDB
export const DUCKDB_HANDLE_TYPES = [
  "duckdb_database",
  "duckdb_connection",
  "duckdb_result",
  "duckdb_prepared_statement",
  "duckdb_arrow",
  "duckdb_arrow_array",
  "duckdb_config",
  "duckdb_appender",
  "duckdb_logical_type",
  "duckdb_function_info",
  "duckdb_bind_info",
  "duckdb_function_init_info",
  "duckdb_table_function",
  "duckdb_arrow_schema",
  "duckdb_data_chunk",
  "duckdb_vector",
  "duckdb_column",
] as const;

// Buffer types - primitive types that should be passed as buffers
export const DUCKDB_BUFFER_TYPES = [
  "uint8_t",
  "unsigned char",
  "uint16_t",
  "unsigned short",
  "uint32_t",
  "unsigned int",
  "uint64_t",
  "unsigned long long",
] as const;

// Type spelling to FFI type mappings for special DuckDB types
// These types need explicit mapping because they are typedefs that don't
// resolve properly through libclang
export const DUCKDB_TYPE_MAPPINGS: Record<string, string> = {
  // State/return value types
  "duckdb_state": "u8",
  "duckdb_return_value": "u8",
  // Index/size types
  "idx_t": "u64",
  "size_t": "usize",
  // Fixed-width integers
  "uint64_t": "u64",
  "uint32_t": "u32",
  "uint16_t": "u16",
  "uint8_t": "u8",
  "int64_t": "i64",
  "int32_t": "i32",
  "int16_t": "i16",
  "int8_t": "i8",
  // DuckDB enum return types - return i32 (the enum value)
  "duckdb_type": "i32",
  "duckdb_statement_type": "i32",
  // Boolean
  "bool": "u8",
};

// Parameter names that should be treated as handles (u64 for direct bigint)
export const DUCKDB_HANDLE_PARAMS = [
  "database",
  "connection",
  "result",
] as const;

// Default buffer types for CLI
export const DEFAULT_BUFFERS = [
  "uint8_t",
  "unsigned char",
  "uint16_t",
  "unsigned short",
  "uint32_t",
  "unsigned int",
  "uint64_t",
  "unsigned long long",
] as const;
