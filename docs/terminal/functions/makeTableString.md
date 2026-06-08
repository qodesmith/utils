[@qodestack/utils](../../README.md) / [terminal](../README.md) / makeTableString

# Function: makeTableString()

> **makeTableString**(`options`): `string`

Defined in: terminal.ts:148

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
