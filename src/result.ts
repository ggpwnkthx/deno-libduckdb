/**
 * Result handling functions for DuckDB
 */

import { DuckDBType, Result } from "./types.ts";
import { getSymbols, ptrToCString } from "./library.ts";

/**
 * Try to coerce a string value to its native type
 */
function coerceValue(value: string): unknown {
  // Check for null
  if (value === null || value === "null") return null;

  // Check for boolean
  if (value === "true") return true;
  if (value === "false") return false;

  // Check for integer
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }

  // Check for float
  if (/^-?\d+\.\d+$/.test(value)) {
    return parseFloat(value);
  }

  // Return as string
  return value;
}

/**
 * A single row from a DuckDB result, accessible with column names as keys.
 * Provides type-safe get method with automatic type coercion.
 */
export class ResultRow {
  private _columns: string[];
  private _types: DuckDBType[];
  private _result: Result;
  private _rowIndex: bigint;
  private _useCoercion: boolean;

  constructor(
    result: Result,
    rowIndex: bigint,
    columns: string[],
    types: DuckDBType[],
    useCoercion: boolean = false,
  ) {
    this._result = result;
    this._rowIndex = rowIndex;
    this._columns = columns;
    this._types = types;
    this._useCoercion = useCoercion;
  }

  /**
   * Get a value from the row by column name
   * @param key - The column name
   * @returns The value, or null if null, or undefined if column not found
   */
  get<T = unknown>(key: string): T | null | undefined {
    const colIndex = this._columns.indexOf(key);
    if (colIndex === -1) {
      return undefined;
    }

    if (isNull(this._result, this._rowIndex, BigInt(colIndex))) {
      return null;
    }

    // If using type coercion or type is unknown (VARCHAR), get as string and coerce
    if (this._useCoercion || this._types[colIndex] === DuckDBType.VARCHAR) {
      const strValue = getVarchar(
        this._result,
        this._rowIndex,
        BigInt(colIndex),
      );
      return coerceValue(strValue) as T;
    }

    return getValue(
      this._result,
      this._rowIndex,
      BigInt(colIndex),
      this._types[colIndex],
    ) as T;
  }

  /**
   * Check if a column exists in the row
   * @param key - The column name
   * @returns True if the column exists
   */
  has(key: string): boolean {
    return this._columns.includes(key);
  }

  /**
   * Get all column names
   */
  keys(): string[] {
    return [...this._columns];
  }

  /**
   * Iterate over the row (column, value) pairs
   */
  *[Symbol.iterator](): IterableIterator<[string, unknown]> {
    for (let i = 0; i < this._columns.length; i++) {
      const colName = this._columns[i];
      if (isNull(this._result, this._rowIndex, BigInt(i))) {
        yield [colName, null];
      } else if (this._useCoercion || this._types[i] === DuckDBType.VARCHAR) {
        const strValue = getVarchar(this._result, this._rowIndex, BigInt(i));
        yield [colName, coerceValue(strValue)];
      } else {
        yield [
          colName,
          getValue(this._result, this._rowIndex, BigInt(i), this._types[i]),
        ];
      }
    }
  }

  /**
   * Convert to a plain object
   */
  toObject(): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    for (const [key, value] of this) {
      obj[key] = value;
    }
    return obj;
  }
}

interface DataResultState {
  result: Result;
  columns: string[];
  types: DuckDBType[];
  limit?: number;
  offset?: number;
  useCoercion?: boolean;
  _refCount: number;
}

/**
 * FinalizationRegistry as a safety net for leaked resources
 */
const resultFinalizer = new FinalizationRegistry<{ result: Result }>(
  (holder) => {
    // Safety net: if a DataResult is leaked, still try to destroy its result
    destroyResult(holder.result);
  },
);

/**
 * A lazy, chainable result processor for DuckDB queries.
 * Provides intuitive iteration and transformation methods.
 */
export class DataResult<T = ResultRow> {
  private _state: DataResultState;
  private _transformFn: ((row: ResultRow) => boolean) | null;
  private _mapFn: ((row: ResultRow) => T) | null;
  private _destroyed: boolean = false;

  private constructor(state: DataResultState) {
    this._state = state;
    this._transformFn = null;
    this._mapFn = null;
  }

  /**
   * Create a DataResult from a raw DuckDB result
   * @param result - The raw result buffer from query()
   * @returns A new DataResult instance
   */
  static from(result: Result): DataResult {
    const columns: string[] = [];
    const types: DuckDBType[] = [];
    const colCount = columnCount(result);

    for (let i = 0; i < colCount; i++) {
      columns.push(columnName(result, BigInt(i)));
      // Use actual column types now that columnType works correctly
      types.push(columnType(result, BigInt(i)));
    }

    // Enable type coercion to handle edge cases (DECIMAL, NULL types, etc.)
    const dataResult = new DataResult({
      result,
      columns,
      types,
      useCoercion: true,
      _refCount: 1,
    });
    // Register with finalizationRegistry as a safety net
    resultFinalizer.register(dataResult, { result });
    return dataResult;
  }

  /**
   * Take ownership of the underlying result, incrementing the reference count.
   * Called by chained DataResult instances to share ownership.
   */
  private _takeOwnership(): void {
    this._state._refCount++;
  }

  /**
   * Map each row to a new value
   * @param fn - The mapping function
   * @returns A new DataResult with the mapping applied
   */
  map<U>(fn: (row: ResultRow) => U): DataResult<U> {
    const newResult = new DataResult<U>({ ...this._state });
    newResult._transformFn = this._transformFn;
    newResult._mapFn = fn as (row: ResultRow) => U;
    newResult._destroyed = this._destroyed;
    // Register with finalizer for cleanup safety
    resultFinalizer.register(newResult, { result: this._state.result });
    this._takeOwnership();
    return newResult;
  }

  /**
   * Filter rows based on a predicate
   * @param fn - The filter predicate
   * @returns A new DataResult with the filter applied
   */
  filter(fn: (row: ResultRow) => boolean): DataResult<T> {
    const prevTransform = this._transformFn;
    const newResult = new DataResult<T>({ ...this._state });
    newResult._transformFn = prevTransform
      ? (row: ResultRow) => prevTransform(row) && fn(row)
      : fn;
    newResult._mapFn = this._mapFn;
    newResult._destroyed = this._destroyed;
    // Register with finalizer for cleanup safety
    resultFinalizer.register(newResult, { result: this._state.result });
    this._takeOwnership();
    return newResult;
  }

  /**
   * Limit the number of rows
   * @param n - The maximum number of rows
   * @returns A new DataResult with the limit applied
   */
  limit(n: number): DataResult<T> {
    const newResult = new DataResult<T>({ ...this._state, limit: n });
    newResult._transformFn = this._transformFn;
    newResult._mapFn = this._mapFn;
    newResult._destroyed = this._destroyed;
    // Register with finalizer for cleanup safety
    resultFinalizer.register(newResult, { result: this._state.result });
    this._takeOwnership();
    return newResult;
  }

  /**
   * Skip a number of rows
   * @param n - The number of rows to skip
   * @returns A new DataResult with the offset applied
   */
  offset(n: number): DataResult<T> {
    const newResult = new DataResult<T>({ ...this._state, offset: n });
    newResult._transformFn = this._transformFn;
    newResult._mapFn = this._mapFn;
    newResult._destroyed = this._destroyed;
    // Register with finalizer for cleanup safety
    resultFinalizer.register(newResult, { result: this._state.result });
    this._takeOwnership();
    return newResult;
  }

  /**
   * Iterate over rows lazily
   * @returns An iterable iterator over ResultRow objects
   */
  rows(): IterableIterator<ResultRow> {
    const state = this._state;
    const transformFn = this._transformFn;
    const rowCount = this._getRowCount();
    const offset = state.offset ?? 0;
    const limit = state.limit ?? rowCount;

    let currentIndex = offset;
    let yielded = 0;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next(): IteratorResult<ResultRow> {
        if (yielded >= limit || currentIndex >= rowCount) {
          return { done: true, value: undefined as unknown as ResultRow };
        }

        const row = new ResultRow(
          state.result,
          BigInt(currentIndex),
          state.columns,
          state.types,
          state.useCoercion,
        );

        currentIndex++;

        // Apply filter if present
        if (transformFn && !transformFn(row)) {
          return this.next();
        }

        yielded++;

        return { done: false, value: row };
      },
    };
  }

  /**
   * Get all rows as an array
   * @returns An array of ResultRow objects
   */
  toArray(): T[] {
    const results: T[] = [];
    for (const row of this.rows()) {
      if (this._mapFn) {
        results.push(this._mapFn(row));
      } else {
        results.push(row as unknown as T);
      }
    }
    return results;
  }

  /**
   * Get the first row
   * @returns The first row, or undefined if there are no rows
   */
  first(): T | undefined {
    for (const row of this.rows()) {
      if (this._mapFn) {
        return this._mapFn(row);
      }
      return row as unknown as T;
    }
    return undefined;
  }

  /**
   * Get all column names
   * @returns An array of column names
   */
  columns(): string[] {
    return [...this._state.columns];
  }

  /**
   * Get all column types
   * @returns An array of DuckDBType values
   */
  types(): DuckDBType[] {
    return [...this._state.types];
  }

  /**
   * Get the raw data as a 2D array of values
   * @returns A 2D array of values
   */
  raw(): unknown[][] {
    const rows: unknown[][] = [];
    const rowCount = this._getRowCount();
    const state = this._state;

    for (let r = 0; r < rowCount; r++) {
      const row: unknown[] = [];
      for (let c = 0; c < state.columns.length; c++) {
        if (isNull(state.result, BigInt(r), BigInt(c))) {
          row.push(null);
        } else {
          row.push(
            getValue(state.result, BigInt(r), BigInt(c), state.types[c]),
          );
        }
      }
      rows.push(row);
    }

    return rows;
  }

  /**
   * Destroy the result and free memory
   * Uses reference counting - only frees the underlying result when ref count reaches 0
   */
  destroy(): void {
    if (this._destroyed) {
      return;
    }
    // Unregister from finalizationRegistry since we're explicitly destroying
    resultFinalizer.unregister(this);
    this._state._refCount--;
    if (this._state._refCount <= 0) {
      destroyResult(this._state.result);
    }
    this._destroyed = true;
  }

  /**
   * Explicit Resource Management - synonym for destroy()
   * Allows use with Deno's `using` keyword:
   *   using result = query(conn, "SELECT 1");
   *   // result automatically cleaned up at end of scope
   */
  [Symbol.dispose](): void {
    this.destroy();
  }

  /**
   * Get the raw DuckDB result buffer for low-level API access
   * Use this if you need direct access to raw result functions
   */
  get result(): Result {
    return this._state.result;
  }

  private _getRowCount(): number {
    return Number(rowCount(this._state.result));
  }
}

/**
 * Get the number of rows in a result
 * @param result - The result buffer
 * @returns The number of rows
 */
export function rowCount(result: Result): bigint {
  const sym = getSymbols();
  return sym.duckdb_row_count(result);
}

/**
 * Get the number of columns in a result
 * @param result - The result buffer
 * @returns The number of columns
 */
export function columnCount(result: Result): bigint {
  const sym = getSymbols();
  return sym.duckdb_column_count(result);
}

/**
 * Get the name of a column
 * @param result - The result buffer
 * @param col - The column index (0-based)
 * @returns The column name
 */
export function columnName(result: Result, col: bigint): string {
  const sym = getSymbols();
  const namePtr = sym.duckdb_column_name(result, col);
  return namePtr ? ptrToCString(namePtr) : "";
}

/**
 * Get the logical type of a column
 * @param result - The result buffer
 * @param col - The column index (0-based)
 * @returns The column type ID
 */
export function columnType(result: Result, col: bigint): DuckDBType {
  const sym = getSymbols();
  // duckdb_column_type returns duckdb_type enum directly as i32
  const typeId = sym.duckdb_column_type(result, col) as number;
  return typeId as DuckDBType;
}

/**
 * Check if a value is null
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns True if the value is null
 */
export function isNull(result: Result, row: bigint, col: bigint): boolean {
  const sym = getSymbols();
  return sym.duckdb_value_is_null(result, row, col) !== 0;
}

/**
 * Get a boolean value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The boolean value
 */
export function getBoolean(result: Result, row: bigint, col: bigint): boolean {
  const sym = getSymbols();
  return sym.duckdb_value_boolean(result, row, col) !== 0;
}

/**
 * Get an int8 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The int8 value
 */
export function getInt8(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_int8(result, row, col);
}

/**
 * Get an int16 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The int16 value
 */
export function getInt16(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_int16(result, row, col);
}

/**
 * Get an int32 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The int32 value
 */
export function getInt32(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_int32(result, row, col);
}

/**
 * Get an int64 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The int64 value
 */
export function getInt64(result: Result, row: bigint, col: bigint): bigint {
  const sym = getSymbols();
  return sym.duckdb_value_int64(result, row, col);
}

/**
 * Get a uint8 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The uint8 value
 */
export function getUint8(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_uint8(result, row, col);
}

/**
 * Get a uint16 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The uint16 value
 */
export function getUint16(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_uint16(result, row, col);
}

/**
 * Get a uint32 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The uint32 value
 */
export function getUint32(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_uint32(result, row, col);
}

/**
 * Get a uint64 value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The uint64 value
 */
export function getUint64(result: Result, row: bigint, col: bigint): bigint {
  const sym = getSymbols();
  return sym.duckdb_value_uint64(result, row, col);
}

/**
 * Get a float value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The float value
 */
export function getFloat(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_float(result, row, col);
}

/**
 * Get a double value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The double value
 */
export function getDouble(result: Result, row: bigint, col: bigint): number {
  const sym = getSymbols();
  return sym.duckdb_value_double(result, row, col);
}

/**
 * Get a varchar (string) value
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @returns The string value
 */
export function getVarchar(result: Result, row: bigint, col: bigint): string {
  const sym = getSymbols();
  // Note: duckdb_value_varchar only works on VARCHAR columns
  // For other types, it returns NULL - caller should use duckdb_value_string
  // or handle type conversion at the application level
  const strPtr = sym.duckdb_value_varchar(result, col, row);
  return strPtr ? ptrToCString(strPtr) : "";
}

/**
 * Get a generic value based on column type
 * @param result - The result buffer
 * @param row - The row index (0-based)
 * @param col - The column index (0-based)
 * @param type - The DuckDB type
 * @returns The value
 */
export function getValue(
  result: Result,
  row: bigint,
  col: bigint,
  type: DuckDBType,
): unknown {
  if (isNull(result, row, col)) {
    return null;
  }

  switch (type) {
    case DuckDBType.BOOLEAN:
      return getBoolean(result, row, col);
    case DuckDBType.TINYINT:
      return getInt8(result, row, col);
    case DuckDBType.SMALLINT:
      return getInt16(result, row, col);
    case DuckDBType.INTEGER:
      return getInt32(result, row, col);
    case DuckDBType.BIGINT:
      return getInt64(result, row, col);
    case DuckDBType.UTINYINT:
      return getUint8(result, row, col);
    case DuckDBType.USMALLINT:
      return getUint16(result, row, col);
    case DuckDBType.UINTEGER:
      return getUint32(result, row, col);
    case DuckDBType.UBIGINT:
      return getUint64(result, row, col);
    case DuckDBType.FLOAT:
      return getFloat(result, row, col);
    case DuckDBType.DOUBLE:
      return getDouble(result, row, col);
    case DuckDBType.VARCHAR:
    case DuckDBType.JSON:
      return getVarchar(result, row, col);
    default:
      return getVarchar(result, row, col);
  }
}

/**
 * Get the error message from a result (if any)
 * @param result - The result buffer
 * @returns The error message or empty string
 */
export function resultError(result: Result): string {
  const sym = getSymbols();
  const errorPtr = sym.duckdb_result_error(result);
  return errorPtr ? ptrToCString(errorPtr) : "";
}

/**
 * Destroy a result and free memory
 * @param result - The result buffer
 */
export function destroyResult(result: Result): void {
  const sym = getSymbols();
  sym.duckdb_destroy_result(result);
}
