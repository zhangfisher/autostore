

export function isNull(value: any): value is null | undefined {
    if (value === null || value === undefined) {
        return true
    }   
    return false
}