# x-teleport 传送

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 预期用途

把元素**渲染到 DOM 树的其他位置**——脱离当前父级，挂到指定目标下。常用于弹窗、提示、下拉等需要脱离溢出隐藏（`overflow:hidden`）容器、渲染到 `body` 的场景。

## 预期 API

```html
<div x-teleport="selector">...</div>
```

`x-teleport` 的值是目标选择器，支持**相对路径**写法（相对于当前元素的祖先链）：

| 写法 | 含义 |
| --- | --- |
| `x-teleport="#modal"` | 全局选择器，传送到 `#modal` |
| `x-teleport="./<选择器>"` | 当前元素父元素下的目标 |
| `x-teleport="../<选择器>"` | 父元素的父元素下的目标 |
| `x-teleport="../../<选择器>"` | 更上层祖先下的目标 |

## 预期示例

```html
<body>
    <div class="overflow-hidden">
        <!-- 这个弹窗传送到 body 下，不受父级 overflow:hidden 影响 -->
        <div x-teleport="body" x-if="show" class="modal">弹窗内容</div>
    </div>
</body>
```

## 注意事项

- `.` 代表父元素，`..` 代表父元素的父元素，层数叠加表达更上层祖先。
- 传送后元素的逻辑作用域（scope）仍随原模板位置，仅 DOM 挂载点改变。
