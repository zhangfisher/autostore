# 同步钩子

同步器提供了 `onSend` 和 `onReceive` 两个钩子函数，允许在操作发送到远程之前、以及接收到远程操作之后进行拦截处理：

- **修改 `operate`**：可以叠加自己的数据到 `operate` 上
- **阻止操作**：返回 `false` 可以阻止发送或应用

```typescript
type AutoStoreSyncerOptions = {
    // 发送到远程之前触发，返回 false 可以阻止发送
    onSend?: (operate: StateRemoteOperate) => boolean | undefined;
    // 接收到远程操作后触发，返回 false 可以阻止应用
    onReceive?: (operate: StateRemoteOperate) => boolean | undefined;
};
```

## onSend

`onSend` 在每个操作发送到远程之前触发，常用于数据脱敏、注入附加信息：

```typescript
const syncer = store1.sync(store2, {
    onSend: (operate) => {
        // 不同步密码等敏感字段
        if (operate.path.includes("password")) {
            return false; // 阻止发送
        }
        // 可以在发送前修改 operate
        // operate.value = transform(operate.value)
    },
});
```

## onReceive

`onReceive` 在接收到远程操作之后、应用到本地 `store` 之前触发：

```typescript
const syncer = store1.sync(store2, {
    onReceive: (operate) => {
        console.log("收到远程操作:", operate.type, operate.path);
        // 拒绝来自远程的删除操作
        if (operate.type === "delete") {
            return false; // 阻止应用
        }
    },
});
```

<demo react="syncer/features/hooks.tsx" />

演示中 `onSend` 拦截了 `token` 字段的发送、`onReceive` 拒绝了 `delete` 操作：点击按钮后，下方日志实时输出每个操作被「放行/阻止」的判定结果，右侧 `Store2` 的状态变化与之完全对应。

## StateRemoteOperate

钩子函数接收的 `operate` 对象结构如下：

```typescript
type StateRemoteOperate = {
    // 来源 syncer 的 id
    id: string;
    // 操作类型：set/update/delete/insert/remove 或 $ 开头的同步指令
    type: StateOperateType | "$stop" | "$push" | "$pull" | "$update" | "$error" | "$ping" | "$pong";
    // 操作路径
    path: string[];
    // 操作的值
    value: any;
    // 数组操作时的索引
    indexs?: number[];
    // 父路径
    parentPath?: string[];
    reply?: boolean;
    flags: number;
};
```

## 使用场景

- **数据脱敏**：发送前剔除密码、`token` 等敏感字段
- **审批机制**：接收前校验远程操作是否允许应用
- **日志审计**：记录所有发送/接收的操作流水
- **附加元数据**：向 `operate` 叠加时间戳、来源标识等业务数据

## 与 filter 的区别

| 选项       | 作用点           | 能力                         |
| ---------- | ---------------- | ---------------------------- |
| `filter`   | 监听到本地变化时 | 按路径/值过滤是否同步        |
| `onSend`   | 发送到远程前     | 可修改 `operate` 并阻止发送  |
| `onReceive` | 接收到远程后    | 可修改 `operate` 并阻止应用  |

`filter` 只针对本地写操作触发；`onSend`/`onReceive` 则覆盖所有经过传输层的操作（包括 `$push`、`$pull` 等同步指令），控制粒度更细。
