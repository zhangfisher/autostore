import type { Watcher } from "autostore";
import type { KylinTemplateScope } from "../scope";
import type { KylinTemplateEngine } from "../engine";
import type { KylinDirectiveInfo } from "./types";
import type { KylinTemplateCompileContext } from "../compile/types";

export class KylinTemplateDirectiveBase {
    /**
     * 用于指定在一个元素上使用多个同名指令的处理策略
     *
     * - true: 只允许一个，最后一个生效<span x-text="a" x-text="b"/> 只经x-text="b"有效
     * - false: 允许存在多个，<span x-class="a" x-class="b"/>
     *
     */
    static singleton: boolean = true;
    static name: string = "";
    static priority: number = 0;
    /**
     * 原始指令信息（完整保留，含 name/attr 等）
     */
    info: KylinDirectiveInfo;
    /**
     * 属性参数，如 @click 的 click、x-bind:title 的 title
     */
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
    value?: any;
    engine: KylinTemplateEngine;
    watchers: Watcher[] = [];
    binding: KylinTemplateScope;
    /**
     * @param engine   引擎实例
     * @param binding  所属绑定对象
     * @param info     原始指令信息（来自 getDirectives），完整保留；
     *                 value/modifiers/options/attr 同时提取为便捷字段
     */
    constructor(
        engine: KylinTemplateEngine,
        binding: KylinTemplateScope,
        info: KylinDirectiveInfo,
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

    /**
     *
     * 在初始化处理指令时进行，一般在此开始监听状态
     */
    created() {}
    /**
     * 在将元素插入到DOM中后调用
     */
    mounted() {}
    unmounted() {}

    /**
     *
     *
     *
     *
     * @param el
     * @param template
     * @param parent
     * @returns HTMLElement | undefined
     *
     *   - undefined:  该元素内部没有模板，不需要进一步处理了
     *   - HTMLElement: 该元素内部还有模板，需要递归编译
     *
     *
     *
     */
    compile(
        _context: KylinTemplateCompileContext,
        _parent: HTMLElement,
    ): HTMLElement | undefined | void {}
}
