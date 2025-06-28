import {expect, test} from 'bun:test'

import {
  bytesToSize,
  getRandomNumber,
  getUnitInMs,
  sanitizeDecimal,
  secondsToDuration,
} from './numbers'

test('sanitizeDecimal', () => {
  expect(sanitizeDecimal(2.1091)).toBe('2.11')
  expect(sanitizeDecimal(2.0)).toBe('2')
  expect(sanitizeDecimal(2.1)).toBe('2.1')
  expect(sanitizeDecimal(2)).toBe('2')
  expect(sanitizeDecimal(0.0)).toBe('0')
  expect(sanitizeDecimal(3.0101)).toBe('3.01')
})

test('bytesToSize', () => {
  expect(bytesToSize(38_974_928_734)).toBe('36.3 GB')
  expect(bytesToSize(1000)).toBe('1000 bytes')
  expect(bytesToSize(1024)).toBe('1 KB')
  expect(bytesToSize(1024 * 1000)).toBe('1000 KB')
  expect(bytesToSize(1024 * 1024)).toBe('1 MB')
  expect(bytesToSize(1024 * 1024 * 1024)).toBe('1 GB')
  expect(bytesToSize(1024 * 1024 * 1024 * 1001)).toBe('1001 GB')
})

test('getRandomNumber', () => {
  const min = -5
  const max = 5
  const numSet = new Set<number>()

  for (let i = 0; i < 10_000; i++) {
    const num = getRandomNumber(min, max)
    numSet.add(num)

    expect(num).toBeNumber()
    expect(num).toBeGreaterThanOrEqual(min)
    expect(num).toBeLessThanOrEqual(max)
  }

  expect(numSet.size).toBe(Math.abs(min - max) + 1)

  for (let i = min; i <= max; i++) {
    expect(numSet.has(i)).toBeTrue()
  }
})

test('secondsToDuration', () => {
  expect(secondsToDuration(24)).toBe('0:24')
  expect(secondsToDuration(60)).toBe('1:00')
  expect(secondsToDuration(60 * 3)).toBe('3:00')
  expect(secondsToDuration(3600)).toBe('1:00:00')
  expect(secondsToDuration(24 * 60 * 60)).toBe('24:00:00')
  expect(secondsToDuration(24 * 60 * 60 + 1)).toBe('24:00:01')
  expect(secondsToDuration(24 * 60 * 60 * 2 + 1)).toBe('48:00:01')
})

test('getUnitInMs', () => {
  expect(getUnitInMs(1, 's')).toBe(1000)
  expect(getUnitInMs(1, 'm')).toBe(60_000)
  expect(getUnitInMs(1, 'h')).toBe(3_600_000)
  expect(getUnitInMs(1, 'd')).toBe(86_400_000)
  expect(getUnitInMs(1, 'w')).toBe(604_800_000)
  expect(getUnitInMs(1, 'y')).toBe(31_449_600_000)
  // Tests for non-whole numbers
  expect(getUnitInMs(1.5, 's')).toBe(1500)
  expect(getUnitInMs(0.5, 'm')).toBe(30_000)
  expect(getUnitInMs(2.5, 'h')).toBe(9_000_000)
  expect(getUnitInMs(0.25, 'd')).toBe(21_600_000)
  expect(getUnitInMs(1.5, 'w')).toBe(907_200_000)
  expect(getUnitInMs(0.1, 'y')).toBe(3_144_960_000)
})
