/**
 * Prepared statement functions for DuckDB
 */

import { DuckDBResult, PreparedStatement } from "./types.ts";
import { getSymbols, ptrToCString } from "./library.ts";
import { RESULT_SIZE } from "./constants.ts";
import { createError, createPointerBuffer, setPointer } from "./helpers.ts";
import { DataResult } from "./result.ts";

/**
 * Execute a prepared statement
 * @param stmt - The prepared statement
 * @returns Result tuple with DataResult or error
 */
export function executePrepared(
  stmt: PreparedStatement,
): DuckDBResult<DataResult> {
  const sym = getSymbols();

  const resultBuf = new Uint8Array(RESULT_SIZE);

  const result = sym.duckdb_execute_prepared(stmt, resultBuf);

  if (result === 0) {
    return [DataResult.from(resultBuf), null];
  } else {
    // Get error message from result
    const errorPtr = sym.duckdb_result_error(resultBuf);
    const errorMessage = errorPtr ? ptrToCString(errorPtr) : "Execute failed";
    sym.duckdb_destroy_result(resultBuf);
    return [null, createError(result, errorMessage)];
  }
}

/**
 * Get the number of parameters in a prepared statement
 * @param stmt - The prepared statement
 * @returns The number of parameters
 */
export function paramCount(stmt: PreparedStatement): bigint {
  const sym = getSymbols();
  return sym.duckdb_nparams(stmt);
}

/**
 * Get the number of columns returned by a prepared statement
 * @param stmt - The prepared statement
 * @returns The number of columns
 */
export function statementColumnCount(stmt: PreparedStatement): bigint {
  const sym = getSymbols();
  return sym.duckdb_prepared_statement_column_count(stmt);
}

/**
 * Destroy a prepared statement and free memory
 * @param stmt - The prepared statement
 */
export function destroyPrepared(stmt: PreparedStatement): void {
  const sym = getSymbols();

  // Create a buffer with the statement pointer
  const stmtPtrBuf = createPointerBuffer();
  setPointer(stmtPtrBuf, stmt);

  sym.duckdb_destroy_prepare(stmtPtrBuf);
}
