# 监听信号组件

:::warning title
阅读本节时请先理解`computed`和`watch`章节。
:::

## 关于

计算信号组件是将`computedObject`封装成信号组件，当`computedObject`中的状态数据变化时，会自动触发信号组件的重新渲染。
而监听信号组件是将`watchObject`封装成信号组件，当`watchObject`中的状态数据变化时，会自动触发信号组件的重新渲染。

![](./images/signal-watch.drawio.png)

**方法函数签名如下：**

```ts | pure
interface SignalComponentType<State extends Dict>{
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
}
```



## 监听信号组件

就如何计算信号组件是对`computed`的封装一下，监听信号组件是可以实现`watch`的封装。

```ts  {3-5,7-9}
$<any>(
    // 渲染函数
    ({value})=>{
      return <div>{value}</div>
    },
    watch(({path,value},watchObj)=>{
      return xxxx
    })
) 
```
 

以下是一个监听信号组件的示例：
  
<demo react="signals/signalWatch.tsx"/>


- 上例中，我们使用`watch`来动态创建一个监听信号。
- 当状态中的`validate`变化时，我们计算出整个状态的有效性,然后将有效性的结果写入到`validate`中，从而触发监听信号组件的重新渲染。

