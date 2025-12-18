import {describe, expect, test} from 'bun:test'

import {errorToObject} from './errors'

describe('errorToObject', () => {
  const expectedProperties = [
    'column',
    'line',
    'originalColumn',
    'originalLine',
    'sourceURL',
    'stack',
  ]

  test('no options', () => {
    const plainError = new Error('Nope!')
    const plainErrorObj = errorToObject(plainError)
    expect(plainErrorObj).toHaveProperty('message', 'Nope!')
    expectedProperties.forEach(prop => {
      expect(plainErrorObj).toHaveProperty(prop)
    })

    const errorWithCauseText = new Error('Fail!', {cause: 'text'})
    const errorWithCauseTextObj = errorToObject(errorWithCauseText)
    expect(errorWithCauseTextObj).toHaveProperty('message', 'Fail!')
    expect(errorWithCauseTextObj).toHaveProperty('cause', 'text')
    expectedProperties.forEach(prop => {
      expect(errorWithCauseTextObj).toHaveProperty(prop)
    })

    const errorWithCauseError = new Error('Boom!', {cause: new Error('Cause!')})
    const errorWithCauseErrorObj = errorToObject(errorWithCauseError)
    // expect(errorWithCauseErrorObj).toEqual({})
    expect(errorWithCauseErrorObj).toHaveProperty('message', 'Boom!')
    expect(errorWithCauseErrorObj).toHaveProperty(
      ['cause', 'message'],
      'Cause!'
    )
    expectedProperties.forEach(prop => {
      expect(errorWithCauseErrorObj).toHaveProperty(prop)
    })
    expectedProperties.forEach(prop => {
      expect(errorWithCauseErrorObj.cause).toHaveProperty(prop)
    })
  })

  test('prettyStack', () => {
    const expectedPropertiesPrettyStack = expectedProperties
      .filter(property => property !== 'stack')
      .concat(['stack_0', 'stack_1'])
    const plainError = new Error('Nope!')
    const plainErrorObj = errorToObject(plainError, {prettyStack: true})

    expectedPropertiesPrettyStack.forEach(prop => {
      expect(plainErrorObj).toHaveProperty(prop)
    })
    expect(plainErrorObj.stack_0).toBe('Error: Nope!')
    expect(plainErrorObj.stack_1).toBeString()
  })

  test('deep nesting', () => {
    const regularObject = {a: 1, b: 2}
    const processedRegularObject = errorToObject(regularObject)
    expect(processedRegularObject).toEqual(regularObject)

    const deepObject = {obj: {deeply: {nested: true}}}
    const processedDeepObject = errorToObject(deepObject)
    expect(processedDeepObject).toEqual(deepObject)

    const objWithDeepError = {obj: {with: {deep: new Error('Deep!')}}}
    const processedDeepError = errorToObject(objWithDeepError)
    expectedProperties.forEach(prop => {
      expect(processedDeepError).toHaveProperty(['obj', 'with', 'deep', prop])
    })
    // @ts-expect-error this is fine.
    expect(processedDeepError.obj.with.deep instanceof Error).toBeFalse()
  })

  test('naughty values', () => {
    expect(errorToObject(null)).toEqual({})
    expect(errorToObject(undefined)).toEqual({})
    expect(errorToObject(0)).toEqual({})
    expect(errorToObject(5)).toEqual({})
    expect(errorToObject([])).toEqual({length: 0})
    expect(errorToObject(new Set([1, 2, 3, 4]))).toEqual({})
    expect(
      errorToObject(
        new Map([
          [1, 'one'],
          [2, 'two'],
        ])
      )
    ).toEqual({})
    expect(errorToObject(true)).toEqual({})
    expect(errorToObject(false)).toEqual({})
    expect(errorToObject(Symbol('test'))).toEqual({})
    expect(errorToObject(BigInt(123))).toEqual({})
    expect(() => errorToObject(class {})).not.toThrow()
  })

  test('string values', () => {
    expect(errorToObject('simple string')).toEqual({message: 'simple string'})
    expect(errorToObject('')).toEqual({message: ''})
  })
})
