import { ComputedState, Dict, getVal, PATH_DELIMITER } from "@autostorejs/core"
import { ReactAutoStore } from "../store"



// 当依赖变化时读取依赖目标的值
export function getValueBySelector<State extends Dict>(store:ReactAutoStore<State>,selector:undefined | string[] | string | ((state:ComputedState<State>)=>any)){
    if(!selector) return store.state
    if(typeof(selector)==='function'){
        return selector(store.state)
    }else if(Array.isArray(selector)){
        return getVal(store.state,selector)
    }else{
        return getVal(store.state,selector.split(PATH_DELIMITER))
    } 
}