# x-transition 过渡动画

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 预期用途

为元素的**进入 / 离开**添加过渡动画，配合 `x-if` / `x-show` / `x-teleport` 等控制显隐的指令使用——在显隐切换时播放淡入淡出、滑动等动画，而非生硬地出现 / 消失。

## 预期 API

```html
<div x-if="show" x-transition="fade">淡入淡出</div>
```

`x-transition` 的值是动画名（对应预定义或自定义的过渡效果）。预期配合 CSS 过渡类（如 `.fade-enter` / `.fade-leave`）或内置动画名。

## 预期示例

```html
<style>
    .fade-enter { opacity: 0; }
    .fade-enter-active { transition: opacity 0.3s; }
</style>

<button @click="toggle">切换</button>
<div x-show="on" x-transition="fade">这段文字会淡入淡出</div>
```

## 注意事项

- 与 `x-if`（eager）配合时，动画发生在子树挂载 / 卸载阶段。
- 具体内置动画名、CSS 类约定以实现版本为准。
