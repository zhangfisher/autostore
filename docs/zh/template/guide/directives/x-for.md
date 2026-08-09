# x-for 列表渲染

## 概述

`x-for` 根据数组重复渲染一段模板。带 `x-for` 的元素作为**容器**渲染一次，其元素子节点作为**项模板**被重复 N 次。

```html
<ul x-for="book of books" :key="book.id">
    <li>{{ book.title }}</li>
</ul>
```

它基于 `:key` 做 diff 复用——结构变化时尽量复用未变项（保留 DOM、scope、订阅），只增删差异项，避免列表重渲染丢失焦点与输入态。

## 快速入门

<demo html="template/for/basic.html"/>

```html
<ul x-for="book of books" :key="book.id">
    <li>{{ book.title }} — {{ book.author }}</li>
</ul>
```

语法：`<项变量> of <数组路径>`。`:key` 声明在**容器**上（如 `:key="book.id"`），缺省时用 index。

## 指南

### 基础列表与响应式

项模板里用项变量（`book`）访问当前项字段。增删数组元素（`push` / `shift` / `splice` / 整体赋值）自动触发重新渲染：

<demo html="template/for/basic.html"/>

```javascript
engine.state.books.push({ id: 3, title: "新书", author: "新" });
engine.state.books.shift();
```

### 循环派生变量

每项作用域自动注入一组 `$` 前缀派生变量（不占自定义命名空间）：

| 变量 | 含义 |
| --- | --- |
| `$index` | 0-based 序号 |
| `$length` | 本次渲染项数（筛选后长度） |
| `$begin` / `$end` | 是否首项 / 末项 |
| `$odd` / `$even` | 奇数行 / 偶数行（对齐 CSS `:nth-child`） |

<demo html="template/for/derived.html"/>

```html
<ul x-for="item of items">
    <li :class="$odd ? 'val' : 'muted'">第 {{ $index + 1 }} 项：{{ item }}</li>
</ul>
```

### x-empty 空状态

容器内带 `x-empty` 的子节点在数组为空时渲染一次、非空时拆除。它对**父作用域**求值（无 item / $index）：

<demo html="template/for/empty.html"/>

```html
<ul x-for="item of items">
    <li>{{ item }}</li>
    <li x-empty>没有数据</li>
</ul>
```

::: tip x-empty 标签须匹配容器内容模型
`<ul>` 内用 `<li x-empty>`、`<select>` 内用 `<option x-empty>`、`<tbody>` 内用 `<tr x-empty>`——与项模板同标签，避免浏览器解析期挪动节点。
:::

### 复合项

容器的多个元素子节点作为**一组**一起循环（如 `<dl>` 下的 dt/dd、卡片的头/体）。`:key` 按「项」计，一个 key 对应一组 DOM 节点。

```html
<dl x-for="user of users" :key="user.id">
    <dt>{{ user.name }}</dt>
    <dd>{{ user.email }}</dd>
</dl>
```

### key 复用

`:key` 让 diff 按 key 匹配而非位置——同 key 项的 DOM / scope / 订阅被复用，只更新内容；移动（index 变）仅重订阅、保留项根 DOM；新 key 新建、消失 key 销毁。

```html
<!-- 用唯一 id 作 key：重排/中间增删时其他项零成本复用 -->
<ul x-for="item of items" :key="item.id">...</ul>
```

缺省 `:key` 用 index——末尾增删（push/pop）零成本，但中间插入/重排会导致后续项重订阅。

## 配置

| 配置项 | 形式 | 说明 |
| --- | --- | --- |
| 指令值 | `x-for="item of items"` | `项变量[, index变量] of 数组路径\|表达式` |
| `:key` | 容器上的 `:key="expr"` | 项的唯一标识，缺省用 index |

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `priority` | `100` | 最高结构指令，先于 `x-if` 等占有子树 |
| `singleton` | `true` | 同元素同名取最后声明 |
| `ownsChildren` | `true` | 永远独占子树（子节点是项模板） |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **与 `x-if`（eager）互斥**：二者都要独占子树，同元素会报错。需要时用 `x-show` / `x-if.keep`，或外层包裹。
- **`:key` 声明在容器上**，不是项模板上。
- **嵌套遮蔽**：内层 `$index` / 项变量遮蔽外层同名；跨层引用外层序号用自定义 index 名（如 `cell, cidx of ...` 后用 `cidx`）。
- **派生变量靠 refresh 重算**：`$end` / `$length` 等随数组增删变化，复用项会原地重算并重跑绑定。
- **表达式数组退粗粒度**：纯路径 `items` 保留字段级细粒度；`items.filter(...)` 等表达式会让字段变更也触发整列表 render。
