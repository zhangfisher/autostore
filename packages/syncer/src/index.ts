/**
 * 
 * import { Syncer } from '@autostore/sync';
import { AutoStore } from '../../core/src/store/store';
 * 
 * const syncer = new AutoStoreSyncer([
 *  fromStore1,
 *  [
 *      tostore1,{},
 *      tostore2,{}
 *  ],
 *  
 * });
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


export type SyncerOptions = {

}

export type SyncToStore = [ AutoStore,SyncerOptions] 

export class AutoStoreSyncer{
    private _fromStore:AutoStore
    constructor(fromStore:AutoStore,toStores:AutoStore | [AutoStore]){

    }
}