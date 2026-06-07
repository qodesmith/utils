[@qodestack/utils](../../README.md) / [fps](../README.md) / genFps

# Function: genFps()

> **genFps**(): `Promise`\<`number`\>

Defined in: [fps.ts:41](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/fps.ts#L41)

Get the frames per second for the current browser asynchronously.

This function uses `requestAnimationFrame` over a 1 second period to
determine the FPS. It returns a promise that resolves to a number
representing the calculated FPS.

## Returns

`Promise`\<`number`\>

A promise that resolves to the calculated FPS.
