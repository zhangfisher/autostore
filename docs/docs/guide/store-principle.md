---
group:
  title: Store
  order: 1  
order: 0  
demo:
  tocDepth: 5
toc: content

---

# 了解

使用`AutoStore`的起手式就是创建一个`AutoStore`对象，`AutoStore`类是`AutoStore`的核心对象，所有的功能都是基于`AutoStore`对象来实现的。

在使用`AutoStore`之前我们简单了解一下`AutoStore`的基本原理和工作流程。

## **对象结构**

`AutoStore`对象的基本工作原理结构如下：

![](./store.drawio.png)

`AutoStore`对象的核心部件由以下几个部分组成：

- `state`：状态数据的`Proxy`代理对象，负责拦截状态数据的读写操作。
- `computedObjects`：计算属性对象的集合，用来存储所有的计算属性对象。
- `watchObjects`：监听对象的集合，用来存储所有的监听对象。
- `changesets`：状态读写事件触发器，相当于一个内部的`事件总线`，用来订阅和发布状态数据的变更事件。当`a.b.c`的值进行读写操作时，会触发`changesets.emit('a.b.c')`事件，通知所有订阅者。因此我们可以通过`changesets.on('a.b.c')`来订阅`a.b.c`的读写变更事件。

## **工作流程**

### **准备阶段**

1. 当创建`AutoStore`对象时，会创建一个`Proxy`对象，用来代理状态数据。
2. 同时创建一个名称为`changesets`的`EventEmitter`（基于`mitt`封装）。
3. 然后递归遍历状态数据时，会根据数据类型创建不同的对象（支持设置`lazy=true`，仅在读取时创建）：
    - 如果是`{}`或`数组`则会创建一个`Proxy`对象，用来代理`{}`或`数组`的属性和方法，这样就可以实现支持任意嵌套的状态数据。
    - 如果是`计算函数`则会创建一个`ComputedObject`对象，同时该`ComputedObject`对象会实例保存到`store.computedObjects`中。
    - 如果是`监听函数`则会创建一个`WatchObject`对象实例保存到`store.watchObjects`中。
4. 当创建`ComputedObject`对象实例时，会根据同步或异步的方式计算出初始值和收集依赖。
    - 如果是同步计算函数，则会执行一次来自动收集依赖。
    - 如果是异步计算函数，则需要手动指定依赖。
  然后，根据依赖的目标路径，调用`store.changesets.on('依赖路径')`来订阅变更事件


:::info{title=如何区分计算函数和监听函数}
`计算函数`等同于`Vue`的`computed`，当所依赖的数据变化时执行，一般依赖是确定的。而`监听函数`等同于`Vue`的`watch`，用来监听状态数据的变化，可以监听动态范围的依赖变化。
:::


### **更新阶段**

接下来，当状态数据发生变化时，后续流程如下：

1. 当`store.state.count=100`更新状态值时，该操作会被`Proxy`对象`set`方法拦截，计算出更新的状态值的路径`['count']`，
2. 然后在`store.changesets`触发`emit('<状态路径>',<operateParams>)`方法，通知所有订阅者。
3. 对应的`ComputedObject`订阅者收到通知后，会执行`计算函数Getter`，
4. 最后将`计算函数Getter`的执行结果保存到`store.state`中的原始路径上。
