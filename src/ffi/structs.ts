/**
 * DuckDB struct types
 */
export const duckdb_date: Deno.NativeStructType = {
  struct: ["i32"],
};

export const duckdb_date_struct: Deno.NativeStructType = {
  struct: ["i32", "i8", "i8"],
};

export const duckdb_time: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_time_struct: Deno.NativeStructType = {
  struct: ["i8", "i8", "i8", "i32"],
};

export const duckdb_time_ns: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_time_tz: Deno.NativeStructType = {
  struct: ["u64"],
};

export const duckdb_time_tz_struct: Deno.NativeStructType = {
  struct: ["i32"],
};

export const duckdb_timestamp: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_timestamp_s: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_timestamp_ms: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_timestamp_ns: Deno.NativeStructType = {
  struct: ["i64"],
};

export const duckdb_interval: Deno.NativeStructType = {
  struct: ["i32", "i32", "i64"],
};

export const duckdb_hugeint: Deno.NativeStructType = {
  struct: ["u64", "i64"],
};

export const duckdb_uhugeint: Deno.NativeStructType = {
  struct: ["u64", "u64"],
};

export const duckdb_decimal: Deno.NativeStructType = {
  struct: ["u8", "u8"],
};

export const duckdb_query_progress_type: Deno.NativeStructType = {
  struct: ["f64", "u64", "u64"],
};

export const duckdb_string_t: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_list_entry: Deno.NativeStructType = {
  struct: ["u64", "u64"],
};

export const duckdb_column: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer", "pointer"],
};

export const duckdb_vector: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_selection_vector: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_string: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_blob: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_bit: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_bignum: Deno.NativeStructType = {
  struct: ["pointer", "u8"],
};

export const duckdb_result: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer"],
};

export const duckdb_instance_cache: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_database: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_connection: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_client_context: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_prepared_statement: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_extracted_statements: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_pending_result: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_appender: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_table_description: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_config: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_logical_type: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_create_type_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_data_chunk: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_value: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_profiling_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_error_data: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_expression: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_extension_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_function_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_bind_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_scalar_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_scalar_function_set: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_aggregate_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_aggregate_function_set: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_aggregate_state: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_table_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_init_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_cast_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_replacement_scan_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow_stream: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow_schema: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow_converted_schema: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow_array: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_arrow_options: Deno.NativeStructType = {
  struct: ["pointer"],
};

export const duckdb_extension_access: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer"],
};
