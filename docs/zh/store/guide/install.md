# 安装

-   `autostore`: 核心包
-   `@autostorejs/devtools`: 使用`Redux DevTools`调试`AutoStore`
-   `@autostorejs/syncr`: 远程同步两个`AutoStore`

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

## @autostorejs/syncer

用来远程同步两个`AutoStore`的数据，如在同步`browser`和`worker`的`AutoStore`数据。
