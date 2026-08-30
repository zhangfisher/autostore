import type {
    ObjectKeyPaths,
    AsyncComputedGetter,
    AsyncComputedObject,
    AsyncComputedValue,
    ComputedDescriptorBuilder,
    ComputedGetter,
    ComputedOptions,
    ComputedState,
    Dict,
    ExtendAsyncOptions,
    SyncComputedObject,
    WatchListenerOptions,
    GetTypeByPath,
    WatchObject,
    WatchDescriptorBuilder,
    WatchOptions,
    StateOperate,
} from "autostore";

export type StateGetter<State extends Dict, Value = any> = (state: ComputedState<State>) => Value;

export type StatePaths<State extends Dict> = ObjectKeyPaths<ComputedState<State>>;
export type StateValue<State extends Dict, Path extends string> = GetTypeByPath<
    ComputedState<State>,
    Path
>;

/**
 * 从异步计算builder中提取计算结果的值类型
 *
 * - 简单异步 computed(async...)：getter 返回 Promise<Value>，提取 Promise 内的 Value
 * - 高级异步 asyncComputed(...)：builder 的 Value 泛型已是 AsyncComputedValue<Value>，
 *   getter 返回 Promise<Value>，提取后需再取 AsyncComputedValue 内的 Value
 */
type AsyncComputedValueFromBuilder<Builder> =
    Builder extends () => { getter: (scope: any, args: any) => infer R }
        ? R extends Promise<infer V>
            ? V extends AsyncComputedValue<infer _V>
                ? V
                : AsyncComputedValue<V>
            : AsyncComputedValue<R>
        : never;

/**
 * 按路径推导异步计算属性的 AsyncComputedValue 类型
 *
 * useReactive 的 async:boolean 重载使用：
 * - 路径指向异步计算builder（简单或高级）→ AsyncComputedValue<计算结果类型>
 *   （高级异步builder的Value泛型已是AsyncComputedValue<Value>，直接取，不再包一层）
 * - 其他 → AsyncComputedValue<常规推导值>
 */
type AsyncValueAtPath<State, Path extends string> = State extends Dict
    ? Path extends `${infer Key}.${infer Rest}`
        ? Key extends keyof State
            ? Rest extends ""
                ? State[Key] extends ObserverBuilderLike
                    ? AsyncComputedValueFromBuilder<State[Key]>
                    : AsyncComputedValue<GetTypeByPath<ComputedState<State>, Path>>
                : AsyncValueAtPath<State[Key], Rest>
            : AsyncComputedValue<GetTypeByPath<ComputedState<State>, Path>>
        : Path extends keyof State
          ? State[Path] extends ObserverBuilderLike
              ? AsyncComputedValueFromBuilder<State[Path]>
              : AsyncComputedValue<GetTypeByPath<ComputedState<State>, Path>>
          : AsyncComputedValue<GetTypeByPath<ComputedState<State>, Path>>
    : AsyncComputedValue<GetTypeByPath<ComputedState<State>, Path>>;

/**
 * 异步状态值的类型推导
 *
 * 让 useAsyncReactive 在路径指向异步计算属性时（无论简单异步或高级异步）
 * 均返回 AsyncComputedValue<Value> 类型，获得一致的开发体验：
 *
 * - 路径指向异步计算builder（简单或高级）→ AsyncComputedValue<计算结果类型>
 * - 其他（普通状态/同步计算/嵌套对象）→ 保持 ComputedState 的常规推导
 */
export type AsyncStateValue<State, Path extends string> = State extends Dict
    ? Path extends `${infer Key}.${infer Rest}`
        ? Key extends keyof State
            ? Rest extends ""
                ? State[Key] extends ObserverBuilderLike
                    ? AsyncComputedValueFromBuilder<State[Key]>
                    : GetTypeByPath<ComputedState<State>, Path>
                : AsyncStateValue<State[Key], Rest>
            : GetTypeByPath<ComputedState<State>, Path>
        : Path extends keyof State
          ? State[Path] extends ObserverBuilderLike
              ? AsyncComputedValueFromBuilder<State[Path]>
              : GetTypeByPath<ComputedState<State>, Path>
          : GetTypeByPath<ComputedState<State>, Path>
    : GetTypeByPath<ComputedState<State>, Path>;

/** 观察者描述符builder的特征：携带类型标志的计算声明 */
type ObserverBuilderLike = { __OBSERVER_TYPE__: string };

// ********** useDeps **********

export interface UseDepsType<State extends Dict> {
    (
        selector: ObjectKeyPaths<ComputedState<State>> | StateGetter<State>,
        extendAsync?: ExtendAsyncOptions,
    ): string[][];
    (
        selector: (string | string[] | StateGetter<State>)[],
        extendAsync?: ExtendAsyncOptions,
    ): string[][];
}

// ********** useReactive **********
/**
 * useReactive 返回的第3个值：异步计算属性的运行状态
 *
 * - loading/error：所有异步计算均支持（简单异步通过observer事件驱动，高级异步来自AsyncComputedValue）
 * - retry/timeout/progress：仅高级异步计算(asyncComputed声明)时是响应式更新的
 */
export type UseReactiveExtras = {
    /** 是否正在计算中 */
    loading: boolean;
    /** 计算出错信息 */
    error: Error | null;
    /** 剩余重试次数（高级异步计算） */
    retry: number;
    /** 超时倒计时ms（高级异步计算） */
    timeout: number;
    /** 执行进度0-100（高级异步计算） */
    progress: number;
};

/**
 * hook 返回值的第1项类型
 *
 * AsyncComputedValue 本身已是计算后形态，不再过 ComputedState 映射
 * （映射算子会将其上的 run/cancel 函数属性误当作计算属性替换为其返回值类型 void）
 */
type HookValue<Value> = Value extends AsyncComputedValue<any> ? Value : Value extends Dict ? ComputedState<Value> : Value;

// [值，修改值的函数，异步运行状态]
export type UseReactiveResult<Value, State extends Dict> = [
    HookValue<Value>,
    (value: Value | ((state: ComputedState<State>) => void)) => void,
    UseReactiveExtras,
];

export type UseReactiveGetter<Value, State extends Dict> = (state: ComputedState<State>) => Value;
export type UseReactiveSetter<SetValue, State extends Dict> = (
    value: SetValue,
    state: ComputedState<State>,
) => void;
export type UseReactiveComposeResult<Value, SetValue, State extends Dict> = [
    HookValue<Value>,
    (value: SetValue | ((state: ComputedState<State>) => void)) => void,
];

export interface UseReactiveType<State extends Dict> {
    <Path extends StatePaths<State> = StatePaths<State>>(
        selector: Path,
    ): UseReactiveResult<GetTypeByPath<ComputedState<State>, Path>, State>;
    <Path extends StatePaths<State> = StatePaths<State>>(
        selector: Path,
        async: boolean,
    ): UseReactiveResult<AsyncValueAtPath<State, Path>, State>;
    <Value = any>(selector: string[]): UseReactiveResult<Value, State>;
    <Value = any>(
        selector: string[],
        async: boolean,
    ): UseReactiveResult<AsyncComputedValue<Value>, State>;
    <Value = any, SetValue = any>(
        getter: UseReactiveGetter<Value, State>,
        setter?: UseReactiveSetter<SetValue, State>,
    ): UseReactiveComposeResult<Value, SetValue, State>;
    (): UseReactiveResult<State, State>;
}

// ********** useAsyncReactive **********

export interface UseAsyncReactiveType<State extends Dict> {
    <Path extends StatePaths<State> = StatePaths<State>>(
        selector: Path,
    ): AsyncStateValue<State, Path>;
    <Value = any>(selector: string[]): AsyncComputedValue<Value>;
}

// ********** useObserverObject **********
export interface UseObserverObjectType<State extends Dict> {
    <Value = any, Scope = ComputedState<State>>(
        getter: ComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        getter: AsyncComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        builder: ComputedDescriptorBuilder<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        args: any,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
    <Value = any>(
        builder: WatchDescriptorBuilder<Value>,
        options?: WatchOptions<Value>,
    ): WatchObject<Value>;
}

// ********** useComputedObject **********
export interface UseComputedObjectType<State extends Dict> {
    <Value = any, Scope = ComputedState<State>>(
        getter: ComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        getter: AsyncComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        builder: ComputedDescriptorBuilder<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
    <Value = any, Scope = ComputedState<State>>(
        args: any,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
}

// ********** useComputed **********
export interface UseComputedType<State extends Dict> {
    <Value = any, Scope = ComputedState<State>>(
        getter: ComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedValue<Value>;
    <Value = any, Scope = ComputedState<State>>(
        getter: AsyncComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedValue<Value>;
    <Value = any, Scope = ComputedState<State>>(
        builder: ComputedDescriptorBuilder<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedValue<Value>;
    <Value = any, Scope = ComputedState<State>>(
        args: any,
        computedOptions?: ComputedOptions<Value, Scope>,
    ): AsyncComputedValue<Value>;
}

//  ********** useWatch **********

export type UseWatchGetter<Value, DependValue> = (
    operate: StateOperate<DependValue>,
) => Value | undefined | Promise<Value | undefined>;
export type UseWatchSetter<Value> = (value: Value) => void;
export type UseWatchOptions<Value> = WatchListenerOptions & {
    initial?: Value; // 提供初始值
};

export interface UseWatchType<State extends Dict> {
    <Value = any, DependValue = any>(
        selector: ObjectKeyPaths<ComputedState<State>>,
        getter: UseWatchGetter<Value, DependValue>,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
    <Value = any, DependValue = any>(
        selector: string[],
        getter: UseWatchGetter<Value, DependValue>,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
    <Value = any, DependValue = any>(
        getter: UseWatchGetter<Value, DependValue>,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
}
