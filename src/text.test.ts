import {describe, expect, test} from 'bun:test'
import {pluralize, getRandomPronounceableWord, slugify} from './text'
import {getRandomNumber} from './numbers'

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

describe('getRandomPronounceableWord', () => {
  const consonants = 'bcdfghjklmnpqrstvwxyz'
  const vowels = 'aeiou'

  test('should return 5 characters when no input given, starting & ending with a consonant', () => {
    expect(getRandomPronounceableWord()).toHaveLength(5)
    expect(consonants).toInclude(getRandomPronounceableWord()[0])
    expect(consonants).toInclude(getRandomPronounceableWord().at(-1)!)
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
