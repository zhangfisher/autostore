import type { AutoStore } from "../store";
import { Dict } from "../types";
import { createExtendDescriptor } from "../utils/createExtendDescriptor";

/**
 * 
 * 
 */
export class ExtendMixin<State extends Dict>{
    
    protected installExtend(this:AutoStore<State>,path:string[],value:any,parentPath:string[],parent:any){
        const descriptor = createExtendDescriptor(value)
        const extendCtx = { path,value,parentPath,parent }
        if(descriptor){
            if(descriptor.type==='computed'){                
                this.createComputed(extendCtx,descriptor)
            }

        }else{
            return value
        }        
    }

}