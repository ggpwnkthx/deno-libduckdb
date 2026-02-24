/**
 * Database functions for DuckDB
 */

import { DuckDB, DuckDBResult } from "./types.ts";
import { cstringToPtr, getSymbols } from "./library.ts";
import {
  createError,
  createPointerBuffer,
  getPointer,
  setPointer,
} from "./helpers.ts";

/**
 * A wrapper class for database handles that handles cleanup.
 * Use this for database handles to ensure proper memory management.
 */
export class DatabaseHandle {
  #db: DuckDB;
  #destroyed = false;

  constructor(db: DuckDB) {
    this.#db = db;
  }

  /**
   * Explicit Resource Management - closes the database
   * Allows use with Deno's `using` keyword:
   *   using db = open();
   *   // db automatically cleaned up at end of scope
   */
  [Symbol.dispose](): void {
    this.close();
  }

  /**
   * Close the database and free memory
   */
  close(): void {
    if (!this.#destroyed && this.#db) {
      close(this.#db);
      this.#destroyed = true;
    }
  }

  /**
   * Get the underlying database handle
   */
  get db(): DuckDB {
    return this.#db;
  }

  /**
   * Check if the database has been closed
   */
  get isDestroyed(): boolean {
    return this.#destroyed;
  }
}

/**
 * Open a DuckDB database
 * @param path - Optional path to the database file (defaults to ":memory:")
 * @returns Result tuple with DatabaseHandle or error. Use .close() or `using` to free memory.
 */
export function open(path?: string): DuckDBResult<DatabaseHandle> {
  const sym = getSymbols();
  const dbPath = path || ":memory:";

  const dbPtrBuf = createPointerBuffer();
  const pathPtr = cstringToPtr(dbPath);

  const result = sym.duckdb_open(pathPtr, dbPtrBuf);

  if (result === 0) {
    // Success - extract the pointer from buffer and wrap in DatabaseHandle
    const db = getPointer(dbPtrBuf);
    return [new DatabaseHandle(db), null];
  } else {
    // Error occurred
    return [null, createError(result, "Failed to open database")];
  }
}

/**
 * Close a DuckDB database
 * @param db - The database handle (or DatabaseHandle)
 */
export function close(db: DuckDB | DatabaseHandle): void {
  const sym = getSymbols();

  // Get the raw database handle
  const dbHandle = db instanceof DatabaseHandle ? db.db : db;

  // Create a buffer with the database pointer
  const dbPtrBuf = createPointerBuffer();
  setPointer(dbPtrBuf, dbHandle);

  sym.duckdb_close(dbPtrBuf);
}
