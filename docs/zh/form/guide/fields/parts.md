# Parts

## 概述

`Parts`分段字符输入组件，按模板将输入拆分为多个单字符输入格，段间渲染分隔符，常用于验证码、序列号、授权码等固定格式的输入场景。

## 示例

声明分段输入字段只需指定`widget: 'parts'`，默认模板为 4 个输入格：

```ts
const form = document.querySelector('#form');
form.state = {
    mailcode: configurable('1234', {
        label: '邮件验证码',
        widget: 'parts',
    }),
};
```

<demo html="autoform/widgets/parts.html"/>

## 指南

### 基础用法

每个输入格只接受一个字符，输入后自动跳到下一格，聚焦时自动全选：

```ts
form.state = {
    code: configurable('', {
        label: '验证码',
        widget: 'parts',
    }),
};
```

### 模板与分隔符

`template`指定分段模板，每个占位字符对应一个输入格，`delimiter`中的字符原样渲染为分隔符：

```ts
form.state = {
    code: configurable('AB-CD-000', {
        label: '授权码',
        widget: 'parts',
        delimiter: '-', // [!code ++]
        template: '00-00-000', // [!code ++]
    }),
};
```

`delimiter`可以包含多个分隔符字符，模板中出现这些字符的位置都会渲染为分隔符：

```ts
form.state = {
    code: configurable('ab#123', {
        label: '授权码',
        widget: 'parts',
        delimiter: '-#', // [!code ++]
        template: '00#00-000', // [!code ++]
    }),
};
```

`includeDelimiter`控制状态值中是否包含分隔符，`false`时结果中移除分隔符：

```ts
form.state = {
    code: configurable('abcdefg', {
        label: '授权码',
        widget: 'parts',
        delimiter: '-#',
        template: '00#00-000',
        includeDelimiter: false, // [!code ++] 状态值为 "abcde..."，不含 # -
    }),
};
```

### 输入字符限制

`chars`以正则约束允许输入的字符，如`[0-9]`只允许输入数字：

```ts
form.state = {
    code: configurable('0000000', {
        label: '数字序列号',
        widget: 'parts',
        delimiter: '-#',
        template: '00#00-000',
        chars: '[0-9]', // [!code ++]
    }),
};
```

### 大小写

`caseType`约束输入字符的大小写，可选`upper`/`lower`/`both`：

```ts
form.state = {
    code: configurable('', {
        label: '大写授权码',
        widget: 'parts',
        delimiter: '-',
        template: '00-00-000',
        caseType: 'upper', // [!code ++]
    }),
};
```

## 属性

| 属性               |   类型    |  默认值   | 说明                                                 |
| ------------------ | :-------: | :-------: | ---------------------------------------------------- |
| `template`         | `string`  |  `"0000"` | 分段模板，每个占位字符一段，如`"00-00-000"`          |
| `delimiter`        | `string`  |   `""`    | 段连接符，可包含多个分隔符字符                       |
| `caseType`         | `string`  |  `"both"` | 输入字符大小写约束，可选`upper`/`lower`/`both`       |
| `includeDelimiter` | `boolean` |  `true`   | 状态值是否包含分隔符，`false`时移除                  |
| `chars`            | `string`  |           | 允许输入字符的正则，如`"[0-9]"`                      |

## 注意事项

-   支持直接粘贴到输入框的内容，会按分隔符自动分割到各输入格。
-   `template`中的占位字符仅表示一个输入格，字符本身无含义；分隔符位置由`delimiter`决定。
