/**
 *
 * 异步计算
 *
 *
 *
 *
 *
 */
import { setVal, markRaw} from "../utils";
import { delay } from "flex-tools/async/delay";
import { getValueScope } from "../scope";
import { ComputedOptions, ComputedProgressbar } from "./types";
import type { AsyncComputedGetterArgs, AsyncComputedResult, RuntimeComputedOptions } from "./types";
import { ComputedObject } from "./computedObject";
import { Dict } from "../types";
import { getSnap } from "../utils/getSnap";
import { getError } from "../utils/getError";


export class AsyncComputedObject<Value = any, Scope = any> extends ComputedObject<
	Value,
	Scope,
	ComputedOptions<Value, Scope>
> {
	private _isComputedRunning: boolean = false;
	get async() {
		return true;
	}
	/**
	 *
	 */
	protected onInitial() {
		this.initial = this.createAsyncComputedResult();
		// 如果指定了immediate=true,是马上执行一次，否则只会在依赖发生变化时执行
		if (this.options.immediate) {
			this.run();
		}
	}

	private createAsyncComputedResult() {
		return Object.assign({
			loading: false,
			timeout: 0,
			retry: 0,
			error: null,
			result: this.options.initial,
			progress: 0,
			run: markRaw((args: Dict) => {
				return this.store.computedObjects.run(this.id, Object.assign({}, args));
			}),
			cancel: markRaw(() => {
				console.log("cancel");
			}),
		});
	}
	/**
	 *
	 * 运行计算函数
	 *
	 */
	async run(options?: RuntimeComputedOptions) {
		const { first = false } = options ?? {};
		// 1. 检查是否计算被禁用, 注意，仅点非初始化时才检查计算开关，因为第一次运行需要收集依赖，这样才能在后续运行时，随时启用/禁用计算属性
		if (this.isDisable(options?.enable)) {
			this.store.log(() => `Async computed <${this.toString()}> is disabled`, "warn");
			return;
		}
		!first && this.store.log(() => `Run async computed for : ${this.toString()}`);

		// 2. 合成最终的配置参数
		const finalComputedOptions = (options ? Object.assign(
			{},
			this.options,
			options
		)  : this.options) as Required<RuntimeComputedOptions>;

		// 3. 根据配置参数获取计算函数的上下文对象
		const scope = getValueScope<Value, Scope>(
			this as any,
			"computed",
			this.context,
			finalComputedOptions
		);
		// 4. 检查是否有重入
		const { noReentry } = finalComputedOptions;
		if (noReentry && this._isComputedRunning) {
			this.store.log(() => `Reentry async computed: ${this.toString()}`, "warn");
			this.store.emit("computed:cancel", { path: this.path, id: this.id, reason: "reentry" });
			return;
		}
		this._isComputedRunning = true; // 即所依赖项的值
		try {
			return await this.executeGetter(scope, finalComputedOptions);
		} finally {
			this._isComputedRunning = false;
		}
	}
	/**
	 * computed(async (scope,{getProgressbar})=>{
	 *    const pbar = getProgressbar({max:100,min:0}) // 初始值
	 *    pbar.value(12)      // 修改进度值
	 *    pbar.end()          // 结束进度条
	 * })
	 *
	 * @param init
	 * @returns
	 */
	private createComputeProgressbar(opts?: {
		max?: number;
		min?: number;
		value?: number;
	}): ComputedProgressbar {
		const { max = 100, min = 0, value = 0 } = Object.assign({}, opts);
		setVal(this.store.state, [...this.path, "progress"], value);
		return {
			value:(num: number)=>{
				if (num > max) num = max;
				if (num < min) num = min;
				setVal(this.store.state, [...this.path, "progress"], num);
			},
			end() {
				this.value(max);
			},
		};
	}
	private updateAsyncComputedResult(values: Partial<AsyncComputedResult>) {    
		Object.entries(values).forEach(([key, value]) => {
			setVal(this.store.state, [...this.path, key], value);
		});    
  	}
	/**
	 * 当计算属性操作完成时的回调函数
	 * 
	 * 此函数负责在计算属性操作完成后，根据操作的执行状态调用用户定义的回调函数
	 * 它会传递操作的结果、错误状态、是否中止以及是否超时等信息给回调函数
	 * 
	 * @param options - 计算属性的运行时选项，被强制转换为Required类型，确保所有选项都是必需的
	 * @param error - 如果操作过程中发生错误，该错误对象将被传递
	 * @param abort - 一个布尔值，表示操作是否被中止
	 * @param timeout - 一个布尔值，表示操作是否因超时而结束
	 * @param scope - 操作执行的上下文或范围
	 * @param result - 操作的结果，如果操作成功完成
	 */
	private onDoneCallback(options: Required<RuntimeComputedOptions>,error:Error,abort:boolean,timeout:boolean,scope:any,result:any) {
		if(typeof(options.onDone)!=='function') return 
		options.onDone.call(this, {
			id:this.id,			
			path:this.path,
			result,
			error,
			abort,
			timeout,
			scope,
		});
	}
	/**
	 * 执行计算函数
	 *
	 */
	private async executeGetter(scope: any, options: Required<RuntimeComputedOptions>) {
		const { timeout = 0, retry = [0, 0] } = options;

		const [retryCount, retryInterval] = Array.isArray(retry) ? retry : [Number(retry), 0];

		let timeoutCallback: Function;

		const abortController = new AbortController();

		const getterArgs: Required<AsyncComputedGetterArgs> = {
			onTimeout     : (cb: Function) => (timeoutCallback = cb),
			getProgressbar: this.createComputeProgressbar.bind(this),
			getSnap       : (scope: any) => getSnap(scope),
			abortSignal   : abortController.signal,
			cancel        : abortController.abort,
			extras        : options.extras,
			changed       : options.changed,
		};
		let hasAbort = false; // 是否接收到可中止信号

		// 配置可中止信号，以便可以取消计算
		this.updateAsyncComputedResult({
			cancel: markRaw(() => abortController.abort())
		});
		// 侦听中止信号，以便在中止时能停止
		abortController.signal.addEventListener("abort", () => {
			hasAbort = true;
		});

		let hasError:any = false
		let hasTimeout = false;
		let computedResult: any;

		for (let i = 0; i < retryCount + 1; i++) {
			hasError = false;
			hasTimeout = false;
			let timerId: any, countdownId: any;
			const afterUpdated = {}; // 保存执行完成后需要更新的内容，以便在最后一次执行后更新状态
			try {
				// 处理超时参数和倒计时
				let [timeoutValue = 0, countdown = 0] = Array.isArray(timeout)
					? timeout
					: [timeout, 0];
				this.updateAsyncComputedResult({
					loading: true,
					error: null,
					retry: i > 0 ? retryCount - i : 0,
					timeout: countdown > 1 ? countdown : timeoutValue,
					progress: 0,
				});
				// 如果有中止信号，则取消计算
				if (hasAbort) {
					throw new Error("Abort");
				}
				// 超时处理
				if (timeoutValue > 0) {
					timerId = setTimeout(() => {
						hasTimeout = true;
						if (typeof timeoutCallback === "function") timeoutCallback();
						if (!hasError) {
							clearInterval(countdownId);
							this.updateAsyncComputedResult({
								loading: false,
								error: "TIMEOUT",
								timeout: 0,
							});
						}
					}, timeoutValue);
					// 启用设置倒计时:  比如timeout= 6*1000, countdown= 6
					if (countdown > 1) {
						countdownId = setInterval(() => {
							this.updateAsyncComputedResult({
								timeout: countdown--,
							});
							if (countdown === 0) clearInterval(countdownId);
						}, timeoutValue / (countdown + 1));
					}
				}
				// 执行计算函数
				computedResult = await this.getter.call(this, scope, getterArgs);
				if (hasAbort) throw new Error("Abort");
				if (!hasTimeout) {
					Object.assign(afterUpdated, {
						result: computedResult,
						error: null,
						timeout: 0,
					});
				}
			} catch (e: any) { 
				hasError = e;
				if (!hasTimeout) {
					Object.assign(afterUpdated, { error: getError(e).message, timeout: 0 });
				}
				/// 启用重试
				if (retryCount > 0) {
					Object.assign(afterUpdated, { retry: retryCount - i });
				}
			} finally {
				clearTimeout(timerId);
				clearInterval(countdownId);
				// 重试时不更新loading状态
				if (!hasError || i == retryCount) Object.assign(afterUpdated, { loading: false });
				if (!hasError && !hasTimeout) {
					Object.assign(afterUpdated, { error: null });
				}
				this.updateAsyncComputedResult(afterUpdated);
			}
			// 重试延迟
			if (hasError) {// 最后一次不延迟				
				if (retryCount > 0 && retryInterval > 0 && i < retryCount) {
					await delay(retryInterval);
				}
			}
		}
		// 计算完成后触发事件
		if (hasAbort || hasTimeout) {
			this.store.emit("computed:cancel", { path: this.path, id:this.id, reason: hasTimeout ? "timeout" : "abort" });
		} else if (hasError) {
			this.store.emit("computed:error", { path: this.path, id:this.id, error: hasError });
		} else {
			this.store.emit("computed:done", { path: this.path, id:this.id, value: computedResult });		
		}
		setTimeout(() => {
			this.onDoneCallback(options,hasError,hasAbort,hasTimeout,scope,computedResult);
		}, 0); 
	}
}