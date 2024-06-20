import {
  expect,
  test,
  beforeAll,
  beforeEach,
  setSystemTime,
  spyOn,
} from 'bun:test'
import {createLogger, emptyLog} from './logging'

const spy = spyOn(console, 'log')
const timeZone = 'America/New_York'
process.env.TZ = timeZone

beforeAll(() => {
  setSystemTime(new Date(1718468598753))
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
  const log = createLogger({timeZone})

  log.text('test')
  log.warning('test 2')
  log.error('test 3')
  log.success('test 4')

  expect(spy).toHaveBeenCalledTimes(4)
  expect(spy).toHaveBeenCalledWith('[6/15/2024, 12:23:18 PM]', 'test')
})
