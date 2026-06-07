[@qodestack/utils](../../README.md) / [text](../README.md) / pluralize

# Function: pluralize()

> **pluralize**(`amount`, `word`, `includeNumber?`): `string`

Defined in: [text.ts:15](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/text.ts#L15)

Pluralizes a word based on the given amount.

## Parameters

### amount

`string` \| `number`

The quantity to determine pluralization

### word

`string`

The word to be pluralized

### includeNumber?

`boolean` = `true`

## Returns

`string`

A string combining the amount and the pluralized word

## Example

```ts
pluralize(3, 'apple') // '3 apples'
pluralize('0', 'apple') // '0 apples'
pluralize(1, 'apple') // '1 apple'
```
