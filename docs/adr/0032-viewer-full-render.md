# viewer 全渲染：折叠子树常驻 DOM 与 render-mode 开关

viewer 现行为是「展开渲染、折叠自 DOM 移除」（`_renderNode` 条件模板 `node.expanded ? html : nothing`）。折叠销毁编辑控件造成两个数据-视图不一致缺陷：click-edit 折叠重展开回显**进入编辑时的旧快照**（实时输入仅存在于已销毁的 DOM）；edit 常驻折叠重展开回显**编辑前的旧值**（根委托已把新值即时写入 store，但树被冻结不回填，`autostore-viewer.ts` watch 回调对编辑叶子直接 return）——且焦点永不恢复（聚焦仅在路径变化时触发）。本决策反转为**全渲染默认**：全部节点常驻 DOM，折叠仅收起（grid 行高动画 + `inert` 封锁）；旧策略降为优化开关。根动机：**为表单提交铺路**——viewer 将作为配置表单组件使用，提交收集需要全部字段控件常驻 DOM；顺带消灭上述两缺陷。

## 开关设计

- attribute `render-mode`，取值 `full`（默认）| `lazy`；TS property 为 `renderMode`。`render` 是 Lit 组件的渲染入口方法名，属性占用即覆盖崩溃——attribute 亦取 kebab-case 全拼，与 `expand-depth`/`value-align`/`disable-schema` 惯例一致。
- **运行时可切换**，纯属性驱动，切换即生效于下一次渲染。不设切换前保护事件：自动提交/自动回滚都是组件越权改写 store，cancelable 事件是为罕见场景加机制（YAGNI）。
- **无大树防护**：不做节点数阈值自动降级（静默改写用户声明的行为比慢更危险——两模式行为分叉巨大），文档警告即可。依据：配置表单场景树规模可控。
- 迁移不对称：lazy→full 无损（补渲染全部折叠子树）；full→lazy 有损（折叠子树自 DOM 移除，未提交编辑丢弃，并入下述契约）。

### mode=edit 强制 full

`mode=edit` 时 render-mode 恒为 full（edit+lazy 是被禁止的状态组合——它正是「折叠销毁编辑器→重展开显示旧值」的现成配方）：显式声明 `render-mode="lazy"` 被忽略 + `console.warn`；**edit 期间的 late 声明仍更新声明值**（属性系统「设置即声明」的最小惊讶原则，警告提示当前无效），切回 view/click-edit 即按字面生效。实现上声明值与生效值分离（内部维护 effective 值）。click-edit **不在强制范围**：其编辑是瞬时单点形态，可配 lazy，编辑中折叠丢弃输入按 lazy 通用契约处理。

## 折叠形态：grid 行高动画 + inert 封锁

- `.node-children` 容器 `display: grid; grid-template-rows: 1fr ↔ 0fr` 过渡 + 内层 `overflow: hidden`——高度真实线性、无魔数。弃 `display: none`（不可过渡，与动画需求冲突）；弃 `max-height`（展开态魔数、速度失真——`styles.ts` 那条从未启用的 `.node-children.collapsed { max-height: 0 !important; }` 死规则即此思路的遗迹，随本决策删除）。
- 折叠容器随态加 `inert`：**折叠瞬间生效、展开动画开始即解除**——封锁焦点/指针/可访问性树。这是 grid 方案相对 display:none 唯一的行为缺口（grid 0fr 的内容仍在渲染树，Tab 焦点可走入不可见子树；编辑场景下焦点/输入落入不可见字段是真实风险），`inert` 一个属性补齐，随 class 切换同步零维护成本。
- 动画配置走 CSS 变量：`--viewer-collapse-duration`（默认 200ms，**设 0 即关闭**）与缓动变量（命名对齐既有 `--viewer-key-width`）；`prefers-reduced-motion` 内时长归零（无障碍必做）。不设 boolean 属性——动画开关是样式偏好而非行为语义，属性面板已 17 项 @property。
- **动画范围天然自界**：仅 class 切换（用户 toggleExpand）产生动画；`buildTree()` 整树重建产出全新 DOM、无前值，天然不动画——expand-depth/entrys 变更不会触发整树动画乱飞，无需动画来源区分机制。
- `render-mode="lazy"` 下无动画（DOM 直接移除），入契约。

## 行为契约（两模式分叉写入文档）

- **full**（默认）：折叠保留编辑中输入/焦点/控件状态。实施验证补充（CDP 实测）：click-edit 编辑中折叠父节点时，inert 引起的焦点逃逸**不派发 focusout**，编辑会话不退出——编辑器随折叠完整保留（含输入值与 DOM 身份），重展开继续编辑；edit 常驻同理（控件 DOM 身份与输入值均保留）。成本契约：接受任何状态变更触发整组件 `render()` 的线性 diff 开销——viewer 对 store 是**组件级单点订阅**（仅一个 `watch('*')`，节点/widget 零订阅），不存在订阅放大；真实成本 = `render()` 递归模板生成 + Lit diff 随总节点数线性增长，与变更频率相乘。大树 + 高频写入场景应由用户自行选 lazy。
- **lazy**（优化开关）：维持现状——展开渲染、折叠自 DOM 移除；**折叠与 full→lazy 切换均丢弃未提交编辑**。这是 lazy 的固有语义而非可修复缺陷，作为契约披露。
- expand-depth 语义澄清：只控制初始展开状态，不再影响渲染范围（full 下挂载即渲染全部节点，含折叠的）。默认值随本决策自 3 收敛为 **2**——full 下 10 级树也默认仅展开 2 级（DOM 恒全量，深度只影响视觉首屏）；统一默认而非按模式分权（分权需"未声明"哨兵与字段改名破坏 property API，且 lazy 未声明时初始渲染更少对其性能诉求是加分，需要更深时显式声明即可）。

## 已知限制与范围切分

- `buildTree()` 整树重建丢展开态**维持现状**（三处触发：entrys 属性变更、入口祖先路径 store 变更、expand-depth 变更；按 expand-depth 重置是确定性优先的可辩护行为）。全渲染下丢失的感知成本升高（全部常驻 DOM 按新展开态重排），仍不修——重建前后 path 可能失配（入口祖先变更正是子树被替换场景），按 key 回填展开态是新的设计分支；配置表单场景触发面窄。
- 本次范围仅渲染机制反转 + 开关 + 契约；**表单提交接口（getValues/submit 事件/校验联动）留后续独立 ADR**——提交接口的形态（从 DOM 收集 vs 从 store 收集、脏检查、校验钩子）是独立设计空间，全渲染本身即完成「铺路」的全部工作。

考虑过的替代方案：`display: none` 折叠——被否：不可过渡；`max-height` 动画——被否：魔数与速度失真；JS 读 scrollHeight 精确动画——被否：transitionend 竞态与 Lit 声明式更新模型纠缠；布尔开关（`lazyRender`）——被否：默认值反直觉，枚举自文档；attribute 短名 `render`——被否：Lit render() 保留方法名冲突；大树阈值自动降级——被否：静默改写声明行为；lazy 折叠时暂停订阅——被否：本就是单点订阅无从暂停，暂停「展开态同步」反而引入新问题域；切换前保护事件——被否：越权 + YAGNI；运行时切换冻结（静态选项）——被否：用户明确需要响应式切换。
