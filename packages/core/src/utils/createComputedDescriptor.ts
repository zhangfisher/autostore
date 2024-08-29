import { isAsyncFunction } from "./isAsyncFunction";
import {   SKIP_PROXY_FLAG, DYNAMIC_DESCRIPTOR_FLAG } from "../consts";
import { isComputedDescriptor } from "./isComputedDescriptor";
import { ComputedDescriptor } from "../computed/types";



/**
 * 
 * 根据state中的成员的属性值，创建一个computed描述符
 * 
 * 
 * @param value 
 * @returns 
 */
export function createComputedDescriptor(value:any): ComputedDescriptor  | undefined{
    let descriptor : ComputedDescriptor | undefined
    if(isComputedDescriptor(value)){    
        value[SKIP_PROXY_FLAG] = true
        value[DYNAMIC_DESCRIPTOR_FLAG] = true,
        descriptor = value
    }else if(typeof value === 'function'){        
        // 只是简单的函数，没有任何配置参数
        descriptor = {
            type             : 'computed',
            getter           : value,
            [SKIP_PROXY_FLAG]: true,
            [DYNAMIC_DESCRIPTOR_FLAG]: true,
            options          : {
                async        : isAsyncFunction(value)
            }            
        }
    }
    return descriptor
}