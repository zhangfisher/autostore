# 安装

- `autostore`: 核心包
- `@autostorejs/plugins`: 官方插件包，包括了`trace`、`shadow`、`asyncpro`等插件
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

## @autostorejs/plugins

`@autostorejs/plugins`是官方插件包，包括了`trace`、`shadow`、`asyncpro`等插件：

- `asyncpro`：提供`asyncComputed`高级异步计算属性，支持加载状态、执行进度、超时、倒计时、重试、可取消等特性，详见[异步计算](./computed/async)。
- `shadow`：影子 store，在不污染原 store 的前提下派生额外的计算视图。
- `trace`：跟踪函数内部的状态操作，用于调试。

:::code-group

```bash [npm]
npm install  @autostorejs/plugins
```

```bash [yarn]
yarn add @autostorejs/plugins
```

```bash [pnpm]
pnpm add @autostorejs/plugins
```

```bash [bun]
bun add @autostorejs/plugins
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
