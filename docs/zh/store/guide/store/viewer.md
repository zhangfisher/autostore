# Viewer

## 概述

`autostore-viewer` 是 AutoStore 的状态查看器组件：把 `AutoStore` 的状态树渲染成一棵可折叠的**只读/可编辑树**，用于开发调试、运行时的状态巡检，以及以 `configurable` 声明的配置面板。

它基于 Web Component（Lit 实现）发布为自定义元素 `<autostore-viewer>`，与框架无关——原生页面、React、Vue 中均可直接使用。

主要能力：

| 能力 | 说明 |
| --- | --- |
| 树形呈现 | 对象 / 数组 / 字符串 / 数字 / 布尔 / 函数 / `computed` / `markRaw` 按类型图标区分，可折叠、可初始展开深度控制 |
| 实时响应 | 状态被修改（含异步计算结果回填）时仅增量更新受影响节点，视图与 store 始终一致 |
| 元数据渲染 | 读取 `configurable()` 声明的 `label` / `help` / `required` / `choices` / `icon` / `prefix` / `suffix` 等展示词汇 |
| 行内编辑 | `view` / `click-edit` / `edit` 三种模式，编辑控件由 `schema.widget` 决策，写入即时生效并带 UI 预校验 |
| 节点动作 | 渲染 `schema.actions` 声明的按钮 / 下拉菜单 / 图片按钮，并可派发 `action` 事件 |
| 区头/区尾 | `header` / `footer` 声明钉住的标题与动作区，默认区头带「重置/保存」（`mode` 门控）；支持 slot 替换渲染 |
| 表单提交 | 整个组件由 `form` 包裹，`action`/`method` 透传；保存即受管提交（校验 → 遮罩 → fetch → toast + `submit-result` 事件） |
| 配置面板 | `only-configurable` 模式只渲染 `configurable` 项，并按 `configManager` 的分组呈现 |
| 子树入口 | `entrys` 属性可只渲染状态树中的指定路径 |
| 外观可定制 | 网格线、根级分组底色、暗色主题、对齐方式、列宽上限、图标来源等均为属性开关，标签区列宽支持鼠标拖拽调节 |

> 组件定位是「状态的视图」，不承担业务逻辑：所有数据读写都直接作用于绑定 store 的 `state`。

## 快速入门

### 安装

```bash
npm install @autostorejs/viewer
```

在应用入口注册自定义元素（只需一次）：

```ts
import '@autostorejs/viewer'
```

TypeScript 项目可按需引入类型：

```ts
import type { AutostoreViewer } from '@autostorejs/viewer'
```

也可以在浏览器中直接以 IIFE 引入（先引入 core，再引入 viewer）：

```html
<script src="https://cdn.jsdelivr.net/npm/autostore/dist/index.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@autostorejs/viewer/dist/index.global.js"></script>
```

### 使用

`<autostore-viewer>` 需要一个 store：既可通过 `store` 属性直接传入实例，也可通过 `store-id` 属性按全局注册表查找。

<demo html="viewer/get-started.html" />

```ts
import { AutoStore, configurable } from 'autostore'

const store = new AutoStore({
    user: {
        name: configurable('张三', { label: '姓名', widget: 'text' }),
        role: configurable('admin', {
            label: '角色',
            widget: 'select',
            choices: [
                { label: '管理员', value: 'admin' },
                { label: '访客', value: 'guest' },
            ],
        }),
    },
    price: configurable(100, { label: '单价', widget: 'number', suffix: ' 元' }),
    count: 2,
    total: (scope) => scope.price * scope.count,
})

document.querySelector('#viewer').store = store
```

```html
<autostore-viewer id="viewer"></autostore-viewer>
```

要点：

- **不声明 `configurable` 也能用**：此时完全按值类型渲染；声明了 schema 元数据（`label` / `widget` / `choices` / `help` 等）后，viewer 会以元数据渲染标签、控件与提示。
- **状态是唯一数据源**：示例中按钮直接改 `store.state.price`，视图自动刷新，无需手动同步。
- **默认只读**：需要编辑能力时设置 `mode="click-edit"` 或 `mode="edit"`。

## 指南

### 绑定 Store

viewer 支持两种绑定方式，二者互斥（已设置 `store` 时优先使用）：

- **`store` 属性**：直接传入 `AutoStore` 实例，最直接，类型安全。
- **`store-id` 属性**：按 `id` 从全局注册表（WeakRef 持有）查找 store，适合 store 晚于组件创建、或组件与 store 分处不同的初始化流程。查找失败时每 500ms 重试一次，最多 10 次，之后在控制台告警。

两者都未提供时，组件渲染「未绑定 Store」空态。

<demo html="viewer/binding.html" />

> 注意：store-id 依赖全局注册表，注册表用 WeakRef 持有实例，因此需要有其它强引用保证 store 不被回收。

### 树与类型

树节点的类型由值本身推断，并使用不同的类型图标：

| 类型 | 图标 | 可展开 | 说明 |
| --- | --- | --- | --- |
| `object` | 对象 | ✅ | 普通对象，被 Proxy 代理 |
| `array` | 数组 | ✅ | 折叠时提示 `[...]` |
| `markRaw` | 禁用代理 | ✅ | `markRaw()` 包装的对象，完整展开 |
| `computed` | σ | ✅ | `computed()` 包装的计算属性 |
| `function` | 函数 | ✅ | 状态树中的函数即同步计算属性 |
| `string` / `number` / `boolean` | 对应类型 | ❌ | 叶子节点，渲染为单行 |

相关属性：

- `expand-depth`：初始展开深度（默认 `2`，`0` 表示全部折叠）。`full` 渲染模式下它只影响视觉首屏展开态；`lazy` 模式下它就是初始渲染深度。
- `show-count`：是否显示子节点数量徽章（默认开）。
- `show-hint`：折叠时是否显示 `{...}` / `[...]` 占位提示（默认开）。
- `show-computed`：是否显示计算属性节点（默认关，见下一节）。

<demo html="viewer/tree.html" />

### 计算属性

默认情况下计算属性节点**不显示**（`show-computed` 缺省为 `false`），树中只保留原始状态；打开 `show-computed` 后：

- 函数成员与 `computed()` 计算属性以 σ 图标显示；
- 依赖变化导致重算时，对应节点值原地更新；
- 异步计算（`computed(async ...)`）完成回填时同样实时刷新（viewer 订阅了 observer 完成事件）。

<demo html="viewer/computed.html" />

### 渲染模式

`render-mode` 控制折叠节点是否保留在 DOM 中：

| 值 | 行为 |
| --- | --- |
| `full`（默认） | 全部节点常驻 DOM，折叠仅以行高动画收起并用 `inert` 封锁。折叠期间编辑中的输入值、焦点、控件状态全部保留 |
| `lazy` | 展开渲染、折叠即从 DOM 移除。适合超大树 + 高频写入的场景 |

- 运行时可切换，切换即生效。
- `mode="edit"` 恒为 `full`：显式声明 `lazy` 会被忽略（控制台告警），声明值保留，切离 `edit` 后按字面生效。
- 折叠动画时长由 CSS 变量 `--viewer-collapse-duration` 控制（默认 200ms，设为 `0` 即关闭）。

<demo html="viewer/render-mode.html" />

### 编辑模式

`mode` 有三种取值（默认 `view`）：

| 模式 | 行为 |
| --- | --- |
| `view` | 只读，双击不进入编辑 |
| `click-edit` | 双击值或**按住 1 秒**进入编辑，失焦退出 |
| `edit` | 叶子成员常驻编辑控件；对象/数组容器仍双击进入 JSON 整体编辑 |

编辑语义：

- **即时生效**：输入有效即写入 store，没有确认/取消按钮；按 Esc 不拦截（无取消语义）。
- **Enter 前进**：在控件间把焦点转移到下一个可编辑节点（当前值无效时不前进，`textarea` 的 Enter 为换行）。
- **UI 预校验**：`required` 与 `schema.validate` 不通过时，值不写入并在控件下方实时显示红色错误（`errorMessage` 支持 `{label}` 占位），修正后自动写入并隐藏错误。原生属性（`min` / `max` / `pattern` 等）仅透传为控件属性，不纳入红色错误体系。
- **容器编辑**：对象/数组节点双击（`click-edit`）或按住 1 秒后以 JSON 文本整体编辑，解析成功即写回。

<demo html="viewer/edit.html" />

### Widget 控件与校验

编辑控件的决策链：`schema.widget` 显式声明优先 → 容器未声明时按 JSON 整体编辑（textarea）→ 叶子未声明时按值类型回落（布尔 checkbox、数字 number、其余 text）→ `hidden` / `image` / 未注册的 widget 一律回落标准文本输入框。

已支持的 `widget`：

| 分类 | widget |
| --- | --- |
| 文本 | `text`、`email`、`password`、`search`、`tel`、`url`、`textarea` |
| 数值与日期 | `number`、`range`、`color`、`date`、`time`、`datetime-local`、`month`、`week`、`file` |
| 选项 | `select`（支持 `multiple` 多选）、`radio`、`combobox`（输入框 + `datalist`）、`checkbox` |

选项控件的候选值来自 `choices`，也可用 `valueKey` / `labelKey` 映射自定义结构。`checkbox` 支持三种形态：

- 普通布尔开关（无额外声明）；
- `choices` 恰好两项：勾选写回第一项 `value`、取消写回第二项，勾选框旁显示当前项 `label`；
- `switchValues`：双值档位（如 `['yes', 'no']`）；
- `checkLabel`：固定文案，优先级最高。

其余原生属性（`placeholder` / `min` / `max` / `step` / `rows` / `maxLength` / `pattern` 等）会按控件种类白名单透传。

<demo html="viewer/widget.html" />

### Schema 元数据显示

当 store 使用 `configurable()` 声明元数据时，viewer 会读取并用于展示：

| 字段 | 效果 |
| --- | --- |
| `label` | 完全替换 key 显示 |
| `help` | 作为整行 `title` 悬停提示 |
| `required` | 标签后追加红色 `*` |
| `choices` | 值与候选项严格相等时，显示层替换为对应 `label` |
| `prefix` / `suffix` | 值装饰：纯展示地拼接在值文本前后（写回仍是裸值） |
| `icon` | 替换节点类型图标（见「图标」章节） |

`disable-schema` 可以关闭上述展示词汇（`label` / `help` / `required` / `choices` / `prefix` / `suffix` 一并失效）；但**编辑链路的 widget 决策与校验始终读取 schema**，`schema.icon` 也照常生效——图标是节点身份，不属于展示词汇。

<demo html="viewer/schema.html" />

### 值渲染钩子

`schema.toView` 与 `schema.toRender` 是一对渲染钩子——**toView 管看、toRender 管改**：

- `toView(value)`：查看态自定义值的渲染，返回值可以是 lit 模板、HTML 字符串或 DOM 节点。渲染失败（抛错）会回落默认渲染并在控制台告警。
- `toRender(value)`：编辑态**替代默认编辑器**。viewer 不再注入标准控件与校验状态机，值写回由自定义控件自理（直接改 store 即可，与即时生效模式天然兼容）。

<demo html="viewer/render-hooks.html" />

### 节点动作

`schema.actions` 声明的动作渲染在行的 `node-tools` 区域内（悬停显示，与内置删除工具并存时以细分隔线分隔）。

支持的形态：

| 形态 | 说明 |
| --- | --- |
| `button`（默认） | `icon` + `label` 渲染图标按钮（`label` 作悬停兜底）；仅 `label` 渲染文字按钮；`tooltip` 作为 `title` |
| `dropdown` | `items` 菜单项；`'-'` 渲染分割线；`caret` 显示下拉箭头；`syncMenu` 选中后把该项 `label`/`icon`/`tooltip` 回写触发按钮 |
| `image` | `url` 渲染为图片按钮 |

行为约定：

- `visible: false` 完全不渲染；`enable: false` 渲染但置灰、点击不生效。
- `mode: 'view,edit'`（逗号分隔的查看器模式子集，空 = 全模式显示）按模式显隐——节点动作、区头/区尾动作一视同仁。
- `align: 'left' \| 'right'` 在区头/区尾中按侧分组（默认侧随容器：区头右、区尾左）；节点动作忽略该字段（同 `pos` 待遇）。
- `onClick(value, ctx)`：`value` 是节点**当前状态值**（非显示值），`ctx.update(v)` 经 Proxy 写回该节点路径，`ctx` 还携带 `action` / `options`（该节点的 schema）/ `event`。
- 每次点击都会派发 `action` 自定义事件（`bubbles` + `composed` 可穿透 shadow，且 `cancelable`）：`detail = { path, value, action }`，`path` 与行的 `data-path` 同源。监听方 `preventDefault()` 可拦截 `onClick` 的执行。
- `show-actions` 控制显隐档位：`'0'` 隐藏 / `'1'` 悬停显示（默认）/ `'2'` 常驻显示。该属性不受 `disable-schema` 门控。

<demo html="viewer/actions.html" />

### 区头与区尾

`header` / `footer` 为组件增加钉住的修饰区：区头在内容区之上（标题居左、动作居右），区尾在内容区之下（动作默认居左）。二者**仅有值时渲染**：显式置空、解析失败、内容全空（过滤后无标题无动作）都不渲染。滚动只发生在内容区，区头/区尾钉在视口，自带背景色（`--viewer-header-bg` / `--viewer-footer-bg` 可覆写）并以 1px 分割线与内容区分隔。

| 属性 | 取值 | 说明 |
| --- | --- | --- |
| `header` | `{ title?: string, actions?: AutoStoreAction[] }` | attribute 为 JSON 字符串（支持宽松语法：无引号键名 / 单引号 / 尾逗号），property 可直接传对象 |
| `footer` | `AutoStoreAction[]` | 解析规则同上 |

要点：

- **默认区头**：未声明 `header` 时使用默认值 `{ title: '<store.title>', actions: [重置, 保存] }`，两按钮均仅在 `mode="edit"` 显示；`header=""` 可完全关闭区头。
- **Store 占位符**：标题中 `<store.<prop>>` 形式在渲染时求值 store 实例公开属性（`<store.title>`、`<store.id>` 等），未命中替换为空串——非表达式、不读状态路径。
- **动作复用**：区头/区尾动作与 `schema.actions` 完全同构（三形态、图标链、`visible` / `enable` / `tooltip` / `mode` / `align`），但无节点——`onClick` 的 `value` 为 `undefined`、`ctx.update` 为空操作，`action` 事件的 `detail.path` / `detail.value` 为 `undefined`。
- **slot 替换**：`slot="header"` / `slot="footer"` 有分发内容即整区替换渲染（优先于属性值）；`slot="title"` 仅替换标题区。
- **内置行为**：重置 → `store.reset()`（store 未开启 `resetable` 时按钮禁用并提示）；保存 → 触发表单提交（见下一节）。

<demo html="viewer/chrome.html" />

### 表单提交管理

整个组件由原生 `<form>` 包裹，`action` / `method` 属性透传给表单。保存按钮点击（或编辑态按 Enter）触发**受管提交**：submit 恒被拦截、由 fetch 承接，不发生页面导航。

完整流程：

1. **提交前校验**：edit 常驻行内错误表（与编辑写回同一条校验链，非法值滞留控件未写入 store 的登记）非空即拦截，toast「表单校验未通过，请检查标红项」，不遮罩。
2. **全局遮罩**：校验通过后覆盖整个组件，半透明「正在提交...」+ spinner，拦截交互天然防重复提交；fetch 返回即撤。
3. **受管请求**：`fetch(action, { method, body: FormData })`；`method` 缺省按 GET（此时 FormData 折叠进 URL query）。
4. **结果反馈**：`response.ok` 判定成败，toast「提交成功」/「提交失败」，并派发 `submit-result` 事件。

要点：

- 未声明 `action` 时保存仅派发 `action` 事件并告警，不发起提交（含编辑态单输入的 Enter 隐式提交旁路）。
- `submit-result` 的 `detail = { ok, status, response }`，通知性事件（不可拦截）——外部据此接管后续（跳转、更新重置基线等）。
- 表单恒 `novalidate`：viewer 控件的原生约束多为浏览器隐式缺省而非 schema 声明（如 number 默认 `step=1` 会把小数值判非法），校验真相以行内错误表为准；number 输入已缺省 `step="any"`（schema 显式声明的 `step` 优先）。
- `view` 模式无输入控件，FormData 为空属预期——此时保存语义由 `action` 事件监听方接管。

<demo html="viewer/form-submit.html" />

### 图标

节点的图标按**命中链**解析：

1. **slot 自定义**：在元素内放 `<template slot="icons">`，其中的 `<symbol>` 以 `id` 注册（`asv-` 前缀可带可不带），`schema.icon` 用不含前缀的名字引用；与内置同名的 symbol 会覆盖内置图标。
2. **内置**：对象 / 数组 / 字符串 / 数字 / 布尔 / 函数 / `markRaw` / `computed` 等类型图标。
3. **`icon-url` 拉取**：未命中的图标名在渲染时攒批合并为一次请求（默认源为 lucide：`https://api.iconify.design/lucide.json?icons={names}`），注册完成后自动重渲染替换；不存在的图标负缓存并回落类型图标。置空 `icon-url` 可禁用拉取。

`icon-modify` 可为远程请求名追加风格后缀（`rounded` / `sharp` / `outline` / `outline-rounded` / `outline-sharp`），例如 `home` → `home-outline`，`schema.icon` 的引用名不变。默认源与内置图标同属线型系，拉取注册时会统一重写线宽以保持画风一致；覆写为填充系源（如 material-symbols）时画风需自行承担。

<demo html="viewer/icons.html" />

### 子树入口 entrys

`entrys` 用于只渲染状态树中的一部分，取值是逗号分隔的多个路径（复用单路径 `splitPath` 语法：点分隔、`a\.b` 转义、数组下标）：

- 空（默认）：渲染整个 `state`。
- 多个入口按声明序**平铺在顶层**：容器入口本身不渲染入口行，其子节点从顶层开始（`expand-depth` 各自重新计数）；叶子入口渲染为单行。
- 节点路径与 `data-path` 恒为**绝对路径**（含入口前缀），因此编辑、删除、`action` 事件拿到的路径都是完整 store 路径。
- 位于其它入口子树内的入口会被自动吞并（同路径行不重复）。
- 任一入口路径无效时，整体进入提示态（`entrys 路径不存在: xxx`），不回落全树。
- 入口子树以外的状态变更不会触发重渲染；入口路径被删除或整体替换时自动重建（入口消亡则落入提示态）。

<demo html="viewer/entrys.html" />

### 配置面板 only-configurable

`only-configurable` 属性启用后，viewer 只渲染 store 的 **`configurable` 项**，并依据 `configManager` 的组信息分组呈现，用于把 store 直接当作配置面板：

- **默认区**：未声明 `group` 的项，置顶裸排（无标题条）。
- **真实组**：`configManager.groups` 有值时按组呈现，组顺序为 `order` 升序、缺省者沉底按注册序；组标题条可点击折叠/展开，显示组图标与项数徽章，横跨整行。
- **高级选项虚拟组**：`advanced: true` 的项一律归入此组（优先于 `group` 声明），置尾且默认折叠，组内为空时不产出。
- 非 `configurable` 的状态项不渲染；容器配置项渲染自身行，其嵌套的 `configurable` 子项归位其子级。
- 组折叠状态跨树重建保留；编辑、删除、图标等既有能力照常生效。
- 组清单在 `configManager` 层是**跨 store 聚合**的：多个 store 共享同一个 `ConfigManager` 时，各个面板的组清单相同，但组内项各归各 store（他 store 的项不混入，本 store 无项的组作为空标题条渲染）。
- 由于默认的 `configManager: true` 会为每个 store 创建私有实例，组记录不互通；需要多 store 共享分组时请显式传入同一个 `ConfigManager`。

<demo html="viewer/config.html" />

### 外观与主题

| 属性 | 效果 |
| --- | --- |
| `value-align` | `left`（默认）标签区统一列宽、值左对齐；`right` 值右对齐（不做列宽测量） |
| `max-key-width` | 标签区统一列宽上限（px，默认 `500`），超出截断显示 `...` |
| `grid` | 网格线：`'0'` 无（默认）/ `'1'` 水平线 / `'2'` key-value 间垂直线 / `'3'` 两者 |
| `hide-key-bg` | 隐藏 key 列背景带（背景带默认显示，`value-align="right"` 时不显示） |
| `root-bg` | 顶层分组行（含子节点的根级行）常驻底色，用于区分分组行与数据行 |
| `dark` | 强制暗色主题（缺省跟随系统 `prefers-color-scheme`） |

主题与尺寸也可通过宿主元素的 CSS 变量覆盖：

`--viewer-bg`、`--viewer-text`、`--viewer-muted-text`、`--viewer-border`、`--viewer-hover-bg`、`--viewer-badge-bg`、`--viewer-badge-text`、`--viewer-required-color`、`--viewer-hint-text`、`--viewer-root-bg`、`--viewer-grid-band-bg`、`--viewer-header-bg`、`--viewer-footer-bg`、`--viewer-menu-shadow`、`--viewer-toast-bg`、`--viewer-toast-text`、`--viewer-font-size`、`--viewer-icon-size`、`--viewer-indent-size`、`--viewer-key-width`、`--viewer-collapse-duration`、`--viewer-collapse-easing`。

<demo html="viewer/appearance.html" />

### 删除节点

`allow-delete` 开启后，行的工具区显示删除按钮，点击即从父容器删除该键（数组按元素删除，下标自动重排）。根节点不可删除。删除会真实作用于 store（触发 `delete` / `remove` 操作）。

<demo html="viewer/delete.html" />

## 属性

### 数据与绑定

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `store` | —（property） | `AutoStore \| null` | `null` | 直接绑定的 store 实例。仅作为属性赋值，无对应 attribute |
| `storeId` | `store-id` | `string` | `''` | 按 id 从全局注册表查找 store；未设置 `store` 时生效 |

### 显示

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `expandDepth` | `expand-depth` | `number` | `2` | 初始展开深度，`0` 表示全部折叠 |
| `showCount` | `show-count` | `boolean` | `true` | 是否显示子节点数量徽章 |
| `showHint` | `show-hint` | `boolean` | `true` | 折叠时是否显示 `{...}` / `[...]` 占位 |
| `showComputed` | `show-computed` | `boolean` | `false` | 是否显示计算属性节点 |
| `entrys` | `entrys` | `string` | `''` | 子树入口，逗号分隔的多个状态路径；空表示渲染整个 state |
| `maxKeyWidth` | `max-key-width` | `number` | `500` | 标签区列宽上限（px） |
| `renderMode` | `render-mode` | `'full' \| 'lazy'` | `'full'` | 折叠子树是否常驻 DOM；`mode=edit` 时恒为 `full` |
| `onlyConfigurable` | `only-configurable` | `boolean` | `false` | 配置面板模式：只渲染 `configurable` 项并按组呈现 |

### 编辑与删除

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `mode` | `mode` | `'view' \| 'edit' \| 'click-edit'` | `'view'` | 编辑模式 |
| `allowDelete` | `allow-delete` | `boolean` | `false` | 是否允许删除节点（根节点不可删除） |
| `disableSchema` | `disable-schema` | `boolean` | `false` | 禁用 schema 展示词汇（label/help/required/choices/值装饰） |

### 区头/区尾与表单

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `header` | `header` | `string \| { title?: string, actions?: AutoStoreAction[] }` | —（默认值） | 区头配置；未声明用默认值（`<store.title>` 标题 + 重置/保存，均仅 edit 模式），置空/解析失败/内容全空不渲染 |
| `footer` | `footer` | `string \| AutoStoreAction[]` | —（不渲染） | 区尾动作数组；仅有值且过滤后非空时渲染 |
| `action` | `action` | `string` | `''` | 表单提交地址（受管 fetch 提交）；未声明时保存仅派发事件不提交 |
| `method` | `method` | `string` | `''`（按 GET） | 表单提交方式；缺省按 GET（FormData 折叠进 URL query） |

### 动作与图标

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `showActions` | `show-actions` | `'0' \| '1' \| '2'` | `'1'` | `schema.actions` 节点动作显隐：隐藏 / 悬停显示 / 常驻显示 |
| `iconUrl` | `icon-url` | `string` | `https://api.iconify.design/lucide.json?icons={names}` | 动态图标批量拉取 URL 模板，`{names}` 为逗号分隔的图标名；置空禁用拉取 |
| `iconModify` | `icon-modify` | `string` | `''` | 远程请求名的风格后缀（`rounded` / `sharp` / `outline` / `outline-rounded` / `outline-sharp`） |

### 外观

| 属性 | attribute | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `valueAlign` | `value-align` | `'left' \| 'right'` | `'left'` | 值的对齐方式 |
| `grid` | `grid` | `'0' \| '1' \| '2' \| '3'` | `'0'` | 网格线模式；非法值等效 `'0'` |
| `hideKeyBg` | `hide-key-bg` | `boolean` | `false` | 隐藏 key 列背景带（背景带默认显示） |
| `rootBg` | `root-bg` | `boolean` | `false` | 根级分组行常驻底色 |
| `dark` | `dark` | `boolean` | `false` | 强制暗色主题 |

> 布尔属性按 HTML 惯例书写：出现即为 `true`（如 `<autostore-viewer show-computed>`），需要置 `false` 时用 JS 赋属性或在框架中绑定。

### 事件

| 事件 | detail | 说明 |
| --- | --- | --- |
| `action` | `{ path: string \| undefined, value: any, action: AutoStoreAction }` | 点击动作时派发（节点动作与区头/区尾动作同通道）；`bubbles` + `composed`，`cancelable`（`preventDefault()` 可阻止 `onClick` 执行）。区头/区尾动作无节点，`path` / `value` 为 `undefined` |
| `submit-result` | `{ ok: boolean, status: number, response: Response \| null }` | 受管表单提交完成时派发（含失败）；`bubbles` + `composed`，通知性不可拦截 |
| `key-width-change` | `{ width: number \| null, manual: boolean }` | 拖拽标签区分界结束时派发（`width` 为手动列宽 px、`manual` 为 `true`）；双击手柄复位回自动测量时 `width` 为 `null`、`manual` 为 `false`。`bubbles` + `composed` |

```ts
viewer.addEventListener('action', (e) => {
    const { path, value, action } = e.detail
    console.log(path, value, action.label)
})
```

### 导出与类型

```ts
import { AutostoreViewer } from '@autostorejs/viewer'
import type { TreeNode, TreeNodeType, ConfigSection } from '@autostorejs/viewer'
```

同时组件已注册 `HTMLElementTagNameMap`，因此 `document.querySelector('autostore-viewer')` 在 TypeScript 中直接得到 `AutostoreViewer` 类型。
