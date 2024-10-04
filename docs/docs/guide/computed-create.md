---
group:
  title: 计算属性
  order: 2
order: 2 
demo:
  tocDepth: 5
toc: content
---

# 创建

使用`computed`函数创建计算属性。

```ts | pure

// 同步计算属性
function computed<Value = any, Scope = any >(
    getter: ComputedGetter<Value,Scope>,  // 计算函数
    options?: SyncComputedOptions<Value,Scope>
):Value;
// 异步计算属性
function computed<Value = any, Scope = any>(
   getter: AsyncComputedGetter<Value,Scope>, // 计算函数
   depends: ComputedDepends,       // 指定依赖
   options?: ComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;
```



## 状态中声明计算属性

直接在状态中声明计算属性。

### 同步计算属性

使用`computed(<getter>,<options>)`函数声明同步计算属性。

```tsx | pure  {5-8}
const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. 快速创建，自动收集依赖
    total1:(order)=>order.price * order.count,
    // 2. 使用computed函数创建计算属性,并指定创建
    total2:computed((order)=>order.price * order.count),
  }
})
```

以下是一个同步计算属性的示例：

```tsx 
import { createStore,computed } from '@autostorejs/react';
import { ColorBlock,Button } from 'components';

const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. 快速创建，自动收集依赖
    total1:(order)=>order.price * order.count,
    // 2. 使用computed函数创建计算属性,并指定创建
    total2:computed((order)=>order.price * order.count),
  }
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <ColorBlock name="Price">{state.order.price}</ColorBlock>
    <ColorBlock name="Count">{state.order.count}</ColorBlock>
    <ColorBlock name="Total 1">{state.order.total1}</ColorBlock>
    <ColorBlock name="Total 2">{state.order.total2}</ColorBlock>
    <Button onClick={()=>setState((state)=>state.order.count++)}>Count++</Button>
  </div>
}

```

更详细介绍请参考[同步计算属性](./computed-sync.md)

:::warning{title=提示}
同步计算属性会在初始化时执行一次来自动收集依赖，这样就可以在依赖变化时自动触发重新计算。
:::

### 异步计算属性

使用`computed(<getter>,<depends>,<options>)`函数声明异步计算属性。

```ts | pure {5-12}
const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    // 1.快速创建，无依赖
    fullName:async (user)=>user.firstName+user.lastName
    // 2.使用computed函数创建计算属性,依赖和选项
    fullName:computed(async (user，args)=>{
      user.firstName+user.lastName,
    },
    ['./firstName','./lastName'],
    {...options....})
  }
})


```

更详细介绍请参考[异步计算属性](./computed-async.md)


:::warning{title=提示}
异步计算属性需要通过`computed`函数来指定依赖。
:::


## 独立创建计算属性

也可以不在状态中声明，而是使用`store.computedObject.create`创建计算属性。

```ts | pure {11-16}
import { createStore } from '@autostorejs/react';

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher"
  }
})

// 同步计算属性
const obj = store.computedObject.create((user)=>user.firstName+user.lastName)
// 异步计算属性
const obj = store.computedObject.create(
  async (user)=>user.firstName+user.lastName,  // 计算函数
  ['./firstName','./lastName'],                // 指定依赖
  {...options....}                             // 参数
)

```

