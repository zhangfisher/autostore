import { PATH_DELIMITER } from "../consts"
import { getVal } from "./getVal"

export function getValueByPath(state:any,path?:string | string[] | ((state:any)=>string | string[]),delimiter=PATH_DELIMITER){
    let paths:string[] = []
    try{
        if(typeof(path)=== 'function'){
            path = path.call(state,state)
        }
        paths = Array.isArray(path) ? path : (typeof(path) === 'string' ? path.split(delimiter) : [])    
        return paths.length > 0 ? getVal(state,paths) : state
    }catch{
        //console.warn(e)
        return state
    }
}
