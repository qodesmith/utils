[@qodestack/utils](../../README.md) / [timing](../README.md) / genFps

# Function: genFps()

> **genFps**(): `Promise`\<`number`\>

Defined in: timing.ts:216

Get the frames per second for the current browser asynchronously.

This function uses `requestAnimationFrame` over a 1 second period to
determine the FPS. It returns a promise that resolves to a number
representing the calculated FPS.

## Returns

`Promise`\<`number`\>

A promise that resolves to the calculated FPS.
