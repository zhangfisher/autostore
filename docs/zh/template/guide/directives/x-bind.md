# x-bind 属性绑定

## 概述

`x-bind:attr`（简写 `:attr`）把状态绑定到元素的任意属性。它会按属性名自动分派到合适的写入方式：普通属性、`class`、`style`、布尔属性等，一套语法覆盖所有场景。

```html
<a :href="link.url">链接</a>
<span :class="{ active: on }">标签</span>
<button :disabled="saving">保存</button>
```

`x-class` / `x-style` 是 `x-bind` 的特化别名——解析期归一化为 `bind` + `class` / `style` 参数，没有独立指令类。

## 快速入门

<demo html="template/bind/basic.html"/>

```html
<a :href="link.url" :title="link.tip">{{ link.text }}</a> <img :src="img.src" :alt="img.alt" />
```

`:attr="expr"` 的 `expr` 是表达式（路径、对象、三元等任皆可），随状态自动更新。

## 指南

### 绑定普通属性

`:title` / `:href` / `:src` / `:value` 等普通属性，值经 `String()` 转换后 `setAttribute`。

<demo html="template/bind/basic.html"/>

```html
<a :href="link.url" :title="link.tip">{{ link.text }}</a>
```

### 绑定 class

`:class` / `x-class` 支持三种写法，按 diff 增量更新（只改变化的 token）：

<demo html="template/bind/class.html"/>

```html
<!-- 对象：键为类名，值为真则启用 -->
<span :class="{ val: user.active, muted: !user.active }">状态</span>
<!-- 数组：合并多个类 -->
<span :class="['card', theme]">卡片</span>
<!-- 字符串 -->
<span :class="theme">主题</span>
```

### 绑定 style

`:style` / `x-style` 支持对象（key 用驼峰）或字符串：

<demo html="template/bind/style.html"/>

```html
<!-- 对象：驼峰 key，合并到 el.style -->
<p :style="{ color: msg.color, fontSize: msg.size + 'px' }">消息</p>
<!-- 字符串：整体 cssText 替换 -->
<p :style="msg.cssText">消息</p>
```

::: warning 对象 key 用驼峰
对象写法经 `Object.assign(el.style, value)` 合并，key 必须是 `CSSStyleDeclaration` 的属性名（驼峰，如 `fontSize`、`backgroundColor`），连字符（`font-size`）不生效。字符串写法用连字符没问题。
:::

`.transition` 修饰符可让样式变化自动过渡动画（注入默认 `transition:all 0.3s ease-in`，可用 `x-bind-options` 覆盖）。完整说明见 [x-style · 过渡动画 `.transition`](./x-style.md#过渡动画-transition)。

### 绑定布尔属性

`:disabled` / `:checked` / `:readonly` 等布尔属性，值为真则 `setAttribute`、为假则 `removeAttribute`：

<demo html="template/bind/boolean.html"/>

```html
<button :disabled="saving" @click="save">{{ saving ? "保存中…" : "保存" }}</button>
<input type="checkbox" :checked="agree" />
```

### 属性插值自动归一化

属性值里的插值会自动归一化为 `:attr` 绑定，复用上面同一套分派：

```html
<a href="/users/{{ user.id }}">主页</a> <span class="card {{ user.role }}">标签</span>
```

详见[响应式 · 属性插值](../reactive.md#属性插值)。

## 配置

`x-bind` 的指令值即要绑定的表达式，**无独立指令选项与修饰符**。

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退的通用机制见[指令配置](../config.md)。
:::

## 注意事项

- **同属性避免重复绑定**：同一元素不要同时对同一属性用 `:attr` 与属性插值（如 `:class` 与 class 里混排插值），编译期会报错。
- **class / style 是 diff 更新**：只增删变化的 token / 声明，不会清掉其他来源的类。但静态写在 `class=""` 里的 token 与 `:class` 绑定是两套，避免互相依赖。
- **对象 style 用驼峰**：见上文警告。
- **布尔属性的假值**：`false` / `null` / `undefined` 会移除属性，而非设为 `"false"`（规避 HTML 布尔属性坑）。
