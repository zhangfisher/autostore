/**
 * 使用正则表达式替换字符串
 * 
 * 1. 如果正则表达式中存在捕获组，则第一个捕获组的内容被替换为新值
 * 2. 如果没有捕获组，则整个匹配的内容被替换为新值
 * 
 * @param str - 原始字符串
 * @param regex - 正则表达式字符串
 * @param replaceValue - 替换值
 * @returns 替换后的字符串，如果没有匹配则返回undefined
 */
export function replaceWithRegex(str: string, regex: string, replaceValue: string): string | undefined {
    try {
        const reg = new RegExp(regex, "gd")
        const match = reg.exec(str)
        
        if (match && match.length > 1 && 'indices' in match) {
            // 如果有捕获组且支持indices
            const [start, end] = (match as any).indices[1]
            return str.substring(0, start) + replaceValue + str.substring(end)
        } else if (match) {
            // 如果不支持indices或没有捕获组，使用传统方式
            const fullMatch = match[0]
            const matchIndex = str.indexOf(fullMatch)
            if (matchIndex !== -1) {
                return str.substring(0, matchIndex) + replaceValue + str.substring(matchIndex + fullMatch.length)
            }
        }
    } catch (error) {
        console.warn('Error in replaceWithRegex:', error)
    }
    
    return undefined
}