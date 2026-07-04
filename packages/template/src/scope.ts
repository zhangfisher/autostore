import type { AutoTemplateEngine } from "./engine";
import { TemplateDirectiveBase } from "./directives/base";
import { runDirectives } from "./directives/utils/runDirectives";
import type { TemplateCompileContext } from "./compile/types";
import type { Watcher, WatchListener, WatchListenerOptions } from "autostore";

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
export class AutoTemplateScope {
    /**
     * 引用模板元素
     */
    private _template: WeakRef<Node>;
    /**
     * 引用实际渲染的元素
     */
    readonly _el: WeakRef<Node>;
    readonly engine: AutoTemplateEngine;
    directives: TemplateDirectiveBase[] = [];

    watchers: Watcher[] = [];
    constructor(engine: AutoTemplateEngine, el: Node, template: Node) {
        this._template = new WeakRef(template);
        this._el = new WeakRef(el);
        this.engine = engine;
    }
    get el() {
        return this._el.deref();
    }
    get template() {
        return this._template.deref();
    }
    /**
     * 侦听
     * @param paths
     * @param listener
     * @param options
     */
    watch(
        paths: "*" | string | (string | string[])[],
        listener: WatchListener,
        options?: WatchListenerOptions,
    ) {
        this.watchers.push(this.engine.store.watch(paths, listener, options));
    }
    /**
     * 创建计算属性
     * @param value
     */
    createComputed(value: string) {
        const computedObj = this.engine.store.computedObjects.create(() => {
            return value;
        });
    }
    compile(context: TemplateCompileContext, parent: HTMLElement) {
        const ctx: Record<string, any> = {};
        try {
            context.push(ctx);
            return runDirectives(this.directives, context, parent);
        } finally {
            if (Object.keys(ctx).length === 0) {
                context.pop();
            }
        }
    }
}

export class AutoTemplateBindingManager extends Map<WeakRef<HTMLElement>, AutoTemplateScope> {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine) {
        super();
        this.engine = engine;
    }
}
