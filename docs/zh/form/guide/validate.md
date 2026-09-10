# 校验

## 概述

`AutoForm`基于`AutoStore`的状态校验能力，提供了完整的表单校验解决方案：

| 能力             | 说明                                                             |
| ---------------- | ---------------------------------------------------------------- |
| **声明式校验**   | 在`configurable`中声明`validate`校验函数，状态写入时自动执行     |
| **必填校验**     | `required: true`自动生成必填校验与默认错误信息                   |
| **错误信息**     | 支持静态字符串、从异常中提取、`插值变量`三种方式                 |
| **失败行为控制** | `onInvalid`参数控制校验失败时的写入行为（放行/拒绝/忽略/抛错）   |
| **校验时机**     | `validAt`参数控制输入时校验或失焦时校验                          |
| **校验事件**     | `validate`事件监听所有字段的校验结果                             |
| **校验状态**     | `store.errors`、表单`invalid/dirty`类名、`submit`回调携带错误    |

校验配置全部声明在`configurable`的状态定义中，与字段外观配置（`label`、`widget`等）位于同一处：

```ts
form.state = {
    username: configurable('', {
        label: '用户名',
        validate: (value) => value.length >= 6, // 校验函数
        errorMessage: '用户名长度必须大于等于6', // 错误信息
        onInvalid: 'throw', // 校验失败行为
        required: true, // 必填校验
    }),
};
```

## 工作原理

校验发生在**状态写入时**：`AutoStore`在响应式层的写入操作中拦截状态变更，执行校验器后再决定是否真正写入。

```
状态写入 (字段输入 / store.state.xxx = xxx)
    │
    ▼
查找校验器 (validators[路径]  >  options.validate)
    │
    ├── 无校验器 ────────────────────────► 正常写入
    │
    ▼
执行 validate(value, oldValue, path)
    │
    ├── 返回 true ──► 写入状态，并清除该路径的错误记录
    │
    └── 返回 false 或 throw Error
            │
            ▼
        渲染错误信息 (errorMessage 插值模板 > 异常message)
            │
            ├── 写入 store.errors / configManager.errors
            │
            ▼
        按 onInvalid 决定写入行为
        (pass | throw | ignore | throw-pass)
            │
            ▼
        触发 validate 事件 (成功与失败均触发)
```

关键机制：

- **错误存储**：校验失败的错误信息统一记录在`store.errors`（键为状态相对路径）中，校验通过时自动删除。`AutoField`组件读取错误信息并渲染在字段下方。
- **行为优先级**：校验失败时的写入行为按优先级取值`ValidateError.onInvalid`（抛出错误时动态指定）>`configurable`中的`onInvalid`配置>`AutoStore`选项中的`onInvalid`，均未指定时默认`throw`。
- **呈现时机**：错误信息的显示由`AutoField`控制，默认只有字段被修改过（`dirty`）后才显示错误，避免表单初始即为满屏错误。

## 指南

### 校验函数

通过`configurable`的`validate`参数声明校验函数，校验失败有两种方式：

```ts
form.state = {
    // 方式一：返回 false 表示校验失败
    username: configurable('', {
        label: '用户名',
        validate: (value) => {
            return value.length >= 6;
        },
        errorMessage: '用户名长度必须大于等于6',
    }),
    // 方式二：抛出异常，异常信息即错误信息
    password: configurable('', {
        label: '密码',
        validate: (value) => {
            if (value.length < 6) throw new Error('密码至少需要6位');
            if (!/[0-9]/.test(value)) throw new Error('密码必须包含数字');
            return true;
        },
    }),
};
```

-   `validate`函数签名为`(value, oldValue, path) => boolean`，返回`true`表示校验通过。
-   `validate`在**状态变化时自动触发**，例如`store.state.username = 'xxx'`会触发校验。
-   同一字段可以在校验函数中根据不同条件抛出不同的错误信息。

<demo html="autoform/field/validate-basic.html"/>

### 必填校验

`required: true`声明必填字段，`AutoStore`会自动生成必填校验逻辑，无需编写`validate`函数：

```ts
form.state = {
    user: {
        // 使用默认错误信息：姓名不能为空
        name: configurable('', {
            label: '姓名',
            required: true, // [!code ++]
        }),
        // 自定义必填错误信息
        email: configurable('', {
            label: '邮箱',
            required: true, // [!code ++]
            errorMessage: '请填写{label}，否则无法注册', // [!code ++]
        }),
    },
};
```

-   必填校验对字符串类型的空值生效（`''`）。
-   默认错误信息为`{label}不能为空`。
-   如果同时声明了`validate`，必填校验通过后才会执行`validate`。

<demo html="autoform/field/validate-required.html"/>

### 错误信息

校验失败时的错误信息按以下优先级获取：

1.  `errorMessage`指定的静态字符串
2.  校验函数抛出的异常的`message`

```ts
form.state = {
    username: configurable('', {
        label: '用户名',
        validate: (value) => value.length >= 6,
        errorMessage: '用户名长度必须大于等于6',
    }),
    password: configurable('', {
        label: '密码',
        // 未指定 errorMessage，显示抛出异常中的信息
        validate: (value) => {
            if (value.length < 6) throw new Error('密码至少需要6位');
            return true;
        },
    }),
};
```

**插值变量**

`errorMessage`支持插值变量，所有配置参数（含自定义参数）均可作为插值变量，此外还有以下内置变量：

| 变量         | 说明                     |
| ------------ | ------------------------ |
| `{label}`    | 字段标题                 |
| `{value}`    | 当前值                   |
| `{error}`    | 异常信息（默认值即此）   |
| `{errorStack}` | 异常堆栈               |
| `{path}`     | 状态路径                 |

```ts {9}
form.state = {
    nickname: configurable('', {
        label: '昵称',
        min: 2, // 自定义参数，可以作为插值变量
        max: 5,
        validate: (value) => value.length >= 2 && value.length <= 5,
        errorMessage: '{label}长度必须在{min}-{max}之间，当前"{value}"不合法',
    }),
};
```

<demo html="autoform/field/validate-error-message.html"/>

### 校验失败行为

校验失败时，通过`onInvalid`参数控制状态写入行为。

**类型：** `'pass' | 'throw' | 'ignore' | 'throw-pass'`，默认`'throw'`

| 取值          | 写入状态 | 抛出异常 | 说明                                   |
| ------------- | -------- | -------- | -------------------------------------- |
| `pass`        | ✅       | ❌       | 放行写入，错误值写入到`state`          |
| `throw`       | ❌       | ✅       | 拒绝写入并抛出错误（默认）             |
| `ignore`      | ❌       | ❌       | 静默忽略，不写入也不报错               |
| `throw-pass`  | ✅       | ✅       | 写入状态同时抛出错误（必填校验的默认） |

```ts {6,12,18,24}
form.state = {
    a: configurable('', {
        label: 'A',
        validate: (value) => value.length >= 6,
        errorMessage: '长度必须大于等于6',
        onInvalid: 'pass',
    }),
    b: configurable('', {
        label: 'B',
        validate: (value) => value.length >= 6,
        errorMessage: '长度必须大于等于6',
        onInvalid: 'throw',
    }),
    c: configurable('', {
        label: 'C',
        validate: (value) => value.length >= 6,
        errorMessage: '长度必须大于等于6',
        onInvalid: 'ignore',
    }),
    d: configurable('', {
        label: 'D',
        validate: (value) => value.length >= 6,
        errorMessage: '长度必须大于等于6',
        onInvalid: 'throw-pass',
    }),
};
```

**动态失败行为**

抛出`ValidateError`并指定其`onInvalid`属性，可以为同一字段的不同失败场景动态指定行为，优先级高于`onInvalid`配置：

```ts {5-7}
form.state = {
    username: configurable('', {
        label: '用户名',
        validate: (value) => {
            const err = new AutoForm.ValidateError('用户名长度必须大于等于6');
            err.onInvalid = 'pass'; // 本次校验失败放行写入
            throw err;
        },
    }),
};
```

<demo html="autoform/field/valid-fail.html"/>

### 校验时机

`AutoForm`通过`validAt`属性配置校验触发的时机：

-   `input`：输入时立即校验
-   `lost-focus`：失去焦点时校验（默认）

```html
<!-- 输入时校验 -->
<auto-form valid-at="input"></auto-form>

<!-- 失去焦点时校验（默认） -->
<auto-form valid-at="lost-focus"></auto-form>
```

`lost-focus`模式下重新输入时会立即清除旧的错误提示，待失焦时再次校验，避免用户按提示修正输入时错误信息一直滞留。

<demo html="autoform/field/validate-timing.html"/>

### 初始校验

默认情况下，首次渲染时不显示校验错误（字段未被修改过）。`validAtInit`属性让表单在首次渲染时即执行校验并显示错误：

```html
<auto-form valid-at-init></auto-form>
```

适用于编辑已有数据的场景：打开表单时立即提示哪些初始值不合法。

<demo html="autoform/field/validate-at-init.html"/>

### 校验事件

无论校验成功或失败，均会触发`validate`事件，可用于统一的校验日志、埋点或联动处理：

```ts
form.updateComplete.then(() => {
    form.activeStore.on('validate', ({ path, newValue, oldValue, error }) => {
        // path: string[]        状态路径
        // newValue / oldValue   新旧值
        // error: Error|undefined  校验失败时的异常对象，成功时为 undefined
        console.log(path.join('.'), error ? `✗ ${error.message}` : '✓ 校验通过');
    });
});
```

<demo html="autoform/field/validate-event.html"/>

### 校验状态与提交

**错误记录**

所有校验错误统一记录在`store.errors`中，键为状态路径，校验通过后自动删除：

```ts
form.activeStore.errors; // { "user.username": "用户名长度必须大于等于6" }
```

**表单类名**

字段校验失败时，`AutoForm`宿主元素自动添加`invalid`类名；字段被修改过则添加`dirty`类名，可用于整体表单的样式反馈：

```css
auto-form.invalid {
    /* 整表存在校验错误时的样式 */
}
```

**提交时获取错误**

`submit`方法的回调会携带所有校验错误，详见[提交表单](./submit.md)：

```ts
form.submit((values, errors) => {
    if (Object.keys(errors).length > 0) {
        console.log('校验失败', errors);
    }
});
```

**清除错误**

```ts
form.clearErrors(); // 清除所有字段的错误显示
```

<demo html="autoform/field/validate-state.html"/>

### 全局校验

除在`configurable`中声明校验外，创建`AutoStore`时也可以配置全局校验，作用于所有（或指定路径的）状态写入：

```ts
const store = new AutoStore(state, {
    // 全局校验函数：未在 configurable 中声明 validate 的状态均使用此函数
    validate: (newValue, oldValue, path) => {
        return true;
    },
    // 按路径指定校验器（configurable 中声明的校验优先于此）
    validators: {
        'user.username': (value) => value.length >= 6,
        'order.*': (value) => value > 0,
    },
    // 全局默认失败行为（configurable 中的 onInvalid 优先于此）
    onInvalid: 'throw',
});
```

使用`<auto-form .store=${store}>`接入外部`store`时，全局校验配置同样生效。
