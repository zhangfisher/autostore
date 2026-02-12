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
    ObserverScopeRef,
} from "../observer/types";
import type { StateOperate } from "../store/types";
import type { ComputedObject } from "./computedObject";
import type { Dict } from "../types";

/**
 * 同步计算属性配置参数
 */
export interface ComputedGetterArgs {
    /**
     * @description
     * 第一次运行为true
     */
    first?: boolean;
    /**
     * 发生变化的依赖信息
     *
     */
    operate?: StateOperate;
}

export type ComputedGetter<Value, Scope = any> = (
    scope: Scope,
    args: Required<ComputedGetterArgs>,
) => Exclude<Value, Promise<any>>;

export interface ComputedProgressbar {
    value: (num: number) => void;
    end: () => void;
}
// 异步计算
export interface AsyncComputedGetterArgs {
    /**
     *  获取一个进度条，用来显示异步计算的进度
     * @param opts
     * @returns
     */
    getProgressbar?: (opts?: { max?: number; min?: number; value?: number }) => ComputedProgressbar;
    /**
     * 当计算函数启用超时时，可以指定一个cb，在超时后会调用此函数
     * @param cb
     * @returns
     */
    onTimeout?: (cb: () => void) => void;
    /**
     *
     * 提供一个函数用来获取当前Scope的快照
     * 传入的scope是一个经过Proxy处理的响应式对象，此方法可以对scope进行转换为普通对象
     */
    getSnap?: <T = Dict>(scope: any) => T;
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
    /**
     * 额外的参数，用来传递给计算函数
     */
    extras?: any;
    /**
     * 触发计算的操作
     */
    operate?: StateOperate;
    /**
     * 是否是第一次运行
     */
    first?: boolean;
}

export type AsyncComputedGetter<Value, Scope = any> = (
    scope: Scope,
    args: Required<AsyncComputedGetterArgs>,
) => Promise<Value>;

export type RequiredComputedOptions<Value = any> = Required<ComputedOptions<Value>>;

/**
 *
 * 运行时计算属性配置参数，用来传递给计算对象的run方法的参数
 *
 * 当调用计算属性对象的run方法时，可以传入此参数用来覆盖默认的配置参数
 *
 */
export type RuntimeComputedOptions = ComputedOptions & {
    first?: boolean; // 当第一次运行时为true
    operate?: StateOperate; // 变化的依赖信息
};

export type SyncRuntimeComputedOptions = SyncComputedOptions & {
    first?: boolean; // 当第一次运行时为true
    operate?: StateOperate; // 变化的依赖信息
};

export type Computed<T> = (...args: any) => Exclude<T, Promise<any>>; // 同步计算函数
export type AsyncComputed<T = any> = (...args: any) => Promise<T>; // 异步计算函数

/**
 * 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键，如果是string[]，则代表是当前Store对象的完整路径
 * 当ComputedContext是一个字符串并且以@开头时，有个特殊含义，即是一个路径指向：
 * 如：{fields:{ user:"address",address:"user" }}，如果scope=@user，代表的当前scope对象指向的user属性的值所指向的对象，在这里实质传入的是address
 */
export type ComputedScope =
    | ObserverScopeRef
    | string
    | string[]
    | ((computedObject: ComputedObject) => string | string[] | ObserverScopeRef);

/**
 * 计算属性的依赖路径
 *
 * 规则如下：
 *
 * - 以/开头，代表绝对路径,/字符是可选的，如果省略/字符，也表示绝对路径
 * - 以./开头，代表相对路径,相对的是当前路径
 * - 以../开头，代表相对路径,相对的是父路径
 * - ROOT: 代表根路径
 * - CURRENT: 代表当前路径
 * - PARENT: 代表父路径
 * - SELF: 代表自身
 * - 不以/,./,../开头的任意字符串，代表绝对路径
 * - 路径使用.作为分割符
 *
 * 特别注意:
 *
 * 当相对路径时，指的相对的是当前路径所在的对象的路径，而不是当前路径
 *
 * 比如
 *
 * curPath=['a','b','c','d']
 *
 * 则 ./ 代表的是 a.b.c，而不是 a.b.c.d,也就是说，相对路径是不包含自身的
 * 因此./x 代表的是 a.b.c.x，而不是 a.b.c.d.x
 *
 *
 */
export type ComputedDepend =
    | "CURRENT"
    | "ROOT"
    | "PARENT"
    | `/${string}`
    | `./${string}`
    | `../${string}`
    | string
    | string[];
export type ComputedDepends = ComputedDepend[];

export interface ComputedOptions<
    Value = any,
    Scope = any,
    Schema extends Dict = Dict,
> extends ObserverOptions<Value, Schema> {
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
     *
     * 针对异步计算属性是否马上执行一次计算
     *
     * @description
     * true: 在创建异步计算时马上执行一次
     * false: 在创建异步计算时不马上执行一次，后续仅在依赖变化时执行
     * auto: 当initial==undefined时会马上执行一次，initial!=undefined不会马上执行一次，因为该计算属性已经有初始化了
     *
     * 同步计算没有此问题
     *
     *
     */
    immediate?: "auto" | boolean;
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
    /**
     * 额外的参数
     */
    extras?: any;
    /**
     * 当执行计算getter函数出错时的回调，如果返回值==undefined，则返回值会作为出错时的计算结果
     *
     * @description
     *
     * 比如，有一个validate计算属性，其类型是true/false
     * 当计算出错时抛出异常，此时就可以返回false, 这样就可以实现当计算出错时，validate返回false
     *
     */
    onError?: (e: Error) => any;
    /**
     * 当计算完成后的回调函数
     */
    onDone?(args: {
        id: string;
        error: Error | undefined;
        timeout: boolean;
        abort: boolean;
        path: string[] | undefined;
        scope: Scope;
        value: any;
    }): void;
    /**
     * 在计算前后向指定路径的状态写入额外值
     *
     */
    reports?: {
        /**
         * 在计算前后向loading指定状态写入true/false用于反馈
         *
         * 如loading=["./loading"]，则在开始计算前往当前计算属性所在的对象的loading=true
         *  计算完成后置loading=false
         *
         */
        loading?: string | string[];
        /**
         * 在计算出错时向指定路径写入错误信息
         */
        error?: string | string[];
    };
    /**
     * 默认情况下，计算结果也会进行响应式处理
     * 通过显式指定raw=true，可以标识为非响应式
     *
     * 例:
     *
     * const store = new AutoStore({
     *    book:computed(()=>{
     *        return {
     *           name:"AutoStore",
     *           price:100
     *        }
     *    })
     * })
     *
     * book是一个响应式对象，即通过Proxy代理，允许通过store.watch("book.name")来监听变化
     *
     * 如果，指定raw=true，则会使用markRaw包裹book，book将不再Proxy，也就无法store.watch("book.name")来监听变化
     *
     * 此参数在计算结果是一个大型对象，且无需代理整个对象时能提高性能。
     *
     *  book:computed(()=>{
     *        return {
     *           name:"AutoStore",
     *           price:100
     *        }
     *    },{ raw:true})
     *
     * 等效于 markRaw(store.state.book)
     *
     */
    raw?: boolean;
}

export type LiteComputedOptions<
    Value = any,
    Scope = any,
    Schema extends Dict = Dict,
> = ObserverOptions<Value, Schema> &
    Pick<
        ComputedOptions<Value, Scope, Schema>,
        "reports" | "onDone" | "onError" | "extras" | "immediate" | "reentry"
    >;

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

export type SyncComputedOptions<Value = any, Scope = any> = Pick<
    ComputedOptions<Value, Scope>,
    | "id"
    | "enable"
    | "onError"
    | "onDone"
    | "depends"
    | "initial"
    | "objectify"
    | "group"
    | "scope"
    | "extras"
>;

/**
 * 计算属性所在的位置
 */
export type ComputedContext<Value = any> = {
    path: string[];
    value: Value;
    parentPath: string[];
    parent: any;
};

export type ComputedSyncReturns<T = any> = (...args: any) => Exclude<T, Promise<any>>;

/**
 * 返回函数的返回值类型
 * 支持返回()=>Promise<R>中的R类型
 */
export type AsyncReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => Promise<infer R>
    ? R
    : T extends (...args: any) => infer R
      ? R
      : any;

export type SyncComputedDescriptor<Value = any, Scope = any> = ObserverDescriptor<
    "computed",
    Value,
    Scope,
    ComputedGetter<Value, Scope>,
    ComputedOptions<Value, Scope>
>;
export type SyncComputedDescriptorBuilder<Value = any, Scope = any> = ObserverDescriptorBuilder<
    "computed",
    Value,
    Scope,
    SyncComputedDescriptor<Value, Scope>
>;

// 简单异步计算

export interface AsyncLiteComputedGetterArgs {
    /**
     * 提供一个函数用来获取当前Scope的快照
     * 传入的scope是一个经过Proxy处理的响应式对象，此方法可以对scope进行转换为普通对象
     */
    getSnap?: <T = Dict>(scope: any) => T;
    /**
     * 额外的参数，用来传递给计算函数
     */
    extras?: any;
    /**
     * 触发计算的操作
     */
    operate?: StateOperate;
    /**
     * 是否是第一次运行
     */
    first?: boolean;
}

export type AsyncLiteComputedGetter<Value, Scope = any> = (
    scope: Scope,
    args: Required<AsyncLiteComputedGetterArgs>,
) => Promise<Value>;

export type AsyncLiteComputedDescriptor<Value = any, Scope = any> = ObserverDescriptor<
    "computed",
    Value,
    Scope,
    AsyncLiteComputedGetter<Value, Scope>,
    ComputedOptions<Value, Scope>
> & {
    liteAsync: boolean; // 标识这是一个轻量异步计算
};

export type AsyncLiteComputedDescriptorBuilder<
    Value = any,
    Scope = any,
> = ObserverDescriptorBuilder<"computed", Value, Scope, AsyncLiteComputedDescriptor<Value, Scope>>;

// 全功能异步计算
export type AsyncComputedDescriptor<Value = any, Scope = any> = ObserverDescriptor<
    "computed",
    Value,
    Scope,
    AsyncComputedGetter<Value, Scope>,
    ComputedOptions<Value, Scope>
>;

export type AsyncComputedDescriptorBuilder<Value = any, Scope = any> = ObserverDescriptorBuilder<
    "computed",
    Value,
    Scope,
    AsyncComputedDescriptor<Value, Scope>
>;

export type ComputedDescriptor<Value = any, Scope = any> =
    | SyncComputedDescriptor<Value, Scope>
    | AsyncLiteComputedDescriptor<Value, Scope>
    | AsyncComputedDescriptor<Value, Scope>;

export type ComputedDescriptorBuilder<Value = any, Scope = any> =
    | SyncComputedDescriptorBuilder<Value, Scope>
    | AsyncLiteComputedDescriptorBuilder<Value, Scope>
    | AsyncComputedDescriptorBuilder<Value, Scope>;

export type ComputedDescriptorParameter<Value = any, Scope = any> =
    | ComputedDescriptorBuilder<Value, Scope>
    | ComputedGetter<Value, Scope>
    | AsyncComputedGetter<Value, Scope>
    | AsyncLiteComputedGetter<Value, Scope>;

export type ComputedBuilder<Value, Scope> =
    | ComputedDescriptorBuilder<Value, Scope>
    | AsyncComputedGetter<Value, Scope>
    | AsyncLiteComputedGetter<Value, Scope>
    | ComputedGetter<Value, Scope>;
