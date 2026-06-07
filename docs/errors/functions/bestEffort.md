[@qodestack/utils](../../README.md) / [errors](../README.md) / bestEffort

# Function: bestEffort()

## Call Signature

> **bestEffort**\<`T`\>(`cb`, `options?`): `Promise`\<`T` \| `undefined`\>

Defined in: [errors.ts:67](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/errors.ts#L67)

Executes a callback and swallows any errors, logging them instead of throwing.
Useful for non-critical operations where failure shouldn't break the flow.
Failures are intentionally silent, hence the name "best effort".

### Type Parameters

#### T

`T`

### Parameters

#### cb

() => `Promise`\<`T`\>

Sync or async callback to execute

#### options?

`BestEffortOptions`

Optional settings

### Returns

`Promise`\<`T` \| `undefined`\>

The callback result, or undefined if an error occurred

## Call Signature

> **bestEffort**\<`T`\>(`cb`, `options?`): `T` \| `undefined`

Defined in: [errors.ts:71](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/errors.ts#L71)

Executes a callback and swallows any errors, logging them instead of throwing.
Useful for non-critical operations where failure shouldn't break the flow.
Failures are intentionally silent, hence the name "best effort".

### Type Parameters

#### T

`T`

### Parameters

#### cb

() => `T`

Sync or async callback to execute

#### options?

`BestEffortOptions`

Optional settings

### Returns

`T` \| `undefined`

The callback result, or undefined if an error occurred
