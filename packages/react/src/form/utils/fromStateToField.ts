import { isNumber } from "../../utils/isNumber"
import type { AutoFormFieldInfo } from "../Form"
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

export function fromStateToField(fieldInfo:AutoFormFieldInfo,value:any,options:UseFormOptions<any>){
    const fromState = options.fromState || defaultFromState    
    fieldInfo.inputs.forEach(input=>{
         const part = input.dataset.fieldPart        
        // 转换值,以便可以写入到表单元素中
        const v = fromState(fieldInfo.name,value,part)        
        if(input.type === "checkbox"){
            input.checked = Boolean(v)
        }else if(input.type === "radio"){
            input.checked = input.value === v
        }else if(input.type === "file"){
            // 不支持文件类型
        }else{
            input.value = v || ''
        }
    })
}