import { COMPUTED_DESCRIPTOR_FLAG } from "../consts"

export function isComputedDescriptorBuilder(value:any){
    return typeof(value) === 'function' && value[COMPUTED_DESCRIPTOR_FLAG]===true
} 