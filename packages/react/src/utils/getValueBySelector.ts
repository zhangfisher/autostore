import { ComputedState, Dict, getVal, isAsyncComputedResult, PATH_DELIMITER } from "@autostorejs/core"
import { ReactAutoStore } from "../store"



export type StateValueSelector<State extends Dict = Dict> = undefined | string[] | string | ((state:ComputedState<State>)=>any)


/**
 * 根据选择器获取store中的值
 * 
 * 此函数旨在从一个React的自动store中提取数据。它支持多种类型的选择器，包括函数、数组或字符串。
 * 该函数的灵活性允许开发者以更复杂的方式检索数据，例如通过嵌套属性或使用自定义选择器函数。
 * 
 * @param {ReactAutoStore<State>} store - React的自动store对象，包含state
 * @param {StateValueSelector<State>} selector - 数据选择器，可以是函数、数组或字符串，用于指定如何从store的state中获取数据
 * @param {boolean} [extendAsync=false] - 是否扩展异步支持（可选，默认为false）
 * @returns {any} 根据选择器从store中获取的值，可以是任何类型
 */ 
export function getValueBySelector<State extends Dict>(store:ReactAutoStore<State>,selector:StateValueSelector<State>,extandAsync?:boolean):any{
    if(!selector) return store.state
    let value:any
    if(typeof(selector)==='function'){
        value = selector(store.state)
    }else if(Array.isArray(selector)){
        value = getVal(store.state,selector)
    }else{
        value = getVal(store.state,selector.split(PATH_DELIMITER))
    } 
    if(isAsyncComputedResult(value) && extandAsync){
        value = value.result
    }
    return value
}