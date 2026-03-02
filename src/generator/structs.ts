import {
  CXChildVisitResult,
  CXCursorKind,
  CXTypeKind,
  getCursorKindFromBuffer,
  getCursorSpelling,
  getCursorType,
  getTypeKind,
  getTypeSpelling,
  toCursor,
  typeKindToFFI,
  visitChildren,
} from "@ggpwnkthx/libclang";

/**
 * NativeType allowed in Deno FFI structs
 */
type NativeType =
  | "i8"
  | "u8"
  | "i16"
  | "u16"
  | "i32"
  | "u32"
  | "i64"
  | "u64"
  | "f32"
  | "f64"
  | "pointer"
  | "buffer";

/**
 * Struct field information
 */
interface StructField {
  name: string;
  type: NativeType;
  typeSpelling: string;
  isTypedef: boolean;
  isEnum: boolean;
  isNestedStruct: boolean;
}

/**
 * Struct information
 */
interface StructInfo {
  name: string;
  fields: StructField[];
  isNested: boolean;
}

/**
 * Process a struct cursor to extract its name and fields
 */
function processStruct(
  buffer: Uint8Array,
): StructInfo | null {
  const cursor = toCursor(buffer);
  const structName = getCursorSpelling(cursor);

  // Skip anonymous structs or internal ones
  if (!structName || structName.startsWith("_")) {
    return null;
  }

  // Get fields by visiting children
  const fields: StructField[] = [];
  const children = visitChildren(cursor, () => {
    return CXChildVisitResult.Continue;
  });

  for (const childBuffer of children) {
    const kind = getCursorKindFromBuffer(childBuffer);

    if (kind === CXCursorKind.FieldDecl) {
      const childCursor = toCursor(childBuffer);
      const fieldName = getCursorSpelling(childCursor);

      if (!fieldName || fieldName.startsWith("_")) {
        continue;
      }

      const fieldType = getCursorType(childCursor);
      const fieldTypeKind = getTypeKind(fieldType);
      const fieldTypeSpelling = getTypeSpelling(fieldType);

      const nativeType = typeKindToFFI(fieldTypeKind, fieldTypeSpelling);

      if (nativeType === null) {
        // Try to handle pointer types specially
        if (fieldTypeKind === CXTypeKind.Pointer) {
          fields.push({
            name: fieldName,
            type: "pointer",
            typeSpelling: fieldTypeSpelling,
            isTypedef: false,
            isEnum: false,
            isNestedStruct: false,
          });
        }
        continue;
      } else {
        // Check if this is a typedef (has a simpler name, not "struct X")
        const isTypedef = !fieldTypeSpelling.startsWith("struct ") &&
          !fieldTypeSpelling.startsWith("union ") &&
          !fieldTypeSpelling.startsWith("enum ");

        // Check if this is an enum type
        const isEnum = fieldTypeKind === CXTypeKind.Enum;

        // Check if this is a nested struct
        const isNestedStruct = fieldTypeKind === CXTypeKind.Record &&
          (fieldTypeSpelling.startsWith("struct ") ||
            fieldTypeSpelling.startsWith("union "));

        fields.push({
          name: fieldName,
          type: nativeType as NativeType,
          typeSpelling: fieldTypeSpelling,
          isTypedef,
          isEnum,
          isNestedStruct,
        });
      }
    }
  }

  return {
    name: structName,
    fields,
    isNested: false,
  };
}

/**
 * Process a typedef struct (typedef struct { ... } name;)
 * For typedefs like: typedef struct { ... } name;
 * We need to extract fields from the anonymous struct inside
 */
function processTypedefStruct(
  buffer: Uint8Array,
): StructInfo | null {
  const cursor = toCursor(buffer);
  const typedefName = getCursorSpelling(cursor);

  // Skip anonymous or internal ones
  if (!typedefName || typedefName.startsWith("_")) {
    return null;
  }

  // Get the children - for typedef structs, we need to visit the struct's children
  const children = visitChildren(cursor, () => {
    return CXChildVisitResult.Continue;
  });

  // Find the anonymous struct inside the typedef and extract its fields
  for (const childBuffer of children) {
    const childKind = getCursorKindFromBuffer(childBuffer);

    if (childKind === CXCursorKind.StructDecl) {
      // For anonymous struct inside typedef, we need to extract fields directly
      // Visit children of the anonymous struct
      const structChildren = visitChildren(toCursor(childBuffer), () => {
        return CXChildVisitResult.Continue;
      });

      const fields: StructField[] = [];
      for (const fieldBuffer of structChildren) {
        const fieldKind = getCursorKindFromBuffer(fieldBuffer);

        if (fieldKind === CXCursorKind.FieldDecl) {
          const fieldCursor = toCursor(fieldBuffer);
          const fieldName = getCursorSpelling(fieldCursor);

          if (!fieldName || fieldName.startsWith("_")) {
            continue;
          }

          const fieldType = getCursorType(fieldCursor);
          const fieldTypeKind = getTypeKind(fieldType);
          const fieldTypeSpelling = getTypeSpelling(fieldType);

          const nativeType = typeKindToFFI(
            fieldTypeKind,
            fieldTypeSpelling,
          );

          if (nativeType === null) {
            continue;
          } else {
            const isTypedef = !fieldTypeSpelling.startsWith("struct ") &&
              !fieldTypeSpelling.startsWith("union ") &&
              !fieldTypeSpelling.startsWith("enum ");
            const isEnum = fieldTypeKind === CXTypeKind.Enum;
            const isNestedStruct = fieldTypeKind === CXTypeKind.Record &&
              (fieldTypeSpelling.startsWith("struct ") ||
                fieldTypeSpelling.startsWith("union "));

            fields.push({
              name: fieldName,
              type: nativeType as NativeType,
              typeSpelling: fieldTypeSpelling,
              isTypedef,
              isEnum,
              isNestedStruct,
            });
          }
        }
      }

      if (fields.length > 0) {
        return {
          name: typedefName,
          fields,
          isNested: false,
        };
      }
    }
  }

  return null;
}

/**
 * Collect all struct declarations from the translation unit
 */
export function collectStructs(
  children: Uint8Array[],
): Map<string, StructInfo> {
  const structs = new Map<string, StructInfo>();

  for (const buffer of children) {
    const cursorKind = getCursorKindFromBuffer(buffer);

    if (cursorKind === CXCursorKind.StructDecl) {
      const result = processStruct(buffer);
      if (result && result.fields.length > 0) {
        structs.set(result.name, result);
      }
    }

    // Also handle typedef structs (typedef struct { ... } name;)
    if (cursorKind === CXCursorKind.TypedefDecl) {
      const result = processTypedefStruct(buffer);
      if (result && result.fields.length > 0) {
        structs.set(result.name, result);
      }
    }
  }

  return structs;
}

/**
 * Topological sort to ensure referenced structs are defined first
 */
function topologicalSort(
  structs: Map<string, StructInfo>,
  knownStructNames: Set<string>,
): string[] {
  const sorted: string[] = [];
  const visited = new Set<string>();
  const inProgress = new Set<string>();

  // Get all struct names this struct references
  function getDependencies(name: string): string[] {
    const structInfo = structs.get(name);
    if (!structInfo) return [];

    const deps: string[] = [];
    for (const field of structInfo.fields) {
      const fieldTypeBaseName = field.typeSpelling.replace(
        /^(struct |union )/,
        "",
      );
      if (knownStructNames.has(fieldTypeBaseName)) {
        deps.push(fieldTypeBaseName);
      }
    }
    return deps;
  }

  function visit(name: string) {
    if (visited.has(name)) return;
    if (inProgress.has(name)) {
      // Circular dependency - just skip for now
      return;
    }

    inProgress.add(name);

    for (const dep of getDependencies(name)) {
      visit(dep);
    }

    inProgress.delete(name);
    visited.add(name);
    sorted.push(name);
  }

  for (const name of structs.keys()) {
    visit(name);
  }

  return sorted;
}

/**
 * Generate TypeScript NativeStructType exports
 */
export function generateStructsTS(
  structs: Map<string, StructInfo>,
  typedefNames: Set<string>,
): string {
  const lines: string[] = [];

  // Add header comment
  lines.push("/**");
  lines.push(" * DuckDB struct types");
  lines.push(" */");

  // Create a set of known struct names for quick lookup
  const knownStructNames = new Set(structs.keys());

  // First pass: collect which typedefs are actually used in struct fields
  // Only collect actual typedefs (not structs, which are defined locally)
  const usedTypedefs = new Set<string>();
  for (const [, structInfo] of structs) {
    for (const field of structInfo.fields) {
      // Only add to imports if it's a typedef AND it's in typedefNames AND it's not also a struct
      // (structs are defined locally and shouldn't be imported from typedefs.ts)
      if (
        field.isTypedef &&
        typedefNames.has(field.typeSpelling) &&
        !knownStructNames.has(field.typeSpelling)
      ) {
        usedTypedefs.add(field.typeSpelling);
      }
    }
  }

  // Generate import for typedefs - only include typedefs actually used in structs
  const usedTypedefsArray = Array.from(usedTypedefs).sort();
  if (usedTypedefsArray.length > 0) {
    lines.push(
      `import { ${usedTypedefsArray.join(", ")} } from "./typedefs.ts";`,
    );
    lines.push("");
  }

  // Topological sort to ensure referenced structs are defined first
  const sortedNames = topologicalSort(structs, knownStructNames);

  for (const name of sortedNames) {
    // Skip typedef names that don't have actual struct field definitions
    // (typedefs with struct underlying types that have no fields are treated as opaque pointers)
    if (typedefNames.has(name) && !structs.has(name)) continue;
    const structInfo = structs.get(name)!;
    // Skip empty struct names
    if (!name.trim()) continue;

    // Sanitize name for valid identifier
    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "_");

    // Generate struct array (just type strings or typedef references)
    const fieldTypes: string[] = [];
    for (const field of structInfo.fields) {
      let fieldTypeValue: string;

      // Check if this field type matches a known struct name
      // (e.g., duckdb_date_struct, duckdb_time_struct)
      const fieldTypeBaseName = field.typeSpelling.replace(
        /^(struct |union )/,
        "",
      );
      if (knownStructNames.has(fieldTypeBaseName)) {
        // Reference the struct directly
        fieldTypeValue = fieldTypeBaseName;
      } else if (field.isTypedef && typedefNames.has(field.typeSpelling)) {
        // Use the imported typedef const
        fieldTypeValue = `${field.typeSpelling}`;
      } else if (field.isEnum) {
        // For enum types, we use i32 as the native type
        fieldTypeValue = `"i32"`;
      } else if (field.isNestedStruct) {
        // Nested struct - use pointer since it's passed by reference
        fieldTypeValue = `"pointer"`;
      } else {
        // Use literal native type
        fieldTypeValue = `"${field.type}"`;
      }

      fieldTypes.push(fieldTypeValue);
    }

    if (fieldTypes.length > 0) {
      lines.push(`export const ${sanitizedName}: Deno.NativeStructType = {`);
      lines.push(`  struct: [${fieldTypes.join(", ")}],`);
      lines.push("};");
      lines.push("");
    }
  }

  return lines.join("\n");
}
