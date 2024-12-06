import {expect, test, describe} from 'bun:test'
import {safeJsonParse} from './json'

describe('json', () => {
  test('safely parse json without throwing an error', () => {
    expect(() => safeJsonParse('[]')).not.toThrow()
    expect(safeJsonParse('')).toBeUndefined()
    expect(safeJsonParse('', [])).toEqual([])
    expect(safeJsonParse<{a: number}[]>('[{"a": 1}]')).toEqual([{a: 1}])
    expect(safeJsonParse('nope', {})).toEqual({})
  })
})
