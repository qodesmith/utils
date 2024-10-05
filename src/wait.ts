/**
 * Waits for a specified number of milliseconds before resolving.
 *
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 *
 * @example
 * // Wait for 2 seconds
 * await wait(2000);
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
