import type { AutoTemplateEngine } from "./engine";
import type { AutoTemplateStackedContext } from "./context";
import { AutoTemplateDirectiveBase } from "./directives/base";
import { getVal, type Watcher } from "autostore";
import { getDirectives } from "./directives/utils/getDirectives";
import { createDirectives } from "./directives/utils/createDirectives";

/**
 * 简单状态路径：仅字母/数字/下划线/$ 组成的段，以点分隔。
 * 用于 watch 双轨分流——只对纯标识符路径走精准 watch，含空格/运算符/符号的
 * 一律走表达式支路（with 求值）。比 isStatePath（允许任意非点字符）更严格。
 */
const SIMPLE_PATH_RE = /^[\w$]+(?:\.[\w$]+)*$/;

export type AutoTemplateBindingOptions = {
    /** 引用模板元素（编译只读输入，保留指令属性） */
    template: HTMLElement;
    /** 引用实际渲染的元素（已移除指令属性） */
    el: HTMLElement;
    /** 该元素上的指令实例列表 */
    directives: AutoTemplateDirectiveBase[];
};

/**
 * 指令更新回调：接收当前最新值。
 *
 * 注意：回调在 `scheduler` flush 时触发，传入的 `value` 是**重新求值后的当前值**，
 * 反映本 tick 内所有变更的累积结果（而非某一次 operate 的值）。
 */
export type ScopeWatchListener = (payload: { value: any }) => void;

/**
 * Q: 为什么要引入 Scope？
 * A: 一个 DOM 元素上可能挂多个指令，Scope 统一管理它们的生命周期与订阅，
 *    并在元素更新/销毁时集中清理（off watcher、递归销毁子作用域）。
 */
export class AutoTemplateScope {
    private _template: WeakRef<HTMLElement>;
    /** 引用实际渲染的元素 */
    readonly _el: WeakRef<HTMLElement>;
    readonly engine: AutoTemplateEngine;
    directives: AutoTemplateDirectiveBase[] = [];
    /** 本作用域持有的 watcher（destroy 时统一 off） */
    watchers: Watcher[] = [];
    /** 本作用域 watch 注册的 update 闭包（refresh 时同步重跑，destroy 时清空）。
     *  用途见 refresh()：x-for 复用项 localScope 原地更新后，驱动项内绑定重新求值并 patch。 */
    private _updates: Array<() => void> = [];
    /** 子作用域集合（x-if 子树、x-for 各项），destroy 时递归清理 */
    children = new Set<AutoTemplateScope>();
    parent: AutoTemplateScope | null = null;

    constructor(engine: AutoTemplateEngine, el: HTMLElement, template: HTMLElement) {
        this._template = new WeakRef(template);
        this._el = new WeakRef(el);
        this.engine = engine;
        this._createDirectives();
    }

    get el() {
        return this._el.deref();
    }
    get template() {
        return this._template.deref();
    }

    /**
     * 注册子作用域（x-if/x-for 编译子模板时调用）。
     * 建立父子关系，使父作用域 destroy 时能递归清理子树全部 watcher。
     */
    addChild(child: AutoTemplateScope): AutoTemplateScope {
        child.parent = this;
        this.children.add(child);
        return child;
    }

    /**
     * 局部作用域数据（x-for 注入的 item/index 等）。
     * 由 compiler 在编译期设置，子作用域继承父的 localScope。
     */
    localScope: Record<string, any> | null = null;
    /** 缓存的聚合视图（localScope 优先于 engine.context） */
    private _scopeView: any = null;

    /**
     * 当前作用域上下文：沿 parent 链逐层查找（自身 localScope 优先，命中不到查父级，直至根 engine.context）。
     *
     * 之所以用 parent 链而非共享栈：watchExpression 把返回的 scope 捕获进闭包，
     * 在 scheduler flush 时跨 tick 异步复用——每层视图必须不可变且互相独立，
     * 不能用 createStackedContext 那种共享可变 push/pop 栈（会在 pop / 兄弟项覆盖后丢值）。
     * 这让嵌套 x-for 内层能解析外层注入的变量（如内层 `row.title` 取到外层 row）。
     */
    getScopeContext(): AutoTemplateStackedContext<any> {
        if (this._scopeView) return this._scopeView;
        // 父级视图：父作用域的聚合视图；无父则退化为根 context
        const parentView = this.parent ? this.parent.getScopeContext() : this.engine.context;
        const local = this.localScope;
        if (!local) {
            // 无自身局部变量：直接复用父级视图（缓存别名，零额外代理）
            this._scopeView = parentView;
            return parentView;
        }
        this._scopeView = new Proxy(parentView, {
            get(_t, k: string | symbol) {
                if (typeof k === "string" && Object.prototype.hasOwnProperty.call(local, k)) {
                    return local[k];
                }
                return (parentView as any)[k];
            },
            has(_t, k: string | symbol) {
                if (typeof k === "string" && Object.prototype.hasOwnProperty.call(local, k)) return true;
                return k in parentView;
            },
        });
        return this._scopeView;
    }

    /**
     * 创建指令实例（按优先级降序排列，大的先执行）。
     */
    private _createDirectives() {
        const directiveDefine = getDirectives(this.template as HTMLElement);
        // createDirectives 内部已按静态 priority 降序排列，无需在此再排序
        this.directives = createDirectives(this.engine, directiveDefine, this);
    }

    /**
     * 订阅状态变化。双轨：
     *
     * - **路径支路**（`isStatePath` 为真，如 `user.name`）→ `store.watch(path)` 精准订阅，最快；
     * - **表达式支路**（如 `a + b`、x-for 内的 `item.name`）→ `collectDependencies` 自动收集读依赖后订阅。
     *
     * **为何表达式不走 `computedObjects.create`**：core 强制该 API 的 scope 只能是根/绝对路径，
     * 无法注入 x-for 的局部 `item`（见 core `computed/computedObjects.ts`）。
     * 故在此用 `store.collectDependencies` + `store.watch(deps)` 自建，与 core 的 `SyncComputedObject` 同构。
     *
     * 两条支路都把回调经 `engine.scheduler` 微任务合并：watcher 仅"标脏"，
     * flush 时重新求值并 patch——同 tick 多次变更只更新一次。
     *
     * @returns 当前值（供指令 `compile` 初始渲染）
     */
    watch(value: string, listener: ScopeWatchListener): any {
        // 有 localScope 时（x-for 子项），变量可能来自局部作用域（如 item），
        // 不能按 state 路径直接订阅——统一走表达式支路（with 解析 localScope + state）。
        if (!this.localScope && SIMPLE_PATH_RE.test(value)) {
            return this.watchPath(value, listener);
        }
        return this.watchExpression(value, listener);
    }

    /** 路径支路：精准订阅单一路径 */
    private watchPath(path: string, listener: ScopeWatchListener): any {
        const store = this.engine.store;
        const read = () => getVal(store.state, path);
        const update = () => listener({ value: read() });
        this._updates.push(update);
        this.watchers.push(store.watch(path, () => this.engine.scheduler.schedule(update)));
        return read();
    }

    /**
     * 表达式支路：collectDependencies 自建。
     *
     * 1. `new Function` 把表达式编译为带 `scope` 形参的 getter；
     * 2. 在聚合作用域上求值一次，期间由 `collectDependencies` 收集读依赖；
     * 3. 用收集到的依赖路径订阅，回调仅标脏，flush 时重新求值。
     */
    private watchExpression(expr: string, listener: ScopeWatchListener): any {
        const store = this.engine.store;
        const scope = this.getScopeContext();
        // 用 with(scope) 把作用域属性暴露为表达式变量，使 `user.first` 能解析到 scope.user.first。
        // new Function 默认松散模式支持 with；scope 是聚合 Proxy，has/get 陷阱联动 store.state。
        const getter = new Function("scope", "args", `with(scope){ return (${expr}); }`) as (
            scope: any,
            args?: any,
        ) => any;
        const deps = store.collectDependencies(() => getter(scope), "read");
        const update = () => listener({ value: getter(scope) });
        this._updates.push(update);
        this.watchers.push(store.watch(deps, () => this.engine.scheduler.schedule(update)));
        return getter(scope);
    }

    /**
     * 同步重跑本作用域注册的全部 update 闭包，并递归刷新所有子作用域。
     *
     * 用途：x-for 复用项时，项内 localScope 字段（item / $index / $end 等）已原地更新，
     * 需让项内全部绑定（含 `$end` 这类订阅为空、store 不会自动触发的 watcher）重新求值并 patch DOM。
     *
     * 同步直跑、不进 scheduler：render 自身已在 scheduler flush 内执行，update 闭包内的 listener
     * 直接 patch DOM，避免双重调度；同步也保证 render 返回时 DOM 已是最新。
     *
     * 递归 children 覆盖项内嵌套 x-for（触发其 render）、eager x-if 子树、x-text 等所有子绑定。
     * 已 destroy 的子作用域已从 children 移除，自然跳过。
     */
    refresh(): void {
        for (const update of this._updates) {
            try {
                update();
            } catch (e: any) {
                this.engine.logger.error(e);
            }
        }
        for (const child of this.children) {
            child.refresh();
        }
    }

    /**
     * 读取表达式/路径的当前值（不建立订阅）。
     *
     * 供 x-for 等"已在 `created` 自行订阅、仅需在回调中重读最新值"的指令使用。
     * 求值方式与 `watch` 保持一致：纯路径走 `getVal`，否则走 `with(scope)` 表达式求值
     * （使 `items.filter(x => x.active)` 这类表达式能取到经筛选/映射后的数组，
     * 而非被 `getVal` 当作点分路径读成 undefined）。
     *
     * @returns 表达式当前值；求值异常时记录日志并返回 undefined（由调用方做数组化等兜底）
     */
    read(value: string): any {
        if (!this.localScope && SIMPLE_PATH_RE.test(value)) {
            return getVal(this.engine.store.state, value);
        }
        const scope = this.getScopeContext();
        const getter = new Function("scope", `with(scope){ return (${value}); }`) as (scope: any) => any;
        try {
            return getter(scope);
        } catch (e: any) {
            this.engine.logger.error(`scope.read: eval "${value}" failed: ${e?.message ?? e}`);
            return undefined;
        }
    }

    /**
     * 编译：依次执行指令的 `created`（建立订阅）→ `compile`（初始渲染）。
     *
     * `created` 必须先于 `compile` 执行——`watch` 在 created 中建立，
     * 随后 compile 用 `watch` 返回的当前值做首次 DOM 写入。
     */
    compile() {
        return this.runDirectives(this.directives);
    }

    /**
     * 串行执行指令生命周期：先全部 created，再全部 compile。
     * 同一阶段的指令按优先级顺序（已由 `_createDirectives` 排好）。
     */
    runDirectives(directives: AutoTemplateDirectiveBase[]): void {
        for (const d of directives) {
            if (typeof d.created === "function") d.created();
        }
        for (const d of directives) {
            if (typeof d.compile === "function") d.compile(this.engine.context, this.el!);
        }
    }

    /**
     * 销毁：先从父级脱离，再递归销毁子作用域（子树 watcher 批量 off），
     * 然后 off 自身 watcher，最后触发各指令的 destroy 钩子。
     */
    destroy() {
        try {
            // 从父级 children 移除自身：否则 x-for 全量重建 / x-if 子树切换时，旧项 scope 虽
            // 已 destroy（watcher 已 off），却仍残留在父 children Set 中 → 僵尸 scope 永久驻留（内存泄漏）。
            // Set 迭代中删除「当前元素」安全（既不跳过后续、也不重复访问）。
            this.parent?.children.delete(this);
            for (const child of this.children) {
                child.destroy();
            }
            this.children.clear();
            for (const watcher of this.watchers) {
                watcher.off();
            }
            this.watchers.length = 0;
            this._updates.length = 0;
            for (const d of this.directives) {
                if (typeof d.destroy === "function") d.destroy(this.el!);
            }
        } catch (e: any) {
            this.engine.logger.error(e);
        }
    }
}
