# RefStore

## 引入

`RefStore`提供一种机制，让你可以在创建`计算属性`和`监视属性`时让计算属性在所依赖的其他`AutoStore`实例状态变化时重新计算。

```ts
const refStore = new AutoStore(
    {
        user: {
            name: "Alice",
            age: 25,
        },
    },
    { id: "refStore" },
);

const mainStore = new AutoStore(
    {
        userName: computed((scope, { ref }) => {
            const name = ref("user.name"); // [!code ++]
            return `User: ${name}`;
        }),
    },
    {
        // 引用
        refStore: refStore, // [!code ++]
        id: "main",
    },
);

expect(mainStore.state.userName).toBe("User: Alice");
// 修改refStore
refStore.state.user.name = "Bob";
// mainStore的依赖自动更新
expect(mainStore.state.userName).toBe("User: Bob");
```

- 在创建`AutoStore`指定`refStore`参数
- 在计算属性的`Getter`函数中通过`ref`函数访问`refStore`状态值。
- 当`ref`函数所引用的`refStore`的状态值变化时，**会自动重新执行`computed`计算函数**
- 上例中等效于`mainStore.state.userName`计算属性依赖于`refStore.user.name`状态。

:::warning 提示
所有使用`computed`、`asyncComputed`、`watch`创建的响应式属性均支持此特性。
:::

## 指南

### 配置RefStore

`RefStore`支持以下方式配置：

- **全局RefStore**

在创建`AutoStore`时传入的是全局`RefStore`。

```ts
const refStore = new AutoStore({...});

const mainStore = new AutoStore(
    {
        userName: computed((scope, { ref }) => {
            const name = ref("user.name"); // [!code ++]
            return `User: ${name}`;
        }),
    },
    {
        refStore: refStore, // [!code ++]
    },
);
```

- **局部RefStore**

在创建计算属性或监视对象时传入`RefStore`，优先于全局`RefStore`。

```ts
const refStore1 = new AutoStore({...});
const refStore2 = new AutoStore({...});

const mainStore = new AutoStore(
    {
        // computed
        userName: computed((scope, { ref }) => {
            const name = ref("user.name"); // [!code ++]
            return `User: ${name}`;
        },{
            refStore: refStore2 // [!code ++] 局部优于refStore1
        }),
        // asyncComputed
        price: asyncComputed(async (scope, { ref }) => {
            return  ref("user.price"); // [!code ++]
        },[],{
            refStore: refStore2 // [!code ++] 局部优于refStore1
        }),
        // watch
        price: watch((path, { ref }) => {
            return ref("user.price"); // [!code ++]
        },{
            refStore: refStore2 // [!code ++] 局部优于refStore1
        }),
    },
    {
        refStore: refStore1, // [!code ++] 全局
    },
);
```

- **引用多个RefStore**

`ref`函数允许使用`@<store.id>/<路径>`引用多个`RefStore`。

```ts {22,26,30-32}
const accountStore = new AutoStore({
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
        {
            refStore: [
                accountStore, orderStore // 引用多个Store
            ],
        id: "main" },
    );

    expect(mainStore.state.userName).toBe("User: Alice");
    accountStore.state.user.name = "Bob";
    expect(mainStore.state.userName).toBe("User: Bob");
    //
    expect(mainStore.state.total).toBe(100);
    orderStore.state.order.price = 200;
    orderStore.state.order.count = 2;
    expect(mainStore.state.total).toBe(400);
});
```

### ref函数

在计算属性或状态内监视对象时，`ref`函数的作用：

- 获取`RefStore`的指定路径的状态值
- 所引用的状态值变化时自动重新执行计算函数(`ComputedGetter`)和监视函数(`WatchGetter`）。

`ref`函数签名下：

```ts
function ref<Value = any>(
    refPath?: string, // 引用refStore的路径
    options?: RefStateOptions,
);
export type RefStateOptions = {
    reactive?: boolean;
    runArgs?: Record<string, any>;
};
```

`refPath`参数：

- 引用`refStore`的路径
- 当定义多个`refStore`时，可以通过`@<store.id>/<路径>`引用多个`RefStore`

`RefStateOptions`参数如下：

|    参数    | 默认值 | 描述                                                |
| :--------: | :----: | --------------------------------------------------- |
| `reactive` | `true` | 当状态值变化时是否自动重新运行计算函数              |
| `runArgs`  |        | 传递给`ComputedObject/WatchObject`的`run`方法的参数 |

### 类型推断

默认情况下,`ref`函数没有类型推断功能，需要自行填写正确的路径。
如果需要类型推断，需要扩展`interface RefStores`.

```ts {7,15,19,23-28}
const userStore = new AutoStore(
    {
        name: "test",
        age: 30,
    },
    {
        id: "user",
    },
);
const orderStore = new AutoStore(
    {
        price: 100,
        count: 3,
        total: computed((scope, { ref }) => {
            // ref("@user/name") ref函数具有类型推断功能
        }),
    },
    {
        id: "order",
    },
);
// 扩展RefStores
declare module "autostore" {
    interface RefStores {
        user: typeof userStore;
        order: typeof orderStore;
    }
}
```
