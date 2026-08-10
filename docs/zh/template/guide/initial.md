# 初始化

## 概述

`AutoTemplateEngine` 是模板渲染引擎的核心类。使用流程固定为三步：**选中挂载元素 → 传入状态 → 构造引擎**。本章讲清构造器的三个参数、状态句柄、生命周期方法，以及引擎事件总线。

## 指南

### 构造引擎

```typescript
new AutoTemplateEngine(el, store | state, options?)
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `el` | `HTMLElement` | 挂载根元素，必传。引擎编译模板并把产物挂到该元素下 |
| 第二参 | `AutoStore \| State` | 数据源：`AutoStore` 实例（借用）或裸状态对象（引擎自建 store） |
| `options` | `Partial<AutoTemplateEngineOptions>` | 可选配置 |

```javascript
const { AutoTemplateEngine } = AutoTemplateSpaces;

// 传入裸状态：引擎自动建立 store 并拥有它
const engine = new AutoTemplateEngine(document.getElementById("app"), {
    user: { name: "张三" },
});
```

#### 数据源：store 还是 state？

第二参有两种形态，决定 store 的所有权：

- **传 `AutoStore` 实例**（借用）：与其他模块共享同一状态树。`engine.destroy()` **不会**销毁它（保留你在别处挂的订阅、computed）。
- **传裸状态对象**（自建）：引擎内部 `new AutoStore(state)`。`engine.destroy()` **会**销毁它，回收 computed / 订阅 / Proxy 等资源。

```javascript
import { AutoStore } from "autostore";

// 借用：外部建好的 store
const store = new AutoStore({ count: 0 });
const engine = new AutoTemplateEngine(el, store);

// 自建：直接传裸状态
const engine2 = new AutoTemplateEngine(el, { count: 0 });
```

::: warning 种子状态建后即弃
传裸状态时，原对象只作**初始种子**——建 store 后它失去响应性。后续读写一律用 `engine.state`（响应式句柄），直接改原种子对象**不会**触发更新。
:::

#### 配置选项

```typescript
interface AutoTemplateEngineOptions {
    autostart?: boolean; // 构造后是否立即编译，默认 true
    debug?: boolean; // 调试日志，默认 false
    actions?: Record<string, (...args) => any>; // 全局动作表
    sanitizer?: (html: string) => string; // x-html 的 HTML 消毒器
    storeOptions?: AutoStoreOptions; // 自建 store 时的配置（仅裸状态路径消费）
}
```

### 状态句柄

`engine.state` 等价于 `engine.store.state`——响应式状态树的根。**改它就触发更新**：

```javascript
engine.state.user.name = "李四"; // 订阅了 user.name 的指令自动刷新
engine.state.order.count += 1;
```

### 生命周期

| 方法 | 作用 |
| --- | --- |
| `compile()` | 编译模板并挂载到 `el`（构造时 `autostart:true` 自动调） |
| `start()` | 启动引擎：未编译则编译挂载，已启动则幂等返回 |
| `stop()` | 停止：移除挂载 DOM、暂停，但**保留订阅**，可再次 `start()` |
| `destroy()` | 彻底销毁：清调度队列、销毁所有 scope、断开 observer；自建 store 一并销毁 |

```javascript
const engine = new AutoTemplateEngine(el, state, { autostart: false });
engine.start(); // 手动启动
// ...
engine.stop(); // 暂停（DOM 移除，订阅保留）
engine.start(); // 恢复
// ...
engine.destroy(); // 彻底清理
```

### 事件总线

引擎继承分层事件总线，可用 `engine.on(type, handler)` 订阅生命周期与动作事件，支持 `*` / `**` 通配。

```javascript
engine.on("engine/ready", ({ el }) => console.log("就绪", el));
engine.on("scope/created", ({ id }) => console.log("scope#", id));
engine.on("actions/*/pending", ({ name }) => console.log("动作开始", name));
engine.on("actions/*/*", ({ name }) => console.log("任一动作事件", name)); // 通配
```

::: tip 态信号会补发
`engine/ready` 这类「态信号」用 retain 发出——即使你在构造之后才订阅，也能立即补拿到最近一次。`actions/*/*` 这类「流信号」则不补发。
:::

事件类型涵盖引擎生命周期（`engine/**`）、scope（`scope/**`）、指令（`directive/**`）、动作（`actions/**`）等，完整契约见类型定义。

---

下一步：[响应式](./reactive.md)了解状态如何驱动 DOM。
