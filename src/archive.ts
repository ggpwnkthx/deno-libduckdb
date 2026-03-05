/**
 * Pure Deno archive extraction utilities.
 *
 * Provides ZIP and gzip extraction without external commands.
 */

import { inflate } from "pako";

/**
 * Extract ZIP archive using pure Deno APIs.
 *
 * @param zipPath - Path to the ZIP file
 * @param outputDir - Directory to extract to
 * @returns The output directory path
 */
export async function extractZip(
  zipPath: string,
  outputDir: string,
): Promise<string> {
  // Create output directory if it doesn't exist
  await Deno.mkdir(outputDir, { recursive: true });

  // Read the ZIP file
  const zipData = await Deno.readFile(zipPath);

  // Parse ZIP file manually
  // ZIP file format: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
  const view = new DataView(
    zipData.buffer,
    zipData.byteOffset,
    zipData.byteLength,
  );

  // Check ZIP signature (0x04034b50)
  if (view.getUint32(0, true) !== 0x04034b50) {
    throw new Error("Invalid ZIP file: missing local file header signature");
  }

  // Find the End of Central Directory (EOCD) signature (0x06054b50)
  let eocdOffset = -1;
  for (let i = zipData.length - 22; i >= 0; i--) {
    if (
      view.getUint32(i, true) === 0x06054b50 ||
      (zipData[i] === 0x50 && zipData[i + 1] === 0x4b &&
        zipData[i + 2] === 0x05 && zipData[i + 3] === 0x06)
    ) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error("Invalid ZIP file: cannot find EOCD");
  }

  // Read EOCD
  const numEntries = view.getUint16(eocdOffset + 10, true);
  const centralDirOffset = view.getUint32(eocdOffset + 16, true);

  // Extract each file from the central directory
  let offset = centralDirOffset;

  for (let i = 0; i < numEntries; i++) {
    // Check central directory signature (0x02014b50)
    if (view.getUint32(offset, true) !== 0x02014b50) {
      break;
    }

    const compressionMethod = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const _uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localHeaderOffset = view.getUint32(offset + 42, true);

    // Get filename
    const nameBytes = new Uint8Array(
      zipData.buffer,
      zipData.byteOffset + offset + 46,
      nameLength,
    );
    const filename = new TextDecoder().decode(nameBytes);

    offset += 46 + nameLength + extraLength + commentLength;

    // Skip directories
    if (filename.endsWith("/")) {
      await Deno.mkdir(`${outputDir}/${filename}`, { recursive: true });
      continue;
    }

    // Read local file header
    const localHeaderView = new DataView(
      zipData.buffer,
      zipData.byteOffset + localHeaderOffset,
      30,
    );
    const localNameLength = localHeaderView.getUint16(26, true);
    const localExtraLength = localHeaderView.getUint16(28, true);
    const dataOffset = localHeaderOffset + 30 + localNameLength +
      localExtraLength;

    // Read file data
    const fileData = new Uint8Array(
      zipData.buffer,
      zipData.byteOffset + dataOffset,
      compressedSize,
    );

    // Decompress if needed (0 = stored, 8 = deflate)
    let outputData: Uint8Array;
    if (compressionMethod === 0) {
      // Stored (no compression)
      outputData = fileData;
    } else if (compressionMethod === 8) {
      // Deflate - use pako (supports raw deflate)
      outputData = inflate(fileData, { raw: true });
    } else {
      throw new Error(`Unsupported compression method: ${compressionMethod}`);
    }

    // Write file
    const outPath = `${outputDir}/${filename}`;
    await Deno.mkdir(outPath.replace(/\/[^/]+$/, ""), { recursive: true });
    await Deno.writeFile(outPath, outputData);
  }

  return outputDir;
}

/**
 * Extract gzip file using streaming decompression.
 *
 * @param gzPath - Path to the gzip file
 * @param outputDir - Directory to extract to
 * @returns The path to the extracted file
 */
export async function extractGz(
  gzPath: string,
  outputDir: string,
): Promise<string> {
  // Create output directory if it doesn't exist
  await Deno.mkdir(outputDir, { recursive: true });

  // Read the gzip file
  const gzData = await Deno.readFile(gzPath);

  // Check gzip magic number (0x1f 0x8b)
  if (gzData[0] !== 0x1f || gzData[1] !== 0x8b) {
    throw new Error("Invalid gzip file: missing magic number");
  }

  // Check compression method (should be 8 = deflate)
  if (gzData[2] !== 8) {
    throw new Error(`Unsupported gzip compression method: ${gzData[2]}`);
  }

  // Get FLG (flags)
  const flg = gzData[3];

  // Skip header: magic(2) + method(1) + flags(1) + mtime(4) + xfl(1) + os(1) = 10 bytes
  // Plus extra length if FEXTRA flag is set
  let headerSize = 10;
  if (flg & 0x04) { // FEXTRA
    headerSize += 2 + gzData[9] + (gzData[10] << 8);
  }
  if (flg & 0x08) { // FNAME
    while (gzData[headerSize] !== 0) headerSize++;
    headerSize++;
  }
  if (flg & 0x10) { // FCOMMENT
    while (gzData[headerSize] !== 0) headerSize++;
    headerSize++;
  }
  if (flg & 0x02) { // FHCRC
    headerSize += 2;
  }

  // Get compressed data (skip header and 8-byte trailer)
  const compressedData = gzData.slice(headerSize, -8);

  // Decompress using pako
  const decompressedData = inflate(compressedData);

  // Determine output filename
  // Try to get original filename from gzip header
  let outFilename = "duckdb";
  if (flg & 0x08) { // FNAME
    const nameBytes: number[] = [];
    for (let i = 10; gzData[i] !== 0; i++) {
      nameBytes.push(gzData[i]);
    }
    outFilename = new TextDecoder().decode(new Uint8Array(nameBytes));
    // Remove path prefix if present
    outFilename = outFilename.split("/").pop() ?? "duckdb";
  }

  const outPath = `${outputDir}/${outFilename}`;
  await Deno.writeFile(outPath, decompressedData);
  await Deno.chmod(outPath, 0o755);

  return outPath;
}
