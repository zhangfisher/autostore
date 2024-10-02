import { AsyncComputedValue } from "../../dist"
import { ASYNC_COMPUTED_VALUE } from "../consts" 

export function isAsyncComputedValue(value: any): value is AsyncComputedValue{
    return value 
            && typeof value === 'object'  
            && value.hasOwnProperty(ASYNC_COMPUTED_VALUE) 
}