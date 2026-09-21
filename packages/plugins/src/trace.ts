/**
 * 跟踪函数内部的操作
 *
 * 主要用于调试，跟踪函数内部的操作
 *
 * 比如我们想要知道执行一个state.xxx=1时，会触发哪些操作，可以通过此方法来跟踪
 *
 * 注意： 本方法主要用于调试，不要在生产环境中使用
 *
 * @example
 *
 * - 跟踪同步函数内部的操作
 *   const tracker = store.trace((state) => {
 *       state.xxx.xxx = 1
 *   })
 *   const ops = await tracker.start()
 *
 * - 跟踪异步函数内部的操作
 *   const tracker = store.trace(async (state) => {
 *       await delay(1000)
 *       state.price = 20
 *   })
 *   const ops = await tracker.start()
 *
 * - 提前停止跟踪
 *   const tracker = store.trace(fn)
 *   const ops = await tracker.start((operate) => {
 *       return operate.type === 'set' && operate.path[0] === 'total'
 *   })
 *
 * - 使用超时自动停止
 *   const ops = await tracker.start(undefined, 5000) // 5秒后自动停止
 *
 * - 手动停止跟踪
 *   tracker.stop()
 *
 * @param fn - 要跟踪的函数（支持同步和异步）
 * @param operates - 要跟踪的操作类型过滤
 * @returns StateTracker 实例
 */

import type { StateOperate, Watcher, WatchListenerOptions, AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "./utils/installPlugin";

export type StateTracker = {
    stop: () => void;
    start(isStop?: (operate: StateOperate) => boolean, timeout?: number): Promise<StateOperate[]>;
};

export function trace(store: AnyAutoStore) {
    store.trace = function (
        fn: () => any,
        operates?: WatchListenerOptions["operates"],
    ): StateTracker {
        let watcher: Watcher;
        let started = false;
        const storeRef = store;
        return {
            stop: () => {
                if (watcher) {
                    watcher.off();
                    watcher = undefined!;
                }
            },
            start: async (isStop?: (operate: StateOperate) => boolean, timeout?: number) => {
                if (started) {
                    throw new Error("Trace already started");
                }
                started = true;
                const ops: StateOperate[] = [];
                return new Promise<StateOperate[]>((resolve, reject) => {
                    let timer: ReturnType<typeof setTimeout> | undefined;
                    let resolved = false;

                    const cleanup = () => {
                        if (timer !== undefined) {
                            clearTimeout(timer);
                            timer = undefined;
                        }
                        if (watcher) {
                            watcher.off();
                            watcher = undefined!;
                        }
                    };

                    const safeResolve = (result: StateOperate[]) => {
                        if (resolved) return;
                        resolved = true;
                        cleanup();
                        resolve(result);
                    };

                    const safeReject = (error: any) => {
                        if (resolved) return;
                        resolved = true;
                        cleanup();
                        reject(error);
                    };

                    watcher = storeRef.watch(
                        (operate) => {
                            ops.push(operate);
                            if (isStop?.(operate)) {
                                safeResolve(ops);
                            }
                        },
                        { operates },
                    );

                    if (timeout && timeout > 0) {
                        timer = setTimeout(() => {
                            safeResolve(ops);
                        }, timeout);
                    }

                    Promise.resolve(fn()).then(
                        () => {
                            if (typeof isStop !== "function") {
                                safeResolve(ops);
                            }
                        },
                        (error) => {
                            safeReject(error);
                        },
                    );
                });
            },
        };
    };
}
declare module "autostore" {
    export interface AutoStore<State extends Dict, Options = unknown> {
        trace(fn: () => any, operates?: WatchListenerOptions["operates"]): StateTracker;
    }
}

installPlugin(trace);
