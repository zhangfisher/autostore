import type { ObserverObject } from "../observer/observer";
import type { AnyObserverObject } from "../observer/types";
import type { ObjectKeyPaths, GetTypeByPath, AnyAutoStore } from "../types";
import type { Watcher } from "../watch/types";
import type { AutoStoreSubscriber } from "../store/types";
import { getVal } from "../utils";

/**
 * 用于扩展声明可扩展
 *declare module "autostore" {
       interface ConfigueableStores{
          <store.id>: Store
       }
    }
 *
*/
export interface RefStores {}

export type RefStorePaths = {
    [K in keyof RefStores]:
        | `@${K & string}`
        | `@${K & string}/${ObjectKeyPaths<RefStores[K]["state"]>}`;
}[keyof RefStores];

export type RefStateOptions = {
    /** 当状态值变化时是否自动重新运行计算函数，默认true */
    reactive?: boolean;
    /**
     * 传递给计算对象的run方法的参数
     */
    runArgs?: Record<string, any>;
};

export type SplitRefStorePath<P extends string> =
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
        : GetTypeByPath<
              RefStores[SplitRefStorePath<P>[0] & keyof RefStores]["state"],
              SplitRefStorePath<P>[1]
          >;
    <Value = any>(path: string, options?: RefStateOptions): Value | undefined;
}

export type RefStateContext = {
    off: () => void;
    ref: RefState;
};

function createRefStateCtx(store: AnyAutoStore, observer: AnyObserverObject, value: any) {
    const _getRefStore =
        value?._getRefStore ||
        (() => {
            const refStore = observer.options.refStore || store.options.refStore;
            if (refStore) {
                return new WeakRef(refStore);
            }
        });
    if (typeof _getRefStore === "function") {
        const storeRef = _getRefStore();
        if (storeRef) {
            observer.refStateContext = createRefState(storeRef, observer as ObserverObject);
        }
    }
}

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
    storeRef: WeakRef<AnyAutoStore | AnyAutoStore[]>,
    observerObj: ObserverObject,
): RefStateContext {
    let watchers: Map<string, Watcher> | null = null; // 懒加载，只在需要时创建

    function ref<Value = any>(refPath?: string, options?: RefStateOptions): Value | undefined;
    function ref<P extends RefStorePaths = RefStorePaths>(
        refPath?: P,
        options?: RefStateOptions,
    ): [keyof RefStores] extends [never]
        ? any
        : GetTypeByPath<
              RefStores[SplitRefStorePath<P>[0] & keyof RefStores]["state"],
              SplitRefStorePath<P>[1]
          >;

    function ref(refPath?: any, options?: RefStateOptions): any {
        const refs = storeRef.deref();
        const stores = Array.isArray(refs) ? refs : [refs];

        // 将路径转换为字符串作为 Map 的 key
        const pathKey = (refPath?.startsWith("@") ? refPath : `@/${refPath || ""}`).substring(1);

        const [storeId, path] = pathKey.split("/");

        const store =
            stores.length === 1 && storeId === ""
                ? stores[0]
                : stores.find((v) => v && v.id === storeId);

        if (store && stores.length > 0) {
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

export function refState(store: AnyAutoStore) {
    const subscribers: AutoStoreSubscriber[] = [];
    // 事件名随 core 0457a1f（2026-08-07）改版：observer:created → observer/${id}/created。
    // 事件按 observer id 命名，订阅侧用 * 通配段捕获所有 observer（FastLiteEvent 支持）。
    subscribers.push(
        store.on("observer/*/created", ({ observer, context }) => {
            createRefStateCtx(store, observer, context?.value);
        }),
    );
    subscribers.push(
        store.on("observer/*/destroyed", (observer) => {
            observer.refStateContext?.off();
        }),
    );
    subscribers.push(
        store.on("observer/*/run", ({ observer, args }) => {
            if (!observer.refStateContext) return; // 未建 ref 上下文的 observer（无 refStore/_getRefStore）跳过
            if (!args.ref) {
                args.ref = observer.refStateContext.ref;
            }
        }),
    );
    store.once("unload", () => {
        try {
            subscribers.forEach((subscriber) => subscriber.off());
        } finally {
            subscribers.splice(0, subscribers.length);
        }
    });
}
