import { ObserverObject } from "../observer";
import { AutoStore } from "./store";
import { getVal } from "../utils/getVal";
import { Watcher } from "../watch/types";

export type RefStateOptions = {
    /** 当状态值变化时是否自动重新运行计算函数，默认true */
    reactive?: boolean;
    /**
     * 传递给计算对象的run方法的参数
     */
    runArgs?: Record<string, any>;
};
export type RefState = <Value = any>(
    path: string | string[],
    options?: RefStateOptions,
) => Value | undefined;

export type RefStateContext = {
    off: () => void;
    ref: RefState;
};

export function createRefState(
    storeRef: WeakRef<AutoStore<any>>,
    observerObj: ObserverObject,
): RefStateContext {
    let watchers: Map<string, Watcher> | null = null;  // 懒加载，只在需要时创建
    return {
        ref: <Value = any>(path?: string | string[], options?: RefStateOptions) => {
            const store = storeRef.deref();
            if (store) {
                const { runArgs, reactive = true } = options || {};
                if (reactive) {
                    // 懒加载：只在第一次需要时创建 Map
                    if (!watchers) {
                        watchers = new Map<string, Watcher>();
                    }

                    // 将路径转换为字符串作为 Map 的 key
                    const pathKey = Array.isArray(path)
                        ? path.join(store.options.delimiter || ".")
                        : path || "";

                    // 避免重复监听同一路径
                    if (!watchers.has(pathKey)) {
                        const watcher = store.watch(pathKey, () => {
                            observerObj.run(runArgs);
                        });
                        watchers.set(pathKey, watcher);
                    }
                }
                return getVal(store.state, path) as Value;
            }
        },
        off: () => {
            if (watchers) {
                watchers.forEach(w => w.off());  // 清理所有 watcher
                watchers.clear();  // 清空 Map
                watchers = null;  // 释放引用
            }
        },
    };
}
