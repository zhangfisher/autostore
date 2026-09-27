# viewer only-configurable：配置面板渲染与分组

viewer 至此渲染整棵 state 树。ADR-0032 已为「viewer 作为配置表单组件」铺路（全渲染常驻 DOM），本决策补上第一步实装形态：`only-configurable` 布尔属性启用后只渲染 store 的 **configurable 项**（数据双面：`store.configurabled` 路径集合 / `configManager.state` 的 key 带 configKey 前缀、value 为 schema 元数据），并在 `configManager.group` 有值时按组呈现。组聚合记录在 global ConfigManager 下是**跨 store 混合**的，viewer 绑定单 store——组清单取聚合记录全部、组内成员取本 store 命中项是刻意的可见性选择（跨 store 空组照渲染标题条）。

## 集合与嵌套（区别于 entrys 的两处）

- **嵌套非吞并**：configurabled 项间的父子关系保留为嵌套——`user` 与 `user.name` 均注册时，`user` 渲染容器行（显示其全部值结构，子级不论是否 configurable），`user.name` 不平铺顶层而是出现于其子级（data-path 恒绝对路径）。顶层集合 = 无 configurabled 祖先的项。这是 entrys 吞并机制的同构复用（防 data-path 重复致 updateTreeNode 残留陈旧副本），但**容器行渲染自身**而非隐式根——配置面板里一个对象配置项就是「一项设置」，吞并其行会丢失它的 label/group 归属。
- **entrys 取交集**：`only-configurable` + `entrys` 同时声明时渲染 configurabled ∩ entrys 子树内的项（entrys 从数据源降级为过滤器）。交集空是正常业务态（该区域无配置项）非配置错误：渲染空白树、无视觉提示；entrys 路径无效在此模式降级为 `console.warn`（仅 only-configurable 时；单独使用 entrys 保持 ADR-0029 严格无效态不变）。
- **空态静默**：无 configManager / 无配置项 / 交集空三种情况均渲染空白树，无视觉提示——仅「store 无 configManager」保留一条 console.warn（不可见调试通道）。
- watch 三路分流复用 `_entryPaths`（= 顶层 configurabled 容器项路径），但 `getNodeByPath` 须**模式感知不剥前缀**——容器行渲染自身，若沿用入口前缀剥离，容器项的编辑判定/常驻控件命中会落空。

## 分组结构（三层：默认区 → 真实组 → 高级虚拟组）

- **默认区**：无 group 声明的项置顶裸排（无标题条）。
- **真实组**：`configManager.group` 全部记录按 `order` 升序、缺省沉底按注册序；组内项恒注册序。组标题条 `title ?? name` + `icon`（走图标链）+ 项数徽章（show-count 门控），**横跨整行**——不参与两列网格/label 列宽测量/grid 垂直线（防长组名撑宽全树 label 列）。组内项缩进一级（depth 从 1 起）。
- **高级虚拟组**：置尾，收拢 `advanced:true` 的项。**advanced 优先于 group 声明**（声明了 group 的 advanced 项也被抽进虚拟组，group 在该项上失效）；默认折叠（组默认展开规则的唯一例外，呼应 form 侧 advanced 默认隐藏的精神——viewer 折叠是更温和的等价物）；空则整个不渲染（虚拟收纳区与真实组的性质不同，不与跨 store 空组强求一致）。与 form 的 advanced 同名分野：form 是**过滤隐藏**，viewer 是**折叠收纳**。
- **组可折叠**：组标题条点击折叠/展开整组；折叠态承载于独立 `Map<组名, boolean>`（组无 store 路径，不 TreeNode 化——组节点混入 getNodeByPath 的逐段 key 匹配会拦截命中），跨树重建自然保留。组折叠 DOM 策略遵循 render-mode（full = grid 0fr + inert、lazy = DOM 移除、mode=edit 恒 full）；组不参与 expandDepth 深度计数。
- `findLastVisible` 穿透组层（组折叠时最后可见行 = 该组标题条）；组标题条恒不画水平线。

## 动态性

- configManager.state **直接子键**的出现/消失（新配置项注册/注销）触发整树重建（配置项量级小，重建成本可忽略）；schema 内部字段与值变化不触发——值变化走主 store watch 增量链路，与键集合重建分层。
- cm-ready 轮询条件扩展：only-configurable 为 true 时无条件参与轮询（不依赖 disableSchema/mode）。
- `allow-delete` 照常生效；删除后值 undefined 的路径在重建时跳过渲染（不复活幽灵行）。show-computed 保持正交（computed 类型配置项默认滤掉）。

考虑过的替代方案：前缀聚合树（按公共前缀重建中间容器）——被否：中间容器非 configurable 的半生不熟状态使编辑判定/徽章/hint 语义变味，entrys 机制已趟平全部坑；组 TreeNode 化——被否：混入路径寻址体系防漏成本高；未分组项造虚拟「常规」组——被否：引入翻译/命名问题；entrys 互斥（only-configurable 优先忽略）——被否：两个过滤器的组合用户不可预测，交集语义单一可推导；高级项仅收拢无 group 项——被否：规则虽可预测但「声明 advanced 却不生效于有组项」同样难排查，用户选择了一律收纳的强语义；空态提示条——被否（用户决策）：静默空白；组清单由本 store 项反推（空组不渲染）——被否（用户决策）：跨 store 组可见性是明确诉求。
