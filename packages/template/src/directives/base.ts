import type { Watcher, WatchListener, WatchListenerOptions } from "autostore";
import type { AutoTemplateBinding } from "../binding";
import type { AutoTemplateEngine } from "../engine";
import type { DirectiveInfo } from "./types";
import type { TemplateCompileContext } from "../compiler";

export class TemplateDirectiveBase {
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
    info: DirectiveInfo;
    /**
     * 属性参数，如 @click 的 click、x-bind:title 的 title
     */
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
    value?: any;
    engine: AutoTemplateEngine;
    watchers: Watcher[] = [];
    binding: AutoTemplateBinding;
    /**
     * @param engine   引擎实例
     * @param binding  所属绑定对象
     * @param info     原始指令信息（来自 getDirectives），完整保留；
     *                 value/modifiers/options/attr 同时提取为便捷字段
     */
    constructor(engine: AutoTemplateEngine, binding: AutoTemplateBinding, info: DirectiveInfo) {
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
    watch(
        paths: "*" | string | (string | string[])[],
        listener: WatchListener,
        options?: WatchListenerOptions,
    ) {
        this.watchers.push(this.engine.store.watch(paths, listener, options));
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
        _context: TemplateCompileContext,
        _parent: HTMLElement,
    ): HTMLElement | undefined | void {}
}
