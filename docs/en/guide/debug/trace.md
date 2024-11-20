# trace
Because there may be complex dependency computing relationships between state, in order to better debug the state change,`AutoStore` one `trace` function to help debug `AutoStore` state operation.

 `trace` the signature of the function is as follows:

```ts
type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
function trace(fn: ()=>any,operates?:WatchListenerOptions['operates']):StateTracker 
```

## Synchronous tracking


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

 **The actual operation effect is as follows:** 

<demo react ="debug/syncTrace.tsx"/>

## Asynchronous tracking

If you want to track asynchronous functions, it will be more complicated, as examples below:

<demo react ="debug/asyncTrace.tsx"/>


- `c` it is an asynchronous calculation attribute, depending on `a` and `b`,when `a` or `b` during the change,`c` will recalculate

 **It seems that there is no problem. The follow -up log is as expected, but the actual situation will be more complicated. Look at the following example:** 


<demo react ="debug/asyncTrace2.tsx"/>


We can see from the above example **In the operation log`set b`I didn’t see the right later`set d.value`Operation**.

This is because `d` it is an asynchronous calculation attribute,`d` the calculation is here `c` it will only start after the calculation is completed,
right `d` the calculation is performed in the next asynchronous event cycle of the tracking function. At this time, the tracking function has been executed, so it cannot be tracked to the right `d` operation.

Obviously, we expect `state.b = 20` after that, it can track a series of operating logs that are derived.

Therefore, in this case, we need to do it `start()` provide an expected ending function to determine whether to stop tracking, as follows:


<demo react ="debug/asyncTrace3.tsx"/>

- If for some reason, we cannot receive `set d.value` operation, you can call `tracker.stop()` methods to stop tracking.

:::warning reminder
 `trace` methods are used only during debugging.
:::