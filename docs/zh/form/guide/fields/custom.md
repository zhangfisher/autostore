# Custom

## 概述

`Custom`自定义字段组件，用[lit 模板语法](https://lit.dev/docs/templates/overview/)自由渲染任意输入界面，把多个原生控件（`<input>`、`<textarea>`等）的值聚合为一个状态值。适合`邮箱前缀@域名`、`起止时间`这类无法用单个内置 widget 表达的组合输入。

## 示例

声明一个自定义字段需要指定`widget: 'custom'`，并实现`renderContent`渲染输入界面：

```ts
const form = document.querySelector('#form');
form.state = {
    email: configurable('admin@autostore.com', {
        label: '电子邮件',
        widget: 'custom',
        renderContent: (values, html) => {
            return html` <div style="padding:1em">
                <label>
                    电子邮件:
                    <input .value=${values[0]} />
                    @<input .value=${values[1]} />
                </label>
            </div>`;
        },
        toState: (values) => values.join('@'),
        toInput: (values) => values.split('@'),
    }),
};
```

<demo html="autoform/widgets/custom.html"/>

## 指南

### 工作原理

1. 首先要实现`renderContent`方法用于渲染自定义显示的内容，`renderContent`方法使用[lit 模板语法](https://lit.dev/docs/templates/overview/)。
2. `Custom`会监听`inputSelectors`匹配到的控件（默认为`<input>`标签）的`input,change`事件，当控件的值发生改变时，会调用`toState`函数，用于将控件的值转换为`state`的值，写入到状态中。由于控件可能有多个，所以传入`toState(values)`函数的是一个数组。
3. 当监听到`state`的值发生改变时，会调用`toInput`方法，将状态值转换为适合控件的值，然后调用`renderContent`方法重新渲染。
4. 当`dropdown=true`时，`renderSelection`方法用于渲染值。

### renderContent

`renderContent`方法用于渲染自定义组件内容。

`renderContent`方法接收两个参数：

-   第一个参数是当前字段数据（`values`，是`toInput`返回的数组）
-   第二个参数是`lit html`模板方法，返回值是自定义组件内容。详见[lit html](https://lit.dev/docs/templates/overview/)

```ts
form.state = {
    email: configurable('admin@autostore.com', {
        label: '电子邮件',
        widget: 'custom',
        renderContent: (values, html) => {
            return html` <div style="padding:1em">
                <label>
                    电子邮件:
                    <input .value=${values[0]} />
                    @<input .value=${values[1]} />
                </label>
            </div>`;
        },
    }),
};
```

`values`是数组，依次绑定到`<input>`标签的`.value`属性即可。

### renderSelection

当`dropdown=true`时，`renderSelection`方法用于在下拉触发器中渲染选择值：

```ts
form.state = {
    email: configurable('admin@autostore.com', {
        label: '电子邮件',
        widget: 'custom',
        renderSelection: (values, html) => {
            return html`<span style="color:red">${values.join('@')}</span>`;
        },
    }),
};
```

使用方法同`renderContent`。

### 下拉展示

`dropdown`控制自定义内容的呈现方式，默认`true`以弹层方式显示，触发器中展示`renderSelection`渲染的值；`false`时自定义内容内联展示在表单中，此时`renderSelection`不再生效：

```ts
form.state = {
    email: configurable('admin@autostore.com', {
        label: '电子邮件',
        widget: 'custom',
        dropdown: false, // [!code ++]
    }),
};
```

### inputSelectors

`inputSelectors`指定参与值收集的控件 CSS 选择器，默认`'input,textarea'`。所有匹配到的控件的值按 DOM 顺序组成数组，传给`toState`：

```ts
form.state = {
    email: configurable('admin@autostore.com', {
        label: '电子邮件',
        widget: 'custom',
        inputSelectors: 'input', // [!code ++]
    }),
};
```

## 属性

| 属性             |    类型    |      默认值      | 说明                                          |
| ---------------- | :--------: | :--------------: | --------------------------------------------- |
| `dropdown`       | `boolean`  |      `true`      | 是否以下拉面板展示自定义内容                  |
| `inputSelectors` |  `string`  | `"input,textarea"` | 参与值收集的控件 CSS 选择器                 |
| `renderSelection`| `function` |                  | 渲染下拉触发器中的值显示（`dropdown=true`时生效） |
| `renderContent`  | `function` |                  | 渲染自定义输入内容（lit 模板）                |

## 注意事项

-   `renderContent`的`values`是数组（与`toInput`返回值同构），需按索引绑定到各控件；非数组状态值会被自动归一化为单元素数组。
-   正在输入的控件在输入后的一帧内不会被程序性回写，以保证光标位置与连续输入不受影响。
-   `dropdown=false`时`renderSelection`不生效，字段值区域直接展示自定义内容。
-   模板中的事件绑定、条件渲染均遵循 lit 模板语法，`.value` 属性绑定（lit 的受控回填写法）用于回填输入值。
