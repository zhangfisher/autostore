# 创建

`AutoStore`核心类，所有的功能都是基于`AutoStore`对象来实现的。

```ts
import { AutoStore } from 'autostore';

const store = new AutoStore(
    {
        price: 100,
        count: 2,
        total: (scope) => {
            return scope.price * scope.count;
        },
    },
    {
        // 配置参数
    },
);
```

创建好`store`对象后，可以通过`store.state`对象来访问状态数据。

-   **访问状态数据**: `store.state.price`
-   **修改状态数据**: `store.state.price = 200`，这样会触发`total`的重新计算，因为其依赖于`price`和`count`。
-   **监听状态数据变化**: `watch("count",callback)`方法用来监听状态数据的读写操作，当状态数据变化时会触发回调函数。

## 配置参数

创建`AutoStore`实例支持以下参数`AutoStoreOptions`:

### id

-   **类型**: `string`
-   **默认值:** `随机字符串`

为`Store`对象提供一个 id，用于标识当前`Store`对象。
一般不需要配置，仅仅在启用`debug`模式和`devTools`时，用来区分不同的`Store`对象。

### debug

-   **类型**: `boolean`
-   **默认值:** `false`

启用`debug`模式，会在输出日志信息。

### enableComputed

-   **类型**: `boolean`
-   **默认值:** `false`

是否启用计算,当`enableComputed=false`时，会创建计算属性，但所有计算函数均不会执行。相当于全局计算总开关。

### getRootScope

-   **类型**: `(state:State,options:{computedType:ObserverType, valuePath:string[] | undefined}) => any`
-   **默认值:** `undefined`

计算函数在获取`scope`时调用，允许修改其根`scope`。
默认指向的是当前根对象，此处可以修改其指向。

比如`return  state.fields`，代表计算函数的根指向`state.fields`。这样在指定依赖时，如`depends="count"`，则会自动转换为`state.fields.count`。

### scope

-   **类型**: `ComputedScope`
-   **默认值:** `undefined`

默认情况下，所有`computedObject`,`watchObject`的`scope`参数均为`CURRENT`。
比如可以通过此参数来将所有的`computedObject`,`watchObject`的默认`scope`参数均为`ROOT `

### log

-   **类型**: `(message:any,level?:'info' | 'error' | 'warn')=>void`
-   **默认值:** `undefined`

当启用`debug=true`时用来输出日志信息的函数。
可以使用此函数来自定义输出日志信息的方式，能更方便与应用系统的日志结合。

### onComputedCreated

-   **类型**: `(this:AutoStore<State>,computedObject:ComputedObject)=> void`
-   **默认值:** `undefined`

当创建计算属性时调用。

### onComputedDone

-   **类型**: `(this:AutoStore<State>,args:{id:string,path:string[],value:any,computedObject:ComputedObject})=> void`
-   **默认值:** `undefined`

当计算属性计算完成时调用。

### onComputedError

-   **类型**: `(this:AutoStore<State>,args:{id:string,path:string[],error:Error,computedObject:ComputedObject})=> void`
-   **默认值:** `undefined`

当计算属性计算出错时调用。

### onComputedCancel

-   **类型**: `(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject<any>})=> void`
-   **默认值:** `undefined`

当计算属性被取消时调用。
