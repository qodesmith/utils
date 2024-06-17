import {expect, test} from 'bun:test'
import {pluralize} from './text'

test('pluralize', () => {
  const results = [
    pluralize(3, 'apple'), // '3 apples'
    pluralize('0', 'apple'), // '0 apples'
    pluralize(1, 'apple'), // '1 apple'
    pluralize('1', 'apple'), // '1 apple'
  ]

  expect(results).toEqual(['3 apples', '0 apples', '1 apple', '1 apple'])
})
