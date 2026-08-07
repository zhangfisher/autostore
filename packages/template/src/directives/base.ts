import type { Watcher } from "autostore";
import type { AutoTemplateScope } from "../scope";
import type { AutoTemplateEngine } from "../engine";
import type { AutoDirectiveInfo } from "./types";

/**
 * 指令类别（DirectiveKind）
 *
 * 区分一条指令归属哪条执行通道。值为 const object + 字面量联合（自文档、可序列化、
 * 无 enum 运行时/互操作桎梏），保留 0/1/2 数值身份。
 *
 * - `Compile`(0，默认)：编译时指令，走 scope 通道。
 * - `Runtime`(1)：运行时指令，走 observer 通道。
 * - `Hybrid`(2)：混合指令，两条通道皆走。
 *
 * 详见 docs/adr/0001-directive-kind-system.md。
 */
export const DirectiveKind = {
    /** 编译时指令：编译期变换树、属性被剥除，走 scope 通道（created/compile/destroy） */
    Compile: 0,
    /** 运行时指令：编译器致盲、属性保留，走 observer 通道（mounted/unmounted/attrChanged） */
    Runtime: 1,
    /** 混合指令：scope 通道管反应性 + observer 通道管生命周期，两通道职责正交 */
    Hybrid: 2,
} as const;
export type DirectiveKind = (typeof DirectiveKind)[keyof typeof DirectiveKind];

/**
 * 运行时指令契约（observer 通道）。
 *
 * `Runtime` / `Hybrid` 指令 `extends AutoTemplateDirectiveBase implements RuntimeDirective`。
 * 基类已为三个钩子提供空实现，故调用总安全；此接口仅作编译期契约/文档，运行时判别以
 * `static kind` 为准（`Runtime`/`Hybrid`）。
 */
export interface RuntimeDirective {
    /** 元素被 observer 检测到添加/挂载时调用（建立订阅、初始化） */
    mounted(): void;
    /** 元素被移除时调用（清理资源） */
    unmounted(): void;
    /** 同名属性值变化时调用（仅重绑订阅，保留实例状态如定时器；非 unmount+remount） */
    attrChanged?(newVal: string, oldVal?: string): void;
}

/**
 * 指令基类
 *
 * 所有内置/自定义指令均继承此类。指令名通过 `presetDirectives` 的 key 标识
 * （不使用类的 `static name`——它会被 `Function.name` 覆盖，无法可靠设为 "text" 等）。
 *
 * `priority` / `singleton` / `kind` 为**静态**字段：`createDirectives` 需在实例化之前据它们做
 * 优先级排序、同名单例去重、以及按 kind 分流执行通道，故必须静态可访问。子类用 `static override` 覆盖。
 *
 * ## 执行通道（按 kind 分流，见 ADR-0001）
 *
 * - **scope 通道**（Compile / Hybrid）：编译器建 scope → 实例化 → `created`/`compile`/`destroy`。
 *   `binding` 由 scope 提供，反应式来源 `scope.watch`（相对表达式 / x-data 局部变量 / x-for item）。
 * - **observer 通道**（Runtime / Hybrid）：编译器致盲（不建 scope、不过滤实例化），属性保留在结果
 *   DOM；由 `static initialize` 建立的 MutationObserver 检测 add/remove/attr-change，分别触发
 *   `mounted`/`unmounted`/`attrChanged`。Runtime 实例**无 binding**，反应式来源 `engine.store.watch`
 *   （仅绝对路径/全局表达式，无 scope 相对表达式）。Hybrid 同时具备 binding（scope 通道）与 observer 通道。
 *
 * `el` 与 `binding.el` 解耦：scope 通道实例由构造从 `binding.el` 取得；observer 通道实例由
 * `initialize` 内的工厂直接注入 `el`（无 binding）。
 *
 * ## 类级初始化钩子（所有 kind 通用，可选）
 *
 * `static initialize(engine)` / `static dispose(engine)` 在 engine 初始化/销毁时对**每个注册指令类**
 * 调用一次（不分 kind；晚注册的指令在 `DirectiveManager.set` 时补调）。基类提供 no-op 默认，
 * 指令按需 override——典型用途：runtime 指令建立 per-engine observer、注入全局样式、预编译资源等。
 */
export class AutoTemplateDirectiveBase {
    /**
     * 指令类别（静态，默认 Compile）：决定走哪条执行通道。
     * 子类按需 `static override kind = DirectiveKind.Runtime | Hybrid`。
     */
    static readonly kind: DirectiveKind = DirectiveKind.Compile;
    /**
     * 处理优先级（静态）：值越大越先执行。
     * 典型顺序：x-for(100) → x-if(80) → x-bind/x-on(50) → x-text/x-html(0)。
     */
    static readonly priority: number = 0;
    /**
     * 同名单例策略（静态）：
     * - true（默认）：同名只保留最后声明的，如 `<span x-text="a" x-text="b"/>` 取 b；
     * - false：允许同名多实例，如 `x-class`。
     */
    static readonly singleton: boolean = true;
    /**
     * 是否占有子树（静态，结构指令）：返回 true 时 compiler 跳过该元素子节点的自动递归，
     * 改由指令自行编译/管理子树（如 x-for 重复、x-if 条件销毁）。
     *
     * 默认 false。结构指令按需 override；可依据 info（如修饰符）动态决定——
     * x-if 仅 eager 模式占有子树，`.keep`/`x-show` 不占有。
     */
    static ownsChildren(_info: AutoDirectiveInfo): boolean {
        return false;
    }

    /**
     * 类级初始化钩子（静态，可选，所有 kind 通用）。
     *
     * engine 初始化后（autostart 的 compile 之后）对每个注册指令类调用一次；晚注册的指令在
     * `DirectiveManager.set` 时补调。典型用途：runtime/hybrid 指令建立 per-engine 的
     * MutationObserver、注入全局样式、预编译类级资源。基类 no-op，按需 override。
     *
     * **幂等**：同一 (类, engine) 仅调用一次（由 DirectiveManager 的 _initialized 集合保证）。
     * **回收对称**：建立的资源须在 `dispose(engine)` 中释放。
     */
    static initialize(_engine: AutoTemplateEngine): void {}
    /**
     * 类级销毁钩子（静态，可选，所有 kind 通用）。
     *
     * `engine.destroy()` 时对每个曾 `initialize` 的指令类调用一次。职责：断开 observer、
     * 销毁全部 live 实例、释放类级资源。**不移除**文档级共享资源（如全局 `<style>`——多 engine 共用、
     * 体量可忽略，违背 KISS）。基类 no-op，按需 override。
     */
    static dispose(_engine: AutoTemplateEngine): void {}

    /** 原始指令信息（完整保留，含 name/attr 等） */
    info: AutoDirectiveInfo;
    /** 属性参数，如 @click 的 click、x-bind:title 的 title */
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
    value?: any;
    engine: AutoTemplateEngine;
    /**
     * 所属 scope（scope 通道实例必有；observer 通道的 Runtime 实例实际为 undefined，但永不访问）。
     * Hybrid 实例同时具备 binding（走 scope 通道）与 observer 通道。
     *
     * 类型保持非空：所有 scope 通道指令（Compile/Hybrid）始终由 compiler 提供 scope，访问 `this.binding`
     * 永远安全。Runtime 实例由 `initialize` 工厂以 `binding=undefined` 构造（见构造函数断言），但其代码路径
     * 从不访问 binding——故非空类型对实际使用恒真，避免给全部编译时指令加 `!` 断言的噪音。
     */
    binding: AutoTemplateScope;
    /**
     * 宿主元素。scope 通道实例由构造从 `binding.el` 取得；Runtime 实例由 `initialize` 工厂注入。
     * 与 binding 解耦，两类通道统一通过 `this.el` 访问宿主。
     */
    el: HTMLElement;
    /** 本指令持有的 watcher（由具体指令维护；scope 通道由 scope.destroy 统一 off，Runtime 由 unmounted 自行 off） */
    watchers: Watcher[] = [];

    /**
     * @param engine   引擎实例
     * @param binding  所属 scope（Runtime 实例传 undefined，由调用方随后注入 el）
     * @param info     原始指令信息（来自 getDirectives）；value/attr/modifiers/options 同时提取为便捷字段
     */
    constructor(
        engine: AutoTemplateEngine,
        binding: AutoTemplateScope | undefined,
        info: AutoDirectiveInfo,
    ) {
        this.engine = engine;
        // Runtime 实例 binding 为 undefined；断言为非空以让 scope 通道指令的 this.binding 访问类型安全
        // （Runtime 代码路径从不访问 binding，不变量恒真）。
        this.binding = binding as AutoTemplateScope;
        this.info = info;
        this.value = info.value;
        this.attr = info.attr;
        this.modifiers = info.modifiers;
        this.options = info.options;
        // scope 通道：从 binding 取 el；Runtime 实例 binding 为 undefined → el 暂为 undefined，由 initialize 工厂注入
        this.el = binding?.el as HTMLElement;
    }

    get template() {
        return this.binding?.template;
    }

    /**
     * 读取指令配置（两层 fallback，ADR-0007）。
     *
     * 查询顺序：指令选项（`this.options`，含解析期注入的 modifier 开关）→ 宿主选项
     * （`this.binding.hostOptions`，即 `x-options`）。显式写值（含 `false`）即命中、阻断回退；
     * 两层均无返回 undefined。
     *
     * modifier 与指令选项经此方法等价：`.global` 与 `x-{name}-options="{global:true}"` 统一可读。
     * Runtime 指令（无 binding）仅查指令选项（无宿主选项回退）。
     */
    getOption(key: string): any {
        if (this.options && Object.prototype.hasOwnProperty.call(this.options, key)) {
            return this.options[key];
        }
        const host = this.binding?.hostOptions;
        if (host && Object.prototype.hasOwnProperty.call(host, key)) {
            return host[key];
        }
        return undefined;
    }

    // ── scope 通道钩子（Compile / Hybrid）──────────────────────────────
    /** 初始化：建立订阅（watch）的时机 */
    created() {}
    /** 元素插入 DOM 后调用 */
    mounted() {}
    unmounted() {}

    /**
     * 编译期首次渲染。
     *
     * @param context 响应式根状态（engine.state = store.state）
     * @param parent  父元素
     * @returns HTMLElement 表示内部还有模板需上层递归；undefined/void 表示无需
     */
    compile(
        _context: Record<string, any>,
        _parent: HTMLElement,
    ): HTMLElement | undefined | void {}

    /**
     * 销毁钩子（scope 通道）：元素移除或 scope 销毁时调用，用于清理自定义资源。
     * 默认空实现，子类按需覆盖。Runtime 指令改用 `unmounted`。
     */
    destroy(_el: HTMLElement): void {}
}
