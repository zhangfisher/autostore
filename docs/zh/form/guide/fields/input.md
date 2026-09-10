# Input

## 概述

`Input`是通用文本输入组件，是大多数输入类组件（`Number`、`Email`、`Password`、`Phone`、`Url`、`Search`等）的基类，提供了前后缀、动作按钮、输入校验等基础能力。

## 示例

声明一个文本输入字段只需要指定`widget: 'input'`，这也是所有字段的默认 widget，缺省时可省略。

```ts
const form = document.querySelector('#form');
form.state = {
    username: configurable('', {
        label: '用户名',
        widget: 'input',
        placeholder: '请输入用户名',
    }),
};
```

<demo html="autoform/widgets/input.html"/>

## 指南

### 外观

通过`filled`、`pill`控制输入框外观：

```ts
form.state = {
    filled: configurable('', {
        label: '填充背景',
        filled: true, // 填充背景色，无边框
    }),
    pill: configurable('', {
        label: '椭圆边框',
        pill: true, // 椭圆药丸形状
    }),
};
```

### 前后缀

`prefix`/`suffix`用于为输入内容自动添加前缀或后缀，比如`货币符号`、`单位`、`http://`等。取值可以是字符串，也可以是`SchemaWidgetAction`数组提供可选值。

```ts
form.state = {
    homepage: configurable('http://www.voerkai18n.com', {
        label: '官网',
        prefix: ['http://', 'https://'],
        suffix: [
            { label: '在新窗口打开', value: '?_blank' },
            { label: '在当前窗口打开', value: '?_self' },
            '-', // 分割线
            { label: '空白', value: '' },
        ],
    }),
};
```

### 动作

`actions`用于在输入框前后追加功能按钮，支持三种类型：

-   `button`: 默认，按钮
-   `dropdown`: 下拉菜单
-   `image`: 图片

```ts
form.state = {
    name: configurable('voerkai18n', {
        label: '动作',
        actions: [
            {
                label: '默认值',
                // type: 'button', // 默认
                onClick: (value, { update }) => {
                    update('voerkai18n');
                },
            },
            {
                label: '更新',
                icon: 'clipboard',
                type: 'dropdown', // [!code ++]
                items: ['a', 'b', 'c', '-', {
                    label: '删除',
                    icon: 'delete',
                    onClick: (value, ctx) => {
                        console.log(value, ctx);
                    },
                }],
            },
            {
                type: 'image', // [!code ++]
                url: 'https://www.voerkai18n.com/images/xxx.jpg',
            },
        ],
    }),
};
```

`onClick`回调的第二个参数提供`update`方法，可以就地更新字段值。

### 输入类型

通过`inputType`指定底层`HTML input`类型（默认`text`），可用的类型包括`date`、`datetime-local`、`email`、`number`、`password`、`search`、`tel`、`text`、`time`、`url`。

一般不需要手动指定——`Number`、`Email`等专用组件已经封装了对应类型。

### 清除按钮

`clearable=true`时在输入框右侧显示清除按钮：

```ts
form.state = {
    keyword: configurable('', {
        label: '关键字',
        clearable: true, // [!code ++]
    }),
};
```

## 属性

| 属性            |   类型    | 默认值  | 说明                                                                                                         |
| --------------- | :-------: | :-----: | ------------------------------------------------------------------------------------------------------------ |
| `filled`        | `boolean` | `false` | 是否填充背景                                                                                                 |
| `pill`          | `boolean` | `false` | 显示为椭圆形状的输入框                                                                                       |
| `clearable`     | `boolean` | `false` | 是否显示清除按钮                                                                                             |
| `readonly`      | `boolean` | `false` | 是否只读                                                                                                     |
| `pattern`       | `string`  |         | 正则表达式                                                                                                   |
| `noSpinButtons` | `boolean` | `false` | 当`inputType=number`时是否隐藏上下调节按钮                                                                   |
| `autocorrect`   | `string`  |         | 自动修正，见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autocorrect) |
| `autocomplete`  | `string`  |         | 自动完成，见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete)       |
| `autofocus`     | `boolean` | `false` | 自动聚焦，见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autofocus)   |
| `maxLength`     | `number`  |         | 最大长度                                                                                                     |
| `minLength`     | `number`  |         | 最小长度                                                                                                     |
| `max`           | `number`  |         | 最大值                                                                                                       |
| `min`           | `number`  |         | 最小值                                                                                                       |
| `spellcheck`    | `boolean` | `false` | 拼写检查                                                                                                     |
| `inputType`     | `string`  |  `text` | 输入框类型，见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/inputmode) |
| `prefix`        | `array`   |         | 前缀                                                                                                         |
| `suffix`        | `array`   |         | 后缀                                                                                                         |

## 注意事项

-   `Input`是所有输入类组件的基类，本页属性同样适用于`Number`、`Email`、`Password`等子类组件。
-   `prefix`/`suffix`是值的一部分：配置后状态值会自动包含所选前后缀，`toState`/`toInput`双向剥离。
