/**
 * Creates a debounced version of the provided function.
 *
 * This function returns a new function that, when invoked, will delay the
 * execution of the original function until after `wait` milliseconds have
 * elapsed since the last time it was invoked. This is useful for implementing
 * behavior that should only happen after a repeated action has completed.
 *
 * @param {T} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the input function.
 *
 * @example
 * // `searchFunction` will be called a max every 300ms.
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null | Timer

  return function (...args: Parameters<T>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
