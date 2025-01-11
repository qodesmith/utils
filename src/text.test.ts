import {expect, test} from 'bun:test'
import {pluralize, slugify} from './text'

test('pluralize', () => {
  const results = [
    pluralize(3, 'apple'), // '3 apples'
    pluralize('0', 'apple'), // '0 apples'
    pluralize(1, 'apple'), // '1 apple'
    pluralize('1', 'apple'), // '1 apple'
  ]

  expect(results).toEqual(['3 apples', '0 apples', '1 apple', '1 apple'])
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
