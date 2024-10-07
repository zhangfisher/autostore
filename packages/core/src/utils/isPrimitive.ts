

/**
 * 检查是否是原子类型
 */
export function isPrimitive(value: any): value is string | number | boolean | undefined | null{
    return value === null 
        || value === undefined
        || typeof value === 'string'
        || typeof value === 'number'
        || typeof value === 'boolean'
}