import {describe, expect, test} from 'bun:test'

import {getRandomNumber} from './numbers'
import {getRandomPronounceableWord, pluralize, slugify} from './text'

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
