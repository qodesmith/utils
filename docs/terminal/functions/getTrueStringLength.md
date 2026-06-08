[@qodestack/utils](../../README.md) / [terminal](../README.md) / getTrueStringLength

# Function: getTrueStringLength()

> **getTrueStringLength**(`text`): `number`

Defined in: terminal.ts:116

Gets the true string length by removing ANSI escape sequences (color codes).
This is useful when measuring the display width of strings that contain terminal colors.

## Parameters

### text

`string`

The string to measure

## Returns

`number`

The true length of the string without ANSI escape sequences

## Example

```ts
getTrueStringLength('\u001b[31mHello\u001b[0m') // 5 (instead of 14)
getTrueStringLength('Hello World') // 11
```
