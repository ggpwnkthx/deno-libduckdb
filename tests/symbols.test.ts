/**
 * Regression tests for FFI symbol-table generation.
 *
 * Locks in the fix for the failure mode where libclang's
 * `clang_visitChildren` returns zero `ParmDecl` cursors and the result
 * type misreports as `int` for functions whose actual return type is
 * C `bool` (a.k.a. `_Bool` from `<stdbool.h>`). The DuckDB C API
 * has 9 such functions; all of them must lower to `u8` with their
 * correct parameter arity.
 *
 * If a regenerate step ever drops the parameter list or drops the
 * `u8` return type for any of these, the generators'
 * `getCursorNumArguments` / `getCursorArgument` direct-API path
 * (and the defensive `_Bool` check in `mapReturnType`) has regressed.
 */

import { assertEquals } from "@std/assert";
import { symbols } from "../ffi/symbols.ts";
import {
  buffer,
  duckdb_date,
  duckdb_result,
  duckdb_string_t,
  duckdb_timestamp,
  duckdb_timestamp_ms,
  duckdb_timestamp_ns,
  duckdb_timestamp_s,
  idx_t,
} from "../ffi/typedefs.ts";

interface ExpectedSymbol {
  parameters: readonly string[];
  result: string;
}

const EXPECTED: Readonly<Record<string, ExpectedSymbol>> = {
  duckdb_value_boolean: {
    parameters: [buffer, idx_t, idx_t],
    result: "u8",
  },
  duckdb_value_is_null: {
    parameters: [buffer, idx_t, idx_t],
    result: "u8",
  },
  duckdb_result_is_streaming: {
    parameters: [duckdb_result],
    result: "u8",
  },
  duckdb_string_is_inlined: {
    parameters: [duckdb_string_t],
    result: "u8",
  },
  duckdb_is_finite_date: {
    parameters: [duckdb_date],
    result: "u8",
  },
  duckdb_is_finite_timestamp: {
    parameters: [duckdb_timestamp],
    result: "u8",
  },
  duckdb_is_finite_timestamp_s: {
    parameters: [duckdb_timestamp_s],
    result: "u8",
  },
  duckdb_is_finite_timestamp_ms: {
    parameters: [duckdb_timestamp_ms],
    result: "u8",
  },
  duckdb_is_finite_timestamp_ns: {
    parameters: [duckdb_timestamp_ns],
    result: "u8",
  },
};

Deno.test({
  name: "symbols - bool-returning functions have correct arity and u8 result",
  fn() {
    for (const [name, expected] of Object.entries(EXPECTED)) {
      const sym = symbols[name as keyof typeof symbols];
      assertEquals(
        [...sym.parameters],
        [...expected.parameters],
        `${name}: parameters mismatch`,
      );
      assertEquals(
        sym.result,
        expected.result,
        `${name}: result should be ${expected.result}`,
      );
    }
  },
});
