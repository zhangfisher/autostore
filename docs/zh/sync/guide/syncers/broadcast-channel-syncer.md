# BroadcastChannelSyncer

`AutoStoreBroadcastChannelSyncer` 是专门用于实现浏览器多个页签（标签页）之间 `AutoStore` 状态同步的同步器。

基于 [BroadcastChannel API](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel_API)，无需 `SharedWorker` 或 `Worker`，纯前端实现跨页面通信。

## 架构说明

```
┌──────────────────────────────────────────────────────────────┐
│                    BroadcastChannel                          │
│                   "my-store-channel"                         │
│  • 点对点通信，所有页面平等                                    │
│  • 使用 pull 模式避免状态覆盖                                  │
└──────────────────────────────────────────────────────────────┘
        │                          │                          │
        ▼                          ▼                          ▼
   ┌─────────┐               ┌─────────┐               ┌─────────┐
   │ 页签 1   │               │ 页签 2  │               │ 页签 3  │
   │AutoStore│               │AutoStore│               │AutoStore│
   │count:0  │               │count:5  │               │count:5  │
   │ +       │               │ +       │               │ +       │
   │Syncer   │               │Syncer   │               │Syncer   │
   └─────────┘               └─────────┘               └─────────┘

工作流程：
1. 第一个页面启动，使用本地初始状态（count = 0）
2. 修改第一个页面的状态（count = 5）
3. 打开第二个页面，从第一个页面拉取最新状态（count = 5）
4. 所有后续的状态变更都会自动同步到所有页面
```

## 基本用法

```typescript
import { AutoStore } from "autostore";
import { AutoStoreBroadcastChannelSyncer } from "@autostorejs/syncer";

// 创建 Store
const store = new AutoStore({
    count: 0,
    user: { name: "Alice" },
});

// 创建 BroadcastChannel 同步器
const syncer = new AutoStoreBroadcastChannelSyncer(store, "my-store-channel");

// 状态会自动在所有打开的页面之间同步
store.state.count++; // 会同步到其他页面
```

<demo html="syncer/syncers/broadcastChannelIframe.html" />

演示中的「页面 A / 页面 B」是两个独立的 `Store` 实例，接入同一 `BroadcastChannel` 频道后自动互相同步：在任一侧输入 `name` 或点击 `count++`，另一侧实时更新。真实跨标签页场景可参考下方 React 版演示。

<demo react="syncer/get-starts/broadcastChannelSync.tsx" />

React 版演示提供了「在新窗口打开」按钮——新窗口与本窗口运行相同代码、接入同一频道，构成真实的跨标签页同步。

## 完整示例

参考 [packages/syncer/examples/worker-react/src/examples/broadcast-channel](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react/src/examples/broadcast-channel) 中的完整示例。
