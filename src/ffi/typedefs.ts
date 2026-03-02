// Basic FFI types
/** i8 */
export const i8 = "i8" as const;
/** u8 */
export const u8 = "u8" as const;
/** i16 */
export const i16 = "i16" as const;
/** u16 */
export const u16 = "u16" as const;
/** i32 */
export const i32 = "i32" as const;
/** u32 */
export const u32 = "u32" as const;
/** i64 */
export const i64 = "i64" as const;
/** u64 */
export const u64 = "u64" as const;
/** f32 */
export const f32 = "f32" as const;
/** f64 */
export const f64 = "f64" as const;
/** pointer */
export const pointer = "pointer" as const;
/** buffer */
export const buffer = "buffer" as const;

// DuckDB enum types (treated as typedefs for FFI)
/** duckdb_state: DuckDB state enum type */
export const duckdb_state = "u8" as const;
/** duckdb_statement_type: DuckDB statement_type enum type */
export const duckdb_statement_type = "u8" as const;

// DuckDB type definitions
/** duckdb_aggregate_combine_t: duckdb_aggregate_combine_t */
export const duckdb_aggregate_combine_t = "pointer" as const;
/** duckdb_aggregate_destroy_t: duckdb_aggregate_destroy_t */
export const duckdb_aggregate_destroy_t = "pointer" as const;
/** duckdb_aggregate_finalize_t: duckdb_aggregate_finalize_t */
export const duckdb_aggregate_finalize_t = "pointer" as const;
/** duckdb_aggregate_function: duckdb_aggregate_function */
export const duckdb_aggregate_function = "pointer" as const;
/** duckdb_aggregate_function_set: duckdb_aggregate_function_set */
export const duckdb_aggregate_function_set = "pointer" as const;
/** duckdb_aggregate_init_t: duckdb_aggregate_init_t */
export const duckdb_aggregate_init_t = "pointer" as const;
/** duckdb_aggregate_state: duckdb_aggregate_state */
export const duckdb_aggregate_state = "pointer" as const;
/** duckdb_aggregate_state_size: duckdb_aggregate_state_size */
export const duckdb_aggregate_state_size = "pointer" as const;
/** duckdb_aggregate_update_t: duckdb_aggregate_update_t */
export const duckdb_aggregate_update_t = "pointer" as const;
/** duckdb_appender: duckdb_appender */
export const duckdb_appender = "u64" as const;
/** duckdb_arrow: duckdb_arrow */
export const duckdb_arrow = "u64" as const;
/** duckdb_arrow_array: duckdb_arrow_array */
export const duckdb_arrow_array = "u64" as const;
/** duckdb_arrow_converted_schema: duckdb_arrow_converted_schema */
export const duckdb_arrow_converted_schema = "pointer" as const;
/** duckdb_arrow_options: duckdb_arrow_options */
export const duckdb_arrow_options = "pointer" as const;
/** duckdb_arrow_schema: duckdb_arrow_schema */
export const duckdb_arrow_schema = "u64" as const;
/** duckdb_arrow_stream: duckdb_arrow_stream */
export const duckdb_arrow_stream = "pointer" as const;
/** duckdb_bignum: duckdb_bignum */
export const duckdb_bignum = "pointer" as const;
/** duckdb_bind_info: duckdb_bind_info */
export const duckdb_bind_info = "pointer" as const;
/** duckdb_bit: duckdb_bit */
export const duckdb_bit = "pointer" as const;
/** duckdb_blob: duckdb_blob */
export const duckdb_blob = "pointer" as const;
/** duckdb_cast_function: duckdb_cast_function */
export const duckdb_cast_function = "pointer" as const;
/** duckdb_cast_function_t: duckdb_cast_function_t */
export const duckdb_cast_function_t = "pointer" as const;
/** duckdb_client_context: duckdb_client_context */
export const duckdb_client_context = "pointer" as const;
/** duckdb_column: duckdb_column */
export const duckdb_column = "pointer" as const;
/** duckdb_config: duckdb_config */
export const duckdb_config = "u64" as const;
/** duckdb_connection: duckdb_connection */
export const duckdb_connection = "u64" as const;
/** duckdb_copy_callback_t: duckdb_copy_callback_t */
export const duckdb_copy_callback_t = "pointer" as const;
/** duckdb_create_type_info: duckdb_create_type_info */
export const duckdb_create_type_info = "pointer" as const;
/** duckdb_data_chunk: duckdb_data_chunk */
export const duckdb_data_chunk = "u64" as const;
/** duckdb_database: duckdb_database */
export const duckdb_database = "u64" as const;
/** duckdb_date: duckdb_date */
export const duckdb_date = "pointer" as const;
/** duckdb_date_struct: duckdb_date_struct */
export const duckdb_date_struct = "pointer" as const;
/** duckdb_decimal: duckdb_decimal */
export const duckdb_decimal = "pointer" as const;
/** duckdb_delete_callback_t: duckdb_delete_callback_t */
export const duckdb_delete_callback_t = "pointer" as const;
/** duckdb_error_data: duckdb_error_data */
export const duckdb_error_data = "pointer" as const;
/** duckdb_expression: duckdb_expression */
export const duckdb_expression = "pointer" as const;
/** duckdb_extension_info: duckdb_extension_info */
export const duckdb_extension_info = "pointer" as const;
/** duckdb_extracted_statements: duckdb_extracted_statements */
export const duckdb_extracted_statements = "pointer" as const;
/** duckdb_function_info: duckdb_function_info */
export const duckdb_function_info = "pointer" as const;
/** duckdb_hugeint: duckdb_hugeint */
export const duckdb_hugeint = "pointer" as const;
/** duckdb_init_info: duckdb_init_info */
export const duckdb_init_info = "pointer" as const;
/** duckdb_instance_cache: duckdb_instance_cache */
export const duckdb_instance_cache = "u64" as const;
/** duckdb_interval: duckdb_interval */
export const duckdb_interval = "pointer" as const;
/** duckdb_list_entry: duckdb_list_entry */
export const duckdb_list_entry = "pointer" as const;
/** duckdb_logical_type: duckdb_logical_type */
export const duckdb_logical_type = "u64" as const;
/** duckdb_pending_result: duckdb_pending_result */
export const duckdb_pending_result = "u64" as const;
/** duckdb_prepared_statement: duckdb_prepared_statement */
export const duckdb_prepared_statement = "u64" as const;
/** duckdb_profiling_info: duckdb_profiling_info */
export const duckdb_profiling_info = "pointer" as const;
/** duckdb_query_progress_type: duckdb_query_progress_type */
export const duckdb_query_progress_type = "pointer" as const;
/** duckdb_replacement_callback_t: duckdb_replacement_callback_t */
export const duckdb_replacement_callback_t = "pointer" as const;
/** duckdb_replacement_scan_info: duckdb_replacement_scan_info */
export const duckdb_replacement_scan_info = "pointer" as const;
/** duckdb_result: duckdb_result */
export const duckdb_result = "u64" as const;
/** duckdb_scalar_function: duckdb_scalar_function */
export const duckdb_scalar_function = "pointer" as const;
/** duckdb_scalar_function_bind_t: duckdb_scalar_function_bind_t */
export const duckdb_scalar_function_bind_t = "pointer" as const;
/** duckdb_scalar_function_set: duckdb_scalar_function_set */
export const duckdb_scalar_function_set = "pointer" as const;
/** duckdb_scalar_function_t: duckdb_scalar_function_t */
export const duckdb_scalar_function_t = "pointer" as const;
/** duckdb_selection_vector: duckdb_selection_vector */
export const duckdb_selection_vector = "pointer" as const;
/** duckdb_string: duckdb_string */
export const duckdb_string = "pointer" as const;
/** duckdb_string_t: duckdb_string_t */
export const duckdb_string_t = "pointer" as const;
/** duckdb_table_description: duckdb_table_description */
export const duckdb_table_description = "pointer" as const;
/** duckdb_table_function: duckdb_table_function */
export const duckdb_table_function = "pointer" as const;
/** duckdb_table_function_bind_t: duckdb_table_function_bind_t */
export const duckdb_table_function_bind_t = "pointer" as const;
/** duckdb_table_function_init_t: duckdb_table_function_init_t */
export const duckdb_table_function_init_t = "pointer" as const;
/** duckdb_table_function_t: duckdb_table_function_t */
export const duckdb_table_function_t = "pointer" as const;
/** duckdb_task_state: duckdb_task_state */
export const duckdb_task_state = "pointer" as const;
/** duckdb_time: duckdb_time */
export const duckdb_time = "pointer" as const;
/** duckdb_time_ns: duckdb_time_ns */
export const duckdb_time_ns = "pointer" as const;
/** duckdb_time_struct: duckdb_time_struct */
export const duckdb_time_struct = "pointer" as const;
/** duckdb_time_tz: duckdb_time_tz */
export const duckdb_time_tz = "pointer" as const;
/** duckdb_time_tz_struct: duckdb_time_tz_struct */
export const duckdb_time_tz_struct = "pointer" as const;
/** duckdb_timestamp: duckdb_timestamp */
export const duckdb_timestamp = "pointer" as const;
/** duckdb_timestamp_ms: duckdb_timestamp_ms */
export const duckdb_timestamp_ms = "pointer" as const;
/** duckdb_timestamp_ns: duckdb_timestamp_ns */
export const duckdb_timestamp_ns = "pointer" as const;
/** duckdb_timestamp_s: duckdb_timestamp_s */
export const duckdb_timestamp_s = "pointer" as const;
/** duckdb_timestamp_struct: duckdb_timestamp_struct */
export const duckdb_timestamp_struct = "pointer" as const;
/** duckdb_uhugeint: duckdb_uhugeint */
export const duckdb_uhugeint = "pointer" as const;
/** duckdb_value: duckdb_value */
export const duckdb_value = "u64" as const;
/** duckdb_vector: duckdb_vector */
export const duckdb_vector = "u64" as const;
/** idx_t: idx_t */
export const idx_t = "u64" as const;
/** int_fast16_t: int_fast16_t */
export const int_fast16_t = "i64" as const;
/** int_fast32_t: int_fast32_t */
export const int_fast32_t = "i64" as const;
/** int_fast64_t: int_fast64_t */
export const int_fast64_t = "i64" as const;
/** int_fast8_t: int_fast8_t */
export const int_fast8_t = "i8" as const;
/** intptr_t: intptr_t */
export const intptr_t = "i64" as const;
/** max_align_t: max_align_t */
export const max_align_t = "pointer" as const;
/** ptrdiff_t: ptrdiff_t */
export const ptrdiff_t = "i64" as const;
/** sel_t: sel_t */
export const sel_t = "u32" as const;
/** size_t: size_t */
export const size_t = "u64" as const;
/** uint_fast16_t: uint_fast16_t */
export const uint_fast16_t = "u64" as const;
/** uint_fast32_t: uint_fast32_t */
export const uint_fast32_t = "u64" as const;
/** uint_fast64_t: uint_fast64_t */
export const uint_fast64_t = "u64" as const;
/** uint_fast8_t: uint_fast8_t */
export const uint_fast8_t = "u8" as const;
/** uintptr_t: uintptr_t */
export const uintptr_t = "u64" as const;
/** wchar_t: wchar_t */
export const wchar_t = "i32" as const;

// Pointer types for handle types (used for out parameters)
/** duckdb_appender_ptr: Pointer type for duckdb_appender (used for out parameters) */
export const duckdb_appender_ptr = "buffer" as const;
/** duckdb_arrow_ptr: Pointer type for duckdb_arrow (used for out parameters) */
export const duckdb_arrow_ptr = "buffer" as const;
/** duckdb_arrow_array_ptr: Pointer type for duckdb_arrow_array (used for out parameters) */
export const duckdb_arrow_array_ptr = "buffer" as const;
/** duckdb_arrow_schema_ptr: Pointer type for duckdb_arrow_schema (used for out parameters) */
export const duckdb_arrow_schema_ptr = "buffer" as const;
/** duckdb_config_ptr: Pointer type for duckdb_config (used for out parameters) */
export const duckdb_config_ptr = "buffer" as const;
/** duckdb_connection_ptr: Pointer type for duckdb_connection (used for out parameters) */
export const duckdb_connection_ptr = "buffer" as const;
/** duckdb_data_chunk_ptr: Pointer type for duckdb_data_chunk (used for out parameters) */
export const duckdb_data_chunk_ptr = "buffer" as const;
/** duckdb_database_ptr: Pointer type for duckdb_database (used for out parameters) */
export const duckdb_database_ptr = "buffer" as const;
/** duckdb_instance_cache_ptr: Pointer type for duckdb_instance_cache (used for out parameters) */
export const duckdb_instance_cache_ptr = "buffer" as const;
/** duckdb_logical_type_ptr: Pointer type for duckdb_logical_type (used for out parameters) */
export const duckdb_logical_type_ptr = "buffer" as const;
/** duckdb_pending_result_ptr: Pointer type for duckdb_pending_result (used for out parameters) */
export const duckdb_pending_result_ptr = "buffer" as const;
/** duckdb_prepared_statement_ptr: Pointer type for duckdb_prepared_statement (used for out parameters) */
export const duckdb_prepared_statement_ptr = "buffer" as const;
/** duckdb_result_ptr: Pointer type for duckdb_result (used for out parameters) */
export const duckdb_result_ptr = "buffer" as const;
/** duckdb_value_ptr: Pointer type for duckdb_value (used for out parameters) */
export const duckdb_value_ptr = "buffer" as const;
/** duckdb_vector_ptr: Pointer type for duckdb_vector (used for out parameters) */
export const duckdb_vector_ptr = "buffer" as const;
