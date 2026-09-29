# viewer header/footer：区头区尾、动作外置渲染与 form 包裹

viewer 此前是纯内容组件：整树渲染、`:host` 自身滚动、无表单语义。本决策补上「可提交配置表单壳」的收尾形态：新增**区头/区尾**（header/footer 修饰区），整个组件由原生 `<form>` 包裹（`action`/`method` 属性透传），默认区头携带标题与「重置/保存」按钮。区头**未声明即渲染默认值**是有意的视觉破坏性变更——所有现存嵌入场景会长出一条区头（demo 统一接受新形态），这是「开箱即表单化」意图的一部分；显式置空（`header=""`）退回无区头。

## 属性与解析

- `header = { title?: string, actions?: AutoStoreAction[] }`；`footer = AutoStoreAction[]`。attribute 字符串经 `relaxedToJson` + `JSON.parse` 解析；property 形态直接接受对象（JS 用法免解析）。解析失败 `console.warn` + 该区不渲染（对齐 viewer 既有容错风格）。
- **有值才渲染**：显式置空、解析失败、内容全空（`{}` / `[]`）一律不渲染该区——内容全空视同无值，空条无视觉表达力。footer 未声明恒不渲染。
- title 省略不渲染标题（actions 照常）；actions 走 `filterVisibleActions`（`visible:false` 隐藏）。

## 默认区头与 Store 占位符

- 默认值 `{ title: '<store.title>', actions: [重置, 保存] }`，两按钮均 `mode:'edit'`（仅在编辑模式显示，见下「action.mode」）。
- **Store 占位符**：字符串中 `<store.<prop>>` 形式在渲染时求值 store 实例公开属性（`title`/`id` 等 getter），`/<store\.(\w+)>/g` 全局替换、未命中属性替换为空串。不做表达式、不做状态路径求值（拖入依赖追踪，违反 YAGNI）；渲染函数内即时求值，不建响应依赖。
- **默认按钮 = 预置内置 onClick 的普通 action 对象**，不引入第二套触发通道：点击先派发 cancelable `action` 事件（`preventDefault` 即拦截内置行为、监听方全权接管），未拦截则执行内置——重置 → `store.reset()`；保存 → 声明了 `action` 属性则 `form.requestSubmit()`，否则仅派发事件 + warn。用户自定义 `onClick` 存在即替换内置行为。默认按钮无 icon，走文字按钮样式。
- 非 resetable store：重置按钮照常渲染但禁用（`enable=false` 同款视觉）+ title 提示「store 未启用 resetable」——不隐藏（store 异步绑定，隐藏会造成按钮出现/消失抖动），失败原因写在 tooltip 里可发现。

## 动作复用（无节点契约）

区头区尾动作与节点 `schema.actions` 共用同一渲染函数（ADR-0030 纯渲染函数 + ActionsHost），但**没有节点**：`onClick(value, ctx)` 的 `value=undefined`、`ctx.update=noop`；`action` 事件 detail 为 `{path:undefined, value:undefined, action}`。dropdown 开合键用 `header#N` / `footer#N`（节点是 `路径#N`）。图标链、三形态（button/dropdown/image）、tooltip、enable 语义零改动复用。

## action.mode：模式显隐门控

`AutoStoreAction` 新增 `mode` 字段：逗号分隔的 viewer 模式子集（`view` / `click-edit` / `edit`），空/未声明 = 全模式显示，未命中当前模式即不渲染。**通用机制**：节点 actions、区头、区尾一视同仁（`filterVisibleActions` 增加 mode 参数，与 `visible:false` 同层过滤）——同一类型字段两处语义分叉是埋雷。与 `enable` 分野：mode 管显隐、enable 管可点。

## action.align：侧别归属

`align: 'left' | 'right'` 声明动作归左/右侧：**按侧分组、组内保持声明序**，左组在前、右组以 `margin-left:auto` 推远。默认侧随容器——区头默认 right（标题左、动作右）、区尾默认 left（用户决策）。**节点 actions 忽略 align**（与 pos 同待遇，静默忽略）——节点工具区单一位置无对齐概念。

## form 包裹与受管提交（提交管理系对初版决策的修订）

- shadow 内原生 `<form>` 包裹整个组件（区头 + 内容区 + 区尾），viewer 新增 `action`/`method` 属性透传（未声明时省略属性——置空字符串会因 form.action 规范默认回退当前页 URL）。
- **受管提交**（修订原「不拦截 submit、真·原生导航提交」：原生导航后页面跳走，提交中遮罩与成败 toast 物理上无从展示，本组需求以受管为前提）：submit 恒 `preventDefault`，fetch 承接——`fetch(action, {method, body: FormData})`；method 缺省按 GET（对齐表单规范默认），GET 时 FormData 折叠进 URL query（fetch 禁止 GET 携带 body）。保存按钮 `requestSubmit()` 与编辑态 Enter 隐式提交汇入同一 submit 入口；未声明 `action` 仅 warn 不提交（含隐式提交旁路）。
- **提交前校验 = edit 常驻行内错误表唯一判定**（非法值滞留控件未进 store 的现成登记；与编辑写回同一校验链，是 viewer 的校验真相）；失败 toast「表单校验未通过，请检查标红项」，不遮罩。**form 恒 `novalidate`**：原生约束校验整体退出——viewer 控件的约束多为浏览器隐式缺省而非 schema 声明（真实踩坑：number 输入浏览器默认 `step=1`，小数值 lat=30.5 被 `stepMismatch` 判非法，`requestSubmit()` 交互校验对 inert 折叠子树中不可聚焦的控件报「not focusable」且 submit 不派发，保存无响应死局）；`reportValidity()` 同理静默失败，不采用。配套修复：number 输入缺省 `step="any"`（schema 显式声明 step 优先——声明的是真语义）。
- **全局遮罩**：校验通过后覆盖整个组件（含区头/区尾），半透明底（viewer-bg 60% 混合）+ spinner「正在提交...」，拦截指针交互天然防重复提交；fetch 返回即撤。
- **结果反馈**：`response.ok`（2xx）toast「提交成功」，否则「提交失败」（附状态码/网络异常）；同时派发 **`submit-result`** 事件（`detail={ok, status, response}`，bubbles+composed，通知性不可拦截）——外部据此接管后续（跳转/更新重置基线）。文案暂硬编码（对齐组件内既有中文文案惯例）。
- 动作按钮以既有 node-tool 文字/图标样式渲染（span，非 `<button>` 元素）——无默认提交语义可言，保存由内置 onClick 程序化 `requestSubmit()` 触发，无误触提交问题。
- view 模式无任何 input、FormData 为空是有意接受：保存语义此时由 `action` 事件监听方接管（编辑模式控件已带原生 name，FormData 天然可收集）。
- `only-configurable` 配置面板模式照常渲染区头区尾——配置面板正是重置/保存的主场景（ADR-0032/0034 铺路的终点）。

## slot 替换

`slot="header"` / `slot="footer"` 有分发内容即渲染容器（DOM 存在性即信号，优先于属性值）；`slot="title"` 仅替换标题区（仅在区头渲染时生效）。

## 布局

根布局 flex 列：区头/区尾 `flex-shrink:0`，内容区 `flex:1`——滚动条自 `:host`（styles.ts `overflow: hidden auto`）迁入内容区，区头区尾钉在视口。**滚动须置于内容区内层的 `.tree-scroll` 包裹层，而非 `.tree-container` 本身**：key 背景带（`.tree-container::before`）与列宽拖拽手柄（`.key-resizer`，ADR-0036）均绝对定位锚定 `.tree-container`，若它成为滚动容器二者会随内容滚走——锚定不滚动的包含块（首版实施踩坑后的修订）。区头/区尾**自带背景色**（默认 `color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent)`，与 `--viewer-root-bg` 同源——接入既有背景带视觉语言，亮暗主题自动跟随），新增 `--viewer-header-bg` / `--viewer-footer-bg` 变量可覆写；与内容区交界处 1px 分割线（header 下缘 `border-bottom`、footer 上缘 `border-top`，`--viewer-border`）——「钉住的工具条」悬浮感需要背景衬托。

## 考虑过的替代方案

- header 未声明不渲染、以 `header="default"` 显式开启——被否（用户决策）：「默认值」的字面义 + 开箱即表单化是意图本身。
- 非 resetable 时隐藏重置按钮——被否：store 异步绑定下按钮出现/消失抖动。
- 保存恒 `requestSubmit()`（含无 action 声明）——被否：无 action 的原生提交 = 刷新当前页，安全默认优先。
- 区头区尾动作另设触发通道（不走 `action` 事件/onClick 契约）——被否：契约同形是复用渲染函数的前提。
- 占位符做状态路径/表达式求值——被否：拖入依赖追踪与表达式引擎，YAGNI。
- `mode` 仅区头区尾消费、节点 actions 忽略——被否：类型字段语义分叉难排查。
- footer 默认右对齐——被否（用户决策）：默认左对齐 + `align` 按需归右。
- 受管/原生双提交模式（`submit-mode` 属性切换）——被否：遮罩/toast 的前提是受管提交，双模式是多余概念（YAGNI）。
- 校验仅靠 `reportValidity()`——被否：控件约束多为浏览器隐式缺省（number 默认 step=1 判非法小数）而非 schema 声明，恒假阳；且 inert 折叠子树控件不可聚焦，reportValidity 静默失败——「校验未通过」却无处查看的死局。行内错误表才是非法值滞留的现成登记与校验真相。
