import type { IAutoStorePlugin } from "autostore";

export function installPlugin(plugin: IAutoStorePlugin) {
    // @ts-ignore
    if (!globalThis.__AUTOSTORE_PLUGINS__) {
        // @ts-ignore
        globalThis.__AUTOSTORE_PLUGINS__ = [];
    }
    globalThis.__AUTOSTORE_PLUGINS__.push(plugin);
}

declare global {
    // @ts-ignore
    var __AUTOSTORE_PLUGINS__: IAutoStorePlugin[];
}
