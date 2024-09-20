---
title: 与计算属性区别
order: 4
group:
  title: 监视
  order: 3  
demo:
  tocDepth: 5
---
 

`watch`函数与`computed`函数功能的区别如下：

- `computed`函数是用来声明计算属性的，`watch`函数是用来侦听`State`中的数据变化的。
- `computed`函数的返回值会写入`State`中的对应属性，`watch`函数的返回值会写入`watch`函数所在的位置。
- `computed`函数的创建的计算属性是基于依赖收集的，而`watch`函数是基于侦听的,每当`State`状态变化时均会调用`watchOptions.on`过滤函数来匹配侦听函数，因此理论上，`computed`函数的性能更好，而`watch`函数性能会差些。
- `watch`只能是同步侦听函数，而`computed`可以是异步函数。
