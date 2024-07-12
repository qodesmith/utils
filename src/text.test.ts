import {expect, test} from 'bun:test'
import {pluralize, secondsToDuration} from './text'

test('pluralize', () => {
  const results = [
    pluralize(3, 'apple'), // '3 apples'
    pluralize('0', 'apple'), // '0 apples'
    pluralize(1, 'apple'), // '1 apple'
    pluralize('1', 'apple'), // '1 apple'
  ]

  expect(results).toEqual(['3 apples', '0 apples', '1 apple', '1 apple'])
})

test('secondsToDuration', () => {
  expect(secondsToDuration(24)).toBe('0:24')
  expect(secondsToDuration(60)).toBe('1:00')
  expect(secondsToDuration(60 * 3)).toBe('3:00')
  expect(secondsToDuration(3600)).toBe('1:00:00')
  expect(secondsToDuration(24 * 60 * 60)).toBe('24:00:00')
  expect(secondsToDuration(24 * 60 * 60 + 1)).toBe('24:00:01')
  expect(secondsToDuration(24 * 60 * 60 * 2 + 1)).toBe('48:00:01')
})
