[@qodestack/utils](../../README.md) / [text](../README.md) / getTrueStringLength

# Function: getTrueStringLength()

> **getTrueStringLength**(`text`): `number`

Defined in: [text.ts:92](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/text.ts#L92)

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
