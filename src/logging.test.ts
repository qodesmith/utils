import {
  beforeAll,
  beforeEach,
  expect,
  setSystemTime,
  spyOn,
  test,
} from 'bun:test'
import process from 'node:process'

import {ansiColors} from './internal/ansiColors'
import {createLogger, emptyLog} from './logging'

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

test('log', () => {
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
