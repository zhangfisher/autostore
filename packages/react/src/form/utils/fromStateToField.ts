import { isNumber } from "../../utils/isNumber"
import type { AutoFormFieldInfo } from "../Form"
import { UseFormOptions } from "../types"

export function fromStateToField(fieldInfo:AutoFormFieldInfo,value:any,options:UseFormOptions<any>){
    const fromState = options.fromState || ((_1:string,value:any,part:string | undefined)=>{
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
            return value
        }else{
            return value
        }
    })
    
    fieldInfo.inputs.forEach(input=>{
         const part = input.dataset.fieldPart        

        // 转换值,以便可以写入到表单元素中
        const v = fromState(fieldInfo.name,value,part)



        if(Array.isArray(fromState)){
            
        }else{

        }

    })


}