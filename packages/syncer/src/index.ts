/**
 * 
 * import { Syncer } from '@autostore/sync';
import { AutoStore } from '../../core/src/store/store';
 * 
 * const syncer = new AutoStoreSyncer(store);
 * 
 * 
 * const store1 = syncer.fork(path1,{});
 * const store2 = syncer.fork(path2,"");
 * 
 * 
 * 
 * 
 * - 将fromStore1的数据同步到tostore
 * - store1的数据也会同步到fromStore1
 * 
 * 
 * syncer.sync();
 * 
 *
 * 
 * 
 */

import { AutoStore, Dict, PATH_DELIMITER } from 'autostore';
import { get as getByPath } from "flex-tools/object/get"

export type AutoStoreSyncerOptions = {

} 

export type AutoStoreForkOptions = {
    entry? : string
    sync?  : boolean        // copy, sync
    filter?: (key:string,value:any)=>boolean
} 


export type AutoStoreFork = {
    off():void
}


export class AutoStoreSyncer<State extends Dict = Dict>{
    private _store:AutoStore<State>
    private _forkStores:AutoStore<any>[] = []
    private _options:AutoStoreSyncerOptions
    constructor(store:AutoStore<State>,options?:AutoStoreSyncerOptions){
        this._store = store;
        this._options = Object.assign({},options);
    }
    fork<State extends Dict = Dict>(options?:AutoStoreForkOptions):AutoStore<State>{
        if(!this._store){
            throw new Error("store is not initialized");
        }
        const { entry } = Object.assign({},options)


        const snap = getByPath(this._store.getSnap(),entry || '');

        const store = new AutoStore<State>(snap);
        

        this._forkStores.push(store);
        return store;
    }



}