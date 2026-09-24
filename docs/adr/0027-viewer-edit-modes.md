# viewer 编辑模式：mode 三态与 edit 常驻的事件委托

viewer 原以布尔 `editable` 表达"可编辑/只读"两态。本决策引入 `mode` 属性（`view` / `edit` / `click-edit`，默认 `view`）并删除 `editable`：

- **view**：只读，无任何编辑入口。
- **click-edit**：即原有行为——双击值/点击编辑按钮进入编辑，单 Editable 状态机（即时生效、校验错误条、blur 退出、Enter 链式、编辑期树冻结回填）。
- **edit**：叶子成员**常驻**编辑控件；容器保持双击 JSON 整体编辑（常驻 textarea 会压垮树形布局，且容器整体编辑是低频操作）。

**edit 常驻的实现：根事件委托，零实例池**。曾考虑每节点一个 Editable 实例（状态机完整复用但池管理复杂）——被否。落地方式：常驻控件仍渲染 widget 模块的 toRender（模板零改动），但 ctx 注入 no-op 回调——真实写回经 DOM 事件冒泡到组件根的委托处理器：按行 `data-path` 定位节点 → `resolveEditorPlan` → per-kind 提取值（checkbox 双值档位/select 下标取原值/radio/文本）→ 校验 → 即时写 store。校验链（required/JSON 解析与类型/validate + errorMessage 插值）抽离为 `utils/value-io.ts` 纯函数，click-edit 状态机与委托处理器共用（DRY）。

配套语义：

- **blur 不退出**（常驻语义）；Enter = 焦点转移到树序下一个可编辑控件（textarea 的 Enter 为换行）。
- **常驻叶子的值类 operate 冻结树更新**（控件即真相，防委托写回重置光标）；结构类 insert/remove/delete 照常。
- per-path 错误 Map 驱动行下红色错误条；node-tools 的「编辑」按钮在 edit 模式隐藏，copy/delete 照常。
- 模式切离 edit 清常驻错误；切到 view 退出 click-edit 编辑状态。

## 追加决策：容器整体编辑的文本形态钩子（toInput/toState）与子项校验回溯（itemValidate）

**转换钩子**：容器 JSON 整体编辑（jsonMode）消费 core schema 既有词汇 `toInput`（状态值 → 编辑文本，textarea 初值，抛错回落 JSON 化）与 `toState`（编辑文本 → 状态值，替代 `JSON.parse`；校验预演与写回两处同步接入，抛错 message 优先显示）。toState 产物**跳过 JSON 路径的值类型比对**——类型把关交给 `validate` 链（如 IP 列表 split 后由数组校验把关）。仅 jsonMode 生效；叶子编辑不接（YAGNI）。

**子项校验回溯**：容器 `validate` 约束「整体值」，但实际编辑粒度常是「逐项」（展开数组后双击某项）——子项自身路径无 schema，整体校验被绕过。引入 core schema 新词汇 `itemValidate?: (item, index) => boolean`（容器声明逐项约束）；编辑链在**子项自身 schema 无 validate** 时经 `findItemRule` 沿祖先向上找第一个 `itemValidate`（父级起向上；祖先仅有整体 validate 不拦子项）。规则评估集中于 `computeValueError`（新增 `itemRule` 入参，errorMessage 复用容器声明），click-edit 状态机（start 快照 `editItemRule`）与 edit 常驻委托两路径同源接入。仅编辑校验链回溯——显示链（label/icon）仍按子项自身路径取 schema。

由 dns 字段（DNS 服务器 IP 列表）驱动：容器行编辑 = IP 列表文本（toInput join / toState split）+ 整体 validate；子项行编辑 = itemValidate 逐项 IPv4。
