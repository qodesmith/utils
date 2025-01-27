import {expect, test, describe} from 'bun:test'
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

  test.only('prettyStack', () => {
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
})
