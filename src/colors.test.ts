import {expect, test} from 'bun:test'

import {getHexGradientStops} from './colors'

test('getHexGradientStops - 2 stops returns start and end', () => {
  const result = getHexGradientStops({
    startColor: '#000000',
    endColor: '#ffffff',
    stops: 2,
  })
  expect(result).toEqual(['#000000', '#ffffff'])
})

test('getHexGradientStops - 3 stops includes midpoint', () => {
  const result = getHexGradientStops({
    startColor: '#000000',
    endColor: '#ffffff',
    stops: 3,
  })
  expect(result).toEqual(['#000000', '#808080', '#ffffff'])
})

test('getHexGradientStops - 5 stops', () => {
  const result = getHexGradientStops({
    startColor: '#000000',
    endColor: '#ffffff',
    stops: 5,
  })
  expect(result).toEqual([
    '#000000',
    '#404040',
    '#808080',
    '#bfbfbf',
    '#ffffff',
  ])
})

test('getHexGradientStops - works without # prefix', () => {
  const result = getHexGradientStops({
    startColor: '000000',
    endColor: 'ffffff',
    stops: 3,
  })
  expect(result).toEqual(['000000', '#808080', 'ffffff'])
})

test('getHexGradientStops - throws for stops < 2', () => {
  expect(() =>
    getHexGradientStops({
      startColor: '#000000',
      endColor: '#ffffff',
      stops: 1,
    })
  ).toThrow('stops must be at least 2')

  expect(() =>
    getHexGradientStops({
      startColor: '#000000',
      endColor: '#ffffff',
      stops: 0,
    })
  ).toThrow('stops must be at least 2')
})

test('getHexGradientStops - throws for invalid hex', () => {
  expect(() =>
    getHexGradientStops({
      startColor: '#00',
      endColor: '#ffffff',
      stops: 3,
    })
  ).toThrow('Invalid hex color: #00')

  expect(() =>
    getHexGradientStops({
      startColor: '#000000',
      endColor: 'xyz',
      stops: 3,
    })
  ).toThrow('Invalid hex color: xyz')
})

test('getHexGradientStops - handles 8-char hex (RGBA)', () => {
  const result = getHexGradientStops({
    startColor: '#000000ff',
    endColor: '#ffffff00',
    stops: 3,
  })
  expect(result).toEqual(['#000000ff', '#80808080', '#ffffff00'])
})

test('getHexGradientStops - interpolates alpha correctly', () => {
  const result = getHexGradientStops({
    startColor: '#ff0000ff',
    endColor: '#ff000000',
    stops: 3,
  })
  expect(result[0]).toBe('#ff0000ff')
  expect(result[1]).toBe('#ff000080')
  expect(result[2]).toBe('#ff000000')
})

test('getHexGradientStops - mixed 6 and 8 char hex', () => {
  const result = getHexGradientStops({
    startColor: '#ff0000',
    endColor: '#0000ff80',
    stops: 3,
  })
  expect(result).toHaveLength(3)
  expect(result[0]).toBe('#ff0000')
  expect(result[2]).toBe('#0000ff80')
})

test('getHexGradientStops - red to blue gradient', () => {
  const result = getHexGradientStops({
    startColor: '#ff0000',
    endColor: '#0000ff',
    stops: 3,
  })
  expect(result).toEqual(['#ff0000', '#800080', '#0000ff'])
})
