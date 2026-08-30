# 安装

`@autostorejs/syncer` 用来实现同步不同 `AutoStore` 的数据，支持一对一、一对多等同步场景。

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

## 标准版与 Lite 版

`@autostorejs/syncer` 提供**两个版本**的入口，按需引入以控制包体积：

| 版本     | 入口                          | 内容                                                                   | 适用场景                                        |
| -------- | ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| 标准版   | `@autostorejs/syncer`         | 全部能力：所有 `Syncer` 与 `Transport`                                  | 需要跨标签页、`Worker`、广播、交换机等场景      |
| `Lite` 版 | `@autostorejs/syncer/lite`    | 仅核心同步能力：`AutoStoreSyncer`、`AutoStoreSyncerBase`、`LocalTransport`、`AutoStoreSyncTransportBase`、类型与错误类 | 只需同一进程内 `Store` 同步（`store.sync()`），追求最小体积 |

**标准版（默认入口）：**

```typescript
// 包含 AutoStoreSyncer、AutoStoreWorkerSyncer、AutoStoreBroadcastSyncer、
// AutoStoreBroadcastChannelSyncer、AutoStoreSwitchSyncer、
// LocalTransport、WorkerTransport、BroadcastChannelTransport、EventEmitterTransport 等
import { AutoStoreWorkerSyncer, WorkerTransport } from "@autostorejs/syncer";
```

**Lite 版：**

```typescript
// 只包含 AutoStoreSyncer、AutoStoreSyncerBase、
// LocalTransport、AutoStoreSyncTransportBase、types、errors
import { AutoStoreSyncer, LocalTransport } from "@autostorejs/syncer/lite";
```

:::warning 提示
`Lite` 版不包含 `Worker`、`BroadcastChannel`、`EventEmitter` 等传输器，也无法使用 `WorkerSyncer`、`BroadcastSyncer`、`SwitchSyncer`、`BroadcastChannelSyncer`。若只使用 `store.sync()` / `store.clone()` 做同进程同步，`Lite` 版足够；引用其他类会报 `undefined` 错误，请切换到标准版入口。
:::

## 依赖关系

`@autostorejs/syncer` 依赖于 `autostore` 核心包，请确保已安装：

```bash
npm install autostore @autostorejs/syncer
```

无论使用标准版还是 `Lite` 版，首次使用前需要导入一次包以注册 `store.sync()` / `store.clone()` 插件方法：

```typescript
import "@autostorejs/syncer"; // 或 "@autostorejs/syncer/lite"
```

## 浏览器环境

在浏览器中使用时，可以直接通过 CDN 引入：

```html
<script type="module">
    import { AutoStore } from "https://esm.sh/autostore";
    import { AutoStoreSyncer } from "https://esm.sh/@autostorejs/syncer";
</script>
```
