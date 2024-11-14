import { AsyncComputedDescriptorBuilder, AsyncComputedGetter, AsyncComputedValue, ComputedGetter, SyncComputedDescriptorBuilder } from "./computed";
import type  { AutoStore } from "./store";
import { WatchDescriptorBuilder } from "./watch/types";
import { Get,Paths} from "type-fest"


    
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
 


export type ComputedState<T> = T extends unknown[] ? ComputedState<T[number]>[] 
    : ( 
        T extends (...args:any) => any ? PickComputedResult<T> 
        : (
            T extends Dict  ? {
                [K in keyof T]: T[K] extends (...args:any[]) => any ? PickComputedResult<T[K]> 
                    : (  
                        T[K] extends Record<string, any> ? ComputedState<T[K]> 
                        :   ( 
                                T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
                            )
                        )        
                }  
            : T
        )
        
    )

// export type ComputedStateBak<T extends Record<string, any>> = {
//         [K in keyof T]: T[K] extends (...args:any) => any 
//              ?   PickComputedResult<T[K]> : 
//                 (  
//                      T[K] extends Record<string, any> ? ComputedState<T[K]> : 
//                      (
//                         T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
//                      )
//                 )
            
// };
 

// 在ComputedState的基础上，排除了undefined的类型
export type RequiredComputedState<T extends Record<string, any>> = {
    [K in keyof T]-?: Exclude<T[K],undefined> extends (...args:any) => any ? PickComputedResult<Exclude<T[K],undefined>> : Required<T[K]>extends Record<string, any> ? ComputedState<Exclude<T[K],undefined> > : Exclude<T[K],undefined> ;
};



declare global {
    var __AUTOSTORE_EXTENDS__: (<S extends AutoStore<any>>(store:S)=>void)[]
}

// ***************** 一些工具类型 *****************

export type Primitive = string | number | boolean | null | undefined | symbol | bigint;
 
export type Dict<T=any> = T extends (...args:any[])=>any ? never : Record<string,T>
   
 
export type ObjectKeyPaths<T> =Exclude<Paths<T,{maxRecursionDepth:30}>,number>

export type GetTypeByPath<State extends Dict,Path extends string> = Path extends '' | undefined ? State : Get<State,Path>

