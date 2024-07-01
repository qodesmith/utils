/**
 * Chunks an array. TypedArray's (i.e. `Float32Array`, `Uint16Array`, etc.) will
 * be chunked into regular arrays. Each chunk will contain the numeric values
 * from the original typed array as standard numbers rather than in the typed
 * array format.
 *
 * ```
 * const arr = [1, 2, 3, 4, 5, 6]
 * const newArr = chunkArray(arr, 2) // [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function chunkArray<T>(arr: ArrayLike<T>, size: number): T[][] {
  const length = arr.length
  const finalResults: T[][] = []
  let tempArray: T[] = []

  for (let i = 0; i < length; i++) {
    tempArray.push(arr[i])

    if (tempArray.length === size) {
      finalResults.push(tempArray)
      tempArray = []
    } else if (i === length - 1) {
      finalResults.push(tempArray)
    }
  }

  return finalResults
}
