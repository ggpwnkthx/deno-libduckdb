/**
 * Generate FFI bindings CLI entry point
 *
 * Runs the FFI binding generator to parse DuckDB's C header
 * and generate TypeScript bindings in ./ffi/
 */
import { generate } from "../generator/mod.ts";

await generate();
