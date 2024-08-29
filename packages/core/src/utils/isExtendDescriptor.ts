import { STATE_EXTEND_DESCRIPTOR_FLAG } from "../consts";

export function isExtendDescriptor(obj:any){
    return typeof(obj) === 'object' 
        && obj.hasOwnProperty("getter")  && typeof(obj.getter) === 'function'
        && obj.hasOwnProperty("options") && typeof(obj.options) === 'object'
        && obj.hasOwnProperty(STATE_EXTEND_DESCRIPTOR_FLAG)  
}
