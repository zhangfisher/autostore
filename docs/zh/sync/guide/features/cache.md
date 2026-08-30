# 离线缓存

当传输层不可用（未连接或已断开）时，同步器不会丢弃本地操作，而是将其缓存到内存中，待连接恢复后自动发送，实现**离线操作缓存**。

## 工作机制

```typescript
const syncer = store1.sync(store2, {
    maxCacheSize: 100, // 最大缓存数量，默认 100
});

// 当 transport 未连接时，本地产生的操作会被缓存
store1.count = 100;

// transport 连接恢复后，缓存的操作会自动发送
// 也可以手动触发
syncer.flush();
```

1. 本地状态变化时，如果 `transport.connected === false`，操作被推入 `_operateCache`
2. 缓存数量超过 `maxCacheSize` 时，最旧的操作会被移除（先进先出）
3. `transport` 触发 `connect` 事件时，同步器自动调用 `flush()` 发送全部缓存

<demo react="syncer/features/cache.tsx" />

演示使用自定义的「手动开关传输器」模拟网络断开/恢复：离线期间点击 `count++`，左侧 `Store1` 正常变化而右侧 `Store2` 保持不变（操作进入缓存）；点击「模拟恢复连接」后，缓存的全部操作被自动 `flush`，`Store2` 一次性追平到最新值。

## maxCacheSize

控制缓存的最大数量，防止长时间离线导致内存无限增长：

```typescript
const syncer = store1.sync(store2, {
    maxCacheSize: 500, // 最多缓存 500 条操作
});
```

:::warning 提示
缓存保存在内存中，页面刷新或进程退出后缓存会丢失。如需持久化离线数据，请在业务层结合 `IndexedDB` 等方案实现。
:::

## flush

`flush()` 用于手动将缓存的操作发送到远程，常用于断线重连后的手动恢复：

```typescript
// 断开连接期间的操作已被缓存
syncer.stop();
store1.count = 1;
store1.count = 2;

// 重新连接后手动刷新缓存
syncer.start();
syncer.flush();
```

如果 `transport` 尚未连接，`flush()` 会直接返回，不会丢失缓存。
