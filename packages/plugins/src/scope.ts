/**
 * scope 插件
 *
 *
 * scope用于创建一个状态域，
 *
 * const store = new AutoStore({
 *      order:{
 *         price: 100,
 *         count:4,
 *         total:(scope:any)=>scope.price * scope.count
 *      }
 * })
 *
 * 创建一个状态域
 * const scope = store.scope("order")
 *
 *
 * scope.price ==== store.order.price
 * scope.watch("count") ===  store.watch(["order","price"])
 *
 *
 * scope
 *
 *   1. scope.bindPath = ["a"]
 *
 *     get x==>   store.state["a","x"]
 *
 *  <div id="root">
 *     <div id="a" x-data="{count:1}"> *
 *          <div id="x" x-text="count"></div>
 *          <div id="b" x-data="{count:2}">
 *              <div id="y" x-text="count"></div>
 *          </div>
 *    </div>
 * </div>
 *
 *  state={
 *     _scopes:{
 *        a:{count:1}
 *        b:{count:2,_parent:"a"}
 *     }
 *  }
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import { AutoStore, isRelPath, PATH_DELIMITER } from "autostore";
import type { AutoStoreOptions, ObserverDescriptor, AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "./utils/installPlugin";

/**
 * scope 插件入口
 *
 *
 *
 */
export function scope(store: AnyAutoStore) {}
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
        scope<T extends Dict>(state: T, options?: AutoStoreOptions<T>): AutoStore<T>;
    }
}

installPlugin(scope);
