# 异步计算

## 引言 
`AutoStore`提供了非常强大的异步计算属性特性，使用`computed`来声明创建一个异步计算属性。

:::warning 提示
所有`computed(async (scope)=>{....})`声明的异步计算属性均会被原地替换为`AsyncComputedValue`对象。
:::

## 工作内幕

创建异步计算属性的基本方法是直接在`State`中任意位置使用`computed`进行声明。

```tsx   {6-8}
import { computed } from "@autostorejs/react"
const store = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
```

- 以上`total`是一个异步计算属性，并且手动指定依赖了`./price`和`./count`(相对路径依赖，见[依赖收集](./deps))。


<demo react="computed/showAsyncValue.tsx"/>

**重点：**

当我们使用`createStore`创建异步计算属性，内部主要做了两件事：

- **1. 将声明原地替换为`AsyncComputedValue`**

经过`createStore`处理后，`store.state.order.total`的值会被替换为`AsyncComputedValue`类型的值，即:
```json
{   
  "loading":false,
  "timeout":0,
  "retry":0,
  "error":null,
  "value":10,
  "progress":0
}
```

当异步计算的依赖发生变化时，会自动触发计算属性的重新计算，并更新`value`以及`loading`、`error`、`progress`等状态。详见下文高级特性。

- **2. 创建`AsyncComputedObject`对象**

同时会创建一个名称为`声明所在路径名称`的`AsyncComputedObject`对象保存在`store.computedObjects`中。
因此，在上例中，`store.computedObjects.get("order.total")`就是`AsyncComputedObject`对象。

## computed

**`computed`是一个普通的函数，用于声明计算属性，异步计算属性的函数签名如下：**

```ts 
function computed<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,
  options?: ComputedOptions<Value,Scope>
):ComputedDescriptorBuilder<Value,Scope>;
```

**参数说明：**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `getter` | `AsyncComputedGetter` | 异步计算函数 |
| `depends` | `ComputedDepends` | 声明依赖 |
| `options` | `ComputedOptions` | 异步计算属性相关参数 |

### 异步计算函数

`getter`参数（即异步计算函数）,其返回值将更新到状态中的`computed`声明的路径上，详见[介绍](./getter)。

### 指定依赖

- `depends`：依赖收集，用来指定依赖的状态路径。如何指定依赖详见[依赖收集](./deps)。
- `options`：异步计算属性的一些选项，详见[选项](./options)。

### 配置参数

`options`参数是一个`ComputedOptions`对象，用来指定计算属性的一些选项。详见[计算选项](./options)。
 
## 基本用法

异步计算属性的创建与同步计算一样均是使用`computed`来声明，但是最重要的一点是**异步计算需要显式指定依赖**。

<demo react="computed/asyncBase.tsx" 
  title="修改firstName或lastName时，fullName会自动重新计算。"
/>


- 以上`fullName`是一个异步计算属性，手动指定其依赖于`user.firstName`和`./lastName`(相对路径)。
- 依赖可以使用绝对路径或相对路径，使用`.`作为路径分割符，`./`指的是当前对象，`../`指的是父对象,详见[依赖收集](./deps)。
- 当在输入框架中修改`firstName`或`lastName`时，`fullName`会自动重新计算。
- 计算属性的结果保存在`state.user.fullName.value`中。
- 当计算属性正在计算时，`state.user.fullName.loading`为`true`。计算完成后，`state.user.fullName.loading`为`false`



## 高级特性🔥

### 加载状态

异步计算属性的加载状态保存在`AsyncComputedValue`对象的`loading`属性中。

- 当`loading=true`时，代表异步计算正在进行中。
- 当`loading=false`时，代表异步计算已经完成。

以下是一个异步计算加载状态的例子：

<demo react="computed/asyncLoading.tsx"/>

- `useAsyncReactive`用来返回异步计算属性的状态数据。


### 执行进度

异步计算属性允许控制计算的进度，执行进度保存在`AsyncComputedValue`对象的`progress`属性中，当`progress`为`0-100`时，代表异步计算的进度。开发者可以根据进度值来展示进度条等。

**使用方法如下：**

<demo react="computed/asyncProgressbar.tsx"
  title="调节订单数量时，total会自动重新计算。"
/>


- 当调用`getProgressbar`函数时会启动进度条功能，可以控制进度条的进度。
- `getProgressbar`函数返回一个进度条对象，该对象有两个方法：`value`和`end`，`value`用来设置进度值，`end`用来结束进度条。


### 超时处理

在创建`computed`时可以指定超时参数(单位为`ms`)，实现**超时处理**和**倒计时**功能。基本过程是这样的。

1. 指定`options.timeout=超时时间`
2. 当异步计算开始时，会启动一个定时器时，并更新`AsyncComputedValue`对象的`timeout`属性。
3. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedValue.error`属性中。

<demo react="computed/asyncTimeout.tsx"/>


### 倒计时

在`超时`功能中不会自动更新`timeout`属性，可以通过`timeout=[超时时间,间隔更新时长]`来启用倒计时功能。

基本过程如下：

1. 指定`options.timoeut=[超时时间,间隔更新时长]`
2. 当异步计算开始时，会启动一个定时器，更新`AsyncComputedValue`对象的`timeout`属性。
3. 然后每隔`间隔更新时长`就更新一次`AsyncComputedValue.timoeut`
4. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedValue.error`属性中。


**例如：`options.timoeut=[5*1000,5]`代表超时时间为5秒，每1000ms更新一次`timeout`属性，倒计时`5`次。**

 
<demo react="computed/asyncCountDown.tsx"/>


### 重试

在创建`computed`时可以指定重试参数，实现**出错重试执行**的功能。基本过程是这样的。

- 指定`options.retry=[重试次数,重试间隔ms]`
- 当开始执行异步计算前，会更新`AsyncComputedValue.retry`属性。
- 当执行出错时，会同步更新`AsyncComputedValue.retry`属性为重试次数。


<demo react="computed/asyncRetry.tsx"/>
 
**说明**

- 重试次数为`0`时，不会再次重试。重试次数为`N`时，实际会执行`N+1`次。
- 重试期间`error`会更新为最后一次错误信息。


### 取消

在创建`computed`时可以传入一个`abortSignal`参数，该参数返回一个`AbortSignal`，用来取消计算操作。

基本操作方法是：

- 在`computed`中传入`abortSignal`参数，该参数是一个`AbortSignal`，可用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- 取消时可以调用`AsyncComputedObject.cancel()`方法来触发一个`AbortSignal`信号。如下例中调用`state.order.total.cancel()`
  
<demo react="computed/asyncCancel.tsx"/>
  
**注意**：

- `abortSignal`参数是一个`AbortSignal`对象，可以用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- **需要注意的**，如果想让计算函数是可取消的，则当调用`AsyncComputedObject.cancel()`时，计算函数应该在接收到`abortSignal`信号时，主动结束退出计算函数。如果计算函数没有订阅`abort`信号，调用`AsyncComputedObject.cancel()`是不会生效的。



### 不可重入

默认情况下，每当依赖发生变化时均会执行异步计算函数，在连续变化时就会重复执行异步计算函数。

在声明时，允许指定`options.reentry=false`来防止重入，如果重入则只会在控制台显示一个警告。


## 简写异步计算

大部份情况下，异步计算属性均应该使用`computed`进行声明，但也可以直接使用一个异步函数。

```ts   {5-7}
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
} 
```

上述简单的异步声明方式等效于以下方式：

```tsx {7-9}
import { createStore,computed} from "@autostorejs/react"

const store = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:computed(async (order)=>{
      return order.price*order.count
    },[]) // 依赖是空的
}
 )
```

**当不使用`computed`进行异步计算属性声明时，需要注意以下几点：**

- 默认`scope`指向的是`current`，即`total`所在的对象。
- 其依赖是空，所以不会自动收集依赖，也不会自动重新计算。也就是说上例中的`price`和`count`变化时，`total`不会自动重新计算。但是在会在第一次访问时自动计算一次。
- 如果需要重新计算，可以手动执行`store.state.total.run()`或`store.computedObjects.get(<id>).run()`。



## 注意事项

- **当异步计算函数返回一个`Promise`时的问题**

`computed`内部使用`isAsync`来判断传入的`getter`函数是否是一个异步函数，以采取不同的处理逻辑。
但是在低版本JS场景下，这个判断可能不正确。

比如在进行`babel`将代码转译到`es5`等低版本代码时，异步函数可能会被转译为同步函数，此时需要显式指定`options.async=true`。

```ts  {7}
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      return user.firstName+user.lastName
    },["user.firstName","user.lastName"],{
      async:true
    })
  })
```

显式指定`computed(async ()=>{...},[...],{async:true})`，这样就可以正确识别为异步函数。



 
