import {
  CXChildVisitResult,
  CXCursorKind,
  CXTypeKind,
  getCursorKindFromBuffer,
  getCursorSpelling,
  getCursorType,
  getEnumConstantDeclUnsignedValue,
  getEnumConstantDeclValue,
  getTypedefUnderlyingType,
  getTypeKind,
  getTypeSpelling,
  toCursor,
  visitChildren,
} from "@ggpwnkthx/libclang";

interface EnumValue {
  name: string;
  value: number;
}

interface EnumInfo {
  name: string;
  values: EnumValue[];
  underlyingType: string;
}

/**
 * Process an enum cursor to extract its values
 */
function processEnum(
  buffer: Uint8Array,
  enumName: string,
): EnumInfo | null {
  // Get enum underlying type
  const enumType = getCursorType(buffer);
  const enumTypeKind = getTypeKind(enumType);
  const enumTypeSpelling = getTypeSpelling(enumType);

  // Determine underlying type for value extraction
  let isUnsigned = false;
  if (
    enumTypeKind === CXTypeKind.ULongLong ||
    enumTypeKind === CXTypeKind.ULong ||
    enumTypeKind === CXTypeKind.UInt
  ) {
    isUnsigned = true;
  } else if (enumTypeSpelling.toLowerCase().includes("unsigned")) {
    isUnsigned = true;
  }

  // Get enum values
  const values: EnumValue[] = [];
  const enumChildren = visitChildren(buffer, () => {
    return CXChildVisitResult.Continue;
  });

  for (const enumChildBuffer of enumChildren) {
    if (
      getCursorKindFromBuffer(enumChildBuffer) !==
        CXCursorKind.EnumConstantDecl
    ) {
      continue;
    }

    const enumConstCursor = toCursor(enumChildBuffer);
    const constName = getCursorSpelling(enumConstCursor);
    if (!constName) continue;

    // Get actual enum value from libclang
    let enumValue: number;
    if (isUnsigned) {
      const unsignedValue = getEnumConstantDeclUnsignedValue(enumConstCursor);
      enumValue = Number(unsignedValue);
    } else {
      const signedValue = getEnumConstantDeclValue(enumConstCursor);
      enumValue = Number(signedValue);
    }
    values.push({ name: constName, value: enumValue });
  }

  if (values.length === 0) return null;

  return {
    name: enumName,
    values,
    underlyingType: isUnsigned ? "number" : "number",
  };
}

/**
 * Collect all enum declarations from the translation unit
 */
export function collectEnums(children: Uint8Array[]): Map<string, EnumInfo> {
  const enums = new Map<string, EnumInfo>();

  for (const buffer of children) {
    const cursorKind = getCursorKindFromBuffer(buffer);

    // Handle direct enum declarations
    if (cursorKind === CXCursorKind.EnumDecl) {
      const cursor = toCursor(buffer);
      const name = getCursorSpelling(cursor);
      if (!name) continue;

      const enumInfo = processEnum(buffer, name);
      if (enumInfo) {
        enums.set(name, enumInfo);
      }
      continue;
    }

    // Handle typedef enum declarations (typedef enum { ... } name)
    if (cursorKind === CXCursorKind.TypedefDecl) {
      const cursor = toCursor(buffer);
      const typedefName = getCursorSpelling(cursor);
      if (!typedefName) continue;

      // Get the underlying enum type
      const underlyingType = getTypedefUnderlyingType(buffer);
      const underlyingTypeKind = getTypeKind(underlyingType);

      // If it's an enum, get its children
      if (underlyingTypeKind === CXTypeKind.Enum) {
        const enumChildren = visitChildren(buffer, () => {
          return CXChildVisitResult.Recurse;
        });

        for (const childBuffer of enumChildren) {
          if (getCursorKindFromBuffer(childBuffer) === CXCursorKind.EnumDecl) {
            const enumInfo = processEnum(childBuffer, typedefName);
            if (enumInfo) {
              enums.set(typedefName, enumInfo);
            }
            break;
          }
        }
      }
    }
  }

  return enums;
}

/**
 * Generate TypeScript enum string
 */
export function generateEnumTS(enums: Map<string, EnumInfo>): string {
  const lines: string[] = [];

  // Add header comment
  lines.push("/**");
  lines.push(" * DuckDB enum types");
  lines.push(" */");

  // Enum types that are treated as typedefs instead
  const enumTypedefs = new Set(["duckdb_state", "duckdb_statement_type"]);

  for (const [name, enumInfo] of enums) {
    // Skip enum types that are treated as typedefs
    if (enumTypedefs.has(name)) {
      continue;
    }

    lines.push(`export enum ${name} {`);

    for (const value of enumInfo.values) {
      lines.push(`  ${value.name} = ${value.value},`);
    }

    lines.push("}");
    lines.push("");
  }

  return lines.join("\n");
}
