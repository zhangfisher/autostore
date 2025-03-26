/**
 * 
 * import { clone,sync  } from "@autostorejs/syncer"
 * 
 * installCloneExtend()
 * installSyncExtend()
 * 
 *  
 * const store = new AutoStore({...})
 *  
 * 
 * 
 * 
 * @param options 
 * 
 */
export function installCloneExtend(options){
    // @ts-ignore
    if(!globalThis.__AUTOSTORE_EXTENDS__){
        // @ts-ignore
        globalThis.__AUTOSTORE_EXTENDS__=[]
    }
    // @ts-ignore
    globalThis.__AUTOSTORE_EXTENDS__.push(createCycleDetectExtend(options))
 
}

export type AutoStoreCloneExtendOptions = {

}



function createCloneExtend(options?:AutoStoreCloneExtendOptions){
    return function cloneExtend(store:any){

    }
}