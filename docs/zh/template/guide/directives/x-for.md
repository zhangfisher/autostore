# 列表渲染

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

| 变量              | 含义                                     |
| ----------------- | ---------------------------------------- |
| `$index`          | 0-based 序号                             |
| `$length`         | 本次渲染项数（筛选后长度）               |
| `$begin` / `$end` | 是否首项 / 末项                          |
| `$odd` / `$even`  | 奇数行 / 偶数行（对齐 CSS `:nth-child`） |

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

### 与 x-if 组合

`x-for` 与 `x-if` 组合有两种正确写法，按「条件作用对象」选择：

**① 项内嵌 `x-if`——按每项数据条件渲染（最常用）**

把 `x-if` 写在**项模板内部**的子元素上，按当前项字段决定该子内容是否渲染。`x-if` 与 `x-for` 分处不同层级、各占自己的子树，互不冲突：

<demo html="template/for/if.html"/>

```html
<ul x-for="notice of notices" :key="notice.id">
    <li>
        {{ notice.title }}
        <span x-if="notice.unread" class="tag is-warning">未读</span>
    </li>
</ul>
```

`x-if` 订阅 `notice.unread`，字段变化时按细粒度响应式单独触发该项标记的显隐，无需整列表重渲染。

**② 控制整表显隐——用 `x-if.keepalive` / `x-show` / 外层包裹**

要按条件决定「整个列表出现/消失」时，`x-if`（默认 eager）与 `x-for` **不能写在同一元素上**（见下方警告）。改用不占子树的条件指令，或把条件渲染提到外层：

```html
<!-- ✅ x-if.keepalive：detach 容器、保活项子树与订阅，true 时原样 reattach -->
<ul x-for="notice of notices" x-if.keepalive="visible">...</ul>

<!-- ✅ x-show：display:none 切显隐，容器永留 DOM -->
<ul x-for="notice of notices" x-show="visible">...</ul>

<!-- ✅ 外层包裹：把条件渲染与列表渲染分层，二者各占不同子树 -->
<div x-if="visible">
    <ul x-for="notice of notices">...</ul>
</div>
```

::: warning 同元素 `x-for` + `x-if`（eager）会编译期报错
默认 `x-if` 与 `x-for` 都声明占有子树（`ownsChildren`），语义互斥：前者要按条件销毁/重建子树，后者要把子树当项模板重复渲染。写在同一元素会在编译期抛 `[x-if/x-for 冲突]`。整表显隐用上面三种写法之一，逐项显隐用写法 ①。
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

#### `:key` 的作用

`:key` 给每个列表项一个**稳定的唯一标识**，告诉引擎「结构变化前后，哪一项是哪一项」。数组发生增删、重排、整体替换时，引擎据此按 key 匹配，**复用未变项**——保留它的 DOM 节点、scope、订阅与输入态（焦点、半填表单等），只更新内容差异；无法匹配的才销毁或新建。

```html
<!-- 用数据自带的唯一 id 作 key -->
<ul x-for="item of items" :key="item.id">
    <li>{{ item.title }}</li>
</ul>
```

#### 原理：4-pass diff 的复用匹配

数组变化触发 render 时，引擎做四趟处理，每项按 key 决策去留：

| 决策 | 触发条件 | 引擎动作 |
| --- | --- | --- |
| **复用** | 旧列表中存在**同 key 且 index 不变**的项 | 原地更新项数据（`Object.assign(localData)`），重跑项内绑定——DOM、scope、订阅、焦点全保留 |
| **重订阅（移动）** | 旧列表存在**同 key 但 index 变**（被移动/前插） | 复用项根 DOM 节点，仅因 index 变化重订阅项内依赖 index 的绑定 |
| **新建** | 出现旧列表没有的新 key | 克隆项模板、建 scope、建立订阅、挂载 |
| **销毁** | 旧列表里某个 key 在新列表消失 | 销毁该项 scope（连带子树订阅 off）、移除 DOM |

关键在于 **key 稳定**：只要一项的 key 不变，无论它在数组里挪到哪、前面插了多少项，引擎都能认出「这是同一项」而复用它。`:key` 缺省回退用 **index（位置序号）**——这时 key 等于位置，结构一变身份就跟着错位。

#### 有 `:key` vs 无 `:key`

两种写法在常见数组操作下的差异：

| 场景 | 无 `:key`（用 index） | 有 `:key`（稳定唯一标识） |
| --- | --- | --- |
| 末尾增删（`push` / `pop`） | ✅ 零成本复用 | ✅ 零成本复用 |
| 中间插入 / 删除（`splice` / `unshift`） | ⚠️ 后续所有项 index 错位 → 逐项重订阅（内容虽同，但身份认不出，绑定路径含旧 index） | ✅ 未动项同 key + index 不变 → 原地复用，仅新建/销毁真正变化的项 |
| 重排 / 排序 / 反转 | ⚠️ 大量项 index 变 → 大面积重订阅 | ✅ 按 key 复用项根 DOM，仅重排顺序 |
| 整体替换数组（新对象引用） | ⚠️ 逐项按位置匹配 → 内容相同也视为变化 | ✅ 同 key 项照常复用，只 patch内容差异 |
| 焦点 / 输入态保留 | ❌ 中间增删时，错位项的 DOM 虽在但订阅错乱、易丢失状态 | ✅ 复用项的 DOM 与状态完整保留 |
| 性能特征 | 末尾操作 O(1)；中间操作可能 O(n) 重订阅 | 各类增删重排均只处理真实变化项 |

#### 为什么应尽量指定 `:key`

用数据自带的唯一且稳定的字段（数据库 id、业务主键）作 `:key`，让引擎在任何结构变化下都按「身份」而非「位置」匹配。代价极小（一次 key 求值），收益是：

- **正确性**：项内若依赖 `$index` 或按 index 订阅的状态，无 key 时中间增删会让项与数据错位；有 key 则项始终绑着自己那份数据。
- **性能**：重排、中间增删、整体替换只重建真正变动的项，其余项零成本复用。
- **状态保留**：输入框焦点、动画中途态、子组件状态随项 DOM 一并保留，不被位置变化打掉。

::: tip 什么算好的 `:key`
**唯一 + 稳定**。优先用数据自带的 `id` / 业务主键。避免用数组 `index`（结构一变即错位，等于无 key），也别用会变的字段（如自增序号、可编辑的标题）——这类 key 变动会让该项被判为「消失 + 新建」，反而触发销毁重建。
:::

## 配置

`x-for` 的指令值形如 `项变量[, index变量] of 数组路径\|表达式`（必填，如 `x-for="item of items"`）。下列配置项控制项标识；带 ✅ 者可用修饰符方式启用。

| 配置项 | 默认值  | 修饰符 | 说明                                               |
| ------ | ------- | ------ | -------------------------------------------------- |
| `:key` | `index` |        | 容器上的 `:key="expr"`，项的唯一标识，缺省用 index |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **与 `x-if`（eager）互斥**：二者都要独占子树，同元素会报错。需要时用 `x-show` / `x-if.keepalive`，或外层包裹。
- **`:key` 声明在容器上**，不是项模板上。
- **嵌套遮蔽**：内层 `$index` / 项变量遮蔽外层同名；跨层引用外层序号用自定义 index 名（如 `cell, cidx of ...` 后用 `cidx`）。
- **派生变量靠 refresh 重算**：`$end` / `$length` 等随数组增删变化，复用项会原地重算并重跑绑定。
- **表达式数组退粗粒度**：纯路径 `items` 保留字段级细粒度；`items.filter(...)` 等表达式会让字段变更也触发整列表 render。
