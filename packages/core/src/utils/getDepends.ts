import { PATH_DELIMITER } from "../consts"
import type { AutoStore } from "../store/store"
import { Dict } from "../types"
import { getVal } from "./getVal"
import { isAsyncComputedValue } from "./isAsyncComputedValue"


/**
 * 获取依赖项列表
 * 
 * 如果是函数，则执行函数并收集依赖
 * 
 * @param selector - 选择器，可以是字符串、字符串数组或函数
 * @param store - AutoStore 实例
 * @param extendAsync - 是否扩展异步计算属性，默认为 true
 * @returns 依赖项列表
 */
export function getDepends<State extends Dict>(selector: string | string[] | Function,store:AutoStore<State>,extendAsync:boolean=true):string[][]{ 
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
    if(extendAsync!==false){
        deps.forEach(dep=>{
            // 获取值,不触发GET事件,即偷看
            let value =  store.peep(state=>getVal(state,dep))
            if(isAsyncComputedValue(value)){
                dep.push("value")
            }
        })
    }
    return deps 
}