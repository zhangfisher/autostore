---
group:
  title: 信号
  order: 4 
order: 0  
demo:
  tocDepth: 5
toc: content
---

# 了解

## 什么是信号？


在主流的前端开发框架中，无论是`React`、`Vue`还是`Svelte`，核心都是围绕着更高效地进行`UI`渲染展开的。

为了实现高性能，基于DOM总是比较慢这个假设前提，其最核心的要解决的问题有两个：

- **响应式更新**
- **细粒度更新**

为了将`响应式更新`、`细粒度更新`优化到极致，各种框架是八仙过海，各显神通。以最流行的`React`和`Vue`为例， 

- 首先两者均引入了`Virtual DOM`的概念。
- `Vue`的静态模板编译，通过编译时的静态分析，来优化`细粒度更新`逻辑，在编译阶段尽可能地分析出该渲染的DOM。
- 而`React`使用`JSX`动态语法，本质上是一个函数，难以进行静态分析，所以`React`只能在运行时想办法。
  - 因此`React`就有了`Fiber`的概念，通过`Fiber`的调度来实现优化渲染逻辑，但是`Fiber`的调度逻辑很复杂，官方搞这玩意折腾了有一年。
  - 然后就是一堆的`React.memo`的优化手段，但是应用复杂时，驾驭起来也有**比较大的心智负担**。
  - 因此，官方又搞了个`React Compiler`，通过编译时的静态分析，来为代码自动添加`React.memo`逻辑，但这玩意从提出到现在怎么也有两年了，还在实验阶段。估计也是不太好搞。

由于`Virtual DOM`的特性，无论是`React`还是`Vue`，本质上都是在`Virtual DOM`上进行`diff`算法，然后再进行`patch`操作，差别就是`diff`算法的实现方式不同。

当人们将`Virtual DOM`玩出花后，突然有人提出，引入`Virtual DOM`并不是高性能的必选项，本质上只需要按需细粒度更新就可以，跟是否使用`Virtual DOM`并没有必然关系。

然后，就有了类似`Svelte`这样的框架，它不使用`Virtual DOM`，不需要`diff`算法，而是引入`signal`概念，可以在**信号触发时只更新变化的部分，真正的细粒度更新**。这一下子就把`React`和`Vue`之类的`Virtual DOM`玩家们给打蒙了，一时间`signal`成了前端开发的新宠。

所有的前端框架均在`signal`靠拢，`Svelte`和`solidjs`成了`signal`的代表，`Vue Vapor`就是`Vue`的`signal`实现（还没有发布）。


**那么什么是信号？**

`signal` 是前端开发中管理和处理状态变化的重要工具。它可以帮助开发者更高效地创建响应式应用程序，并确保在状态变化时`UI`能够自动更新。不同的前端框架和库有不同的实现方式，但核心思想都是相同的。

以下是`solidjs`的`signal`的一个简单示例：

```jsx | pure
 import { createSignal, onCleanup } from 'solid-js';
function App() {
  // 创建一个 signal，初始值为 0
  const [count, setCount] = createSignal(0);

  // 创建一个清理函数，用于在组件卸载时取消订阅
  onCleanup(() => {
    console.log('组件卸载');
  });

  // 定义一个函数，用于增加 count 的值
  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <div>
      <h1>计数器: {count()}</h1>
      <button onClick={increment}>增加</button>
    </div>
  );
}
export default App;
```

**我们也可以自己实现一个简单的`signal`：**

```js | pure
<h1>计数器: <span id="count">0</span></h1>
<button id="increment">增加</button>

  <script>
      class Signal<T> {
          private _value: T;
          private _subscribers: Array<(value: T) => void> = [];
          constructor(initialValue: T) {
              this._value = initialValue;
          }
          get value(): T {
              return this._value;
          }
          set value(newValue: T) {
              if (this._value !== newValue) {
                  this._value = newValue;
                  this.notifySubscribers();
              }
          }
          subscribe(callback: (value: T) => void): () => void {
              this._subscribers.push(callback);
              return () => {
                  this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
              };
          }

          private notifySubscribers() {
              this._subscribers.forEach(callback => callback(this._value));
          }
      }

      const countSignal = new Signal<number>(0);
      const countElement = document.getElementById('count')!;
      const incrementButton = document.getElementById('increment')!;

      function render() {
          countElement.textContent = countSignal.value.toString();
      }
      function increment() {
          countSignal.value += 1;
      }
      countSignal.subscribe(render);
      incrementButton.addEventListener('click', increment);
      render();
  </script>
```


## 信号组件

**那么我们如何在`React`中使用`signal`呢？**

本质上，`React`并不是一个`Signal`框架，其为渲染调度是基于`Virtual DOM`、`fiber`和`diff`算法的。
因此，`React`并不支持`signal`的概念，除排未来`React`像`Vue`一样升级`Vue Vapor mode`进行重大升级，抛弃`Virtual DOM`，否则在`React`在中是不能真正使用如同`solidjs`和`Svelte`的`signal`概念的。

但是无论是`Virtual DOM`还是`signal`，核心均是为了解决`细粒度更新`的问题，从而提高渲染问题。

因此，我们可以结合`React`的`React.memo`和`useMemo`等方法来模拟`signal`的概念，实现`细粒度更新`。

这样我们就有了**信号组件**的概念，其本质上是使用`React.memo`包裹的`ReactNode`组件。
- 该组件`diff`总是返回`true`,如`React.memo(()=>{.....},()=>true)`
- 然后在该组件内部会订阅所依赖的状态变化，当状态变化时重新渲染该组件。
- 由于`diff`总是返回`true`，因此重新渲染就被约束在了该组件内部，不会引起连锁反应，从而实现了`细粒度更新`。

以下是`AutoStore`中的`signal`的一个简单示例：


```tsx
/**
* title: 信号组件
* description: 通过`state.age=n`直接写状态时，需要使用`{$('age')}`来创建一个信号组件,内部会订阅`age`的变更事件，用来触发局部更新。
*/
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state , $ } = createStore({
  age:18
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock>Age+Signal :{$('age')}</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock>Age :{state.age}</ColorBlock>
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
    </div>
}

``` 
