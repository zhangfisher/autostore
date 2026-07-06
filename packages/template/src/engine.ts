import type { AnyAutoStore, AutoTemplateEngineOptions } from "./types";
import { DirectiveManager } from "./directives/manager";
import { AutoTemplateCompiler } from "./compile/compiler";
import { createTemplateContext, type AutoTemplateContext } from "./context";
import { AutoStore } from "autostore";

/**
 * AutoStore Template 渲染引擎核心类
 *
 * 负责管理模板渲染的生命周期，包括初始化、启动、停止和销毁。
 * 集成 AutoStore 的 watch 系统，实现响应式 DOM 更新。
 *
 * @example
 * ```html
 * <div id="app">
 *   <span x-text="user.name"></span>
 * </div>
 * ```
 *
 * ```typescript
 * const store = createStore({ user: { name: 'John' } });
 * const app = new AutoTemplateEngine(document.getElementById('app'), store);
 
 * ```
 */
export class AutoTemplateEngine<State extends Record<string, any> = Record<string, any>> {
    readonly el: HTMLElement;
    readonly store: AutoStore<State>;
    readonly options: Required<AutoTemplateEngineOptions>;
    readonly compiler: AutoTemplateCompiler;
    readonly directives: DirectiveManager;
    readonly template: HTMLElement;
    readonly context: AutoTemplateContext<State>;

    /**
     * 构造函数
     *
     * @param el - 根元素，必须是 HTMLElement
     * @param store - AutoStore 实例
     * @param options - 配置选项
     * @throws {Error} 如果 el 不是 HTMLElement
     * @throws {Error} 如果 store 无效
     */
    constructor(el: HTMLElement, state: State, options?: AutoTemplateEngineOptions) {
        // 验证 el 必须是 HTMLElement
        if (!(el instanceof HTMLElement)) {
            throw new Error("Root element must be an HTMLElement");
        }
        this.template = el.cloneNode(true) as HTMLElement;
        this.el = el;
        this.store = new AutoStore(state);
        this.options = Object.assign({}, options) as Required<AutoTemplateEngineOptions>;
        this.compiler = new AutoTemplateCompiler(this);
        this.directives = new DirectiveManager(this);
        this.context = createTemplateContext<State>(this.store);
    }
    /**
     * 开始编译模板并应用
     */
    compile() {
        const result = this.compiler.compile();
    }
    destroy(): void {}
}
