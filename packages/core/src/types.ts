import { AsyncComputedDescriptorBuilder, AsyncComputedGetter, AsyncComputedValue, ComputedGetter, SyncComputedDescriptorBuilder } from "./computed";
import { ISchemaDescriptor } from "./schema";
import type { AutoStore } from "./store";
import { RawObject } from "./utils";
import { WatchDescriptorBuilder } from "./watch/types";
import { Get, Paths, UnionToIntersection } from "type-fest"


export type Union<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type MutableRecord<Items, KindKey extends string = 'type', Share = unknown, DefaultKind extends keyof Items = never> = {
    [Kind in keyof Items]: Union<{
        [type in KindKey]: Kind;
    } & Items[Kind] & Share>
}[Exclude<keyof Items, DefaultKind>] | (
        DefaultKind extends never ? never : (
            Union<{ [K in KindKey]?: DefaultKind } & Items[DefaultKind] & Share>
        )
    )


export type PickValues<T extends Record<string, any>> = Union<UnionToIntersection<T[keyof T]>>


// **************  以下实现将计算属性函数的返回值类型提取出来  **************


export type PickComputedResult<T> = T extends SyncComputedDescriptorBuilder<infer X> ? X :
    (T extends AsyncComputedDescriptorBuilder<infer X> ? AsyncComputedValue<X> :
        (T extends WatchDescriptorBuilder<infer X> ? X :
            (T extends ComputedGetter<infer X> ? X :                                           // 同步函数
                (T extends AsyncComputedGetter<infer X> ? AsyncComputedValue<X> :                // 异步函数
                    T
                )
            )
        )
    )

/**

转换状态中的计算属性函数的类型
将状态中的计算属性函数转换为计算属性函数的返回值类型
如：ComputedState<{count:()=>1}> => {count:number}
如：ComputedState<{count:async ()=>1}> => {count:number}

*/

export type ComputedState<T> = T extends unknown[] ? ComputedState<T[number]>[]
    :
    (
        T extends ISchemaDescriptor<infer V> ? V
        : (
            T extends RawObject<T> ? T
            : (
                T extends (...args: any) => any ? PickComputedResult<T>
                : (
                    T extends Dict ? {
                        [K in keyof T]: T[K] extends (...args: any[]) => any ? PickComputedResult<T[K]>
                        : (
                            T[K] extends Record<string, any> ? ComputedState<T[K]>
                            : (
                                T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
                            )
                        )
                    }
                    : T
                )
            )
        )
    )



// export type ComputedState<T> = T extends unknown[] ? ComputedState<T[number]>[]
//     :
//     (
//         T extends SchemaDescriptor<infer V> ? V
//         : (
//             T extends RawObject<T> ? T
//             : (
//                 T extends (...args: any) => any ? PickComputedResult<T>
//                 : (
//                     T extends Dict ? {
//                         [K in keyof T]: T[K] extends (...args: any[]) => any ? PickComputedResult<T[K]>
//                         : (
//                             T[K] extends Record<string, any> ? ComputedState<T[K]>
//                             : (
//                                 T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
//                             )
//                         )
//                     }
//                     : T
//                 )
//             )
//         )
//     )
export type StatePath<T> = ObjectKeyPaths<ComputedState<T>>


// export type ComputedState<T> = T extends unknown[] ? ComputedState<T[number]>[] 
// : ( 
//     T extends RawObject<T> ? T 
//     : (
//         T extends (...args:any) => any ? PickComputedResult<T> 
//         : (
//             T extends Dict  ? {
//                 [K in keyof T]: T[K] extends (...args:any[]) => any ? PickComputedResult<T[K]> 
//                     : (  
//                         T[K] extends Record<string, any> ? ComputedState<T[K]> 
//                         :   ( 
//                                 T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
//                             )
//                         )        
//                 }  
//             : T
//         )
//     )        
// )

// 在ComputedState的基础上，排除了undefined的类型
export type RequiredComputedState<T extends Record<string, any>> = {
    [K in keyof T]-?: Exclude<T[K], undefined> extends (...args: any) => any ? PickComputedResult<Exclude<T[K], undefined>> : Required<T[K]> extends Record<string, any> ? ComputedState<Exclude<T[K], undefined>> : Exclude<T[K], undefined>;
};



declare global {
    var __AUTOSTORE_EXTENDS__: (<S extends AutoStore<any>>(store: S) => void)[]
}

// ***************** 一些工具类型 *****************

export type Primitive = string | number | boolean | null | undefined | symbol | bigint;

export type Dict<T = any> = T extends (...args: any[]) => any ? never : Record<string, T>

export type ObjectKeyPaths<T> = Exclude<Paths<T, { maxRecursionDepth: 50 }>, number>

export type GetTypeByPath<State, Path extends string>
    = Path extends '' | undefined
    ? State
    : (State extends Dict ? Get<State, Path> : never)


export type RemoveUnknown<T> = T extends unknown ? never : T

// 功能: 将
export type ToRawType<T> =
    T extends string ? (string extends T ? T : string) :
    T extends number ? (number extends T ? T : number) :
    T extends boolean ? (boolean extends T ? T : boolean) :
    T;
