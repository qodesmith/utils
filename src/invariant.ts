/**
 * Asserts that a condition is truthy, throwing an error if it's not.
 *
 * @param {unknown} condition - The condition to check.
 * @param {string} message - The error message to throw if the condition is falsy.
 * @throws {Error} Throws an error with the provided message if the condition is falsy.
 */
export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
