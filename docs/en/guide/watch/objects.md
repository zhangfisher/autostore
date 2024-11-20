# 监视对象

## 关于

如同`ComputedObject`一样，所有在状态中直接使用`watch`声明的均会创建一个对应`WatchObject`对象。

通过`Store.watchObjects`可以访问所有声明的`WatchObject`对象，可以进行相关的动态移除/禁用等操作。

以下是实现表单数据的脏检察的简单示例：

<demo react="watch/watchDirty.tsx"/>
 

## 动态创建监听对象

同`computed`一样，不在状态中声明`watch`，也可以使用`store.watchObjects.create`动态创建监听对象

`create`方法签名如下：

```ts
  create<Value=any,DependValue=any>(
    getter:WatchGetter<Value,DependValue>,
    filter?:WatchDependFilter<DependValue>,
    options?:Omit<WatchOptions<Value>,'filter'>
):WatchObject<Value>   
```

示例如下：

```ts {11-16}
import { createStore } from '@autostorejs/react';

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher"
  }
})


const obj = store.watchObjects.create((user)=>user.firstName+user.lastName)
 
const obj = store.watchObjects.create(
  (user)=>user.firstName+user.lastName,  // 计算函数
  ['./firstName','./lastName'],                // ❌ 不支持相对依赖
  ['user.firstName','user.lastName'],          // ✅ 使用绝对依赖
  {...options....}                             // 参数
)

```**动态创建监听对象时与在状态中声明监听对象相比，存在以下区别**：

- 动态创建监听对象不存在状态上下文，指依赖时不使用相对依赖，只能使用绝对依赖，即`./`、`./`、`PARENT`等依赖是无效的。
- 动态创建监听对象的`associated=false`
- 动态创建监听对象的功能与在状态中声明创建的功能基本相同，但计算结果没有存储在状态中，而是存储在监听对象中。可以通过`obj.value`来获取计算结果。
 


## 手动执行

同`ComputedObject`一样，`WatchObject`也可以手动执行，通过`store.watchObjects.get("<id>").run()`来执行监听函数。
 