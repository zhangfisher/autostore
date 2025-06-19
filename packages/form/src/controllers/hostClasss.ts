import { ReactiveController } from 'lit';

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
    constructor(host: any, ...classes: (string | Record<string, boolean>)[]) {
        (this.host = host).addController(this);
        this.initialClasses = classes;
    }
    _forEachClasss(args: (string | Record<string, boolean>)[], cb: (cls: string, enable: boolean) => void) {
        if (!args) return
        args.forEach((item) => {
            if (typeof item === 'string') {
                cb(item, true)
                this.host.classList.add(item)
            } else {
                Object.entries(item).forEach(([key, value]) => {
                    cb(key, value)
                })
            }
        })
    }
    add(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return
        if (!args) return
        this._forEachClasss(args, (cls) => {
            this.host.classList.add(cls)
        })
    }
    remove(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return
        if (!args) return
        this._forEachClasss(args, (cls) => {
            this.host.classList.remove(cls)
        })
    }
    toggle(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return
        this._forEachClasss(args, (cls) => {
            this.host.classList.toggle(cls)
        })
    }
    /**
     * 
     * @param args 
     * @returns 
     */
    use(...args: (string | Record<string, boolean>)[]) {
        if (!this.host) return
        this._forEachClasss(args, (cls, enable) => {
            if (enable) {
                this.host.classList.add(cls)
            } else {
                this.host.classList.remove(cls)
            }
        })
    }
    has(className: string) {
        return this.host.classList.contains(className)
    }
    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        this.add(...this.initialClasses)
    }
    hostDisconnected() {
        this.remove(...this.initialClasses)
    }
    hostUpdate(): void {

    }
}