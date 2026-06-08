import {expect, test} from 'bun:test'

import {getUnitInMs, getUnitInSeconds, secondsToDuration} from './timing'

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
  expect(getUnitInMs(1, 'y')).toBe(31_536_000_000) // 365 days
  expect(getUnitInMs(1, 'y', true)).toBe(31_622_400_000) // 366 days (leap year)
  expect(getUnitInMs(1, 'y', false)).toBe(31_536_000_000) // 365 days (explicit)
  // Tests for non-whole numbers
  expect(getUnitInMs(1.5, 's')).toBe(1500)
  expect(getUnitInMs(0.5, 'm')).toBe(30_000)
  expect(getUnitInMs(2.5, 'h')).toBe(9_000_000)
  expect(getUnitInMs(0.25, 'd')).toBe(21_600_000)
  expect(getUnitInMs(1.5, 'w')).toBe(907_200_000)
  expect(getUnitInMs(0.1, 'y')).toBe(3_153_600_000) // 365 days
  expect(getUnitInMs(0.1, 'y', true)).toBe(3_162_240_000) // 366 days (leap year)
})

test('getUnitInSeconds', () => {
  expect(getUnitInSeconds(1000, 'ms')).toBe(1)
  expect(getUnitInSeconds(1, 'm')).toBe(60)
  expect(getUnitInSeconds(1, 'h')).toBe(3600)
  expect(getUnitInSeconds(1, 'd')).toBe(86_400)
  expect(getUnitInSeconds(1, 'w')).toBe(604_800)
  expect(getUnitInSeconds(1, 'y')).toBe(31_536_000) // 365 days
  expect(getUnitInSeconds(1, 'y', true)).toBe(31_622_400) // 366 days (leap year)
  expect(getUnitInSeconds(1, 'y', false)).toBe(31_536_000) // 365 days (explicit)
  // Tests for non-whole numbers
  expect(getUnitInSeconds(500, 'ms')).toBe(0.5)
  expect(getUnitInSeconds(0.5, 'm')).toBe(30)
  expect(getUnitInSeconds(2.5, 'h')).toBe(9000)
  expect(getUnitInSeconds(0.25, 'd')).toBe(21_600)
  expect(getUnitInSeconds(1.5, 'w')).toBe(907_200)
  expect(getUnitInSeconds(0.1, 'y')).toBe(3_153_600) // 365 days
  expect(getUnitInSeconds(0.1, 'y', true)).toBe(3_162_240) // 366 days (leap year)
})
