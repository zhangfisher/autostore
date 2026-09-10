# IpAddress

## 概述

`IpAddress`IP 地址输入组件，将 IPv4 地址拆分为`4`个分段输入框，段间以`.`分隔。输入满 3 位自动跳到下一段，每段限制`0-255`。

## 示例

声明 IP 地址字段只需指定`widget: 'ipaddress'`，状态值是完整的点分 IP 字符串：

```ts
const form = document.querySelector('#form');
form.state = {
    ip: configurable('192.168.1.1', {
        label: 'IP 地址',
        widget: 'ipaddress',
    }),
};
```

<demo html="autoform/widgets/ipaddress.html"/>

## 指南

### 基础用法

四个分段输入框共享一个状态值，任意一段修改都会同步合成`a.b.c.d`形式的字符串：

```ts
form.state = {
    ip: configurable('0.0.0.0', {
        label: '服务器地址',
        widget: 'ipaddress',
    }),
};
```

聚焦某一段时会自动全选该段内容，输入满`3`位自动跳到下一段。

### 粘贴支持

支持直接粘贴完整的 IP 地址：复制形如`192.168.1.1`的文本粘贴到任意一个分段输入框中，组件会自动识别并填充到四个分段。

配合自定义`validate`可以校验每段范围：

```ts
form.state = {
    ip: configurable('', {
        label: '服务器地址',
        widget: 'ipaddress',
        validate: (value) => {
            if (!value) return false;
            return value
                .split('.')
                .every((bit) => Number(bit) >= 0 && Number(bit) <= 255);
        },
        errorMessage: 'IP 地址每段必须在 0-255 之间',
    }),
};
```

## 属性

无自有属性。

## 注意事项

-   支持直接粘贴 IP 地址：试试复制`192.168.1.1`并粘贴到输入框中，会自动分段填充。
-   粘贴内容必须是合法的点分 IP 格式（如`192.168.1.1`），否则会被忽略。
