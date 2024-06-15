import {expect, test} from 'bun:test'
import {chunkArray} from './arrays'

test('chunkArray', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const newArr = chunkArray(arr, 2)

  expect(newArr).toEqual([[1, 2], [3, 4], [5, 6], [7]])
})
