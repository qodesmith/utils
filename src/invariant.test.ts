import {expect, test, describe} from 'bun:test'
import {invariant} from './invariant'

describe('invariant', () => {
  test('narrow the type when the condition is truthy', () => {
    const value: unknown = 'hello'
    invariant(typeof value === 'string', 'Value must be a string')

    // TypeScript should know `value` is a string here.
    expect(value.toUpperCase()).toBe('HELLO')
  })

  test('throw an error when the condition is falsy', () => {
    const value: unknown = 42
    expect(() =>
      invariant(typeof value === 'string', 'Value must be a string')
    ).toThrow('Value must be a string')
  })
})
