---
group:
  title: 监视
  order: 3 
title: 手动执行  
order: 5
demo:
  tocDepth: 5
toc: content
---

## 介绍

根据`AutoStore`的基本原理，其内置了一个状态变化事件系统，用来监视`State`中的数据变化，当状态数据变化时会触发相应的事件。
通过侦听事件就可以使用`watch`用来监视`State`数据的变化,当所监视的数据发生时，可以执行侦听器函数。


提供三种使用`watch`的方式：

- 调用`store.watch`函数，用来侦听`State`中的数据变化。
- 直接在`State`中声明`watch`函数,然后将侦听器返回值写入声明`watch`函数所在的位置。
- 在组件中调用`store.useWatch`函数，用来侦听`store`对象的变化,当组件销毁自动取消订阅。



