# Store

use `AutoStore` the starting style is to create one `AutoStore` the core object, all functions are based on `Store` objects to achieve.

 `AutoStore` provide `createStore` and `useStore` two methods to create `Store` object.
 

## CreateStore

 `createStore` methods to create `AutoStore` object.

- **Method signature** 

 `createStore` the method signature is as follows:
 
```ts
function createStore<State extends Dict>(
  initial: State,
  options?:AutoStoreOptions<State>
):ReactAutoStore<State>
```

- **Exemplary example** 

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

Create `store` after the object, you can pass `store.state` object to access status data.

- **Access status data** besides `store.state.price` 
- **Modify status data** besides `store.state.price = 200`, This will trigger `total` re -calculation, because it depends on `price` and `count`.
- **Monitoring status data changes** besides `watch("count",callback)` methods to monitor the read and write operation of status data. When the state data changes, the callback function will be triggered.
- **Signal component** besides `$('total')` to create `React` component, this component will be in `total` re -rendering when the state data changes, so as to achieve the finest granular component update.

 
## usestore

Can be used in components `useStore` create `AutoStore` example.


- **Method signature** 

 `createStore` the method signature is as follows:
 
```ts
function useStore<State extends Dict>(
  initial: State,
  options?:AutoStoreOptions<State>
):ReactAutoStore<State>
```

- **Exemplary example** 

```tsx
import { useStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components" 
 

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
```## Configuration

 `createStore` the second parameter of the method is configuration, which is used to configure `Store` behavior.

```ts

export type AutoStoreOptions<State extends Dict> = { 
    id?:string 
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
    log?:(message:any,level?:'info' | 'error' | 'warn')=>void  
    
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
```### ID

- **type** besides `string` 
- **default value:**  `Random string` 

for `Store` object provides an ID for identifying the current `Store` object.
Generally, no configuration is required, just enabled `debug` pattern and `devTools` when it is used to distinguish different ones `Store` object.

### debug

- **type** besides `boolean` 
- **default value:**  `false` 

Open up `debug` models will output log information.

### lazy

- **type** besides `boolean` 
- **default value:**  `false` 

Open up `lazy` models create calculation objects only when reading.


### enablecomputed

- **type** besides `boolean` 
- **default value:**  `false` 

Whether to enable calculations, should `enableComputed=false` at the time, the calculation attribute will be created, but all the calculation functions will not be executed. Equivalent to the global computing general switch.

### getrootscope

- **type** besides `(state:State,options:{computedType:ObserverType, valuePath:string[] | undefined}) => any` 
- **default value:**  `undefined` 

The calculation function is obtaining `scope` call it on time and allow the root cause of the root `scope`.
The default point is the current root object, which can be modified here.

for example `return  state.fields`, Represent the root point of the calculation function `state.fields` essence This is when specified dependencies, such as `depends="count"`, Will automatically convert it to `state.fields.count`.


### scope

- **type** besides `ComputedScope` 
- **default value:**  `undefined` 

By default, all `computedObject`,`watchObject` of `scope` the parameters are `CURRENT`.
For example, you can use this parameter to make all the ones `computedObject`,`watchObject` default `scope` the parameters are `ROOT ` 


### Log

- **type** besides `(message:any,level?:'info' | 'error' | 'warn')=>void` 
- **default value:**  `undefined` 

Be enabled `debug=true` functions used to output log information.
This function can be used to define the output log information, which can be more convenient to combine the log in the application system.

### oncomputemcreated

- **type** besides `(this:AutoStore<State>,computedObject:ComputedObject)=> void` 
- **default value:**  `undefined` 

Call when creating calculation attributes.

### oncomputeddone

- **type** besides `(this:AutoStore<State>,args:{id:string,path:string[],value:any,computedObject:ComputedObject})=> void` 
- **default value:**  `undefined` 

Call when the calculation attribute calculation is completed.


### oncomputedeerror

- **type** besides `(this:AutoStore<State>,args:{id:string,path:string[],error:Error,computedObject:ComputedObject})=> void` 
- **default value:**  `undefined` 

Call when the calculation attribute is calculated.### oncomputedcancel

- **type** besides `(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject<any>})=> void` 
- **default value:**  `undefined` 

Call when the calculation attribute is canceled.