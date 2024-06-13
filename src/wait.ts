/**
 * An async function that waits for a set period of milliseconds.
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
