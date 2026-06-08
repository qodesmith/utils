[@qodestack/utils](../../README.md) / [text](../README.md) / slugify

# Function: slugify()

> **slugify**(`text`): `string`

Defined in: [text.ts:41](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/text.ts#L41)

Provides BASIC slug creation functionality. The result is a url-safe string
with the following rules:
- Upper and lowercase letters allowed
- Numbers allowed
- `-_.~` are the only special characters allowed
- Leading and trailing spaces are trimmed
- Spaces are converted to `-`
- Consecutive `-` will be reduced to a single `-`

## Parameters

### text

`string`

The string to slugify

## Returns

`string`

A slugified string

## Example

```ts
slugify('Hello world!') // 'Hello-world'
slugify('    ----This   is!@#$%^&a test  ') // '-This-isa-test'
```
