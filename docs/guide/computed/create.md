# 创建

使用`computed`函数创建计算属性。

```ts

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

```tsx  {5-8}
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

<demo react="computed/createSyncBase.tsx"/>
 

更详细介绍请参考[同步计算属性](./sync.md)

:::warning 提示
同步计算属性的依赖收集是自动的，基本方法就是会在初始化时执行一次，然后通过内部的`proxy`拦截访问来收集依赖。
:::

### 异步计算属性

使用`computed(<getter>,<depends>,<options>)`函数声明异步计算属性。

```typescript {5-12}
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

更详细介绍请参考[异步计算属性](./async.md)


:::warning 提示
异步计算属性需要通过`computed`函数来指定依赖。
:::


## 动态创建计算对象

也可以不在状态中声明`computed`，而是使用`store.computedObjects.create`动态创建计算属性。

`create`方法的签名如下：

```typescript
// 创建同步计算对象
function create<Value = any, Scope = any>(
  getter: ComputedGetter<Value,Scope>,
  options?: SyncComputedOptions<Value,Scope>
):SyncComputedObject<Value,Scope>
// 创建异步计算对象
function create<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,options?: ComputedOptions<Value,Scope>
): AsyncComputedObject<Value,Scope>    
// 使用创建计算对象
function create<Value = any, Scope = any>(
  descriptor:ComputedDescriptor<Value,Scope>
): AsyncComputedObject<Value,Scope> | SyncComputedObject<Value,Scope>    
   
```

动态创建计算属性的三种方法：

### 动态创建同步计算

```ts  
import { createStore } from '@autostorejs/react';

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

// 简单的同步计算
const totalObj = store.computedObjects.create((order)=>order.price * order.count)

```

### 动态创建异步计算

```ts 
import { createStore } from '@autostorejs/react'; 

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

// 简单的异步计算
store.computedObjects.create(async (order)=>order.price * order.count,
  ['order.price','order.count']     //  ✅ 使用绝对依赖
  ['./price','./count']             // ❌ 不支持相对依赖
)
```


### 使用computed创建

上述两种方式内部也是使用`computed`来创建的，其等效于:

```ts 

// 同步计算
store.computedObjects.create(computed((order)=>order.price * order.count))

//  异步计算
store.computedObjects.create(computed(async (order)=>order.price * order.count,
  ['order.price','order.count'] //  ✅ 使用绝对依赖
  ['./price','./count']  // ❌ 不支持相对依赖
))
```

使用`computed`可以进行更多的配置，比如`options`等。
 

## 小结

**动态创建计算属性时与在状态中声明计算属性相比，存在以下区别**：

- 动态创建计算属性不存在状态上下文，指依赖时不使用相对依赖，只能使用绝对依赖，即`./`、`./`、`PARENT`等依赖是无效的。
- 动态创建计算对象的`associated=true`
- 动态创建计算对象的功能与在状态中声明创建的功能基本相同，但计算结果没有存储在状态中，而是存储在计算对象中。可以通过`obj.value`来获取计算结果。

更详细介绍请参考[动态创建计算对象](./objects.md)


:::warning 提示
使用`computed(<getter>,<depends>,<options>)`创建计算属性时，涉及到:
- `getter`：计算函数, 在依赖更新时执行。详见[计算函数](./getter.md)
- `depends`：依赖, 详见[依赖](./deps.md)
- `options`：各种控制选项, 详见[选项](./options.md)
:::
