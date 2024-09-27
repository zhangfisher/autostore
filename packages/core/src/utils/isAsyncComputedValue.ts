import { ASYNC_COMPUTED_VALUE } from "../consts" 

export function isAsyncComputedValue(value: any): boolean{
    return value 
            && typeof value === 'object'  
            && value.hasOwnProperty(ASYNC_COMPUTED_VALUE) 
}