[@qodestack/utils](../../README.md) / [numbers](../README.md) / sanitizeDecimal

# Function: sanitizeDecimal()

> **sanitizeDecimal**(`num`): `string`

Defined in: [numbers.ts:13](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/numbers.ts#L13)

Formats a floating-point number to a consistent decimal representation as a
string. Trims trailing zeros and removes unnecessary decimal points.

## Parameters

### num

`number`

The number to format.

## Returns

`string`

The formatted number as a string.

## Example

```ts
sanitizeDecimal(2.1091); // "2.11"
sanitizeDecimal(2.0);    // "2"
sanitizeDecimal(2.10);   // "2.1"
```
