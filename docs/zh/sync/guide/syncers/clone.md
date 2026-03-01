# Clone

`clone()` 方法创建一个 `AutoStore` 的副本，并可选择是否保持同步：

```ts
const originalStore = new AutoStore({
    user: {
        name: "Alice",
        age: 25,
    },
});

// 完全克隆，不同步
const clonedStore1 = originalStore.clone({ sync: "none" });
// 或
const clonedStore2 = originalStore.clone();

// 克隆并保持双向同步
const clonedStore3 = originalStore.clone({ sync: "both" });

// 克隆指定路径，前向同步
const clonedStore4 = originalStore.clone({
    entry: "user",
    sync: "forward",
});
```
