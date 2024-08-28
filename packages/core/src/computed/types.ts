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
import { COMPUTED_DESCRIPTOR_FLAG, SKIP_PROXY_FLAG } from "../consts"

 


    // /**
    //  * 收集依赖
    //  */
    // private collectDependencies(){
    //     const dependencies:string[][] = []
    //     const traverse = (obj: any, parentPath: string[]) => {
    //         if (typeof obj !== 'object' || obj === null) {
    //             return;
    //         }
    //         for (const key of Object.keys(obj)) {
    //             const value = obj[key];
    //             const path = [...parentPath, key];
    //             if (typeof value === 'function') {
    //                 // 通过运行函数来收集依赖
    //                 this.runSyncFunction(value, path);
    //             } else {
    //                 traverse(value, path);
    //             }
    //         }
    //     };
    //     traverse(this._data, []);
    // }
    // private runSyncFunction(func: Function, path: string[]) {
    //     // 在运行同步时，收集依赖
    //     const listenerId =this.on(({ operate, path }) => {
    //         if(operate==='get'){
    //             dependencies.push(path)
    //         }
    //     }) 
    //     func.call(this,this._data)
    //     this.off(listenerId)
    //     this.dependencies.set(path.join('.'),new Set(dependencies))
    // }

export interface ComputedOptions<Scope=any,Value=any> {
    // 计算函数的唯一标识，如果未指定，则自动生成一个唯一标识
    id?      : string                          
    initial? : Value
    // 异步计算,默认情况下，通过typeof(fn)=="async function"来判断是否是异步计算函数
    // 但是在返回Promise或者Babel转码等情况下，判断会失效时，需要手动指定async=true
    async?:boolean
    // 指定依赖，例如["key","a.b.c"]等形式
    depends?:string[]
    /**
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
     * 针对异步计算属性
     * 
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
     */
    abortSignal?:()=>AbortSignal | null | void | undefined
    /**
     * 当计算函数执行出错时的重试次数
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
     * 为该计算函数指定一个分组名
     * 
     * 此属性用来将计算函数分组，比如一个store中具有相同group的计算函数
     * 
     * 然后就可以启用/关闭/运行指定分组的计算函数
     * 
     * 在表单中通过为所有validate指定统一的分组名称，这样就可以统一控制表单的验证是否计算
     * 
     * 
     * store.computedObjects.get(["a","b"]).run() // 重新启动
     * 
     * 马上重新运行指定组的计算函数
     * store.computedObjects.getGroup("a"]).run() // 运行组
     * // 启用/禁用指定组的计算函数 =false 代表禁用计算 =true开启动计算
     * store.computedObjects.enableGroup("b"]) 
     * 
     */
    group?:string
    /**
     * 计算开关
     * 当=false时不会执行计算，也就是不会执行计算函数
     * 
     */    
    enable?:boolean        
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
      

export type ComputedDescriptor<Scope=any,Value=any> = {    
    getter                    : (scope:Scope)=>Value
    options?                  : ComputedOptions<Value>    
    __COMPUTED__              : 'sync' | 'async'
    [SKIP_PROXY_FLAG]         : true
    [COMPUTED_DESCRIPTOR_FLAG]: true
}
    
export type RequiredComputedOptions<Scope=any,Value=any> = Required<ComputedOptions<Scope,Value>>
 