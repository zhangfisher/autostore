# 校验

`AutoStore`内置校验机制，当写入状态值时可以对写入值进行校验，并根据校验结果执行相应的行为。

`AutoStore`通过以下参数来为状态的写入提供校验。

- `onInvalid`
- `validate`
- `validators`

## 基本用法

```ts {9-12}
import { AutoStore } from "autostore";
const store = new AutoStore(
    {
        order: {
            price: 100,
        },
    },
    {
        validate: (newValue, oldValue, path) => {
            if (path[1] === "price") {
                return newValue > 10;
            }
        },
    },
);
```

## 指南

### 校验函数

`validate`函数在写入状态前执行，函数类型如下：

```ts
interface StateValidatorFunction<State extends Dict> {
    (this: AutoStore<State>,
    newValue: any,       // 新值
    oldValue: any,       // 旧值
    path: string[]       // 路径
) => boolean;
    getErrorMessage?: (error: Error) => string;
    onInvalid?: ValidationBehavior;
}

```

- `validate`函数通过返回`true/false`来代表校验成功或失败。
- `validate`函数也可以通过`throw ValidateError('错误信息')`来代表校验出错且提供出错信息。

```ts {9-15}
import { AutoStore, ValidateError } from "autostore";
const store = new AutoStore(
    {
        order: {
            price: 100,
        },
    },
    {
        validate: (newValue, oldValue, path) => {
            if (path[1] === "price") {
                if (newValue > 10) {
                    return true;
                } else {
                    throw new ValidateError("价格必须大于10");
                }
            }
        },
        id: "mystore",
    },
);

try {
    store.state.order.price = 1;
} catch (e) {
    console.log(e); // ValidateError
}
```

### 校验错误信息

- **保存错误信息**

默认情况下，当校验失败时，错误信息可以通过以下途径获取：

- **store.errors**

    类型：`Record<string,string>`，`key`为路径名称，`value`为错误信息字符串（即`error.message`）。
    上例中校验失败时`store.errors['order.price']==='价格必须大于10'`

- **configManager.errors**

    当启用配置管理器时，错误信息也会保存到配置管理器中。
    上例中校验失败时`AutoStoreConfigManager.errors['mystore.order.price']==='价格必须大于10'`
    关于配置管理器的更多信息见[配置系统](./config)

- **定制校验错误信息**

默认情况下，校验错误信息取自`error.message || error.stack`。
因此，可以通过在`validate`函数中**触发包含友好信息的错误**来提供更加友好的错误信息。

### 校验失败行为

可以通过`onInvalid`参数来控制当校验失败时的行为。

`onInvalid`取值如下：

|     值     | 默认 | 说明                                 |
| :--------: | :--: | ------------------------------------ |
|   throw    |  ✅  | 会触发`ValidateError`错误            |
|   ignore   |      | 静默忽略，即不触发错误，也不写入     |
|    pass    |      | 继续写入,不抛出错误                  |
| throw-pass |      | 继续写入,然后再触发ValidateError错误 |

`onInvalid`参数可以通过以下几种方式指定：

#### 全局行为

**全局`onInvalid`参数**

```ts {18}
import { AutoStore, ValidateError } from "autostore";
const store = new AutoStore(
    {
        order: {
            price: 100,
        },
    },
    {
        validate: (newValue, oldValue, path) => {
            if (path[1] === "price") {
                if (newValue > 10) {
                    return true;
                } else {
                    throw new ValidateError("价格必须大于10");
                }
            }
        },
        onInvalid: "throw-pass",
    },
);

try {
    store.state.order.price = 1;
} catch (e) {
    console.log(e); // 会触发ValidateError
}
//  store.state.order.price === 1;
```

#### 更新时指定

**在`store.update`时指定onInvalid**

`onInvalid`参数也可以在`store.update`时覆盖全局`onInvalid`参数，如下：

```ts
store.update((state) => {}, {
    onInvalid: "pass",
});
```

#### 触发错误时指定

**在触发错误时指定**

```ts {15}
import { AutoStore, ValidateError } from "autostore";
const store = new AutoStore(
    {
        order: {
            price: 100,
        },
    },
    {
        validate: (newValue, oldValue, path) => {
            if (path[1] === "price") {
                if (newValue > 10) {
                    return true;
                } else {
                    const err = new Error("价格必须大于10");
                    err.onInvalid = "pass"; // 优先级最高
                    throw err;
                }
            }
        },
        onInvalid: "throw-pass",
    },
);
```

#### 临时行为

**通过`withSchema`赋值时临时指定**

`withSchema`用于临时指定一些控制参数以指导更新操作。

```ts {14,18}
import { AutoStore, ValidateError } from "autostore";
const store = new AutoStore(
    {
        order: {
            price: 100,
        },
    },
    {
        validate: (newValue, oldValue, path) => {
            if (path[1] === "price") {
                return newValue > 10;
            }
        },
        onInvalid: "throw-pass", // 全局配置
    },
);
// 临时指定onInvalid
store.state.order.price = withSchema(1, { onInvalid: "pass" });
```

:::warning 提示

- 之所以在校验失败可能也要将错误的值写入到状态中，是因为在某些场景下需要保留错误值，但会显示错误。比如绑定表单时。
- 错误信息总是可以通过`store.errors`和`configManager.errors`获取
  :::

### 指定路径校验

可以为指定的路径的状态值单独指定一个校验函数，其优先于`onValidate`参数。

```ts
const store = new AutoStore({
    order:{
        price:100
    }
},{
    validators:{
        'order.price':(newValue,oldValue)=>{
            return newValue>0
        }
         // 允许使用通配符来匹配多个路径
        'order.*.price':(newValue,oldValue)=>{
             return newValue>0
        }
    }
})
```
