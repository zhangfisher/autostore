# viewer 编辑模式：mode 三态与 edit 常驻的事件委托

viewer 原以布尔 `editable` 表达"可编辑/只读"两态。本决策引入 `mode` 属性（`view` / `edit` / `click-edit`，默认 `view`）并删除 `editable`：

- **view**：只读，无任何编辑入口。
- **click-edit**：即原有行为——双击值/点击编辑按钮进入编辑，单 Editable 状态机（即时生效、校验错误条、blur 退出、Enter 链式、编辑期树冻结回填）。
- **edit**：叶子成员**常驻**编辑控件；容器保持双击 JSON 整体编辑（常驻 textarea 会压垮树形布局，且容器整体编辑是低频操作）。

**edit 常驻的实现：根事件委托，零实例池**。曾考虑每节点一个 Editable 实例（状态机完整复用但池管理复杂）——被否。落地方式：常驻控件仍渲染 widget 模块的 toRender（模板零改动），但 ctx 注入 no-op 回调——真实写回经 DOM 事件冒泡到组件根的委托处理器：按行 `data-path` 定位节点 → `resolveEditorPlan` → per-kind 提取值（checkbox 双值档位/select 下标取原值/radio/文本）→ 校验 → 即时写 store。校验链（required/JSON 解析与类型/validate + errorMessage 插值）抽离为 `utils/value-io.ts` 纯函数，click-edit 状态机与委托处理器共用（DRY）。

配套语义：

- **blur 不退出**（常驻语义）；Enter = 焦点转移到树序下一个可编辑控件（textarea 的 Enter 为换行）。
- **常驻叶子的值类 operate 冻结树更新**（控件即真相，防委托写回重置光标）；结构类 insert/remove/delete 照常。
- per-path 错误 Map 驱动行下红色错误条（copy 与编辑按钮已随后续修订移除，见文末）。
- 模式切离 edit 清常驻错误并**回填冻结写入**：常驻编辑期间的值类写入冻结了树更新（watch 跳过防光标重置），切离时经 `_syncTreeValues` 自 store 统一回填收敛（`willUpdate` 渲染前处理，避免一帧陈旧渲染；不重建树以保留用户展开状态——`_buildNodes` 会按 expandDepth 重置展开）；切到 view 退出 click-edit 编辑状态。

## 追加决策：容器整体编辑的文本形态钩子（toInput/toState）与子项校验回溯（itemValidate）

**转换钩子**：容器 JSON 整体编辑（jsonMode）消费 core schema 既有词汇 `toInput`（状态值 → 编辑文本，textarea 初值，抛错回落 JSON 化）与 `toState`（编辑文本 → 状态值，替代 `JSON.parse`；校验预演与写回两处同步接入，抛错 message 优先显示）。toState 产物**跳过 JSON 路径的值类型比对**——类型把关交给 `validate` 链（如 IP 列表 split 后由数组校验把关）。仅 jsonMode 生效；叶子编辑不接（YAGNI）。

**子项校验回溯**：容器 `validate` 约束「整体值」，但实际编辑粒度常是「逐项」（展开数组后双击某项）——子项自身路径无 schema，整体校验被绕过。引入 core schema 新词汇 `itemValidate?: (item, index) => boolean`（容器声明逐项约束）；编辑链在**子项自身 schema 无 validate** 时经 `findItemRule` 沿祖先向上找第一个 `itemValidate`（父级起向上；祖先仅有整体 validate 不拦子项）。规则评估集中于 `computeValueError`（新增 `itemRule` 入参，errorMessage 复用容器声明），click-edit 状态机（start 快照 `editItemRule`）与 edit 常驻委托两路径同源接入。仅编辑校验链回溯——显示链（label/icon）仍按子项自身路径取 schema。

由 dns 字段（DNS 服务器 IP 列表）驱动：容器行编辑 = IP 列表文本（toInput join / toState split）+ 整体 validate；子项行编辑 = itemValidate 逐项 IPv4。

## 追加修订（2026-09-25）：移除 copy 与编辑按钮，click-edit 增长按入口

- **copy 功能整体移除**（复制按钮、`_copyNode`、`_writeClipboard` 删除）。**toast 机制整套保留**——`_showToast` 公开化为预留入口，供将来「已删除」等操作反馈；当前暂无内部消费者。
- **click-edit 的 node-tools 编辑按钮（铅笔）移除**。内置图标词汇表（`STROKE_ICONS` 的 copy/edit symbol）不受影响——词汇表是 `schema.icon` 免拉取引用的公开能力，与工具按钮分属两个层面。
- **click-edit 编辑入口 = 双击 + 按住 1s（press-and-hold）**：
  - 按住模型：`pointerdown`（根委托，与 input/change/keydown 同构）启动计时；document 级 `pointerup`（松开）/ `pointermove` 偏移超 6px（手抖容忍，亦覆盖移出行）取消；第二次 pointerdown 取消旧计时（双击接管）。停留模型（click 后指针停留触发）被否：点完值指针自然停留概率高，误触率高。
  - 适用**全部可编辑行**：叶子 → 值编辑，容器 → JSON 整体编辑；长按触发时置 flag 抑制松手引发的展开 click（触发早于 pointerup，时序天然成立；新按压开始时重置 flag 清残留）。
  - 边界：仅主键（button 0）；编辑控件内按住（拖选文本）不启动；计时到点再次确认模式未切走；**无等待期视觉反馈**（KISS）；1s 硬编码不加属性；仅 click-edit 模式（view 只读无编辑语义、edit 常驻无入口需求）。
- **连带修复**：node-tools 分隔线原画在 actions 与内置工具（copy/edit/delete）之间且只看 actions——copy/edit 移除后 `allowDelete=false` 时内置工具区为空、孤立分隔线悬空；条件收窄为「actions 存在且 delete 将渲染」。
