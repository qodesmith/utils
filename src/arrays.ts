import {getRandomNumber} from './numbers'

/**
 * Chunks an array into smaller arrays of a specified size.
 * Works with regular arrays and TypedArrays.
 *
 * @param {ArrayLike<T>} arr - The array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} An array of chunked arrays.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6];
 * const newArr = chunkArray(arr, 2); // [[1, 2], [3, 4], [5, 6]]
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
 * Shuffles the elements of an array randomly.
 *
 * @param {T[] | readonly T[]} array - The array to be shuffled.
 * @returns {T[]} A new array with the same elements in a random order.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const shuffledArr = shuffleArray(arr); // [3, 1, 5, 2, 4] (random order)
 */
export function shuffleArray<T>(array: T[] | readonly T[]): T[] {
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

/**
 * Returns a random item from the given array.
 *
 * @param {T[] | readonly T[]} array - The array from which to select a random item.
 * @returns {T} A random item from the array.
 */
export function getRandomArrayItem<T>(array: T[] | readonly T[]): T {
  const randomIndex = getRandomNumber(0, array.length - 1)
  return array[randomIndex]
}
