import { PATH_DELIMITER } from "../consts"
import type { AutoStore } from "../store/store"
import { Dict } from "../types"
import { getVal } from "./getVal"
import { isAsyncComputedValue } from "./isAsyncComputedValue"

export type ExtendAsyncOptions = 'none' | 'value' | 'all'

/**
 * 获取依赖项列表
 * 
 * @description
 * 
 * 如果是函数，则执行函数并收集依赖
 * 
 * 
 * extendAsync参数决定当目标路径指向的是一个异步计算属性时，如何处理:
 * 
 * none: 默认值，不处理
 * value: 自动添加.value，即指向该异步计算属性的值的依赖
 * all: 自动添加.*, 即指向该异步计算属性的所有依赖，如.loading，.error等
 * 
 * @param selector - 选择器，可以是字符串、字符串数组或函数
 * @param store - AutoStore 实例
 * @param extendAsync - 是否扩展异步计算属性，默认为 true
 * @returns 依赖项列表
 */
export function getDepends<State extends Dict>(selector: string | string[] | Function,store:AutoStore<State>,extendAsync:ExtendAsyncOptions='none'):string[][]{ 
    let deps:string[][] = [] 
    if(typeof(selector)==='function'){
        deps =  store.collectDependencies(()=>selector(store.state))  
    }else if(typeof(selector)==='string'){
        deps = [selector.split(PATH_DELIMITER)]   
    }else if(Array.isArray(selector)){
        deps =  [[...selector]]  
    }else{
        deps = []
    } 
    // 判断是否是异步计算属性，如果是则需要自动添加value
    if(extendAsync!=='none'){
        deps.forEach(dep=>{
            // 获取值,不触发GET事件,即偷看
            let value =  store.peep(state=>getVal(state,dep))
            if(isAsyncComputedValue(value)){                
                dep.push(extendAsync==='all' ? '*' : "value")
            }
        })
    }
    return deps 
}