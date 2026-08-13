// oxlint-disable typescript/no-this-alias
import type { AutoTemplateEngine } from "./engine";
import type { ComponentHooks } from "./directives/component-def";
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
     * 是配置而非数据，**不参与 getContext 聚合视图**（不污染表达式数据命名空间）。
     * 无 x-options 时为 null。
     */
    hostOptions: Record<string, any> | null = null;
    /**
     * x-data 注入的私有响应式数据域（指向 `store.state._scopes[scope.id]`）。
     *
     * 由 `DataDirective` 在 `created()` 首次注入时令本字段指向 `store.state._scopes[id]`（core 自动
     * 建响应式代理）。**永不换引用**——`_scopeView` Proxy 闭包绑定该引用；运行时更新只 `Object.assign`
     * 原地改（见 `engine.data`），绝不整体替换。与 `locals` 同级叠加进 `getContext`。
     *
     * 读写经 store 响应式代理 → `collectDependencies` 收集 `_scopes.<id>.<field>` 精准路径，
     * 字段级细粒度更新（**响应式**，无需 refresh——与 locals 的 refresh 驱动不同）。
     *
     * 父子元素的 data 经 parent 链层叠（子覆盖父同名键）；容器 x-data 经 parent 链
     * 自动透传进 x-for 各 item scope（item.parent = 容器 scope）。
     *
     * 字段名 `_data`（ADR-0022 决策二-3 修订）：对外暴露 `data` 改为 getter 返回 `getContext()`
     * 聚合视图（供 Proxy this 的 `this.data`），引擎内部读写响应式域用 `_data`。
     */
    _data: Record<string, any> | null = null;
    /**
     * data 聚合视图 getter（ADR-0022 决策二-3 修订）。
     *
     * 返回 `getContext()`——locals + _data + parent 链 + 全局 state 的聚合 Proxy 视图（响应式、
     * 可读可写）。供 Proxy this 的 `this.data`、外部便捷访问。底层响应式域经 `_data` 字段访问。
     */
    get data(): Record<string, any> {
        return this.getContext();
    }
    /**
     * 组件实例的内部方法容器（ADR-0022 决策二-3 修订）。
     *
     * 由 `<script setup>` 的 methods 经 `injectComponentSemantics` 注入（不再进 `scope.actions`，
     * 与 action 彻底分离）。method 经 `getMethod`（组件边界）查找、`getMethodThis()`（Proxy）调用——
     * method 内 `this` 是 Proxy，`this.<method名>` 直调/互调。普通 scope（非组件实例）为 null。
     */
    methods: Record<string, (...args: any[]) => any> | null = null;
    /**
     * 组件实例的非响应式局部变量（ADR-0022 决策二-3 (10)）。
     *
     * 由 `<script setup>` 的 `locals` 段经 `injectComponentSemantics` 注入。**普通对象、不进聚合视图**
     *（getContext 不含 _locals）——模板表达式读不到，仅经 Proxy this 的 `this.<key>` 访问
     *（method/data/framework key 优先级高于 _locals）。典型用途：定时器句柄、缓存、防抖标记。
     * 非组件实例 scope 为 null。
     */
    _locals: Record<string, any> | null = null;
    /** 本作用域持有的 watcher（destroy 时统一 off） */
    watchers: Watcher[] = [];
    /** 本作用域 watch 注册的 update 闭包（refresh 时同步重跑，destroy 时清空）。
     *  用途见 refresh()：x-for 复用项 locals 原地更新后，驱动项内绑定重新求值并 patch。 */
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
        this.engine.emit("scope/created", { id: this.id, el, template });
    }

    get el() {
        return this._el.deref();
    }
    get template() {
        return this._template.deref();
    }
    /**
     * 访问全局状态
     */
    get state() {
        return this.engine.state;
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
     * x-for 注入的局部数据（item/index 等循环派生变量）。
     *
     * 由 compiler 在编译期设置，子作用域继承父的 locals（嵌套 x-for 内层取外层 item）。
     * **进聚合视图**（getContext 第一优先级 locals > data），故模板表达式 `x-text="item.name"` 可见。
     * 普通对象、非响应式（x-for 复用项时原地 Object.assign + scope.refresh 驱动重渲染）。
     *
     * 原名 `localData`（ADR-0022 决策二-3 (10) 更名），与新 `_locals`（组件私有局部变量，不进聚合视图）区分。
     */
    locals: Record<string, any> | null = null;
    /**
     * 本作用域局部事件 action（由 `<script type="actions">` 在编译期注入）。
     *
     * 与 locals/data 同级参与 getAction 的 parent 链查找（子覆盖父，命中即止）；
     * scope destroy 时随 scope 对象回收，无需手动清理。null 表示本层无局部 action。
     */
    actions: Record<string, (...args: any[]) => any> | null = null;
    /**
     * 组件实例的生命周期钩子（ADR-0022 决策三）。
     *
     * 仅组件实例 scope 持有（x-use 实例化时从 ComponentDef.hooks 克隆而来）；普通 scope 为 null。
     * 四阶段：created（compile 前）/ mounted（compile 后）/ beforeUnmount（destroy 开头，watcher 仍活）/
     * unmounted（destroy 结尾）。由 compileChild 实例化流程与 scope.destroy 分别触发（`_runHooks`）。
     * 每个 phase 是函数数组（多个 `<script setup>` 同名 hook 串行合并），单个失败 try-catch 不阻断其余。
     */
    hooks: ComponentHooks | null = null;
    /**
     * 是否为组件实例 scope（ADR-0022 决策二）。
     *
     * 组件本质上是一个特殊 scope——由 x-use 实例化时（compileChild 传入 componentDef）置 true。
     * 区别于普通 scope（x-for 项 / x-if 子树 / x-data 块等）：组件实例持有 data（合并 data() + props）、
     * methods（scope.actions）、hooks（四阶段生命周期）。供内部判定与调试观察。普通 scope 恒 false。
     */
    isComponent = false;
    /**
     * 组件实例化的组件名（ADR-0022 决策五-递归保护）。
     *
     * 仅组件实例 scope 有值（compileChild 传 componentDef 时取 def.name）；普通 scope 为 null。
     * 供 x-use 的递归深度统计：沿 parent 链统计同名组件实例化深度，防无限递归（T5=A）。
     */
    componentName: string | null = null;
    /**
     * x-component 收集的命名组件冻结快照（ADR-0022，承接 ADR-0021）。
     *
     * compiler 前置 transformer 命中 `x-component` 元素时，将其**深克隆副本**（保留指令属性、未编译；
     * `<script setup>`/`<style>` 已在收集期提取并移除）按名存入**最近祖先 scope** 的本字段，
     * 并把原元素从渲染树摘除。key 为组件名（无值 `x-component` 取 `default`）；value 为冻结快照 HTMLElement。
     *
     * **`default` 唯一性已放宽**（ADR-0022 决策四-4）：同名组件直接归属同一 scope 时 warn + 后者覆盖
     * （不再抛错）；沿 parent 链允许就近覆盖（内层遮蔽外层）。其他组件名自由、可多 scope 同名。
     *
     * 消费者（x-loading/x-empty/x-error…）经 `getComponent(name)` 沿 parent 链就近取用
     * （到顶兜底全局组件），命中则替换默认 UI，未命中回退默认实现（组件兜底）。
     * 本字段**仅在收集到组件时才创建**，多数 scope 无组件 → null，避免给每个 scope 平白分配空对象（YAGNI）。
     */
    components: Record<string, HTMLElement> | null = null;
    /** 缓存的聚合视图（命中优先级：locals > data > parent 链 > engine.state） */
    private _scopeView: any = null;

    /**
     * 当前作用域上下文：沿 parent 链逐层查找（自身 locals 优先，命中不到查父级，直至根 engine.state）。
     *
     * 之所以用 parent 链而非共享栈：watchExpression 把返回的 scope 捕获进闭包，
     * 在 scheduler flush 时跨 tick 异步复用——每层视图必须不可变且互相独立，
     * 不能用 createStackedContext 那种共享可变 push/pop 栈（会在 pop / 兄弟项覆盖后丢值）。
     * 这让嵌套 x-for 内层能解析外层注入的变量（如内层 `row.title` 取到外层 row）。
     */
    getContext(): Record<string, any> {
        if (this._scopeView) return this._scopeView;
        // 父级视图：父作用域的聚合视图；无父则退化为根 context
        const parentView = this.parent ? this.parent.getContext() : this.engine.state;
        const local = this.locals;
        const data = this._data;
        if (!local && !data) {
            // 无自身局部变量与 x-data 数据：直接复用父级视图（缓存别名，零额外代理）
            this._scopeView = parentView;
            return parentView;
        }
        this._scopeView = new Proxy(parentView, {
            get(_t, k: string | symbol) {
                if (typeof k === "string") {
                    // 命中优先级：locals(x-for 的 item/index) > data(x-data 注入)
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
                // 写入透传（与 get 同序：locals > data）：命中即写对应容器。
                // data = store.state._scopes[id] 是响应式代理——写它触发细粒度更新，
                // 故 `this.data.<x-data字段> = v` 与 `with(data){ <字段>++ }` 直接生效。
                // locals 为普通对象（x-for item），写入不响应式；未命中本层则委托父视图沿链。
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
     * 失效缓存的 `_scopeView`，下次 `getContext()` 重建。
     *
     * 供 `engine.data(el, data)` 在"data 从无到有"（el 原无 x-data，新建私有数据域）后调用——
     * `_scopeView` 是懒缓存（首次构建后冻结），data 新建后旧缓存不含 data 层，须失效重建，
     * 否则子树经 parent 链读不到新数据。
     */
    invalidateScopeView() {
        this._scopeView = null;
    }

    /**
     * 本 scope 或任意祖先是否持有局部数据（`locals` 或 `data`）。
     *
     * 决定 `watch` / `read` 的支路选择：只要有任意一层局部数据，简单路径也可能解析到局部变量
     * （如 x-data 注入的 `a`、x-for 的 `item`），**必须走表达式支路**经 `getContext` 求值，
     * 不能直读 `store.state`（否则 data 中的键被绕过、读到 undefined）。
     *
     * 仅在订阅/读取时调用一次（非每次更新），沿 parent 链 O(深度) 扫描，开销可忽略。
     */
    private hasLocalContext(): boolean {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s.locals || s._data) return true;
            s = s.parent;
        }
        return false;
    }

    /**
     * 沿 parent 链查找事件 action（局部 `<script type="actions">` → 全局 engine.actions）。
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
     * 沿 parent 链查找最近的 x-data 私有响应式域（`data`）。
     *
     * 供 AutoTemplateActionContext 经 `this.scope.getData()` 使用：action 无论挂在 x-data 元素本身
     * 还是其后代，均可拿到"当前所在 x-data 块"的可读可写响应式代理——区别于 `getContext`
     * 返回的只读聚合视图（写已有键会抛 TypeError）。整条链均无 x-data 时返回 null。
     *
     * data 引用恒定（DataDirective 铁律：永不整体替换 `_scopes[id]`），无需缓存；
     * 每次调用沿链 O(深度) 查找，开销可忽略。
     */
    getData(): Record<string, any> | null {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s._data) return s._data;
            s = s.parent;
        }
        return null;
    }

    /**
     * 沿 parent 链就近查找命名组件，到顶兜底全局组件（ADR-0022 决策五，承接 ADR-0021 决策 5/9）。
     *
     * 消费者协议的核心查找：从本 scope 起，向上取首个含该名 component 的祖先 scope，
     * 命中即止（就近覆盖语义——内层 scope 的同名组件遮蔽外层、亦遮蔽全局）。scope 链无命中时
     * 兜底查 `engine.options.components`（全局组件，字符串入参，懒预编译缓存），由 `engine.getComponent`
     * 解析/包装/缓存。整条链（含全局）无命中返回 undefined，由消费者回退其默认实现（组件兜底）。
     *
     * 与 `getAction`/`getData` 的 parent 链查找范式同构（getAction 末端亦兜底 engine.actions）。
     * 供 x-loading 等 Compile/Hybrid 消费指令经 `this.binding.getComponent(name)` 使用；Runtime 指令
     * （无 binding）改用 `engine.getComponent(el, name)`（经 el 反查 scope 后委托本方法）。
     *
     * @param name 组件名（消费者约定名，如 `loading`/`empty`/`error`；自由命名）
     * @returns 组件冻结快照 HTMLElement（未编译、保留指令属性），或 undefined（未命中）
     */
    getComponent(name: string): HTMLElement | undefined {
        let s: AutoTemplateScope | null = this;
        while (s) {
            if (s.components && Object.prototype.hasOwnProperty.call(s.components, name)) {
                return s.components[name];
            }
            s = s.parent;
        }
        // 兜底全局组件（懒预编译缓存，见 engine.getComponent 全局解析）
        return this.engine._resolveGlobalComponent(name);
    }

    /**
     * 沿 parent 链查找组件内部 method（ADR-0022 决策二-3 修订），**以组件实例 scope 为边界**。
     *
     * 查找规则：从本 scope 向上，每遇到 `isComponent` 的祖先 scope 查其 `methods`（命中即止）；
     * 若该祖先（非起点）是组件实例且未命中，**停止**——不穿透到更上层父组件，保证封装。
     *
     * 两种情形统一处理：
     * - 组件 A 内部元素调 method（button scope → A 实例 scope）：命中 A.methods ✓
     * - 子组件 B 内部元素调 method（B 内 button → B 实例 scope）：查 B.methods，未命中即止，
     *   不穿透到父组件 A ✗（封装保证——否则同组件在不同父内行为不同，不可移植）
     *
     * 与 `getAction`（无边界、兜底 engine.actions）的区别：action 是跨组件复用的事件处理器
     * （类比事件冒泡找 handler）；method 是组件私有方法（类比 class method 不穿透实例边界）。
     *
     * @param name method 名
     * @returns 命中的 method 函数，或 undefined（本组件边界内无此 method）
     */
    getMethod(name: string): ((...args: any[]) => any) | undefined {
        let s: AutoTemplateScope | null = this;
        let first = true;
        while (s) {
            if (s.methods && Object.prototype.hasOwnProperty.call(s.methods, name)) {
                return s.methods[name];
            }
            // 组件边界：起点（first）不歇；其后遇到组件实例祖先（非本组件内部元素链上的）查完即止。
            // 实际语义：从任意子 scope 向上，最多查到最近一层组件实例 scope 的 methods 即停。
            if (!first && s.isComponent) {
                return undefined;
            }
            first = false;
            s = s.parent;
        }
        return undefined;
    }

    /**
     * 沿 parent 链查找 method 命中的**所属 scope**（与 `getMethod` 同边界逻辑，但返回 scope 而非函数）。
     *
     * 供 `getMethodThis` 的 Proxy get 陷阱：method 必须以其所属组件实例的 Proxy 为 this，
     * 故需定位 method 所属 scope，再用它的 `getMethodThis()`。组件边界规则同 `getMethod`
     * （遇 isComponent 祖先查完即止，不穿透父组件）。
     *
     * @param name method 名
     * @returns 命中 method 的 scope（其 `.methods[name]` 存在），或 undefined
     */
    private _findMethodOwner(name: string): AutoTemplateScope | undefined {
        let s: AutoTemplateScope | null = this;
        let first = true;
        while (s) {
            if (s.methods && Object.prototype.hasOwnProperty.call(s.methods, name)) {
                return s;
            }
            if (!first && s.isComponent) return undefined;
            first = false;
            s = s.parent;
        }
        return undefined;
    }

    /**
     * method/钩子执行时的 this 代理（ADR-0022 决策二-3 修订，策略 C）。
     *
     * 懒构造、缓存的 Proxy（每 scope 一个）。Proxy get 陷阱暴露集合（白名单）：
     * - `data` → getContext() 聚合视图（响应式、可读可写）
     * - `state` → engine.state
     * - `engine` → engine 实例
     * - `scope` → 本 scope 实例
     * - `el` → 组件根元素（scope.el）
     * - `<method名>` → getMethod 命中（组件边界，支持 `this.inc()`/`this.other()` 直调互调）
     * - `watch`/`read`/`getComponent` → scope 同名方法（bind scope）
     * - `$parent` → 父组件实例的 Proxy（沿链最近 isComponent 祖先的 getMethodThis()，链式向上；无则 null）
     * - 其余 → scope 原生（bind scope，让用户也能用 scope 其他能力）
     *
     * set 陷阱：框架引用键（data/state/engine/scope/el）禁止整体覆盖（warn + 忽略）；
     * 字段写入（`this.data.x = v`）透传到聚合视图。
     *
     * 引擎内部代码用真实 scope（`this` = scope 实例），不经此 Proxy——故 method 名与 scope 原生
     * 方法同名时用户 method 胜出（仅影响用户代码），不破坏引擎内部。
     */
    private _methodThis: any = null;
    getMethodThis(): any {
        if (this._methodThis) return this._methodThis;
        const scope = this;
        const FRAMEWORK_KEYS = new Set(["data", "state", "engine", "scope", "el"]);
        this._methodThis = new Proxy(scope, {
            get(_t, k: string | symbol) {
                if (typeof k !== "string") return Reflect.get(scope, k);
                switch (k) {
                    case "data":
                        return scope.getContext();
                    case "state":
                        return scope.engine.state;
                    case "engine":
                        return scope.engine;
                    case "scope":
                        return scope;
                    case "el":
                        return scope.el;
                    case "$parent":
                        // 沿链找最近 isComponent 祖先的 Proxy（链式：其 get 陷阱递归处理 $parent）
                        return scope._parentComponentProxy();
                    default:
                        break;
                }
                // method 优先（组件边界）：this.inc() / this.other() 互调。
                // method 必须以其**所属组件实例**（getMethod 命中的那个 scope）的 Proxy 为 this——
                // 否则从子 scope 的 Proxy 取 method 时，this 会错绑成子 scope 的 Proxy。
                const owner = scope._findMethodOwner(k);
                if (owner) {
                    return owner.methods![k]!.bind(owner.getMethodThis());
                }
                // 组件响应式 data 域（_data）优先于 _locals（ADR-0022 决策二-3 (10)：Q2 data 优先）。
                // 直接判 _data（聚合视图 Proxy 的 hasOwnProperty 不走 has 陷阱，不可靠）。
                if (scope._data && Object.prototype.hasOwnProperty.call(scope._data, k)) {
                    return scope._data[k];
                }
                // 组件局部变量 _locals：非响应式、不进聚合视图。仅 method/钩子经 this.<key> 访问。
                if (scope._locals && Object.prototype.hasOwnProperty.call(scope._locals, k)) {
                    return scope._locals[k];
                }
                // 其余经聚合视图（x-for locals / parent 链 / 全局 state），支持 this.x 取模板可见的变量
                const view = scope.getContext();
                if (typeof k === "string" && k in view) {
                    return view[k];
                }
                // scope 原生方法/字段（watch/read/getComponent/getAction/...）
                const native = Reflect.get(scope, k);
                return typeof native === "function" ? (native as any).bind(scope) : native;
            },
            has() {
                return true; // 让 with(this) 与存在性检查一致
            },
            set(_t, k: string | symbol, val: any): boolean {
                if (typeof k === "string" && FRAMEWORK_KEYS.has(k)) {
                    scope.engine.logger.warn(
                        `组件 method/hook 内禁止整体覆盖框架引用 "${k}"（如需改数据请逐字段：this.data.${k} = ...）`,
                    );
                    return true; // 静默忽略（不真写入，也不报错）
                }
                // 组件响应式 data 域（_data）已有键 → 写 _data（响应式，Q2 data 优先）。
                if (typeof k === "string" && scope._data && Object.prototype.hasOwnProperty.call(scope._data, k)) {
                    scope._data[k] = val;
                    return true;
                }
                // 组件局部变量 _locals：声明键与新键均写 _locals（非响应式，如 this.timer = setInterval）
                if (typeof k === "string" && scope._locals) {
                    scope._locals[k] = val;
                    return true;
                }
                // 无 _data/_locals（非组件实例 scope）：透传聚合视图兜底
                try {
                    (scope.getContext() as any)[k] = val;
                } catch {
                    /* 聚合视图 set 失败静默 */
                }
                return true;
            },
        });
        return this._methodThis;
    }

    /**
     * 沿 parent 链找最近的 `isComponent` 祖先，返回其 Proxy this（`$parent` 实现）。
     * 无父组件（已是顶层组件）返回 null。
     */
    private _parentComponentProxy(): any {
        let s = this.parent;
        while (s) {
            if (s.isComponent) return s.getMethodThis();
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
        // 有局部数据（自身或祖先的 locals/data）时，变量可能来自局部作用域
        // （如 x-data 的 a、x-for 的 item），不能按 state 路径直接订阅——统一走表达式支路
        // （经 getContext 聚合 locals+data+state 求值）。
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
        const scope = this.getContext();
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
     * 用途：x-for 复用项时，项内 locals 字段（item / $index / $end 等）已原地更新，
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
        const scope = this.getContext();
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
        // 组件实例：created 在指令 created/compile 之前触发（data 已注入、DOM 子树尚未编译）
        this._runHooks("created");
        this.runDirectives(this.directives);
        this.engine.emit("scope/compiled", { id: this.id });
        // 组件实例：mounted 在 DOM 子树编译完成后触发
        this._runHooks("mounted");
    }

    /**
     * 串行执行某阶段的组件生命周期钩子（ADR-0022 决策三 + 决策二-3 修订）。
     *
     * 每个 hook 用 `getMethodThis()` 返回的 **Proxy** 作 this（与 method 的 this 完全统一：
     * data=getContext 视图、state、engine、scope、method 名直调、$parent 等）。单个 hook 抛错
     * try-catch 记 error 不阻断后续 hook（容错）。hooks 为 null（非组件 scope）或该阶段无 hook
     * 时静默无副作用。
     */
    private _runHooks(phase: "created" | "mounted" | "beforeUnmount" | "unmounted"): void {
        const fns = this.hooks?.[phase];
        if (!fns || fns.length === 0) return;
        const ctx = this.getMethodThis();
        for (const fn of fns) {
            try {
                fn.call(ctx);
            } catch (e: any) {
                this.engine.logger.error(
                    `x-component hook "${phase}" 执行失败: ${e?.message ?? e}`,
                );
            }
        }
    }

    /**
     * 串行执行指令生命周期：先全部 created，再全部 compile。
     * 同一阶段的指令按优先级顺序（已由 `_createDirectives` 排好）。
     */
    runDirectives(directives: AutoTemplateDirectiveBase[]): void {
        for (const d of directives) {
            if (typeof d.created === "function") d.created();
            this.engine.emit(("directive/" + d.info.name + "/created") as any, {
                name: d.info.name,
                id: this.id,
            });
        }
        for (const d of directives) {
            if (typeof d.compile === "function") d.compile(this.engine.state, this.el!);
            this.engine.emit(("directive/" + d.info.name + "/compiled") as any, {
                name: d.info.name,
                id: this.id,
            });
        }
    }

    /**
     * 销毁：先从父级脱离，再递归销毁子作用域（子树 watcher 批量 off），
     * 然后 off 自身 watcher，最后触发各指令的 destroy 钩子。
     */
    destroy() {
        try {
            // 组件实例：beforeUnmount 在 watcher off 之前触发（watcher 仍活，可读最终状态做精确清理）
            this._runHooks("beforeUnmount");
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
                this.engine.emit(("directive/" + d.info.name + "/destroyed") as any, {
                    name: d.info.name,
                    id: this.id,
                });
            }
            // 组件实例：unmounted 在指令 destroy 之后、scope/destroyed 之前触发（收尾）
            this._runHooks("unmounted");
        } catch (e: any) {
            this.engine.logger.error(e);
        }
        this.engine.emit("scope/destroyed", { id: this.id });
    }
}
