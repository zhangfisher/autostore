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
import { DynamicValueDescriptor, DynamicValueOptions } from "../dynamic/types"
import { Dict } from "../types"

 
export type ComputedDepends = (string | string[])[] 
export type ComputedGetter<Value,Scope=any> = (scope: Scope) => Exclude<Value,Promise<any>>
export type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (scope:Scope,args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>

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
  }


export interface ComputedOptions<Value=any,Scope=any> extends DynamicValueOptions<Value> {     

 
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
     * 当执行计算getter函数出错时的回调
     */
    onError?:(e:Error)=>void              

    /**
     * 
     * 默认情况下，每一个计算属性均会创建一个computedObject对象实便并且保存到store.computedObjects中
     * 
     * 默认=true,=false则不会保存
     * 
     */
    objectify?:boolean 
    /**
     * 当计算完成后的回调函数
     */
    onDone?(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,valuePath:string[],scope:Scope,result:any}):void
};
    
export type AllComputedGetter<Value,Scope> = ComputedGetter<Value,Scope> | AsyncComputedGetter<Value,Scope>

export type ComputedDescriptor<Scope=any,Value=any> = DynamicValueDescriptor<
    AllComputedGetter<Value,Scope>,
    ComputedOptions<Scope,Value>
>
    
export type RequiredComputedOptions<Scope=any,Value=any> = Required<ComputedOptions<Scope,Value>>
 
// 运行时计算属性配置参数，用来传递给计算函数覆盖默认的配置参数
export type RuntimeComputedOptions = Pick<ComputedOptions,
    'enable' |'onDone' | 'scope' | 'abortSignal' 
    | 'noReentry' | 'retry' | 'onError' | 'timeout'> &
    {
        initialize?:boolean             // 当第一次运行时传入
        path?:string[]                   // 所依赖数据的路径        
    }

