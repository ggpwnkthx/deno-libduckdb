import {
  buffer,
  duckdb_aggregate_combine_t,
  duckdb_aggregate_destroy_t,
  duckdb_aggregate_finalize_t,
  duckdb_aggregate_function,
  duckdb_aggregate_function_set,
  duckdb_aggregate_init_t,
  duckdb_aggregate_state_size,
  duckdb_aggregate_update_t,
  duckdb_appender,
  duckdb_arrow,
  duckdb_arrow_array,
  duckdb_arrow_converted_schema,
  duckdb_arrow_options,
  duckdb_arrow_schema,
  duckdb_arrow_stream,
  duckdb_bignum,
  duckdb_bind_info,
  duckdb_bit,
  duckdb_blob,
  duckdb_cast_function,
  duckdb_cast_function_t,
  duckdb_client_context,
  duckdb_config,
  duckdb_connection,
  duckdb_copy_callback_t,
  duckdb_create_type_info,
  duckdb_data_chunk,
  duckdb_database,
  duckdb_date,
  duckdb_date_struct,
  duckdb_decimal,
  duckdb_delete_callback_t,
  duckdb_error_data,
  duckdb_expression,
  duckdb_extracted_statements,
  duckdb_function_info,
  duckdb_hugeint,
  duckdb_init_info,
  duckdb_instance_cache,
  duckdb_interval,
  duckdb_logical_type,
  duckdb_pending_result,
  duckdb_prepared_statement,
  duckdb_profiling_info,
  duckdb_query_progress_type,
  duckdb_replacement_callback_t,
  duckdb_replacement_scan_info,
  duckdb_result,
  duckdb_scalar_function,
  duckdb_scalar_function_bind_t,
  duckdb_scalar_function_set,
  duckdb_scalar_function_t,
  duckdb_selection_vector,
  duckdb_state,
  duckdb_statement_type,
  duckdb_string,
  duckdb_string_t,
  duckdb_table_description,
  duckdb_table_function,
  duckdb_table_function_bind_t,
  duckdb_table_function_init_t,
  duckdb_table_function_t,
  duckdb_task_state,
  duckdb_time,
  duckdb_time_ns,
  duckdb_time_struct,
  duckdb_time_tz,
  duckdb_time_tz_struct,
  duckdb_timestamp,
  duckdb_timestamp_ms,
  duckdb_timestamp_ns,
  duckdb_timestamp_s,
  duckdb_timestamp_struct,
  duckdb_uhugeint,
  duckdb_value,
  duckdb_vector,
  f32,
  f64,
  i16,
  i32,
  i64,
  i8,
  idx_t,
  pointer,
  size_t,
  u16,
  u32,
  u64,
  u8,
} from "./typedefs.ts";

export const symbols = {
  duckdb_create_instance_cache: {
    parameters: [],
    result: duckdb_instance_cache,
  },
  duckdb_get_or_create_from_cache: {
    parameters: [duckdb_instance_cache, pointer, buffer, duckdb_config, buffer],
    result: duckdb_state,
  },
  duckdb_destroy_instance_cache: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_open: {
    parameters: [pointer, buffer],
    result: duckdb_state,
  },
  duckdb_open_ext: {
    parameters: [pointer, buffer, duckdb_config, buffer],
    result: duckdb_state,
  },
  duckdb_close: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_connect: {
    parameters: [duckdb_database, buffer],
    result: duckdb_state,
  },
  duckdb_interrupt: {
    parameters: [duckdb_connection],
    result: "void",
  },
  duckdb_query_progress: {
    parameters: [duckdb_connection],
    result: duckdb_query_progress_type,
  },
  duckdb_disconnect: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_connection_get_client_context: {
    parameters: [duckdb_connection, buffer],
    result: "void",
  },
  duckdb_connection_get_arrow_options: {
    parameters: [duckdb_connection, buffer],
    result: "void",
  },
  duckdb_client_context_get_connection_id: {
    parameters: [duckdb_client_context],
    result: idx_t,
  },
  duckdb_destroy_client_context: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_destroy_arrow_options: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_library_version: {
    parameters: [],
    result: pointer,
  },
  duckdb_get_table_names: {
    parameters: [duckdb_connection, pointer, u8],
    result: duckdb_value,
  },
  duckdb_create_config: {
    parameters: [buffer],
    result: duckdb_state,
  },
  duckdb_config_count: {
    parameters: [],
    result: size_t,
  },
  duckdb_get_config_flag: {
    parameters: [size_t, buffer, buffer],
    result: duckdb_state,
  },
  duckdb_set_config: {
    parameters: [duckdb_config, pointer, pointer],
    result: duckdb_state,
  },
  duckdb_destroy_config: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_create_error_data: {
    parameters: [buffer, pointer],
    result: duckdb_error_data,
  },
  duckdb_destroy_error_data: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_error_data_error_type: {
    parameters: [duckdb_error_data],
    result: i32,
  },
  duckdb_error_data_message: {
    parameters: [duckdb_error_data],
    result: pointer,
  },
  duckdb_error_data_has_error: {
    parameters: [duckdb_error_data],
    result: u8,
  },
  duckdb_query: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_destroy_result: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_column_name: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  duckdb_column_type: {
    parameters: [buffer, idx_t],
    result: i32,
  },
  duckdb_result_statement_type: {
    parameters: [duckdb_result],
    result: duckdb_statement_type,
  },
  duckdb_column_logical_type: {
    parameters: [buffer, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_result_get_arrow_options: {
    parameters: [buffer],
    result: duckdb_arrow_options,
  },
  duckdb_column_count: {
    parameters: [buffer],
    result: idx_t,
  },
  duckdb_row_count: {
    parameters: [buffer],
    result: idx_t,
  },
  duckdb_rows_changed: {
    parameters: [buffer],
    result: idx_t,
  },
  duckdb_column_data: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  duckdb_nullmask_data: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  duckdb_result_error: {
    parameters: [buffer],
    result: pointer,
  },
  duckdb_result_error_type: {
    parameters: [buffer],
    result: i32,
  },
  duckdb_result_get_chunk: {
    parameters: [duckdb_result, idx_t],
    result: duckdb_data_chunk,
  },
  duckdb_result_is_streaming: {
    parameters: [duckdb_result],
    result: u8,
  },
  duckdb_result_chunk_count: {
    parameters: [duckdb_result],
    result: idx_t,
  },
  duckdb_result_return_type: {
    parameters: [duckdb_result],
    result: i32,
  },
  duckdb_value_boolean: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  duckdb_value_int8: {
    parameters: [buffer, idx_t, idx_t],
    result: i8,
  },
  duckdb_value_int16: {
    parameters: [buffer, idx_t, idx_t],
    result: i16,
  },
  duckdb_value_int32: {
    parameters: [buffer, idx_t, idx_t],
    result: i32,
  },
  duckdb_value_int64: {
    parameters: [buffer, idx_t, idx_t],
    result: i64,
  },
  duckdb_value_hugeint: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_hugeint,
  },
  duckdb_value_uhugeint: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_uhugeint,
  },
  duckdb_value_decimal: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_decimal,
  },
  duckdb_value_uint8: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  duckdb_value_uint16: {
    parameters: [buffer, idx_t, idx_t],
    result: u16,
  },
  duckdb_value_uint32: {
    parameters: [buffer, idx_t, idx_t],
    result: u32,
  },
  duckdb_value_uint64: {
    parameters: [buffer, idx_t, idx_t],
    result: u64,
  },
  duckdb_value_float: {
    parameters: [buffer, idx_t, idx_t],
    result: f32,
  },
  duckdb_value_double: {
    parameters: [buffer, idx_t, idx_t],
    result: f64,
  },
  duckdb_value_date: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_date,
  },
  duckdb_value_time: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_time,
  },
  duckdb_value_timestamp: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_timestamp,
  },
  duckdb_value_interval: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_interval,
  },
  duckdb_value_varchar: {
    parameters: [buffer, idx_t, idx_t],
    result: pointer,
  },
  duckdb_value_string: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_string,
  },
  duckdb_value_varchar_internal: {
    parameters: [buffer, idx_t, idx_t],
    result: pointer,
  },
  duckdb_value_string_internal: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_string,
  },
  duckdb_value_blob: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_blob,
  },
  duckdb_value_is_null: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  duckdb_malloc: {
    parameters: [size_t],
    result: pointer,
  },
  duckdb_free: {
    parameters: [pointer],
    result: "void",
  },
  duckdb_vector_size: {
    parameters: [],
    result: idx_t,
  },
  duckdb_string_is_inlined: {
    parameters: [duckdb_string_t],
    result: u8,
  },
  duckdb_string_t_length: {
    parameters: [duckdb_string_t],
    result: u32,
  },
  duckdb_string_t_data: {
    parameters: [buffer],
    result: pointer,
  },
  duckdb_from_date: {
    parameters: [duckdb_date],
    result: duckdb_date_struct,
  },
  duckdb_to_date: {
    parameters: [duckdb_date_struct],
    result: duckdb_date,
  },
  duckdb_is_finite_date: {
    parameters: [duckdb_date],
    result: u8,
  },
  duckdb_from_time: {
    parameters: [duckdb_time],
    result: duckdb_time_struct,
  },
  duckdb_create_time_tz: {
    parameters: [i64, i32],
    result: duckdb_time_tz,
  },
  duckdb_from_time_tz: {
    parameters: [duckdb_time_tz],
    result: duckdb_time_tz_struct,
  },
  duckdb_to_time: {
    parameters: [duckdb_time_struct],
    result: duckdb_time,
  },
  duckdb_from_timestamp: {
    parameters: [duckdb_timestamp],
    result: duckdb_timestamp_struct,
  },
  duckdb_to_timestamp: {
    parameters: [duckdb_timestamp_struct],
    result: duckdb_timestamp,
  },
  duckdb_is_finite_timestamp: {
    parameters: [duckdb_timestamp],
    result: u8,
  },
  duckdb_is_finite_timestamp_s: {
    parameters: [duckdb_timestamp_s],
    result: u8,
  },
  duckdb_is_finite_timestamp_ms: {
    parameters: [duckdb_timestamp_ms],
    result: u8,
  },
  duckdb_is_finite_timestamp_ns: {
    parameters: [duckdb_timestamp_ns],
    result: u8,
  },
  duckdb_hugeint_to_double: {
    parameters: [duckdb_hugeint],
    result: f64,
  },
  duckdb_double_to_hugeint: {
    parameters: [f64],
    result: duckdb_hugeint,
  },
  duckdb_uhugeint_to_double: {
    parameters: [duckdb_uhugeint],
    result: f64,
  },
  duckdb_double_to_uhugeint: {
    parameters: [f64],
    result: duckdb_uhugeint,
  },
  duckdb_double_to_decimal: {
    parameters: [f64, u8, u8],
    result: duckdb_decimal,
  },
  duckdb_decimal_to_double: {
    parameters: [duckdb_decimal],
    result: f64,
  },
  duckdb_prepare: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_destroy_prepare: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_prepare_error: {
    parameters: [duckdb_prepared_statement],
    result: pointer,
  },
  duckdb_nparams: {
    parameters: [duckdb_prepared_statement],
    result: idx_t,
  },
  duckdb_parameter_name: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: pointer,
  },
  duckdb_param_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: i32,
  },
  duckdb_param_logical_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_clear_bindings: {
    parameters: [duckdb_prepared_statement],
    result: duckdb_state,
  },
  duckdb_prepared_statement_type: {
    parameters: [duckdb_prepared_statement],
    result: duckdb_statement_type,
  },
  duckdb_prepared_statement_column_count: {
    parameters: [duckdb_prepared_statement],
    result: idx_t,
  },
  duckdb_prepared_statement_column_name: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: pointer,
  },
  duckdb_prepared_statement_column_logical_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_prepared_statement_column_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: i32,
  },
  duckdb_bind_value: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_value],
    result: duckdb_state,
  },
  duckdb_bind_parameter_index: {
    parameters: [duckdb_prepared_statement, buffer, pointer],
    result: duckdb_state,
  },
  duckdb_bind_boolean: {
    parameters: [duckdb_prepared_statement, idx_t, u8],
    result: duckdb_state,
  },
  duckdb_bind_int8: {
    parameters: [duckdb_prepared_statement, idx_t, i8],
    result: duckdb_state,
  },
  duckdb_bind_int16: {
    parameters: [duckdb_prepared_statement, idx_t, i16],
    result: duckdb_state,
  },
  duckdb_bind_int32: {
    parameters: [duckdb_prepared_statement, idx_t, i32],
    result: duckdb_state,
  },
  duckdb_bind_int64: {
    parameters: [duckdb_prepared_statement, idx_t, i64],
    result: duckdb_state,
  },
  duckdb_bind_hugeint: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_hugeint],
    result: duckdb_state,
  },
  duckdb_bind_uhugeint: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_uhugeint],
    result: duckdb_state,
  },
  duckdb_bind_decimal: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_decimal],
    result: duckdb_state,
  },
  duckdb_bind_uint8: {
    parameters: [duckdb_prepared_statement, idx_t, u8],
    result: duckdb_state,
  },
  duckdb_bind_uint16: {
    parameters: [duckdb_prepared_statement, idx_t, u16],
    result: duckdb_state,
  },
  duckdb_bind_uint32: {
    parameters: [duckdb_prepared_statement, idx_t, u32],
    result: duckdb_state,
  },
  duckdb_bind_uint64: {
    parameters: [duckdb_prepared_statement, idx_t, u64],
    result: duckdb_state,
  },
  duckdb_bind_float: {
    parameters: [duckdb_prepared_statement, idx_t, f32],
    result: duckdb_state,
  },
  duckdb_bind_double: {
    parameters: [duckdb_prepared_statement, idx_t, f64],
    result: duckdb_state,
  },
  duckdb_bind_date: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_date],
    result: duckdb_state,
  },
  duckdb_bind_time: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_time],
    result: duckdb_state,
  },
  duckdb_bind_timestamp: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_timestamp],
    result: duckdb_state,
  },
  duckdb_bind_timestamp_tz: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_timestamp],
    result: duckdb_state,
  },
  duckdb_bind_interval: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_interval],
    result: duckdb_state,
  },
  duckdb_bind_varchar: {
    parameters: [duckdb_prepared_statement, idx_t, pointer],
    result: duckdb_state,
  },
  duckdb_bind_varchar_length: {
    parameters: [duckdb_prepared_statement, idx_t, pointer, idx_t],
    result: duckdb_state,
  },
  duckdb_bind_blob: {
    parameters: [duckdb_prepared_statement, idx_t, pointer, idx_t],
    result: duckdb_state,
  },
  duckdb_bind_null: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_state,
  },
  duckdb_execute_prepared: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_execute_prepared_streaming: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_extract_statements: {
    parameters: [duckdb_connection, pointer, buffer],
    result: idx_t,
  },
  duckdb_prepare_extracted_statement: {
    parameters: [duckdb_connection, duckdb_extracted_statements, idx_t, buffer],
    result: duckdb_state,
  },
  duckdb_extract_statements_error: {
    parameters: [duckdb_extracted_statements],
    result: pointer,
  },
  duckdb_destroy_extracted: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_pending_prepared: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_pending_prepared_streaming: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_destroy_pending: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_pending_error: {
    parameters: [duckdb_pending_result],
    result: pointer,
  },
  duckdb_pending_execute_task: {
    parameters: [duckdb_pending_result],
    result: i32,
  },
  duckdb_pending_execute_check_state: {
    parameters: [duckdb_pending_result],
    result: i32,
  },
  duckdb_execute_pending: {
    parameters: [duckdb_pending_result, buffer],
    result: duckdb_state,
  },
  duckdb_pending_execution_is_finished: {
    parameters: [buffer],
    result: u8,
  },
  duckdb_destroy_value: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_create_varchar: {
    parameters: [pointer],
    result: duckdb_value,
  },
  duckdb_create_varchar_length: {
    parameters: [pointer, idx_t],
    result: duckdb_value,
  },
  duckdb_create_bool: {
    parameters: [u8],
    result: duckdb_value,
  },
  duckdb_create_int8: {
    parameters: [i8],
    result: duckdb_value,
  },
  duckdb_create_uint8: {
    parameters: [u8],
    result: duckdb_value,
  },
  duckdb_create_int16: {
    parameters: [i16],
    result: duckdb_value,
  },
  duckdb_create_uint16: {
    parameters: [u16],
    result: duckdb_value,
  },
  duckdb_create_int32: {
    parameters: [i32],
    result: duckdb_value,
  },
  duckdb_create_uint32: {
    parameters: [u32],
    result: duckdb_value,
  },
  duckdb_create_uint64: {
    parameters: [u64],
    result: duckdb_value,
  },
  duckdb_create_int64: {
    parameters: [i64],
    result: duckdb_value,
  },
  duckdb_create_hugeint: {
    parameters: [duckdb_hugeint],
    result: duckdb_value,
  },
  duckdb_create_uhugeint: {
    parameters: [duckdb_uhugeint],
    result: duckdb_value,
  },
  duckdb_create_bignum: {
    parameters: [duckdb_bignum],
    result: duckdb_value,
  },
  duckdb_create_decimal: {
    parameters: [duckdb_decimal],
    result: duckdb_value,
  },
  duckdb_create_float: {
    parameters: [f32],
    result: duckdb_value,
  },
  duckdb_create_double: {
    parameters: [f64],
    result: duckdb_value,
  },
  duckdb_create_date: {
    parameters: [duckdb_date],
    result: duckdb_value,
  },
  duckdb_create_time: {
    parameters: [duckdb_time],
    result: duckdb_value,
  },
  duckdb_create_time_ns: {
    parameters: [duckdb_time_ns],
    result: duckdb_value,
  },
  duckdb_create_time_tz_value: {
    parameters: [duckdb_time_tz],
    result: duckdb_value,
  },
  duckdb_create_timestamp: {
    parameters: [duckdb_timestamp],
    result: duckdb_value,
  },
  duckdb_create_timestamp_tz: {
    parameters: [duckdb_timestamp],
    result: duckdb_value,
  },
  duckdb_create_timestamp_s: {
    parameters: [duckdb_timestamp_s],
    result: duckdb_value,
  },
  duckdb_create_timestamp_ms: {
    parameters: [duckdb_timestamp_ms],
    result: duckdb_value,
  },
  duckdb_create_timestamp_ns: {
    parameters: [duckdb_timestamp_ns],
    result: duckdb_value,
  },
  duckdb_create_interval: {
    parameters: [duckdb_interval],
    result: duckdb_value,
  },
  duckdb_create_blob: {
    parameters: [pointer, idx_t],
    result: duckdb_value,
  },
  duckdb_create_bit: {
    parameters: [duckdb_bit],
    result: duckdb_value,
  },
  duckdb_create_uuid: {
    parameters: [duckdb_uhugeint],
    result: duckdb_value,
  },
  duckdb_get_bool: {
    parameters: [duckdb_value],
    result: u8,
  },
  duckdb_get_int8: {
    parameters: [duckdb_value],
    result: i8,
  },
  duckdb_get_uint8: {
    parameters: [duckdb_value],
    result: u8,
  },
  duckdb_get_int16: {
    parameters: [duckdb_value],
    result: i16,
  },
  duckdb_get_uint16: {
    parameters: [duckdb_value],
    result: u16,
  },
  duckdb_get_int32: {
    parameters: [duckdb_value],
    result: i32,
  },
  duckdb_get_uint32: {
    parameters: [duckdb_value],
    result: u32,
  },
  duckdb_get_int64: {
    parameters: [duckdb_value],
    result: i64,
  },
  duckdb_get_uint64: {
    parameters: [duckdb_value],
    result: u64,
  },
  duckdb_get_hugeint: {
    parameters: [duckdb_value],
    result: duckdb_hugeint,
  },
  duckdb_get_uhugeint: {
    parameters: [duckdb_value],
    result: duckdb_uhugeint,
  },
  duckdb_get_bignum: {
    parameters: [duckdb_value],
    result: duckdb_bignum,
  },
  duckdb_get_decimal: {
    parameters: [duckdb_value],
    result: duckdb_decimal,
  },
  duckdb_get_float: {
    parameters: [duckdb_value],
    result: f32,
  },
  duckdb_get_double: {
    parameters: [duckdb_value],
    result: f64,
  },
  duckdb_get_date: {
    parameters: [duckdb_value],
    result: duckdb_date,
  },
  duckdb_get_time: {
    parameters: [duckdb_value],
    result: duckdb_time,
  },
  duckdb_get_time_ns: {
    parameters: [duckdb_value],
    result: duckdb_time_ns,
  },
  duckdb_get_time_tz: {
    parameters: [duckdb_value],
    result: duckdb_time_tz,
  },
  duckdb_get_timestamp: {
    parameters: [duckdb_value],
    result: duckdb_timestamp,
  },
  duckdb_get_timestamp_tz: {
    parameters: [duckdb_value],
    result: duckdb_timestamp,
  },
  duckdb_get_timestamp_s: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_s,
  },
  duckdb_get_timestamp_ms: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_ms,
  },
  duckdb_get_timestamp_ns: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_ns,
  },
  duckdb_get_interval: {
    parameters: [duckdb_value],
    result: duckdb_interval,
  },
  duckdb_get_value_type: {
    parameters: [duckdb_value],
    result: duckdb_logical_type,
  },
  duckdb_get_blob: {
    parameters: [duckdb_value],
    result: duckdb_blob,
  },
  duckdb_get_bit: {
    parameters: [duckdb_value],
    result: duckdb_bit,
  },
  duckdb_get_uuid: {
    parameters: [duckdb_value],
    result: duckdb_uhugeint,
  },
  duckdb_get_varchar: {
    parameters: [duckdb_value],
    result: pointer,
  },
  duckdb_create_struct_value: {
    parameters: [duckdb_logical_type, buffer],
    result: duckdb_value,
  },
  duckdb_create_list_value: {
    parameters: [duckdb_logical_type, buffer, idx_t],
    result: duckdb_value,
  },
  duckdb_create_array_value: {
    parameters: [duckdb_logical_type, buffer, idx_t],
    result: duckdb_value,
  },
  duckdb_create_map_value: {
    parameters: [duckdb_logical_type, buffer, buffer, idx_t],
    result: duckdb_value,
  },
  duckdb_create_union_value: {
    parameters: [duckdb_logical_type, idx_t, duckdb_value],
    result: duckdb_value,
  },
  duckdb_get_map_size: {
    parameters: [duckdb_value],
    result: idx_t,
  },
  duckdb_get_map_key: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  duckdb_get_map_value: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  duckdb_is_null_value: {
    parameters: [duckdb_value],
    result: u8,
  },
  duckdb_create_null_value: {
    parameters: [],
    result: duckdb_value,
  },
  duckdb_get_list_size: {
    parameters: [duckdb_value],
    result: idx_t,
  },
  duckdb_get_list_child: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  duckdb_create_enum_value: {
    parameters: [duckdb_logical_type, u64],
    result: duckdb_value,
  },
  duckdb_get_enum_value: {
    parameters: [duckdb_value],
    result: u64,
  },
  duckdb_get_struct_child: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  duckdb_value_to_string: {
    parameters: [duckdb_value],
    result: pointer,
  },
  duckdb_create_logical_type: {
    parameters: [buffer],
    result: duckdb_logical_type,
  },
  duckdb_logical_type_get_alias: {
    parameters: [duckdb_logical_type],
    result: pointer,
  },
  duckdb_logical_type_set_alias: {
    parameters: [duckdb_logical_type, pointer],
    result: "void",
  },
  duckdb_create_list_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_create_array_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_create_map_type: {
    parameters: [duckdb_logical_type, duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_create_union_type: {
    parameters: [buffer, pointer, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_create_struct_type: {
    parameters: [buffer, pointer, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_create_enum_type: {
    parameters: [pointer, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_create_decimal_type: {
    parameters: [u8, u8],
    result: duckdb_logical_type,
  },
  duckdb_get_type_id: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  duckdb_decimal_width: {
    parameters: [duckdb_logical_type],
    result: u8,
  },
  duckdb_decimal_scale: {
    parameters: [duckdb_logical_type],
    result: u8,
  },
  duckdb_decimal_internal_type: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  duckdb_enum_internal_type: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  duckdb_enum_dictionary_size: {
    parameters: [duckdb_logical_type],
    result: u32,
  },
  duckdb_enum_dictionary_value: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  duckdb_list_type_child_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_array_type_child_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_array_type_array_size: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  duckdb_map_type_key_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_map_type_value_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  duckdb_struct_type_child_count: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  duckdb_struct_type_child_name: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  duckdb_struct_type_child_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_union_type_member_count: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  duckdb_union_type_member_name: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  duckdb_union_type_member_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_destroy_logical_type: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_register_logical_type: {
    parameters: [
      duckdb_connection,
      duckdb_logical_type,
      duckdb_create_type_info,
    ],
    result: duckdb_state,
  },
  duckdb_create_data_chunk: {
    parameters: [buffer, idx_t],
    result: duckdb_data_chunk,
  },
  duckdb_destroy_data_chunk: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_data_chunk_reset: {
    parameters: [duckdb_data_chunk],
    result: "void",
  },
  duckdb_data_chunk_get_column_count: {
    parameters: [duckdb_data_chunk],
    result: idx_t,
  },
  duckdb_data_chunk_get_vector: {
    parameters: [duckdb_data_chunk, idx_t],
    result: duckdb_vector,
  },
  duckdb_data_chunk_get_size: {
    parameters: [duckdb_data_chunk],
    result: idx_t,
  },
  duckdb_data_chunk_set_size: {
    parameters: [duckdb_data_chunk, idx_t],
    result: "void",
  },
  duckdb_create_vector: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_vector,
  },
  duckdb_destroy_vector: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_vector_get_column_type: {
    parameters: [duckdb_vector],
    result: duckdb_logical_type,
  },
  duckdb_vector_get_data: {
    parameters: [duckdb_vector],
    result: pointer,
  },
  duckdb_vector_get_validity: {
    parameters: [duckdb_vector],
    result: pointer,
  },
  duckdb_vector_ensure_validity_writable: {
    parameters: [duckdb_vector],
    result: "void",
  },
  duckdb_vector_assign_string_element: {
    parameters: [duckdb_vector, idx_t, pointer],
    result: "void",
  },
  duckdb_vector_assign_string_element_len: {
    parameters: [duckdb_vector, idx_t, pointer, idx_t],
    result: "void",
  },
  duckdb_list_vector_get_child: {
    parameters: [duckdb_vector],
    result: duckdb_vector,
  },
  duckdb_list_vector_get_size: {
    parameters: [duckdb_vector],
    result: idx_t,
  },
  duckdb_list_vector_set_size: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_state,
  },
  duckdb_list_vector_reserve: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_state,
  },
  duckdb_struct_vector_get_child: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_vector,
  },
  duckdb_array_vector_get_child: {
    parameters: [duckdb_vector],
    result: duckdb_vector,
  },
  duckdb_slice_vector: {
    parameters: [duckdb_vector, duckdb_selection_vector, idx_t],
    result: "void",
  },
  duckdb_vector_copy_sel: {
    parameters: [
      duckdb_vector,
      duckdb_vector,
      duckdb_selection_vector,
      idx_t,
      idx_t,
      idx_t,
    ],
    result: "void",
  },
  duckdb_vector_reference_value: {
    parameters: [duckdb_vector, duckdb_value],
    result: "void",
  },
  duckdb_vector_reference_vector: {
    parameters: [duckdb_vector, duckdb_vector],
    result: "void",
  },
  duckdb_validity_row_is_valid: {
    parameters: [pointer, idx_t],
    result: u8,
  },
  duckdb_validity_set_row_validity: {
    parameters: [pointer, idx_t, u8],
    result: "void",
  },
  duckdb_validity_set_row_invalid: {
    parameters: [pointer, idx_t],
    result: "void",
  },
  duckdb_validity_set_row_valid: {
    parameters: [pointer, idx_t],
    result: "void",
  },
  duckdb_create_scalar_function: {
    parameters: [],
    result: duckdb_scalar_function,
  },
  duckdb_destroy_scalar_function: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_scalar_function_set_name: {
    parameters: [duckdb_scalar_function, pointer],
    result: "void",
  },
  duckdb_scalar_function_set_varargs: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_scalar_function_set_special_handling: {
    parameters: [duckdb_scalar_function],
    result: "void",
  },
  duckdb_scalar_function_set_volatile: {
    parameters: [duckdb_scalar_function],
    result: "void",
  },
  duckdb_scalar_function_add_parameter: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_scalar_function_set_return_type: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_scalar_function_set_extra_info: {
    parameters: [duckdb_scalar_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_scalar_function_set_bind: {
    parameters: [duckdb_scalar_function, duckdb_scalar_function_bind_t],
    result: "void",
  },
  duckdb_scalar_function_set_bind_data: {
    parameters: [duckdb_bind_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_scalar_function_set_bind_data_copy: {
    parameters: [duckdb_bind_info, duckdb_copy_callback_t],
    result: "void",
  },
  duckdb_scalar_function_bind_set_error: {
    parameters: [duckdb_bind_info, pointer],
    result: "void",
  },
  duckdb_scalar_function_set_function: {
    parameters: [duckdb_scalar_function, duckdb_scalar_function_t],
    result: "void",
  },
  duckdb_register_scalar_function: {
    parameters: [duckdb_connection, duckdb_scalar_function],
    result: duckdb_state,
  },
  duckdb_scalar_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_scalar_function_bind_get_extra_info: {
    parameters: [duckdb_bind_info],
    result: pointer,
  },
  duckdb_scalar_function_get_bind_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_scalar_function_get_client_context: {
    parameters: [duckdb_bind_info, buffer],
    result: "void",
  },
  duckdb_scalar_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  duckdb_create_scalar_function_set: {
    parameters: [pointer],
    result: duckdb_scalar_function_set,
  },
  duckdb_destroy_scalar_function_set: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_add_scalar_function_to_set: {
    parameters: [duckdb_scalar_function_set, duckdb_scalar_function],
    result: duckdb_state,
  },
  duckdb_register_scalar_function_set: {
    parameters: [duckdb_connection, duckdb_scalar_function_set],
    result: duckdb_state,
  },
  duckdb_scalar_function_bind_get_argument_count: {
    parameters: [duckdb_bind_info],
    result: idx_t,
  },
  duckdb_scalar_function_bind_get_argument: {
    parameters: [duckdb_bind_info, idx_t],
    result: duckdb_expression,
  },
  duckdb_create_selection_vector: {
    parameters: [idx_t],
    result: duckdb_selection_vector,
  },
  duckdb_destroy_selection_vector: {
    parameters: [duckdb_selection_vector],
    result: "void",
  },
  duckdb_selection_vector_get_data_ptr: {
    parameters: [duckdb_selection_vector],
    result: pointer,
  },
  duckdb_create_aggregate_function: {
    parameters: [],
    result: duckdb_aggregate_function,
  },
  duckdb_destroy_aggregate_function: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_aggregate_function_set_name: {
    parameters: [duckdb_aggregate_function, pointer],
    result: "void",
  },
  duckdb_aggregate_function_add_parameter: {
    parameters: [duckdb_aggregate_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_aggregate_function_set_return_type: {
    parameters: [duckdb_aggregate_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_aggregate_function_set_functions: {
    parameters: [
      duckdb_aggregate_function,
      duckdb_aggregate_state_size,
      duckdb_aggregate_init_t,
      duckdb_aggregate_update_t,
      duckdb_aggregate_combine_t,
      duckdb_aggregate_finalize_t,
    ],
    result: "void",
  },
  duckdb_aggregate_function_set_destructor: {
    parameters: [duckdb_aggregate_function, duckdb_aggregate_destroy_t],
    result: "void",
  },
  duckdb_register_aggregate_function: {
    parameters: [duckdb_connection, duckdb_aggregate_function],
    result: duckdb_state,
  },
  duckdb_aggregate_function_set_special_handling: {
    parameters: [duckdb_aggregate_function],
    result: "void",
  },
  duckdb_aggregate_function_set_extra_info: {
    parameters: [duckdb_aggregate_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_aggregate_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_aggregate_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  duckdb_create_aggregate_function_set: {
    parameters: [pointer],
    result: duckdb_aggregate_function_set,
  },
  duckdb_destroy_aggregate_function_set: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_add_aggregate_function_to_set: {
    parameters: [duckdb_aggregate_function_set, duckdb_aggregate_function],
    result: duckdb_state,
  },
  duckdb_register_aggregate_function_set: {
    parameters: [duckdb_connection, duckdb_aggregate_function_set],
    result: duckdb_state,
  },
  duckdb_create_table_function: {
    parameters: [],
    result: duckdb_table_function,
  },
  duckdb_destroy_table_function: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_table_function_set_name: {
    parameters: [duckdb_table_function, pointer],
    result: "void",
  },
  duckdb_table_function_add_parameter: {
    parameters: [duckdb_table_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_table_function_add_named_parameter: {
    parameters: [duckdb_table_function, pointer, duckdb_logical_type],
    result: "void",
  },
  duckdb_table_function_set_extra_info: {
    parameters: [duckdb_table_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_table_function_set_bind: {
    parameters: [duckdb_table_function, duckdb_table_function_bind_t],
    result: "void",
  },
  duckdb_table_function_set_init: {
    parameters: [duckdb_table_function, duckdb_table_function_init_t],
    result: "void",
  },
  duckdb_table_function_set_local_init: {
    parameters: [duckdb_table_function, duckdb_table_function_init_t],
    result: "void",
  },
  duckdb_table_function_set_function: {
    parameters: [duckdb_table_function, duckdb_table_function_t],
    result: "void",
  },
  duckdb_table_function_supports_projection_pushdown: {
    parameters: [duckdb_table_function, u8],
    result: "void",
  },
  duckdb_register_table_function: {
    parameters: [duckdb_connection, duckdb_table_function],
    result: duckdb_state,
  },
  duckdb_bind_get_extra_info: {
    parameters: [duckdb_bind_info],
    result: pointer,
  },
  duckdb_table_function_get_client_context: {
    parameters: [duckdb_bind_info, buffer],
    result: "void",
  },
  duckdb_bind_add_result_column: {
    parameters: [duckdb_bind_info, pointer, duckdb_logical_type],
    result: "void",
  },
  duckdb_bind_get_parameter_count: {
    parameters: [duckdb_bind_info],
    result: idx_t,
  },
  duckdb_bind_get_parameter: {
    parameters: [duckdb_bind_info, idx_t],
    result: duckdb_value,
  },
  duckdb_bind_get_named_parameter: {
    parameters: [duckdb_bind_info, pointer],
    result: duckdb_value,
  },
  duckdb_bind_set_bind_data: {
    parameters: [duckdb_bind_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_bind_set_cardinality: {
    parameters: [duckdb_bind_info, idx_t, u8],
    result: "void",
  },
  duckdb_bind_set_error: {
    parameters: [duckdb_bind_info, pointer],
    result: "void",
  },
  duckdb_init_get_extra_info: {
    parameters: [duckdb_init_info],
    result: pointer,
  },
  duckdb_init_get_bind_data: {
    parameters: [duckdb_init_info],
    result: pointer,
  },
  duckdb_init_set_init_data: {
    parameters: [duckdb_init_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_init_get_column_count: {
    parameters: [duckdb_init_info],
    result: idx_t,
  },
  duckdb_init_get_column_index: {
    parameters: [duckdb_init_info, idx_t],
    result: idx_t,
  },
  duckdb_init_set_max_threads: {
    parameters: [duckdb_init_info, idx_t],
    result: "void",
  },
  duckdb_init_set_error: {
    parameters: [duckdb_init_info, pointer],
    result: "void",
  },
  duckdb_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_function_get_bind_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_function_get_init_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_function_get_local_init_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  duckdb_add_replacement_scan: {
    parameters: [
      duckdb_database,
      duckdb_replacement_callback_t,
      pointer,
      duckdb_delete_callback_t,
    ],
    result: "void",
  },
  duckdb_replacement_scan_set_function_name: {
    parameters: [duckdb_replacement_scan_info, pointer],
    result: "void",
  },
  duckdb_replacement_scan_add_parameter: {
    parameters: [duckdb_replacement_scan_info, duckdb_value],
    result: "void",
  },
  duckdb_replacement_scan_set_error: {
    parameters: [duckdb_replacement_scan_info, pointer],
    result: "void",
  },
  duckdb_get_profiling_info: {
    parameters: [duckdb_connection],
    result: duckdb_profiling_info,
  },
  duckdb_profiling_info_get_value: {
    parameters: [duckdb_profiling_info, pointer],
    result: duckdb_value,
  },
  duckdb_profiling_info_get_metrics: {
    parameters: [duckdb_profiling_info],
    result: duckdb_value,
  },
  duckdb_profiling_info_get_child_count: {
    parameters: [duckdb_profiling_info],
    result: idx_t,
  },
  duckdb_profiling_info_get_child: {
    parameters: [duckdb_profiling_info, idx_t],
    result: duckdb_profiling_info,
  },
  duckdb_appender_create: {
    parameters: [duckdb_connection, pointer, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_appender_create_ext: {
    parameters: [duckdb_connection, pointer, pointer, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_appender_create_query: {
    parameters: [
      duckdb_connection,
      pointer,
      idx_t,
      buffer,
      pointer,
      pointer,
      buffer,
    ],
    result: duckdb_state,
  },
  duckdb_appender_column_count: {
    parameters: [duckdb_appender],
    result: idx_t,
  },
  duckdb_appender_column_type: {
    parameters: [duckdb_appender, idx_t],
    result: duckdb_logical_type,
  },
  duckdb_appender_error: {
    parameters: [duckdb_appender],
    result: pointer,
  },
  duckdb_appender_error_data: {
    parameters: [duckdb_appender],
    result: duckdb_error_data,
  },
  duckdb_appender_flush: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_appender_close: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_appender_destroy: {
    parameters: [buffer],
    result: duckdb_state,
  },
  duckdb_appender_add_column: {
    parameters: [duckdb_appender, pointer],
    result: duckdb_state,
  },
  duckdb_appender_clear_columns: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_appender_begin_row: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_appender_end_row: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_append_default: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_append_default_to_chunk: {
    parameters: [duckdb_appender, duckdb_data_chunk, idx_t, idx_t],
    result: duckdb_state,
  },
  duckdb_append_bool: {
    parameters: [duckdb_appender, u8],
    result: duckdb_state,
  },
  duckdb_append_int8: {
    parameters: [duckdb_appender, i8],
    result: duckdb_state,
  },
  duckdb_append_int16: {
    parameters: [duckdb_appender, i16],
    result: duckdb_state,
  },
  duckdb_append_int32: {
    parameters: [duckdb_appender, i32],
    result: duckdb_state,
  },
  duckdb_append_int64: {
    parameters: [duckdb_appender, i64],
    result: duckdb_state,
  },
  duckdb_append_hugeint: {
    parameters: [duckdb_appender, duckdb_hugeint],
    result: duckdb_state,
  },
  duckdb_append_uint8: {
    parameters: [duckdb_appender, u8],
    result: duckdb_state,
  },
  duckdb_append_uint16: {
    parameters: [duckdb_appender, u16],
    result: duckdb_state,
  },
  duckdb_append_uint32: {
    parameters: [duckdb_appender, u32],
    result: duckdb_state,
  },
  duckdb_append_uint64: {
    parameters: [duckdb_appender, u64],
    result: duckdb_state,
  },
  duckdb_append_uhugeint: {
    parameters: [duckdb_appender, duckdb_uhugeint],
    result: duckdb_state,
  },
  duckdb_append_float: {
    parameters: [duckdb_appender, f32],
    result: duckdb_state,
  },
  duckdb_append_double: {
    parameters: [duckdb_appender, f64],
    result: duckdb_state,
  },
  duckdb_append_date: {
    parameters: [duckdb_appender, duckdb_date],
    result: duckdb_state,
  },
  duckdb_append_time: {
    parameters: [duckdb_appender, duckdb_time],
    result: duckdb_state,
  },
  duckdb_append_timestamp: {
    parameters: [duckdb_appender, duckdb_timestamp],
    result: duckdb_state,
  },
  duckdb_append_interval: {
    parameters: [duckdb_appender, duckdb_interval],
    result: duckdb_state,
  },
  duckdb_append_varchar: {
    parameters: [duckdb_appender, pointer],
    result: duckdb_state,
  },
  duckdb_append_varchar_length: {
    parameters: [duckdb_appender, pointer, idx_t],
    result: duckdb_state,
  },
  duckdb_append_blob: {
    parameters: [duckdb_appender, pointer, idx_t],
    result: duckdb_state,
  },
  duckdb_append_null: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  duckdb_append_value: {
    parameters: [duckdb_appender, duckdb_value],
    result: duckdb_state,
  },
  duckdb_append_data_chunk: {
    parameters: [duckdb_appender, duckdb_data_chunk],
    result: duckdb_state,
  },
  duckdb_table_description_create: {
    parameters: [duckdb_connection, pointer, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_table_description_create_ext: {
    parameters: [duckdb_connection, pointer, pointer, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_table_description_destroy: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_table_description_error: {
    parameters: [duckdb_table_description],
    result: pointer,
  },
  duckdb_column_has_default: {
    parameters: [duckdb_table_description, idx_t, pointer],
    result: duckdb_state,
  },
  duckdb_table_description_get_column_name: {
    parameters: [duckdb_table_description, idx_t],
    result: pointer,
  },
  duckdb_to_arrow_schema: {
    parameters: [duckdb_arrow_options, buffer, pointer, idx_t, buffer],
    result: duckdb_error_data,
  },
  duckdb_data_chunk_to_arrow: {
    parameters: [duckdb_arrow_options, duckdb_data_chunk, buffer],
    result: duckdb_error_data,
  },
  duckdb_schema_from_arrow: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_error_data,
  },
  duckdb_data_chunk_from_arrow: {
    parameters: [
      duckdb_connection,
      pointer,
      duckdb_arrow_converted_schema,
      buffer,
    ],
    result: duckdb_error_data,
  },
  duckdb_destroy_arrow_converted_schema: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_query_arrow: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  duckdb_query_arrow_schema: {
    parameters: [duckdb_arrow, buffer],
    result: duckdb_state,
  },
  duckdb_prepared_arrow_schema: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_result_arrow_array: {
    parameters: [duckdb_result, duckdb_data_chunk, buffer],
    result: "void",
  },
  duckdb_query_arrow_array: {
    parameters: [duckdb_arrow, buffer],
    result: duckdb_state,
  },
  duckdb_arrow_column_count: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  duckdb_arrow_row_count: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  duckdb_arrow_rows_changed: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  duckdb_query_arrow_error: {
    parameters: [duckdb_arrow],
    result: pointer,
  },
  duckdb_destroy_arrow: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_destroy_arrow_stream: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_execute_prepared_arrow: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  duckdb_arrow_scan: {
    parameters: [duckdb_connection, pointer, duckdb_arrow_stream],
    result: duckdb_state,
  },
  duckdb_arrow_array_scan: {
    parameters: [
      duckdb_connection,
      pointer,
      duckdb_arrow_schema,
      duckdb_arrow_array,
      buffer,
    ],
    result: duckdb_state,
  },
  duckdb_execute_tasks: {
    parameters: [duckdb_database, idx_t],
    result: "void",
  },
  duckdb_create_task_state: {
    parameters: [duckdb_database],
    result: duckdb_task_state,
  },
  duckdb_execute_tasks_state: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  duckdb_execute_n_tasks_state: {
    parameters: [duckdb_task_state, idx_t],
    result: idx_t,
  },
  duckdb_finish_execution: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  duckdb_task_state_is_finished: {
    parameters: [duckdb_task_state],
    result: u8,
  },
  duckdb_destroy_task_state: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  duckdb_execution_is_finished: {
    parameters: [duckdb_connection],
    result: u8,
  },
  duckdb_stream_fetch_chunk: {
    parameters: [duckdb_result],
    result: duckdb_data_chunk,
  },
  duckdb_fetch_chunk: {
    parameters: [duckdb_result],
    result: duckdb_data_chunk,
  },
  duckdb_create_cast_function: {
    parameters: [],
    result: duckdb_cast_function,
  },
  duckdb_cast_function_set_source_type: {
    parameters: [duckdb_cast_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_cast_function_set_target_type: {
    parameters: [duckdb_cast_function, duckdb_logical_type],
    result: "void",
  },
  duckdb_cast_function_set_implicit_cast_cost: {
    parameters: [duckdb_cast_function, i64],
    result: "void",
  },
  duckdb_cast_function_set_function: {
    parameters: [duckdb_cast_function, duckdb_cast_function_t],
    result: "void",
  },
  duckdb_cast_function_set_extra_info: {
    parameters: [duckdb_cast_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  duckdb_cast_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  duckdb_cast_function_get_cast_mode: {
    parameters: [duckdb_function_info],
    result: i32,
  },
  duckdb_cast_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  duckdb_cast_function_set_row_error: {
    parameters: [duckdb_function_info, pointer, idx_t, duckdb_vector],
    result: "void",
  },
  duckdb_register_cast_function: {
    parameters: [duckdb_connection, duckdb_cast_function],
    result: duckdb_state,
  },
  duckdb_destroy_cast_function: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_destroy_expression: {
    parameters: [buffer],
    result: "void",
  },
  duckdb_expression_return_type: {
    parameters: [duckdb_expression],
    result: duckdb_logical_type,
  },
  duckdb_expression_is_foldable: {
    parameters: [duckdb_expression],
    result: u8,
  },
  duckdb_expression_fold: {
    parameters: [duckdb_client_context, duckdb_expression, buffer],
    result: duckdb_error_data,
  },
} as const;
