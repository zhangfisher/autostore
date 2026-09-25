# viewer 节点动作：schema.actions 的渲染与 onClick 契约

节点 schema 声明 `actions`（core 既有词汇 `AutoStoreAction`，form 已消费）时，viewer 在 node-tools 内渲染动作按钮，渲染与交互逻辑独立于主文件（`src/actions.ts` 纯函数导出，主文件只补调用点与 dropdown 开合态 `Map<pathKey, boolean>`）。三形态全支持：**button**（默认）/ **image**（按 `--viewer-icon-size`）/ **dropdown**（自制轻量菜单，不引 UI 库——viewer 零依赖定位；`items` 的 `"-"` 渲染分割线，行内 `absolute` 右对齐，打开时挂一次性 document click 关闭，容器裁剪场景后续有诉求再升 fixed）。图标复用 ADR-0024 命中链（slot 自定义 > 内置 > icon-url 拉取，未命中回落 label 文字、拉取后重渲染补上）。

## onClick 契约（与 form 的三点分叉）

- **`value` = 节点当前状态值**（`node.value`），非 form 的 `getInputValue()`（输入控件当前值）——viewer 无输入中概念；亦非 toView 转换后的显示值。
- **`ctx.update(v)` 经 Proxy 写 store 该节点路径**：复用 viewer 既有写回通道，watch 自动刷新树。
- **悬停提示正名 `tooltip`**（`tips` 不消费）——form 以 tips 为正名，viewer 反向取舍；二者皆是 core 类型上的合法键。

菜单项（`items` 项）自身的 `onClick` 以该项为 `ctx.action` 触发（对齐 form）；`syncMenu: true` 选中后把该项 label/icon/tips 回写触发按钮显示（对齐 form）。onClick 执行抛错 `console.warn` 容错（对齐 toView 惯例）。

## 追加决策：'action' 自定义 DOM 事件（通知通道）

每次动作点击（含菜单项点击，无论有无 onClick）先派发 `action` CustomEvent 再执行 onClick：`bubbles + composed`（穿透 shadow，light DOM 直接 `addEventListener('action')` 可听）、`cancelable`（`preventDefault()` 拦截则 onClick 不执行——事件是更外层的钩子）；`detail = { path, value, action }`——`path` 为 `joinPath(node.path)` 点连接字符串（与行 `data-path` 同源；entrys 子树入口下含入口前缀即完整 store 路径，ADR-0029），`value` 为节点当前状态值（Proxy 引用原样，与 onClick 的 value 同源），`action` 为被点击动作对象（菜单项点击时为项本身，与 `ctx.action` 同构）。

## 显隐与门控

- **新组件属性 `show-actions` 三档显隐（`'0'` 隐藏 / `'1'` 悬停行时显示（默认，随 node-tools 的 hover 机制）/ `'2'` 常驻显示）是 actions 的唯一显隐控制**。`'0'` 干脆不渲染；`'2'` 经 `reflect` 属性 + `:host([show-actions='2'])` 选择器以子级 `visibility: visible` 覆盖 `.node-tools` 的 `visibility: hidden`（visibility 可被子元素覆盖，无需重排 DOM）；动作组包 `.node-actions` 容器作为覆盖目标。刻意与内置工具分叉：内置删除工具在 `isEditing` 时隐藏（copy/edit 已随 ADR-0027 修订移除），actions 编辑中照常显示——代价是编辑中 onClick 拿到的是尚未写回状态树的旧值（知情取舍，不改行为）。
- **不受 `disable-schema` 门控**：与 `schema.icon` 同待遇——actions 是节点上的功能性附着物（onClick 是用户声明的交互能力），门控只关「用 schema 值替换原样显示」类的展示词汇。
- **`enable`/`visible` 消费**（form 未消费，viewer 做完整实现）：`visible:false` 不渲染，`enable:false` 渲染但置灰 + 点击守卫；**菜单项同语义同逻辑复用**。
- **`checked`/`action.value` 不消费**（YAGNI，form 亦未消费）。

## 布局

`pos`（before/after）**静默忽略**——那是 form 输入框前后的布局概念，node-tools 只有行尾一个位置，按声明顺序渲染。顺序：**actions 在前、内置删除工具在后**，两组并存时中间加 1px 竖线分隔（数据声明的动作 vs 查看器内置工具；分隔线以「delete 将渲染」为条件，`allowDelete` 关闭时不悬空——copy/edit 移除后内置工具仅剩 delete，ADR-0027 修订）。空回落四档：icon+label → 图标按钮带 tooltip；仅 label → 小文字按钮（`.node-tool-text` 变体）；仅 icon → 纯图标；都无 → 跳过 + `console.warn`。容器节点（对象/数组）照常渲染（其 schema 同样可声明 actions）。
