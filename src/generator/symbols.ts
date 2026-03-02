import {
  CXChildVisitResult,
  CXCursorKind,
  CXTypeKind,
  getCursorKindFromBuffer,
  getCursorSpelling,
  getCursorType,
  getResultType,
  getTypeKind,
  getTypeSpelling,
  isCharPointerType,
  isVoidPointerType,
  toCursor,
  typeKindToFFI,
  visitChildren,
} from "@ggpwnkthx/libclang";

/**
 * Function information from C header
 */
interface FunctionInfo {
  name: string;
  returnType: string; // Type spelling from C
  returnTypeKind: CXTypeKind;
  parameters: ParameterInfo[];
}

interface ParameterInfo {
  name: string;
  type: string; // Type spelling from C
  typeKind: CXTypeKind;
}

/**
 * Map C type to Deno FFI parameter type
 * Note: For function parameters, we use "buffer" for output parameters
 * because DuckDB API uses pointer-to-pointer pattern (output parameters)
 * and tests pass Uint8Array buffers
 */
function mapParamType(
  typeKind: CXTypeKind,
  typeSpelling: string,
  paramName: string,
  typedefNames: Set<string>,
  structNames: Set<string>,
): string {
  // Check if this is an output parameter (parameter name starts with "out_")
  const isOutputParam = paramName.startsWith("out_");

  // First check for typedef names - handle these before Pointer type check
  // Check for pointer-to-handle pattern: duckdb_database *, duckdb_connection *, etc.
  // These are typically in-out parameters that get modified (e.g., set to NULL)
  const cleanSpelling = typeSpelling.replace(/^(const |volatile )/, "").trim();
  const isPointerToHandle = /^(.+?)\s*\*$/.test(cleanSpelling);
  const baseTypeMatch = cleanSpelling.match(/^(.+?)\s*\*$/);
  const baseType = baseTypeMatch ? baseTypeMatch[1].trim() : cleanSpelling;

  if (typedefNames.has(cleanSpelling)) {
    // Output parameters use buffer (passed as Uint8Array to receive the output)
    if (isOutputParam) {
      return "buffer";
    }
    // Return the typedef name - it's defined in typedefs.ts with proper FFI type
    return cleanSpelling;
  }

  // Handle pointer-to-handle pattern: duckdb_database *, duckdb_connection *, etc.
  // These are typically in-out parameters that get modified (e.g., set to NULL after close)
  // Use buffer for all pointer types to handles since tests pass Uint8Array
  if (isPointerToHandle && typedefNames.has(baseType)) {
    return "buffer";
  }

  // Handle pointer types
  if (typeKind === CXTypeKind.Pointer) {
    // Output parameters use "buffer" since they're passed as Uint8Array
    if (isOutputParam) {
      return "buffer";
    }
    // For string parameters (const char*, char**, etc.), use pointer since test passes UnsafePointer
    // Also handle void* pointers
    if (isCharPointerType(typeSpelling) || isVoidPointerType(typeSpelling)) {
      return "pointer";
    }
    // Check if this is a pointer to a struct - use buffer since test passes Uint8Array
    if (isPointerToHandle && structNames.has(baseType)) {
      return "buffer";
    }
    return "pointer";
  }

  // First try the basic type mapping
  const nativeType = typeKindToFFI(typeKind, typeSpelling);
  if (nativeType) {
    return nativeType;
  }

  // Handle struct names - use buffer for struct references
  const structMatch = cleanSpelling.match(/^(struct |union )?(.+)$/);
  if (structMatch) {
    const name = structMatch[2];
    if (structNames.has(name)) {
      return isOutputParam ? "buffer" : "pointer";
    }
  }

  // Default to buffer for unknown complex types
  return "buffer";
}

/**
 * Map C return type to Deno FFI return type
 */
function mapReturnType(
  typeKind: CXTypeKind,
  typeSpelling: string,
  typedefNames: Set<string>,
  enumNames: Set<string>,
  structNames: Set<string>,
): string {
  // Handle void return
  if (typeKind === CXTypeKind.Void) {
    return `"void"`;
  }

  // First check the spelling for known DuckDB return types
  // This handles cases where libclang doesn't report the correct type kind
  const cleanSpelling = typeSpelling.replace(/^(const |volatile )/, "").trim();
  if (
    cleanSpelling === "duckdb_state" ||
    cleanSpelling === "duckdb_statement_type"
  ) {
    // Return the typedef name - it's defined in typedefs.ts as a string constant
    return cleanSpelling;
  }

  // Handle DuckDB enum types that are typedefs (e.g., duckdb_type)
  // These return integer values, not pointers
  if (
    cleanSpelling === "duckdb_type" ||
    cleanSpelling === "duckdb_error_type" ||
    cleanSpelling === "duckdb_pending_state" ||
    cleanSpelling === "duckdb_result_type" ||
    cleanSpelling === "duckdb_cast_mode"
  ) {
    return "i32";
  }

  // First try the basic type mapping
  const nativeType = typeKindToFFI(typeKind, typeSpelling);
  if (nativeType) {
    return nativeType;
  }

  // Handle enum types (e.g., duckdb_state)
  // Note: duckdb_state is defined as "typedef enum duckdb_state" so it may come through as typedef
  if (typeKind === CXTypeKind.Enum || enumNames.has(cleanSpelling)) {
    return "i32"; // Default enum to i32
  }

  // Handle typedef names (e.g., duckdb_database, duckdb_connection)
  if (typedefNames.has(cleanSpelling)) {
    return cleanSpelling;
  }

  // Handle struct names
  const structMatch = cleanSpelling.match(/^(struct |union )?(.+)$/);
  if (structMatch) {
    const name = structMatch[2];
    if (structNames.has(name)) {
      return name;
    }
  }

  // Default to pointer for unknown complex types
  return "pointer";
}

/**
 * Collect all function declarations from AST children
 */
export function collectFunctions(
  children: Uint8Array[],
): FunctionInfo[] {
  const functions: FunctionInfo[] = [];

  for (const buffer of children) {
    const cursorKind = getCursorKindFromBuffer(buffer);

    // Look for function declarations
    if (cursorKind === CXCursorKind.FunctionDecl) {
      const cursor = toCursor(buffer);
      const funcName = getCursorSpelling(cursor);

      // Skip internal functions or empty names
      if (!funcName || funcName.startsWith("_")) {
        continue;
      }

      // Get return type - need to extract from function signature
      const cursorType = getCursorType(cursor);
      // Use getResultType to get the actual return type (not the function pointer type)
      const resultType = getResultType(cursorType);
      const returnTypeKind = getTypeKind(resultType);
      const returnTypeSpelling = getTypeSpelling(resultType);

      // Extract just the return type from the function signature
      // e.g., "duckdb_state (const char *, duckdb_database *)" -> "duckdb_state"
      let returnTypeSpellingClean = returnTypeSpelling;
      const parenIndex = returnTypeSpelling.indexOf("(");
      if (parenIndex > 0) {
        returnTypeSpellingClean = returnTypeSpelling.substring(0, parenIndex)
          .trim();
      }

      // Also try to get the proper type kind by looking at typedefs/enums
      // For duckdb_state specifically, we know it's an enum
      let returnTypeKindFinal = returnTypeKind;
      if (returnTypeSpellingClean === "duckdb_state") {
        returnTypeKindFinal = CXTypeKind.Enum;
      }

      // Collect parameters
      const parameters: ParameterInfo[] = [];
      const paramChildren = visitChildren(cursor, () => {
        return CXChildVisitResult.Continue;
      });

      for (const paramBuffer of paramChildren) {
        const paramKind = getCursorKindFromBuffer(paramBuffer);

        if (paramKind === CXCursorKind.ParmDecl) {
          const paramCursor = toCursor(paramBuffer);
          const paramName = getCursorSpelling(paramCursor);
          const paramType = getCursorType(paramCursor);
          const paramTypeKind = getTypeKind(paramType);
          const paramTypeSpelling = getTypeSpelling(paramType);

          parameters.push({
            name: paramName || `param${parameters.length}`,
            type: paramTypeSpelling,
            typeKind: paramTypeKind,
          });
        }
      }

      functions.push({
        name: funcName,
        returnType: returnTypeSpellingClean,
        returnTypeKind: returnTypeKindFinal,
        parameters,
      });
    }
  }

  return functions;
}

/**
 * Generate the symbols.ts content
 */
export function generateSymbolsTS(
  functions: FunctionInfo[],
  typedefNames: Set<string>,
  enumNames: Set<string> = new Set(),
  structNames: Set<string> = new Set(),
): string {
  const lines: string[] = [];

  // Add header comment
  lines.push("/**");
  lines.push(" * DuckDB FFI function symbols");
  lines.push(" */");

  // First pass: generate all symbol definitions and collect which types are actually used
  const usedTypedefNames = new Set<string>();
  const usedStructNames = new Set<string>();
  const usedEnumNames = new Set<string>();

  // Basic FFI types that don't need imports
  const basicTypes = new Set([
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
  ]);
  const literalTypes = new Set(["void"]);

  // Track which basic types are actually used
  const usedBasicTypes = new Set<string>();

  // Generate all function symbols and collect used types
  const symbolLines: string[] = [];

  for (const func of functions) {
    // Map parameter types
    const paramTypes = func.parameters.map((p) =>
      mapParamType(
        p.typeKind,
        p.type,
        p.name,
        typedefNames,
        structNames,
      )
    );

    // Map return type
    const resultType = mapReturnType(
      func.returnTypeKind,
      func.returnType,
      typedefNames,
      enumNames,
      structNames,
    );

    // Collect used typedef names from parameters
    for (const pt of paramTypes) {
      // Track basic types that are used
      if (basicTypes.has(pt)) {
        usedBasicTypes.add(pt);
      } else if (!literalTypes.has(pt)) {
        // Check if it's a typedef, struct, or enum
        if (typedefNames.has(pt)) {
          usedTypedefNames.add(pt);
        } else if (structNames.has(pt)) {
          usedStructNames.add(pt);
        } else if (enumNames.has(pt)) {
          usedEnumNames.add(pt);
        }
      }
    }

    // Collect used typedef names from return type
    if (basicTypes.has(resultType)) {
      usedBasicTypes.add(resultType);
    } else if (!literalTypes.has(resultType)) {
      if (typedefNames.has(resultType)) {
        usedTypedefNames.add(resultType);
      } else if (structNames.has(resultType)) {
        usedStructNames.add(resultType);
      } else if (enumNames.has(resultType)) {
        usedEnumNames.add(resultType);
      }
    }

    // Generate symbol entry
    const paramsStr = paramTypes.length > 0
      ? `[${paramTypes.join(", ")}]`
      : "[]";

    symbolLines.push(`  ${func.name}: {`);
    symbolLines.push(`    parameters: ${paramsStr},`);
    symbolLines.push(`    result: ${resultType},`);
    symbolLines.push(`  },`);
  }

  // Generate imports - only include types that are actually used
  const imports: string[] = [];

  // Add only basic types that are actually used
  for (const bt of usedBasicTypes) {
    imports.push(bt);
  }

  // Add only used typedefs
  for (const name of usedTypedefNames) {
    imports.push(name);
  }

  // Determine which struct names are NOT already in typedefs
  // (these need to be imported from structs.ts)
  const structNamesOnly = Array.from(usedStructNames).filter(
    (name) => !typedefNames.has(name),
  );

  // Determine which enum names are NOT already in typedefs
  // (these need to be imported from enums.ts)
  // Also exclude enum types that are treated as typedefs (duckdb_state, duckdb_statement_type)
  const enumTypesAsTypedefs = new Set([
    "duckdb_state",
    "duckdb_statement_type",
  ]);
  const enumNamesOnly = Array.from(usedEnumNames).filter(
    (name) => !typedefNames.has(name) && !enumTypesAsTypedefs.has(name),
  );

  if (imports.length > 0) {
    // Deduplicate imports
    const uniqueImports = [...new Set(imports)];
    lines.push(`import { ${uniqueImports.join(", ")} } from "./typedefs.ts";`);
  }

  // Also import structs that are NOT in typedefs
  if (structNamesOnly.length > 0) {
    const structList = structNamesOnly.sort();
    lines.push(`import { ${structList.join(", ")} } from "./structs.ts";`);
  }

  // Also import enums that are NOT in typedefs
  if (enumNamesOnly.length > 0) {
    const enumList = enumNamesOnly.sort();
    lines.push(`import { ${enumList.join(", ")} } from "./enums.ts";`);
  }

  if (lines.length > 0) {
    lines.push("");
  }

  lines.push("export const symbols = {");

  // Replace the empty object with actual symbols
  if (symbolLines.length > 0) {
    lines.push(...symbolLines);
    lines.push("} as const;");
  } else {
    lines.push("} as const;");
  }

  return lines.join("\n");
}
