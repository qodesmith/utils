[@qodestack/utils](../../README.md) / [text](../README.md) / makeTableString

# Function: makeTableString()

> **makeTableString**(`options`): `string`

Defined in: [text.ts:124](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/text.ts#L124)

Creates a formatted table string with Unicode box-drawing characters.
Supports thin, thick, and rounded corner styles.

## Parameters

### options

\{ `rounded`: `true`; `rows`: (`string` \| `number`)[][]; \} \| \{ `rows`: (`string` \| `number`)[][]; `thick`: `true`; \} \| \{ `rows`: (`string` \| `number`)[][]; \} & `object`

Table configuration options

## Returns

`string`

A formatted table string with proper alignment and borders

## Throws

Throws an error if rows have different lengths

## Examples

```ts
makeTableString({
  rows: [['Name', 'Age'], ['John', 25], ['Jane', 30]]
})
// Returns a formatted table with thin borders
```

```ts
makeTableString({
  rows: [['A', 'B'], ['1', '2']],
  thick: true,
  padding: 2
})
// Returns a formatted table with thick borders and 2-space padding
```
