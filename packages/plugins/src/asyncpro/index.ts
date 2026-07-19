/**
 * shadow 插件
 *
 * 为 AutoStore 注入影子 store（shadowStore）能力：
 *   - 调用 shadow(store) 后，store 获得 store.shadow(state) 方法
 *   - shadowStore 基于原 store 派生，自身不持有业务状态，其计算属性/watch 的作用域指向原 store 的 state
 *   - 原 store 的写操作会转发到 shadowStore，触发其计算属性重新计算
 *   - 适用于在不污染原 store 的前提下，派生额外的计算视图（如多维聚合、派生展示字段）
 *
 * shadowStore 的 id 为 `${原store.id}_shadow`，且 options.shadow = true。
 * 由于 shadowStore 中的 observer 是动态创建的，其 scope 会被强制设为 ROOT
 * （不能是 CURRENT 或相对路径）。
 *
 * @example
 *
 * import { AutoStore, computed } from "autostore";
 * import { shadow } from "@autostorejs/plugins";
 *
 * const store = new AutoStore({ price: 10, count: 3 });
 * shadow(store);          // 安装插件，挂载 store.shadow 方法
 *
 * const shadowStore = store.shadow({
 *     total: computed((scope) => scope.price * scope.count),
 * });
 *
 * shadowStore.state.total;  // 30
 * store.state.count = 4;
 * shadowStore.state.total;  // 40
 */

import { AutoStore } from "autostore";
import type { AnyAutoStore, Dict, AnyObserverDescriptor, ObserverContext } from "autostore";
import { installPlugin } from "../utils/installPlugin";
import { AsyncComputedObject } from "./async";
import { AsyncComputedProgressbar } from "./types";

/**
 * shadow 插件入口
 *
 * 给目标 store 挂载 shadow 方法，调用后即可通过 store.shadow(state) 创建影子 store。
 *
 * @param store 目标 AutoStore 实例
 * @returns 无返回值，副作用是给 store 挂载 shadow 方法
 */
export function asyncpro(store: AnyAutoStore) {
    const observers = (store.constructor as typeof AutoStore).observers;
    observers["asyncpro"] = (
        store: AnyAutoStore,
        descriptor: AnyObserverDescriptor,
        context?: ObserverContext,
    ) => {
        const computedObj = new AsyncComputedObject(store, descriptor, context);
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    };
}

installPlugin(asyncpro);

declare module "autostore" {
    export interface AutoStore<State extends Dict, Options = unknown> {}
    export interface ObserverObjects {
        asyncpro: AsyncComputedObject;
    }
    export interface AsyncComputedObjects {
        asyncpro: AsyncComputedObject;
    }
    // 异步计算
    export interface AsyncComputedGetterArgs {
        getProgressbar?: (opts?: {
            max?: number;
            min?: number;
            value?: number;
        }) => AsyncComputedProgressbar;
        /**
         * 当计算函数启用超时时，可以指定一个cb，在超时后会调用此函数
         * @param cb
         * @returns
         */
        onTimeout?: (cb: () => void) => void;
        /**
         *
         * 提供一个函数用来获取当前Scope的快照
         * 传入的scope是一个经过Proxy处理的响应式对象，此方法可以对scope进行转换为普通对象
         */
        getSnap?: <T = Dict>(scope: any) => T;
        /**
         * 在执行计算函数时，如果传入AbortController.signal可以用来传递给异步计算函数，用来取消异步计算
         * 例如：fetch(url,{signal:signal})
         */
        abortSignal: AbortSignal;
        /**
         * 用来取消操作正在执行的异步计算函数
         * 异步函数可以通过此方法来取消异步计算
         *
         * @returns
         */
        cancel: () => void;
    }
}
