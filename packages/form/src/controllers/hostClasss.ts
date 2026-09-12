import type { ReactiveController } from 'lit';

/**
 * 用于为组件的host增加class
 *
 *  class MyElement extends LitElement {
 *      classes = new HostClasses({
 *         border: ()=>{return true},
 *      });
 *
 *      render(){
 *
 *          return html`<div class="${this.classes}">hello</div>`;
 *      }
 *  }
 *
 */

export class HostClasses implements ReactiveController {
    host: HTMLElement;
    initialClasses: (string | Record<string, boolean>)[] = [];
    /**
     * 上一次 use() 启用的类集合
     *
     * use() 的参数中存在动态拼接的 key（如 `${border}-border`），取值切换后
     * 旧类不会再出现在本次参数中，必须比对前后两次集合才能移除，实现互斥
     */
    private _lastUsedClasses = new Set<string>();
    constructor(host: any, ...classes: (string | Record<string, boolean>)[]) {
        this.host = host;
        host.addController(this);
        this.initialClasses = classes;
    }
    _forEachClasss(
        args: (string | Record<string, boolean>)[],
        cb: (cls: string, enable: boolean) => void,
    ) {
        if (!args) return;
        args.forEach((item) => {
            if (typeof item === 'string') {
                cb(item, true);
                this.host.classList.add(item);
            } else {
                Object.entries(item).forEach(([key, value]) => {
                    cb(key, value);
                });
            }
        });
    }
    add(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return;
        if (!args) return;
        this._forEachClasss(args, (cls) => {
            this.host.classList.add(cls);
        });
    }
    remove(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return;
        if (!args) return;
        this._forEachClasss(args, (cls) => {
            this.host.classList.remove(cls);
        });
    }
    toggle(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return;
        this._forEachClasss(args, (cls) => {
            this.host.classList.toggle(cls);
        });
    }
    /**
     * 声明当前应启用的类集合
     *
     * 前后两次调用的集合做差集：上次启用而本次未出现的类自动移除，
     * 保证动态 key（如 `${border}-border`）取值切换后新旧类互斥
     *
     * @param args
     * @returns
     */
    use(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return;
        const current = new Set<string>();
        this._forEachClasss(args, (cls, enable) => {
            if (enable) {
                this.host.classList.add(cls);
                current.add(cls);
            } else {
                this.host.classList.remove(cls);
            }
        });
        for (const cls of this._lastUsedClasses) {
            if (!current.has(cls)) this.host.classList.remove(cls);
        }
        this._lastUsedClasses = current;
    }
    has(className: string) {
        return this.host.classList.contains(className);
    }
    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        this.add(...this.initialClasses);
    }
    hostDisconnected() {
        this.remove(...this.initialClasses);
    }
    hostUpdate(): void {}
}
