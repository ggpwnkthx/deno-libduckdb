/**
 * DuckDB struct types
 */
/** duckdb_date: DuckDB duckdb_date struct */
export const duckdb_date: Deno.NativeStructType = {
  struct: ["i32"],
};

/** duckdb_date_struct: DuckDB duckdb_date_struct struct */
export const duckdb_date_struct: Deno.NativeStructType = {
  struct: ["i32", "i8", "i8"],
};

/** duckdb_time: DuckDB duckdb_time struct */
export const duckdb_time: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_time_struct: DuckDB duckdb_time_struct struct */
export const duckdb_time_struct: Deno.NativeStructType = {
  struct: ["i8", "i8", "i8", "i32"],
};

/** duckdb_time_ns: DuckDB duckdb_time_ns struct */
export const duckdb_time_ns: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_time_tz: DuckDB duckdb_time_tz struct */
export const duckdb_time_tz: Deno.NativeStructType = {
  struct: ["u64"],
};

/** duckdb_time_tz_struct: DuckDB duckdb_time_tz_struct struct */
export const duckdb_time_tz_struct: Deno.NativeStructType = {
  struct: ["i32"],
};

/** duckdb_timestamp: DuckDB duckdb_timestamp struct */
export const duckdb_timestamp: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_timestamp_s: DuckDB duckdb_timestamp_s struct */
export const duckdb_timestamp_s: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_timestamp_ms: DuckDB duckdb_timestamp_ms struct */
export const duckdb_timestamp_ms: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_timestamp_ns: DuckDB duckdb_timestamp_ns struct */
export const duckdb_timestamp_ns: Deno.NativeStructType = {
  struct: ["i64"],
};

/** duckdb_interval: DuckDB duckdb_interval struct */
export const duckdb_interval: Deno.NativeStructType = {
  struct: ["i32", "i32", "i64"],
};

/** duckdb_hugeint: DuckDB duckdb_hugeint struct */
export const duckdb_hugeint: Deno.NativeStructType = {
  struct: ["u64", "i64"],
};

/** duckdb_uhugeint: DuckDB duckdb_uhugeint struct */
export const duckdb_uhugeint: Deno.NativeStructType = {
  struct: ["u64", "u64"],
};

/** duckdb_decimal: DuckDB duckdb_decimal struct */
export const duckdb_decimal: Deno.NativeStructType = {
  struct: ["u8", "u8"],
};

/** duckdb_query_progress_type: DuckDB duckdb_query_progress_type struct */
export const duckdb_query_progress_type: Deno.NativeStructType = {
  struct: ["f64", "u64", "u64"],
};

/** duckdb_string_t: DuckDB duckdb_string_t struct */
export const duckdb_string_t: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_list_entry: DuckDB duckdb_list_entry struct */
export const duckdb_list_entry: Deno.NativeStructType = {
  struct: ["u64", "u64"],
};

/** duckdb_column: DuckDB duckdb_column struct */
export const duckdb_column: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer", "pointer"],
};

/** duckdb_vector: DuckDB duckdb_vector struct */
export const duckdb_vector: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_selection_vector: DuckDB duckdb_selection_vector struct */
export const duckdb_selection_vector: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_string: DuckDB duckdb_string struct */
export const duckdb_string: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_blob: DuckDB duckdb_blob struct */
export const duckdb_blob: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_bit: DuckDB duckdb_bit struct */
export const duckdb_bit: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_bignum: DuckDB duckdb_bignum struct */
export const duckdb_bignum: Deno.NativeStructType = {
  struct: ["pointer", "u8"],
};

/** duckdb_result: DuckDB duckdb_result struct */
export const duckdb_result: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer"],
};

/** duckdb_instance_cache: DuckDB duckdb_instance_cache struct */
export const duckdb_instance_cache: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_database: DuckDB duckdb_database struct */
export const duckdb_database: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_connection: DuckDB duckdb_connection struct */
export const duckdb_connection: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_client_context: DuckDB duckdb_client_context struct */
export const duckdb_client_context: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_prepared_statement: DuckDB duckdb_prepared_statement struct */
export const duckdb_prepared_statement: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_extracted_statements: DuckDB duckdb_extracted_statements struct */
export const duckdb_extracted_statements: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_pending_result: DuckDB duckdb_pending_result struct */
export const duckdb_pending_result: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_appender: DuckDB duckdb_appender struct */
export const duckdb_appender: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_table_description: DuckDB duckdb_table_description struct */
export const duckdb_table_description: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_config: DuckDB duckdb_config struct */
export const duckdb_config: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_logical_type: DuckDB duckdb_logical_type struct */
export const duckdb_logical_type: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_create_type_info: DuckDB duckdb_create_type_info struct */
export const duckdb_create_type_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_data_chunk: DuckDB duckdb_data_chunk struct */
export const duckdb_data_chunk: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_value: DuckDB duckdb_value struct */
export const duckdb_value: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_profiling_info: DuckDB duckdb_profiling_info struct */
export const duckdb_profiling_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_error_data: DuckDB duckdb_error_data struct */
export const duckdb_error_data: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_expression: DuckDB duckdb_expression struct */
export const duckdb_expression: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_extension_info: DuckDB duckdb_extension_info struct */
export const duckdb_extension_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_function_info: DuckDB duckdb_function_info struct */
export const duckdb_function_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_bind_info: DuckDB duckdb_bind_info struct */
export const duckdb_bind_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_scalar_function: DuckDB duckdb_scalar_function struct */
export const duckdb_scalar_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_scalar_function_set: DuckDB duckdb_scalar_function_set struct */
export const duckdb_scalar_function_set: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_aggregate_function: DuckDB duckdb_aggregate_function struct */
export const duckdb_aggregate_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_aggregate_function_set: DuckDB duckdb_aggregate_function_set struct */
export const duckdb_aggregate_function_set: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_aggregate_state: DuckDB duckdb_aggregate_state struct */
export const duckdb_aggregate_state: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_table_function: DuckDB duckdb_table_function struct */
export const duckdb_table_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_init_info: DuckDB duckdb_init_info struct */
export const duckdb_init_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_cast_function: DuckDB duckdb_cast_function struct */
export const duckdb_cast_function: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_replacement_scan_info: DuckDB duckdb_replacement_scan_info struct */
export const duckdb_replacement_scan_info: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow: DuckDB duckdb_arrow struct */
export const duckdb_arrow: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow_stream: DuckDB duckdb_arrow_stream struct */
export const duckdb_arrow_stream: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow_schema: DuckDB duckdb_arrow_schema struct */
export const duckdb_arrow_schema: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow_converted_schema: DuckDB duckdb_arrow_converted_schema struct */
export const duckdb_arrow_converted_schema: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow_array: DuckDB duckdb_arrow_array struct */
export const duckdb_arrow_array: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_arrow_options: DuckDB duckdb_arrow_options struct */
export const duckdb_arrow_options: Deno.NativeStructType = {
  struct: ["pointer"],
};

/** duckdb_extension_access: DuckDB duckdb_extension_access struct */
export const duckdb_extension_access: Deno.NativeStructType = {
  struct: ["pointer", "pointer", "pointer"],
};

/** Size of duckdb_result struct in bytes (3 pointers × 8 bytes, plus padding) */
export const DUCKDB_RESULT_SIZE = 48;
