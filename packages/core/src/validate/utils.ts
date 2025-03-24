import { AutoStore } from "../store" 

export function getErrorTips(this:AutoStore<any>,errorTips:any,path:string,newValue:any,oldValue:any){
    if(errorTips){
        if(typeof(errorTips)==='function'){
            return errorTips.call(this,path,newValue,oldValue)
        }else{
            return errorTips!
        }
    }
    return `invalid value on path: ${path}`
}