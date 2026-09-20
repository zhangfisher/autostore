import type { 
    ObserverDescriptor,
    ObserverDescriptorBuilder,
    ObserverOptions  } from "autostore";
import type { WatchObject } from "./watchObject"; 

export type WatchDependFilter<Value = any> = (path: string[], value: Value) => boolean;

export interface WatchOptions<Value = any> extends ObserverOptions<Value> {
    async?: false;
    filter: WatchDependFilter<Value>;
    raw?: boolean;
}

export type WatchScope<Value = any> = {
    path: string[];
    value: Value;
};

export type WatchGetter<Value = any, DependValue = any> = (
    scope: { path: string[]; value: DependValue },
    args: WatchObject<Value>,
) => Exclude<Value, Promise<any>>; //| undefined

export type WatchDescriptor<Value = any, DependValue = any> = ObserverDescriptor<
    "watch",
    Value,
    WatchScope<DependValue>,
    WatchGetter<Value, DependValue>,
    WatchOptions<Value>
>;

/**
 * @template Value  监听函数的返回值类型
 * @template Scope 监听函数的第一个参数的类型
 */
export type WatchDescriptorBuilder<Value = any, DependValue = any> = ObserverDescriptorBuilder<
    "watch",
    Value,
    WatchScope<DependValue>,
    WatchDescriptor<Value, DependValue>
>;
