import type { AutoTemplateBinding } from "./binding";
import type { AutoTemplateEngine } from "./engine";
import type { Directive } from "./types";
import { getVal, type Watcher, type WatchListener, type WatchListenerOptions } from "autostore";

export type DirectiveInfo = {
    name: string;
    value?: string;
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
};

export class TemplateDirectiveBase {
    name: string = "";
    priority?: number;
    modifiers?: string[];
    options?: Record<string, any>;
    value?: any;
    engine: AutoTemplateEngine;
    watchers: Watcher[] = [];
    binding: AutoTemplateBinding;
    /**
     *
     * @param value  指令值，如x-text="a"，则value="a"
     * @param modifiers
     * @param options
     */
    constructor(
        engine: AutoTemplateEngine,
        binding: AutoTemplateBinding,
        value: any,
        modifiers: string[],
        options?: Record<string, any>,
    ) {
        this.engine = engine;
        this.modifiers = modifiers;
        this.options = options;
        this.value = value;
        this.binding = binding;
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
    compile(_parent: HTMLElement): HTMLElement | undefined | void {}
}

/**
 * 指令注册表类
 *
 * 负责管理指令的注册、查询和排序。
 * 使用 Map 存储指令，支持自定义指令覆盖内置指令。
 */
export class DirectiveManager extends Map<string, TemplateDirectiveBase> {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine) {
        super();
        this.engine = engine;
    }

    /**
     * 注册指令
     *
     * 如果同名指令已存在，记录 info 日志并覆盖（D-12：后注册覆盖先注册）。
     *
     * @param name - 指令名称，不能为空
     * @param directive - 指令对象，必须包含 init 方法
     * @throws {Error} 如果指令名称为空
     * @throws {Error} 如果指令对象缺少 init 方法
     */
    register(directive: Directive): void {}
}
