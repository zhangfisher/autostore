# createComputed

动态创建计算属性插件，为 `computedObjects` 添加 `create` 方法，允许在运行时动态创建同步或异步计算对象。

## 基本用法

```ts
import { AutoStore } from "autostore";
import "@autostorejs/plugins/createComputed";

const store = new AutoStore({
    price: 2,
    count: 3,
});

// 动态创建同步计算属性
const obj = store.computedObjects.create((state: any) => {
    return state.price * state.count;
});

console.log(obj.value); // 6
```

## 特性

- 动态创建的计算对象始终是**游离的**（detached），不挂载到状态树
- 计算结果保存在对象自身，不会回写到状态树
- 支持同步和异步计算函数
- 支持通过 `anchor` 使用相对路径的 `scope` 和 `depends`

## API

### `computedObjects.create(getter, options?)`

创建一个同步计算对象。

```ts
const obj = store.computedObjects.create(
    (state: any) => state.price * state.count,
    { scope: "ROOT" }
);
```

### `computedObjects.create(getter, depends, options?)`

创建一个异步计算对象。

```ts
const obj = store.computedObjects.create(
    async (scope: any) => {
        const res = await fetch(`/api/price/${scope.id}`);
        return res.json();
    },
    ["./id"],
    { anchor: { path: ["order", "price"] } }
);
```

### `computedObjects.create(descriptor)`

通过描述符创建计算对象。

```ts
import { computed } from "autostore";

const obj = store.computedObjects.create(
    computed(
        (scope: any) => scope.price * scope.count,
        ["price", "count"]
    )
);
```

## 游离对象

动态创建的计算对象始终是游离的（detached）：

- `associated` 为 `false`
- 不关联状态树，不回写计算结果
- `id` 自动生成（非路径）
- `path` 由 `anchor` 决定或自动生成

```ts
const obj = store.computedObjects.create(
    (order: any) => order.price * order.count,
    { anchor: { path: ["order", "total"] } }
);

console.log(obj.associated); // false
// state.order.total 不存在，不会回写
expect((store.state.order as any).total).toBeUndefined();
```

## 使用 Anchor 支持相对路径

默认情况下，`scope` 和 `depends` 只能使用根状态对象（ROOT）或绝对路径。通过 `anchor` 选项可以使用相对路径：

```ts
const store = new AutoStore({
    order: { price: 2, count: 3 },
});

// anchor 声明计算对象的逻辑位置
const obj = store.computedObjects.create(
    (order: any) => order.price * order.count,
    {
        anchor: { path: ["order", "total"] },
        // scope 默认为 CURRENT，指向 anchor.path 所在容器（即 order 对象）
        depends: ["./price", "./count"], // 相对路径
    }
);
```

### Anchor 选项

| 属性 | 类型 | 说明 |
|:---:|:---:|:---|
| `path` | `string[]` | 计算对象的逻辑路径（必填） |
| `parentPath` | `string[]` | 父路径，可选，会自动推导 |

## 错误处理

### 无 Anchor 时使用相对路径

当不提供 `anchor` 时，使用相对路径的 `scope` 或 `depends` 会抛出错误：

```ts
// 抛出 InvalidScopeError
store.computedObjects.create(
    (order: any) => order.price,
    { scope: "./price" }
);

// 抛出 InvalidDependsError
store.computedObjects.create(
    async (order: any) => order.price,
    ["./price"]
);
```

### Anchor 缺少 path

提供 `anchor` 但未指定 `path` 时抛出 `InvalidScopeError`：

```ts
// 抛出 InvalidScopeError
store.computedObjects.create(
    (order: any) => order.price,
    { anchor: {} }
);
```

## 完整示例

```ts
import { AutoStore } from "autostore";
import "@autostorejs/plugins/createComputed";

const store = new AutoStore({
    order: {
        goods: { price: 2, count: 3 },
    },
});

// 1. 同步计算，无 anchor
const obj1 = store.computedObjects.create(
    (state: any) => state.order.goods.price * state.order.goods.count
);
console.log(obj1.value); // 6

// 2. 同步计算，有 anchor + 相对 scope
const obj2 = store.computedObjects.create(
    (goods: any) => goods.price * goods.count,
    {
        anchor: { path: ["order", "total"] },
        scope: "./goods",
    }
);
console.log(obj2.value); // 6

// 3. 异步计算，有 anchor + 相对 depends
const obj3 = store.computedObjects.create(
    async (order: any) => order.price * order.count,
    ["./price", "./count"],
    { anchor: { path: ["order", "asyncTotal"] } }
);
```
