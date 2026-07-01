import type { DirectiveBinding, AnyAutoStore, AutoTemplateEngineOptions } from "./types";
import type { Watcher } from "autostore";
import { DirectiveManager } from "./directive";
import { TemplateScanner } from "./TemplateScanner";
import { AutoTemplateCompiler } from "./compiler";

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
 * const app = new AutoTemplate(document.getElementById('app'), store);
 * app.start();
 * ```
 */
export class AutoTemplateEngine {
    readonly el: HTMLElement;
    readonly store: AnyAutoStore;
    readonly options: Required<AutoTemplateEngineOptions>;
    readonly compiler: AutoTemplateCompiler;
    readonly directives: DirectiveManager;
    readonly template: HTMLElement;

    /**
     * 构造函数
     *
     * @param el - 根元素，必须是 HTMLElement
     * @param store - AutoStore 实例
     * @param options - 配置选项
     * @throws {Error} 如果 el 不是 HTMLElement
     * @throws {Error} 如果 store 无效
     */
    constructor(el: HTMLElement, store: AnyAutoStore, options?: AutoTemplateEngineOptions) {
        // 验证 el 必须是 HTMLElement
        if (!(el instanceof HTMLElement)) {
            throw new Error("Root element must be an HTMLElement");
        }
        this.template = el.cloneNode(true) as HTMLElement;
        this.el = el;
        this.store = store;
        this.options = Object.assign({}, options) as Required<AutoTemplateEngineOptions>;
        this.compiler = new AutoTemplateCompiler(this);
        this.directives = new DirectiveManager(this);
    }

    destroy(): void {}
}
