[@qodestack/utils](../../README.md) / [json](../README.md) / safeJsonParse

# Function: safeJsonParse()

## Call Signature

> **safeJsonParse**\<`T`\>(`jsonString`): `T` \| `undefined`

Defined in: [json.ts:8](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/json.ts#L8)

Safely parses a JSON string, returning a default value if parsing fails.

### Type Parameters

#### T

`T`

### Parameters

#### jsonString

`string`

The JSON string to parse.

### Returns

`T` \| `undefined`

The parsed object of type T, or the default value if parsing fails.

## Call Signature

> **safeJsonParse**\<`T`\>(`jsonString`, `defaultValue`): `T`

Defined in: [json.ts:9](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/json.ts#L9)

Safely parses a JSON string, returning a default value if parsing fails.

### Type Parameters

#### T

`T`

### Parameters

#### jsonString

`string`

The JSON string to parse.

#### defaultValue

`T`

The value to return if parsing fails.

### Returns

`T`

The parsed object of type T, or the default value if parsing fails.
