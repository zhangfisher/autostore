---
group:
  title: 开始
  order: 0
order: 1   
demo:
  tocDepth: 5
toc: content
---

# 安装

`AutoStore`共包括三个包：

- `autostore`: 核心包
- `@autostorejs/reace`: 面向`React`开发者
- `@autostorejs/devtools`: 使用`Redux DevTools`调试`AutoStore`


## autostore

`autostore`是核心包，提供了`AutoStore`的核心功能。

如果你是`Vue`等其他框架的开发者，可以直接使用`autostore`。

该包使用`new AutoStore`来创建`AutoStore`实例。


:::code-group

```bash [npm]
npm install  autostore
```

```bash [yarn]
yarn add autostore
```

```bash [pnpm]
pnpm add autostore
``` 
:::


## @autostorejs/reace

:::warning{title=注意}
如果您是`React`开发者，只需要安装`@autostorejs/react`即可。
:::

`@autostorejs/react`已经集成了`autostore`包的所有功能，不需要额外安装`autostore`。

:::code-group

```bash [npm]
npm install  @autostorejs/react
```

```bash [yarn]
yarn add @autostorejs/react
```

```bash [pnpm]
pnpm add @autostorejs/react
``` 
:::

## @autostorejs/devtools

`@autostorejs/devtools`是`AutoStore`的调试工具包，基于`chrome`的[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)来调试`AutoStore`的状态。

 :::code-group

```bash [npm]
npm install  @autostorejs/devtools
```

```bash [yarn]
yarn add @autostorejs/devtools
```

```bash [pnpm]
pnpm add @autostorejs/devtools
``` 
:::


## @autostorejs/vue

目前还没有实现，可以通过封装`autostore`实现`Vue`的集成。

`@autostorejs/react`也仅是`autostore`的封装，代码量很少，有兴趣的同学可以尝试一下。



