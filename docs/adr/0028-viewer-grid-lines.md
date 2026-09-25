# viewer 网格线：grid 四档显示模式

viewer 引入 `grid` 属性（`'0' | '1' | '2' | '3'`，默认 `'0'`）为树提供可选网格线，全部经 `:host([grid=…])` 属性选择器纯 CSS 门控——非法值无选择器匹配，天然等效 `0`，零 JS 归一。

## 决策一：档位语义

- **grid=0**：无网格线（缺省，向后兼容）。
- **grid=1**：仅水平线。
- **grid=2**：仅 key/value 间一条垂直分隔线。
- **grid=3**：水平+垂直同时显示（表格全网格）。

初版仅 0/1/2 三档（当时无组合需求，YAGNI）；`grid=3` 为后续增补——添加枚举值是非破坏性变更，恰好验证了当初留口的判断。

## 决策二：水平线仅全局末行无线

行（`.tree-node`）与子树容器（`.node-children`）是**兄弟交错**结构，纯 CSS `:last-child` 无法判定末行（每行后面跟着自己的 node-children 兄弟）。故由渲染期标注：`render()` 入口经 `_findLastVisible` 沿末项的展开链下钻（折叠或叶子即止）求全局最后可见行，`_renderNode` 内以引用相等判定并加 `last-row` 类，CSS `:host([grid='1']) .tree-node:not(.last-row)` 画 `border-bottom`。

> 初版为「每容器末项」规则（顶层组与每个展开容器的最后数据行无线，分组表格视觉）——实施后修订：展开容器的末项之后仍跟随子树行，组内无线造成视觉断档；改为仅**整棵树最后可见行**无线（含子节点的末项照画底线）。

## 决策三：垂直线锚定子级行 + 纯 CSS calc

现状事实：缩进经行内 `--row-depth` 变量在 `.node-content` 上产生（`padding-left: calc(depth × (indent-size - 8px))`）——行恒满宽（hover 整行高亮），一级子行内容起点 = 顶层行起点 + `--viewer-indent-size`（20px）。此前历经两版：初版行级 `padding-left: 20px`（无递归）、二版容器自身缩进（递归但深层行 hover 不满宽），终版为行满宽 + 内容缩进。垂直线锚定**一级子行**（树中占多数）；深层行 value 左缘逐层右移（每层 +12px），与线的偏差逐层扩大——接受此偏差（线是 underlay 装饰，不穿过文字区）。

定位不采用 JS 测量（曾议：渲染后读首行 `node-value.getBoundingClientRect().left`——需挂接列宽测量时序并在 `maxKeyWidth`/数据变化时重测），而用 `calc` 直接拼出线位（`20px 缩进 + 展开图标 + 4 + 类型图标 + 6 + var(--viewer-key-width) - 2`——线画在 label 右缘左 2px 处，与 value 文本保持 8px 间距），随列宽 CSS 变量自动更新，零测量零时序。测量经 rAF 于首次 paint 前完成，无初始闪现。代价：calc 中的布局常量与 `.tree-node`/`.node-label` 样式联动（样式处已加注释互指）。

> **决策三修订（value 全局对齐，2026-09-25）**：上段「深层行 value 左缘逐层右移、接受偏差」被推翻——需求变更为**所有 node-value 全局对齐**。缩进几何演进第四版：`.node-label` 宽度随深度反向补偿（`width: calc(var(--viewer-key-width) - var(--row-depth) × (indent-size - 8px))`），「缩进 + 标签」总宽恒定 = 全局列宽，value/edit 控件起点不随行深漂移；列宽测量需求同步按「缩进 + 标签」总宽计（`_measureLabelWidth` 收集 depth、累加 depth×步进），最深行不截断。垂直线 calc 锚定随之修正为**恒定 value 起点**（行 padding 8 + 图标们 + 列宽 + 标签右间距 6 − 1em），与各行 value 一致对齐，不再锚定「一级子行」近似。未测量时 `--viewer-key-width` 未定义，calc 声明 IACVE 回落前一条 `width: auto`。right 模式的高特异性覆盖声明不变。

## 决策四：伪元素 underlay，不覆盖内容

垂直线载体为 `.tree-container::before`（不加真实 DOM）：`top:0; left:0; height:100%`，宽度铺至 value 左缘，`border-right` 画线。`.tree-container` 建立 `position:relative; z-index:0` 层叠上下文，伪元素 `z-index:-1`——线画在行内容（文字/控件/hover 高亮）之下，永不遮挡。

## 决策五：与 value-align 正交，right 模式无垂直线

`grid` 与 `value-align` 无联动分支。`value-align=right` 模式不测量列宽（`--viewer-key-width` 缺失），垂直线不适用——grilling 共识原表述为「calc 失效 → 线自然不可见」，实施发现技术偏差：`width` 声明失效后绝对定位伪元素 shrink-to-fit，`border-right` 仍会残留 1px 贴左显示。故修正为选择器显式排除 `:host([grid='2']:not([value-align='right']))`——仍是零 JS 分支，视觉结果与共识一致（right 模式无垂直线，水平线不受影响）。

## 决策六：grid-band key 列背景带

布尔属性 `grid-band` 启用后 key 列区域呈淡底高亮带（`background-color: var(--viewer-grid-band-bg)`，默认 `color-mix(in srgb, var(--viewer-hover-bg) 90%, transparent)`）。约束：

- **与垂直线解耦**：背景带在**任意 grid 值**（含 0/1 无垂直线）下均显示——初版把背景挂在垂直线伪元素上（仅 grid=2/3 有载体），后按需求重构为三规则各司其职：载体几何（grid-band 或 grid=2/3 任一启用即渲染 underlay 伪元素）、背景（仅 grid-band）、右缘描边（仅 grid=2/3），条件组合天然正交。
- **变量化**：底色经 `--viewer-grid-band-bg` 暴露，暗色模式 `--viewer-hover-bg` 被覆盖时 color-mix 结果自动跟随，无需暗色分支。
- Boolean 属性走 CSS attr 门控（`:host([grid-band])`），故 `reflect: true`（JS 属性赋值须同步到 attribute 才能驱动样式）。

## 决策七：root-bg 根级分组背景

布尔属性 `root-bg` 启用后，顶层含子节点的行（`.root-group`，渲染期按 `path.length === 1 && children.length > 0` 标注）常驻底色 `var(--viewer-root-bg)`（默认 `color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent)`），区分根级分组行与数据行。约束：

- 判据取「真有子节点」（`children.length > 0`），空对象/空数组容器不高亮；仅根级生效，深层容器行不高亮（避免整树条纹化）。
- 规则写 `:not(:hover)`：本规则特异性（`:host([root-bg]) .tree-node.root-group:not(:hover)` = 类×3）高于 `.tree-node:hover`（类×2），不排除会让根行失去 hover 反馈。
- 底色变量化 `--viewer-root-bg`，暗色模式经 hover-bg 覆盖自动跟随；`reflect: true` 同决策六。
