# x-model 双向绑定

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全 demo 与细节。
:::

## 概述

在表单控件（`input` / `select` / `checkbox` / `radio` 等）上实现**双向绑定**——用户输入自动写回状态，状态变化自动同步到控件值。相当于 `x-on:input`（写回）与 `:value`（同步）的声明式合写。

## 快速入门

```html
<div id="app">
    <input x-model="user.name" />
    <p>你好，{{ user.name }}</p>
</div>
```

## 配置

```html
<!-- 文本输入双向绑定到状态路径 -->
<input x-model="user.name" />

<!-- 复选框绑定到 boolean / 数组 -->
<input type="checkbox" x-model="form.agree" />
<input type="checkbox" value="red" x-model="form.colors" />

<!-- 修饰符（预期）：.lazy 延迟到 change、.number 转数字、.trim 去空格 -->
<input x-model.lazy.number="form.age" />
```

`x-model` 的指令值是双向绑定的状态路径（必填）。下列配置项控制同步时机与值的转换（修饰符集合以实现版本为准）；带 ✅ 者可用修饰符方式启用。

| 配置项    | 默认值 | 修饰符 | 说明                                          |
| --------- | ------ | ------ | --------------------------------------------- |
| `.lazy`   | 未启用 | ✅     | 延迟到 `change` 事件同步（默认每次 `input`） |
| `.number` | 未启用 | ✅     | 将输入转为数字再写回状态                      |
| `.trim`   | 未启用 | ✅     | 去除首尾空格再写回状态                        |

## 注意事项

- 本指令与 `:value` + `@input` 的手动组合等价，`x-model` 是其语法糖。
- 具体修饰符集合以实现版本为准。
