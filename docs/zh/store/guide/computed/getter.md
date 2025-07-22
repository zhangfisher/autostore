# 计算函数

当使用`computed(<getter>,[depends],<options>)`创建计算属性时，无论是同步计算属性还是异步计算属性，都需要指定一个`Getter`函数，用于计算属性的计算逻辑，**该函数的返回值就是计算属性的值**。

同步计算属性和异步计算属的`Getter`函数签名不是一样的，如下：

## 函数签名

- **同步计算属性的Getter函数签名如下：**

```ts | pure
type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
```

- **异步计算属性的Getter函数签名如下：**

```ts | pure
type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
```

## 执行计算函数

### 自动执行

当计算属性的依赖发生变化时，`AutoStore`会自动执行计算函数`Getter`.

### 手动执行

一般情况下，不需要手动执行计算函数，但是在某些特殊情况下，可能需要手动执行计算函数，此时可以通过`computedObjects.get('<id>').run()`方法来手动执行计算函数。

<demo react="computed/runGetter.tsx"/>


:::info 
更多关于`computedObjects`以及手动执行等请参考[计算对象](./objects)章节。
:::
