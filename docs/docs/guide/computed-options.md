---
group:
  title: 计算属性
  order: 2
title: computed
order: 3  
demo:
  tocDepth: 5
---


无论是同步或异步计算属性均推荐使用`computed`函数来声明。


## 函数签名

`computed`是一个函数，用于声明一个计算属性，其函数签名声明如下：


```ts | pure
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: AsyncComputedGetter<R>,depends?:ComputedDepends,options?: ComputedOptions<R,ExtraAttrs>): ComputedDescriptor<R & ExtraAttrs>;
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: ComputedGetter<R>, options?: ComputedOptions<R,ExtraAttrs>): R
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: any,depends?:any, options?: ComputedOptions<R,ExtraAttrs>):any {
```

## getter

`getter`参数是一个同步或异步的计算函数，其函数签名声明如下：

```ts | pure
export type ComputedGetter<R,Scope=any> = (scopeDraft: Scope) => Exclude<R,Promise<any>>
export type AsyncComputedGetter<R,Scope=any> = (scopeDraft:Scope,options:Required<ComputedParams>) => Promise<R>
```

- `getter`函数的`this`默认指向根状态对象，但是可以通过`options.context`来重新指定。
- `getter`函数的第一个入参`scopeDraft`，即`作用域`，默认指向当前状态对象，但是可以通过`options.scope`来重新指定。

## Options

`computed`支持以下计算配置参数：

```ts |pure

export interface ComputedOptions<Value=any,Extras extends Dict={}> {
  // 计算函数的唯一标识，如果未指定，则自动生成一个唯一标识
  id?:string | ((path:string[])=>string)                         
  context?: ComputedContext             // 计算函数的this
  scope?  : ComputedScope               // 计算函数的第一个参数
  // 初始值
  initial?: Value
  // 异步计算,默认情况下，通过typeof(fn)=="async function"来判断是否是异步计算函数
  // 但是在返回Promise或者Babel转码等情况下，判断可能失效时，需要手动指定async=true
  async?:boolean
  /**
   * 指定超时时间，当计算函数执行超过指定时间后，会自动设置loading为false
   * 如果timeout是一个数组，则第一个值表示超时时间，第二个值表示超时期的倒计时间隔
   * 例如：[1000,10]表示1000ms代表1s后超时并置loading=false
   * 10代表setInterval(1000/100), 每次执行时-1，直到为0时停止
   * 这样就可以通过绑定timeout值来实现倒计时的效果
   * 如果要实现60秒倒计时，可以这样写：[60*1000,60],这样value.timeout就会从60开始递减
   */
  timeout?:number  | [number,number]
  // 是否立刻计算，默认为true，在创建时马上进行计算，=false,则只有在依赖变化时才会执行，或者手动调用run方法
  immediate?:boolean                     
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
   * 指定计算结果更新到哪里
   * 
   * self: 默认，原地替换，异步计算属性会将计算函数转换成一AsyncComputedObject对象，此对象包含value,loading,error等属性
   * root: 更新到根对象中
   * parent: 更新到父对象中
   * current: 更新到当前对象中
   * none: 不更新到任何对象中
   * {String} 当前对象的指定键
   * {Array} 从根对象开始的完整路径
   * 
   */
  toComputedResult?: 'self' | 'root' | 'parent' | 'current' | 'none' | string[] | string 
  /**
   * 为该计算函数指定一个分组名
   * 
   * 此属性用来将计算函数分组，比如一个store中具有相同group的计算函数
   * 
   * 然后就可以启用/关闭/运行指定分组的计算函数
   * 
   * 在表单中通过为所有validate指定统一的分组名称，这样就可以统一控制表单的验证是否计算
   * 
   * store.computedObjects.runGroup("a"])
   * 
   */
  group?:string
  /**
   * 计算开关
   * 当=false时不会执行计算
   */

  enable?:boolean
  /**
   * 额外合并到计算结果AsyncComputedObject中的属性
   */
  extras?:Extras
};

```




