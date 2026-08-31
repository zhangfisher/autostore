import type { AsyncComputedValue } from "autostore"

export function isAsyncComputedValue(value: any): value is AsyncComputedValue {
    return value
        && typeof value === 'object'
        && value.hasOwnProperty('__AS_ASYNC_COMPUTED_VALUE__')
}