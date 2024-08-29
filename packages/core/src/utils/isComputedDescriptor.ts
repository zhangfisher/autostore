import { DYNAMIC_DESCRIPTOR_FLAG } from "../consts";

export function isComputedDescriptor(obj:any){
    return typeof(obj) === 'object' 
        && obj.hasOwnProperty("__COMPUTED__") 
        && ["async","sync"].includes(obj.__COMPUTED__)
        && obj.hasOwnProperty("getter")  && typeof(obj.getter) === 'function'
        && obj.hasOwnProperty("options") && typeof(obj.options) === 'object'
        && obj.hasOwnProperty(DYNAMIC_DESCRIPTOR_FLAG)  
}
