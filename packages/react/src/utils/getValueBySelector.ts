import { ComputedState, Dict, getVal, isAsyncComputedValue, PATH_DELIMITER } from "autostore"
import { ReactAutoStore } from "../store"



export type StateValueSelector<State extends Dict = Dict> = undefined | string[] | string | ((state:ComputedState<State>)=>any)


/**
 * 根据选择器获取store中的值
 * 
 * 
 * extandAsyncValue 
 * 
 * 
 * @param {ReactAutoStore<State>} store - React的自动store对象，包含state
 * @param {StateValueSelector<State>} selector - 数据选择器，可以是函数、数组或字符串，用于指定如何从store的state中获取数据
 * @param {boolean} [extandAsyncValue=false] - 可选，默认为false, 是否扩展异步计算值支持，当选择器指向的是一个异步计算属性时，是否自动获取异步计算属性的值
 * @returns {any} 根据选择器从store中获取的值，可以是任何类型
 */ 
export function getValueBySelector<State extends Dict>(store:ReactAutoStore<State>,selector:StateValueSelector<State>,extandAsyncValue?:boolean,setError?:any):any{
    if(!selector) return store.state
    let value:any
    try{        
        if(typeof(selector)==='function'){
            value = selector(store.state)
        }else if(Array.isArray(selector)){
            value = getVal(store.state,selector)
        }else{
            value = getVal(store.state,selector.split(PATH_DELIMITER))
        } 
        if(extandAsyncValue && isAsyncComputedValue(value)){
            value = value.value
        }
    }catch(e:any){
        if(setError){
            return setError(e)
        }
    }    
    return value
}