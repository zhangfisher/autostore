/**
 *
 * 轻量异步计算
 *
 * 计算结果直接写入到原地
 *
 * 没有进度条、超时、可中止、倒计时、重试等高级功能
 *
 */
import { isPathEq } from "../utils";
import { getValueScope } from "../scope";
import { ComputedObject } from "./computedObject";
import { getSnap } from "../utils/getSnap";
import type { StateOperate } from "../store/types";
import { AsyncLiteComputedGetterArgs, ComputedOptions, RuntimeComputedOptions } from "./types";

export class AsyncLiteComputedObject<Value = any, Scope = any> extends ComputedObject<
    Value,
    ComputedOptions
> {
    private _isRunning: boolean = false;
    private _firstRun: boolean = false; // 是否已经第一次运行过
    lite: boolean = true; // 标识这是一个简单计算对象
    get async() {
        return true;
    }
    get running() {
        return this._isRunning;
    }

    protected onInitial() {
        this.initial = this.options.initial;
        this.attach();
        // 为什么要延迟执行？
        // 因为onInitial函数是在第一次读取时执行的同步操作，此时的依赖项还没有收集完毕，原始的计算函数还没有初始化
        // 比如{ total:computed(async()=>{ return 1+2 }) }，在第一次读取total时，此时的computed函数还没有初始化
        // 如果这时候执行run，则total的值还是一个function，而run执行时会将运行的数据更新到total.value，total.loading 等值，
        // 由于total还没有初始化为{loading,value,....}对象，所以会出错
        setTimeout(() => {
            if (
                this.options.immediate === true ||
                (this.options.immediate === "auto" && this.options.initial === undefined)
            ) {
                this.run({ first: true });
            }
        }, 0);
    }
    /**
     *
     * 运行计算函数
     *
     */
    async run(options?: RuntimeComputedOptions) {
        const { first } = options ?? {};

        if (this.isDisable(options?.enable)) {
            this.store.log(() => `Async computed <${this.toString()}> is disabled`, "warn");
            return;
        }
        this.error = undefined;
        this._firstRun = true;
        if (!first) {
            this.store.log(() => `Run async computed for : ${this.toString()}`);
        }

        // 2. 合成最终的配置参数
        const finalComputedOptions = (options
            ? Object.assign({ first }, this.options, options)
            : this.options) as unknown as Required<RuntimeComputedOptions>;

        // 3. 根据配置参数获取计算函数的上下文对象
        const scope = getValueScope<Value, Scope>(
            this as any,
            "computed",
            this.context,
            finalComputedOptions,
        );
        // 4. 检查是否有重入
        const { reentry } = finalComputedOptions;
        if (this._isRunning && !reentry) {
            this.store.log(
                () => `Async computed: ${this.toString()} is running, can't reentry`,
                "warn",
            );
            this.emitStoreEvent("computed:cancel", {
                path: this.path,
                id: this.id,
                reason: "reentry",
                computedObject: this,
            });
            return;
        }
        this._isRunning = true; // 即所依赖项的值
        try {
            return await this.executeGetter(scope, finalComputedOptions);
        } finally {
            this._isRunning = false;
        }
    }
    /**
     * 执行计算函数
     *
     */
    private async executeGetter(scope: any, options: Required<RuntimeComputedOptions>) {
        const getterArgs: Required<AsyncLiteComputedGetterArgs> = {
            getSnap: (scope: any) => getSnap(scope),
            extras: options.extras,
            operate: options.operate,
            first: options.first,
        };

        let hasError: any = undefined;
        let computedResult: any;

        try {
            //
            this._reportComputedStatus("loading", true);
            // 执行计算函数
            computedResult = await this.getter.call(this, scope, getterArgs);
            this.store.peep(() => {
                this.value = computedResult; // 将结果回写入store,且不触发get事件
            });
            this._reportComputedStatus("error", undefined);
        } catch (e: any) {
            hasError = e;
            this._reportComputedStatus("error", e.message);
        } finally {
            this._reportComputedStatus("loading", false);
        }
        // 计算完成后触发事件
        if (hasError) {
            this.error = hasError;
            this.emitStoreEvent("computed:error", {
                path: this.path,
                id: this.id,
                error: hasError,
                computedObject: this,
            });
        } else {
            this.emitStoreEvent("computed:done", {
                path: this.path,
                id: this.id,
                value: computedResult,
                computedObject: this,
            });
        }
        this.onDoneCallback(options, computedResult, scope, computedResult);
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
     * @param value - 操作的结果，如果操作成功完成
     */
    private onDoneCallback(
        options: Required<RuntimeComputedOptions>,
        error: Error,
        scope: any,
        value: any,
    ) {
        if (typeof options.onDone !== "function") return;
        options.onDone.call(this, {
            id: this.id,
            path: this.path,
            timeout: false,
            abort: false,
            value,
            error,
            scope,
        });
    }
    protected onDependsChange(params: StateOperate) {
        this.store.log(
            () =>
                `AsyncComputed<${this.id}> is running by depends ${params.type}/${params.path.join(
                    ".",
                )} operate `,
        );
        this.run({
            operate: params,
            first: !this._firstRun,
        });
    }
    /**
     *
     * 由于异步计算是一个对象，所以我们需要侦听的是对象的变化，而不仅是对象的值
     *
     */
    protected getValueWatchPath() {
        const spath = this.path!.join(this.store.options.delimiter);
        return [`${spath}.*`, spath];
    }
    /**
     * 由于所有异步计算属性均会被转换为一个AsyncComputedValue<{value,timeout,....}>的形式
     * 这样，当我们在指定一个依赖是异步属性时，就需要指定为xxxx.value才可以个侦听到变化
     *
     * @example
     * const store = createStore({
     *            a0: 1,
     *            a1: computed(async (scope:any)=>{
     *              return scope.a0 + 1
     *            },["a0"],{initial:2}),
     *            a2: computed(async (scope:any)=>{
     *              return scope.a1.value + 1
     *            },["a1.value"],{initial:3})
     *        });
     *
     *  以上a2依赖于a1，由于a1是一个异步对象，所以在写依赖时就必须写上["a1.value"]
     *  这就有点反直觉了。
     *
     * 本函数在异步计算对象订阅变更事件时调用，用来返回字符串形式的依赖数组
     *
     * 本函数的功能就是对所有依赖进行判断如果其是一个异步计算依赖，则自动添加.value，这样就可以如下方式来写依赖了
     *
     * 	const store = createStore({
     *            a0: 1,
     *            a1: computed(async (scope:any)=>{
     *              return scope.a0 + 1
     *            },["a0"],{initial:2}),
     *            a2: computed(async (scope:any)=>{
     *              return scope.a1.value + 1
     *            },["a1"],{initial:3})
     *        });
     *
     */
    protected getDepends() {
        const depends = super.getDepends();
        return depends.map((dep) => {
            if (dep.length === 0) return dep;
            for (const obj of this.store.computedObjects.values()) {
                if (isPathEq(obj.path, dep) && obj.async) {
                    return [`${dep.join(this.store.options.delimiter)}.value`];
                }
            }
            return dep;
        }) as unknown as string[][];
    }
}
