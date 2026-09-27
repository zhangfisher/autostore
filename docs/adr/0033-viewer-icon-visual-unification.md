# viewer 图标视觉统一：默认源换 lucide、拉取链线宽重写、小尺寸视觉补偿

查看器三类图标（节点前置、展开/折叠 chevron、action 含 dropdown caret）的渲染机制此前已统一于 sprite（`builtin-icons.ts` 的 symbol+use+`iconHtml`），但视觉不统一：默认拉取源 material-symbols-light 是**填充型**设计，与内置 stroke 线型系（sw 1.5）同屏混排画风两路；小尺寸位（caret 10×10、菜单项图标 14×14）渲染 24 viewBox 等比缩放，线宽漂移至 0.625/0.875px。决定：默认 `icon-url` 换 `lucide`（属性仍可覆写）；拉取的线型图标注册时注入内置同款公共属性并**删除 body 内联 `stroke-width`**（iconify 的 lucide body 自带 sw 2，元素属性压过 symbol 级注入，不动 body 无从统一）；caret 改用专用粗线变体（张角略放大、sw 2.5~3，视觉补偿而非绝对线宽一致）；菜单项图标尺寸 14→16px 并接受剩余轻微变细。

## Considered Options

- **保持 material-symbols-light 仅文档标注差异**：填充型与内置线型结构性不搭，标注消除不了同屏混排——弃。
- **CSS / `vector-effect` 解线宽**：跨 `<use>` shadow 边界选不中内容，CSS 继承压不过元素自身表现属性；`vector-effect="non-scaling-stroke"` 是恒定屏幕线宽=绝对一致口径，10px caret 处笔画占比过高——弃。
- **内置升 sw 2 对齐 lucide 默认**：推翻 sprite 定案刚统一并验证过的全表 1.5——弃。
- **全属性接管（删光 body 风格属性、symbol 按系别注入全套）**：填充型被误判线型会隐形；iconify 主流线型集 linecap/linejoin 本与内置一致，唯一需动的只有 stroke-width——弃，最小重写胜。
- **slot 自定义同样重写**：损毁用户手写 symbol 的意图（彩色图标/异构 viewBox），自定义=表达自由自担风格——弃。
- **绝对线宽一致（任意尺寸恒 1.5 屏幕像素）**：10px 容器需 sw≈3.6、笔画占比 15%，chevron 张角处糊成一团——弃，采视觉补偿（专用变体，目测校准，不写像素断言）。

## Consequences

- 默认图标画风变化是行为变更：changeset **minor**，文案明示「需原画风请显式配置 icon-url」；显式覆写源拉回填充型者自担风格差（不重写）。
- **别名展开是换源的必要配套**（实施中发现，反转 ADR-0024 的「aliases 忽略」决策）：lucide 常用名多为别名（`home` → `house`），响应 `icons` 里只有本体——别名不展开则请求名与注册名对不上，恒负缓存。仅解析一层，别名条目可覆盖 body/尺寸。
- 预留图标 `copy/no/yes/edit` **保留**在 `BUILTIN_ICON_KEYS` 基线（本地秒出，不触发远程请求）。
- 孤立资产 `public/icons.svg`（全仓零引用、硬编码色、sw 1.35 与全表不一致）删除。
- 验收：CDP 真时间断言（examples/verify-icons.html + cdp-run.ts）15 项全过——拉取 symbol 属性注入/内联剥离、填充系不重写、chevron-sm 变体、caret 引用、菜单项 16px、use 壳渲染非零；目测口径，不做像素级断言。
- 术语「图标注册链」的「同权」由机制同权强化为**视觉同权**（拉取链），见根 CONTEXT.md。
