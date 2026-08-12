import type { StateOperate, StateOperateType } from "../store/types";
import type { WatchObject } from "./watchObject";
import type {
    ObserverDescriptor,
    ObserverDescriptorBuilder,
    ObserverOptions,
} from "../observer/types";
import type { FastEventSubscriber } from "fastevent";

export type WatchListener<Value = any, Parent = any> = (
    operate: StateOperate<Value, Parent>,
) => void;

export type WatchListenerOptions = {
    once?: boolean; // 只侦听一次后自动移除
    operates?: "*" | "read" | "write" | StateOperateType[]; // 只侦听的操作类型
    filter?: (args: StateOperate) => boolean; // 过滤器
    /**
     * 向后代钻取的深度，补足通配符无法表达"自身 + 恰好一级后代"的空缺。
     *
     * 实为三档语义（非连续深度）：
     * - `0`（默认）：仅路径自身被重新赋值时触发。
     * - `1`：自身 + 恰好一级后代（如监听 `order`，则 `order.price` 变化也触发，但 `order.address.city` 不触发）。
     * - `≥2`：自身 + 全部后代（等价于订阅 `order.**`）。
     *
     * 注意：
     * - `depth: 3` 不是"三层深"，而是等价于 `depth: 2`（全部后代）。
     *   需要精确多层（如恰好两层）请直接用 `**` 通配符。
     * - depth > 0 时，回调 `operate.path` 是真实发生变更的后代路径，而非被监听路径。
     * - `once: true` 时 depth 无效，静默降级为 0。
     * - watchAll 模式（`watch(cb)` / `watch("*")` 等）下 depth 被静默忽略。
     * - 多 paths 时对每个 path 各自展开后并集。
     *
     * 详见 ADR-0003。
     */
    depth?: number;
};
export type Watcher = FastEventSubscriber;

export type WatchDependFilter<Value = any> = (path: string[], value: Value) => boolean;

export interface WatchOptions<Value = any> extends ObserverOptions<Value> {
    async?: false;
    filter: WatchDependFilter<Value>;
    raw?: boolean;
}

export type WatchScope<Value = any> = {
    path: string[];
    value: Value;
};

export type WatchGetter<Value = any, DependValue = any> = (
    scope: { path: string[]; value: DependValue },
    args: WatchObject<Value>,
) => Exclude<Value, Promise<any>>; //| undefined

export type WatchDescriptor<Value = any, DependValue = any> = ObserverDescriptor<
    "watch",
    Value,
    WatchScope<DependValue>,
    WatchGetter<Value, DependValue>,
    WatchOptions<Value>
>;

/**
 * @template Value  监听函数的返回值类型
 * @template Scope 监听函数的第一个参数的类型
 */
export type WatchDescriptorBuilder<Value = any, DependValue = any> = ObserverDescriptorBuilder<
    "watch",
    Value,
    WatchScope<DependValue>,
    WatchDescriptor<Value, DependValue>
>;
