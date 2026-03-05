/**
 * Handle buffer utilities for DuckDB FFI calls.
 *
 * DuckDB uses opaque pointer handles for databases, connections, results, etc.
 * These are represented as 8-byte Uint8Array buffers in this library.
 */

/** Handle buffer size in bytes (8 bytes for pointer on 64-bit) */
export const HANDLE_SIZE = 8;

/**
 * Create a new handle buffer for FFI calls.
 * @returns A new Uint8Array buffer of HANDLE_SIZE bytes
 */
export function createHandleBuffer(): Uint8Array {
  return new Uint8Array(new ArrayBuffer(HANDLE_SIZE));
}

/**
 * Convert a Uint8Array to BufferSource for Deno FFI calls.
 * This is needed because TypeScript doesn't understand that "buffer" type
 * in Deno FFI accepts Uint8Array.
 *
 * @param buf - The Uint8Array buffer to convert
 * @returns The same buffer as BufferSource
 */
export function toBufferSource(buf: Uint8Array): BufferSource {
  // Type assertion to tell TypeScript this is a valid BufferSource
  return buf as unknown as BufferSource;
}

/**
 * Validate a handle buffer has correct size.
 * @param buf - The buffer to validate
 * @param name - Name for error messages (default: "handle")
 * @throws TypeError if buffer is not a valid handle buffer
 */
export function assertHandleBuffer(buf: Uint8Array, name = "handle"): void {
  if (!(buf instanceof Uint8Array) || buf.byteLength !== HANDLE_SIZE) {
    throw new TypeError(
      `${name} must be a ${HANDLE_SIZE}-byte Uint8Array buffer`,
    );
  }
}

/**
 * Read a pointer value from a handle buffer (for debugging).
 * @param buf - The handle buffer to read from
 * @returns The pointer value as bigint
 */
export function readHandle(buf: Uint8Array): bigint {
  assertHandleBuffer(buf, "buffer");
  return new DataView(buf.buffer).getBigUint64(0, true);
}

/**
 * Write a pointer value to a handle buffer (rarely needed).
 * @param buf - The handle buffer to write to
 * @param ptr - The pointer value to write
 */
export function writeHandle(buf: Uint8Array, ptr: bigint): void {
  assertHandleBuffer(buf, "buffer");
  new DataView(buf.buffer).setBigUint64(0, ptr, true);
}
