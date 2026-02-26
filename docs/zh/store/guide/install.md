# 安装

- `autostore`: 核心包
- `@autostorejs/devtools`: 使用`Redux DevTools`调试`AutoStore`
- `@autostorejs/syncr`: 远程同步两个`AutoStore`

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

```bash [bun]
bun add autostore
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

```bash [bun]
bun add @autostorejs/devtools
```

:::

## @autostorejs/syncer

用来实现同步不同`AutoStore`的数据，支持一对一，一对多等同步。

:::code-group

```bash [npm]
npm install  @autostorejs/syncer
```

```bash [yarn]
yarn add @autostorejs/syncer
```

```bash [pnpm]
pnpm add @autostorejs/syncer
```

```bash [bun]
bun add @autostorejs/syncer
```

:::
