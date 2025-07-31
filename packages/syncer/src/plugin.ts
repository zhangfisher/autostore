/**
 *
 * 为store提供一个AutoStore的sync同步方法
 *
 *
 *
 *
 * @returns
 */

import { getVal, type AutoStore } from 'autostore';
import { AutoStoreSyncer } from './syncer';
import {
    AutoStoreSyncerOptions,
    AutoStoreCloneOptions,
    IAutoStoreSyncTransport,
    StateRemoteOperate,
} from './types';

class LocalTansport implements IAutoStoreSyncTransport {
    ready = true;
    receiveCallback: any;
    isStop: boolean = false;
    constructor(public getPeer: () => LocalTansport) {}
    send(operate: StateRemoteOperate) {
        this.getPeer().receiveCallback(operate);
    }
    receive(callback: any) {
        this.receiveCallback = callback;
    }
    onStop() {
        this.isStop = true;
    }
}

function createSyncerPlugin() {
    return (store: any) => {
        store.sync = function (toStore: AutoStore<any>, options?: AutoStoreSyncerOptions) {
            const localTransport: LocalTansport = new LocalTansport(() => remoteTransport);
            const remoteTransport: LocalTansport = new LocalTansport(() => localTransport);
            const remoteSyncer = new AutoStoreSyncer(toStore, {
                transport: remoteTransport,
            });
            const localSyncer = new AutoStoreSyncer(
                store,
                Object.assign({ immediate: true }, options, {
                    transport: localTransport,
                }),
            );
            localSyncer.peer = remoteSyncer;
            return localSyncer;
        };

        store.clone = function (options?: AutoStoreCloneOptions<any, any>) {
            const { sync, entry = [] } = Object.assign({ sync: 'both' }, this._options, options);
            const state = getVal(this.getSnap(), entry);
            if (typeof state !== 'object') {
                throw new Error(`The clone path must be an object, but got ${typeof state}`);
            }
            const clonedOptions = Object.assign({}, this._options, options);
            const clonedStore = new store.constructor(state, clonedOptions);
            if (sync !== 'none') {
                this.sync(clonedStore, {
                    from: entry,
                    immediate: false,
                    direction: sync,
                });
            }
            return clonedStore;
        };
    };
}

export function installSyncerPlugin() {
    // @ts-ignore
    if (!globalThis.__AUTOSTORE_EXTENDS__) {
        // @ts-ignore
        globalThis.__AUTOSTORE_EXTENDS__ = [];
    }
    // @ts-ignore
    globalThis.__AUTOSTORE_EXTENDS__.push(createSyncerPlugin());
}
installSyncerPlugin();
