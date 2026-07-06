/**
 * 级联销毁观察对象特性（cascadeDestroy）
 *
 * @description
 *
 * 当 ObserverObject 的依赖项（depends）或自身挂载路径（path）被删除时，
 * 该观察对象将变成永远不会再次执行的「死对象」。本特性在全局拦截 delete 操作，
 * 命中即自动销毁对应的 ComputedObject / WatchObject。
 *
 * - 仅在 AutoStore 构造时装配一次（全局唯一 delete 拦截）。
 * - 索引、监听器全部闭包在 setupCascadeDestroy 作用域内，多 store 互不干扰。
 * - 复用 pathStartsWith 做前缀覆盖判定；命中后按 id 调集合 delete(id) 完成完整销毁。
 *
 * 触发条件（由 AutoStoreOptions.cascadeDestroy 默认 true 控制，可被单个
 * ObserverOptions.cascadeDestroy 覆盖）：
 *  - 删除路径是被删观察者自身挂载路径（仅 associated 观察者）；
 *  - 或删除路径是其任一依赖的前缀。
 *
 * 实现说明：为何包装 store._notify 而不用 store.watch(onAny)？
 *  - fastevent 的 once 在与 onAny(**) 共存时，_decListenerExecCount 用全局下标
 *    去移除各节点监听器，会导致路径 once 监听器无法被正确移除。
 *  - 在 _notify 源头拦截 delete 可彻底避开该 bug，且不注册任何 operates 订阅。
 */
import type { AutoStore } from "../store/store";
import type { ObserverObject } from "../observer/observer";
import type { StateOperate } from "../store/types";
import { pathStartsWith } from "../utils/pathStartsWith";

/** pathKey(精确路径，用 delimiter 拼接) -> 观察对象 id 集合 */
type ObserverPathIndex = Map<string, Set<string>>;

/**
 * 为 store 装配「级联销毁观察对象」特性。
 *
 * - 由 AutoStore 在 subscribeCallbacks 中调用一次（早于响应树构建，不会漏观察者）。
 * - 返回卸载函数供 store.destroy() 调用；全局关闭（cascadeDestroy === false）时返回 undefined。
 */
export function setupCascadeDestroy(store: AutoStore<any>): (() => void) | undefined {
    if (store.options.cascadeDestroy === false) return;
    const delimiter = store.options.delimiter;
    // 两张 id 索引（精确 path/dep -> id 集合），按 observer.type 分流；schema 不入索引
    const computedIndex: ObserverPathIndex = new Map();
    const watchIndex: ObserverPathIndex = new Map();
    const pickIndex = (obj: ObserverObject) =>
        obj.type === "computed"
            ? computedIndex
            : obj.type === "watch"
              ? watchIndex
              : undefined;

    /** 观察者的索引 key：精确的 path（仅 associated）与每条 dep */
    const getPathKeys = (obj: ObserverObject): string[] => {
        const keys = new Set<string>();
        // 仅「关联」（从 state 内部创建、有真实挂载路径）的观察者才索引其挂载路径；
        // 独立 create() 的观察者 path=[#id]，不对应真实 state，跳过挂载路径，仅索引其依赖。
        if (obj.associated) keys.add(obj.path.join(delimiter));
        for (const dep of obj.depends ?? []) keys.add(dep.join(delimiter));
        return [...keys];
    };
    const indexObserver = (obj: ObserverObject) => {
        const idx = pickIndex(obj);
        if (!idx) return;
        for (const k of getPathKeys(obj)) {
            let s = idx.get(k);
            if (!s) {
                s = new Set();
                idx.set(k, s);
            }
            s.add(obj.id);
        }
    };
    const unindexObserver = (obj: ObserverObject) => {
        const idx = pickIndex(obj);
        if (!idx) return;
        for (const k of getPathKeys(obj)) {
            const s = idx.get(k);
            if (!s) continue;
            s.delete(obj.id);
            if (s.size === 0) idx.delete(k); // 清理空键
        }
    };
    /**
     * 删除路径命中的所有观察者：用 pathStartsWith 判定覆盖，按 id 调集合 delete。
     * 集合 delete 内部会路由到 observer.destroy() 全流程（取消订阅/inflight + 触发事件）。
     */
    const destroyFromIndex = (
        idx: ObserverPathIndex,
        collection: Map<string, any>,
        deletedPath: string[],
    ) => {
        for (const key of [...idx.keys()]) {
            // 快照 keys：destroy 会触发 unindex 修改 Map，避免迭代中漏项
            if (!pathStartsWith(deletedPath, key.split(delimiter))) continue;
            const idSet = idx.get(key);
            if (!idSet) continue;
            for (const id of [...idSet]) collection.delete(id);
        }
    };
    const destroyByPath = (deletedPath: string[]) => {
        destroyFromIndex(computedIndex, store.computedObjects, deletedPath);
        destroyFromIndex(watchIndex, store.watchObjects, deletedPath);
    };

    // cascadeDestroy 开关在「入索引时」判定：关闭者不入索引 → 永不被自动销毁
    const shouldIndex = (obj: ObserverObject) => {
        if (
            ((obj.options as any).cascadeDestroy ??
                store.options.cascadeDestroy ??
                true) !== true
        )
            return false;
        // 仅索引已进入集合的观察者（objectify=false 的 computed 不在集合中，跳过以免索引泄漏）
        return store.computedObjects.has(obj.id) || store.watchObjects.has(obj.id);
    };
    const onCreated = (obj: ObserverObject) => {
        if (shouldIndex(obj)) indexObserver(obj);
    };
    const onDestroyed = (obj: ObserverObject) => unindexObserver(obj);
    store.on("observer:created", onCreated);
    store.on("observer:destroyed", onDestroyed);

    // 包装 store._notify：在原始逻辑之后拦截 delete 操作。
    // 仅在非静默（即真正发射事件）时触发，批量更新时 delete 会在 replyBatchOperates 回放阶段触发。
    const originalNotify = (store as any)._notify.bind(store) as (p: StateOperate) => void;
    (store as any)._notify = (params: StateOperate) => {
        originalNotify(params);
        if (params.type === "delete" && !store.silenting) destroyByPath(params.path);
    };

    return () => {
        (store as any)._notify = originalNotify;
        store.off(onCreated);
        store.off(onDestroyed);
        computedIndex.clear();
        watchIndex.clear();
    };
}
