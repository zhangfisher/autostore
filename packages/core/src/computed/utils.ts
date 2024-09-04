import { COMPUTED_DESCRIPTOR_FLAG } from "../consts";
import { isAsyncFunction } from "../utils/isAsyncFunction";
import { WatchDescriptor } from "../watch/types";
import { ComputedDescriptor } from "./types"; 


export function isComputedDescriptorBuilder(value:any){
    return typeof(value) === 'function' && value[COMPUTED_DESCRIPTOR_FLAG]===true
}

export function isComputedDescriptor(obj:any){
    return typeof(obj) === 'object' 
        && obj.hasOwnProperty("type") && typeof(obj.type) === 'string'
        && obj.hasOwnProperty("getter")  && typeof(obj.getter) === 'function'
        && obj.hasOwnProperty("options") && typeof(obj.options) === 'object'
}

/**
 * 
 * @param value 
 * @returns 
 */
export function getComputedDescriptor(value:any): ComputedDescriptor | WatchDescriptor | undefined{
    let descriptor : WatchDescriptor | ComputedDescriptor | undefined
    if(isComputedDescriptorBuilder(value)){    
        descriptor = value()
    }else if(typeof value === 'function'){        
        // 只是简单的函数，没有任何配置参数，属性简化的计算属性，具有默认的属性
        descriptor = {
            type             : 'computed',
            getter           : value,
            options          : {
                async        : isAsyncFunction(value)
            }            
        }
    }
    return descriptor  
}