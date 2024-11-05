import { AsyncComputedValue } from "../computed";
import { PATH_DELIMITER } from "../consts";
import { getVal } from "./getVal";
import { isAsyncComputedValue } from "./isAsyncComputedValue";

/**
 * 
 * 获取对象中指定路径的值,统一处理为异步计算值
 * 
 */
export function getAsyncVal<Value>(obj: any, keyPath: string | string[] | undefined,defaultValue?:any):AsyncComputedValue<Value>{
    const val = getVal(obj,typeof(keyPath)==='string' ?  keyPath.split(PATH_DELIMITER) : keyPath,defaultValue)
    if(isAsyncComputedValue(val)){
        return val
    }else{
        return  {value:val,loading:false,retry:0,error:null,timeout:0,progress:0,run:()=>{},cancel:()=>{}}
    }
}