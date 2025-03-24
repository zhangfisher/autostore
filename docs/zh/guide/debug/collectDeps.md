# 依赖收集

`AutoStore`提供了一个`collectDependencies`的API，用于收集当前状态的依赖关系。通过该API，可以方便的查看当前状态的依赖关系，帮助开发者更好的理解状态之间的关系。
 
```ts
const deps = store.collectDependencies(()=>{
    state.a=1
    state.b=1
    state.c
})     
```

**实际运行效果如下：**

<demo react="debug/collectDeps.tsx" />

- 该API只能收集同步操作的依赖关系。
- 默认是将函数内部的`all`操作视为依赖。上例中我们对`a`,`b`进行了`write`操作，读取了`c`,所以`a`,`b`,`c`都会被收集到依赖中。
- 通过`options`可以配置只收集`read`操作，或者只收集`write`操作。

```ts
const deps = store.collectDependencies(()=>{
    state.a=1
    state.b=1
    state.c
},{operates:"read"})     
```

