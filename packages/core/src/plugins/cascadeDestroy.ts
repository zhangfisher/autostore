/**
 * 级联销毁观察对象特性（cascadeDestroy）
 *
 * @description
 *
 * 当 ObserverObject 的依赖项（depends）或自身挂载路径（path）被删除时，
 * 该观察对象将变成永远不会再次执行的「死对象」。本特性监听全局 delete 操作，
 * 命中即自动销毁对应的 ComputedObject / WatchObject。
 *
 * - 仅在 AutoStore 构造时装配一次（全局唯一 delete 监听器）。
 * - 不再维护路径索引：删除时直接遍历 store.computedObjects / store.watchObjects，
 *   用 pathStartsWith 判定删除路径是否覆盖观察者的挂载路径或任一依赖。
 * - 销毁操作异步执行（setTimeout）：同一 tick 内的多个 delete 合并为一次遍历，
 *   避免重复全量扫描；store.destroy() 时清理 pending timer。
 *
 * 触发条件（由 AutoStoreOptions.cascadeDestroy 默认 true 控制，可被单个
 * ObserverOptions.cascadeDestroy 覆盖）：
 *  - 删除路径是被删观察者自身挂载路径（仅 associated 观察者）；
 *  - 或删除路径是其任一依赖的前缀。
 *
 * 实现说明：通过 store.watch("**") 监听 delete。
 *  - watch("**") 默认 operates:"write"，delete 属于 write（isMatchOperates 仅排除 get）。
 *  - silenting 时 store._notify 直接 return 不 emit，watch 不会触发，与在 _notify 源头拦截等价。
 *  - batch 回放时每个 delete 分别 emit，watch 逐个收到，与原"回放阶段触发"等价。
 *  - fastevent/lite v2.6.1 已修复 once + onAny 共存时监听器移除 bug，可安全使用 onAny。
 */

import type { ObserverObject } from "../observer/observer";
import type { StateOperate } from "../store/types";
import { AnyAutoStore } from "../types";
import { pathStartsWith } from "../utils/pathStartsWith";

/**
 * 为 store 装配「级联销毁观察对象」特性。
 *
 * - 由 AutoStore 在 subscribeCallbacks 中调用一次（早于响应树构建，不会漏观察者）。
 * - 返回卸载函数供 store.destroy() 调用；全局关闭（cascadeDestroy === false）时返回 undefined。
 */
export function cascadeDestroy(store: AnyAutoStore): (() => void) | undefined {
    if (store.options.cascadeDestroy === false) return;

    /** 单个观察者的级联开关：单个 options 覆盖全局，默认 true */
    const isCascadeEnabled = (obj: ObserverObject): boolean =>
        ((obj.options as any).cascadeDestroy ?? store.options.cascadeDestroy ?? true) === true;

    /**
     * 删除路径是否命中观察者：覆盖其挂载路径（仅 associated）或任一依赖的前缀。
     * 等价于旧索引方案的 getPathKeys + pathStartsWith(deletedPath, key) 反查。
     */
    const isHit = (obj: ObserverObject, deletedPath: string[]): boolean => {
        if (obj.associated && pathStartsWith(deletedPath, obj.path)) return true;
        return (obj.depends ?? []).some((dep) => pathStartsWith(deletedPath, dep));
    };

    // 批量队列：同一 tick 内的多个 delete 合并为一次 setTimeout 遍历（DRY + 避免重复全量扫描）
    let pendingPaths: string[][] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;

    /**
     * 异步执行销毁：直接遍历两个集合，命中即调集合 delete(id)。
     * 集合 delete 内部路由到 observer.destroy() 全流程（取消订阅/inflight + 触发事件）；
     * destroy() 自身已用 Map.prototype.delete.call 规避与集合 delete override 的互相递归。
     */
    const flush = () => {
        timer = undefined;
        const paths = pendingPaths;
        pendingPaths = [];
        const matchAny = (obj: ObserverObject) => paths.some((p) => isHit(obj, p));
        // 直接遍历：destroy 仅删除当前 observer 自身，Map 迭代器对"删除当前项"规范安全，
        // 销毁又是低风险操作，无需数组快照的额外开销。
        for (const obj of store.computedObjects.values()) {
            if (obj.destroyed || !isCascadeEnabled(obj) || !matchAny(obj)) continue;
            store.computedObjects.delete(obj.id);
        }
        for (const obj of store.watchObjects.values()) {
            if (obj.destroyed || !isCascadeEnabled(obj) || !matchAny(obj)) continue;
            store.watchObjects.delete(obj.id);
        }
    };
    // watch("**") 注册到 operates.onAny，收到所有写操作；仅处理 delete。
    const watcher = store.watch(
        "**",
        (operate: StateOperate) => {
            if (operate.type !== "delete") return;
            pendingPaths.push(operate.path);
            if (timer === undefined) timer = setTimeout(flush, 0);
        },
        {},
    );
    store.once("unload", () => {
        watcher.off();
        if (timer !== undefined) clearTimeout(timer);
        timer = undefined;
        pendingPaths = [];
    });
}
