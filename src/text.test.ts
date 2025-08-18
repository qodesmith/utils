import {describe, expect, test} from 'bun:test'

import {getRandomNumber} from './numbers'
import {
  getRandomPronounceableWord,
  getTrueStringLength,
  makeTableString,
  pluralize,
  slugify,
} from './text'

describe('pluralize', () => {
  test('parses a number', () => {
    expect(pluralize(3, 'apple')).toBe('3 apples')
    expect(pluralize(1, 'apple')).toBe('1 apple')
  })

  test('parses a string', () => {
    expect(pluralize('3', 'apple')).toBe('3 apples')
    expect(pluralize('1', 'apple')).toBe('1 apple')
  })

  test('excludes the number', () => {
    expect(pluralize(3, 'apple', false)).toBe('apples')
    expect(pluralize('1', 'apple', false)).toBe('apple')
  })
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

describe('getRandomPronounceableWord', () => {
  const consonants = 'bcdfghjklmnpqrstvwxyz'
  const vowels = 'aeiou'

  test('should return 5 characters when no input given, starting & ending with a consonant', () => {
    expect(getRandomPronounceableWord()).toHaveLength(5)
    expect(consonants).toInclude(getRandomPronounceableWord()[0])
    expect(consonants).toInclude(getRandomPronounceableWord().at(-1) as string)
  })

  test('should alternate between consonants & vowels, starting with consonants', () => {
    for (let i = 0; i < 100; i++) {
      const randomLength = getRandomNumber(2, 20)
      const randomWord = getRandomPronounceableWord(randomLength)

      for (let j = 0; j < randomLength; j += 2) {
        const vowel = randomWord[j + 1]

        expect(consonants).toInclude(randomWord[j])

        // Odd-length words will have no trailing vowel.
        if (vowel !== undefined) {
          expect(vowels).toInclude(vowel)
        }
      }
    }
  })
})

describe('getTrueStringLength', () => {
  test('returns correct length for regular strings', () => {
    expect(getTrueStringLength('hello')).toBe(5)
    expect(getTrueStringLength('')).toBe(0)
  })

  test('ignores ANSI escape sequences', () => {
    expect(getTrueStringLength('\u001b[31mred text\u001b[0m')).toBe(8)
    expect(getTrueStringLength('\u001b[1mBold\u001b[0m text')).toBe(9)
    expect(getTrueStringLength('\u001b[32;1mGreen bold\u001b[0m')).toBe(10)
  })

  test('handles multiple ANSI sequences', () => {
    expect(
      getTrueStringLength('\u001b[31m\u001b[1mred bold\u001b[0m\u001b[0m')
    ).toBe(8)
  })
})

describe('makeTableString', () => {
  test('creates a basic table', () => {
    const rows = [
      ['Name', 'Age'],
      ['John Doe', '30'],
      ['Jane Doe', '25'],
    ]
    const result = makeTableString({rows})
    const lines = result.split('\n')

    expect(lines).toHaveLength(7)
    expect(lines[0]).toBe('┌──────────┬─────┐')
    expect(lines[1]).toBe('│ Name     │ Age │')
    expect(lines[2]).toBe('├──────────┼─────┤')
    expect(lines[3]).toBe('│ John Doe │ 30  │')
    expect(lines[4]).toBe('├──────────┼─────┤')
    expect(lines[5]).toBe('│ Jane Doe │ 25  │')
    expect(lines[6]).toBe('└──────────┴─────┘')
  })

  test('creates a thick table', () => {
    const rows = [
      ['A', 'B'],
      [1, 2],
    ]
    const result = makeTableString({rows, thick: true})
    const lines = result.split('\n')

    expect(lines).toHaveLength(5)
    expect(lines[0]).toBe('┏━━━┳━━━┓')
    expect(lines[1]).toBe('┃ A ┃ B ┃')
    expect(lines[2]).toBe('┣━━━╋━━━┫')
    expect(lines[3]).toBe('┃ 1 ┃ 2 ┃')
    expect(lines[4]).toBe('┗━━━┻━━━┛')
  })

  test('creates a rounded table', () => {
    const rows = [
      ['A', 'B'],
      [1, 2],
    ]
    const result = makeTableString({rows, rounded: true})
    const lines = result.split('\n')

    expect(lines).toHaveLength(5)
    expect(lines[0]).toBe('╭───┬───╮')
    expect(lines[1]).toBe('│ A │ B │')
    expect(lines[2]).toBe('├───┼───┤')
    expect(lines[3]).toBe('│ 1 │ 2 │')
    expect(lines[4]).toBe('╰───┴───╯')
  })

  test('respects custom padding', () => {
    const rows = [['A']]
    const result = makeTableString({rows, padding: 2})

    expect(result).toContain('│  A  │')
  })

  test('handles different column widths', () => {
    const rows = [
      ['Short', 'Very Long Header'],
      ['X', 'Y'],
    ]
    const result = makeTableString({rows})

    expect(result).toContain('Very Long Header')
    expect(result).toContain('Short')
  })

  test('handles numbers in cells', () => {
    const rows = [
      [1, 2.5],
      [100, 0],
    ]
    const result = makeTableString({rows})

    expect(result).toContain('│ 1   │ 2.5 │')
    expect(result).toContain('│ 100 │ 0   │')
  })

  test('throws an error for mismatched row lengths', () => {
    const rows = [['A', 'B'], ['C']]

    expect(() => makeTableString({rows})).toThrow(
      'All table rows must have the same length'
    )
  })

  test('handles ANSI sequences in cell content', () => {
    const rows = [['\u001b[31mRed\u001b[0m', 'Normal']]
    const result = makeTableString({rows})

    expect(result).toContain('\u001b[31mRed\u001b[0m')
  })
})
