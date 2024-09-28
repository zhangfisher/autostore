import { OBSERVER_DESCRIPTOR_FLAG } from "../consts";

export function isComputedDescriptor(value:any):boolean{
    return typeof(value) === 'object' 
        && Object.hasOwn(value,'getter')
        && Object.hasOwn(value,'options')
        && value[OBSERVER_DESCRIPTOR_FLAG]===true
} 