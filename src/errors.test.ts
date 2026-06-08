import {beforeEach, describe, expect, spyOn, test} from 'bun:test'

import {bestEffort, catchy, errorToObject, invariant} from './errors'

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

describe('bestEffort', () => {
  const spy = spyOn(console, 'log')

  beforeEach(() => {
    spy.mockReset()
  })

  test('returns the value from a successful sync callback', () => {
    const result = bestEffort(() => 42)
    expect(result).toBe(42)
    expect(spy).not.toHaveBeenCalled()
  })

  test('returns undefined and logs when a sync callback throws and log: true', () => {
    const result = bestEffort(
      () => {
        throw new Error('sync boom')
      },
      {log: true}
    )
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)

    const logArgs = spy.mock.calls[0]
    expect(logArgs).toContain('[BEST EFFORT]')
    const errorObj = logArgs?.find(
      arg => typeof arg === 'object' && arg !== null && 'message' in arg
    ) as Record<string, unknown> | undefined
    expect(errorObj?.message).toBe('sync boom')
  })

  test('logs by default when a sync callback throws', () => {
    const result = bestEffort(() => {
      throw new Error('sync boom')
    })
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)

    const logArgs = spy.mock.calls[0]
    expect(logArgs).toContain('[BEST EFFORT]')
    const errorObj = logArgs?.find(
      arg => typeof arg === 'object' && arg !== null && 'message' in arg
    ) as Record<string, unknown> | undefined
    expect(errorObj?.message).toBe('sync boom')
  })

  test('returns the resolved value from a successful async callback', async () => {
    const result = await bestEffort(async () => 'hello')
    expect(result).toBe('hello')
    expect(spy).not.toHaveBeenCalled()
  })

  test('returns undefined and logs when an async callback rejects and log: true', async () => {
    const result = await bestEffort(
      async () => {
        throw new Error('async boom')
      },
      {log: true}
    )
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)

    const logArgs = spy.mock.calls[0]
    expect(logArgs).toContain('[BEST EFFORT (promise)]')
    const errorObj = logArgs?.find(
      arg => typeof arg === 'object' && arg !== null && 'message' in arg
    ) as Record<string, unknown> | undefined
    expect(errorObj?.message).toBe('async boom')
  })

  test('logs by default when an async callback rejects', async () => {
    const result = await bestEffort(async () => {
      throw new Error('async boom')
    })
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)

    const logArgs = spy.mock.calls[0]
    expect(logArgs).toContain('[BEST EFFORT (promise)]')
    const errorObj = logArgs?.find(
      arg => typeof arg === 'object' && arg !== null && 'message' in arg
    ) as Record<string, unknown> | undefined
    expect(errorObj?.message).toBe('async boom')
  })

  test('returns undefined and logs when a callback returns a rejecting promise and log: true', async () => {
    const result = await bestEffort(
      () => Promise.reject(new Error('rejected')),
      {log: true}
    )
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)

    const logArgs = spy.mock.calls[0]
    expect(logArgs).toContain('[BEST EFFORT (promise)]')
  })

  test('handles non-Error thrown values', () => {
    const result = bestEffort(
      () => {
        throw 'string error'
      },
      {log: true}
    )
    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('does not log when the sync callback returns undefined', () => {
    const result = bestEffort(() => undefined)
    expect(result).toBeUndefined()
    expect(spy).not.toHaveBeenCalled()
  })

  test('calls onError alongside logging when a sync callback throws', () => {
    let captured: unknown
    const onError = (err: unknown) => {
      captured = err
    }

    const err = new Error('sync boom')
    const result = bestEffort(
      () => {
        throw err
      },
      {log: true, onError}
    )

    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(captured).toBe(err)
  })

  test('calls onError alongside logging when an async callback rejects', async () => {
    let captured: unknown
    const onError = (err: unknown) => {
      captured = err
    }

    const err = new Error('async boom')
    const result = await bestEffort(
      async () => {
        throw err
      },
      {log: true, onError}
    )

    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(captured).toBe(err)
  })

  test('suppresses logging when log: false (sync)', () => {
    let captured: unknown
    const onError = (err: unknown) => {
      captured = err
    }

    const err = new Error('silent sync')
    const result = bestEffort(
      () => {
        throw err
      },
      {log: false, onError}
    )

    expect(result).toBeUndefined()
    expect(spy).not.toHaveBeenCalled()
    expect(captured).toBe(err)
  })

  test('suppresses logging when log: false (async)', async () => {
    let captured: unknown
    const onError = (err: unknown) => {
      captured = err
    }

    const err = new Error('silent async')
    const result = await bestEffort(
      async () => {
        throw err
      },
      {log: false, onError}
    )

    expect(result).toBeUndefined()
    expect(spy).not.toHaveBeenCalled()
    expect(captured).toBe(err)
  })

  test('logs by default when options is provided without a log property', () => {
    let captured: unknown
    const onError = (err: unknown) => {
      captured = err
    }

    const err = new Error('default log')
    const result = bestEffort(
      () => {
        throw err
      },
      {onError}
    )

    expect(result).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(captured).toBe(err)
  })
})

test('catchy', async () => {
  const promise1 = Promise.resolve(1)
  const promise2 = Promise.reject(new Error('error'))
  const promise3 = Promise.reject('nope')
  const [promise1Val, promise1Error] = await catchy(promise1)
  const [promise2Val, promise2Error] = await catchy(promise2)
  const [promise3Val, promise3Error, promise3ErrorVal] = await catchy(promise3)

  expect(promise1Val).toBe(1)
  expect(promise1Error).toBeNull()

  expect(promise2Val).toBeNull()
  expect(promise2Error instanceof Error).toBeTrue()

  expect(promise3Val).toBeNull()
  expect(promise3Error instanceof Error).toBeTrue()
  expect(promise3ErrorVal).toBe('nope')
})

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
