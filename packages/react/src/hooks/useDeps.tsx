import { getDepends, getVal, isAsyncComputedValue, PATH_DELIMITER, type Dict } from "autostore"
import type { ReactAutoStore } from "../store"
import { useState } from "react"

/**
 * 
 * 创建一个函数钩子，该函数钩子用于返回指定路径的依赖
 * 
 * 
 * @description
 * 
 * - 输入一个字符串路径，转换为路径数组
 * useDeps("order.price") == [["order","price"]]
 * useDeps(["order","price"]) == [["order","price"]]
 * 
 * - 输入一个函数，执行该函数并收集依赖
 * useDeps((state)=>state.order.price* state.order.count)) == [["order","price"],["order","count"]]
 * 
 * 针对异步计算属性
 * 
 * useDeps("order.total")  如果order.total是一个异步计算属性
 * 由于此时order.total是一个AsyncComputedValue对象，真正的计算结果在order.total.value属性中
 * 所以自动添加返回的是[["order","total","value"]]  
 * 这样当watch时就可以监听到异步计算属性的变化
 * 
 */
export function createUseDeps<State extends Dict>(store:ReactAutoStore<State>){ 
    return function(selector:any,extendAsync?:boolean){
        const [deps] = useState(()=>{
           return getDepends(selector,store,extendAsync)
        })        
        return deps
    }
 } 