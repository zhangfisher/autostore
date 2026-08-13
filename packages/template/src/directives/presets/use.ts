import { AutoTemplateDirectiveBase } from "../base";
import type { ComponentDef } from "../component-def";
import type { AutoTemplateScope } from "../../scope";
import { releaseComponentStyle } from "../../utils/scopedStyle";

/**
 * 判定 x-use 值是否为**字面量组件名**（不经表达式求值，ADR-0022 决策五）。
 *
 * 纯标识符 / 连字符段（如 `counter`、`my-card`、`UserAvatar`）视为字面量组件名——直接作组件名使用，
 * 不当状态路径订阅（避免 `x-use="counter"` 误读 state.counter）。含表达式特征（点、运算符、花括号、
 * 空格等）的值走 watch 表达式求值（支持响应式组件名/props）。
 */
function isLiteralComponentName(raw: string): boolean {
    // 字母/数字/下划线/$/连字符 组成的单段标识符（连字符允许 kebab-case 组件名）
    return /^[A-Za-z_$][\w$-]*$/.test(raw);
}

/**
 * x-use：组件实例化指令（ADR-0022 决策五）。
 *
 * 在模板中实例化一个已声明的组件（局部 x-component 或全局 options.components）。机制：
 * - 取组件冻结快照（经 `scope.getComponent(name)` 沿链就近 + 全局兜底）；
 * - **宿主化身组件根**（T4=B）：经 `compileChild` 的 `reuseEl` 复用宿主节点身份，清空其原内容、
 *   编译组件快照子树挂入；宿主属性继承到组件根（class 合并拼接、style 合并冲突键组件根优先、
 *   其他属性不覆盖；x-use/x-component 不复制）；
 * - props 响应式：x-use 值若是对象字面量，作为组件 data 域的覆盖值（后于 data() 默认注入，
 *   R1=A 合并顺序）；值变时 `Object.assign` 更新声明键，组件内绑定经 getContext 重读自动刷新；
 * - 组件语义：`compileChild` 传 componentDef，注入 data()/methods/hooks、置 isComponent=true。
 *
 * **结构指令冲突（U3）**：x-use 与 ownsChildren 指令（x-if/x-for/x-slot/x-switch/x-tree）同元素
 * → 编译期 warn + 拒绝实例化（宿主原内容保持，不破坏渲染）。x-use 自身不声明 ownsChildren，
 * 而是在 created 中检测同 scope 的其他 ownsChildren 指令，避免触发 `_resolveOwnership` 的通用报错。
 *
 * **递归保护（T5=A）**：组件模板内 `x-use="自身名"` 实例化自身（树形/菜单组件）。沿 scope 链
 * 向上统计同名组件实例化深度，超上限（默认 100）warn + 停止，防无限递归。
 *
 * **异步占位（R6=B）**：组件定义尚未加载（x-import fetch 中）时，宿主显示 loading 态；
 * 就绪后替换为组件实例。当前阶段实现同步路径（组件已注册即实例化），异步占位在 x-import 阶段补全。
 *
 * @example 实例化组件
 * <div x-use="counter"></div>
 * @example 传 props（注入组件 data 域，覆盖 data() 默认）
 * <div x-use="{ label: '外部传入' }"></div>
 */
export class UseDirective extends AutoTemplateDirectiveBase {
    /** 介于结构指令（if=80/for=100）之下、普通指令之上，保证 x-use 在兄弟指令前实例化 */
    static override readonly priority = 70;
    static override readonly singleton = true;

    /** 递归实例化深度上限（T5=A，防无限递归） */
    private static readonly MAX_DEPTH = 100;

    /** 当前实例化的组件实例 scope（destroy 时级联销毁） */
    private instanceScope: AutoTemplateScope | null = null;
    /** 当前实例化的组件名（用于递归深度统计 + props 更新时重新取组件） */
    private componentName: string | null = null;
    /** 当前实例化的组件 def（缓存，props 更新时复用） */
    private instanceDef: ComponentDef | null = null;
    /** pending 组件名（异步加载中，组件未就绪；监听 component/registered 后重试实例化，R6=B） */
    private pendingName: string | null = null;
    /** pending 期间的 props（组件就绪重试时复用） */
    private pendingProps: Record<string, any> | undefined;
    /** component/registered 监听解绑函数 */
    private registeredUnsub: (() => void) | null = null;

    override created() {
        // 结构指令冲突检测（U3）：同元素含其他 ownsChildren 指令 → warn + 拒绝实例化
        if (this._hasStructuralConflict()) {
            this.engine.logger.warn(
                `x-use: 宿主元素含其他结构指令（x-if/x-for/x-slot/x-switch/x-tree），与 x-use 实例化互斥，已跳过实例化（ADR-0022 决策五-5）。`,
            );
            return;
        }
        const raw = this.value == null ? "" : String(this.value).trim();
        if (raw === "") {
            this.engine.logger.warn(`x-use: 缺少组件名，已跳过实例化。`);
            return;
        }
        // 值解析双轨（ADR-0022 决策五）：
        // - 纯标识符（如 `x-use="counter"`）→ **字面量组件名**，不经表达式求值（counter 不是状态变量）；
        // - 含表达式/对象字面量（如 `x-use="{name:'counter',count:1}"` 或 `x-use="compVar"`）→ 经 watch 求值
        //   （支持响应式：组件名/props 随状态变化）。纯标识符特判避免把组件名误当状态路径订阅。
        if (isLiteralComponentName(raw)) {
            // 字面量组件名：直接实例化（无 props，无响应式订阅）
            this.engine.scheduler.schedule(() => this._onValueChange(raw));
            return;
        }
        // 表达式/对象：watch 求值（响应式），值变触发重新实例化或 props 更新
        const initial = this.binding.watch(this.value, ({ value }) => this._onValueChange(value));
        // 首次实例化 defer 到 microtask：created 在 compileElement 内同步跑，宿主尚未挂进父树
        // （transformElement 的 appendChild 还没发生），实例化需 parentNode/属性继承稳定。
        this.engine.scheduler.schedule(() => this._onValueChange(initial));
    }

    /**
     * 同元素是否含其他 ownsChildren 结构指令（U3 冲突检测）。
     *
     * 经 engine.directives 查各指令类的静态 `ownsChildren(info)`——与 compiler._resolveOwnership
     * 同源判定，但不触发通用报错，而是 warn + 跳过实例化。
     */
    private _hasStructuralConflict(): boolean {
        return this.binding.directives.some((d) => {
            if (d.info.name === "use") return false;
            const cls = this.engine.directives.get(d.info.name);
            return !!cls?.ownsChildren?.(d.info);
        });
    }

    /**
     * x-use 值变化处理：解析组件名 + props → 实例化或更新。
     *
     * - 值为字符串：作为组件名，无 props；
     * - 值为对象：取 `name`/`is` 字段作组件名，其余作 props（约定：对象必须含组件名标识字段）；
     *   若对象无 name/is 字段 → warn（无法确定实例化哪个组件）。
     */
    private _onValueChange(value: any): void {
        let name: string | undefined;
        let props: Record<string, any> | undefined;
        if (typeof value === "string") {
            name = value.trim();
        } else if (value && typeof value === "object") {
            name = (value.name ?? value.is ?? value.component) as string | undefined;
            if (typeof name === "string") {
                // 其余键作 props（排除 name 标识字段）
                const rest: Record<string, any> = { ...value };
                delete rest.name;
                delete rest.is;
                delete rest.component;
                props = Object.keys(rest).length > 0 ? rest : undefined;
            }
        }
        if (!name) {
            this.engine.logger.warn(
                `x-use: 无法解析组件名（值须为字符串或含 name/is/component 字段的对象），已跳过: ${JSON.stringify(value)}`,
            );
            return;
        }
        // 组件名变化 → 重新实例化（销毁旧实例）
        if (this.componentName !== null && this.componentName !== name) {
            this._destroyInstance();
        }
        this.componentName = name;
        // 已实例化且同名 → 仅更新 props（响应式 data 域）
        if (this.instanceScope && this.instanceDef && this.componentName === name) {
            this._updateProps(props);
            return;
        }
        this._instantiate(name, props);
    }

    /**
     * 实例化组件：宿主 scope 化身组件实例 + 编译组件快照子树。
     *
     * 复用宿主 scope（this.binding）作组件实例 scope，避免同一宿主双 scope 冲突（T4=B 宿主化身组件根）：
     * 1. 注入组件语义（data/methods/hooks/isComponent）到宿主 scope；
     * 2. 属性继承（宿主普通属性保留，组件快照根属性并入，class/style 合并）；
     * 3. compileSubtree 编译组件快照子树到宿主（快照内指令建子 scope，watch 时读到注入的 data）；
     * 4. 手动触发 created/mounted hooks（宿主 scope 的 compile() 已早于组件注入跑过，hooks 须补触发）。
     */
    private _instantiate(name: string, props: Record<string, any> | undefined): void {
        const snapshot = this.binding.getComponent(name);
        if (!snapshot) {
            // 组件未注册（可能正在被 x-import 异步加载）：显示 loading 占位 + 监听就绪后重试（R6=B）
            this._showLoadingPlaceholder(name);
            this._waitForComponent(name, props);
            return;
        }
        // 递归深度保护（T5=A）：沿 parent 链统计同名组件实例化深度
        if (this._recursiveDepth(name) >= UseDirective.MAX_DEPTH) {
            this.engine.logger.warn(
                `x-use: 组件 "${name}" 递归实例化深度超过上限（${UseDirective.MAX_DEPTH}），已停止（疑似无终止条件递归）。`,
            );
            return;
        }
        // def 查找：作用域组件经 _componentDefs（WeakMap，snapshot 为 key）；
        // 全局组件经 _globalComponentDefCache（按 name）——getComponentDef 对全局 snapshot 返回 undefined，
        // 须 fallback getGlobalComponentDef，否则全局组件的 setup(data/methods/hooks)丢失、不注入。
        const def =
            this.engine.getComponentDef(snapshot) ??
            this.engine.getGlobalComponentDef(name) ??
            null;
        this.instanceDef = def;
        this.instanceScope = this.binding; // 宿主 scope 即组件实例 scope
        // 属性继承（T4=B）：组件快照根属性并入宿主（须早于实例化，宿主属性就位后编译子树）
        this._mergeComponentRootAttrs(snapshot);
        // 实例化：注册快照 + 注入语义 + 编译子树 + 触发 hooks（封装在 compiler.instantiateComponent）
        this.engine.compiler.instantiateComponent(this.binding, snapshot, def, props);
        // scoped CSS 注入（ADR-0022 决策四-4）：阶段 5 实现
    }

    /**
     * 组件快照根属性并入宿主（T4=B 属性继承）。
     *
     * 宿主化身组件根，组件快照根的属性（class/style/普通属性）并入宿主：
     * - class：拼接（宿主class + 组件根class）；
     * - style：合并，冲突键组件根优先（组件内部样式不被宿主意外覆盖）；
     * - 其他属性：宿主已有则保留（不覆盖），否则复制组件根属性。
     */
    private _mergeComponentRootAttrs(snapshot: HTMLElement): void {
        const host = this.el;
        for (const attr of Array.from(snapshot.attributes)) {
            if (!attr) continue;
            const name = attr.name;
            // 跳过 x-component 标记属性（不进实例化 DOM）
            if (name === "x-component") continue;
            if (name === "class") {
                const hostClass = host.getAttribute("class") ?? "";
                const merged = (hostClass + " " + attr.value).trim();
                if (merged) host.setAttribute("class", merged);
                continue;
            }
            if (name === "style") {
                const hostStyle = host.getAttribute("style") ?? "";
                // 组件根 style 优先：放前面，冲突时后者（宿主）本应优先但共识要求组件根优先——
                // CSS 同属性后者覆盖前者，故组件根放后面。重新审视：共识"冲突键组件根优先"→ 组件根放后。
                const merged = (hostStyle ? hostStyle + ";" : "") + attr.value;
                if (merged) host.setAttribute("style", merged);
                continue;
            }
            // 其他属性：宿主已有则保留（不覆盖），否则复制
            if (!host.hasAttribute(name)) {
                host.setAttribute(name, attr.value);
            }
        }
    }

    /**
     * 更新 props（组件名不变，props 响应式更新）。
     *
     * Object.assign 进组件实例 scope.data，只覆盖 props 声明的键（组件内部状态不被重置）。
     */
    private _updateProps(props: Record<string, any> | undefined): void {
        if (!props || !this.instanceScope?.data) return;
        Object.assign(this.instanceScope.data, props);
    }

    /**
     * 显示 loading 占位（R6=B，组件异步加载中）。
     *
     * 复用 x-loading 运行时指令：宿主加 `x-loading="true"` 属性，dispatcher 自动 mount 覆盖层。
     * 宿主 x-use 已剥指令属性（Compile 指令），加 x-loading 属性触发 Runtime 指令派发。
     */
    private _showLoadingPlaceholder(_name: string): void {
        this.el.setAttribute("x-loading", "true");
    }

    /** 移除 loading 占位（组件就绪或卸载时） */
    private _hideLoadingPlaceholder(): void {
        this.el.removeAttribute("x-loading");
    }

    /**
     * 监听 component/registered 事件，目标组件就绪后移除占位 + 重新实例化（R6=B 异步占位）。
     */
    private _waitForComponent(name: string, props: Record<string, any> | undefined): void {
        this.pendingName = name;
        this.pendingProps = props;
        if (this.registeredUnsub) return; // 已在监听
        const sub = this.engine.on("component/registered", (m: any) => {
            const payload = m?.payload ?? m;
            if (payload?.name === this.pendingName) {
                const retryName = this.pendingName!;
                const retryProps = this.pendingProps;
                this._clearPending();
                this._hideLoadingPlaceholder();
                // 组件就绪，重新实例化（首次渲染用最新 props）
                this._instantiate(retryName, retryProps);
            }
        });
        this.registeredUnsub = typeof sub === "function" ? sub : () => sub.off();
    }

    /** 清理 pending 状态（组件就绪重试 / 卸载时） */
    private _clearPending(): void {
        this.pendingName = null;
        this.pendingProps = undefined;
        if (this.registeredUnsub) {
            this.registeredUnsub();
            this.registeredUnsub = null;
        }
    }

    /**
     * 沿 parent 链统计同名组件实例化深度（递归保护 T5=A）。
     *
     * 每个 isComponent=true 的祖先 scope 若实例化了同名组件，深度 +1。
     * scope 上记录实例化的组件名（经 scope.componentName，由 compileChild 在 componentDef 在场时设置）。
     */
    private _recursiveDepth(name: string): number {
        let depth = 0;
        let s: AutoTemplateScope | null = this.binding.parent;
        while (s) {
            if (s.isComponent && s.componentName === name) depth++;
            s = s.parent;
        }
        return depth;
    }

    /**
     * 卸载当前组件实例（组件名变化时调用）。
     *
     * 宿主 scope（= 组件实例 scope）不销毁（由 compileElement 生命周期管理），仅：
     * - 触发旧组件的 beforeUnmount + unmounted hooks（组件语义卸载）；
     * - 销毁组件子树建的所有子 scope（compileSubtree 编译的孙 scope）；
     * - 清空宿主子内容、重置组件语义标记，待新组件注入。
     */
    private _destroyInstance(): void {
        // 清理 pending（异步加载中的占位 + 监听）
        this._clearPending();
        this._hideLoadingPlaceholder();
        if (!this.instanceScope) return;
        const scope = this.instanceScope;
        // 触发卸载 hooks
        scope["_runHooks"]("beforeUnmount");
        // 销毁组件子树子 scope（孙 scope，watcher 批量 off）
        for (const child of Array.from(scope.children)) child.destroy();
        scope.children.clear();
        scope["_runHooks"]("unmounted");
        // 释放 scoped 样式引用（计数 -1，归零移除 <style>，ADR-0022 决策四-4）
        if (this.instanceDef?.name) releaseComponentStyle(this.instanceDef.name);
        // 清空宿主内容、重置组件语义
        this.el.replaceChildren();
        scope.hooks = null;
        scope.isComponent = false;
        scope.componentName = null;
        scope.actions = null;
        this.instanceScope = null;
        this.instanceDef = null;
    }

    override destroy(): void {
        // 宿主 scope 销毁由 compileElement 触发（scope.destroy 会调本 destroy + 触发 hooks）；
        // 此处清理 pending 监听 + loading 占位 + 实例引用。组件子树子 scope 随宿主 scope.destroy 递归销毁。
        this._clearPending();
        this._hideLoadingPlaceholder();
        this.instanceScope = null;
        this.instanceDef = null;
    }
}
