import { AsyncComputedDescriptorBuilder, AsyncComputedGetter, AsyncComputedValue, ComputedGetter, SyncComputedDescriptorBuilder } from "./computed";
import type  { AutoStore } from "./store";
import { WatchDescriptorBuilder } from "./watch/types";



    
// **************  以下实现将计算属性函数的返回值类型提取出来  **************


export type PickComputedResult<T> = T extends AsyncComputedDescriptorBuilder<infer X> ? AsyncComputedValue<X> : 
    ( T extends SyncComputedDescriptorBuilder<infer X> ? X : 
         ( T extends  WatchDescriptorBuilder<infer X> ? X :                                  
            ( T extends  ComputedGetter<infer X> ? X :                                           // 同步函数
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
export type ComputedState<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends (...args:any) => any 
        ?  PickComputedResult<T[K]> : T[K] extends Record<string, any> 
            ? ComputedState<T[K]> : T[K];
};



// 在ComputedState的基础上，排除了undefined的类型
export type RequiredComputedState<T extends Record<string, any>> = {
[K in keyof T]-?: Exclude<T[K],undefined> extends (...args:any) => any ? PickComputedResult<Exclude<T[K],undefined>> : Required<T[K]>extends Record<string, any> ? ComputedState<Exclude<T[K],undefined> > : Exclude<T[K],undefined> ;
};



declare global {
    var __AUTOSTORE_EXTENDS__: (<S extends AutoStore<any>>(store:S)=>void)[]
}

// ***************** 一些工具类型 *****************

export type Primitive = string | number | boolean | null | undefined | symbol | bigint;
 
export type Dict<T=any> = Record<string,T>

export type SyncFunction<R=any> =  (...args: any) => Exclude<R,Promise<any>>;  

export type AsyncFunction<R=any> =  (...args: any) => Promise<R>;  

type GenNode<K extends string | number, IsRoot extends boolean> = IsRoot extends true
? `${K}`
: `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

export type ObjectKeyPaths<T extends object, IsRoot extends boolean = true, K extends keyof T = keyof T> = K extends (
T extends unknown[] ? number : string | number
)
?
    | GenNode<K, IsRoot>
    | (NonNullable<T[K]> extends Record<string, any>
        ? `${GenNode<K, IsRoot>}${ObjectKeyPaths<NonNullable<T[K]>, false>}`
        : never)
: never;