import type { KylinTemplateEngine } from "./engine";
import { KylinTemplateDirectiveBase } from "./directives/base";
import { runDirectives } from "./directives/utils/runDirectives";
import type { KylinTemplateCompileContext } from "./compile/types";
import {
    getVal,
    type ComputedGetter,
    type Watcher,
    type WatchListener,
    type WatchListenerOptions,
} from "autostore";
import { isStatePath } from "./utils/isStatePath";
import { createStackedContext } from "./context";
import { getDirectives } from "./directives/utils/getDirectives";
import { createDirectives } from "./directives/utils/createDirectives";

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
    directives: KylinTemplateDirectiveBase[];
};

/**
 * Q: 为什么要引入Binding？
 * A: DOM元素上可能具有多个指令，方便统一管理。
 * 并在DOM元素更新/销毁时进行集中操作，比如注销事件订阅等。
 *
 */
export class KylinTemplateScope {
    /**
     * 引用模板元素
     */
    private _template: WeakRef<Node>;
    /**
     * 引用实际渲染的元素
     */
    readonly _el: WeakRef<Node>;
    readonly engine: KylinTemplateEngine;
    directives: KylinTemplateDirectiveBase[] = [];
    computedObjects: any[] = [];
    watchers: Watcher[] = [];
    constructor(engine: KylinTemplateEngine, el: HTMLElement, template: HTMLElement) {
        this._template = new WeakRef(template);
        this._el = new WeakRef(el);
        this.engine = engine;
        this._createDirectives();
    }
    get el() {
        return this._el.deref();
    }
    get template() {
        return this._template.deref();
    }
    private _createDirectives() {
        const directiveDefine = getDirectives(this.template as HTMLElement);
        // 创建指令实例
        this.directives.push(...createDirectives(this.engine, directiveDefine, this));
    }
    /**
     * 侦听
     * @param value  可以是路径，也可以是表达式
     * @param listener
     * @param options
     */
    watch(value: string, listener: WatchListener, options?: WatchListenerOptions) {
        if (isStatePath(value)) {
            this.watchers.push(this.engine.store.watch(value, listener, options));
            return getVal(this.engine.store.state, value);
        } else {
            // 如果不是状态路径，则需要创建计算属性
            const obj = this.createComputed(value);
            this.watchers.push(obj.watch(listener));
            return obj.value;
        }
    }
    /**
     * 创建计算属性
     * @param value
     */
    createComputed(value: string) {
        const getter = new Function("scope", "args", value) as ComputedGetter<any>;
        const computedObj = this.engine.store.computedObjects.create(getter);
        this.computedObjects.push(computedObj.id);
        return computedObj;
    }

    compile(context: KylinTemplateCompileContext, parent: HTMLElement | undefined) {
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
    destory() {
        try {
            this.watchers.forEach((watcher) => watcher.off());
            this.computedObjects.forEach((id) => this.engine.store.computedObjects.delete(id));
        } catch (e: any) {
            this.engine.store.log(e.message, "error");
        }
    }
}

export class AutoTemplateBindingManager extends Map<WeakRef<HTMLElement>, KylinTemplateScope> {
    readonly engine: KylinTemplateEngine;
    constructor(engine: KylinTemplateEngine) {
        super();
        this.engine = engine;
    }
}
