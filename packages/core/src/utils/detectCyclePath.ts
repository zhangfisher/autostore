import { isPathEq } from "./isPathEq"
import { pathStartsWith } from "./pathStartsWith"

export function detectCyclePath(steps:string[],curPath:string):Map<string,number>{
    // 使用curPath将steps分割为多个数组
    const indexs = steps.reduce((prev,cur,index)=>{
        if(cur===curPath) prev.push(index)            
        return prev
    },[] as number[])

    const groups = indexs.map((v,i)=>{
        if(i<indexs.length-1){
            return steps.slice(v,indexs[i+1])
        }else{
            return steps.slice(v)
        }        
    })

    // 找到groups相同的分组
    const results = new Map<string,number>()
    for(let i=0;i<groups.length;i++){
        const group = groups[i]
        if(group.length<2) continue
        for(let j=i+1;j<groups.length;j++){
            const group2 = groups[j]
            if(isPathEq(group,group2) || pathStartsWith(group,group2)){
                const gKey = group.join('->')
                if(!results.has(gKey)){
                    results.set(gKey,1)
                }
                const n = results.get(gKey)!                
                results.set(gKey,n+1)
            }
        }
    }
    return results

}
