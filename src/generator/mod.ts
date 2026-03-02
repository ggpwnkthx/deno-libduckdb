import {
  createIndex,
  CXChildVisitResult,
  disposeIndex,
  disposeTranslationUnit,
  getTranslationUnitCursor,
  load,
  parseTranslationUnit,
  unload,
  visitChildren,
} from "@ggpwnkthx/libclang";
import { collectEnums, generateEnumTS } from "./enums.ts";
import { collectTypedefs, generateTypedefsTS } from "./typedefs.ts";
import { collectStructs, generateStructsTS } from "./structs.ts";
import { collectFunctions, generateSymbolsTS } from "./symbols.ts";

/**
 * Ensure the output directory exists
 */
async function ensureOutputDir(path: string): Promise<void> {
  try {
    await Deno.mkdir(path, { recursive: true });
  } catch (e) {
    if (!(e instanceof Deno.errors.AlreadyExists)) {
      throw e;
    }
  }
}

/**
 * Generate FFI bindings from DuckDB C header file.
 * Parses duckdb.h and generates TypeScript bindings in src/ffi/
 */
export async function generate() {
  console.log("Loading libclang...");
  load();

  const headerPath = `${Deno.cwd()}/libduckdb/duckdb.h`;
  console.log(`Parsing ${headerPath}...`);

  const index = createIndex();
  const result = parseTranslationUnit(index, headerPath);

  if (!result.translationUnit) {
    console.error("Failed to parse translation unit");
    disposeIndex(index);
    unload();
    Deno.exit(1);
  }

  const tuCursor = getTranslationUnitCursor(result.translationUnit);
  console.log("Traversing AST to find enums...");

  // Get top-level children
  const children = visitChildren(tuCursor, () => {
    return CXChildVisitResult.Continue;
  });

  const typedefs = collectTypedefs(children);
  console.log(`Found ${typedefs.size} typedefs`);

  const enums = collectEnums(children);
  console.log(`Found ${enums.size} enums`);

  const structs = collectStructs(children);
  console.log(`Found ${structs.size} structs`);

  const functions = collectFunctions(children);
  console.log(`Found ${functions.length} functions`);

  // Create output directory
  const outputDir = `${Deno.cwd()}/src/ffi`;
  await ensureOutputDir(outputDir);

  // Generate typedefs
  const typedefsContent = generateTypedefsTS(typedefs);
  const typedefsPath = `${outputDir}/typedefs.ts`;
  await Deno.writeTextFile(typedefsPath, typedefsContent);
  console.log(`Written to ${typedefsPath}`);

  // Generate enums
  const enumsContent = generateEnumTS(enums);
  const enumsPath = `${outputDir}/enums.ts`;
  await Deno.writeTextFile(enumsPath, enumsContent);
  console.log(`Written to ${enumsPath}`);

  // Generate structs
  const structsContent = generateStructsTS(structs, new Set(typedefs.keys()));
  const structsPath = `${outputDir}/structs.ts`;
  await Deno.writeTextFile(structsPath, structsContent);
  console.log(`Written to ${structsPath}`);

  // Generate symbols
  // Add special enum types that should be treated as typedefs
  const typedefsForSymbols = new Set(typedefs.keys());
  typedefsForSymbols.add("duckdb_state");
  typedefsForSymbols.add("duckdb_statement_type");

  const symbolsContent = generateSymbolsTS(
    functions,
    typedefsForSymbols,
    new Set(enums.keys()),
    new Set(structs.keys()),
  );
  const symbolsPath = `${outputDir}/symbols.ts`;
  await Deno.writeTextFile(symbolsPath, symbolsContent);
  console.log(`Written to ${symbolsPath}`);

  // Cleanup
  disposeTranslationUnit(result.translationUnit);
  disposeIndex(index);
  unload();

  console.log("Done!");
}
