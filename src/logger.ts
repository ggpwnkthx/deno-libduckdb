/**
 * Simple logger utility that writes to stderr
 */

const encoder = new TextEncoder();

/**
 * Write a message to stderr
 */
function write(msg: string): void {
  Deno.stderr.writeSync(encoder.encode(msg + "\n"));
}

/**
 * Log an informational message
 */
export function info(msg: string): void {
  write(`[INFO] ${msg}`);
}

/**
 * Log a warning message
 */
export function warn(msg: string): void {
  write(`[WARN] ${msg}`);
}

/**
 * Log an error message
 */
export function error(msg: string): void {
  write(`[ERROR] ${msg}`);
}
