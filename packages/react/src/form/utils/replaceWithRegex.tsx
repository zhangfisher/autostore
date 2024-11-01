/**
 * 
 * 
 * 使用正则表达式替换字符串
 * 
 * 1. 如果正则表达式中存在捕获组，则第一个捕获组的内容被替换为新值
 * 2. 如果没有捕获组，则整个匹配的内容被替换为新值
 * 
 * @param str
 * @param regex 
 * @param replaceValue 
 */


export function replaceWithRegex(str:string,regex:string,replaceValue:string){
    const reg = new RegExp(regex,"gd")
    const match = reg.exec(str)
    if(match && match.length>1){
        const [start,end] = match.indices![1]
        return str.substring(0,start) + replaceValue + str.substring(end)
    }
}