import { Dict, setVal } from "autostore"
import { getInputValueFromEvent } from "../../utils/getInputValueFromEvent"
import type { ReactAutoStore } from "../../store"


export const FAKE_BINDINGS = Symbol('FAKE_BINDINGS')


/**
 * 
 * 构建一个假的对象绑定
 * 
 * @description
 * 
 * 为什么要构建假的对象绑定？
 * 
 * 主要是为了节约内存，如果没有访问到就不需要去创建绑定对象
 * 
 * @param store 
 * @param val 
 * @returns 
 */
export function createFakeObjectBindings<State extends Dict>(store:ReactAutoStore<State>,val:object){
    const bindings = {} as Record<string,any>    
    if (val instanceof Map) {
        val.forEach((value, key) => {
            bindings[key] = FAKE_BINDINGS;
        });
    } else {
        Object.entries(val).forEach(([key])=>{
            bindings[key] = FAKE_BINDINGS
        })    
    }
    return bindings
}

 

export function createInputBinding<State extends Dict>(store:ReactAutoStore<State>,path:string[],val:any){    
    return {
        value:val,
        onChange:(e:any)=>{
            const inputValue = getInputValueFromEvent(e)
            store.update(state=>setVal(state, path,inputValue))
        }
    }   
}
