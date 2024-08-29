import type { AutoStore } from "../store";
import { Dict } from "../types";
import { createExtendDescriptor } from "../utils/createExtendDescriptor";

/**
 * 
 * 
 */
export class ExtendMixin<State extends Dict>{
    
    protected installExtend(this:AutoStore<State>,path:string[],value:any,parentPath:string[],parent:any){
        const extendDescriptor = createExtendDescriptor(value)
        const extendCtx = { path,value,parentPath,parent }
        if(extendDescriptor){
            if(extendDescriptor.type==='computed'){
                this.createComputed(extendCtx,extendDescriptor)
            }

        }else{
            return value
        }        
    }

}