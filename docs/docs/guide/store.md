---
group:
  title: Store
  order: 1 
title: Store
order: 1  
demo:
  tocDepth: 5
toc: content

---


使用`AutoStore`的起手式就是创建一个`Store`对象，`Store`对象是`AutoStore`的核心对象，所有的功能都是基于`Store`对象来实现的。
 

## createStore

`createStore`方法用来创建`AutoStore`对象。

- **方法签名**

`createStore`方法签名如下：
 
```ts
function createStore<State extends Dict>(
  initial: State,
  options?:AutoStoreOptions<State>
):AutoStore<State>
```

- **示例**

```ts 

const store = createStore({
  price:100,
  count:2,
  total:(scope)=>{
    return scope.price * scope.count
  }
})

const { state, $, watch  } = store

```

创建好`store`对象后，可以通过`store.state`对象来访问状态数据。

- **访问状态数据**: `store.state.price`
- **修改状态数据**: `store.state.price = 200`，这样会触发`total`的重新计算，因为其依赖于`price`和`count`。
- **监听状态数据变化**: `watch("count",callback)`方法用来监听状态数据的读写操作，当状态数据变化时会触发回调函数。
- **信号组件**: `$('total')`用来创建`React`组件，该组件会在`total`状态数据变化时重新渲染，从而实现最细粒度的组件更新。

 
## useStore

一般使用`createStore`创建全局状态对象，如果需要在组件中使用，可以使用`useStore`来获创建。

```tsx
import { useStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"
 

export default () => {
  const { state,$ } = useStore({
    count:18
  }) 

  return <div>    
      <ColorBlock name="Count">{$('count')}</ColorBlock>
      <Button onClick={()=>state.count++}>Count++</Button>
    </div>
} 

const { state, $, watch  } = store
```



## 配置

`createStore`方法的第二个参数是配置，用来配置`Store`的行为。

```ts

export type AutoStoreOptions<State extends Dict> = {
    /**
     * 提供一个id，用于标识当前store
     */
    id?:string

    /**
     * 是否启用调试模式
     * @description
     * 
     * 调试模式下会在控制台输出一些日志信息
     * 
     */
    debug?:boolean 

    /**
     *  是否马上创建动态对象
     * 
     * 
     * @description
     * 
     * 默认情况下，计算函数仅在第一次读取时执行,
     * 如果lazy=true时，则延迟创建计算对象
     * 
     * @default true
     * 
    */
    lazy?: boolean 
    /**
      * 是否启用计算
      * 
      * @description
      * 
      * 当enableComputed=false时，会创建计算属性，但不会执行计算函数
      * 可以通过enableComputed方法启用
      * 
      * 相当于全局计算总开关
      * 
      *       
      * 
    */
    enableComputed?:boolean
    
    /**
     * 获取计算函数的根scope
     * 
     * @description
     * 
     * 计算函数在获取scope时调用，允许修改其根scope
     * 
     * 默认指向的是当前根对象，此处可以修改其指向
     * 
     * 比如,return  state.fields，代表计算函数的根指向state.fields
     * 这样在指定依赖时，如depends="count"，则会自动转换为state.fields.count
     * 
     */
    getRootScope?:(state:State,options:{computedType:ObserverType, valuePath:string[] | undefined}) => any

    /**
     * 
     * 为所有动态值对象提供默认的scope参数
     *    
     * @description
     * 默认情况下，所有computedObject,watchObject的scope参数均为CURRENT
     * 可以通过此参数来为所有的computedObject,watchObject提供默认的scope参数
     * 比如让所有的computedObject,watchObject的默认scope参数均为ROOT 
     * 
     */
    scope?: ComputedScope
    /**
     * 当启用debug=true时用来输出日志信息
     * 
     * @param message 
     * @param level 
     * @returns 
     */
    log?:(message:any,level?:'log' | 'error' | 'warn')=>void  
    
    /**
     * 
     * 当创建计算属性时调用
     * 
     * @description
     * 
     * 允许在此对计算对象进行一些处理，比如重新封装getter函数，或者直接修改ComputedOptions
     * 
     * @example
     * 
     * createStore({...},{
     *  onCreateComputed(computedObject){
     *      const oldGetter = computedObject.getter
     *      computedObject.getter = function(){
     *          do something
     *          return oldGetter.call(this,...arguments) 
     *      }
     *  }
     * })  
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCreated?:(this:AutoStore<State>,computedObject:ComputedObject)=> void
    
    /**
     * 当每一次计算完成后调用
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedDone?:(this:AutoStore<State>,args:{id:string,path:string[],value:any,computedObject:ComputedObject})=> void

    /**
     * 当计算出错时调用
     * @param this 
     * @param error 
     * @param computedObject 
     * @returns 
     */    
    onComputedError?:(this:AutoStore<State>,args:{id:string,path:string[],error:Error,computedObject:ComputedObject})=> void
    /**
     * 当每一次计算对象被取消时调用
     * 仅在异步计算时有效
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCancel?:(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject<any>})=> void

}
```


