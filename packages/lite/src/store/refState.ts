import { ObserverObject } from "../observer";
import { AutoStore } from "./store";
import { getVal } from "../utils/getVal";
import { Watcher } from "../watch/types";
import { RefStorePaths, RefStores } from "./types";
import { GetTypeByPath } from "../types";

export type RefStateOptions = {
    /** 当状态值变化时是否自动重新运行计算函数，默认true */
    reactive?: boolean;
    /**
     * 传递给计算对象的run方法的参数
     */
    runArgs?: Record<string, any>;
};

type SplitRefStorePath<P extends string> =
    P extends `@${infer ID extends string}/${infer PATH extends string}`
        ? [ID, PATH]
        : P extends `@${infer ID extends string}`
          ? [ID, ""]
          : [string, string];

export interface RefState {
    <P extends RefStorePaths>(
        path: P,
        options?: RefStateOptions,
    ): [keyof RefStores] extends [never]
        ? any
        : GetTypeByPath<RefStores[SplitRefStorePath<P>[0] & keyof RefStores]["state"], SplitRefStorePath<P>[1]>;
    <Value = any>(path: string, options?: RefStateOptions): Value | undefined;
}

export type RefStateContext = {
    off: () => void;
    ref: RefState;
};

/**
 *
 * ref("xxx.xx")
 *
 * ref("@<模块id>/aaa.aaaa.dd")
 * ref("@<模块id>/aaa.aaaa.dd")
 *
 * @param storeRef
 * @param observerObj
 * @returns
 */
export function createRefState(
    storeRef: WeakRef<AutoStore<any>>,
    observerObj: ObserverObject,
): RefStateContext {
    let watchers: Map<string, Watcher> | null = null; // 懒加载，只在需要时创建

    function ref<Value = any>(
        refPath?: string,
        options?: RefStateOptions,
    ): Value | undefined;
    function ref<P extends RefStorePaths = RefStorePaths>(
        refPath?: P,
        options?: RefStateOptions,
    ): [keyof RefStores] extends [never]
        ? any
        : GetTypeByPath<RefStores[SplitRefStorePath<P>[0] & keyof RefStores]["state"], SplitRefStorePath<P>[1]>;

    function ref(refPath?: any, options?: RefStateOptions): any {
        const refs = storeRef.deref();
        const stores = Array.isArray(refs) ? refs : [refs];

        // 将路径转换为字符串作为 Map 的 key
        const pathKey = (refPath?.startsWith("@") ? refPath : `@/${refPath || ""}`).substring(1);

        const [storeId, path] = pathKey.split("/");
        const store =
            stores.length === 1 && storeId === ""
                ? stores[0]
                : stores.find((v) => v.id === storeId);

        if (stores.length > 0) {
            const { runArgs, reactive = true } = options || {};
            if (reactive) {
                // 懒加载：只在第一次需要时创建 Map
                if (!watchers) {
                    watchers = new Map<string, Watcher>();
                }

                if (store) {
                    // 避免重复监听同一路径
                    if (!watchers.has(pathKey)) {
                        const watcher = store.watch(path, () => {
                            observerObj.run(runArgs);
                        });
                        watchers.set(pathKey, watcher);
                    }
                }
            }
            return getVal(store.state, path);
        }
    }

    return {
        ref,
        off: () => {
            if (watchers) {
                watchers.forEach((w) => w.off()); // 清理所有 watcher
                watchers.clear(); // 清空 Map
                watchers = null; // 释放引用
            }
        },
    };
}
