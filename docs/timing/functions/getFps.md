[@qodestack/utils](../../README.md) / [timing](../README.md) / getFps

# Function: getFps()

> **getFps**\<`T`\>(`cb`): `void`

Defined in: timing.ts:185

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
