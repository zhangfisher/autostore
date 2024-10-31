/**
 * 判定操作是否符合监听指定的operates参数
 */

import { StateOperate } from "../store/types"
import { WatchListenerOptions } from "../watch/types"

export function isMatchOperates(operate:StateOperate,opts:WatchListenerOptions['operates']){                            
    if(opts==='*'){
        return true
    }else if(opts==='write'){
        if(operate.type==='get') return
    }else if(opts ==='read'){
        if(operate.type!=='get') return
    }else if(Array.isArray(opts) && opts.length>0 ){     // 指定操作类型                
        if(!opts.includes(operate.type)) return
    } 
    return true
}