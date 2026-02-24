// Struct descriptors
export const __fsid_t = { struct: ["pointer"] } as const;
export const max_align_t = { struct: ["i64", "pointer"] } as const;
export const duckdb_date = { struct: ["i32"] } as const;
export const duckdb_date_struct = { struct: ["i32", "i8", "i8"] } as const;
export const duckdb_time = { struct: ["i64"] } as const;
export const duckdb_time_struct = {
  struct: ["i8", "i8", "i8", "i32"],
} as const;
export const duckdb_time_ns = { struct: ["i64"] } as const;
export const duckdb_time_tz = { struct: ["u64"] } as const;
export const duckdb_time_tz_struct = { struct: ["pointer", "i32"] } as const;
export const duckdb_timestamp = { struct: ["i64"] } as const;
export const duckdb_timestamp_struct = {
  struct: ["pointer", "pointer"],
} as const;
export const duckdb_timestamp_s = { struct: ["i64"] } as const;
export const duckdb_timestamp_ms = { struct: ["i64"] } as const;
export const duckdb_timestamp_ns = { struct: ["i64"] } as const;
export const duckdb_interval = { struct: ["i32", "i32", "i64"] } as const;
export const duckdb_hugeint = { struct: ["u64", "i64"] } as const;
export const duckdb_uhugeint = { struct: ["u64", "u64"] } as const;
export const duckdb_decimal = { struct: ["u8", "u8", "pointer"] } as const;
export const duckdb_query_progress_type = {
  struct: ["f64", "u64", "u64"],
} as const;
export const duckdb_string_t = { struct: ["pointer"] } as const;
export const duckdb_list_entry = { struct: ["u64", "u64"] } as const;
export const duckdb_column = {
  struct: ["pointer", "pointer", "i32", "pointer", "pointer"],
} as const;
export const _duckdb_vector = { struct: ["pointer"] } as const;
export const _duckdb_selection_vector = { struct: ["pointer"] } as const;
export const duckdb_string = { struct: ["pointer", "u64"] } as const;
export const duckdb_blob = { struct: ["pointer", "u64"] } as const;
export const duckdb_bit = { struct: ["pointer", "u64"] } as const;
export const duckdb_bignum = { struct: ["pointer", "u64", "u8"] } as const;
export const duckdb_result = {
  struct: ["u64", "u64", "u64", "pointer", "pointer", "pointer"],
} as const;
export const _duckdb_instance_cache = { struct: ["pointer"] } as const;
export const _duckdb_database = { struct: ["pointer"] } as const;
export const _duckdb_connection = { struct: ["pointer"] } as const;
export const _duckdb_client_context = { struct: ["pointer"] } as const;
export const _duckdb_prepared_statement = { struct: ["pointer"] } as const;
export const _duckdb_extracted_statements = { struct: ["pointer"] } as const;
export const _duckdb_pending_result = { struct: ["pointer"] } as const;
export const _duckdb_appender = { struct: ["pointer"] } as const;
export const _duckdb_table_description = { struct: ["pointer"] } as const;
export const _duckdb_config = { struct: ["pointer"] } as const;
export const _duckdb_logical_type = { struct: ["pointer"] } as const;
export const _duckdb_create_type_info = { struct: ["pointer"] } as const;
export const _duckdb_data_chunk = { struct: ["pointer"] } as const;
export const _duckdb_value = { struct: ["pointer"] } as const;
export const _duckdb_profiling_info = { struct: ["pointer"] } as const;
export const _duckdb_error_data = { struct: ["pointer"] } as const;
export const _duckdb_expression = { struct: ["pointer"] } as const;
export const _duckdb_extension_info = { struct: ["pointer"] } as const;
export const _duckdb_function_info = { struct: ["pointer"] } as const;
export const _duckdb_bind_info = { struct: ["pointer"] } as const;
export const _duckdb_scalar_function = { struct: ["pointer"] } as const;
export const _duckdb_scalar_function_set = { struct: ["pointer"] } as const;
export const _duckdb_aggregate_function = { struct: ["pointer"] } as const;
export const _duckdb_aggregate_function_set = { struct: ["pointer"] } as const;
export const _duckdb_aggregate_state = { struct: ["pointer"] } as const;
export const _duckdb_table_function = { struct: ["pointer"] } as const;
export const _duckdb_init_info = { struct: ["pointer"] } as const;
export const _duckdb_cast_function = { struct: ["pointer"] } as const;
export const _duckdb_replacement_scan_info = { struct: ["pointer"] } as const;
export const ArrowArray = { struct: [] } as const;
export const ArrowSchema = { struct: [] } as const;
export const _duckdb_arrow = { struct: ["pointer"] } as const;
export const _duckdb_arrow_stream = { struct: ["pointer"] } as const;
export const _duckdb_arrow_schema = { struct: ["pointer"] } as const;
export const _duckdb_arrow_converted_schema = { struct: ["pointer"] } as const;
export const _duckdb_arrow_array = { struct: ["pointer"] } as const;
export const _duckdb_arrow_options = { struct: ["pointer"] } as const;
export const duckdb_extension_access = {
  struct: ["pointer", "pointer", "pointer"],
} as const;

export const symbols = {
  duckdb_create_instance_cache: {
    parameters: [],
    result: "pointer",
  },
  duckdb_get_or_create_from_cache: {
    parameters: ["pointer", "pointer", "buffer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_destroy_instance_cache: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_open: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_open_ext: {
    parameters: ["pointer", "buffer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_close: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_connect: {
    parameters: ["u64", "buffer"],
    result: "u8",
  },
  duckdb_interrupt: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_query_progress: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_disconnect: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_connection_get_client_context: {
    parameters: ["u64", "buffer"],
    result: "void",
  },
  duckdb_connection_get_arrow_options: {
    parameters: ["u64", "buffer"],
    result: "void",
  },
  duckdb_client_context_get_connection_id: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_destroy_client_context: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_destroy_arrow_options: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_library_version: {
    parameters: [],
    result: "pointer",
  },
  duckdb_get_table_names: {
    parameters: ["u64", "pointer", "u8"],
    result: "pointer",
  },
  duckdb_create_config: {
    parameters: ["buffer"],
    result: "u8",
  },
  duckdb_config_count: {
    parameters: [],
    result: "usize",
  },
  duckdb_get_config_flag: {
    parameters: ["usize", "buffer", "buffer"],
    result: "u8",
  },
  duckdb_set_config: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "u8",
  },
  duckdb_destroy_config: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_create_error_data: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  duckdb_destroy_error_data: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_error_data_error_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_error_data_message: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_error_data_has_error: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_query: {
    parameters: ["u64", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_destroy_result: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_column_name: {
    parameters: ["buffer", "u64"],
    result: "pointer",
  },
  duckdb_column_type: {
    parameters: ["buffer", "u64"],
    result: "i32",
  },
  duckdb_result_statement_type: {
    parameters: ["u64"],
    result: "i32",
  },
  duckdb_column_logical_type: {
    parameters: ["buffer", "u64"],
    result: "pointer",
  },
  duckdb_result_get_arrow_options: {
    parameters: ["buffer"],
    result: "pointer",
  },
  duckdb_column_count: {
    parameters: ["buffer"],
    result: "u64",
  },
  duckdb_row_count: {
    parameters: ["buffer"],
    result: "u64",
  },
  duckdb_rows_changed: {
    parameters: ["buffer"],
    result: "u64",
  },
  duckdb_column_data: {
    parameters: ["buffer", "u64"],
    result: "pointer",
  },
  duckdb_nullmask_data: {
    parameters: ["buffer", "u64"],
    result: "pointer",
  },
  duckdb_result_error: {
    parameters: ["buffer"],
    result: "pointer",
  },
  duckdb_result_error_type: {
    parameters: ["buffer"],
    result: "pointer",
  },
  duckdb_result_get_chunk: {
    parameters: ["u64", "u64"],
    result: "pointer",
  },
  duckdb_result_is_streaming: {
    parameters: ["u64"],
    result: "u8",
  },
  duckdb_result_chunk_count: {
    parameters: ["u64"],
    result: "u64",
  },
  duckdb_result_return_type: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_value_boolean: {
    parameters: ["buffer", "u64", "u64"],
    result: "u8",
  },
  duckdb_value_int8: {
    parameters: ["buffer", "u64", "u64"],
    result: "i8",
  },
  duckdb_value_int16: {
    parameters: ["buffer", "u64", "u64"],
    result: "i16",
  },
  duckdb_value_int32: {
    parameters: ["buffer", "u64", "u64"],
    result: "i32",
  },
  duckdb_value_int64: {
    parameters: ["buffer", "u64", "u64"],
    result: "i64",
  },
  duckdb_value_hugeint: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_uhugeint: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_decimal: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_uint8: {
    parameters: ["buffer", "u64", "u64"],
    result: "u8",
  },
  duckdb_value_uint16: {
    parameters: ["buffer", "u64", "u64"],
    result: "u16",
  },
  duckdb_value_uint32: {
    parameters: ["buffer", "u64", "u64"],
    result: "u32",
  },
  duckdb_value_uint64: {
    parameters: ["buffer", "u64", "u64"],
    result: "u64",
  },
  duckdb_value_float: {
    parameters: ["buffer", "u64", "u64"],
    result: "f32",
  },
  duckdb_value_double: {
    parameters: ["buffer", "u64", "u64"],
    result: "f64",
  },
  duckdb_value_date: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_time: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_timestamp: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_interval: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_varchar: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_string: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_varchar_internal: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_string_internal: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_blob: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_value_is_null: {
    parameters: ["buffer", "u64", "u64"],
    result: "u8",
  },
  duckdb_malloc: {
    parameters: ["usize"],
    result: "pointer",
  },
  duckdb_free: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_vector_size: {
    parameters: [],
    result: "u64",
  },
  duckdb_string_is_inlined: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_string_t_length: {
    parameters: ["pointer"],
    result: "u32",
  },
  duckdb_string_t_data: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_from_date: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_to_date: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_is_finite_date: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_from_time: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_time_tz: {
    parameters: ["i64", "i32"],
    result: "pointer",
  },
  duckdb_from_time_tz: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_to_time: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_from_timestamp: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_to_timestamp: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_is_finite_timestamp: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_is_finite_timestamp_s: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_is_finite_timestamp_ms: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_is_finite_timestamp_ns: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_hugeint_to_double: {
    parameters: ["pointer"],
    result: "f64",
  },
  duckdb_double_to_hugeint: {
    parameters: ["f64"],
    result: "pointer",
  },
  duckdb_uhugeint_to_double: {
    parameters: ["pointer"],
    result: "f64",
  },
  duckdb_double_to_uhugeint: {
    parameters: ["f64"],
    result: "pointer",
  },
  duckdb_double_to_decimal: {
    parameters: ["f64", "u8", "u8"],
    result: "pointer",
  },
  duckdb_decimal_to_double: {
    parameters: ["pointer"],
    result: "f64",
  },
  duckdb_prepare: {
    parameters: ["u64", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_destroy_prepare: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_prepare_error: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_nparams: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_parameter_name: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_param_type: {
    parameters: ["pointer", "u64"],
    result: "i32",
  },
  duckdb_param_logical_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_clear_bindings: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_prepared_statement_type: {
    parameters: ["pointer"],
    result: "i32",
  },
  duckdb_prepared_statement_column_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_prepared_statement_column_name: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_prepared_statement_column_logical_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_prepared_statement_column_type: {
    parameters: ["pointer", "u64"],
    result: "i32",
  },
  duckdb_bind_value: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_parameter_index: {
    parameters: ["pointer", "buffer", "pointer"],
    result: "u8",
  },
  duckdb_bind_boolean: {
    parameters: ["pointer", "u64", "u8"],
    result: "u8",
  },
  duckdb_bind_int8: {
    parameters: ["pointer", "u64", "i8"],
    result: "u8",
  },
  duckdb_bind_int16: {
    parameters: ["pointer", "u64", "i16"],
    result: "u8",
  },
  duckdb_bind_int32: {
    parameters: ["pointer", "u64", "i32"],
    result: "u8",
  },
  duckdb_bind_int64: {
    parameters: ["pointer", "u64", "i64"],
    result: "u8",
  },
  duckdb_bind_hugeint: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_uhugeint: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_decimal: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_uint8: {
    parameters: ["pointer", "u64", "u8"],
    result: "u8",
  },
  duckdb_bind_uint16: {
    parameters: ["pointer", "u64", "u16"],
    result: "u8",
  },
  duckdb_bind_uint32: {
    parameters: ["pointer", "u64", "u32"],
    result: "u8",
  },
  duckdb_bind_uint64: {
    parameters: ["pointer", "u64", "u64"],
    result: "u8",
  },
  duckdb_bind_float: {
    parameters: ["pointer", "u64", "f32"],
    result: "u8",
  },
  duckdb_bind_double: {
    parameters: ["pointer", "u64", "f64"],
    result: "u8",
  },
  duckdb_bind_date: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_time: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_timestamp: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_timestamp_tz: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_interval: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_varchar: {
    parameters: ["pointer", "u64", "pointer"],
    result: "u8",
  },
  duckdb_bind_varchar_length: {
    parameters: ["pointer", "u64", "pointer", "u64"],
    result: "u8",
  },
  duckdb_bind_blob: {
    parameters: ["pointer", "u64", "pointer", "u64"],
    result: "u8",
  },
  duckdb_bind_null: {
    parameters: ["pointer", "u64"],
    result: "u8",
  },
  duckdb_execute_prepared: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_execute_prepared_streaming: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_extract_statements: {
    parameters: ["u64", "pointer", "buffer"],
    result: "u64",
  },
  duckdb_prepare_extracted_statement: {
    parameters: ["u64", "pointer", "u64", "buffer"],
    result: "u8",
  },
  duckdb_extract_statements_error: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_destroy_extracted: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_pending_prepared: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_pending_prepared_streaming: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_destroy_pending: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_pending_error: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_pending_execute_task: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_pending_execute_check_state: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_execute_pending: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_pending_execution_is_finished: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_destroy_value: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_create_varchar: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_varchar_length: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_create_bool: {
    parameters: ["u8"],
    result: "pointer",
  },
  duckdb_create_int8: {
    parameters: ["i8"],
    result: "pointer",
  },
  duckdb_create_uint8: {
    parameters: ["u8"],
    result: "pointer",
  },
  duckdb_create_int16: {
    parameters: ["i16"],
    result: "pointer",
  },
  duckdb_create_uint16: {
    parameters: ["u16"],
    result: "pointer",
  },
  duckdb_create_int32: {
    parameters: ["i32"],
    result: "pointer",
  },
  duckdb_create_uint32: {
    parameters: ["u32"],
    result: "pointer",
  },
  duckdb_create_uint64: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_create_int64: {
    parameters: ["i64"],
    result: "pointer",
  },
  duckdb_create_hugeint: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_uhugeint: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_bignum: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_decimal: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_float: {
    parameters: ["f32"],
    result: "pointer",
  },
  duckdb_create_double: {
    parameters: ["f64"],
    result: "pointer",
  },
  duckdb_create_date: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_time: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_time_ns: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_time_tz_value: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_timestamp: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_timestamp_tz: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_timestamp_s: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_timestamp_ms: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_timestamp_ns: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_interval: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_blob: {
    parameters: ["u64", "u64"],
    result: "pointer",
  },
  duckdb_create_bit: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_uuid: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_bool: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_get_int8: {
    parameters: ["pointer"],
    result: "i8",
  },
  duckdb_get_uint8: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_get_int16: {
    parameters: ["pointer"],
    result: "i16",
  },
  duckdb_get_uint16: {
    parameters: ["pointer"],
    result: "u16",
  },
  duckdb_get_int32: {
    parameters: ["pointer"],
    result: "i32",
  },
  duckdb_get_uint32: {
    parameters: ["pointer"],
    result: "u32",
  },
  duckdb_get_int64: {
    parameters: ["pointer"],
    result: "i64",
  },
  duckdb_get_uint64: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_get_hugeint: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_uhugeint: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_bignum: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_decimal: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_float: {
    parameters: ["pointer"],
    result: "f32",
  },
  duckdb_get_double: {
    parameters: ["pointer"],
    result: "f64",
  },
  duckdb_get_date: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_time: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_time_ns: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_time_tz: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_timestamp: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_timestamp_tz: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_timestamp_s: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_timestamp_ms: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_timestamp_ns: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_interval: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_value_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_blob: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_bit: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_uuid: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_get_varchar: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_struct_value: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_create_list_value: {
    parameters: ["pointer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_create_array_value: {
    parameters: ["pointer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_create_map_value: {
    parameters: ["pointer", "u64", "u64", "u64"],
    result: "pointer",
  },
  duckdb_create_union_value: {
    parameters: ["pointer", "u64", "pointer"],
    result: "pointer",
  },
  duckdb_get_map_size: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_get_map_key: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_get_map_value: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_is_null_value: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_create_null_value: {
    parameters: [],
    result: "pointer",
  },
  duckdb_get_list_size: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_get_list_child: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_create_enum_value: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_get_enum_value: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_get_struct_child: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_value_to_string: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_logical_type: {
    parameters: ["i32"],
    result: "pointer",
  },
  duckdb_logical_type_get_alias: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_logical_type_set_alias: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_create_list_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_array_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_create_map_type: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  duckdb_create_union_type: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_create_struct_type: {
    parameters: ["buffer", "u64", "u64"],
    result: "pointer",
  },
  duckdb_create_enum_type: {
    parameters: ["u64", "u64"],
    result: "pointer",
  },
  duckdb_create_decimal_type: {
    parameters: ["u8", "u8"],
    result: "pointer",
  },
  duckdb_get_type_id: {
    parameters: ["pointer"],
    result: "i32",
  },
  duckdb_decimal_width: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_decimal_scale: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_decimal_internal_type: {
    parameters: ["pointer"],
    result: "i32",
  },
  duckdb_enum_internal_type: {
    parameters: ["pointer"],
    result: "i32",
  },
  duckdb_enum_dictionary_size: {
    parameters: ["pointer"],
    result: "u32",
  },
  duckdb_enum_dictionary_value: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_list_type_child_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_array_type_child_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_array_type_array_size: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_map_type_key_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_map_type_value_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_struct_type_child_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_struct_type_child_name: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_struct_type_child_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_union_type_member_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_union_type_member_name: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_union_type_member_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_destroy_logical_type: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_register_logical_type: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "u8",
  },
  duckdb_create_data_chunk: {
    parameters: ["buffer", "u64"],
    result: "pointer",
  },
  duckdb_destroy_data_chunk: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_data_chunk_reset: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_data_chunk_get_column_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_data_chunk_get_vector: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_data_chunk_get_size: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_data_chunk_set_size: {
    parameters: ["pointer", "u64"],
    result: "void",
  },
  duckdb_create_vector: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_destroy_vector: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_vector_get_column_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_vector_get_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_vector_get_validity: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_vector_ensure_validity_writable: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_vector_assign_string_element: {
    parameters: ["pointer", "u64", "pointer"],
    result: "void",
  },
  duckdb_vector_assign_string_element_len: {
    parameters: ["pointer", "u64", "pointer", "u64"],
    result: "void",
  },
  duckdb_list_vector_get_child: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_list_vector_get_size: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_list_vector_set_size: {
    parameters: ["pointer", "u64"],
    result: "u8",
  },
  duckdb_list_vector_reserve: {
    parameters: ["pointer", "u64"],
    result: "u8",
  },
  duckdb_struct_vector_get_child: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_array_vector_get_child: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_slice_vector: {
    parameters: ["pointer", "pointer", "u64"],
    result: "void",
  },
  duckdb_vector_copy_sel: {
    parameters: ["pointer", "pointer", "pointer", "u64", "u64", "u64"],
    result: "void",
  },
  duckdb_vector_reference_value: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_vector_reference_vector: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_validity_row_is_valid: {
    parameters: ["u64", "u64"],
    result: "u8",
  },
  duckdb_validity_set_row_validity: {
    parameters: ["u64", "u64", "u8"],
    result: "void",
  },
  duckdb_validity_set_row_invalid: {
    parameters: ["u64", "u64"],
    result: "void",
  },
  duckdb_validity_set_row_valid: {
    parameters: ["u64", "u64"],
    result: "void",
  },
  duckdb_create_scalar_function: {
    parameters: [],
    result: "pointer",
  },
  duckdb_destroy_scalar_function: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_scalar_function_set_name: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_varargs: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_special_handling: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_volatile: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_scalar_function_add_parameter: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_return_type: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_extra_info: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_bind: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_bind_data: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_bind_data_copy: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_bind_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_scalar_function_set_function: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_register_scalar_function: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_scalar_function_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_scalar_function_bind_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_scalar_function_get_bind_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_scalar_function_get_client_context: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  duckdb_scalar_function_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_create_scalar_function_set: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_destroy_scalar_function_set: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_add_scalar_function_to_set: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_register_scalar_function_set: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_scalar_function_bind_get_argument_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_scalar_function_bind_get_argument: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_create_selection_vector: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_destroy_selection_vector: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_selection_vector_get_data_ptr: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_create_aggregate_function: {
    parameters: [],
    result: "pointer",
  },
  duckdb_destroy_aggregate_function: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_aggregate_function_set_name: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_aggregate_function_add_parameter: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_aggregate_function_set_return_type: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_aggregate_function_set_functions: {
    parameters: [
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
    ],
    result: "void",
  },
  duckdb_aggregate_function_set_destructor: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_register_aggregate_function: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_aggregate_function_set_special_handling: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_aggregate_function_set_extra_info: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_aggregate_function_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_aggregate_function_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_create_aggregate_function_set: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_destroy_aggregate_function_set: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_add_aggregate_function_to_set: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_register_aggregate_function_set: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_create_table_function: {
    parameters: [],
    result: "pointer",
  },
  duckdb_destroy_table_function: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_table_function_set_name: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_add_parameter: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_add_named_parameter: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_set_extra_info: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_set_bind: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_set_init: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_set_local_init: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_set_function: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_table_function_supports_projection_pushdown: {
    parameters: ["pointer", "u8"],
    result: "void",
  },
  duckdb_register_table_function: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_bind_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_table_function_get_client_context: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  duckdb_bind_add_result_column: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_bind_get_parameter_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_bind_get_parameter: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_bind_get_named_parameter: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  duckdb_bind_set_bind_data: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_bind_set_cardinality: {
    parameters: ["pointer", "u64", "u8"],
    result: "void",
  },
  duckdb_bind_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_init_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_init_get_bind_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_init_set_init_data: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_init_get_column_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_init_get_column_index: {
    parameters: ["pointer", "u64"],
    result: "u64",
  },
  duckdb_init_set_max_threads: {
    parameters: ["pointer", "u64"],
    result: "void",
  },
  duckdb_init_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_function_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_function_get_bind_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_function_get_init_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_function_get_local_init_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_function_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_add_replacement_scan: {
    parameters: ["pointer", "pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_replacement_scan_set_function_name: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_replacement_scan_add_parameter: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_replacement_scan_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_get_profiling_info: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_profiling_info_get_value: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  duckdb_profiling_info_get_metrics: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_profiling_info_get_child_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_profiling_info_get_child: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_appender_create: {
    parameters: ["u64", "pointer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_appender_create_ext: {
    parameters: ["u64", "pointer", "pointer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_appender_create_query: {
    parameters: ["u64", "pointer", "u64", "buffer", "pointer", "u64", "buffer"],
    result: "u8",
  },
  duckdb_appender_column_count: {
    parameters: ["pointer"],
    result: "u64",
  },
  duckdb_appender_column_type: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_appender_error: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_appender_error_data: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_appender_flush: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_appender_close: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_appender_destroy: {
    parameters: ["buffer"],
    result: "u8",
  },
  duckdb_appender_add_column: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_appender_clear_columns: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_appender_begin_row: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_appender_end_row: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_append_default: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_append_default_to_chunk: {
    parameters: ["pointer", "pointer", "u64", "u64"],
    result: "u8",
  },
  duckdb_append_bool: {
    parameters: ["pointer", "u8"],
    result: "u8",
  },
  duckdb_append_int8: {
    parameters: ["pointer", "i8"],
    result: "u8",
  },
  duckdb_append_int16: {
    parameters: ["pointer", "i16"],
    result: "u8",
  },
  duckdb_append_int32: {
    parameters: ["pointer", "i32"],
    result: "u8",
  },
  duckdb_append_int64: {
    parameters: ["pointer", "i64"],
    result: "u8",
  },
  duckdb_append_hugeint: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_uint8: {
    parameters: ["pointer", "u8"],
    result: "u8",
  },
  duckdb_append_uint16: {
    parameters: ["pointer", "u16"],
    result: "u8",
  },
  duckdb_append_uint32: {
    parameters: ["pointer", "u32"],
    result: "u8",
  },
  duckdb_append_uint64: {
    parameters: ["pointer", "u64"],
    result: "u8",
  },
  duckdb_append_uhugeint: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_float: {
    parameters: ["pointer", "f32"],
    result: "u8",
  },
  duckdb_append_double: {
    parameters: ["pointer", "f64"],
    result: "u8",
  },
  duckdb_append_date: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_time: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_timestamp: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_interval: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_varchar: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_varchar_length: {
    parameters: ["pointer", "pointer", "u64"],
    result: "u8",
  },
  duckdb_append_blob: {
    parameters: ["pointer", "pointer", "u64"],
    result: "u8",
  },
  duckdb_append_null: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_append_value: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_append_data_chunk: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_table_description_create: {
    parameters: ["u64", "pointer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_table_description_create_ext: {
    parameters: ["u64", "pointer", "pointer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_table_description_destroy: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_table_description_error: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_column_has_default: {
    parameters: ["pointer", "u64", "buffer"],
    result: "u8",
  },
  duckdb_table_description_get_column_name: {
    parameters: ["pointer", "u64"],
    result: "pointer",
  },
  duckdb_to_arrow_schema: {
    parameters: ["pointer", "buffer", "u64", "u64", "buffer"],
    result: "pointer",
  },
  duckdb_data_chunk_to_arrow: {
    parameters: ["pointer", "pointer", "buffer"],
    result: "pointer",
  },
  duckdb_schema_from_arrow: {
    parameters: ["u64", "u64", "buffer"],
    result: "pointer",
  },
  duckdb_data_chunk_from_arrow: {
    parameters: ["u64", "u64", "pointer", "buffer"],
    result: "pointer",
  },
  duckdb_destroy_arrow_converted_schema: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_query_arrow: {
    parameters: ["u64", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_query_arrow_schema: {
    parameters: ["u64", "buffer"],
    result: "u8",
  },
  duckdb_prepared_arrow_schema: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_result_arrow_array: {
    parameters: ["u64", "pointer", "buffer"],
    result: "void",
  },
  duckdb_query_arrow_array: {
    parameters: ["u64", "buffer"],
    result: "u8",
  },
  duckdb_arrow_column_count: {
    parameters: ["u64"],
    result: "u64",
  },
  duckdb_arrow_row_count: {
    parameters: ["u64"],
    result: "u64",
  },
  duckdb_arrow_rows_changed: {
    parameters: ["u64"],
    result: "u64",
  },
  duckdb_query_arrow_error: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_destroy_arrow: {
    parameters: ["buffer"],
    result: "void",
  },
  duckdb_destroy_arrow_stream: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_execute_prepared_arrow: {
    parameters: ["pointer", "buffer"],
    result: "u8",
  },
  duckdb_arrow_scan: {
    parameters: ["u64", "pointer", "pointer"],
    result: "u8",
  },
  duckdb_arrow_array_scan: {
    parameters: ["u64", "pointer", "pointer", "pointer", "buffer"],
    result: "u8",
  },
  duckdb_execute_tasks: {
    parameters: ["u64", "u64"],
    result: "void",
  },
  duckdb_create_task_state: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_execute_tasks_state: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_execute_n_tasks_state: {
    parameters: ["pointer", "u64"],
    result: "u64",
  },
  duckdb_finish_execution: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_task_state_is_finished: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_destroy_task_state: {
    parameters: ["pointer"],
    result: "void",
  },
  duckdb_execution_is_finished: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_stream_fetch_chunk: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_fetch_chunk: {
    parameters: ["u64"],
    result: "pointer",
  },
  duckdb_create_cast_function: {
    parameters: [],
    result: "pointer",
  },
  duckdb_cast_function_set_source_type: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_cast_function_set_target_type: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_cast_function_set_implicit_cast_cost: {
    parameters: ["pointer", "i64"],
    result: "void",
  },
  duckdb_cast_function_set_function: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_cast_function_set_extra_info: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "void",
  },
  duckdb_cast_function_get_extra_info: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_cast_function_get_cast_mode: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_cast_function_set_error: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  duckdb_cast_function_set_row_error: {
    parameters: ["pointer", "pointer", "u64", "pointer"],
    result: "void",
  },
  duckdb_register_cast_function: {
    parameters: ["pointer", "pointer"],
    result: "u8",
  },
  duckdb_destroy_cast_function: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_destroy_expression: {
    parameters: ["u64"],
    result: "void",
  },
  duckdb_expression_return_type: {
    parameters: ["pointer"],
    result: "pointer",
  },
  duckdb_expression_is_foldable: {
    parameters: ["pointer"],
    result: "u8",
  },
  duckdb_expression_fold: {
    parameters: ["pointer", "pointer", "buffer"],
    result: "pointer",
  },
} as const satisfies Deno.ForeignLibraryInterface;

/**
 * Open the native library with optional path override
 */
export function open(path?: string): Deno.DynamicLibrary<typeof symbols> {
  if (path) {
    return Deno.dlopen(path, symbols);
  }

  // Try common library names based on OS
  const isWindows = Deno.build.os === "windows";
  const isMac = Deno.build.os === "darwin";
  const isLinux = Deno.build.os === "linux";

  const paths = [];
  if (isWindows) {
    paths.push("libduckdb.dll");
  } else if (isMac) {
    paths.push("libduckdb.dylib");
  } else if (isLinux) {
    paths.push("libduckdb.so");
  }

  for (const p of paths) {
    try {
      return Deno.dlopen(p, symbols);
    } catch {
      // Try next path
    }
  }

  throw new Error("Could not find native library");
}

/**
 * Convert a C string pointer to a JavaScript string
 */
export function ptrToCString(ptr: Deno.PointerValue): string {
  if (!ptr) return "";
  return new Deno.UnsafePointerView(ptr).getCString();
}

/**
 * Convert a JavaScript string to a C string pointer
 */
export function cstringToPtr(str: string): Deno.PointerValue {
  const encoder = new TextEncoder();
  const data = encoder.encode(str + "\0");
  const buffer = new Uint8Array(data);
  return Deno.UnsafePointer.of(buffer);
}
