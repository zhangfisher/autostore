import type { SchemaOptions } from "autostore"


function toStringValue(val: any) {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if (val == undefined) return ''
    const valueType = typeof (val)
    if (valueType === 'boolean') {
        return String(val)
    } else if (Array.isArray(val)) {
        return val.join(',')
    } else if (valueType === 'object') {
        try {
            return JSON.stringify(val)
        } catch {
            return '{}'
        }
    }
    return String(val)
}

export function toSchemaValue<T = any>(value: any, schema?: SchemaOptions): T {
    if (!schema) return value
    const datatype = schema.datatype || 'any'
    if (datatype === 'any') return value
    if (datatype === 'string') {
        return toStringValue(value) as T
    }
    if (datatype === 'number') return Number(value) as T
    if (Array.isArray(value)) return [...value] as T
    if (typeof (value) === 'object') return { ...value } as T
    if (typeof value === 'string') {
        if (datatype === 'boolean') {
            return (value.toLowerCase() === 'true') as T
        } else if (datatype === 'array') {
            return value.split(',').map(v => v.trim()) as T
        } else if (datatype === 'object') {
            try {
                return JSON.parse(value)
            } catch {
                return {} as T
            }
        }
    }
    if (datatype === 'boolean') return Boolean(value) as T
    return value
}