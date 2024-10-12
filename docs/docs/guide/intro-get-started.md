---
group:
  title: 开始
  order: 0
order: 2   
demo:
  tocDepth: 5
toc: content
---

# 快速入门

`AutoStore`功能强大，易于使用，以下通过一个简单的例子来展示如何使用`AutoStore`。

## 第1步: 安装

:::code-group

```bash [npm]
npm install  @autostorejs/react
npm install @autostorejs/devtools
```

```bash [yarn]
yarn add @autostorejs/react
yarn add @autostorejs/devtools
```

```bash [pnpm]
pnpm add @autostorejs/react
pnpm add @autostorejs/devtools
``` 
:::

安装`@autostorejs/devtools`可以让开发者使用`chrome`的[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)来调试`AutoStore`的状态。

## 第2步: 创建Store

```ts | pure
import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9
    }
  ]
});
```






