/**
 * 
 * 本方法在input更改输入时调用，用来实现将输入控件的值写入状态中
 * 
 * 写入逻辑如下：
 * 
 * - 没有part，即没有data-field-part属性时，此时input.value===state.value
 *   此情况比较简单，直接写入即可
 * - 如果有part，即data-field-part属性时
 *      - 当state.value时，data-field-part==array index, 因此state.value[part] = input.value
 *      - 当state.value是对象时，state.value[part] = input.value
 *      - 当state.value是boolean，视为true/false，state.value[part]=Boolean(input.value)
 *      - 当state.value是数字，视为数字，state.value[part]=parseFloat(input.value)
 *      - 当state.value是字符串时，视为正则表达式，input.value替换stateValue的捕获组
 * 
 * 
 */


import { Dict, getVal, setVal } from "autostore";
import { ReactAutoStore } from "../../store";
import { UseFormOptions } from "../types";
import { PATH_DELIMITER } from "autostore";
import { replaceWithRegex } from "./replaceWithRegex";


function defaultToState(this:HTMLInputElement,path:string,value:any,part:string | undefined){
    if(!part) return value
    return value
}
function toTypedValue(val:any,datatype:string | undefined){
    if(!datatype) return val
    if(datatype==='number'){
        return parseFloat(val)
    }else if(datatype==='boolean'){
        return Boolean(val)
    }else if(datatype==='string'){
        return String(val)
    }
    return val

}
export function fromFieldToState<State extends Dict>(store:ReactAutoStore<State>,input:HTMLInputElement,name:string,value:any,options:UseFormOptions<any>):[string,any] | undefined{
    const toState = options.toState || defaultToState
    const part = input.dataset.fieldPart
    const path = name.split(PATH_DELIMITER)
    // 在执行fromStateToField时会将dataType写入data-typeof属性，记住这个属性的原始类型
    const dataType = input.dataset.typeof

    const stateValue = store.peep((state)=>getVal(state,path))

    const typedValue = toTypedValue(value,dataType)
    
    let newValue = toState.call(input,name,typedValue,part)

    if(part){        
        if(Array.isArray(stateValue)){
            stateValue[parseInt(part)]  = newValue
            return [`${name}.${part}`,newValue]
        }else if(typeof(stateValue) === "object"){
            stateValue[part] = newValue
            return [`${name}.${part}`,newValue]
        }else if(dataType==='string'){
            newValue = replaceWithRegex(stateValue,part,value)       
            store.update((state) => { setVal(state, path, newValue); },{ peep: true });    
            return [name,newValue]   
        }        
    }else{
        store.update((state) => { setVal(state, path, newValue); },{ peep: true });
        return [name,newValue]
    }
    
}