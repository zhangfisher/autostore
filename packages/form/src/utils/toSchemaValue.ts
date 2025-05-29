import { SchemaObject } from "autostore";

export function toSchemaValue<T = any>(value: any, schema: SchemaObject): T {
    if (!schema) return value
    const datatype = schema.datatype || 'any'
    if (datatype === 'any') return value
    if (datatype === 'string') return value.toString()
    if (datatype === 'number') return Number(value) as T
    if (typeof value === 'string') {
        if (datatype === 'boolean') {
            return (value.toLowerCase() === 'true') as T
        } else if (datatype === 'array') {
            return value.split(',').map(v => v.trim()) as T
        } else if (datatype === 'object') {
            try {
                return JSON.parse(value) as T
            } catch {
                return {} as T
            }
        }
    }
    if (datatype === 'boolean') return Boolean(value) as T
    return value
}