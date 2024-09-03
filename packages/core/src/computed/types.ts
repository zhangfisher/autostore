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
import { StateOperateParams } from "../store/types"
import { Dict } from "../types"
import { COMPUTED_DESCRIPTOR_FLAG } from "../consts"
import { ComputedObject } from "./computedObject"
import { WatchDescriptor } from "../watch/types"

export type ComputedType = 'watch' | 'computed'

export enum ComputedScopeRef{
    Root    = 'ROOT',
    Current = 'CURRENT',
    Parent  = 'PARENT',  
    Depends = 'DEPENDS',                // 指向依赖数组
    Self    = 'SELF'                    // 指向自身，默认值
} 

/**
 * 同步计算属性配置参数
 */
export interface ComputedGetterArgs{    
    /**
     * @description 
     * 第一次运行为true
     */
    first?:boolean
    /**
     * 发生变化的依赖信息 
     * 
     */
    changed?:StateOperateParams
}
 
export type ComputedGetter<Value,Scope=any> = (scope: Scope,args:Required<ComputedGetterArgs>) => Exclude<Value,Promise<any>>

export interface ComputedProgressbar{
    value:(num:number)=>void
    end:()=>void
}

export interface AsyncComputedGetterArgs{
    /**
     *  获取一个进度条，用来显示异步计算的进度 
     * @param opts 
     * @returns 
     */
    getProgressbar?:(opts?:{max?:number,min?:number,value?:number})=>ComputedProgressbar
    /**
     * 当计算函数启用超时时，可以指定一个cb，在超时后会调用此函数 
     * @param cb 
     * @returns 
     */
    onTimeout?:(cb:()=>void)=>void    
    /**
     * 
     * 提供一个函数用来获取当前Scope的快照
     * 传入的scope是一个经过Proxy处理的响应式对象，此方法可以对scope进行转换为普通对象   
     */
    getSnap?:<T=Dict>(scope:any)=>T  
    /**
     * 在执行计算函数时，如果传入AbortController.signal可以用来传递给异步计算函数，用来取消异步计算
     * 例如：fetch(url,{signal:signal})
     */
    abortSignal:AbortSignal  
    /**
     * 用来取消操作正在执行的异步计算函数
     * 异步函数可以通过此方法来取消异步计算
     * 
     * @returns 
     */
    cancel:()=>void
    /**
     * 额外的参数，用来传递给计算函数
     */
    extras?:any
    /**
     * 发生变化的依赖信息 
     * 
     */
    changed?:StateOperateParams
}

export type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (scope:Scope,args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
 

    
export type RequiredComputedOptions<Value=any> = Required<ComputedOptions<Value>>
 

/**
 * 运行时计算属性配置参数，用来传递给计算对象的run方法的参数
 * 
 * 
 */
export type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean                           // 当第一次运行时为true
    changed?: StateOperateParams                // 变化的依赖信息
} 

export type SyncRuntimeComputedOptions = SyncComputedOptions & {
    first?  : boolean                           // 当第一次运行时为true
    changed?: StateOperateParams                // 变化的依赖信息
} 


export type Computed<T=any> = (...args: any) => Exclude<T,Promise<any>>;                   // 同步计算函数
export type AsyncComputed<T=any> = (...args: any) => Promise<T>;    // 异步计算函数

 
/**
 * 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键，如果是string[]，则代表是当前Store对象的完整路径
 * 当ComputedContext是一个字符串并且以@开头时，有个特殊含义，即是一个路径指向：
 * 如：{fields:{ user:"address",address:"user" }}，如果scope=@user，代表的当前scope对象指向的user属性的值所指向的对象，在这里实质传入的是address
 */
export type ComputedScope  =  ComputedScopeRef | string | string[] | ((computedObject:ComputedObject)=>string | string[] | ComputedScopeRef)

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
export type ComputedDepends = (string | string[] | 'SELF'  | 'CURRENT' | 'ROOT' | 'PARENT' )[]  

export type ComputedOptions<Value=any,Scope=any>= {
     /**
     * 计算函数的唯一标识，如果未指定，则自动生成一个唯一标识
     */
     id? : string                          
     /**
      * 计算属性的初始化值
      */
     initial? : Value
     /**
      * 计算属性的作用域
      * 
      * @description
      * 
      * 用来指定计算函数的第一个参数，即计算函数的作用范围
      * 
      * 默认值：current，指向的是计算属性所在对象
      * 
      */
     scope? : ComputedScope
     
     /**
      * 计算开关
      * 当=false时不会执行计算，也就是不会执行计算函数
      * 
      */    
     enable?:boolean        
     /**
      * 
      * 是否是异步计算函数
      * 
      * 默认情况下，通过typeof(fn)=="async function"来判断是否是异步计算函数
      * 但是在返回Promise或者Babel转码等情况下，判断会失效时，需要手动指定async=true
      */
     async?:boolean 

    /**
     * 指定该计算属性的依赖路径
     * 
     * @description
     * 
     * 支持绝对路径和相对路径
     * 
     * - 绝对路径：
     * 
     *   以/开头，代表绝对路径,
     *    /字符是可选的，如果省略/字符，则默认为绝对路径
     *   
     *   如：/a.b.c 表示根对象的a.b.c属性
     *   如：/a 表示根对象的a属性     * 
     *   如  a.b.c 等效于 /a.b.c
     * 
     * - 相对路径：
     *   以./或者../开头，代表相对路径
     *  ./指的相对当前对象，../指的是父对象
     * ../a.b.c表示父对象的a.b.c属性
     * ../../a 表示父对象的父对象的a属性     
     * 
     * 
     * 
     * 注意：在异步计算属性时需要手工指定依赖，因为无法自动分析依赖
     * 同步计算时不需要指定依赖，因为可以自动分析依赖
     
     * 
    */
    depends?: ComputedDepends
    /**
     * 为该计算函数指定一个分组名
     * 
     * @description
     * 
     * 此属性用来将计算函数分组，比如一个store中具有相同group的计算函数
     * 然后就可以启用/关闭/运行指定分组的计算函数
     * 在表单中通过为所有validate指定统一的分组名称，这样就可以统一控制表单的验证是否计算
     * 
     * store.computedObjects.get(["a","b"]).run() // 重新启动
     * 马上重新运行指定组的计算函数
     * store.computedObjects.getGroup("a"]).run() // 运行组     
     * store.computedObjects.enableGroup("b"]) 
     * 
     */
    group?:string

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
    timeout?:number  | [number,number]    

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
    immediate?:'auto' | boolean
    /**
     *  计算函数不可重入，即同一个计算函数在执行过程中，不会再次执行   
     *  如果重入时，则在debug=true时会在控制台打印出警告信息
     */
    noReentry?:boolean
    /**
     * 提供一个异步信号，用来传递给异步计算函数以便可以取消异步计算
     * 
     * @description
     * 
     * 仅在异步计算函数中有效
     * 
     */
    abortSignal?:()=>AbortSignal | null | void | undefined
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
    retry?:number | [number,number]  

    /**
     * 
     * 是否保存创建的computedObject对象
     * 
     * @description
     * 
     * 默认情况下，每一个计算属性均会创建一个computedObject对象实便并且保存到store.computedObjects中
     * 
     * 默认=true,=false则不会保存
     * 
     */
    objectify?:boolean 
    /**
     * 额外的参数
     */
    extras?:any
    /**
     * 当执行计算getter函数出错时的回调
     */
    onError?:(e:Error)=>void            
    /**
     * 当计算完成后的回调函数
     */
    onDone?(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[],scope:Scope,result:any}):void

}


export type AsyncComputedResult<Result= any,ExtAttrs extends Dict = {}> ={
    loading : boolean;
    progress: number;                // 进度值    
    timeout : number ;               // 超时时间，单位ms，当启用超时时进行倒计时
    error   : any;
    retry   : number                 // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试
    result  : Result;                // 计算结果保存到此处
    run     : (options?:RuntimeComputedOptions) => {};        // 重新执行任务
    cancel  : ()=>void                                        // 中止正在执行的异步计算
  } & ExtAttrs

  



export type SyncComputedOptions<Value=any,Scope=any> = Pick<ComputedOptions<Value,Scope>, 
    'id' | 'enable' | 'onError' | 'onDone' | 'depends' | 'initial' | 'objectify' | 'group' | 'scope' | 'extras'>


/**
 * 计算属性所在的位置
 */
export type ComputedContext<Value=any> = {
    path      : string[]
    value     : Value
    parentPath: string[]
    parent    : any
}

export type ComputedDescriptor<Value=any,Scope=any,Options extends Dict = Dict> = {    
    getter : ComputedGetter<Value,Scope> | AsyncComputedGetter<Value,Scope>
    options: Options
}

export type ComputedDescriptorBuilder<Value=any,Scope=any,Options extends Dict = Dict> = {
    ():ComputedDescriptor<Value,Scope,Options> 
    [COMPUTED_DESCRIPTOR_FLAG]     : true 
    type                          : ComputedType              
}



export type ComputedSyncReturns<T=any> = (...args: any) => Exclude<T,Promise<any>>;  

 

/**
 * 返回函数的返回值类型
 * 支持返回()=>Promise<R>中的R类型 
 */
export type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer R> ? R : (
    T extends (...args: any) => infer R ? R : any)
 

export type PickComputedResult<T> = T extends  ComputedDescriptorBuilder<infer X> ? AsyncComputedResult<X> : 
    ( T extends WatchDescriptor<any,infer X> ? X :                                  
        ( T extends Computed<infer X> ? X:                                              // 同步函数
            (T extends AsyncComputed<infer X> ? AsyncComputedResult<X> :                // 异步函数
                T
            )
        )                              
    )
    // export type PickComputedResult<T> = T extends  ComputedDescriptor<infer X> ? AsyncComputedResult<X> : 
    // ( T extends WatchDescriptor<any,infer X> ? X :                                  
    //     ( T extends ComputedSyncReturns<infer X> ? X:                               // 同步函数
    //         (T extends AsyncComputed<infer X> ? AsyncComputedResult<X>:             // 异步函数
    //             (T extends Computed<infer R> ? R : T) 
    //         )
    //     )                              
    // ) 
/**
 
 转换状态中的计算属性函数的类型
 将状态中的计算属性函数转换为计算属性函数的返回值类型
 如：ComputedState<{count:()=>1}> => {count:number}
 如：ComputedState<{count:async ()=>1}> => {count:number}

*/
export type ComputedState<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends (...args:any) => any ? PickComputedResult<T[K]> : T[K] extends Record<string, any> ? ComputedState<T[K]> : T[K];
};

 

// 在ComputedState的基础上，排除了undefined的类型
export type RequiredComputedState<T extends Record<string, any>> = {
    [K in keyof T]-?: Exclude<T[K],undefined> extends (...args:any) => any ? PickComputedResult<Exclude<T[K],undefined>> : Required<T[K]>extends Record<string, any> ? ComputedState<Exclude<T[K],undefined> > : Exclude<T[K],undefined> ;
};



