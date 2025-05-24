/**
 * 
 * 为store提供一个AutoStore的sync同步方法
 * 
 * 
 * 
 * 
 * @returns 
 */

function createSyncerExtend() {
    return (store: any) => {

    }
}

export function installSyncerExtend() {
    // @ts-ignore
    if (!globalThis.__AUTOSTORE_EXTENDS__) {
        // @ts-ignore
        globalThis.__AUTOSTORE_EXTENDS__ = []
    }
    // @ts-ignore
    globalThis.__AUTOSTORE_EXTENDS__.push(createCycleDetectExtend(options))

}
