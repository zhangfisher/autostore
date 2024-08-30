import { isAsyncFunction } from "../utils/isAsyncFunction";
import { SKIP_PROXY_FLAG, DYNAMIC_DESCRIPTOR_FLAG } from "../consts";
import { ComputedDescriptor } from "../computed/types";
import { isValueDescriptor } from "../utils/isValueDescriptor";
import { DynamicValueDescriptor } from './types';


export function createDynamicValueDescriptor(value:any): DynamicValueDescriptor  | undefined{
    let descriptor : ComputedDescriptor | undefined
    if(isValueDescriptor(value)){    
        value[SKIP_PROXY_FLAG] = true
        descriptor = value
    }else if(typeof value === 'function'){        
        // 只是简单的函数，没有任何配置参数，则视为是一个计算属性
        descriptor = {
            type             : 'computed',
            getter           : value,
            [DYNAMIC_DESCRIPTOR_FLAG]: true,
            [SKIP_PROXY_FLAG]: true,
            options          : {
                async        : isAsyncFunction(value)
            }            
        }
    }
    return descriptor
}