/**
 * 
 *  去除数组重复项，返回新数组
 * 
 *  @example 
 * 
 *  noRepeat([["a"],["a"],["a"],["b"]]) == [["a"],["b"]]
 * 
 * 
 */
export function noRepeat(items:string[][]){
    const map = new Map<string,string[]>()
    items.forEach(item=>{
        const key = item.join(".")
        map.set(key,item)
    })
    return Array.from(map.values())
}