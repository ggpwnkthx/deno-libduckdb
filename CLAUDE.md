# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **typesafe DuckDB FFI wrapper for Deno** that provides:
- Low-level FFI bindings to the native DuckDB library
- High-level wrapper classes with automatic memory management
- Code generation from C headers using libclang

## Commands

```bash
# Download DuckDB native library
deno task download

# Generate FFI bindings from C headers
deno task generate

# Run tests
deno task test

# Run a single test file
deno test -A tests/wrapper.test.ts

# Run tests with specific name
deno test -A --filter "duckdb wrapper - open" tests/*

# Full build (download + generate + lint + check + test)
deno task build
```

## Architecture

### Code Generation Pipeline
- **Header parsing**: `tools/generate.ts` uses libclang to parse `libduckdb/duckdb.h`
- **Type configuration**: `src/ffi_config.ts` defines DuckDB-specific type mappings (handle types, buffer types, enum mappings)
- **Generated output**: `src/ffi.ts` contains the FFI struct descriptors and symbol definitions

### Source Structure
- **`src/mod.ts`**: Main entry point, exports all public APIs
- **`src/library.ts`**: Library loading and symbol retrieval
- **`src/database.ts`**: Database handle wrapper with `DatabaseHandle` class
- **`src/connection.ts`**: Connection and prepared statement handles (`ConnectionHandle`, `PreparedStatementHandle`)
- **`src/result.ts`**: Query results - `DataResult` (lazy, chainable), `ResultRow`, and low-level value getters
- **`src/types.ts`**: TypeScript type definitions
- **`src/helpers.ts`**: FFI helper utilities (pointer buffers)
- **`src/ffi_config.ts`**: DuckDB-specific FFI configuration

### Key Design Patterns

1. **Result tuples**: Functions return `[T, null] | [null, Error]` for error handling
2. **Explicit Resource Management**: Handle classes implement `Symbol.dispose` for automatic cleanup with Deno's `using` keyword
3. **Lazy DataResult**: The `DataResult` class provides chainable `.map()`, `.filter()`, `.limit()`, `.offset()` and lazy `.rows()` iteration
4. **Reference counting**: `DataResult` tracks ownership to ensure proper memory cleanup when results are shared across chains
