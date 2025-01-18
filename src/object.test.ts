import {expect, test} from 'bun:test'
import {isPlainObject} from './objects'

test('isPlainObject', () => {
  expect(isPlainObject({})).toBeTrue()
  expect(isPlainObject({a: 1})).toBeTrue()
  expect(isPlainObject({a: [1]})).toBeTrue()
  expect(isPlainObject([])).toBeFalse()
  expect(isPlainObject(new Set([]))).toBeFalse()
  expect(isPlainObject(1)).toBeFalse()
  expect(isPlainObject('Hello world')).toBeFalse()
  expect(isPlainObject(true)).toBeFalse()
  expect(isPlainObject(BigInt(1))).toBeFalse()
  expect(isPlainObject(1n)).toBeFalse()
  expect(isPlainObject(JSON.stringify({}))).toBeFalse()
})
