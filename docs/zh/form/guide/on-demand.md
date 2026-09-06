# 按需引入

`@autostorejs/form` 提供两种打包形态（ADR-0005）：

| 形态 | 入口 | 适用 |
| ---- | ---- | ---- |
| **全量产物** | `@autostorejs/form` | 一行引入，全部 widget 开箱即用 |
| **按需产物** | `@autostorejs/form/core` + `@autostorejs/form/widgets/*` | 只加载实际用到的 widget，减小体积 |

全量产物因副作用注册（import 即 `customElements.define` 全部 39 个 widget）不可 tree-shake，gzip 约 68 KB；按需引入时最小依赖（core + 若干 widget）可显著降低加载体积。

## core 产物

`core` 是按需引入的最小前置：表单框架（`auto-form`）、字段基类、图标注册，以及**默认 widget `input`**——`schema.widget` 未声明时取 `input`，它是 core 契约的一部分。

```ts
import "@autostorejs/form/core";
// 只引 core：任何未声明 widget 的字段渲染为 input
```

## widget 产物

每个 widget 一个产物，引入即完成该 widget 的元素注册：

```ts
import "@autostorejs/form/core";
import "@autostorejs/form/widgets/cron";
import "@autostorejs/form/widgets/select";
// 现在 schema.widget: 'cron' | 'select' | 'input'(默认) 可用
```

类型层的 widget 键合并与运行时引入严格对齐：只引 core 时 `widget: "cron"` 落入宽泛类型；引了 `widgets/cron` 后获得 `AutoFieldCronOptions` 的精确类型检查。

与全量产物混用是安全的（元素注册带防重复守卫），但混用没有体积收益。

## 浏览器双 script（IIFE）

无 bundler 场景使用 IIFE 产物。**顺序是硬约束：core 必须先行**——它是 lit 单例的宿主，widget 产物启动时若找不到 `AutoFormCore` 全局会抛出明确错误。

```html
<script src="https://cdn.example.com/autostore.js"></script>
<!-- 先 core，后 widget -->
<script src="https://cdn.example.com/form/core.global.js"></script>
<script src="https://cdn.example.com/form/widgets/cron.global.js"></script>
```

::: warning
IIFE 形态的全量产物（`./browser`）与按需产物**不可混引同一页**——两者各自内联一份 lit，会出现两个 `LitElement` 基类谱系导致 context 失联。
:::

<demo html="autoform/split/cron.html" title="按需引入（core + cron 双 script）"/>
