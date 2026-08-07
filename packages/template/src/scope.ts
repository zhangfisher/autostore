import type { AutoTemplateEngine } from "./engine";
import { AutoTemplateDirectiveBase } from "./directives/base";
import { getVal, type Watcher } from "autostore";
import { getDirectives, getHostOptions } from "./directives/utils/getDirectives";
import { createDirectives } from "./directives/utils/createDirectives";

/**
 * 简单状态路径：仅字母/数字/下划线/$ 组成的段，以点分隔。
 * 用于 watch/read 双轨分流——只对纯标识符路径走精准订阅，含空格/运算符/符号/通配符的
 * 一律走表达式支路（with 求值）。比 isStatePath（允许任意非点字符）更严格。
 */
const SIMPLE_PATH_RE = /^[\w$]+(?:\.[\w$]+)*$/;

/** 纯状态路径判定。导出供指令复用（x-for 据此判断 itemsPath 是否纯路径，
 *  决定是否补 `items.*` 项级监听——表达式 itemsPath 已由 watchExpression 覆盖）。 */
export function isSimpleStatePath(value: string): boolean {
    return SIMPLE_PATH_RE.test(value);
}

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
    /** scope 自增 id 计数器：作为 store.state._scopes[id] 的索引键（x-data 私有响应式域，见 DataDirective） */
    private static _seq = 0;
    /** 本 scope 唯一标识；仅 x-data scope 会在 store.state._scopes[id] 创建对应条目，其余 scope 不占位 */
    readonly id: number;
    private _template: WeakRef<HTMLElement>;
    /** 引用实际渲染的元素 */
    readonly _el: WeakRef<HTMLElement>;
    readonly engine: AutoTemplateEngine;
    directives: AutoTemplateDirectiveBase[] = [];
    /**
     * 元素级宿主选项（`x-options` 解析产物，ADR-0007）。
     *
     * 供同元素所有指令经 `getOption` 回退读取（指令选项未命中时回退到此）。
     * 是配置而非数据，**不参与 getScopeContext 聚合视图**（不污染表达式数据命名空间）。
     * 无 x-options 时为 null。
     */
    hostOptions: Record<string, any> | null = null;
    /** 本作用域持有的 watcher（destroy 时统一 off） */
    watchers: Watcher[] = [];
    /** 本作用域 watch 注册的 update 闭包（refresh 时同步重跑，destroy 时清空）。
     *  用途见 refresh()：x-for 复用项 localScope 原地更新后，驱动项内绑定重新求值并 patch。 */
    private _updates: Array<() => void> = [];
    /** 子作用域集合（x-if 子树、x-for 各项），destroy 时递归清理 */
    children = new Set<AutoTemplateScope>();
    parent: AutoTemplateScope | null = null;

    constructor(engine: AutoTemplateEngine, el: HTMLElement, template: HTMLElement) {
        this.id = ++AutoTemplateScope._seq;
        this._template = new WeakRef(template);
        this._el = new WeakRef(el);
        this.engine = engine;
        this._createDirectives();
        this.engine.broadcast("scope/created", { id: this.id, el, template });
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
    /**
     * x-data 注入的私有响应式数据域（指向 `store.state._scopes[scope.id]`）。
     *
     * 由 `DataDirective` 在 `created()` 首次注入时令本字段指向 `store.state._scopes[id]`（core 自动
     * 建响应式代理）。**永不换引用**——`_scopeView` Proxy 闭包绑定该引用；运行时更新只 `Object.assign`
     * 原地改（见 `engine.data`），绝不整体替换。与 `localScope` 同级叠加进 `getScopeContext`。
     *
     * 读写经 store 响应式代理 → `collectDependencies` 收集 `_scopes.<id>.<field>` 精准路径，
     * 字段级细粒度更新（**响应式**，无需 refresh——与 localScope 的 refresh 驱动不同）。
     *
     * 父子元素的 dataScope 经 parent 链层叠（子覆盖父同名键）；容器 x-data 经 parent 链
     * 自动透传进 x-for 各 item scope（item.parent = 容器 scope）。
     */
    dataScope: Record<string, any> | null = null;
    /**
     * 本作用域局部事件 action（由 `<script type="js/actions">` 在编译期注入）。
     *
     * 与 localScope/dataScope 同级参与 getAction 的 parent 链查找（子覆盖父，命中即止）；
     * scope destroy 时随 scope 对象回收，无需手动清理。null 表示本层无局部 action。
     */
    actions: Record<string, (...args: any[]) => any> | null = null;
    /** 缓存的聚合视图（命中优先级：localScope > dataScope > parent 链 > engine.state） */
    private _scopeView: any = null;

    /**
     * 当前作用域上下文：沿 parent 链逐层查找（自身 localScope 优先，命中不到查父级，直至根 engine.state）。
     *
     * 之所以用 parent 链而非共享栈：watchExpression 把返回的 scope 捕获进闭包，
     * 在 scheduler flush 时跨 tick 异步复用——每层视图必须不可变且互相独立，
     * 不能用 createStackedContext 那种共享可变 push/pop 栈（会在 pop / 兄弟项覆盖后丢值）。
     * 这让嵌套 x-for 内层能解析外层注入的变量（如内层 `row.title` 取到外层 row）。
     */
    getScopeContext(): Record<string, any> {
        if (this._scopeView) return this._scopeView;
        // 父级视图：父作用域的聚合视图；无父则退化为根 context
        const parentView = this.parent ? this.parent.getScopeContext() : this.engine.state;
        const local = this.localScope;
        const data = this.dataScope;
        if (!local && !data) {
            // 无自身局部变量与 x-data 数据：直接复用父级视图（缓存别名，零额外代理）
            this._scopeView = parentView;
            return parentView;
        }
        this._scopeView = new Proxy(parentView, {
            get(_t, k: string | symbol) {
                if (typeof k === "string") {
                    // 命中优先级：localScope(x-for 的 item/index) > dataScope(x-data 注入)
                    if (local && Object.prototype.hasOwnProperty.call(local, k)) return local[k];
                    if (data && Object.prototype.hasOwnProperty.call(data, k)) return data[k];
                }
                return (parentView as any)[k];
            },
            has(_t, k: string | symbol) {
                if (typeof k === "string") {
                    if (local && Object.prototype.hasOwnProperty.call(local, k)) return true;
                    if (data && Object.prototype.hasOwnProperty.call(data, k)) return true;
                }
                return k in parentView;
            },
            set(_t, k: string | symbol, val: any): boolean {
                // 写入透传（与 get 同序：localScope > dataScope）：命中即写对应容器。
                // dataScope = store.state._scopes[id] 是响应式代理——写它触发细粒度更新，
                // 故 `this.data.<x-data字段> = v` 与 `with(data){ <字段>++ }` 直接生效。
                // localScope 为普通对象（x-for item），写入不响应式；未命中本层则委托父视图沿链。
                // 视图结构（Proxy target 引用）不变，仅 set 透传底层容器，不破坏缓存复用语义。
                if (typeof k === "string") {
                    if (local && Object.prototype.hasOwnProperty.call(local, k)) {
                        local[k] = val;
                        return true;
                    }
                    if (data && Object.prototype.hasOwnProperty.call(data, k)) {
                        data[k] = val;
                        return true;
                    }
                }
                return Reflect.set(parentView, k, val);
            },
        });
        return this._scopeView;
    }

    /**
     * 失效缓存的 `_scopeView`，下次 `getScopeContext()` 重建。
     *
     * 供 `engine.data(el, data)` 在"dataScope 从无到有"（el 原无 x-data，新建私有数据域）后调用——
     * `_scopeView` 是懒缓存（首次构建后冻结），dataScope 新建后旧缓存不含 dataScope 层，须失效重建，
     * 否则子树经 parent 链读不到新数据。
     */
    invalidateScopeView() {
        this._scopeView = null;
    }

    /**
     * 本 scope 或任意祖先是否持有局部数据（`localScope` 或 `dataScope`）。
     *
     * 决定 `watch` / `read` 的支路选择：只要有任意一层局部数据，简单路径也可能解析到局部变量
     * （如 x-data 注入的 `a`、x-for 的 `item`），**必须走表达式支路**经 `getScopeContext` 求值，
     * 不能直读 `store.state`（否则 dataScope 中的键被绕过、读到 undefined）。
     *
     * 仅在订阅/读取时调用一次（非每次更新），沿 parent 链 O(深度) 扫描，开销可忽略。
     */
    private hasLocalContext(): boolean {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s.localScope || s.dataScope) return true;
            s = s.parent;
        }
        return false;
    }

    /**
     * 沿 parent 链查找事件 action（局部 `<script type="js/actions">` → 全局 engine.actions）。
     *
     * 查找顺序：本 scope.actions → 各祖先 actions → engine.actions（终点）。
     * 子 scope 同名 action 覆盖祖先（命中即止）。供 OnDirective 求值器（Action 优先策略）使用。
     */
    getAction(name: string): ((...args: any[]) => any) | undefined {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s.actions && Object.prototype.hasOwnProperty.call(s.actions, name)) {
                return s.actions[name];
            }
            s = s.parent;
        }
        return this.engine.actions[name];
    }

    /**
     * 沿 parent 链查找最近的 x-data 私有响应式域（`dataScope`）。
     *
     * 供 OnEvalContext 经 `this.scope.getDataScope()` 使用：action 无论挂在 x-data 元素本身
     * 还是其后代，均可拿到"当前所在 x-data 块"的可读可写响应式代理——区别于 `getScopeContext`
     * 返回的只读聚合视图（写已有键会抛 TypeError）。整条链均无 x-data 时返回 null。
     *
     * dataScope 引用恒定（DataDirective 铁律：永不整体替换 `_scopes[id]`），无需缓存；
     * 每次调用沿链 O(深度) 查找，开销可忽略。
     */
    getDataScope(): Record<string, any> | null {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s.dataScope) return s.dataScope;
            s = s.parent;
        }
        return null;
    }

    /**
     * 创建指令实例（按优先级降序排列，大的先执行）。
     */
    private _createDirectives() {
        const directiveDefine = getDirectives(this.template as HTMLElement);
        // createDirectives 内部已按静态 priority 降序排列，无需在此再排序
        this.directives = createDirectives(this.engine, directiveDefine, this);
        // 元素级宿主选项（x-options）：解析挂 scope，供同元素指令经 getOption 回退读取（ADR-0007）
        this.hostOptions = getHostOptions(this.template as HTMLElement) ?? null;
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
        // 有局部数据（自身或祖先的 localScope/dataScope）时，变量可能来自局部作用域
        // （如 x-data 的 a、x-for 的 item），不能按 state 路径直接订阅——统一走表达式支路
        // （经 getScopeContext 聚合 localScope+dataScope+state 求值）。
        if (!this.hasLocalContext() && isSimpleStatePath(value)) {
            return this.watchPath(value, listener);
        }
        return this.watchExpression(value, listener);
    }

    /**
     * 路径支路：精准订阅指定路径（支持 core 通配符，如 `items.*` 单层、`items.**` 递归）。
     *
     * - 纯路径走 `store.watch(path)` 精准订阅，最快；
     * - path 含通配符时，`read()` 返回值无意义（getVal 取不到通配段），调用方应忽略返回值、
     *   仅依赖回调触发（如 x-for 监听 `items.*` 仅用于触发 render）。
     *
     * 公开供 x-for 等指令订阅通配路径——`scope.watch` 对含 `*` 的路径会误判为表达式走
     * `with` 求值（`with(scope){return items.*}` 语法错），故通配须绕开表达式支路直连此处。
     */
    watchPath(path: string, listener: ScopeWatchListener): any {
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
     *
     * **宽松求值**：getter 抛错（如引用了不存在的局部变量 `a`、x-data 键被运行时删除）时，
     * 记日志并返回 `undefined`——与路径支路读不到键返回 `undefined` 行为一致，避免单个坏表达式
     * 中断整个编译/刷新。`collectDependencies` 用同一安全包装：抛错前已读到的依赖仍被收集。
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
        const safeEval = (): any => {
            try {
                return getter(scope);
            } catch (e: any) {
                this.engine.logger.warn(`scope.watch: eval "${expr}" failed: ${e?.message ?? e}`);
                return undefined;
            }
        };
        // 首次求值与依赖收集合并为一次：在 collectDependencies 的求值回调内缓存结果，
        // 末尾直接返回缓存值——避免再 safeEval() 一次造成的重复求值与重复告警。
        // （flush 时 update 闭包仍每次重新求值，那是必要的。）
        let firstValue: any;
        const deps = store.collectDependencies(() => {
            firstValue = safeEval();
        }, "read");
        const update = () => listener({ value: safeEval() });
        this._updates.push(update);
        this.watchers.push(store.watch(deps, () => this.engine.scheduler.schedule(update)));
        return firstValue;
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
        if (!this.hasLocalContext() && isSimpleStatePath(value)) {
            return getVal(this.engine.store.state, value);
        }
        const scope = this.getScopeContext();
        const getter = new Function("scope", `with(scope){ return (${value}); }`) as (
            scope: any,
        ) => any;
        try {
            return getter(scope);
        } catch (e: any) {
            this.engine.logger.warn(`scope.read: eval "${value}" failed: ${e?.message ?? e}`);
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
        this.runDirectives(this.directives);
        this.engine.broadcast("scope/compiled", { id: this.id });
    }

    /**
     * 串行执行指令生命周期：先全部 created，再全部 compile。
     * 同一阶段的指令按优先级顺序（已由 `_createDirectives` 排好）。
     */
    runDirectives(directives: AutoTemplateDirectiveBase[]): void {
        for (const d of directives) {
            if (typeof d.created === "function") d.created();
            this.engine.broadcast("directive/" + d.info.name + "/created", { name: d.info.name, id: this.id });
        }
        for (const d of directives) {
            if (typeof d.compile === "function") d.compile(this.engine.state, this.el!);
            this.engine.broadcast("directive/" + d.info.name + "/compiled", { name: d.info.name, id: this.id });
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
                this.engine.broadcast("directive/" + d.info.name + "/destroyed", { name: d.info.name, id: this.id });
            }
        } catch (e: any) {
            this.engine.logger.error(e);
        }
        this.engine.broadcast("scope/destroyed", { id: this.id });
    }
}
