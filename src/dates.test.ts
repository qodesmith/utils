import {describe, expect, it} from 'bun:test'

import {isValidDate} from './dates'

describe('isValidDate', () => {
  it('should return true for a valid Date object', () => {
    const date = new Date()
    expect(isValidDate(date)).toBe(true)
  })

  it('should return false for an invalid Date object', () => {
    const date = new Date('nope')
    expect(isValidDate(date)).toBe(false)
  })

  it('should return false for a non-Date object', () => {
    expect(isValidDate('2024-10-05')).toBe(false)
    expect(isValidDate(1_234_567_890)).toBe(false)
    expect(isValidDate({})).toBe(false)
    expect(isValidDate(null)).toBe(false)
    expect(isValidDate(undefined)).toBe(false)
  })
})
