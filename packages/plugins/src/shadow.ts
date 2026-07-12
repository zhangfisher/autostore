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

import { AutoStore, isRelPath, PATH_DELIMITER } from "autostore";
import type { AutoStoreOptions, ObserverDescriptor, AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "./utils/installPlugin";

/**
 * shadow 插件入口
 *
 * 给目标 store 挂载 shadow 方法，调用后即可通过 store.shadow(state) 创建影子 store。
 *
 * @param store 目标 AutoStore 实例
 * @returns 无返回值，副作用是给 store 挂载 shadow 方法
 */
export function shadow(store: AnyAutoStore) {
    store.shadow = function <T extends Dict>(state: T, options?: AutoStoreOptions<T>) {
        const shadowStore = new AutoStore(
            state,
            Object.assign({}, options, {
                id: `${store.id}_shadow`,
                getRootScope: () => store.state,
                getShadowStore: () => store,
                debug: store.options.debug,
                shadow: true,
                onObserverBeforeCreate: (descriptor: ObserverDescriptor<any, any, any>) => {
                    //除非显式指定scope，并且scope不能是CURRENT
                    // 因为动态创建的observer不能是CURRENT，也不能是相对路径
                    const scope = descriptor.options.scope;
                    if (!scope || isRelPath(scope)) {
                        descriptor.options.scope = "ROOT";
                    }
                },
            }),
        ) as AutoStore<T>;

        // 将操作转到到shadowStore
        const watcher = store.watch((operate) => {
            operate.shadow = true;
            shadowStore.operates.emit(operate.path.join(PATH_DELIMITER), operate);
        });
        shadowStore.once("unload", () => watcher.off());
        return shadowStore;
    };
}
declare module "autostore" {
    export interface AutoStore<State extends Dict, Options = unknown> {
        /**
         * 基于当前 store 创建一个影子 store（shadowStore）
         *
         * shadowStore 不持有独立业务状态，其计算属性的作用域指向原 store 的 state；
         * 原 store 的写操作会转发到 shadowStore 并触发其计算属性重算。
         *
         * @param state 影子 store 的状态定义（通常只包含 computed 计算属性）
         * @param options 额外的 AutoStore 配置，会与内部 shadow 配置合并
         * @returns 新建的 shadowStore 实例
         */
        shadow<T extends Dict>(state: T, options?: AutoStoreOptions<T>): AutoStore<T>;
    }
}
installPlugin(shadow);
