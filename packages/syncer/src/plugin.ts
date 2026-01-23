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
import type { AutoStoreSyncerOptions, AutoStoreCloneOptions } from './types';
import { LocalTransport } from './transports/local';

function createSyncerPlugin() {
    return (store: any) => {
        store.sync = function (toStore: AutoStore<any>, options?: AutoStoreSyncerOptions) {
            const localTransport: LocalTransport = new LocalTransport(() => remoteTransport);
            const remoteTransport: LocalTransport = new LocalTransport(() => localTransport);
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
                    local: entry,
                    immediate: false,
                    direction: sync,
                });
            }
            return clonedStore;
        };
    };
}

export function installSyncerPlugin() {
    if (!globalThis.__AUTOSTORE_EXTENDS__) {
        globalThis.__AUTOSTORE_EXTENDS__ = [];
    }
    globalThis.__AUTOSTORE_EXTENDS__.push(createSyncerPlugin());
}
installSyncerPlugin();
