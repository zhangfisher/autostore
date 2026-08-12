# 模板块

## 概述

**命名模板块**（`x-block`）是一种**声明性资源**——它本身不渲染、不建 scope、不订阅状态，仅在编译期被「深克隆为快照」后**从渲染树摘除**，作为模板供体交给最近祖先 scope 保管。

当 `x-loading` 这类消费者需要一个 UI 态（加载中、空、错误……）时，不再被钉死在引擎内置的旋转 loader 上，而是经 `getBlock(name)` 取出你声明的块快照，clone + 编译后替换内置 UI。于是**同一套响应式状态，可以用任意自定义 HTML 模板来表达它的各种"非内容态"**。

## 快速入门

`x-scope` 让纯容器建 scope，使内部的 `x-block="loading"` 有归属锚点。该块声明了骨架屏模板——`x-loading` 渲染时自动取用它替换内置旋转 loader。注意：`x-block` 元素本身**不会出现在页面上**。

<demo html="template/block/basic.html"/>

## 指南

### 声明与摘除

`x-block` 在编译期被一个**前置 transformer** 拦截（排在通用元素编译规则之前，first-match-wins）。它做三件事：

1. **深克隆**该元素为冻结快照（保留其上所有指令属性，如 `x-text`，但尚未编译）；
2. 按名存入**最近祖先 scope** 的 `blocks` 映射；
3. 返回 `null` **剪枝**——块元素及其子树不进结果 DOM、不建 scope、不实例化其上的指令。

```html
<!-- 声明：这个 div 编译后从 DOM 消失，仅作为"loading"模板供体 -->
<div x-scope>
    <div x-block="loading"><div class="skeleton"></div></div>
    <div x-loading="{ visible:'on' }">内容</div>
</div>
```

::: tip 它是模板，不是占位
`x-block` **不是**运行时会显示出来的占位元素。它更像一个「未编译的模板片段」仓库——声明时即被摘除，需要时才被消费者克隆渲染。别指望在页面里 `querySelector('[x-block]')` 找到它。
:::

### x-scope：为纯容器建 scope 锚点

`x-block` 收集时沿原树向上找**最近祖先 scope** 挂自己的快照。但只有「含指令或 `{{}}` 插值」的元素才建 scope——一个光秃秃的 `<div>` 不建 scope，它内部的 `x-block` 就**无处归属**，编译期会 `warn` 并丢弃：

```html
<!-- ❌ 根 div 无指令无插值 → 不建 scope → x-block 被丢弃（warn） -->
<div>
    <div x-block="loading">加载中</div>
</div>
```

`x-scope` 就是解决这个缺口的**零副作用占位指令**——它唯一作用是让「无其他指令、无插值」的纯容器在编译期建一个 scope：

```html
<!-- ✅ x-scope 让纯 div 建 scope → x-block 有归属锚点 -->
<div x-scope>
    <div x-block="loading">加载中</div>
</div>
```

`x-scope` 不建数据域、不注入 dataScope、不订阅、不渲染。元素已有其他指令（本就建 scope）时，`x-scope` 冗余但**静默无副作用**。

::: warning 必须有祖先 scope
每个 `x-block` 都需要至少一个祖先 scope（来自 `x-scope` 或任意其他指令、插值）。否则该块在编译期被 `warn` 丢弃，消费者取不到它、回退内置默认 UI。
:::

### 命名与 default 约定

- **无值** `x-block` 取名 `default`：`<div x-block>…</div>`
- **有值** `x-block="loading"` 取名 `loading`：块名自由，引擎**不预定义** UI 态名册。

`default` 是唯一有约束的块名——**同一 scope 直接归属的 `default` 只能有一个**，第二个会抛错：

```html
<!-- ❌ 同一 scope 第二个直接归属 default 抛错 -->
<div x-scope>
    <div x-block>第一个</div>
    <div x-block>第二个</div>
</div>
```

但**沿 parent 链**允许同名覆盖——内层 scope 的 `default` / `loading` 就近遮蔽外层，这正是块查找的核心语义。

### getBlock：就近覆盖 + 全局兜底

消费者（`x-loading` / 未来的 `x-empty` / `x-error`…）经 `scope.getBlock(name)` 取块，查找规则是**沿 parent 链向上就近**：

```typescript
getBlock(name: string): HTMLElement | undefined {
    let s = this;
    while (s) {
        if (s.blocks && Object.prototype.hasOwnProperty.call(s.blocks, name)) {
            return s.blocks[name]; // 命中即止
        }
        s = s.parent;
    }
    return this.engine._resolveGlobalBlock(name); // 到顶兜底全局块
}
```

下面 demo 演示两种取块路径并存：左卡片的外层 scope 声明了局部 `loading` 块（跳动点），就近覆盖；右卡片链上无局部块，到顶后兜底命中 `options.blocks.loading` 全局块（旋转环）。

<demo html="template/block/override.html"/>

### 全局块（options.blocks）

除了在模板里写 `<div x-block="loading">`，还可以在构造引擎时传入**全局块**——字符串模板，全引擎所有消费者在链上无局部块命中时复用：

```javascript
const engine = new AutoTemplateEngine(el, { on: true }, {
    blocks: {
        // 字符串入参，首次使用时自动包装成块、懒预编译缓存
        loading: `<div class="global-spin"></div>`,
        empty:   `<div class="state-empty">暂无数据</div>`,
    },
});
```

全局块经**自动包装**规范化为「恰好一个带 `x-block` 的根元素」，规则是：

| 入参形态 | 包装结果 |
| --- | --- |
| 单顶级元素、无 `x-block` | 根自身打标 `x-block="<name>"` |
| 已含 `x-block="xxx"` | 尊重原值，不重命名 |
| 多顶级节点 | 包一层 `<div x-block="<name>">` |
| 纯文本 / 无元素 | 包成 `<div x-block="<name>">文本</div>` |
| 空串 / 解析失败 | 记 `warn` + 视为未命中，回退默认 UI |

::: tip 全局块适合"统一品牌态"
全局块的生命周期随 engine，**运行时突变 `options.blocks` 不失效缓存**（它是构造期配置语义）。要整个应用用同一套 loading / empty 样式，就用全局块；要某个区块用独特的态模板，就在该区块的 `x-scope` 内写局部 `x-block` 就近覆盖。
:::

### 消费者：块兜底

`x-block` 本身只是供体，真正取用它的是消费者指令。以 `x-loading` 为例，其渲染统一走「取块 = `getBlock('loading') ?? DEFAULT_BLOCK`」路径：

- **命中**自定义块 → 深克隆快照 → 经编译路径渲染（块内 `x-text` 等指令此时才编译、建立响应式订阅）→ 替换内置旋转 loader；
- **未命中** → 回退内置默认 loader（**块兜底**）。

块内指令的响应式数据来源是消费者注入的 **dataScope**。`x-loading` 会把配置里的 `message` / `color` 等字段注入块，块内用 `x-text="message"` 即可响应式取用：

```html
<div x-scope>
    <!-- 块内 message 由下方 x-loading 配置注入、响应式取值 -->
    <div x-block="loading"><span x-text="message"></span></div>
    <div x-loading="{ visible:'on', message:'正在拉取数据…' }">内容</div>
</div>
```

::: warning x-block 上的同元素指令会被冻结
`x-block` 元素上的其他指令（如 `<div x-block="loading" x-text="msg">`）**不会在当前 scope 执行**——整个块被摘除、冻结成快照，其上的 `x-text` 失去宿主。要让指令生效，把指令写在**块内部**的子元素上，块被消费渲染时它们才编译。
:::

---

模板块讲完。它常与 `x-loading` 配合，详见 [x-loading 指令](./directives/x-loading.md)；其作用域锚点 `x-scope` 的更多背景见 [动作](./action.md)。
