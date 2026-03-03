/**
 * Generate FFI bindings CLI entry point
 *
 * Runs the FFI binding generator to parse DuckDB's C header
 * and generate TypeScript bindings in src/ffi/
 */
import { generate } from "../src/generator/mod.ts";

await generate();
