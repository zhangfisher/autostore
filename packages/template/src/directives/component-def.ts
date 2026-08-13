import type { AutoTemplateScope } from "../scope";
import type { StyleBind } from "../utils/styleBind";

/**
 * 组件定义的生命周期钩子集合（ADR-0022 决策三）。
 *
 * 四阶段钩子，实例化时从 `<script setup>` 求值结果中按名收集为数组，串行调用（try-catch 容错，
 * 单个失败不影响其余）。挂到实例 scope 的 `hooks` 字段，由 compileChild 实例化流程在对应阶段触发。
 *
 * **砍掉的钩子**（与本引擎架构不契合）：
 * - `activated`/`deactivated`：引擎无组件实例缓存层（scope 销毁即销毁），无自然触发点。
 * - `beforeUpdate`/`updated`：细粒度响应式无"组件整体重渲染"节点。
 */
export type ComponentHookPhase = "created" | "mounted" | "beforeUnmount" | "unmounted";

/**
 * 组件实例 methods 执行时的 this 上下文（ADR-0022 决策二-3）。
 *
 * 复用 `AutoTemplateActionContext` 形态——`data` 是 `scope.getContext()` 聚合视图（含组件 data 域，
 * 响应式、可读可写），`state` 是 `engine.store.state`。组件 methods 注入 `scope.actions` 后，
 * 由 x-on 的 action 求值器（`on/eval.ts`）构造此上下文并 `action.call(ctx, ...)` 调用。
 *
 * 本接口与 `AutoTemplateActionContext` 字段一致，单独声明以表达"组件 methods 的 this"语义。
 */
export interface ComponentMethodContext {
    /** 触发元素（x-on 的目标元素，组件内任意指令元素） */
    el: HTMLElement;
    /** 原生事件（仅 x-on 场景有值） */
    $event?: Event;
    /** 组件聚合数据视图（localData + data(x-use 传入 + data() 返回) + 全局 state），响应式、可写 */
    data: Record<string, any>;
    /** 当前 scope */
    scope: AutoTemplateScope;
    [key: string]: any;
}

/**
 * `<script setup>` 对象字面量求值后的标准形态（ADR-0022 决策四-1/2）。
 *
 * 由 `new Function('return ' + scriptText)()` 求值得到。多个 `<script setup>` 按段分类合并
 * （`data` 收集所有函数、实例化时依次调用合并返回值；`methods` 浅合并；同名 hooks 串行）。
 *
 * - `data`：返回组件初始状态的函数（注入 scope.data 响应式域，**先于** x-use 传入值，后者覆盖）。
 * - `methods`：组件方法对象，注入 `scope.actions`（复用 x-on action 查找，this=ComponentMethodContext）。
 * - `created`/`mounted`/`beforeUnmount`/`unmounted`：四阶段生命周期钩子函数。
 */
export interface ComponentSetup {
    data?: () => Record<string, any>;
    methods?: Record<string, (...args: any[]) => any>;
    /**
     * 组件实例的非响应式局部变量（ADR-0022 决策二-3 (10)）。
     *
     * 注入 `scope._locals`（普通对象、**不进聚合视图**）——模板表达式 `{{x}}` 读不到，仅经 Proxy this
     * 的 `this.<key>` 访问（method/data/framework key 优先级高于 _locals）。典型用途：定时器句柄、
     * 缓存、防抖标记等实例内部状态。多 `<script setup>` 的 locals **浅合并**。
     */
    locals?: Record<string, any>;
    created?: () => void;
    mounted?: () => void;
    beforeUnmount?: () => void;
    unmounted?: () => void;
}

/**
 * 合并后的组件钩子表：每阶段一个函数数组（多个 `<script setup>` 同名 hook 串行）。
 */
export type ComponentHooks = Record<ComponentHookPhase, Array<() => void>>;

/**
 * 组件定义（ADR-0022 决策二-1）。
 *
 * compiler 前置 transformer 命中 x-component 元素时，提取其 `<script setup>` / `<style>` 子节点、
 * 求值合并 setup、深克隆剩余 DOM 为冻结快照，组装成本对象。
 *
 * `getComponent(name)` 返回 HTMLElement 快照（保持 x-loading 等消费者契约不变）；ComponentDef 的额外
 * 元数据（setup/hooks/styles）经 engine 的 `_componentDefs`（WeakMap，以快照根为 key）反查，供 x-use
 * 实例化时取用。
 *
 * **嵌套私有子组件无需定义链**：x-use 实例化父组件 A 时 `compileSubtree` 编译 A 快照子树，内层
 * `x-component="B"` 经 transformElement 再次命中收集器，B 归属到 **A 的实例 scope**
 * （`A实例scope.components`）——运行期 scope 链天然实现严格私有（U5=A），不需定义 scope 链。
 */
export interface ComponentDef {
    /** 组件名（无值 x-component 取 "default"） */
    name: string;
    /** 冻结快照根元素（深克隆、保留指令属性、**已移除** `<script setup>`/`<style>` 子节点、未编译） */
    snapshot: HTMLElement;
    /** 合并后的 setup（data 方法、methods）；无 `<script setup>` 时为 undefined */
    setup: ComponentSetup | undefined;
    /** 合并后的钩子表（从 setup 提取，实例化时克隆到 scope.hooks）；无钩子时为 undefined */
    hooks: ComponentHooks | undefined;
    /** 合并后的组件作用域 CSS 文本数组（每个 `<style>` 一项，**已提取 bind** 后的改写文本）；无 `<style>` 时为 undefined */
    styles: string[] | undefined;
    /**
     * 响应式 `<style>` bind 清单（ADR-0022 决策四-4.1）。
     *
     * 编译期 `extractStyleBinds` 从 `<style>` 声明值的 `bind(expr)` 提取、跨块按 expr 全局去重，
     * 派生 CSS 变量名（纯路径 → `--{路径}`，表达式 → `--h{hash}`）。声明性清单，多实例共享只读、无实例状态。
     * 实例化期（`instantiateComponent`）遍历此清单调 `hostScope.watch(expr)`，求值结果写入组件根元素的
     * CSS 变量（每实例独立）；null/undefined 不写、走 `var(--name, unset)` 回退。无 bind 时为 undefined。
     */
    styleBinds: StyleBind[] | undefined;
}
