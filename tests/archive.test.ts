/**
 * Tests for /archive.ts (ZIP and gzip extraction)
 */

import { assert, assertEquals, assertRejects } from "@std/assert";
import { extractGz, extractZip } from "../archive.ts";

// ---------- shared helpers ----------

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ data[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concat(...arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
}

function asArrayBuffer(data: Uint8Array): ArrayBuffer {
  return data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength,
  ) as ArrayBuffer;
}

/** Produce raw deflate bytes by stripping the 2-byte header and 4-byte
 *  adler32 trailer from the zlib output of CompressionStream("deflate"). */
async function deflateRaw(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([asArrayBuffer(data)]).stream().pipeThrough(
    new CompressionStream("deflate"),
  );
  const zlib = new Uint8Array(await new Response(stream).arrayBuffer());
  // zlib wrapping: 2-byte header + raw deflate stream + 4-byte adler32 trailer
  return zlib.slice(2, -4);
}

const PAYLOAD = new TextEncoder().encode(
  "hello duckdb\nthis is a test payload\n",
);

/** Hand-built gzip: magic(2) + CM(1) + FLG(1) + MTIME(4) + XFL(1) + OS(1)
 *  + optional null-terminated FNAME + raw-deflate payload + 8-byte trailer
 *  (CRC32 little-endian + ISIZE little-endian). */
async function buildGzip(
  payload: Uint8Array,
  filename: string | null,
): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const nameBytes = filename ? encoder.encode(filename) : null;
  const headerSize = 10 + (nameBytes ? nameBytes.length + 1 : 0);

  const header = new Uint8Array(headerSize);
  header[0] = 0x1f;
  header[1] = 0x8b;
  header[2] = 0x08; // CM = deflate
  header[3] = filename !== null ? 0x08 : 0x00; // FLG (FNAME bit)
  // bytes 4-7 MTIME = 0, byte 8 XFL = 0
  header[9] = 0xff; // OS = unknown
  if (nameBytes) {
    header.set(nameBytes, 10);
  }

  const compressed = await deflateRaw(payload);

  const crc = crc32(payload);
  const isize = payload.length >>> 0;
  const trailer = new Uint8Array(8);
  trailer[0] = (crc >>> 24) & 0xff;
  trailer[1] = (crc >>> 16) & 0xff;
  trailer[2] = (crc >>> 8) & 0xff;
  trailer[3] = crc & 0xff;
  trailer[4] = (isize >>> 24) & 0xff;
  trailer[5] = (isize >>> 16) & 0xff;
  trailer[6] = (isize >>> 8) & 0xff;
  trailer[7] = isize & 0xff;

  return concat(header, compressed, trailer);
}

/** Hand-built minimal ZIP containing one deflated file entry.
 *  Layout: [Local File Header] [file data] [Central Directory Entry] [EOCD] */
async function buildZip(
  filename: string,
  payload: Uint8Array,
): Promise<Uint8Array> {
  const nameBytes = new TextEncoder().encode(filename);
  const compressed = await deflateRaw(payload);
  const crc = crc32(payload);

  // -- Local File Header (30 bytes + name)
  const lh = new Uint8Array(30 + nameBytes.length);
  const lv = new DataView(lh.buffer);
  lv.setUint32(0, 0x04034b50, true); // signature
  lv.setUint16(4, 20, true); // version needed (2.0 = deflate)
  lv.setUint16(6, 0, true); // general purpose bit flag
  lv.setUint16(8, 8, true); // compression method = deflate
  lv.setUint16(10, 0, true); // last mod time
  lv.setUint16(12, 0, true); // last mod date
  lv.setUint32(14, crc, true); // CRC32
  lv.setUint32(18, compressed.length, true); // compressed size
  lv.setUint32(22, payload.length, true); // uncompressed size
  lv.setUint16(26, nameBytes.length, true); // file name length
  lv.setUint16(28, 0, true); // extra field length
  lh.set(nameBytes, 30);

  const localHeaderOffset = 0;
  const fileDataOffset = lh.length;

  // -- Central Directory Entry (46 bytes + name)
  const cd = new Uint8Array(46 + nameBytes.length);
  const cv = new DataView(cd.buffer);
  cv.setUint32(0, 0x02014b50, true); // signature
  cv.setUint16(4, 20, true); // version made by
  cv.setUint16(6, 20, true); // version needed
  cv.setUint16(8, 0, true); // flags
  cv.setUint16(10, 8, true); // method
  cv.setUint16(12, 0, true); // mod time
  cv.setUint16(14, 0, true); // mod date
  cv.setUint32(16, crc, true);
  cv.setUint32(20, compressed.length, true);
  cv.setUint32(24, payload.length, true);
  cv.setUint16(28, nameBytes.length, true);
  cv.setUint16(30, 0, true); // extra
  cv.setUint16(32, 0, true); // comment
  cv.setUint16(34, 0, true); // disk number start
  cv.setUint16(36, 0, true); // internal attrs
  cv.setUint32(38, 0, true); // external attrs
  cv.setUint32(42, localHeaderOffset, true);
  cd.set(nameBytes, 46);

  const cdOffset = fileDataOffset + compressed.length;

  // -- EOCD (22 bytes)
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true); // disk number
  ev.setUint16(6, 0, true); // disk with CD start
  ev.setUint16(8, 1, true); // entries on this disk
  ev.setUint16(10, 1, true); // total entries
  ev.setUint32(12, cd.length, true); // CD size
  ev.setUint32(16, cdOffset, true); // CD offset
  ev.setUint16(20, 0, true); // comment length

  return concat(lh, compressed, cd, eocd);
}

async function withTempDir<T>(fn: (dir: string) => Promise<T>): Promise<T> {
  const dir = await Deno.makeTempDir({ prefix: "libduckdb-archive-" });
  try {
    return await fn(dir);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

// ---------- gzip tests ----------

Deno.test({
  name: "archive - extractGz: default filename when FNAME flag absent",
  async fn() {
    await withTempDir(async (dir) => {
      const gzPath = `${dir}/payload.gz`;
      const outDir = `${dir}/out`;
      const bytes = await buildGzip(PAYLOAD, null);
      await Deno.writeFile(gzPath, bytes);

      const outPath = await extractGz(gzPath, outDir);

      assertEquals(outPath, `${outDir}/duckdb`);
      const extracted = await Deno.readFile(outPath);
      assertEquals(extracted, PAYLOAD);

      // extractGz sets 0o755 on the output
      const stat = await Deno.stat(outPath);
      if (Deno.build.os !== "windows") {
        assertEquals(stat.mode! & 0o777, 0o755);
      }
    });
  },
});

Deno.test({
  name: "archive - extractGz: filename from FNAME flag",
  async fn() {
    await withTempDir(async (dir) => {
      const gzPath = `${dir}/payload.gz`;
      const outDir = `${dir}/out`;
      const bytes = await buildGzip(PAYLOAD, "libduckdb.so.1.5");
      await Deno.writeFile(gzPath, bytes);

      const outPath = await extractGz(gzPath, outDir);

      // FNAME may include a path prefix; extractGz splits and takes the basename
      assertEquals(outPath, `${outDir}/libduckdb.so.1.5`);
      const extracted = await Deno.readFile(outPath);
      assertEquals(extracted, PAYLOAD);
    });
  },
});

Deno.test({
  name: "archive - extractGz: rejects invalid gzip magic",
  async fn() {
    await withTempDir(async (dir) => {
      const gzPath = `${dir}/not-really.gz`;
      const outDir = `${dir}/out`;
      await Deno.writeFile(gzPath, new Uint8Array([0x00, 0x01, 0x02, 0x03]));

      await assertRejects(
        () => extractGz(gzPath, outDir),
        Error,
        "Invalid gzip file",
      );
    });
  },
});

// ---------- zip tests ----------

Deno.test({
  name: "archive - extractZip: single deflated entry round-trip",
  async fn() {
    await withTempDir(async (dir) => {
      const zipPath = `${dir}/libduckdb.zip`;
      const outDir = `${dir}/libduckdb-out`;
      const bytes = await buildZip("hello.txt", PAYLOAD);
      await Deno.writeFile(zipPath, bytes);

      const result = await extractZip(zipPath, outDir);
      assertEquals(result, outDir);

      const outPath = `${outDir}/hello.txt`;
      const stat = await Deno.stat(outPath);
      assert(stat.isFile, "expected hello.txt to be a regular file");
      const extracted = await Deno.readFile(outPath);
      assertEquals(extracted, PAYLOAD);
    });
  },
});

Deno.test({
  name: "archive - extractZip: rejects missing local file header signature",
  async fn() {
    await withTempDir(async (dir) => {
      const zipPath = `${dir}/broken.zip`;
      const outDir = `${dir}/out`;
      // First 4 bytes are NOT 0x04034b50
      await Deno.writeFile(zipPath, new Uint8Array([0, 0, 0, 0, 0, 0]));

      await assertRejects(
        () => extractZip(zipPath, outDir),
        Error,
        "missing local file header",
      );
    });
  },
});
