import { isNumber } from "../../utils/isNumber"
import type { AutoFormFieldContext } from "../Form"
import { UseFormOptions } from "../types"


function defaultFromState(_:string,value:any,part:string | undefined){
    if(!part) return value
    if(Array.isArray(value) && isNumber(part)){
        return value[part]
    }else if(typeof(value) === "object"){
        return value[part]
    }else if(typeof(value)==='string'){ // 视为正则表达式，从字符串中提取
        const matched = value.match(new RegExp(part))
        if(matched){ // 如果有匹配组，则返回第一个匹配组
            return matched.length===1 ? matched[0] : matched[1]   
        } 
    }
    return value
}



/**
 * 将表单状态转换为字段值，并更新对应的表单元素。
 * @param fieldInfo - 表单字段信息。
 * @param value - 需要转换的值。
 * @param options - 表单使用的选项，包括状态转换函数。
 * @returns 如果字段值发生变化则返回 true，否则返回 false。
 */
export function fromStateToField(fieldInfo:AutoFormFieldContext,value:any,options:UseFormOptions<any>){
    const fromState = options.fromState || defaultFromState    
    let changed:boolean = false
    fieldInfo.inputs.forEach(input=>{
         const part = input.dataset.fieldPart        
        // 转换值,以便可以写入到表单元素中
        const v = fromState(fieldInfo.path,value,part)    
        const oldVal = input.type==='checkbox' ? input.checked : input.value    
        let newVal:any
        if(input.type === "checkbox"){
            newVal = Boolean(v)
        }else{
            newVal = v || ''
        }
        if(oldVal !== newVal){
            if(input.type === "checkbox"){
                input.checked= newVal
            }else{
                input.value = newVal
            }
            changed=true
        }
    })
    return changed
}