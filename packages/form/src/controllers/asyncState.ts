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
	host: any;
	private _loading = false;
	private _value: any;
	// 进行中的 Promise 加载序号：仅最新一次的结果允许写回（丢弃过期 resolve）
	private _promiseSeq = 0;
	// 已消费的 Promise 实例：hostUpdate 每轮重入 load，options 上的 Promise
	// resolve 后仍在原地，若不记忆会对其反复 then → requestUpdate → 无限循环
	private _consumedPromise: any = null;
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
		// 读 host.options 而非 host.schema：联动函数（如 choices:(state)=>...）
		// 的求值结果写在 options 上，schema 上保留的是函数本身
		const options = this.host.options!;
		const value = getVal(options, this.path);
		if (isAsyncComputedValue(value)) {
			if (value.loading) {
				this._loading = true;
				this._value = this.handle(undefined);
			} else {
				this._value = this.handle(value.value);
				this._loading = false;
			}
		} else if (value instanceof Promise) {
			// choices 为 async 函数时，AutoField._evalDynamicOptions 同步求值
			// 得到裸 Promise 写入 options（无 value/loading 包装）。
			// 先呈现 loading 态，resolve 后经 handle 写回并触发 host 重渲染；
			// 同一 Promise 只消费一次（记忆实例），load 随 hostUpdate 重入时
			// 直接跳过，避免对已 settle 的 Promise 反复 then 造成更新死循环
			if (value !== this._consumedPromise) {
				this._consumedPromise = value;
				this._loading = true;
				this._value = this.handle(undefined);
				const seq = ++this._promiseSeq;
				value.then(
					(resolved) => {
						if (seq !== this._promiseSeq) return;
						this._value = this.handle(resolved);
						this._loading = false;
						this.host.requestUpdate();
					},
					(err) => {
						if (seq !== this._promiseSeq) return;
						this._value = this.handle(undefined);
						this._loading = false;
						console.error(`AsyncOptionState load <${Array.isArray(this.path) ? this.path.join(".") : this.path}> failed: ${err?.message || err}`);
						this.host.requestUpdate();
					},
				);
			}
		} else {
			this._consumedPromise = null;
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
		// 每次 host 更新均重新读取：联动依赖（如 country 变化触发 choices 重算）
		// 写入 options 后，host 会 requestUpdate，这里随之刷新选项列表
		this.load();
	}

	hostUpdated(): void {}
}
