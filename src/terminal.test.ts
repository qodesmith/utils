import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  setSystemTime,
  spyOn,
  test,
} from 'bun:test'
import process from 'node:process'

import {ansiColors} from './internal/ansiColors'
import {
  createLogger,
  emptyLog,
  getTrueStringLength,
  makeTableString,
} from './terminal'

const spy = spyOn(console, 'log')
const timeZone = 'America/New_York'
process.env.TZ = timeZone

beforeAll(() => {
  setSystemTime(new Date(1_718_468_598_753))
})

beforeEach(() => {
  spy.mockReset()
})

test('emptyLog', () => {
  emptyLog.text('test')
  emptyLog.warning('test')
  emptyLog.error('test')
  emptyLog.success('test')

  expect(spy).not.toHaveBeenCalled()
})

test('log with includeTime default (true)', () => {
  const log = createLogger({timeZone: 'Australia/Sydney'})

  log.text('test')
  log.warning('test 2')
  log.error('test 3')
  log.success('test 4')

  expect(spy).toHaveBeenCalledTimes(4)

  expect(spy).toHaveBeenCalledWith('[6/16/2024, 2:23:18 AM]', 'test')
  expect(spy).toHaveBeenCalledWith(
    ansiColors.warning,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.warning,
    'test 2'
  )
  expect(spy).toHaveBeenCalledWith(
    ansiColors.error,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.error,
    'test 3'
  )
  expect(spy).toHaveBeenCalledWith(
    ansiColors.success,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.success,
    'test 4'
  )
})

test('log with includeTime: false', () => {
  const log = createLogger({timeZone: 'Australia/Sydney', includeTime: false})

  log.warning('test warning')
  log.error('test error')
  log.success('test success')

  expect(spy).toHaveBeenCalledTimes(3)

  expect(spy).toHaveBeenCalledWith(ansiColors.warning, 'test warning')
  expect(spy).toHaveBeenCalledWith(ansiColors.error, 'test error')
  expect(spy).toHaveBeenCalledWith(ansiColors.success, 'test success')
})

test('log with includeTime: true (explicit)', () => {
  const log = createLogger({timeZone: 'Australia/Sydney', includeTime: true})

  log.warning('test')
  log.error('test 2')
  log.success('test 3')

  expect(spy).toHaveBeenCalledTimes(3)

  expect(spy).toHaveBeenCalledWith(
    ansiColors.warning,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.warning,
    'test'
  )
  expect(spy).toHaveBeenCalledWith(
    ansiColors.error,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.error,
    'test 2'
  )
  expect(spy).toHaveBeenCalledWith(
    ansiColors.success,
    '[6/16/2024, 2:23:18 AM]',
    ansiColors.success,
    'test 3'
  )
})

describe('getTrueStringLength', () => {
  test('returns correct length for regular strings', () => {
    expect(getTrueStringLength('hello')).toBe(5)
    expect(getTrueStringLength('')).toBe(0)
  })

  test('ignores ANSI escape sequences', () => {
    expect(getTrueStringLength('\u001b[31mred text\u001b[0m')).toBe(8)
    expect(getTrueStringLength('\u001b[1mBold\u001b[0m text')).toBe(9)
    expect(getTrueStringLength('\u001b[32;1mGreen bold\u001b[0m')).toBe(10)
  })

  test('handles multiple ANSI sequences', () => {
    expect(
      getTrueStringLength('\u001b[31m\u001b[1mred bold\u001b[0m\u001b[0m')
    ).toBe(8)
  })
})

describe('makeTableString', () => {
  test('creates a basic table', () => {
    const rows = [
      ['Name', 'Age'],
      ['John Doe', '30'],
      ['Jane Doe', '25'],
    ]
    const result = makeTableString({rows})
    const lines = result.split('\n')

    expect(lines).toHaveLength(7)
    expect(lines[0]).toBe('┌──────────┬─────┐')
    expect(lines[1]).toBe('│ Name     │ Age │')
    expect(lines[2]).toBe('├──────────┼─────┤')
    expect(lines[3]).toBe('│ John Doe │ 30  │')
    expect(lines[4]).toBe('├──────────┼─────┤')
    expect(lines[5]).toBe('│ Jane Doe │ 25  │')
    expect(lines[6]).toBe('└──────────┴─────┘')
  })

  test('creates a thick table', () => {
    const rows = [
      ['A', 'B'],
      [1, 2],
    ]
    const result = makeTableString({rows, thick: true})
    const lines = result.split('\n')

    expect(lines).toHaveLength(5)
    expect(lines[0]).toBe('┏━━━┳━━━┓')
    expect(lines[1]).toBe('┃ A ┃ B ┃')
    expect(lines[2]).toBe('┣━━━╋━━━┫')
    expect(lines[3]).toBe('┃ 1 ┃ 2 ┃')
    expect(lines[4]).toBe('┗━━━┻━━━┛')
  })

  test('creates a rounded table', () => {
    const rows = [
      ['A', 'B'],
      [1, 2],
    ]
    const result = makeTableString({rows, rounded: true})
    const lines = result.split('\n')

    expect(lines).toHaveLength(5)
    expect(lines[0]).toBe('╭───┬───╮')
    expect(lines[1]).toBe('│ A │ B │')
    expect(lines[2]).toBe('├───┼───┤')
    expect(lines[3]).toBe('│ 1 │ 2 │')
    expect(lines[4]).toBe('╰───┴───╯')
  })

  test('respects custom padding', () => {
    const rows = [['A']]
    const result = makeTableString({rows, padding: 2})

    expect(result).toContain('│  A  │')
  })

  test('handles different column widths', () => {
    const rows = [
      ['Short', 'Very Long Header'],
      ['X', 'Y'],
    ]
    const result = makeTableString({rows})

    expect(result).toContain('Very Long Header')
    expect(result).toContain('Short')
  })

  test('handles numbers in cells', () => {
    const rows = [
      [1, 2.5],
      [100, 0],
    ]
    const result = makeTableString({rows})

    expect(result).toContain('│ 1   │ 2.5 │')
    expect(result).toContain('│ 100 │ 0   │')
  })

  test('throws an error for mismatched row lengths', () => {
    const rows = [['A', 'B'], ['C']]

    expect(() => makeTableString({rows})).toThrow(
      'All table rows must have the same length'
    )
  })

  test('handles ANSI sequences in cell content', () => {
    const rows = [['\u001b[31mRed\u001b[0m', 'Normal']]
    const result = makeTableString({rows})

    expect(result).toContain('\u001b[31mRed\u001b[0m')
  })
})
