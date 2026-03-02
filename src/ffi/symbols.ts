/**
 * DuckDB FFI function symbols
 */
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
  /** duckdb_create_instance_cache(): duckdb_instance_cache */
  duckdb_create_instance_cache: {
    parameters: [],
    result: duckdb_instance_cache,
  },
  /** duckdb_get_or_create_from_cache(instance_cache: duckdb_instance_cache, path: const char *, out_database: duckdb_database *, config: duckdb_config, out_error: char **): duckdb_state */
  duckdb_get_or_create_from_cache: {
    parameters: [duckdb_instance_cache, pointer, buffer, duckdb_config, buffer],
    result: duckdb_state,
  },
  /** duckdb_destroy_instance_cache(instance_cache: duckdb_instance_cache *): void */
  duckdb_destroy_instance_cache: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_open(path: const char *, out_database: duckdb_database *): duckdb_state */
  duckdb_open: {
    parameters: [pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_open_ext(path: const char *, out_database: duckdb_database *, config: duckdb_config, out_error: char **): duckdb_state */
  duckdb_open_ext: {
    parameters: [pointer, buffer, duckdb_config, buffer],
    result: duckdb_state,
  },
  /** duckdb_close(database: duckdb_database *): void */
  duckdb_close: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_connect(database: duckdb_database, out_connection: duckdb_connection *): duckdb_state */
  duckdb_connect: {
    parameters: [duckdb_database, buffer],
    result: duckdb_state,
  },
  /** duckdb_interrupt(connection: duckdb_connection): void */
  duckdb_interrupt: {
    parameters: [duckdb_connection],
    result: "void",
  },
  /** duckdb_query_progress(connection: duckdb_connection): duckdb_query_progress_type */
  duckdb_query_progress: {
    parameters: [duckdb_connection],
    result: duckdb_query_progress_type,
  },
  /** duckdb_disconnect(connection: duckdb_connection *): void */
  duckdb_disconnect: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_connection_get_client_context(connection: duckdb_connection, out_context: duckdb_client_context *): void */
  duckdb_connection_get_client_context: {
    parameters: [duckdb_connection, buffer],
    result: "void",
  },
  /** duckdb_connection_get_arrow_options(connection: duckdb_connection, out_arrow_options: duckdb_arrow_options *): void */
  duckdb_connection_get_arrow_options: {
    parameters: [duckdb_connection, buffer],
    result: "void",
  },
  /** duckdb_client_context_get_connection_id(context: duckdb_client_context): idx_t */
  duckdb_client_context_get_connection_id: {
    parameters: [duckdb_client_context],
    result: idx_t,
  },
  /** duckdb_destroy_client_context(context: duckdb_client_context *): void */
  duckdb_destroy_client_context: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_destroy_arrow_options(arrow_options: duckdb_arrow_options *): void */
  duckdb_destroy_arrow_options: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_library_version(): const char * */
  duckdb_library_version: {
    parameters: [],
    result: pointer,
  },
  /** duckdb_get_table_names(connection: duckdb_connection, query: const char *, qualified: _Bool): duckdb_value */
  duckdb_get_table_names: {
    parameters: [duckdb_connection, pointer, u8],
    result: duckdb_value,
  },
  /** duckdb_create_config(out_config: duckdb_config *): duckdb_state */
  duckdb_create_config: {
    parameters: [buffer],
    result: duckdb_state,
  },
  /** duckdb_config_count(): size_t */
  duckdb_config_count: {
    parameters: [],
    result: size_t,
  },
  /** duckdb_get_config_flag(index: size_t, out_name: const char **, out_description: const char **): duckdb_state */
  duckdb_get_config_flag: {
    parameters: [size_t, buffer, buffer],
    result: duckdb_state,
  },
  /** duckdb_set_config(config: duckdb_config, name: const char *, option: const char *): duckdb_state */
  duckdb_set_config: {
    parameters: [duckdb_config, pointer, pointer],
    result: duckdb_state,
  },
  /** duckdb_destroy_config(config: duckdb_config *): void */
  duckdb_destroy_config: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_create_error_data(type: duckdb_error_type, message: const char *): duckdb_error_data */
  duckdb_create_error_data: {
    parameters: [buffer, pointer],
    result: duckdb_error_data,
  },
  /** duckdb_destroy_error_data(error_data: duckdb_error_data *): void */
  duckdb_destroy_error_data: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_error_data_error_type(error_data: duckdb_error_data): duckdb_error_type */
  duckdb_error_data_error_type: {
    parameters: [duckdb_error_data],
    result: i32,
  },
  /** duckdb_error_data_message(error_data: duckdb_error_data): const char * */
  duckdb_error_data_message: {
    parameters: [duckdb_error_data],
    result: pointer,
  },
  /** duckdb_error_data_has_error(error_data: duckdb_error_data): _Bool */
  duckdb_error_data_has_error: {
    parameters: [duckdb_error_data],
    result: u8,
  },
  /** duckdb_query(connection: duckdb_connection, query: const char *, out_result: duckdb_result *): duckdb_state */
  duckdb_query: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_destroy_result(result: duckdb_result *): void */
  duckdb_destroy_result: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_column_name(result: duckdb_result *, col: idx_t): const char * */
  duckdb_column_name: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  /** duckdb_column_type(result: duckdb_result *, col: idx_t): duckdb_type */
  duckdb_column_type: {
    parameters: [buffer, idx_t],
    result: i32,
  },
  /** duckdb_result_statement_type(result: duckdb_result): duckdb_statement_type */
  duckdb_result_statement_type: {
    parameters: [duckdb_result],
    result: duckdb_statement_type,
  },
  /** duckdb_column_logical_type(result: duckdb_result *, col: idx_t): duckdb_logical_type */
  duckdb_column_logical_type: {
    parameters: [buffer, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_result_get_arrow_options(result: duckdb_result *): duckdb_arrow_options */
  duckdb_result_get_arrow_options: {
    parameters: [buffer],
    result: duckdb_arrow_options,
  },
  /** duckdb_column_count(result: duckdb_result *): idx_t */
  duckdb_column_count: {
    parameters: [buffer],
    result: idx_t,
  },
  /** duckdb_row_count(result: duckdb_result *): idx_t */
  duckdb_row_count: {
    parameters: [buffer],
    result: idx_t,
  },
  /** duckdb_rows_changed(result: duckdb_result *): idx_t */
  duckdb_rows_changed: {
    parameters: [buffer],
    result: idx_t,
  },
  /** duckdb_column_data(result: duckdb_result *, col: idx_t): void * */
  duckdb_column_data: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  /** duckdb_nullmask_data(result: duckdb_result *, col: idx_t): _Bool * */
  duckdb_nullmask_data: {
    parameters: [buffer, idx_t],
    result: pointer,
  },
  /** duckdb_result_error(result: duckdb_result *): const char * */
  duckdb_result_error: {
    parameters: [buffer],
    result: pointer,
  },
  /** duckdb_result_error_type(result: duckdb_result *): duckdb_error_type */
  duckdb_result_error_type: {
    parameters: [buffer],
    result: i32,
  },
  /** duckdb_result_get_chunk(result: duckdb_result, chunk_index: idx_t): duckdb_data_chunk */
  duckdb_result_get_chunk: {
    parameters: [duckdb_result, idx_t],
    result: duckdb_data_chunk,
  },
  /** duckdb_result_is_streaming(result: duckdb_result): _Bool */
  duckdb_result_is_streaming: {
    parameters: [duckdb_result],
    result: u8,
  },
  /** duckdb_result_chunk_count(result: duckdb_result): idx_t */
  duckdb_result_chunk_count: {
    parameters: [duckdb_result],
    result: idx_t,
  },
  /** duckdb_result_return_type(result: duckdb_result): duckdb_result_type */
  duckdb_result_return_type: {
    parameters: [duckdb_result],
    result: i32,
  },
  /** duckdb_value_boolean(result: duckdb_result *, col: idx_t, row: idx_t): _Bool */
  duckdb_value_boolean: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  /** duckdb_value_int8(result: duckdb_result *, col: idx_t, row: idx_t): int8_t */
  duckdb_value_int8: {
    parameters: [buffer, idx_t, idx_t],
    result: i8,
  },
  /** duckdb_value_int16(result: duckdb_result *, col: idx_t, row: idx_t): int16_t */
  duckdb_value_int16: {
    parameters: [buffer, idx_t, idx_t],
    result: i16,
  },
  /** duckdb_value_int32(result: duckdb_result *, col: idx_t, row: idx_t): int32_t */
  duckdb_value_int32: {
    parameters: [buffer, idx_t, idx_t],
    result: i32,
  },
  /** duckdb_value_int64(result: duckdb_result *, col: idx_t, row: idx_t): int64_t */
  duckdb_value_int64: {
    parameters: [buffer, idx_t, idx_t],
    result: i64,
  },
  /** duckdb_value_hugeint(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_hugeint */
  duckdb_value_hugeint: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_hugeint,
  },
  /** duckdb_value_uhugeint(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_uhugeint */
  duckdb_value_uhugeint: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_uhugeint,
  },
  /** duckdb_value_decimal(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_decimal */
  duckdb_value_decimal: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_decimal,
  },
  /** duckdb_value_uint8(result: duckdb_result *, col: idx_t, row: idx_t): uint8_t */
  duckdb_value_uint8: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  /** duckdb_value_uint16(result: duckdb_result *, col: idx_t, row: idx_t): uint16_t */
  duckdb_value_uint16: {
    parameters: [buffer, idx_t, idx_t],
    result: u16,
  },
  /** duckdb_value_uint32(result: duckdb_result *, col: idx_t, row: idx_t): uint32_t */
  duckdb_value_uint32: {
    parameters: [buffer, idx_t, idx_t],
    result: u32,
  },
  /** duckdb_value_uint64(result: duckdb_result *, col: idx_t, row: idx_t): uint64_t */
  duckdb_value_uint64: {
    parameters: [buffer, idx_t, idx_t],
    result: u64,
  },
  /** duckdb_value_float(result: duckdb_result *, col: idx_t, row: idx_t): float */
  duckdb_value_float: {
    parameters: [buffer, idx_t, idx_t],
    result: f32,
  },
  /** duckdb_value_double(result: duckdb_result *, col: idx_t, row: idx_t): double */
  duckdb_value_double: {
    parameters: [buffer, idx_t, idx_t],
    result: f64,
  },
  /** duckdb_value_date(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_date */
  duckdb_value_date: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_date,
  },
  /** duckdb_value_time(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_time */
  duckdb_value_time: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_time,
  },
  /** duckdb_value_timestamp(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_timestamp */
  duckdb_value_timestamp: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_timestamp,
  },
  /** duckdb_value_interval(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_interval */
  duckdb_value_interval: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_interval,
  },
  /** duckdb_value_varchar(result: duckdb_result *, col: idx_t, row: idx_t): char * */
  duckdb_value_varchar: {
    parameters: [buffer, idx_t, idx_t],
    result: pointer,
  },
  /** duckdb_value_string(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_string */
  duckdb_value_string: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_string,
  },
  /** duckdb_value_varchar_internal(result: duckdb_result *, col: idx_t, row: idx_t): char * */
  duckdb_value_varchar_internal: {
    parameters: [buffer, idx_t, idx_t],
    result: pointer,
  },
  /** duckdb_value_string_internal(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_string */
  duckdb_value_string_internal: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_string,
  },
  /** duckdb_value_blob(result: duckdb_result *, col: idx_t, row: idx_t): duckdb_blob */
  duckdb_value_blob: {
    parameters: [buffer, idx_t, idx_t],
    result: duckdb_blob,
  },
  /** duckdb_value_is_null(result: duckdb_result *, col: idx_t, row: idx_t): _Bool */
  duckdb_value_is_null: {
    parameters: [buffer, idx_t, idx_t],
    result: u8,
  },
  /** duckdb_malloc(size: size_t): void * */
  duckdb_malloc: {
    parameters: [size_t],
    result: pointer,
  },
  /** duckdb_free(ptr: void *): void */
  duckdb_free: {
    parameters: [pointer],
    result: "void",
  },
  /** duckdb_vector_size(): idx_t */
  duckdb_vector_size: {
    parameters: [],
    result: idx_t,
  },
  /** duckdb_string_is_inlined(string: duckdb_string_t): _Bool */
  duckdb_string_is_inlined: {
    parameters: [duckdb_string_t],
    result: u8,
  },
  /** duckdb_string_t_length(string: duckdb_string_t): uint32_t */
  duckdb_string_t_length: {
    parameters: [duckdb_string_t],
    result: u32,
  },
  /** duckdb_string_t_data(string: duckdb_string_t *): const char * */
  duckdb_string_t_data: {
    parameters: [buffer],
    result: pointer,
  },
  /** duckdb_from_date(date: duckdb_date): duckdb_date_struct */
  duckdb_from_date: {
    parameters: [duckdb_date],
    result: duckdb_date_struct,
  },
  /** duckdb_to_date(date: duckdb_date_struct): duckdb_date */
  duckdb_to_date: {
    parameters: [duckdb_date_struct],
    result: duckdb_date,
  },
  /** duckdb_is_finite_date(date: duckdb_date): _Bool */
  duckdb_is_finite_date: {
    parameters: [duckdb_date],
    result: u8,
  },
  /** duckdb_from_time(time: duckdb_time): duckdb_time_struct */
  duckdb_from_time: {
    parameters: [duckdb_time],
    result: duckdb_time_struct,
  },
  /** duckdb_create_time_tz(micros: int64_t, offset: int32_t): duckdb_time_tz */
  duckdb_create_time_tz: {
    parameters: [i64, i32],
    result: duckdb_time_tz,
  },
  /** duckdb_from_time_tz(micros: duckdb_time_tz): duckdb_time_tz_struct */
  duckdb_from_time_tz: {
    parameters: [duckdb_time_tz],
    result: duckdb_time_tz_struct,
  },
  /** duckdb_to_time(time: duckdb_time_struct): duckdb_time */
  duckdb_to_time: {
    parameters: [duckdb_time_struct],
    result: duckdb_time,
  },
  /** duckdb_from_timestamp(ts: duckdb_timestamp): duckdb_timestamp_struct */
  duckdb_from_timestamp: {
    parameters: [duckdb_timestamp],
    result: duckdb_timestamp_struct,
  },
  /** duckdb_to_timestamp(ts: duckdb_timestamp_struct): duckdb_timestamp */
  duckdb_to_timestamp: {
    parameters: [duckdb_timestamp_struct],
    result: duckdb_timestamp,
  },
  /** duckdb_is_finite_timestamp(ts: duckdb_timestamp): _Bool */
  duckdb_is_finite_timestamp: {
    parameters: [duckdb_timestamp],
    result: u8,
  },
  /** duckdb_is_finite_timestamp_s(ts: duckdb_timestamp_s): _Bool */
  duckdb_is_finite_timestamp_s: {
    parameters: [duckdb_timestamp_s],
    result: u8,
  },
  /** duckdb_is_finite_timestamp_ms(ts: duckdb_timestamp_ms): _Bool */
  duckdb_is_finite_timestamp_ms: {
    parameters: [duckdb_timestamp_ms],
    result: u8,
  },
  /** duckdb_is_finite_timestamp_ns(ts: duckdb_timestamp_ns): _Bool */
  duckdb_is_finite_timestamp_ns: {
    parameters: [duckdb_timestamp_ns],
    result: u8,
  },
  /** duckdb_hugeint_to_double(val: duckdb_hugeint): double */
  duckdb_hugeint_to_double: {
    parameters: [duckdb_hugeint],
    result: f64,
  },
  /** duckdb_double_to_hugeint(val: double): duckdb_hugeint */
  duckdb_double_to_hugeint: {
    parameters: [f64],
    result: duckdb_hugeint,
  },
  /** duckdb_uhugeint_to_double(val: duckdb_uhugeint): double */
  duckdb_uhugeint_to_double: {
    parameters: [duckdb_uhugeint],
    result: f64,
  },
  /** duckdb_double_to_uhugeint(val: double): duckdb_uhugeint */
  duckdb_double_to_uhugeint: {
    parameters: [f64],
    result: duckdb_uhugeint,
  },
  /** duckdb_double_to_decimal(val: double, width: uint8_t, scale: uint8_t): duckdb_decimal */
  duckdb_double_to_decimal: {
    parameters: [f64, u8, u8],
    result: duckdb_decimal,
  },
  /** duckdb_decimal_to_double(val: duckdb_decimal): double */
  duckdb_decimal_to_double: {
    parameters: [duckdb_decimal],
    result: f64,
  },
  /** duckdb_prepare(connection: duckdb_connection, query: const char *, out_prepared_statement: duckdb_prepared_statement *): duckdb_state */
  duckdb_prepare: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_destroy_prepare(prepared_statement: duckdb_prepared_statement *): void */
  duckdb_destroy_prepare: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_prepare_error(prepared_statement: duckdb_prepared_statement): const char * */
  duckdb_prepare_error: {
    parameters: [duckdb_prepared_statement],
    result: pointer,
  },
  /** duckdb_nparams(prepared_statement: duckdb_prepared_statement): idx_t */
  duckdb_nparams: {
    parameters: [duckdb_prepared_statement],
    result: idx_t,
  },
  /** duckdb_parameter_name(prepared_statement: duckdb_prepared_statement, index: idx_t): const char * */
  duckdb_parameter_name: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: pointer,
  },
  /** duckdb_param_type(prepared_statement: duckdb_prepared_statement, param_idx: idx_t): duckdb_type */
  duckdb_param_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: i32,
  },
  /** duckdb_param_logical_type(prepared_statement: duckdb_prepared_statement, param_idx: idx_t): duckdb_logical_type */
  duckdb_param_logical_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_clear_bindings(prepared_statement: duckdb_prepared_statement): duckdb_state */
  duckdb_clear_bindings: {
    parameters: [duckdb_prepared_statement],
    result: duckdb_state,
  },
  /** duckdb_prepared_statement_type(statement: duckdb_prepared_statement): duckdb_statement_type */
  duckdb_prepared_statement_type: {
    parameters: [duckdb_prepared_statement],
    result: duckdb_statement_type,
  },
  /** duckdb_prepared_statement_column_count(prepared_statement: duckdb_prepared_statement): idx_t */
  duckdb_prepared_statement_column_count: {
    parameters: [duckdb_prepared_statement],
    result: idx_t,
  },
  /** duckdb_prepared_statement_column_name(prepared_statement: duckdb_prepared_statement, col_idx: idx_t): const char * */
  duckdb_prepared_statement_column_name: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: pointer,
  },
  /** duckdb_prepared_statement_column_logical_type(prepared_statement: duckdb_prepared_statement, col_idx: idx_t): duckdb_logical_type */
  duckdb_prepared_statement_column_logical_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_prepared_statement_column_type(prepared_statement: duckdb_prepared_statement, col_idx: idx_t): duckdb_type */
  duckdb_prepared_statement_column_type: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: i32,
  },
  /** duckdb_bind_value(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_value): duckdb_state */
  duckdb_bind_value: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_value],
    result: duckdb_state,
  },
  /** duckdb_bind_parameter_index(prepared_statement: duckdb_prepared_statement, param_idx_out: idx_t *, name: const char *): duckdb_state */
  duckdb_bind_parameter_index: {
    parameters: [duckdb_prepared_statement, buffer, pointer],
    result: duckdb_state,
  },
  /** duckdb_bind_boolean(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: _Bool): duckdb_state */
  duckdb_bind_boolean: {
    parameters: [duckdb_prepared_statement, idx_t, u8],
    result: duckdb_state,
  },
  /** duckdb_bind_int8(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: int8_t): duckdb_state */
  duckdb_bind_int8: {
    parameters: [duckdb_prepared_statement, idx_t, i8],
    result: duckdb_state,
  },
  /** duckdb_bind_int16(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: int16_t): duckdb_state */
  duckdb_bind_int16: {
    parameters: [duckdb_prepared_statement, idx_t, i16],
    result: duckdb_state,
  },
  /** duckdb_bind_int32(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: int32_t): duckdb_state */
  duckdb_bind_int32: {
    parameters: [duckdb_prepared_statement, idx_t, i32],
    result: duckdb_state,
  },
  /** duckdb_bind_int64(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: int64_t): duckdb_state */
  duckdb_bind_int64: {
    parameters: [duckdb_prepared_statement, idx_t, i64],
    result: duckdb_state,
  },
  /** duckdb_bind_hugeint(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_hugeint): duckdb_state */
  duckdb_bind_hugeint: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_hugeint],
    result: duckdb_state,
  },
  /** duckdb_bind_uhugeint(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_uhugeint): duckdb_state */
  duckdb_bind_uhugeint: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_uhugeint],
    result: duckdb_state,
  },
  /** duckdb_bind_decimal(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_decimal): duckdb_state */
  duckdb_bind_decimal: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_decimal],
    result: duckdb_state,
  },
  /** duckdb_bind_uint8(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: uint8_t): duckdb_state */
  duckdb_bind_uint8: {
    parameters: [duckdb_prepared_statement, idx_t, u8],
    result: duckdb_state,
  },
  /** duckdb_bind_uint16(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: uint16_t): duckdb_state */
  duckdb_bind_uint16: {
    parameters: [duckdb_prepared_statement, idx_t, u16],
    result: duckdb_state,
  },
  /** duckdb_bind_uint32(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: uint32_t): duckdb_state */
  duckdb_bind_uint32: {
    parameters: [duckdb_prepared_statement, idx_t, u32],
    result: duckdb_state,
  },
  /** duckdb_bind_uint64(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: uint64_t): duckdb_state */
  duckdb_bind_uint64: {
    parameters: [duckdb_prepared_statement, idx_t, u64],
    result: duckdb_state,
  },
  /** duckdb_bind_float(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: float): duckdb_state */
  duckdb_bind_float: {
    parameters: [duckdb_prepared_statement, idx_t, f32],
    result: duckdb_state,
  },
  /** duckdb_bind_double(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: double): duckdb_state */
  duckdb_bind_double: {
    parameters: [duckdb_prepared_statement, idx_t, f64],
    result: duckdb_state,
  },
  /** duckdb_bind_date(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_date): duckdb_state */
  duckdb_bind_date: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_date],
    result: duckdb_state,
  },
  /** duckdb_bind_time(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_time): duckdb_state */
  duckdb_bind_time: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_time],
    result: duckdb_state,
  },
  /** duckdb_bind_timestamp(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_timestamp): duckdb_state */
  duckdb_bind_timestamp: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_timestamp],
    result: duckdb_state,
  },
  /** duckdb_bind_timestamp_tz(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_timestamp): duckdb_state */
  duckdb_bind_timestamp_tz: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_timestamp],
    result: duckdb_state,
  },
  /** duckdb_bind_interval(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: duckdb_interval): duckdb_state */
  duckdb_bind_interval: {
    parameters: [duckdb_prepared_statement, idx_t, duckdb_interval],
    result: duckdb_state,
  },
  /** duckdb_bind_varchar(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: const char *): duckdb_state */
  duckdb_bind_varchar: {
    parameters: [duckdb_prepared_statement, idx_t, pointer],
    result: duckdb_state,
  },
  /** duckdb_bind_varchar_length(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, val: const char *, length: idx_t): duckdb_state */
  duckdb_bind_varchar_length: {
    parameters: [duckdb_prepared_statement, idx_t, pointer, idx_t],
    result: duckdb_state,
  },
  /** duckdb_bind_blob(prepared_statement: duckdb_prepared_statement, param_idx: idx_t, data: const void *, length: idx_t): duckdb_state */
  duckdb_bind_blob: {
    parameters: [duckdb_prepared_statement, idx_t, pointer, idx_t],
    result: duckdb_state,
  },
  /** duckdb_bind_null(prepared_statement: duckdb_prepared_statement, param_idx: idx_t): duckdb_state */
  duckdb_bind_null: {
    parameters: [duckdb_prepared_statement, idx_t],
    result: duckdb_state,
  },
  /** duckdb_execute_prepared(prepared_statement: duckdb_prepared_statement, out_result: duckdb_result *): duckdb_state */
  duckdb_execute_prepared: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_execute_prepared_streaming(prepared_statement: duckdb_prepared_statement, out_result: duckdb_result *): duckdb_state */
  duckdb_execute_prepared_streaming: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_extract_statements(connection: duckdb_connection, query: const char *, out_extracted_statements: duckdb_extracted_statements *): idx_t */
  duckdb_extract_statements: {
    parameters: [duckdb_connection, pointer, buffer],
    result: idx_t,
  },
  /** duckdb_prepare_extracted_statement(connection: duckdb_connection, extracted_statements: duckdb_extracted_statements, index: idx_t, out_prepared_statement: duckdb_prepared_statement *): duckdb_state */
  duckdb_prepare_extracted_statement: {
    parameters: [duckdb_connection, duckdb_extracted_statements, idx_t, buffer],
    result: duckdb_state,
  },
  /** duckdb_extract_statements_error(extracted_statements: duckdb_extracted_statements): const char * */
  duckdb_extract_statements_error: {
    parameters: [duckdb_extracted_statements],
    result: pointer,
  },
  /** duckdb_destroy_extracted(extracted_statements: duckdb_extracted_statements *): void */
  duckdb_destroy_extracted: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_pending_prepared(prepared_statement: duckdb_prepared_statement, out_result: duckdb_pending_result *): duckdb_state */
  duckdb_pending_prepared: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_pending_prepared_streaming(prepared_statement: duckdb_prepared_statement, out_result: duckdb_pending_result *): duckdb_state */
  duckdb_pending_prepared_streaming: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_destroy_pending(pending_result: duckdb_pending_result *): void */
  duckdb_destroy_pending: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_pending_error(pending_result: duckdb_pending_result): const char * */
  duckdb_pending_error: {
    parameters: [duckdb_pending_result],
    result: pointer,
  },
  /** duckdb_pending_execute_task(pending_result: duckdb_pending_result): duckdb_pending_state */
  duckdb_pending_execute_task: {
    parameters: [duckdb_pending_result],
    result: i32,
  },
  /** duckdb_pending_execute_check_state(pending_result: duckdb_pending_result): duckdb_pending_state */
  duckdb_pending_execute_check_state: {
    parameters: [duckdb_pending_result],
    result: i32,
  },
  /** duckdb_execute_pending(pending_result: duckdb_pending_result, out_result: duckdb_result *): duckdb_state */
  duckdb_execute_pending: {
    parameters: [duckdb_pending_result, buffer],
    result: duckdb_state,
  },
  /** duckdb_pending_execution_is_finished(pending_state: duckdb_pending_state): _Bool */
  duckdb_pending_execution_is_finished: {
    parameters: [buffer],
    result: u8,
  },
  /** duckdb_destroy_value(value: duckdb_value *): void */
  duckdb_destroy_value: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_create_varchar(text: const char *): duckdb_value */
  duckdb_create_varchar: {
    parameters: [pointer],
    result: duckdb_value,
  },
  /** duckdb_create_varchar_length(text: const char *, length: idx_t): duckdb_value */
  duckdb_create_varchar_length: {
    parameters: [pointer, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_bool(input: _Bool): duckdb_value */
  duckdb_create_bool: {
    parameters: [u8],
    result: duckdb_value,
  },
  /** duckdb_create_int8(input: int8_t): duckdb_value */
  duckdb_create_int8: {
    parameters: [i8],
    result: duckdb_value,
  },
  /** duckdb_create_uint8(input: uint8_t): duckdb_value */
  duckdb_create_uint8: {
    parameters: [u8],
    result: duckdb_value,
  },
  /** duckdb_create_int16(input: int16_t): duckdb_value */
  duckdb_create_int16: {
    parameters: [i16],
    result: duckdb_value,
  },
  /** duckdb_create_uint16(input: uint16_t): duckdb_value */
  duckdb_create_uint16: {
    parameters: [u16],
    result: duckdb_value,
  },
  /** duckdb_create_int32(input: int32_t): duckdb_value */
  duckdb_create_int32: {
    parameters: [i32],
    result: duckdb_value,
  },
  /** duckdb_create_uint32(input: uint32_t): duckdb_value */
  duckdb_create_uint32: {
    parameters: [u32],
    result: duckdb_value,
  },
  /** duckdb_create_uint64(input: uint64_t): duckdb_value */
  duckdb_create_uint64: {
    parameters: [u64],
    result: duckdb_value,
  },
  /** duckdb_create_int64(val: int64_t): duckdb_value */
  duckdb_create_int64: {
    parameters: [i64],
    result: duckdb_value,
  },
  /** duckdb_create_hugeint(input: duckdb_hugeint): duckdb_value */
  duckdb_create_hugeint: {
    parameters: [duckdb_hugeint],
    result: duckdb_value,
  },
  /** duckdb_create_uhugeint(input: duckdb_uhugeint): duckdb_value */
  duckdb_create_uhugeint: {
    parameters: [duckdb_uhugeint],
    result: duckdb_value,
  },
  /** duckdb_create_bignum(input: duckdb_bignum): duckdb_value */
  duckdb_create_bignum: {
    parameters: [duckdb_bignum],
    result: duckdb_value,
  },
  /** duckdb_create_decimal(input: duckdb_decimal): duckdb_value */
  duckdb_create_decimal: {
    parameters: [duckdb_decimal],
    result: duckdb_value,
  },
  /** duckdb_create_float(input: float): duckdb_value */
  duckdb_create_float: {
    parameters: [f32],
    result: duckdb_value,
  },
  /** duckdb_create_double(input: double): duckdb_value */
  duckdb_create_double: {
    parameters: [f64],
    result: duckdb_value,
  },
  /** duckdb_create_date(input: duckdb_date): duckdb_value */
  duckdb_create_date: {
    parameters: [duckdb_date],
    result: duckdb_value,
  },
  /** duckdb_create_time(input: duckdb_time): duckdb_value */
  duckdb_create_time: {
    parameters: [duckdb_time],
    result: duckdb_value,
  },
  /** duckdb_create_time_ns(input: duckdb_time_ns): duckdb_value */
  duckdb_create_time_ns: {
    parameters: [duckdb_time_ns],
    result: duckdb_value,
  },
  /** duckdb_create_time_tz_value(value: duckdb_time_tz): duckdb_value */
  duckdb_create_time_tz_value: {
    parameters: [duckdb_time_tz],
    result: duckdb_value,
  },
  /** duckdb_create_timestamp(input: duckdb_timestamp): duckdb_value */
  duckdb_create_timestamp: {
    parameters: [duckdb_timestamp],
    result: duckdb_value,
  },
  /** duckdb_create_timestamp_tz(input: duckdb_timestamp): duckdb_value */
  duckdb_create_timestamp_tz: {
    parameters: [duckdb_timestamp],
    result: duckdb_value,
  },
  /** duckdb_create_timestamp_s(input: duckdb_timestamp_s): duckdb_value */
  duckdb_create_timestamp_s: {
    parameters: [duckdb_timestamp_s],
    result: duckdb_value,
  },
  /** duckdb_create_timestamp_ms(input: duckdb_timestamp_ms): duckdb_value */
  duckdb_create_timestamp_ms: {
    parameters: [duckdb_timestamp_ms],
    result: duckdb_value,
  },
  /** duckdb_create_timestamp_ns(input: duckdb_timestamp_ns): duckdb_value */
  duckdb_create_timestamp_ns: {
    parameters: [duckdb_timestamp_ns],
    result: duckdb_value,
  },
  /** duckdb_create_interval(input: duckdb_interval): duckdb_value */
  duckdb_create_interval: {
    parameters: [duckdb_interval],
    result: duckdb_value,
  },
  /** duckdb_create_blob(data: const uint8_t *, length: idx_t): duckdb_value */
  duckdb_create_blob: {
    parameters: [pointer, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_bit(input: duckdb_bit): duckdb_value */
  duckdb_create_bit: {
    parameters: [duckdb_bit],
    result: duckdb_value,
  },
  /** duckdb_create_uuid(input: duckdb_uhugeint): duckdb_value */
  duckdb_create_uuid: {
    parameters: [duckdb_uhugeint],
    result: duckdb_value,
  },
  /** duckdb_get_bool(val: duckdb_value): _Bool */
  duckdb_get_bool: {
    parameters: [duckdb_value],
    result: u8,
  },
  /** duckdb_get_int8(val: duckdb_value): int8_t */
  duckdb_get_int8: {
    parameters: [duckdb_value],
    result: i8,
  },
  /** duckdb_get_uint8(val: duckdb_value): uint8_t */
  duckdb_get_uint8: {
    parameters: [duckdb_value],
    result: u8,
  },
  /** duckdb_get_int16(val: duckdb_value): int16_t */
  duckdb_get_int16: {
    parameters: [duckdb_value],
    result: i16,
  },
  /** duckdb_get_uint16(val: duckdb_value): uint16_t */
  duckdb_get_uint16: {
    parameters: [duckdb_value],
    result: u16,
  },
  /** duckdb_get_int32(val: duckdb_value): int32_t */
  duckdb_get_int32: {
    parameters: [duckdb_value],
    result: i32,
  },
  /** duckdb_get_uint32(val: duckdb_value): uint32_t */
  duckdb_get_uint32: {
    parameters: [duckdb_value],
    result: u32,
  },
  /** duckdb_get_int64(val: duckdb_value): int64_t */
  duckdb_get_int64: {
    parameters: [duckdb_value],
    result: i64,
  },
  /** duckdb_get_uint64(val: duckdb_value): uint64_t */
  duckdb_get_uint64: {
    parameters: [duckdb_value],
    result: u64,
  },
  /** duckdb_get_hugeint(val: duckdb_value): duckdb_hugeint */
  duckdb_get_hugeint: {
    parameters: [duckdb_value],
    result: duckdb_hugeint,
  },
  /** duckdb_get_uhugeint(val: duckdb_value): duckdb_uhugeint */
  duckdb_get_uhugeint: {
    parameters: [duckdb_value],
    result: duckdb_uhugeint,
  },
  /** duckdb_get_bignum(val: duckdb_value): duckdb_bignum */
  duckdb_get_bignum: {
    parameters: [duckdb_value],
    result: duckdb_bignum,
  },
  /** duckdb_get_decimal(val: duckdb_value): duckdb_decimal */
  duckdb_get_decimal: {
    parameters: [duckdb_value],
    result: duckdb_decimal,
  },
  /** duckdb_get_float(val: duckdb_value): float */
  duckdb_get_float: {
    parameters: [duckdb_value],
    result: f32,
  },
  /** duckdb_get_double(val: duckdb_value): double */
  duckdb_get_double: {
    parameters: [duckdb_value],
    result: f64,
  },
  /** duckdb_get_date(val: duckdb_value): duckdb_date */
  duckdb_get_date: {
    parameters: [duckdb_value],
    result: duckdb_date,
  },
  /** duckdb_get_time(val: duckdb_value): duckdb_time */
  duckdb_get_time: {
    parameters: [duckdb_value],
    result: duckdb_time,
  },
  /** duckdb_get_time_ns(val: duckdb_value): duckdb_time_ns */
  duckdb_get_time_ns: {
    parameters: [duckdb_value],
    result: duckdb_time_ns,
  },
  /** duckdb_get_time_tz(val: duckdb_value): duckdb_time_tz */
  duckdb_get_time_tz: {
    parameters: [duckdb_value],
    result: duckdb_time_tz,
  },
  /** duckdb_get_timestamp(val: duckdb_value): duckdb_timestamp */
  duckdb_get_timestamp: {
    parameters: [duckdb_value],
    result: duckdb_timestamp,
  },
  /** duckdb_get_timestamp_tz(val: duckdb_value): duckdb_timestamp */
  duckdb_get_timestamp_tz: {
    parameters: [duckdb_value],
    result: duckdb_timestamp,
  },
  /** duckdb_get_timestamp_s(val: duckdb_value): duckdb_timestamp_s */
  duckdb_get_timestamp_s: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_s,
  },
  /** duckdb_get_timestamp_ms(val: duckdb_value): duckdb_timestamp_ms */
  duckdb_get_timestamp_ms: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_ms,
  },
  /** duckdb_get_timestamp_ns(val: duckdb_value): duckdb_timestamp_ns */
  duckdb_get_timestamp_ns: {
    parameters: [duckdb_value],
    result: duckdb_timestamp_ns,
  },
  /** duckdb_get_interval(val: duckdb_value): duckdb_interval */
  duckdb_get_interval: {
    parameters: [duckdb_value],
    result: duckdb_interval,
  },
  /** duckdb_get_value_type(val: duckdb_value): duckdb_logical_type */
  duckdb_get_value_type: {
    parameters: [duckdb_value],
    result: duckdb_logical_type,
  },
  /** duckdb_get_blob(val: duckdb_value): duckdb_blob */
  duckdb_get_blob: {
    parameters: [duckdb_value],
    result: duckdb_blob,
  },
  /** duckdb_get_bit(val: duckdb_value): duckdb_bit */
  duckdb_get_bit: {
    parameters: [duckdb_value],
    result: duckdb_bit,
  },
  /** duckdb_get_uuid(val: duckdb_value): duckdb_uhugeint */
  duckdb_get_uuid: {
    parameters: [duckdb_value],
    result: duckdb_uhugeint,
  },
  /** duckdb_get_varchar(value: duckdb_value): char * */
  duckdb_get_varchar: {
    parameters: [duckdb_value],
    result: pointer,
  },
  /** duckdb_create_struct_value(type: duckdb_logical_type, values: duckdb_value *): duckdb_value */
  duckdb_create_struct_value: {
    parameters: [duckdb_logical_type, buffer],
    result: duckdb_value,
  },
  /** duckdb_create_list_value(type: duckdb_logical_type, values: duckdb_value *, value_count: idx_t): duckdb_value */
  duckdb_create_list_value: {
    parameters: [duckdb_logical_type, buffer, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_array_value(type: duckdb_logical_type, values: duckdb_value *, value_count: idx_t): duckdb_value */
  duckdb_create_array_value: {
    parameters: [duckdb_logical_type, buffer, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_map_value(map_type: duckdb_logical_type, keys: duckdb_value *, values: duckdb_value *, entry_count: idx_t): duckdb_value */
  duckdb_create_map_value: {
    parameters: [duckdb_logical_type, buffer, buffer, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_union_value(union_type: duckdb_logical_type, tag_index: idx_t, value: duckdb_value): duckdb_value */
  duckdb_create_union_value: {
    parameters: [duckdb_logical_type, idx_t, duckdb_value],
    result: duckdb_value,
  },
  /** duckdb_get_map_size(value: duckdb_value): idx_t */
  duckdb_get_map_size: {
    parameters: [duckdb_value],
    result: idx_t,
  },
  /** duckdb_get_map_key(value: duckdb_value, index: idx_t): duckdb_value */
  duckdb_get_map_key: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  /** duckdb_get_map_value(value: duckdb_value, index: idx_t): duckdb_value */
  duckdb_get_map_value: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  /** duckdb_is_null_value(value: duckdb_value): _Bool */
  duckdb_is_null_value: {
    parameters: [duckdb_value],
    result: u8,
  },
  /** duckdb_create_null_value(): duckdb_value */
  duckdb_create_null_value: {
    parameters: [],
    result: duckdb_value,
  },
  /** duckdb_get_list_size(value: duckdb_value): idx_t */
  duckdb_get_list_size: {
    parameters: [duckdb_value],
    result: idx_t,
  },
  /** duckdb_get_list_child(value: duckdb_value, index: idx_t): duckdb_value */
  duckdb_get_list_child: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  /** duckdb_create_enum_value(type: duckdb_logical_type, value: uint64_t): duckdb_value */
  duckdb_create_enum_value: {
    parameters: [duckdb_logical_type, u64],
    result: duckdb_value,
  },
  /** duckdb_get_enum_value(value: duckdb_value): uint64_t */
  duckdb_get_enum_value: {
    parameters: [duckdb_value],
    result: u64,
  },
  /** duckdb_get_struct_child(value: duckdb_value, index: idx_t): duckdb_value */
  duckdb_get_struct_child: {
    parameters: [duckdb_value, idx_t],
    result: duckdb_value,
  },
  /** duckdb_value_to_string(value: duckdb_value): char * */
  duckdb_value_to_string: {
    parameters: [duckdb_value],
    result: pointer,
  },
  /** duckdb_create_logical_type(type: duckdb_type): duckdb_logical_type */
  duckdb_create_logical_type: {
    parameters: [buffer],
    result: duckdb_logical_type,
  },
  /** duckdb_logical_type_get_alias(type: duckdb_logical_type): char * */
  duckdb_logical_type_get_alias: {
    parameters: [duckdb_logical_type],
    result: pointer,
  },
  /** duckdb_logical_type_set_alias(type: duckdb_logical_type, alias: const char *): void */
  duckdb_logical_type_set_alias: {
    parameters: [duckdb_logical_type, pointer],
    result: "void",
  },
  /** duckdb_create_list_type(type: duckdb_logical_type): duckdb_logical_type */
  duckdb_create_list_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_create_array_type(type: duckdb_logical_type, array_size: idx_t): duckdb_logical_type */
  duckdb_create_array_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_create_map_type(key_type: duckdb_logical_type, value_type: duckdb_logical_type): duckdb_logical_type */
  duckdb_create_map_type: {
    parameters: [duckdb_logical_type, duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_create_union_type(member_types: duckdb_logical_type *, member_names: const char **, member_count: idx_t): duckdb_logical_type */
  duckdb_create_union_type: {
    parameters: [buffer, pointer, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_create_struct_type(member_types: duckdb_logical_type *, member_names: const char **, member_count: idx_t): duckdb_logical_type */
  duckdb_create_struct_type: {
    parameters: [buffer, pointer, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_create_enum_type(member_names: const char **, member_count: idx_t): duckdb_logical_type */
  duckdb_create_enum_type: {
    parameters: [pointer, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_create_decimal_type(width: uint8_t, scale: uint8_t): duckdb_logical_type */
  duckdb_create_decimal_type: {
    parameters: [u8, u8],
    result: duckdb_logical_type,
  },
  /** duckdb_get_type_id(type: duckdb_logical_type): duckdb_type */
  duckdb_get_type_id: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  /** duckdb_decimal_width(type: duckdb_logical_type): uint8_t */
  duckdb_decimal_width: {
    parameters: [duckdb_logical_type],
    result: u8,
  },
  /** duckdb_decimal_scale(type: duckdb_logical_type): uint8_t */
  duckdb_decimal_scale: {
    parameters: [duckdb_logical_type],
    result: u8,
  },
  /** duckdb_decimal_internal_type(type: duckdb_logical_type): duckdb_type */
  duckdb_decimal_internal_type: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  /** duckdb_enum_internal_type(type: duckdb_logical_type): duckdb_type */
  duckdb_enum_internal_type: {
    parameters: [duckdb_logical_type],
    result: i32,
  },
  /** duckdb_enum_dictionary_size(type: duckdb_logical_type): uint32_t */
  duckdb_enum_dictionary_size: {
    parameters: [duckdb_logical_type],
    result: u32,
  },
  /** duckdb_enum_dictionary_value(type: duckdb_logical_type, index: idx_t): char * */
  duckdb_enum_dictionary_value: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  /** duckdb_list_type_child_type(type: duckdb_logical_type): duckdb_logical_type */
  duckdb_list_type_child_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_array_type_child_type(type: duckdb_logical_type): duckdb_logical_type */
  duckdb_array_type_child_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_array_type_array_size(type: duckdb_logical_type): idx_t */
  duckdb_array_type_array_size: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  /** duckdb_map_type_key_type(type: duckdb_logical_type): duckdb_logical_type */
  duckdb_map_type_key_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_map_type_value_type(type: duckdb_logical_type): duckdb_logical_type */
  duckdb_map_type_value_type: {
    parameters: [duckdb_logical_type],
    result: duckdb_logical_type,
  },
  /** duckdb_struct_type_child_count(type: duckdb_logical_type): idx_t */
  duckdb_struct_type_child_count: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  /** duckdb_struct_type_child_name(type: duckdb_logical_type, index: idx_t): char * */
  duckdb_struct_type_child_name: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  /** duckdb_struct_type_child_type(type: duckdb_logical_type, index: idx_t): duckdb_logical_type */
  duckdb_struct_type_child_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_union_type_member_count(type: duckdb_logical_type): idx_t */
  duckdb_union_type_member_count: {
    parameters: [duckdb_logical_type],
    result: idx_t,
  },
  /** duckdb_union_type_member_name(type: duckdb_logical_type, index: idx_t): char * */
  duckdb_union_type_member_name: {
    parameters: [duckdb_logical_type, idx_t],
    result: pointer,
  },
  /** duckdb_union_type_member_type(type: duckdb_logical_type, index: idx_t): duckdb_logical_type */
  duckdb_union_type_member_type: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_destroy_logical_type(type: duckdb_logical_type *): void */
  duckdb_destroy_logical_type: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_register_logical_type(con: duckdb_connection, type: duckdb_logical_type, info: duckdb_create_type_info): duckdb_state */
  duckdb_register_logical_type: {
    parameters: [
      duckdb_connection,
      duckdb_logical_type,
      duckdb_create_type_info,
    ],
    result: duckdb_state,
  },
  /** duckdb_create_data_chunk(types: duckdb_logical_type *, column_count: idx_t): duckdb_data_chunk */
  duckdb_create_data_chunk: {
    parameters: [buffer, idx_t],
    result: duckdb_data_chunk,
  },
  /** duckdb_destroy_data_chunk(chunk: duckdb_data_chunk *): void */
  duckdb_destroy_data_chunk: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_data_chunk_reset(chunk: duckdb_data_chunk): void */
  duckdb_data_chunk_reset: {
    parameters: [duckdb_data_chunk],
    result: "void",
  },
  /** duckdb_data_chunk_get_column_count(chunk: duckdb_data_chunk): idx_t */
  duckdb_data_chunk_get_column_count: {
    parameters: [duckdb_data_chunk],
    result: idx_t,
  },
  /** duckdb_data_chunk_get_vector(chunk: duckdb_data_chunk, col_idx: idx_t): duckdb_vector */
  duckdb_data_chunk_get_vector: {
    parameters: [duckdb_data_chunk, idx_t],
    result: duckdb_vector,
  },
  /** duckdb_data_chunk_get_size(chunk: duckdb_data_chunk): idx_t */
  duckdb_data_chunk_get_size: {
    parameters: [duckdb_data_chunk],
    result: idx_t,
  },
  /** duckdb_data_chunk_set_size(chunk: duckdb_data_chunk, size: idx_t): void */
  duckdb_data_chunk_set_size: {
    parameters: [duckdb_data_chunk, idx_t],
    result: "void",
  },
  /** duckdb_create_vector(type: duckdb_logical_type, capacity: idx_t): duckdb_vector */
  duckdb_create_vector: {
    parameters: [duckdb_logical_type, idx_t],
    result: duckdb_vector,
  },
  /** duckdb_destroy_vector(vector: duckdb_vector *): void */
  duckdb_destroy_vector: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_vector_get_column_type(vector: duckdb_vector): duckdb_logical_type */
  duckdb_vector_get_column_type: {
    parameters: [duckdb_vector],
    result: duckdb_logical_type,
  },
  /** duckdb_vector_get_data(vector: duckdb_vector): void * */
  duckdb_vector_get_data: {
    parameters: [duckdb_vector],
    result: pointer,
  },
  /** duckdb_vector_get_validity(vector: duckdb_vector): uint64_t * */
  duckdb_vector_get_validity: {
    parameters: [duckdb_vector],
    result: pointer,
  },
  /** duckdb_vector_ensure_validity_writable(vector: duckdb_vector): void */
  duckdb_vector_ensure_validity_writable: {
    parameters: [duckdb_vector],
    result: "void",
  },
  /** duckdb_vector_assign_string_element(vector: duckdb_vector, index: idx_t, str: const char *): void */
  duckdb_vector_assign_string_element: {
    parameters: [duckdb_vector, idx_t, pointer],
    result: "void",
  },
  /** duckdb_vector_assign_string_element_len(vector: duckdb_vector, index: idx_t, str: const char *, str_len: idx_t): void */
  duckdb_vector_assign_string_element_len: {
    parameters: [duckdb_vector, idx_t, pointer, idx_t],
    result: "void",
  },
  /** duckdb_list_vector_get_child(vector: duckdb_vector): duckdb_vector */
  duckdb_list_vector_get_child: {
    parameters: [duckdb_vector],
    result: duckdb_vector,
  },
  /** duckdb_list_vector_get_size(vector: duckdb_vector): idx_t */
  duckdb_list_vector_get_size: {
    parameters: [duckdb_vector],
    result: idx_t,
  },
  /** duckdb_list_vector_set_size(vector: duckdb_vector, size: idx_t): duckdb_state */
  duckdb_list_vector_set_size: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_state,
  },
  /** duckdb_list_vector_reserve(vector: duckdb_vector, required_capacity: idx_t): duckdb_state */
  duckdb_list_vector_reserve: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_state,
  },
  /** duckdb_struct_vector_get_child(vector: duckdb_vector, index: idx_t): duckdb_vector */
  duckdb_struct_vector_get_child: {
    parameters: [duckdb_vector, idx_t],
    result: duckdb_vector,
  },
  /** duckdb_array_vector_get_child(vector: duckdb_vector): duckdb_vector */
  duckdb_array_vector_get_child: {
    parameters: [duckdb_vector],
    result: duckdb_vector,
  },
  /** duckdb_slice_vector(vector: duckdb_vector, sel: duckdb_selection_vector, len: idx_t): void */
  duckdb_slice_vector: {
    parameters: [duckdb_vector, duckdb_selection_vector, idx_t],
    result: "void",
  },
  /** duckdb_vector_copy_sel(src: duckdb_vector, dst: duckdb_vector, sel: duckdb_selection_vector, src_count: idx_t, src_offset: idx_t, dst_offset: idx_t): void */
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
  /** duckdb_vector_reference_value(vector: duckdb_vector, value: duckdb_value): void */
  duckdb_vector_reference_value: {
    parameters: [duckdb_vector, duckdb_value],
    result: "void",
  },
  /** duckdb_vector_reference_vector(to_vector: duckdb_vector, from_vector: duckdb_vector): void */
  duckdb_vector_reference_vector: {
    parameters: [duckdb_vector, duckdb_vector],
    result: "void",
  },
  /** duckdb_validity_row_is_valid(validity: uint64_t *, row: idx_t): _Bool */
  duckdb_validity_row_is_valid: {
    parameters: [pointer, idx_t],
    result: u8,
  },
  /** duckdb_validity_set_row_validity(validity: uint64_t *, row: idx_t, valid: _Bool): void */
  duckdb_validity_set_row_validity: {
    parameters: [pointer, idx_t, u8],
    result: "void",
  },
  /** duckdb_validity_set_row_invalid(validity: uint64_t *, row: idx_t): void */
  duckdb_validity_set_row_invalid: {
    parameters: [pointer, idx_t],
    result: "void",
  },
  /** duckdb_validity_set_row_valid(validity: uint64_t *, row: idx_t): void */
  duckdb_validity_set_row_valid: {
    parameters: [pointer, idx_t],
    result: "void",
  },
  /** duckdb_create_scalar_function(): duckdb_scalar_function */
  duckdb_create_scalar_function: {
    parameters: [],
    result: duckdb_scalar_function,
  },
  /** duckdb_destroy_scalar_function(scalar_function: duckdb_scalar_function *): void */
  duckdb_destroy_scalar_function: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_scalar_function_set_name(scalar_function: duckdb_scalar_function, name: const char *): void */
  duckdb_scalar_function_set_name: {
    parameters: [duckdb_scalar_function, pointer],
    result: "void",
  },
  /** duckdb_scalar_function_set_varargs(scalar_function: duckdb_scalar_function, type: duckdb_logical_type): void */
  duckdb_scalar_function_set_varargs: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_scalar_function_set_special_handling(scalar_function: duckdb_scalar_function): void */
  duckdb_scalar_function_set_special_handling: {
    parameters: [duckdb_scalar_function],
    result: "void",
  },
  /** duckdb_scalar_function_set_volatile(scalar_function: duckdb_scalar_function): void */
  duckdb_scalar_function_set_volatile: {
    parameters: [duckdb_scalar_function],
    result: "void",
  },
  /** duckdb_scalar_function_add_parameter(scalar_function: duckdb_scalar_function, type: duckdb_logical_type): void */
  duckdb_scalar_function_add_parameter: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_scalar_function_set_return_type(scalar_function: duckdb_scalar_function, type: duckdb_logical_type): void */
  duckdb_scalar_function_set_return_type: {
    parameters: [duckdb_scalar_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_scalar_function_set_extra_info(scalar_function: duckdb_scalar_function, extra_info: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_scalar_function_set_extra_info: {
    parameters: [duckdb_scalar_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_scalar_function_set_bind(scalar_function: duckdb_scalar_function, bind: duckdb_scalar_function_bind_t): void */
  duckdb_scalar_function_set_bind: {
    parameters: [duckdb_scalar_function, duckdb_scalar_function_bind_t],
    result: "void",
  },
  /** duckdb_scalar_function_set_bind_data(info: duckdb_bind_info, bind_data: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_scalar_function_set_bind_data: {
    parameters: [duckdb_bind_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_scalar_function_set_bind_data_copy(info: duckdb_bind_info, copy: duckdb_copy_callback_t): void */
  duckdb_scalar_function_set_bind_data_copy: {
    parameters: [duckdb_bind_info, duckdb_copy_callback_t],
    result: "void",
  },
  /** duckdb_scalar_function_bind_set_error(info: duckdb_bind_info, error: const char *): void */
  duckdb_scalar_function_bind_set_error: {
    parameters: [duckdb_bind_info, pointer],
    result: "void",
  },
  /** duckdb_scalar_function_set_function(scalar_function: duckdb_scalar_function, function: duckdb_scalar_function_t): void */
  duckdb_scalar_function_set_function: {
    parameters: [duckdb_scalar_function, duckdb_scalar_function_t],
    result: "void",
  },
  /** duckdb_register_scalar_function(con: duckdb_connection, scalar_function: duckdb_scalar_function): duckdb_state */
  duckdb_register_scalar_function: {
    parameters: [duckdb_connection, duckdb_scalar_function],
    result: duckdb_state,
  },
  /** duckdb_scalar_function_get_extra_info(info: duckdb_function_info): void * */
  duckdb_scalar_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_scalar_function_bind_get_extra_info(info: duckdb_bind_info): void * */
  duckdb_scalar_function_bind_get_extra_info: {
    parameters: [duckdb_bind_info],
    result: pointer,
  },
  /** duckdb_scalar_function_get_bind_data(info: duckdb_function_info): void * */
  duckdb_scalar_function_get_bind_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_scalar_function_get_client_context(info: duckdb_bind_info, out_context: duckdb_client_context *): void */
  duckdb_scalar_function_get_client_context: {
    parameters: [duckdb_bind_info, buffer],
    result: "void",
  },
  /** duckdb_scalar_function_set_error(info: duckdb_function_info, error: const char *): void */
  duckdb_scalar_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  /** duckdb_create_scalar_function_set(name: const char *): duckdb_scalar_function_set */
  duckdb_create_scalar_function_set: {
    parameters: [pointer],
    result: duckdb_scalar_function_set,
  },
  /** duckdb_destroy_scalar_function_set(scalar_function_set: duckdb_scalar_function_set *): void */
  duckdb_destroy_scalar_function_set: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_add_scalar_function_to_set(set: duckdb_scalar_function_set, function: duckdb_scalar_function): duckdb_state */
  duckdb_add_scalar_function_to_set: {
    parameters: [duckdb_scalar_function_set, duckdb_scalar_function],
    result: duckdb_state,
  },
  /** duckdb_register_scalar_function_set(con: duckdb_connection, set: duckdb_scalar_function_set): duckdb_state */
  duckdb_register_scalar_function_set: {
    parameters: [duckdb_connection, duckdb_scalar_function_set],
    result: duckdb_state,
  },
  /** duckdb_scalar_function_bind_get_argument_count(info: duckdb_bind_info): idx_t */
  duckdb_scalar_function_bind_get_argument_count: {
    parameters: [duckdb_bind_info],
    result: idx_t,
  },
  /** duckdb_scalar_function_bind_get_argument(info: duckdb_bind_info, index: idx_t): duckdb_expression */
  duckdb_scalar_function_bind_get_argument: {
    parameters: [duckdb_bind_info, idx_t],
    result: duckdb_expression,
  },
  /** duckdb_create_selection_vector(size: idx_t): duckdb_selection_vector */
  duckdb_create_selection_vector: {
    parameters: [idx_t],
    result: duckdb_selection_vector,
  },
  /** duckdb_destroy_selection_vector(sel: duckdb_selection_vector): void */
  duckdb_destroy_selection_vector: {
    parameters: [duckdb_selection_vector],
    result: "void",
  },
  /** duckdb_selection_vector_get_data_ptr(sel: duckdb_selection_vector): sel_t * */
  duckdb_selection_vector_get_data_ptr: {
    parameters: [duckdb_selection_vector],
    result: pointer,
  },
  /** duckdb_create_aggregate_function(): duckdb_aggregate_function */
  duckdb_create_aggregate_function: {
    parameters: [],
    result: duckdb_aggregate_function,
  },
  /** duckdb_destroy_aggregate_function(aggregate_function: duckdb_aggregate_function *): void */
  duckdb_destroy_aggregate_function: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_aggregate_function_set_name(aggregate_function: duckdb_aggregate_function, name: const char *): void */
  duckdb_aggregate_function_set_name: {
    parameters: [duckdb_aggregate_function, pointer],
    result: "void",
  },
  /** duckdb_aggregate_function_add_parameter(aggregate_function: duckdb_aggregate_function, type: duckdb_logical_type): void */
  duckdb_aggregate_function_add_parameter: {
    parameters: [duckdb_aggregate_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_aggregate_function_set_return_type(aggregate_function: duckdb_aggregate_function, type: duckdb_logical_type): void */
  duckdb_aggregate_function_set_return_type: {
    parameters: [duckdb_aggregate_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_aggregate_function_set_functions(aggregate_function: duckdb_aggregate_function, state_size: duckdb_aggregate_state_size, state_init: duckdb_aggregate_init_t, update: duckdb_aggregate_update_t, combine: duckdb_aggregate_combine_t, finalize: duckdb_aggregate_finalize_t): void */
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
  /** duckdb_aggregate_function_set_destructor(aggregate_function: duckdb_aggregate_function, destroy: duckdb_aggregate_destroy_t): void */
  duckdb_aggregate_function_set_destructor: {
    parameters: [duckdb_aggregate_function, duckdb_aggregate_destroy_t],
    result: "void",
  },
  /** duckdb_register_aggregate_function(con: duckdb_connection, aggregate_function: duckdb_aggregate_function): duckdb_state */
  duckdb_register_aggregate_function: {
    parameters: [duckdb_connection, duckdb_aggregate_function],
    result: duckdb_state,
  },
  /** duckdb_aggregate_function_set_special_handling(aggregate_function: duckdb_aggregate_function): void */
  duckdb_aggregate_function_set_special_handling: {
    parameters: [duckdb_aggregate_function],
    result: "void",
  },
  /** duckdb_aggregate_function_set_extra_info(aggregate_function: duckdb_aggregate_function, extra_info: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_aggregate_function_set_extra_info: {
    parameters: [duckdb_aggregate_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_aggregate_function_get_extra_info(info: duckdb_function_info): void * */
  duckdb_aggregate_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_aggregate_function_set_error(info: duckdb_function_info, error: const char *): void */
  duckdb_aggregate_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  /** duckdb_create_aggregate_function_set(name: const char *): duckdb_aggregate_function_set */
  duckdb_create_aggregate_function_set: {
    parameters: [pointer],
    result: duckdb_aggregate_function_set,
  },
  /** duckdb_destroy_aggregate_function_set(aggregate_function_set: duckdb_aggregate_function_set *): void */
  duckdb_destroy_aggregate_function_set: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_add_aggregate_function_to_set(set: duckdb_aggregate_function_set, function: duckdb_aggregate_function): duckdb_state */
  duckdb_add_aggregate_function_to_set: {
    parameters: [duckdb_aggregate_function_set, duckdb_aggregate_function],
    result: duckdb_state,
  },
  /** duckdb_register_aggregate_function_set(con: duckdb_connection, set: duckdb_aggregate_function_set): duckdb_state */
  duckdb_register_aggregate_function_set: {
    parameters: [duckdb_connection, duckdb_aggregate_function_set],
    result: duckdb_state,
  },
  /** duckdb_create_table_function(): duckdb_table_function */
  duckdb_create_table_function: {
    parameters: [],
    result: duckdb_table_function,
  },
  /** duckdb_destroy_table_function(table_function: duckdb_table_function *): void */
  duckdb_destroy_table_function: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_table_function_set_name(table_function: duckdb_table_function, name: const char *): void */
  duckdb_table_function_set_name: {
    parameters: [duckdb_table_function, pointer],
    result: "void",
  },
  /** duckdb_table_function_add_parameter(table_function: duckdb_table_function, type: duckdb_logical_type): void */
  duckdb_table_function_add_parameter: {
    parameters: [duckdb_table_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_table_function_add_named_parameter(table_function: duckdb_table_function, name: const char *, type: duckdb_logical_type): void */
  duckdb_table_function_add_named_parameter: {
    parameters: [duckdb_table_function, pointer, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_table_function_set_extra_info(table_function: duckdb_table_function, extra_info: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_table_function_set_extra_info: {
    parameters: [duckdb_table_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_table_function_set_bind(table_function: duckdb_table_function, bind: duckdb_table_function_bind_t): void */
  duckdb_table_function_set_bind: {
    parameters: [duckdb_table_function, duckdb_table_function_bind_t],
    result: "void",
  },
  /** duckdb_table_function_set_init(table_function: duckdb_table_function, init: duckdb_table_function_init_t): void */
  duckdb_table_function_set_init: {
    parameters: [duckdb_table_function, duckdb_table_function_init_t],
    result: "void",
  },
  /** duckdb_table_function_set_local_init(table_function: duckdb_table_function, init: duckdb_table_function_init_t): void */
  duckdb_table_function_set_local_init: {
    parameters: [duckdb_table_function, duckdb_table_function_init_t],
    result: "void",
  },
  /** duckdb_table_function_set_function(table_function: duckdb_table_function, function: duckdb_table_function_t): void */
  duckdb_table_function_set_function: {
    parameters: [duckdb_table_function, duckdb_table_function_t],
    result: "void",
  },
  /** duckdb_table_function_supports_projection_pushdown(table_function: duckdb_table_function, pushdown: _Bool): void */
  duckdb_table_function_supports_projection_pushdown: {
    parameters: [duckdb_table_function, u8],
    result: "void",
  },
  /** duckdb_register_table_function(con: duckdb_connection, function: duckdb_table_function): duckdb_state */
  duckdb_register_table_function: {
    parameters: [duckdb_connection, duckdb_table_function],
    result: duckdb_state,
  },
  /** duckdb_bind_get_extra_info(info: duckdb_bind_info): void * */
  duckdb_bind_get_extra_info: {
    parameters: [duckdb_bind_info],
    result: pointer,
  },
  /** duckdb_table_function_get_client_context(info: duckdb_bind_info, out_context: duckdb_client_context *): void */
  duckdb_table_function_get_client_context: {
    parameters: [duckdb_bind_info, buffer],
    result: "void",
  },
  /** duckdb_bind_add_result_column(info: duckdb_bind_info, name: const char *, type: duckdb_logical_type): void */
  duckdb_bind_add_result_column: {
    parameters: [duckdb_bind_info, pointer, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_bind_get_parameter_count(info: duckdb_bind_info): idx_t */
  duckdb_bind_get_parameter_count: {
    parameters: [duckdb_bind_info],
    result: idx_t,
  },
  /** duckdb_bind_get_parameter(info: duckdb_bind_info, index: idx_t): duckdb_value */
  duckdb_bind_get_parameter: {
    parameters: [duckdb_bind_info, idx_t],
    result: duckdb_value,
  },
  /** duckdb_bind_get_named_parameter(info: duckdb_bind_info, name: const char *): duckdb_value */
  duckdb_bind_get_named_parameter: {
    parameters: [duckdb_bind_info, pointer],
    result: duckdb_value,
  },
  /** duckdb_bind_set_bind_data(info: duckdb_bind_info, bind_data: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_bind_set_bind_data: {
    parameters: [duckdb_bind_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_bind_set_cardinality(info: duckdb_bind_info, cardinality: idx_t, is_exact: _Bool): void */
  duckdb_bind_set_cardinality: {
    parameters: [duckdb_bind_info, idx_t, u8],
    result: "void",
  },
  /** duckdb_bind_set_error(info: duckdb_bind_info, error: const char *): void */
  duckdb_bind_set_error: {
    parameters: [duckdb_bind_info, pointer],
    result: "void",
  },
  /** duckdb_init_get_extra_info(info: duckdb_init_info): void * */
  duckdb_init_get_extra_info: {
    parameters: [duckdb_init_info],
    result: pointer,
  },
  /** duckdb_init_get_bind_data(info: duckdb_init_info): void * */
  duckdb_init_get_bind_data: {
    parameters: [duckdb_init_info],
    result: pointer,
  },
  /** duckdb_init_set_init_data(info: duckdb_init_info, init_data: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_init_set_init_data: {
    parameters: [duckdb_init_info, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_init_get_column_count(info: duckdb_init_info): idx_t */
  duckdb_init_get_column_count: {
    parameters: [duckdb_init_info],
    result: idx_t,
  },
  /** duckdb_init_get_column_index(info: duckdb_init_info, column_index: idx_t): idx_t */
  duckdb_init_get_column_index: {
    parameters: [duckdb_init_info, idx_t],
    result: idx_t,
  },
  /** duckdb_init_set_max_threads(info: duckdb_init_info, max_threads: idx_t): void */
  duckdb_init_set_max_threads: {
    parameters: [duckdb_init_info, idx_t],
    result: "void",
  },
  /** duckdb_init_set_error(info: duckdb_init_info, error: const char *): void */
  duckdb_init_set_error: {
    parameters: [duckdb_init_info, pointer],
    result: "void",
  },
  /** duckdb_function_get_extra_info(info: duckdb_function_info): void * */
  duckdb_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_function_get_bind_data(info: duckdb_function_info): void * */
  duckdb_function_get_bind_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_function_get_init_data(info: duckdb_function_info): void * */
  duckdb_function_get_init_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_function_get_local_init_data(info: duckdb_function_info): void * */
  duckdb_function_get_local_init_data: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_function_set_error(info: duckdb_function_info, error: const char *): void */
  duckdb_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  /** duckdb_add_replacement_scan(db: duckdb_database, replacement: duckdb_replacement_callback_t, extra_data: void *, delete_callback: duckdb_delete_callback_t): void */
  duckdb_add_replacement_scan: {
    parameters: [
      duckdb_database,
      duckdb_replacement_callback_t,
      pointer,
      duckdb_delete_callback_t,
    ],
    result: "void",
  },
  /** duckdb_replacement_scan_set_function_name(info: duckdb_replacement_scan_info, function_name: const char *): void */
  duckdb_replacement_scan_set_function_name: {
    parameters: [duckdb_replacement_scan_info, pointer],
    result: "void",
  },
  /** duckdb_replacement_scan_add_parameter(info: duckdb_replacement_scan_info, parameter: duckdb_value): void */
  duckdb_replacement_scan_add_parameter: {
    parameters: [duckdb_replacement_scan_info, duckdb_value],
    result: "void",
  },
  /** duckdb_replacement_scan_set_error(info: duckdb_replacement_scan_info, error: const char *): void */
  duckdb_replacement_scan_set_error: {
    parameters: [duckdb_replacement_scan_info, pointer],
    result: "void",
  },
  /** duckdb_get_profiling_info(connection: duckdb_connection): duckdb_profiling_info */
  duckdb_get_profiling_info: {
    parameters: [duckdb_connection],
    result: duckdb_profiling_info,
  },
  /** duckdb_profiling_info_get_value(info: duckdb_profiling_info, key: const char *): duckdb_value */
  duckdb_profiling_info_get_value: {
    parameters: [duckdb_profiling_info, pointer],
    result: duckdb_value,
  },
  /** duckdb_profiling_info_get_metrics(info: duckdb_profiling_info): duckdb_value */
  duckdb_profiling_info_get_metrics: {
    parameters: [duckdb_profiling_info],
    result: duckdb_value,
  },
  /** duckdb_profiling_info_get_child_count(info: duckdb_profiling_info): idx_t */
  duckdb_profiling_info_get_child_count: {
    parameters: [duckdb_profiling_info],
    result: idx_t,
  },
  /** duckdb_profiling_info_get_child(info: duckdb_profiling_info, index: idx_t): duckdb_profiling_info */
  duckdb_profiling_info_get_child: {
    parameters: [duckdb_profiling_info, idx_t],
    result: duckdb_profiling_info,
  },
  /** duckdb_appender_create(connection: duckdb_connection, schema: const char *, table: const char *, out_appender: duckdb_appender *): duckdb_state */
  duckdb_appender_create: {
    parameters: [duckdb_connection, pointer, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_appender_create_ext(connection: duckdb_connection, catalog: const char *, schema: const char *, table: const char *, out_appender: duckdb_appender *): duckdb_state */
  duckdb_appender_create_ext: {
    parameters: [duckdb_connection, pointer, pointer, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_appender_create_query(connection: duckdb_connection, query: const char *, column_count: idx_t, types: duckdb_logical_type *, table_name: const char *, column_names: const char **, out_appender: duckdb_appender *): duckdb_state */
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
  /** duckdb_appender_column_count(appender: duckdb_appender): idx_t */
  duckdb_appender_column_count: {
    parameters: [duckdb_appender],
    result: idx_t,
  },
  /** duckdb_appender_column_type(appender: duckdb_appender, col_idx: idx_t): duckdb_logical_type */
  duckdb_appender_column_type: {
    parameters: [duckdb_appender, idx_t],
    result: duckdb_logical_type,
  },
  /** duckdb_appender_error(appender: duckdb_appender): const char * */
  duckdb_appender_error: {
    parameters: [duckdb_appender],
    result: pointer,
  },
  /** duckdb_appender_error_data(appender: duckdb_appender): duckdb_error_data */
  duckdb_appender_error_data: {
    parameters: [duckdb_appender],
    result: duckdb_error_data,
  },
  /** duckdb_appender_flush(appender: duckdb_appender): duckdb_state */
  duckdb_appender_flush: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_appender_close(appender: duckdb_appender): duckdb_state */
  duckdb_appender_close: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_appender_destroy(appender: duckdb_appender *): duckdb_state */
  duckdb_appender_destroy: {
    parameters: [buffer],
    result: duckdb_state,
  },
  /** duckdb_appender_add_column(appender: duckdb_appender, name: const char *): duckdb_state */
  duckdb_appender_add_column: {
    parameters: [duckdb_appender, pointer],
    result: duckdb_state,
  },
  /** duckdb_appender_clear_columns(appender: duckdb_appender): duckdb_state */
  duckdb_appender_clear_columns: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_appender_begin_row(appender: duckdb_appender): duckdb_state */
  duckdb_appender_begin_row: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_appender_end_row(appender: duckdb_appender): duckdb_state */
  duckdb_appender_end_row: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_append_default(appender: duckdb_appender): duckdb_state */
  duckdb_append_default: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_append_default_to_chunk(appender: duckdb_appender, chunk: duckdb_data_chunk, col: idx_t, row: idx_t): duckdb_state */
  duckdb_append_default_to_chunk: {
    parameters: [duckdb_appender, duckdb_data_chunk, idx_t, idx_t],
    result: duckdb_state,
  },
  /** duckdb_append_bool(appender: duckdb_appender, value: _Bool): duckdb_state */
  duckdb_append_bool: {
    parameters: [duckdb_appender, u8],
    result: duckdb_state,
  },
  /** duckdb_append_int8(appender: duckdb_appender, value: int8_t): duckdb_state */
  duckdb_append_int8: {
    parameters: [duckdb_appender, i8],
    result: duckdb_state,
  },
  /** duckdb_append_int16(appender: duckdb_appender, value: int16_t): duckdb_state */
  duckdb_append_int16: {
    parameters: [duckdb_appender, i16],
    result: duckdb_state,
  },
  /** duckdb_append_int32(appender: duckdb_appender, value: int32_t): duckdb_state */
  duckdb_append_int32: {
    parameters: [duckdb_appender, i32],
    result: duckdb_state,
  },
  /** duckdb_append_int64(appender: duckdb_appender, value: int64_t): duckdb_state */
  duckdb_append_int64: {
    parameters: [duckdb_appender, i64],
    result: duckdb_state,
  },
  /** duckdb_append_hugeint(appender: duckdb_appender, value: duckdb_hugeint): duckdb_state */
  duckdb_append_hugeint: {
    parameters: [duckdb_appender, duckdb_hugeint],
    result: duckdb_state,
  },
  /** duckdb_append_uint8(appender: duckdb_appender, value: uint8_t): duckdb_state */
  duckdb_append_uint8: {
    parameters: [duckdb_appender, u8],
    result: duckdb_state,
  },
  /** duckdb_append_uint16(appender: duckdb_appender, value: uint16_t): duckdb_state */
  duckdb_append_uint16: {
    parameters: [duckdb_appender, u16],
    result: duckdb_state,
  },
  /** duckdb_append_uint32(appender: duckdb_appender, value: uint32_t): duckdb_state */
  duckdb_append_uint32: {
    parameters: [duckdb_appender, u32],
    result: duckdb_state,
  },
  /** duckdb_append_uint64(appender: duckdb_appender, value: uint64_t): duckdb_state */
  duckdb_append_uint64: {
    parameters: [duckdb_appender, u64],
    result: duckdb_state,
  },
  /** duckdb_append_uhugeint(appender: duckdb_appender, value: duckdb_uhugeint): duckdb_state */
  duckdb_append_uhugeint: {
    parameters: [duckdb_appender, duckdb_uhugeint],
    result: duckdb_state,
  },
  /** duckdb_append_float(appender: duckdb_appender, value: float): duckdb_state */
  duckdb_append_float: {
    parameters: [duckdb_appender, f32],
    result: duckdb_state,
  },
  /** duckdb_append_double(appender: duckdb_appender, value: double): duckdb_state */
  duckdb_append_double: {
    parameters: [duckdb_appender, f64],
    result: duckdb_state,
  },
  /** duckdb_append_date(appender: duckdb_appender, value: duckdb_date): duckdb_state */
  duckdb_append_date: {
    parameters: [duckdb_appender, duckdb_date],
    result: duckdb_state,
  },
  /** duckdb_append_time(appender: duckdb_appender, value: duckdb_time): duckdb_state */
  duckdb_append_time: {
    parameters: [duckdb_appender, duckdb_time],
    result: duckdb_state,
  },
  /** duckdb_append_timestamp(appender: duckdb_appender, value: duckdb_timestamp): duckdb_state */
  duckdb_append_timestamp: {
    parameters: [duckdb_appender, duckdb_timestamp],
    result: duckdb_state,
  },
  /** duckdb_append_interval(appender: duckdb_appender, value: duckdb_interval): duckdb_state */
  duckdb_append_interval: {
    parameters: [duckdb_appender, duckdb_interval],
    result: duckdb_state,
  },
  /** duckdb_append_varchar(appender: duckdb_appender, val: const char *): duckdb_state */
  duckdb_append_varchar: {
    parameters: [duckdb_appender, pointer],
    result: duckdb_state,
  },
  /** duckdb_append_varchar_length(appender: duckdb_appender, val: const char *, length: idx_t): duckdb_state */
  duckdb_append_varchar_length: {
    parameters: [duckdb_appender, pointer, idx_t],
    result: duckdb_state,
  },
  /** duckdb_append_blob(appender: duckdb_appender, data: const void *, length: idx_t): duckdb_state */
  duckdb_append_blob: {
    parameters: [duckdb_appender, pointer, idx_t],
    result: duckdb_state,
  },
  /** duckdb_append_null(appender: duckdb_appender): duckdb_state */
  duckdb_append_null: {
    parameters: [duckdb_appender],
    result: duckdb_state,
  },
  /** duckdb_append_value(appender: duckdb_appender, value: duckdb_value): duckdb_state */
  duckdb_append_value: {
    parameters: [duckdb_appender, duckdb_value],
    result: duckdb_state,
  },
  /** duckdb_append_data_chunk(appender: duckdb_appender, chunk: duckdb_data_chunk): duckdb_state */
  duckdb_append_data_chunk: {
    parameters: [duckdb_appender, duckdb_data_chunk],
    result: duckdb_state,
  },
  /** duckdb_table_description_create(connection: duckdb_connection, schema: const char *, table: const char *, out: duckdb_table_description *): duckdb_state */
  duckdb_table_description_create: {
    parameters: [duckdb_connection, pointer, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_table_description_create_ext(connection: duckdb_connection, catalog: const char *, schema: const char *, table: const char *, out: duckdb_table_description *): duckdb_state */
  duckdb_table_description_create_ext: {
    parameters: [duckdb_connection, pointer, pointer, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_table_description_destroy(table_description: duckdb_table_description *): void */
  duckdb_table_description_destroy: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_table_description_error(table_description: duckdb_table_description): const char * */
  duckdb_table_description_error: {
    parameters: [duckdb_table_description],
    result: pointer,
  },
  /** duckdb_column_has_default(table_description: duckdb_table_description, index: idx_t, out: _Bool *): duckdb_state */
  duckdb_column_has_default: {
    parameters: [duckdb_table_description, idx_t, pointer],
    result: duckdb_state,
  },
  /** duckdb_table_description_get_column_name(table_description: duckdb_table_description, index: idx_t): char * */
  duckdb_table_description_get_column_name: {
    parameters: [duckdb_table_description, idx_t],
    result: pointer,
  },
  /** duckdb_to_arrow_schema(arrow_options: duckdb_arrow_options, types: duckdb_logical_type *, names: const char **, column_count: idx_t, out_schema: struct ArrowSchema *): duckdb_error_data */
  duckdb_to_arrow_schema: {
    parameters: [duckdb_arrow_options, buffer, pointer, idx_t, buffer],
    result: duckdb_error_data,
  },
  /** duckdb_data_chunk_to_arrow(arrow_options: duckdb_arrow_options, chunk: duckdb_data_chunk, out_arrow_array: struct ArrowArray *): duckdb_error_data */
  duckdb_data_chunk_to_arrow: {
    parameters: [duckdb_arrow_options, duckdb_data_chunk, buffer],
    result: duckdb_error_data,
  },
  /** duckdb_schema_from_arrow(connection: duckdb_connection, schema: struct ArrowSchema *, out_types: duckdb_arrow_converted_schema *): duckdb_error_data */
  duckdb_schema_from_arrow: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_error_data,
  },
  /** duckdb_data_chunk_from_arrow(connection: duckdb_connection, arrow_array: struct ArrowArray *, converted_schema: duckdb_arrow_converted_schema, out_chunk: duckdb_data_chunk *): duckdb_error_data */
  duckdb_data_chunk_from_arrow: {
    parameters: [
      duckdb_connection,
      pointer,
      duckdb_arrow_converted_schema,
      buffer,
    ],
    result: duckdb_error_data,
  },
  /** duckdb_destroy_arrow_converted_schema(arrow_converted_schema: duckdb_arrow_converted_schema *): void */
  duckdb_destroy_arrow_converted_schema: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_query_arrow(connection: duckdb_connection, query: const char *, out_result: duckdb_arrow *): duckdb_state */
  duckdb_query_arrow: {
    parameters: [duckdb_connection, pointer, buffer],
    result: duckdb_state,
  },
  /** duckdb_query_arrow_schema(result: duckdb_arrow, out_schema: duckdb_arrow_schema *): duckdb_state */
  duckdb_query_arrow_schema: {
    parameters: [duckdb_arrow, buffer],
    result: duckdb_state,
  },
  /** duckdb_prepared_arrow_schema(prepared: duckdb_prepared_statement, out_schema: duckdb_arrow_schema *): duckdb_state */
  duckdb_prepared_arrow_schema: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_result_arrow_array(result: duckdb_result, chunk: duckdb_data_chunk, out_array: duckdb_arrow_array *): void */
  duckdb_result_arrow_array: {
    parameters: [duckdb_result, duckdb_data_chunk, buffer],
    result: "void",
  },
  /** duckdb_query_arrow_array(result: duckdb_arrow, out_array: duckdb_arrow_array *): duckdb_state */
  duckdb_query_arrow_array: {
    parameters: [duckdb_arrow, buffer],
    result: duckdb_state,
  },
  /** duckdb_arrow_column_count(result: duckdb_arrow): idx_t */
  duckdb_arrow_column_count: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  /** duckdb_arrow_row_count(result: duckdb_arrow): idx_t */
  duckdb_arrow_row_count: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  /** duckdb_arrow_rows_changed(result: duckdb_arrow): idx_t */
  duckdb_arrow_rows_changed: {
    parameters: [duckdb_arrow],
    result: idx_t,
  },
  /** duckdb_query_arrow_error(result: duckdb_arrow): const char * */
  duckdb_query_arrow_error: {
    parameters: [duckdb_arrow],
    result: pointer,
  },
  /** duckdb_destroy_arrow(result: duckdb_arrow *): void */
  duckdb_destroy_arrow: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_destroy_arrow_stream(stream_p: duckdb_arrow_stream *): void */
  duckdb_destroy_arrow_stream: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_execute_prepared_arrow(prepared_statement: duckdb_prepared_statement, out_result: duckdb_arrow *): duckdb_state */
  duckdb_execute_prepared_arrow: {
    parameters: [duckdb_prepared_statement, buffer],
    result: duckdb_state,
  },
  /** duckdb_arrow_scan(connection: duckdb_connection, table_name: const char *, arrow: duckdb_arrow_stream): duckdb_state */
  duckdb_arrow_scan: {
    parameters: [duckdb_connection, pointer, duckdb_arrow_stream],
    result: duckdb_state,
  },
  /** duckdb_arrow_array_scan(connection: duckdb_connection, table_name: const char *, arrow_schema: duckdb_arrow_schema, arrow_array: duckdb_arrow_array, out_stream: duckdb_arrow_stream *): duckdb_state */
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
  /** duckdb_execute_tasks(database: duckdb_database, max_tasks: idx_t): void */
  duckdb_execute_tasks: {
    parameters: [duckdb_database, idx_t],
    result: "void",
  },
  /** duckdb_create_task_state(database: duckdb_database): duckdb_task_state */
  duckdb_create_task_state: {
    parameters: [duckdb_database],
    result: duckdb_task_state,
  },
  /** duckdb_execute_tasks_state(state: duckdb_task_state): void */
  duckdb_execute_tasks_state: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  /** duckdb_execute_n_tasks_state(state: duckdb_task_state, max_tasks: idx_t): idx_t */
  duckdb_execute_n_tasks_state: {
    parameters: [duckdb_task_state, idx_t],
    result: idx_t,
  },
  /** duckdb_finish_execution(state: duckdb_task_state): void */
  duckdb_finish_execution: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  /** duckdb_task_state_is_finished(state: duckdb_task_state): _Bool */
  duckdb_task_state_is_finished: {
    parameters: [duckdb_task_state],
    result: u8,
  },
  /** duckdb_destroy_task_state(state: duckdb_task_state): void */
  duckdb_destroy_task_state: {
    parameters: [duckdb_task_state],
    result: "void",
  },
  /** duckdb_execution_is_finished(con: duckdb_connection): _Bool */
  duckdb_execution_is_finished: {
    parameters: [duckdb_connection],
    result: u8,
  },
  /** duckdb_stream_fetch_chunk(result: duckdb_result): duckdb_data_chunk */
  duckdb_stream_fetch_chunk: {
    parameters: [duckdb_result],
    result: duckdb_data_chunk,
  },
  /** duckdb_fetch_chunk(result: duckdb_result): duckdb_data_chunk */
  duckdb_fetch_chunk: {
    parameters: [duckdb_result],
    result: duckdb_data_chunk,
  },
  /** duckdb_create_cast_function(): duckdb_cast_function */
  duckdb_create_cast_function: {
    parameters: [],
    result: duckdb_cast_function,
  },
  /** duckdb_cast_function_set_source_type(cast_function: duckdb_cast_function, source_type: duckdb_logical_type): void */
  duckdb_cast_function_set_source_type: {
    parameters: [duckdb_cast_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_cast_function_set_target_type(cast_function: duckdb_cast_function, target_type: duckdb_logical_type): void */
  duckdb_cast_function_set_target_type: {
    parameters: [duckdb_cast_function, duckdb_logical_type],
    result: "void",
  },
  /** duckdb_cast_function_set_implicit_cast_cost(cast_function: duckdb_cast_function, cost: int64_t): void */
  duckdb_cast_function_set_implicit_cast_cost: {
    parameters: [duckdb_cast_function, i64],
    result: "void",
  },
  /** duckdb_cast_function_set_function(cast_function: duckdb_cast_function, function: duckdb_cast_function_t): void */
  duckdb_cast_function_set_function: {
    parameters: [duckdb_cast_function, duckdb_cast_function_t],
    result: "void",
  },
  /** duckdb_cast_function_set_extra_info(cast_function: duckdb_cast_function, extra_info: void *, destroy: duckdb_delete_callback_t): void */
  duckdb_cast_function_set_extra_info: {
    parameters: [duckdb_cast_function, pointer, duckdb_delete_callback_t],
    result: "void",
  },
  /** duckdb_cast_function_get_extra_info(info: duckdb_function_info): void * */
  duckdb_cast_function_get_extra_info: {
    parameters: [duckdb_function_info],
    result: pointer,
  },
  /** duckdb_cast_function_get_cast_mode(info: duckdb_function_info): duckdb_cast_mode */
  duckdb_cast_function_get_cast_mode: {
    parameters: [duckdb_function_info],
    result: i32,
  },
  /** duckdb_cast_function_set_error(info: duckdb_function_info, error: const char *): void */
  duckdb_cast_function_set_error: {
    parameters: [duckdb_function_info, pointer],
    result: "void",
  },
  /** duckdb_cast_function_set_row_error(info: duckdb_function_info, error: const char *, row: idx_t, output: duckdb_vector): void */
  duckdb_cast_function_set_row_error: {
    parameters: [duckdb_function_info, pointer, idx_t, duckdb_vector],
    result: "void",
  },
  /** duckdb_register_cast_function(con: duckdb_connection, cast_function: duckdb_cast_function): duckdb_state */
  duckdb_register_cast_function: {
    parameters: [duckdb_connection, duckdb_cast_function],
    result: duckdb_state,
  },
  /** duckdb_destroy_cast_function(cast_function: duckdb_cast_function *): void */
  duckdb_destroy_cast_function: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_destroy_expression(expr: duckdb_expression *): void */
  duckdb_destroy_expression: {
    parameters: [buffer],
    result: "void",
  },
  /** duckdb_expression_return_type(expr: duckdb_expression): duckdb_logical_type */
  duckdb_expression_return_type: {
    parameters: [duckdb_expression],
    result: duckdb_logical_type,
  },
  /** duckdb_expression_is_foldable(expr: duckdb_expression): _Bool */
  duckdb_expression_is_foldable: {
    parameters: [duckdb_expression],
    result: u8,
  },
  /** duckdb_expression_fold(context: duckdb_client_context, expr: duckdb_expression, out_value: duckdb_value *): duckdb_error_data */
  duckdb_expression_fold: {
    parameters: [duckdb_client_context, duckdb_expression, buffer],
    result: duckdb_error_data,
  },
} as const;
