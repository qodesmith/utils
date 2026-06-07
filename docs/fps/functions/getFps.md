[@qodestack/utils](../../README.md) / [fps](../README.md) / getFps

# Function: getFps()

> **getFps**\<`T`\>(`cb`): `void`

Defined in: [fps.ts:10](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/fps.ts#L10)

Get the frames per second for the current browser.

This function uses `requestAnimationFrame` over a 1 second period to
determine the FPS. It executes a callback function with a number representing
the calculated FPS.

## Type Parameters

### T

`T`

## Parameters

### cb

(`num`) => `T`

Callback function that receives the calculated FPS as a parameter.

## Returns

`void`
