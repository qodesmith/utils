import {expect, test} from 'bun:test'
import {catchy} from './async'

test('catchy', async () => {
  const promise1 = Promise.resolve(1)
  const promise2 = Promise.reject(new Error())
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
