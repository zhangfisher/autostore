---
group:
  title: 基础
  order: 1 
title: Store
order: 1  
demo:
  tocDepth: 5
toc: content

---


使用`AutoStore`的起手式就是创建一个`Store`对象，`Store`对象是`AutoStore`的核心对象，所有的功能都是基于`Store`对象来实现的。

## 创建

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

## 工作原理

使用`createStore`创建的是一个`AutoStore`类实例，其负责管理状态数据和收集依赖，并且在当状态值变化时会触发事件，从而触发组件重新渲染。`AutoStore`对象的基本工作原理结构如下：

![](./store.drawio.png)

### **准备阶段**

1. 当创建`AutoStore`对象时，会创建一个`Proxy`对象，用来代理状态数据。
2. 同时创建一个名称为`changesets`的`EventEmitter`（基于`mitt`封装）。
3. 然后递归遍历状态数据时，会根据数据类型创建不同的对象（支持设置`lazy=true`，仅在读取时创建）：
    - 如果是`{}`或`数组`则会创建一个`Proxy`对象，用来代理`{}`或`数组`的属性和方法，这样就可以实现支持任意嵌套的状态数据。
    - 如果是`计算函数`则会创建一个`ComputedObject`对象，同时该`ComputedObject`对象会实例保存到`store.computedObjects`中。
    - 如果是`监听函数`则会创建一个`WatchObject`对象实例保存到`store.watchObjects`中。
4. 当创建`ComputedObject`对象实例时，会根据同步或异步的方式计算出初始值和收集依赖。
    - 如果是同步计算函数，则会执行一次来自动收集依赖。
    - 如果是异步计算函数，则需要手动指定依赖。
  然后，根据依赖的目标路径，调用`store.changesets.on('依赖路径')`来订阅变更事件


:::info{title=如何区分`计算函数`和`监听函数`}
`计算函数`等同于`Vue`的`computed`，当所依赖的数据变化时执行，一般依赖是确定的。而`监听函数`等同于`Vue`的`watch`，用来监听状态数据的变化，可以监听动态范围的依赖变化。
:::


### **更新阶段**

1. 当`store.state.count=100`更新状态值时，该操作会被`Proxy`对象`set`方法拦截，计算出更新的状态值所有的路径`['count']`，然后在`store.changesets`触发`emit('count',<operateParams>)`方法，通知所有订阅者。
2. 对应的`ComputedObject`订阅者收到通知后，会执行`计算函数Getter`，然后将执行结果保存到`store.state`中的原始路径上。
 

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
    getRootScope?:(state:State,options:{computedType:ComputedType, valuePath:string[] | undefined}) => any

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
