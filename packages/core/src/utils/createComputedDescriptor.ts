import { isAsyncFunction } from "./isAsyncFunction";
import { COMPUTED_DESCRIPTOR_FLAG, COMPUTED_TYPE, SKIP_PROXY_FLAG } from "../consts";
import { isComputedDescriptor } from "./isComputedDescriptor";
import { ComputedDescriptor } from "../computed/types";


export function createComputedDescriptor(value:any):ComputedDescriptor  | undefined{
    let descriptor : ComputedDescriptor | undefined
    if(isComputedDescriptor(value)){
        value[SKIP_PROXY_FLAG] = true
        descriptor = value
    }else if(typeof value === 'function'){        
        descriptor = {
            [COMPUTED_TYPE]: isAsyncFunction(value) ? 'async' : 'sync',
            getter: value,
            options: { },
            [COMPUTED_DESCRIPTOR_FLAG]:true,
            [SKIP_PROXY_FLAG]:true
        }
    }
    return descriptor
}