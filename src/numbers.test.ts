import {expect, test} from 'bun:test'
import {bytesToSize, sanitizeDecimal} from './numbers'

test('sanitizeDecimal', () => {
  expect(sanitizeDecimal(2.1091)).toBe('2.11')
  expect(sanitizeDecimal(2.0)).toBe('2')
  expect(sanitizeDecimal(2.1)).toBe('2.1')
  expect(sanitizeDecimal(2)).toBe('2')
  expect(sanitizeDecimal(0.0)).toBe('0')
  expect(sanitizeDecimal(3.0101)).toBe('3.01')
})

test('bytesToSize', () => {
  expect(bytesToSize(38974928734)).toBe('36.3 GB')
  expect(bytesToSize(1000)).toBe('1000 bytes')
  expect(bytesToSize(1024)).toBe('1 KB')
  expect(bytesToSize(1024 * 1000)).toBe('1000 KB')
  expect(bytesToSize(1024 * 1024)).toBe('1 MB')
  expect(bytesToSize(1024 * 1024 * 1024)).toBe('1 GB')
  expect(bytesToSize(1024 * 1024 * 1024 * 1001)).toBe('1001 GB')
})
