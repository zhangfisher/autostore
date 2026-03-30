---
"@autostorejs/syncer": patch
"autostore": patch
"@autostorejs/devtools": patch
"@autostorejs/react": patch
---

[feat] `refStore`参数现在支持传入多个`Store`，在`ref`函数中允许通过`ref("@<store.id>/<路径>")`方式引用。

```ts
const accountStore = new AutoStore(
    {
        user: {
            name: "Alice",
            age: 25,
        },
    },
    { id: "account" },
);
const orderStore = new AutoStore(
    {
        order: {
            price: 100,
            count: 1,
        },
    },
    { id: "shop" },
);

const mainStore = new AutoStore(
    {
        userName: computed((scope, { ref }) => {
            const name = ref("@account/user.name");
            return `User: ${name}`;
        }),
        total: computed((scope, { ref }) => {
            return ref("@shop/order.price") * ref("@shop/order.count");
        }),
    },
    { refStore: [accountStore, orderStore], id: "main" },
);
```
