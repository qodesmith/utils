import {expect, test} from 'bun:test'
import {chunkArray, getRandomArrayItem, shuffleArray} from './arrays'

test('chunkArray', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const newArr = chunkArray(arr, 2)

  expect(newArr).toEqual([[1, 2], [3, 4], [5, 6], [7]])

  const float32Arr = new Float32Array([1, 2, 3, 4, 5, 6, 7])
  const chunked32Arr = chunkArray(float32Arr, 3)

  expect(chunked32Arr).toEqual([[1, 2, 3], [4, 5, 6], [7]])
})

test('shuffleArray', () => {
  const arr = Array.from({length: 10}, (_, i) => ({i}))
  const shuffledArr = shuffleArray(arr)

  const originalArrIsShuffled = arr.reduce<boolean>((acc, {i}, idx) => {
    if (i !== idx) return true
    return acc
  }, false)

  const isShuffled = shuffledArr.reduce<boolean>((acc, {i}, idx) => {
    if (i !== idx) return true
    return acc
  }, false)

  expect(originalArrIsShuffled).toBeFalse()
  expect(isShuffled).toBeTrue()
  expect(arr).not.toBe(shuffledArr)
})

test('getRandomArrayItem', () => {
  const array = [1, 2]
  let returned1 = false
  let returned2 = false

  // Run 10 times to ensure both values have ample chance to be chosen.
  for (let i = 0; i < 10; i++) {
    const num = getRandomArrayItem(array)

    if (num === 1) {
      returned1 = true
    }

    if (num === 2) {
      returned2 = true
    }
  }

  expect(returned1).toBeTrue()
  expect(returned2).toBeTrue()
})
