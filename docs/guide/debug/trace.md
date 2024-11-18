# trace

由于状态之间可能存在复杂的依赖计算关系，为了更好的调试状态的变化，`AutoStore`提供了一个`trace`函数来帮助调试`AutoStore`的状态操作。

`trace`函数的签名如下：

```ts
type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
function trace(fn: ()=>any,operates?:WatchListenerOptions['operates']):StateTracker 
```

## 同步跟踪


```ts {9-15}
import { createStore } from "@autostorejs/react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

// 创建跟踪器
tracker = trace(()=>{
  state.a = 1
  state.b = 2
})     
// 开始跟踪，结束后返回操作列表
const operates = await tracker.start()    

```

**实际运行效果如下：**

<demo react="debug/syncTrace.tsx" />

## 异步跟踪

如果要跟踪的是异步函数，则会复杂一些，如下例：

<demo react="debug/asyncTrace.tsx" />


- `c`是一个异步计算属性，依赖于`a`和`b`，当`a`或`b`变化时，`c`会重新计算

**看起来好像没什么问题，跟踪日志如所预期那样，但是实际情况会比较复杂,再看以下示例：**


<demo react="debug/asyncTrace2.tsx" />


从上例中我们可以看到**操作日志中`set b`后没有看到对`set d.value`的操作**。

这是因为`d`是一个异步计算属性，`d`的计算是在`c`的计算完成后才会开始的，
对`d`的计算是在跟踪函数的执行后的下一次异步事件循环中进行的，而此时跟踪函数已经执行完毕了，所以就无法跟踪到对`d`的操作。

显然，我们预期是在`state.b = 20`之后，能跟踪到其派生的一系列操作日志的。

因此，这种情况下，我们需要为`start()`提供一个预期的结束函数，来判断是否停止跟踪，如下：


<demo react="debug/asyncTrace3.tsx" />



- 如果因为某些原因，我们无法接收`set d.value`的操作，可以调用`tracker.stop()`方法来停止跟踪。




:::warning 提示
`trace`方法仅在开发时进行调试时使用。
:::