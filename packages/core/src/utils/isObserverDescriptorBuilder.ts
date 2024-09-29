import { OBSERVER_DESCRIPTOR_BUILDER_FLAG } from "../consts"; 

export function isObserverDescriptorBuilder(value:any){
    return typeof(value) === 'function' && value[OBSERVER_DESCRIPTOR_BUILDER_FLAG] === true
}