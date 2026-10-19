<!-- deno-maintenance-notice:start -->
> **Maintenance notice**
>
> This project is no longer actively maintained and remains available for reference and community forks.
>
> On October 9, 2026, [Deno announced that its team is joining Cloudflare](https://deno.com/blog/cloudflare). The team will provide monthly Deno runtime bug fixes and security updates for one year following that announcement, then end its development of the runtime. Deno remains open source, and community development may continue.
>
> Separately, Deno Deploy will shut down six months after the announcement. JSR will continue operating, with its infrastructure moving to Cloudflare.
>
> These changes prompted my decision to discontinue maintenance of this project. Existing code may continue to work, but future compatibility and fixes are not guaranteed.
<!-- deno-maintenance-notice:end -->

# libduckdb

Low-level DuckDB (v1.5.5) FFI bindings for Deno. This package is versioned
`1.0.17` and ships bindings for DuckDB C API `v1.5.5`.

[![JSR](https://jsr.io/badges/@ggpwnkthx/libduckdb)](https://jsr.io/@ggpwnkthx/libduckdb)

A TypeScript wrapper around the native DuckDB C library. Provides direct FFI
access to DuckDB's C API from Deno with full TypeScript type safety.

## Features

- **Auto-download**: Downloads from DuckDB GitHub releases with retry, archive
  signature validation, and size checks
- **Auto-generated bindings**: `enums`, `structs`, `symbols`, `typedefs` parsed
  from `duckdb.h` via libclang
- **Subpath exports**: `./enums`, `./structs`, `./symbols`, `./typedefs`
- **Handle helpers**: `HANDLE_SIZE`, `createHandleBuffer`, `assertHandleBuffer`,
  `readHandle`, `writeHandle`, `toBufferSource`
- **Cancellable**: `load` and `download` accept an `AbortSignal`
- **Cross-platform**: Linux, macOS (incl. universal), Windows; x86_64 + arm64
- **Pure Deno extraction**: ZIP and gzip via `DecompressionStream`, no external
  tools
- **Minimal runtime deps**: only `@ggpwnkthx/libclang`

## Installation

Import directly from JSR:

```typescript
import { getVersion, load } from "jsr:@ggpwnkthx/libduckdb";
```

## Quick Start

```typescript
import {
  getVersion,
  load,
  ptrToCStringAndFree,
} from "jsr:@ggpwnkthx/libduckdb";

// Load the DuckDB library (auto-downloads if needed)
const lib = await load();

// Get the DuckDB version
console.log("DuckDB version:", getVersion(lib));

// Create a database handle (8-byte buffer for opaque pointer)
const db = new Uint8Array(8);
const pathPtr = Deno.UnsafePointer.of(new TextEncoder().encode(":memory:\0"));
lib.symbols.duckdb_open(pathPtr, db);

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

// Read the string value (auto-frees the pointer)
const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
console.log("Result:", ptrToCStringAndFree(lib, ptr));

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
>
> - Creating and managing handle buffers
> - Cleaning up resources (results, connections, databases)
> - Freeing memory for string values (use `ptrToCStringAndFree` or
>   `duckdb_free()`)

### Core

- `load(libPath?, signal?)` - Load the DuckDB library, with optional
  auto-download and cancellation
- `getVersion(lib)` - Get the DuckDB library version string
- `DUCKDB_VERSION` - The DuckDB version this binding targets

### Strings

- `ptrToCStringAndFree(lib, ptr)` - Read a C string and call `duckdb_free` in
  one step (use for values returned by `duckdb_value_varchar`, etc.)
- `cstringToPtr` / `ptrToCString` - Re-exported from `@ggpwnkthx/libclang` for
  lower-level use

### Handles

DuckDB uses opaque pointer handles represented as 8-byte `Uint8Array` buffers.

- `HANDLE_SIZE` - `8` (bytes per handle on 64-bit)
- `createHandleBuffer()` - Allocate a fresh handle buffer
- `assertHandleBuffer(buf, name?)` - Throw `TypeError` if not an 8-byte
  `Uint8Array`
- `readHandle(buf)` - Read the pointer value as `bigint` (for debugging)
- `writeHandle(buf, ptr)` - Write a `bigint` pointer value (rarely needed)
- `toBufferSource(buf)` - Cast a `Uint8Array` to `BufferSource` for FFI

### Generated bindings (subpath exports)

- `jsr:@ggpwnkthx/libduckdb/symbols` - The `symbols` map for `Deno.dlopen`
- `jsr:@ggpwnkthx/libduckdb/structs` - `Deno.NativeStructType` definitions
  (`duckdb_date`, `duckdb_interval`, `duckdb_vector`, ...)
- `jsr:@ggpwnkthx/libduckdb/enums` - `DUCKDB_TYPE`, `duckdb_state`,
  `duckdb_statement_type`, and more
- `jsr:@ggpwnkthx/libduckdb/typedefs` - Primitive and DuckDB typedef constants

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

// Strings - ptrToCStringAndFree handles duckdb_free() for you
const ptr = lib.symbols.duckdb_value_varchar(result, 0n, 0n);
const str = ptrToCStringAndFree(lib, ptr);
```

## Commands

```bash
# Download DuckDB native library
deno task download

# Generate FFI bindings from duckdb.h header
deno task generate

# Run tests (11 files: queries, types, prepared statements, errors,
# edge cases, archive extraction, symbol-table regression, ...)
deno task test

# Full build (downloads, generates, formats, lints, checks, and tests)
deno task build
```

`tools/download.ts` also accepts flags when run directly:

```bash
deno run -A tools/download.ts --output ./libduckdb    # custom output dir
deno run -A tools/download.ts --help                  # show all options
```

## License

MIT License - Copyright (c) 2024 Isaac Jessup
