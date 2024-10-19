
/**
 * 如果字符串是数字，则返回true
 * @param value 
 */
export function isNumber(value: any): value is number {
    return typeof value === "number"
        || (typeof value === "string" && !isNaN(parseFloat(value)))
}