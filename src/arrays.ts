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

/**
 * Shuffles / randomizes an array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the original array to avoid modifying it directly
  const shuffledArray = [...array]

  // Iterate through the array from the last element to the second element
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements at indices i and j
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
