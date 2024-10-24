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


function defaultToState(path:string,value:any,part:string | undefined,stateValue:any,input:HTMLInputElement){
    if(!part) return value
    if(Array.isArray(stateValue)){
        stateValue[parseInt(part)]  = value
    }else if(typeof(stateValue) === "object"){
        stateValue[part] = value
    }else if(typeof(stateValue)==='string'){ // 视为正则表达式，从字符串中提取
        return stateValue.replace(new RegExp(part),(matched,partValue)=>{
            return matched.replace(partValue,value)
        })            
    }else if(typeof(stateValue)==='boolean'){
        return Boolean(value)
    }else if(typeof stateValue==='number'){
        return parseFloat(value)
    }
    return value
}

export function fromFieldToState<State extends Dict>(store:ReactAutoStore<State>,input:HTMLInputElement,name:string,value:any,options:UseFormOptions<any>){
    const toState = options.toState || defaultToState
    const part = input.dataset.fieldPart
    const path = name.split(PATH_DELIMITER)
    const dataType = input.dataset.typeof
    const stateValue = store.peep((state)=>getVal(state,path))
    let newValue = toState(name,value,part,stateValue,input)
    if(dataType==='boolean'){
        newValue = Boolean(newValue)
    }else if(dataType==='number'){
        newValue = parseFloat(newValue)
    }
    store.update((state) => { setVal(state, name.split(PATH_DELIMITER), newValue); },{ peep: true });
}