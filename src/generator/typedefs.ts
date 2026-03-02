import {
  CXCursorKind,
  CXTypeKind,
  getCursorKindFromBuffer,
  getCursorSpelling,
  getTypedefUnderlyingType,
  getTypeKind,
  getTypeSpelling,
  toCursor,
  typeKindToFFI,
} from "@ggpwnkthx/libclang";

/**
 * Process a typedef cursor to extract its name and underlying type
 */
function processTypedef(
  buffer: Uint8Array,
): { name: string; ffiType: string } | null {
  const cursor = toCursor(buffer);
  const typedefName = getCursorSpelling(cursor);

  if (!typedefName) {
    return null;
  }

  // Skip internal/system typedefs that start with underscore
  if (typedefName.startsWith("_")) {
    return null;
  }

  // Get the underlying type using getTypedefUnderlyingType
  const underlyingType = getTypedefUnderlyingType(buffer);
  const underlyingTypeKind = getTypeKind(underlyingType);
  const underlyingTypeSpelling = getTypeSpelling(underlyingType);

  // Try to convert the underlying type to FFI type
  const ffiType = typeKindToFFI(underlyingTypeKind, underlyingTypeSpelling);

  if (!ffiType) {
    // For complex types like pointers to structs, try to get the spelling
    const spelling = underlyingTypeSpelling.toLowerCase();

    // Handle pointer types
    if (underlyingTypeKind === CXTypeKind.Pointer) {
      // If it's a pointer to char/void, it's a string/pointer
      if (spelling.includes("char") || spelling.includes("void")) {
        return { name: typedefName, ffiType: "pointer" };
      }
      // Otherwise, treat as opaque pointer
      return { name: typedefName, ffiType: "pointer" };
    }

    // For records (structs), use pointer
    if (underlyingTypeKind === CXTypeKind.Record) {
      return { name: typedefName, ffiType: "pointer" };
    }

    return null;
  }

  return { name: typedefName, ffiType };
}

/**
 * Collect all typedef declarations from the translation unit
 */
export function collectTypedefs(children: Uint8Array[]): Map<string, string> {
  const typedefs = new Map<string, string>();

  for (const buffer of children) {
    const cursorKind = getCursorKindFromBuffer(buffer);

    // Handle typedef declarations
    if (cursorKind === CXCursorKind.TypedefDecl) {
      const result = processTypedef(buffer);
      if (result) {
        typedefs.set(result.name, result.ffiType);
      }
    }
  }

  return typedefs;
}

/**
 * Generate TypeScript type alias mappings
 */
export function generateTypedefsTS(typedefs: Map<string, string>): string {
  const lines: string[] = [];

  // Header
  lines.push("/**");
  lines.push(" * Basic FFI types");
  lines.push(" */");
  lines.push("// Basic FFI types");
  // Note: "void" is excluded because it's a reserved keyword in JS/TS
  const basicTypes = [
    "i8",
    "u8",
    "i16",
    "u16",
    "i32",
    "u32",
    "i64",
    "u64",
    "f32",
    "f64",
    "pointer",
    "buffer",
  ];
  for (const type of basicTypes) {
    lines.push(`export const ${type} = "${type}" as const;`);
  }
  lines.push("");

  // Add special enum typedefs that are used as return types
  // These are defined as "typedef enum" in C but need to be treated as typedefs
  lines.push("");
  lines.push("/**");
  lines.push(" * DuckDB enum types (treated as typedefs for FFI)");
  lines.push(" */");
  lines.push("// DuckDB enum types (treated as typedefs for FFI)");
  const enumTypedefs: [string, string][] = [
    ["duckdb_state", "u8"],
    ["duckdb_statement_type", "u8"],
  ];
  for (const [name, ffiType] of enumTypedefs) {
    lines.push(`export const ${name} = "${ffiType}" as const;`);
  }
  lines.push("");

  // Sort typedefs by name for consistent output
  const sortedTypedefs = Array.from(typedefs.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  // Known DuckDB handle types that should be treated as u64 (pointer-sized integers)
  // rather than pointer. This is because they are passed as raw pointer values
  // (extracted via getBigUint64 from buffers) in the FFI API.
  const handleTypes = new Set([
    "duckdb_database",
    "duckdb_connection",
    "duckdb_config",
    "duckdb_instance_cache",
    "duckdb_prepared_statement",
    "duckdb_result",
    "duckdb_pending_result",
    "duckdb_logical_type",
    "duckdb_data_chunk",
    "duckdb_value",
    "duckdb_vector",
    "duckdb_appender",
    "duckdb_arrow",
    "duckdb_arrow_schema",
    "duckdb_arrow_array",
  ]);

  // Collect handle types that need pointer variants
  const handleTypesList: string[] = [];

  // Generate named exports for each typedef
  lines.push("");
  lines.push("/**");
  lines.push(" * DuckDB type definitions");
  lines.push(" */");
  lines.push("// DuckDB type definitions");
  for (const [name, ffiType] of sortedTypedefs) {
    // Skip empty or whitespace-only names
    if (!name.trim()) continue;

    // Skip if already added as enum typedefs
    if (name === "duckdb_state" || name === "duckdb_statement_type") {
      continue;
    }

    // For known handle types, use u64 instead of pointer
    const finalType = handleTypes.has(name) ? "u64" : ffiType;

    // Sanitize name for valid identifier (replace invalid chars with underscores)
    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "_");

    lines.push(`export const ${sanitizedName} = "${finalType}" as const;`);

    // Track handle types for pointer variant generation
    if (handleTypes.has(name)) {
      handleTypesList.push(sanitizedName);
    }
  }
  lines.push("");

  // Generate pointer-type constants for handle types
  // These are used for pointer-to-pointer parameters (e.g., duckdb_database *output)
  if (handleTypesList.length > 0) {
    lines.push("");
    lines.push("/**");
    lines.push(" * Pointer types for handle types (used for out parameters)");
    lines.push(" */");
    lines.push("// Pointer types for handle types (used for out parameters)");
    for (const name of handleTypesList) {
      lines.push(`export const ${name}_ptr = "buffer" as const;`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
