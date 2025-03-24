---
group:
  title: 计算属性
  order: 2
title: 手动执行
order: 8 
demo:
  tocDepth: 5
toc: content
---

## 关于

一般情况下，计算属性的计算是自动进行的，当依赖变化时，计算属性会自动重新计算。

但是有时候我们需要手动执行计算，或者对计算进行分组，这时候就需要使用`ComputedObject`对象。

每一个计算函数均会创建一个`ComputedObject`实例，保存在`store.computedObjects`,该对象有以下属性和方法:


## 运行计算函数

使用`store.computedObjects.get(<id>).run()`来运行计算函数。

```tsx | pure {15,16} 
import { createStore,computed } from '@autostorejs/react';
const store = createStore({
  order:{
    price:100,
    count:4,
    total: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"]),
    total2: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"],{id:"x"})
  }
})
// 获取计算对象，然后运行计算函数
store.computedObjects.get("order.total").run()
store.computedObjects.get("x").run()

```

- 每一个计算属性对象均会创建一个对应的`ComputedObject`,`id`是计算属性所在路径名，如`user.fullName`。也可以通过`id`参数来指定唯一标识。
- 通过`store.computedObjects.get(<id>)`来获取计算对象，然后调用`run`方法来运行计算函数。


## run方法

通过`computedObject.run(args:RuntimeComputedOptions)`方法用来重新运行计算函数。

`run`函数的参数如下：

```ts | pure
export type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean            // 当第一次运行时为true
    operate?: StateOperate       // 变化的依赖信息
} 
```

- 当手动运行计算函数时，允许传入`RuntimeComputedOptions`参数，用来覆盖默认的计算参数。
- `first`参数用来标识是否为第一次运行计算函数。一般手工运行时不要指定
- `operate`参数用来指定变化的依赖信息，当计算属性的依赖值发生变化时，会传入此参数，此参数包含所依赖的状态信息。而当手工执行时，不需要指定此参数。
- `ComputedOptions`的配置参数可以参考[计算参数](./options)。
 
## 运行分组

`ComputedObjects`提供了一个`runGroup`方法，用来执行分组计算。
当使用`computed`方法创建计算属性时，可以传入一个`group`参数，用来为计算属性分组，然后就可以通过`runGroup`方法，用来手动执行该分组计算函数。

<demo react="computed/runGroup"/>

## 启用/禁用计算

`computed`提供了一个`enable`属性用来控制是否进行计算。当`enable=false`时，当依赖变化时不会进行计算，直至`enable=true`。

**我们可以通过以下方法来启用/禁用计算。**

- 可以在使用`computed`创建计算属性时，传入`enable`来指定计算属性的默认状态。
- 可以通过`ComputedObjects.get(<路径名称>).enable=<true/false>`来启用/禁用计算。
- 可以通过`ComputedObjects.enableGroup(<true/false>)`来启用/禁用某个组的计算。

<demo react="computed/enableAndDisableRun.tsx"/> 、

