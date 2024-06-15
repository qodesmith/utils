/**
 * Chunks an array.
 *
 * ```
 * const arr = [1, 2, 3, 4, 5, 6]
 * const newArr = chunkArray(arr, 2) // [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}
