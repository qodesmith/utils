import {expect, test} from 'bun:test'
import {pluralize, secondsToDuration, slugify} from './text'

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

test('slugify', () => {
  expect(slugify('  Hello World  ')).toBe('Hello-World')
  expect(slugify('Hello@#World!')).toBe('HelloWorld')
  expect(slugify('Hello     World')).toBe('Hello-World')
  expect(slugify('Hello$%^&*()World')).toBe('HelloWorld')
  expect(slugify('Hello---World')).toBe('Hello-World')
  expect(slugify('a-zA-Z0-9-_.~')).toBe('a-zA-Z0-9-_.~')
  expect(slugify('')).toBe('')
  expect(slugify('     ')).toBe('')
  expect(slugify('@#$%^&*()')).toBe('')
  expect(slugify('  Hello  @#$ World!! ~JavaScript~ ')).toBe(
    'Hello-World-~JavaScript~'
  )
  expect(slugify('🌟🌟🌟')).toBe('')
  expect(slugify('🚀 Launch the 🚀 rocket!')).toBe('Launch-the-rocket')
})
