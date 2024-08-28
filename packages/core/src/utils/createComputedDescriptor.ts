import { isAsyncFunction } from "./isAsyncFunction";
import {  COMPUTED_TYPE, SKIP_PROXY_FLAG } from "../consts";
import { isComputedDescriptor } from "./isComputedDescriptor";
import { ComputedDescriptor } from "../computed/types";


export function createComputedDescriptor(value:any):ComputedDescriptor  | undefined{
    let descriptor : ComputedDescriptor | undefined
    if(isComputedDescriptor(value)){
        value[SKIP_PROXY_FLAG] = true
        descriptor = value
    }else if(typeof value === 'function'){        
        descriptor = {
            getter: value,
            options: { }, 
            [SKIP_PROXY_FLAG]:true,
            [COMPUTED_TYPE]: isAsyncFunction(value) ? 'async' : 'sync',
        }
    }
    return descriptor
}