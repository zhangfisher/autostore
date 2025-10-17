import { getVal, isAsyncComputedValue } from "autostore";
import { html, type TemplateResult, type ReactiveController } from "lit";
import { when } from "lit/directives/when.js";

/**
 *
 * 从Widget的Schema中获取异步状态的数据
 *
 * class MyElement extends LitElement {
 *
 *   const items = new AsyncState(this,'<path>',(v)=>{
 *         return v
 *   });
 *
 *   render(){
 *      return html`
 *          ${when(this.items.loading,
 *              ()=>html`<div>loading</div>`
 *              ()=>html`<div>${this.items.value}</div>`
 *          )}
 *
 *     `
 *   }
 *  render(){
 *      return html`
 *          ${this.items.render((value)=>{
 *              return html`<div>${value}</div>>`
 *           })
 *     `
 *   }
 * }
 *
 *
 */

export type AsyncStateOptions = {
	/**
	 *
	 * 自动加载状态数据
	 *
	 **/
	autoload: boolean;
};

export class AsyncOptionState<V = any> implements ReactiveController {
	host: HTMLElement;
	private _loading = false;
	private _value: any;
	private _ready: boolean = false; // 对于异步状态表示是否已加载数据
	/**
	 *
	 * @param host
	 * @param path     Option数据路径，可以是字符串或字符串数组，如'a.b.c'或['a','b','c']
	 * @param handle   用于对数据进行处理，返回处理后的值
	 */
	constructor(
		host: any,
		public path: string | string[],
		public handle: (value: V | undefined) => V,
	) {
		this.host = host;
		host.addController(this);
	}

	get loading() {
		return this._loading;
	}

	get value(): V {
		return this._value;
	}

	load() {
		// @ts-expect-error
		const schema = this.host.schema!;
		const value = getVal(schema, this.path);
		if (isAsyncComputedValue(value)) {
			if (value.loading) {
				this._loading = true;
				this._value = this.handle(undefined);
			} else {
				this._ready = value.value !== undefined;
				this._value = this.handle(value.value);
				this._loading = false;
			}
		} else {
			this._ready = true;
			this._value = this.handle(value);
			this._loading = false;
		}
	}
	/**
	 *
	 * 渲染异步状态内容
	 *
	 *
	 * items.render((value)html`<div>${items.value}</div>`)
	 *
	 * @param content
	 * @returns
	 */
	render(content: (value: V) => TemplateResult) {
		return html`
            ${when(
				this.loading,
				() => {
					return html`<auto-loading></auto-loading>`;
				},
				() => {
					return content(this._value);
				},
			)}
        `;
	}

	/**
	 * 当宿主元素连接到DOM时调用的生命周期方法
	 */
	// hostConnected() {
	//     this.load()
	// }
	hostUpdate(): void {
		if (!this._ready) {
			this.load();
		}
	}

	hostUpdated(): void {}
}
