# 计算选项

## 关于

无论是同步或异步计算属性均推荐使用`computed`函数来声明。

`computed`函数支持`ComputedOptions`配置参数，可以通过配置参数来控制计算属性的行为。

`computed`是一个函数，用于声明一个计算属性，其函数签名声明如下：

```ts
// 声明异步计算属性
function computed<Value = any, Scope = any>(
    getter: AsyncComputedGetter<Value, Scope>,
    depends: ComputedDepends,
    options?: ComputedOptions<Value, Scope>,
): ComputedDescriptorBuilder<Value, Scope>;
// 同步计算属性
function computed<Value = any, Scope = any>(getter: ComputedGetter<Value, Scope>, options?: SyncComputedOptions<Value, Scope>): ComputedDescriptorBuilder<Value, Scope>;
```

## 选项

`computed`支持以下计算配置参数：

### id

**类型**：`string`

创建计算属性对象`ComputedObject`时唯一标识，如果未指定

-   使用`computed`所在的路径名作为标识，如`user.fullName`。
-   动态创建的`ComputedObject`会自动生成一个唯一标识。

当然，您也可以通过`id`参数来指定唯一标识。

### immediate

**类型**：`boolean | 'auto'`
**默认值**：`'auto'`

针对异步计算属性是否在初始化时立刻运行一次计算函数`getter`.取值如下：
| 值 | 说明 |
| :---: | --- |
| `true` | 在创建异步计算时马上执行一次 |
| `false` | 在创建异步计算时不马上执行一次，后续仅在依赖变化时执行 |
| `auto` | 当`initial==undefined`时会马上执行一次，其他值则不马上执行一次 |

### initial

**类型**：可以通过泛型参数指定`Value`
**默认值**：undefined

作为计算属性的初始值。

### scope

**类型**：`ComputedScope`
**默认值**: `Current`

指定计算函数的第一个参数，如果未指定，则默认为`Current`。详见[ComputedScope](./scope.md)。

### enable

**类型**：`boolean`
**默认值**：`true`

计算开关，当`enable=false`时不会执行计算。
也可以通过`store.computedObjects.get(<id>).enable=<true/false>`来统一控制计算属性的开关。

### async

**类型**：`boolean`
**默认值**：`undefined`

默认情况下，`computed`函数会通过`typeof(fn)=="async function"`来判断是否是异步计算函数,以决定如何创建同步或异步计算属性。
但是在返回`Promise`或者`Babel`转码等情况下，判断会失效时，需要手动指定`async=true`

### depends

**类型**：`ComputedDepends`

必填依赖项，用于异步计算属性指定的依赖项。详见[ComputedDepends](./deps.md)。

### group

**类型**：`string`

用于将计算属性分组，便于管理。比如可以通过`store.computedObjects.runGroup("a"])`来运行指定分组的计算函数。

参考[手工运行](./run.md)。

### objectify

**类型**：`boolean`
**默认值**：`true`

是否将创建的`computedObject`对象保存到`store.computedObjects`中。
将`objectify=false`,在`React`组件中动态创建计算属性时，不将计算属性保存到`store.computedObjects`中。以便在组件销毁时自动释放。

### timeout

**类型**：`number | [number,number]`
**默认值**：`0`

用来控制异步函数执行的超时。

-   指定超时时间，当计算函数执行超过指定时间后，会触发超时错误。
-   如果`timeout=[超时时间,倒计时间隔]`， 例如：[1000,10]表示`1000ms`超时,每隔 100ms 更新一下`timeout`值，实现倒计时的效果。

详见[超时处理](./async#超时处理)。

### noReentry

**类型**：`boolean`
**默认值**：`false`

计算函数不可重入，即同一个计算函数在执行过程中，不会再次执行.

### abortController

**类型**：`()=>AbortController | undefine`

提供一个自定义的`AbortController`用来替代默认的`AbortController`，用来传递给异步计算函数以便可以取消异步计算.

详见[异步计算-取消](./async#取消)。

### retry

**类型**：`number`
**默认值**：`0`

用来控制异步计算失败后重试次数。

-   默认`retry=0`代表不启用重试控制。
-   `retry=3`表示最多重试`3`次,重试间隔为`0`，加上第`1`次执行，总共执行`4`次
-   `retry=[3,1000]`表示最多重试`3`次，重试间隔为`1000ms`，加上第`1`次执行，总共执行`4`次
-   重试数据可以通过`AsyncComputedValue.retry`获取
-   当首次执行失败时触发重试，此时`AsyncComputedValue.retry=3`，然后每次重试`-1`，直到为`0`时停止重试

详见[重试处理](./async#重试)。

### extras

**类型**：`any`

额外参数，用于传递给计算函数。在计算函数中可以通过`extras`参数获取。

```ts
import { createStore,computed } from '@autostorejs/react';
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user,{extras})=>{
      // 通过extras获取额外参数
      return user.firstName+user.lastName + `${count}`
    },["./firstName","./lastName"],{extras:{count:0}})
  }
})
```

### onError

**类型**：`(error:Error)=>void`

当执行计算`getter`函数出错时的回调

### onDone

**类型**：`(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void`

当计算函数执行完成时的回调

## 重载选项

当使用`<AsyncComputedValue>.run(<RuntimeComputedOptions>)`或`store.computedObjects.run(<RuntimeComputedOptions>)`手动运行计算函数时，允许对部分选项进行重载覆盖。

```ts
type RuntimeComputedOptions = ComputedOptions & {
    first?: boolean; // 当第一次运行时为true
    operate?: StateOperate; // 变化的依赖信息
};
```

:::warning 注意

-   调用`run`方法手动执行计算函数时允许重载部分选项，但不允许重载`id`、`depends`、`scope`等关键选项。
-   计算选项的重载仅在当前运行时有效，不会影响声明时的配置。
    :::
