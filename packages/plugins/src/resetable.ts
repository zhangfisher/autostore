/**
 * resetable 插件
 *
 * 为 AutoStore 注入可重置（resetable）能力：
 *   - store.resetable = true 后监听所有写操作，记录每个路径首次变化前的旧值
 *   - store.reset() 将所有被改动过的路径恢复到首次变化前的值
 *   - store.reset(entry) 仅重置指定路径前缀下的变化
 *
 * 计算属性路径（以 # 开头）不会被记录。
 *
 * @example
 *
 * import { createStore } from "autostore";
 * import { resetable } from "@autostorejs/plugins";
 *
 * const store = createStore({ user: { name: "tom", age: 18 } });
 * resetable(store);          // 安装插件（若 options.resetable=true 会自动开启）
 * store.resetable = true;
 *
 * store.state.user.name = "jerry";
 * store.state.user.age = 20;
 * store.reset();             // 恢复 name=tom, age=18
 * store.reset("user.age");   // 仅恢复 age
 */

import { AutoStore, setVal, splitPath } from "autostore";
import type { AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "./utils/installPlugin";

// 在原型上定义 resetable 属性
Object.defineProperty(AutoStore.prototype, "resetable", {
    configurable: true,
    get(this: AutoStore<Dict, any>): boolean {
        return this.options.resetable ?? true;
    },

    set(this: AutoStore<Dict, any>, value: boolean): void {
        // _updatedWatcher 为内部字段（不对外暴露类型），统一通过 self 访问
        const self = this as any;
        if (value) {
            // 已启用则直接返回，避免重复创建侦听器
            if (self._updatedWatcher) return;

            // 初始化记录容器：路径 -> 首次变化前的旧值
            this.updatedState = {};

            // 创建侦听器并保存到实例
            self._updatedWatcher = this.watch(
                ({ path, oldValue }) => {
                    if (path.length === 0) return;

                    const pathKey = path.join(this.delimiter || ".");

                    // 只记录非计算属性（不以 # 开头）且未记录过的路径
                    if (
                        !pathKey.startsWith("#") &&
                        this.updatedState &&
                        !(pathKey in this.updatedState)
                    ) {
                        console.log(pathKey, "=", oldValue);
                        this.updatedState[pathKey] = oldValue;
                    }
                },
                { operates: "write" },
            );

            // store 卸载时自动清理侦听器，避免内存泄漏
            this.once?.("unload", () => {
                self._updatedWatcher?.off();
                self._updatedWatcher = undefined;
            });
        } else {
            // 关闭侦听器并清空记录
            if (self._updatedWatcher) {
                self._updatedWatcher.off();
                self._updatedWatcher = undefined;
            }
            this.updatedState = {};
        }

        // options 在 AutoStore 构造后必然存在，直接写入
        this.options.resetable = value;
    },
});

// 在原型上注入 reset 方法：批量恢复所有被改动过的路径
AutoStore.prototype.reset = function (this: AutoStore<Dict, any>, entry?: string): void {
    if (!this.resetable || !this.updatedState) {
        this.logger.warn("Resetable 未启用，请先执行 store.resetable = true");
        return;
    }

    const updatedState = this.updatedState;
    const delimiter = this.delimiter || ".";
    const prefix = entry ? `${entry}${delimiter}` : "";

    // 在批量更新内直接写状态树，避免逐次触发更新
    // 说明：恢复写回会触发上面的侦听器，但路径已存在于 updatedState 中、不会被重复记录，
    // 因此 reset 保持幂等，无需清空 updatedState。
    this.batchUpdate((state: any) => {
        for (const [pathKey, oldValue] of Object.entries(updatedState)) {
            if (entry && !pathKey.startsWith(prefix)) continue;
            setVal(state, splitPath(pathKey, delimiter), oldValue);
        }
    });
    this.emit("reset", entry);
};

/**
 * resetable 插件入口
 *
 * 安装后若 options.resetable 为 true，会自动开启监听
 */
export function resetable(store: AnyAutoStore) {
    store.resetable = store.options.resetable ?? true;
}

// 类型增强：为 AutoStore 暴露插件注入的成员
declare module "autostore" {
    export interface AutoStore<State extends Dict, Options = unknown> {
        /**
         * 是否启用重置功能
         * 启用后会监听所有写操作，记录每个路径首次变化前的旧值
         */
        resetable: boolean;
        /**
         * 将所有被改动过的路径恢复到首次变化前的值
         * @param entry 仅重置该路径前缀下的变化
         */
        reset(entry?: string): void;
        /** 记录的旧值（路径 -> 首次变化前的旧值） */
        updatedState?: Dict;
    }
}

installPlugin(resetable);
