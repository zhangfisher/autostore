// oxlint-disable typescript/no-redundant-type-constituents
/**
 *
 * 在signal的基础上提供计算属性功能
 *
 * const signal = createSignal({
 *      name:'zhangsan',
 *      price: 13,
 *      count: 2,
 *      total: (data){
 *          return data.price * data.count
 *      }
 * })
 *
 *
 *
 *
 */
import type {
    ObserverDescriptor,
    ObserverDescriptorBuilder,
    ObserverOptions,
    AsyncComputedGetter,
    Dict,
    RuntimeComputedOptions,
    AsyncComputedGetterArgs,
    StateOperate,
    ComputedOptions,
} from "autostore";

export interface AsyncProComputedGetterArgs extends AsyncComputedGetterArgs {
    /**
     *  获取一个进度条，用来显示异步计算的进度
     * @param opts
     * @returns
     */
    getProgressbar?: (opts?: {
        max?: number;
        min?: number;
        value?: number;
    }) => AsyncComputedProgressbar;
    /**
     * 当计算函数启用超时时，可以指定一个cb，在超时后会调用此函数
     * @param cb
     * @returns
     */
    onTimeout?: (cb: () => void) => void;
    /**
     * 在执行计算函数时，如果传入AbortController.signal可以用来传递给异步计算函数，用来取消异步计算
     * 例如：fetch(url,{signal:signal})
     */
    abortSignal: AbortSignal;
    /**
     * 用来取消操作正在执行的异步计算函数
     * 异步函数可以通过此方法来取消异步计算
     *
     * @returns
     */
    cancel: () => void;
}

export type AsyncProComputedGetter<Value, Scope = any> = (
    scope: Scope,
    args: Required<AsyncProComputedGetterArgs>,
) => Promise<Value>;

export type AsyncProComputedDescriptor<Value = any, Scope = any> = ObserverDescriptor<
    "asyncpro",
    Value,
    Scope,
    AsyncComputedGetter<Value, Scope>,
    AsyncProComputedOptions<Value, Scope>
>;

export interface AsyncComputedProgressbar {
    value: (num: number) => void;
    end: () => void;
}

export type AsyncProComputedDescriptorBuilder<Value = any, Scope = any> = ObserverDescriptorBuilder<
    "asyncpro",
    Value,
    Scope,
    AsyncProComputedDescriptor<Value, Scope>
>;

export interface AsyncProComputedOptions<
    Value = any,
    Scope = any,
    Schema extends Dict = Dict,
> extends ComputedOptions<Value, Scope, Schema> {
    /**
     *
     * 计算函数的执行超时时间
     *
     * @description
     * 指定超时时间，当计算函数执行超过指定时间后，会自动设置loading为false
     * 如果timeout是一个数组，则第一个值表示超时时间，第二个值表示超时期的倒计时间隔
     * 例如：[1000,10]表示1000ms代表1s后超时并置loading=false
     * 10代表setInterval(1000/100), 每次执行时-1，直到为0时停止
     * 这样就可以通过绑定timeout值来实现倒计时的效果
     * 如果要实现60秒倒计时，可以这样写：[60*1000,60],这样value.timeout就会从60开始递减
     */
    timeout?: number | [number, number];
    /**
     * 计算函数是否允许重入执行
     *
     * 默认为true，即允许重入执行
     *
     */
    reentry?: boolean;
    /**
     * 提供一个异步信号，用来传递给异步计算函数以便可以取消异步计算
     *
     * @description
     *
     * 仅在异步计算函数中有效
     *
     */
    abortController?: () => AbortController | undefined;
    /**
     * 当计算函数执行出错时的重试次数
     *
     * @description
     *
     * retry:3  表示最多重试3次,重试间隔为0，加上第1次执行，总共执行4次
     * retry:[3,1000] 表示最多重试3次，重试间隔为1000ms，加上第1次执行，总共执行4次
     *
     * 重试数据可以通过AsyncComputedObject.retry获取
     * 当首次执行失败时触发重试，此时AsyncComputedObject.retry=3，然后每次重试-1，直到为0时停止重试
     * 可以在UI中通过AsyncComputedObject.retry来实时显示重试次数
     *
     */
    retry?: number | [number, number];
}

export type AsyncComputedValue<Value = any> = {
    loading: boolean;
    progress: number; // 进度值
    timeout: number; // 超时时间，单位ms，当启用超时时进行倒计时
    error: any;
    retry: number; // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试
    value: Value; // 计算结果保存到此处
    run: (options?: RuntimeComputedOptions) => void; // 重新执行任务
    cancel: () => void; // 中止正在执行的异步计算
};
export type AsyncProRuntimeComputedOptions = AsyncProComputedOptions & {
    first?: boolean; // 当第一次运行时为true
    operate?: StateOperate; // 变化的依赖信息
};
