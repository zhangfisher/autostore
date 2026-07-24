/**
 *
 *  为AutoStore添加扩展功能
 *
 *
 *  export default defineExtend((store)=>{
 *
 *
 *  }
 *
 *
 */

import { IAutoStorePlugin } from "../plugin";

export function installPlugin(plugin: IAutoStorePlugin) {
    if (globalThis.__AUTOSTORE_PLUGINS__) {
        globalThis.__AUTOSTORE_PLUGINS__ = [];
    }
    if (typeof plugin === "function" && !globalThis.__AUTOSTORE_PLUGINS__.includes(plugin)) {
        globalThis.__AUTOSTORE_PLUGINS__.push(plugin);
    }
}
