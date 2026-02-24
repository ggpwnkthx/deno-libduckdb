/**
 * DuckDB-specific FFI binding output generator
 *
 * Generates DuckDB-specific helper functions and library loading logic.
 * Can be run as a standalone CLI tool.
 */

import {
  createIndex,
  disposeIndex,
  getDiagnostic,
  getDiagnosticSeverity,
  getDiagnosticSpelling,
  getNumDiagnostics,
  load,
  parseTranslationUnit,
  collectDeclarations,
  type CollectedData,
  type FFIType,
  makeTSafeName,
  type StructField,
} from "@ggpwnkthx/libclang";
import {
  DUCKDB_BUFFER_TYPES,
  DUCKDB_HANDLE_PARAMS,
  DUCKDB_HANDLE_TYPES,
  DUCKDB_TYPE_MAPPINGS,
} from "../src/ffi_config.ts";

interface CliArgs {
  header: string;
  out?: string;
  selfTest: boolean;
  buffers: string[];
  clangArgs: string[];
}

function parseArgs(): CliArgs {
  const args = Deno.args;
  const cliArgs: CliArgs = {
    header: "libduckdb/duckdb.h",
    selfTest: false,
    buffers: [], // Will use DUCKDB_BUFFER_TYPES from ffi_config.ts by default
    clangArgs: [],
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    switch (arg) {
      case "--header":
        cliArgs.header = args[++i];
        break;
      case "--out":
        cliArgs.out = args[++i];
        break;
      case "--self-test":
        cliArgs.selfTest = true;
        break;
      case "--buffers":
        cliArgs.buffers = args[++i].split(",");
        break;
      case "--":
        cliArgs.clangArgs = args.slice(i + 1);
        i = args.length;
        break;
      default:
        if (!arg.startsWith("-")) {
          // Could be a header file or other argument
          cliArgs.clangArgs.push(arg);
        }
        break;
    }
    i++;
  }

  return cliArgs;
}

async function main() {
  const args = parseArgs();

  // Set default output file if not specified
  if (!args.out) {
    args.out = "src/ffi.ts";
  }

  // Use DuckDB-specific configuration from ffi_config.ts
  const handleTypes = [...DUCKDB_HANDLE_TYPES];
  const bufferTypes = args.buffers.length > 0
    ? args.buffers
    : [...DUCKDB_BUFFER_TYPES];

  // Load libclang
  console.log("Loading libclang...");
  load();
  console.log("  Loaded libclang");

  // Create index
  const index = createIndex(false, false);

  // Parse header
  console.log(`Parsing header: ${args.header}`);
  const parseResult = parseTranslationUnit(index, args.header, [], []);

  if (!parseResult || !parseResult.translationUnit) {
    console.error("Failed to parse header");
    disposeIndex(index);
    Deno.exit(1);
  }

  const tu = parseResult.translationUnit;

  // Check for diagnostics
  const numDiagnostics = getNumDiagnostics(tu);
  if (numDiagnostics > 0) {
    console.log(`  ${numDiagnostics} diagnostic(s):`);
    for (let i = 0; i < numDiagnostics; i++) {
      const diag = getDiagnostic(tu, i);
      const severity = getDiagnosticSeverity(diag);
      const spelling = getDiagnosticSpelling(diag);
      console.log(`    [${severity}] ${spelling}`);
    }
  }

  // Collect declarations with DuckDB-specific type mappings
  const warnings: string[] = [];
  const data = collectDeclarations(
    tu,
    bufferTypes,
    handleTypes,
    warnings,
    DUCKDB_TYPE_MAPPINGS,
    [...DUCKDB_HANDLE_PARAMS],
  );

  console.log(
    `  Parsed ${data.structs.size} struct(s), ${data.functions.length} function(s)`,
  );

  if (warnings.length > 0) {
    console.log("  Warnings:");
    for (const w of warnings) {
      console.log(`    - ${w}`);
    }
  }

  // Generate output
  const output = generateDuckDBOutput(data);

  // Write output
  if (args.out) {
    // Ensure output directory exists
    const outDir = args.out.includes("/")
      ? args.out.substring(0, args.out.lastIndexOf("/"))
      : ".";
    if (outDir !== ".") {
      await Deno.mkdir(outDir, { recursive: true });
    }
    await Deno.writeTextFile(args.out, output);
    console.log(`Output written to: ${args.out}`);
  } else {
    console.log("\nGenerated output:\n");
    console.log(output);
  }

  // Clean up
  disposeIndex(index);
}

main().catch((err) => {
  console.error("Error:", err);
  Deno.exit(1);
});

type Parameter = { name: string; type: FFIType };

/**
 * Generate DuckDB-specific output including library loading and helpers
 */
export function generateDuckDBOutput(data: CollectedData): string {
  const lines: string[] = [];

  // Struct descriptors
  lines.push("// Struct descriptors");
  for (const [_key, struct] of data.structs) {
    if (struct.isUnion) {
      lines.push(`// Union '${struct.name}' - using max field size`);
    }

    if (struct.fields.length === 0) {
      lines.push(
        `export const ${makeTSafeName(struct.name)} = { struct: [] } as const;`,
      );
    } else {
      const fieldTypes = struct.fields.map((f: StructField) =>
        typeof f.type === "string"
          ? `"${f.type}"`
          : `{ struct: ${
            JSON.stringify((f.type as { struct: string[] }).struct)
          } }`
      );
      lines.push(
        `export const ${makeTSafeName(struct.name)} = { struct: [${
          fieldTypes.join(", ")
        }] } as const;`,
      );
    }
  }
  lines.push("");

  // Symbols
  lines.push("export const symbols = {");
  for (const func of data.functions) {
    const paramTypes = func.parameters.map((p: Parameter) =>
      typeof p.type === "string"
        ? `"${p.type}"`
        : `{ struct: ${
          JSON.stringify((p.type as { struct: string[] }).struct)
        } }`
    );
    const returnType = typeof func.returnType === "string"
      ? `"${func.returnType}"`
      : `{ struct: ${
        JSON.stringify((func.returnType as { struct: string[] }).struct)
      } }`;

    lines.push(`  ${func.name}: {`);
    lines.push(`    parameters: [${paramTypes.join(", ")}],`);
    lines.push(`    result: ${returnType},`);
    lines.push(`  },`);
  }
  lines.push("} as const satisfies Deno.ForeignLibraryInterface;");
  lines.push("");

  // Open helper
  lines.push("/**");
  lines.push(" * Open the native library with optional path override");
  lines.push(" */");
  lines.push(
    "export function open(path?: string): Deno.DynamicLibrary<typeof symbols> {",
  );
  lines.push("  if (path) {");
  lines.push("    return Deno.dlopen(path, symbols);");
  lines.push("  }");
  lines.push("  ");
  lines.push("  // Try common library names based on OS");
  lines.push("  const isWindows = Deno.build.os === 'windows';");
  lines.push("  const isMac = Deno.build.os === 'darwin';");
  lines.push("  const isLinux = Deno.build.os === 'linux';");
  lines.push("  ");
  lines.push("  const paths = [];");
  lines.push("  if (isWindows) {");
  lines.push("    paths.push('libduckdb.dll');");
  lines.push("  } else if (isMac) {");
  lines.push("    paths.push('libduckdb.dylib');");
  lines.push("  } else if (isLinux) {");
  lines.push("    paths.push('libduckdb.so');");
  lines.push("  }");
  lines.push("  ");
  lines.push("  for (const p of paths) {");
  lines.push("    try {");
  lines.push("      return Deno.dlopen(p, symbols);");
  lines.push("    } catch {");
  lines.push("      // Try next path");
  lines.push("    }");
  lines.push("  }");
  lines.push("  ");
  lines.push("  throw new Error('Could not find native library');");
  lines.push("}");
  lines.push("");

  // Helper functions
  lines.push("/**");
  lines.push(" * Convert a C string pointer to a JavaScript string");
  lines.push(" */");
  lines.push("export function ptrToCString(ptr: Deno.PointerValue): string {");
  lines.push("  if (!ptr) return '';");
  lines.push("  return new Deno.UnsafePointerView(ptr).getCString();");
  lines.push("}");
  lines.push("");

  lines.push("/**");
  lines.push(" * Convert a JavaScript string to a C string pointer");
  lines.push(" */");
  lines.push("export function cstringToPtr(str: string): Deno.PointerValue {");
  lines.push("  const encoder = new TextEncoder();");
  lines.push("  const data = encoder.encode(str + '\\0');");
  lines.push("  const buffer = new Uint8Array(data);");
  lines.push("  return Deno.UnsafePointer.of(buffer);");
  lines.push("}");

  return lines.join("\n");
}
