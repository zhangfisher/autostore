/**
 *  跟踪函数内部的操作
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
 *   trace((state)=>{
 *      state.xxx.xxx = 1
 *   },(operate)=>{
 *      console.log(operate)
 *   })
 *
 * - 跟踪异步函数内部的操作???
 *
 *  注意：
 *  由于无法控制异步上下文，特别是在同时运行多个异步trace函数时，不同的trace函数可能会相互干扰，无法区分。
 *  因此，异步函数的跟踪难以实现，只能用在调试时且只运行单个异步trace函数时使用
 *
 *  const store= new AutoStore({
 *      price:10,
 *      count:2,
 *      total: async (state)=>{
 *          await delay(1000)
 *          return state.price * state.count
 *      }
 *  })
 *
 *
 *
 *  const fn = async ()=>{
 *     await fetch('xxxx')
 *     store.state.price = 20
 *     store.state.count= 3
 * }
 * 我们想要知道fn执行时会触发哪些操作，可以通过trace来跟踪
 * const ops = await trace(fn).start()
 *
 *
 *  我们可以看到，fn执行时，只有显式的对price和count，但是由于total是异步计算属性，所以也会触发total的变化。
 *  因此也应该被跟踪，但是由于其是异步计算属性，所以不会被跟踪。
 * 因此需要显式的提供一个abort参数来结束包括异步的跟踪过程
 *
 *
 * stateTracker.stop()  // 取消跟踪
 * const operates = await stateTracker.start((operate)=>{
 *       return operate.type=='set' && path[0]==='total'
 * })  // 开始跟踪
 *
 *
 * @param fn
 * @param operates
 * @returns
 */

import type { StateOperate, Watcher, WatchListenerOptions, AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "./utils/installPlugin";

export type StateTracker = {
    stop: () => void;
    start(isStop?: (operate: StateOperate) => boolean): Promise<StateOperate[]>;
};

export function trace(store: AnyAutoStore) {
    store.trace = function (
        fn: () => any,
        operates?: WatchListenerOptions["operates"],
    ): StateTracker {
        let watcher: Watcher;
        return {
            stop: () => watcher?.off(),
            start: async (isStop?: (operate: StateOperate) => boolean) => {
                const ops: StateOperate[] = [];
                return new Promise((resolve) => {
                    watcher = this.watch(
                        (operate) => {
                            ops.push(operate);
                            if (isStop?.(operate)) {
                                watcher.off();
                                resolve(ops);
                            }
                        },
                        { operates },
                    );
                    Promise.resolve(fn()).finally(() => {
                        if (typeof isStop !== "function") {
                            watcher.off();
                            resolve(ops);
                        }
                    });
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
