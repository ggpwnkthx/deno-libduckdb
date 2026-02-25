/**
 * Tests for DuckDB utility functions
 */

import { assertEquals, assertExists } from "@std/assert";
import * as download from "../src/download.ts";
import * as library from "../src/library.ts";

Deno.test({
  name: "utils - download: getVersion",
  async fn() {
    const version = await download.getVersion();
    assertExists(version);
    // Version should be in format like "1.4.4"
    assertEquals(version.match(/^\d+\.\d+\.\d+$/) !== null, true);
  },
});

Deno.test({
  name: "utils - download: getPlatform",
  fn() {
    const platform = download.getPlatform();
    assertExists(platform);
    // Should return one of: linux, osx, windows
    const validPlatforms = ["linux", "osx", "windows"];
    assertEquals(validPlatforms.includes(platform), true);
  },
});

Deno.test({
  name: "utils - download: getArch",
  fn() {
    const arch = download.getArch();
    assertExists(arch);
    // Should return one of: amd64, arm64
    const validArchs = ["amd64", "arm64"];
    assertEquals(validArchs.includes(arch), true);
  },
});

Deno.test({
  name: "utils - library: loadDuckDB",
  async fn() {
    // Test that loadDuckDB returns a library object
    const lib = await library.loadDuckDB();
    assertExists(lib);
    assertExists(lib.symbols);
    assertExists(lib.symbols.duckdb_library_version);
    assertExists(lib.symbols.duckdb_open);
    assertExists(lib.symbols.duckdb_close);
    lib.close();
  },
});

Deno.test({
  name: "utils - library: getVersion",
  async fn() {
    const lib = await library.loadDuckDB();
    const version = library.getVersion(lib);
    assertExists(version);
    // Version should be non-empty string
    assertEquals(version.length > 0, true);
    lib.close();
  },
});
