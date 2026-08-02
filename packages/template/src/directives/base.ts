import type { Watcher } from "autostore";
import type { AutoTemplateScope } from "../scope";
import type { AutoTemplateEngine } from "../engine";
import type { AutoDirectiveInfo } from "./types";
import type { AutoTemplateStackedContext } from "../context";

/**
 * 指令基类
 *
 * 所有内置/自定义指令均继承此类。指令名通过 `presetDirectives` 的 key 标识
 * （不使用类的 `static name`——它会被 `Function.name` 覆盖，无法可靠设为 "text" 等）。
 *
 * `priority` / `singleton` 为**静态**字段：`createDirectives` 需在实例化之前据它们做
 * 优先级排序与同名单例去重，故必须静态可访问。子类用 `static override priority` 覆盖。
 */
export class AutoTemplateDirectiveBase {
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

    /** 原始指令信息（完整保留，含 name/attr 等） */
    info: AutoDirectiveInfo;
    /** 属性参数，如 @click 的 click、x-bind:title 的 title */
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
    value?: any;
    engine: AutoTemplateEngine;
    /** 本指令持有的 watcher（由具体指令维护，scope.destroy 会统一 off scope 级 watcher） */
    watchers: Watcher[] = [];
    binding: AutoTemplateScope;

    /**
     * @param engine   引擎实例
     * @param binding  所属 scope
     * @param info     原始指令信息（来自 getDirectives）；value/attr/modifiers/options 同时提取为便捷字段
     */
    constructor(
        engine: AutoTemplateEngine,
        binding: AutoTemplateScope,
        info: AutoDirectiveInfo,
    ) {
        this.engine = engine;
        this.binding = binding;
        this.info = info;
        this.value = info.value;
        this.attr = info.attr;
        this.modifiers = info.modifiers;
        this.options = info.options;
    }

    get el() {
        return this.binding.el;
    }
    get template() {
        return this.binding.template;
    }

    /** 初始化：建立订阅（watch）的时机 */
    created() {}
    /** 元素插入 DOM 后调用 */
    mounted() {}
    unmounted() {}

    /**
     * 编译期首次渲染。
     *
     * @param context 运行时作用域（聚合视图，含 x-for 压栈的局部变量）
     * @param parent  父元素
     * @returns HTMLElement 表示内部还有模板需上层递归；undefined/void 表示无需
     */
    compile(
        _context: AutoTemplateStackedContext<any>,
        _parent: HTMLElement,
    ): HTMLElement | undefined | void {}

    /**
     * 销毁钩子：元素移除或 scope 销毁时调用，用于清理自定义资源。
     * 默认空实现，子类按需覆盖。
     */
    destroy(_el: HTMLElement): void {}
}
