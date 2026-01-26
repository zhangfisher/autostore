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
            let localTransport: LocalTransport;
            let remoteTransport: LocalTransport;

            // 创建循环引用的 transport
            // 使用类型断言处理循环依赖的类型推断问题
            localTransport = new LocalTransport({ getPeer: () => remoteTransport } as any);
            remoteTransport = new LocalTransport({ getPeer: () => localTransport } as any);

            // 确定方向
            const direction = options?.direction || 'both';
            // 如果是 forward，local 发送，remote 接收但不回传
            // 如果是 backward，remote 发送，local 接收但不回传
            // 如果是 both，双向都发送和接收
            const localDirection = direction === 'backward' ? 'backward' : 'forward';
            const remoteDirection = direction === 'forward' ? 'backward' : 'both';

            const remoteSyncer = new AutoStoreSyncer(toStore, {
                transport: remoteTransport,
                direction: remoteDirection,
                immediate: false,
            });
            const localSyncerOptions = Object.assign({ immediate: true }, options, {
                transport: localTransport,
            });
            // direction 必须覆盖 options 中的值
            localSyncerOptions.direction = localDirection;
            const localSyncer = new AutoStoreSyncer(store, localSyncerOptions);
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
