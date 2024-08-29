import { ComputedOptions } from "../computed/types"
import { joinValuePath } from "./joinValuePath"


/**
 * 生成计算属性的id
 * @param valuePath 
 * @param idArg ()=>string
 * @returns 
 */
export function getComputedId(valuePath:string[],computedOptions:ComputedOptions){
    let id = ''
    if(computedOptions.id) {
      id = computedOptions.id
    }else{
      id = joinValuePath(valuePath)
    }
    return id 
  }
