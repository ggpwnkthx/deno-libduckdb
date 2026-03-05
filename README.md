# libduckdb

Low-level DuckDB FFI bindings for Deno.

[![JSR](https://jsr.io/badges/@ggpwnkthx/libduckdb)](https://jsr.io/@ggpwnkthx/libduckdb)

A TypeScript wrapper around the native DuckDB C library. Provides direct FFI
access to DuckDB's C API from Deno with full TypeScript type safety.

## Features

- **Auto-download**: Automatically downloads the native DuckDB library if not
  found
- **Full C API Access**: Direct access to all DuckDB C functions via FFI
- **Auto-generated Bindings**: FFI bindings generated from duckdb.h header
- **TypeScript Types**: Complete type definitions for DuckDB handles and structs
- **Cross-platform**: Supports Linux, macOS, and Windows
- **Minimal Dependencies**: Only uses @ggpwnkthx/libclang for library loading

## Installation

Import directly from JSR:

```typescript
import { getVersion, load } from "jsr:@ggpwnkthx/libduckdb";
```

## Quick Start

```typescript
import { getVersion, load } from "jsr:@ggpwnkthx/libduckdb";

// Load the DuckDB library (auto-downloads if needed)
const lib = await load();

// Get the DuckDB version
console.log("DuckDB version:", getVersion(lib));

// Create a database handle (8-byte buffer for opaque pointer)
const db = new Uint8Array(8);
lib.symbols.duckdb_open(null, db);

// Create a connection
const conn = new Uint8Array(8);
lib.symbols.duckdb_connect(db, conn);

// Execute a query
const result = new Uint8Array(8);
const query = "SELECT 'Hello, DuckDB!' AS greeting";
lib.symbols.duckdb_query(conn, query, result);

// Read the result
const rowCount = lib.symbols.duckdb_row_count(result);
const colCount = lib.symbols.duckdb_column_count(result);
console.log(`Rows: ${rowCount}, Columns: ${colCount}`);

// Read the string value (must free the pointer after use)
const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
const view = new Deno.UnsafePointerView(ptr);
console.log("Result:", view.getCString());
lib.symbols.duckdb_free(ptr);

// Clean up resources (important: avoid memory leaks)
lib.symbols.duckdb_destroy_result(result);
lib.symbols.duckdb_disconnect(conn);
lib.symbols.duckdb_close(db);
lib.close();
```

## API Overview

This library provides **low-level** FFI bindings to the DuckDB C API. Handles
(opaque pointers) are represented as `Uint8Array` buffers (8 bytes for pointer
values).

> **Note**: This is a low-level library. You are responsible for:
> - Creating and managing handle buffers
> - Cleaning up resources (results, connections, databases)
> - Freeing memory for string values (using `duckdb_free()`)

### Core Functions

- `load(libPath?)` - Load the DuckDB library, with optional auto-download
- `getVersion(lib)` - Get the DuckDB library version string

### Working with Handles

DuckDB uses opaque pointer handles for databases, connections, and results:

```typescript
// Create handles as 8-byte buffers
const db = new Uint8Array(8); // duckdb_database
const conn = new Uint8Array(8); // duckdb_connection
const result = new Uint8Array(8); // duckdb_result

// Pass handles to functions
lib.symbols.duckdb_open(null, db);
lib.symbols.duckdb_connect(db, conn);
lib.symbols.duckdb_query(conn, "SELECT 1", result);

// Read pointer values when needed
const dbPtr = new DataView(db.buffer).getBigUint64(0, true);
```

### Reading Values

Use the `duckdb_value_*` functions to read values from results:

```typescript
// Integer values
const intVal = lib.symbols.duckdb_value_int32(result, 0n, 0n);
const bigIntVal = lib.symbols.duckdb_value_int64(result, 0n, 0n);

// Floating point
const doubleVal = lib.symbols.duckdb_value_double(result, 0n, 0n);

// Strings (remember to free!)
const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
const str = new Deno.UnsafePointerView(ptr).getCString();
lib.symbols.duckdb_free(ptr);
```

## Commands

```bash
# Download DuckDB native library
deno task download

# Generate FFI bindings from duckdb.h header
deno task generate

# Run tests
deno task test

# Full build (downloads, generates, formats, lints, checks, and tests)
deno task build
```

## License

MIT License - Copyright (c) 2026 Isaac Jessup
