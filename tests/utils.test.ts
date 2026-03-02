/**
 * Tests for DuckDB utility functions
 */

import { assertEquals, assertExists } from "@std/assert";
import * as download from "../src/download.ts";
import * as library from "../src/mod.ts";

Deno.test({
  name: "utils - download: getDuckDBVersion",
  async fn() {
    const version = await download.getDuckDBVersion();
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
  name: "utils - library: load",
  async fn() {
    // Test that load returns a library object
    const lib = await library.load();
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
    const lib = await library.load();
    const version = library.getVersion(lib);
    assertExists(version);
    // Version should be non-empty string
    assertEquals(version.length > 0, true);
    lib.close();
  },
});
