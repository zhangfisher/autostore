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
