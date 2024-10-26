# 渲染优化

## 引言


`@autostorejs/react`是一个基于`Proxy`的响应式状态系统，其提供了`useReactive`和`signal`机制来实现更细粒度的渲染。

以下我们就如何优化`React`渲染,举了几个例子。

##  **Context**

我们先看一个传统的`Context`的渲染例子。

<demo react="store/useContextRender.tsx" />

从上面的例子可看到，当更新`Context.age`时，所有的子组件不管是否有使用`Age`均会重新渲染，而这是不必要的，因为子组件并没有使用到`Context`的数据，为此我们一般需要使用`React.memo`或一些第三方库来进行优化渲染。

:::warning 提示
**最大的问题在于，当更新根`Context`时，所有的子组件都会重新渲染，这是不必要的，因为子组件并没有使用到根`Context`的数据。我们希望能实现更细粒度的渲染，只有当子组件使用到的数据发生变化时，才会重新渲染。**
::: 

## useReactive

为了优化渲染逻辑，一般我们会使用`React.memo`来进行优化渲染。

<demo react="store/useReactiveMemo.tsx" />

- 在上例中，当更新`Age`时，仅根组件会重新渲染，而`FirstName`和`LastName`不会重新渲染，因为它们并没有使用到`Age`。
- 当在根组件中更新`FirstName`时，仅`FirstName`会重新渲染。而`LastName`组件中没有`FirstName`，所以不会重新渲染。

:::warning 提示
**在大型`React`应用，面对复杂的状态变化，如何决定何时使用`React.memo`是一个很大的心智问题,也是最容易搞坑里的，这也是为什么`React`官方要推`Compiler`的原因**

::: 

## 信号组件

而更好的办法就是最近比较流行的`signal`机制，`signal`机制可以将**渲染颗粒度限定在组件范围**，只有使用到数据的组件才会重新渲染。

基于`Signal`,**渲染颗粒度可以是组件中的一个片段或ReactNode**，更加精细，更加高效。

了解更多关于`Signal`的内容，可以阅读[深入解析：React中的信号组件与细粒度更新](https://juejin.cn/post/7425580383013027850)

<demo react="store/useSignalRender.tsx" />

- 在上例中，提供了更细粒度的更新，当状态变化时，仅`$(....)`内部会重新渲染，而其他部分不会重新渲染。再也不需要`React.memo`了。
- 关于`Signal`的更多用法，可以参考[信号组件](/guide/signal/about)



:::info 提示
本文档演示中使用的色块组件`ColorBlock`在最右侧会显示组件的渲染次数，每渲染一次+1，方便观察组件的渲染更新情况。
:::

