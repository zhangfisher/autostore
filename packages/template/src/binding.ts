import type { AutoTemplateEngine } from "./engine";
import { TemplateDirectiveBase } from "./directives/base";
import { runDirectives } from "./directives/utils/runDirectives";
import type { TemplateCompileContext } from "./compiler";

export type AutoTemplateBindingOptions = {
    /**
     * 引用模板元素
     */
    template: HTMLElement;
    /**
     * 引用实际渲染的元素
     */
    el: HTMLElement;
    /**
     * 指令
     */
    directives: TemplateDirectiveBase[];
};

/**
 * Q: 为什么要引入Binding？
 * A: DOM元素上可能具有多个指令，方便统一管理。
 * 并在DOM元素更新/销毁时进行集中操作，比如注销事件订阅等。
 *
 */
export class AutoTemplateBinding {
    /**
     * 引用模板元素
     */
    private _template: WeakRef<HTMLElement>;
    /**
     * 引用实际渲染的元素
     */
    private _el: WeakRef<HTMLElement>;
    directives: TemplateDirectiveBase[] = [];
    constructor(el: HTMLElement, template: HTMLElement) {
        this._template = new WeakRef(template);
        this._el = new WeakRef(el);
    }
    get el() {
        return this._el.deref();
    }
    get template() {
        return this._template.deref();
    }
    compile(context: TemplateCompileContext) {
        return runDirectives(this.directives, context);
    }
}

export class AutoTemplateBindingManager extends Map<WeakRef<HTMLElement>, AutoTemplateBinding> {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine) {
        super();
        this.engine = engine;
    }
}
