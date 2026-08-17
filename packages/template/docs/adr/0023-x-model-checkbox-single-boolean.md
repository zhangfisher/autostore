# ADR-0023：x-model 支持 checkbox（单值布尔）

- **状态**：Accepted
- **日期**：2026-08-17
- **关联**：[ADR-0018](0018-x-model-two-way-binding.md)（阶段1 text-like）、[ADR-0020](0020-x-model-schema-auto-injection.md)（元数据自动注入）、[CONTEXT.md](../../CONTEXT.md)

## 背景

ADR-0018 落了 `x-model` 阶段1（text-like 双向绑定），并把 checkbox/radio/select 整类推迟，理由是它们的「双向」是独立的收集语义、会让首版指令主干分叉。经一轮 grill，原拟一次性吃掉 checkbox/radio/select 全谱（含 `choices` 选项统一、组收集、容器自动生成、choices 响应式重生成），但范围收敛后决定：**本期只实现 checkbox 单值布尔绑定**，radio / select / 组收集 / `choices` 选项统一全部推迟到后续 ADR。

理由：checkbox 单值只需一个布尔值（`el.checked` ↔ state），无 options / label / 数组收集负担，是三种控件里最小、最独立、最能立即复用的子集；radio/select 的「选项来源」「组收集」「单值 vs 数组判定」引入的元数据驱动复杂度不属本期必交付。

## 决策

### 1. 架构：单指令 + 控件类别分派（沿用 ADR-0018 主线）

扩展现有 `ModelDirective`（不拆指令）。引入内部 `ControlKind`（text / checkbox / radio / select）映射「读源 / 写目标 / 事件 / 模式」，本期仅落地 `checkbox` 分支。`writeToDom` / `_handleInput` 按 kind 分派：checkbox 走 `el.checked`，text-like 走 `el.value`。get/set、修饰符、防循环（`_selfWriting`）、ADR-0020 元数据注入机制全部复用，主干不分叉。

### 2. checkbox 读写语义：纯布尔（推荐 A，否决 Vue 式值匹配）

- **读方向**（state→DOM）：`el.checked = Boolean(state)`。非布尔 state 经 `Boolean()` 宽容 coerce。
- **写方向**（DOM→state）：`state = el.checked`（恒写布尔）。checkbox 的 `value` 属性**不参与绑定**，仅作表单提交值。
- 否决选项（C）Vue 式「`checked = (state === el.value)`」真值匹配：引入值匹配语义、超出「一个 bool 值」初衷，本期不做。
- 否决选项（B）严格布尔（非布尔 warn 不绑）：字段类型不对就静默不工作，体验偏硬，不取。

### 3. 默认事件：checkbox → `change`

沿用 ADR-0018 决策框架：text-like 维持默认 `input`（实时）；checkbox/radio/select 默认 `change`（值已确定才写回）。`.change` 修饰符对 checkbox 冗余但无害。

### 4. 冲突规则：控件感知

`created()` 的冲突判据由「查 `:value`」改为按 `ControlKind` 判：
- text-like / `<select>`：`:value` / `x-bind:value` 同元素 → 编译期报错（竞写 `el.value`）；
- `<input type=checkbox>` / `<input type=radio>`：冲突目标改为 `:checked` / `x-bind:checked`（竞写 `el.checked`）；`:value` **放行**（设选项值，必需）。

确定性优先、报错不猜赢家，与 ADR-0018 决策 7 同哲学。

### 5. 元数据自动注入白名单：按控件类别裁剪

ADR-0020 的 `COMMON_INJECT_ATTRS` 对 checkbox 部分无意义。checkbox 取 `{title, required, enable}`（enable→disabled 反向映射），**剔除** `placeholder` / `pattern` / `minlength` / `maxlength` / `readonly`（文本约束，checkbox 不适用）。数值 `min/max/step` 仍仅 numeric input 注入。

### 6. get/set 与修饰符：控制无关复用 + 管道按控件分派

- get/set 机制原样复用，其「逻辑值」随控件变化（checkbox = 布尔）；DOM 读写的 `checked`/`value` 在 `_handleInput`/`writeToDom` 底层分派，不侵入 get/set。
- 修饰符管道按控件分派：`.trim` / `.number` 仅对读 `el.value` 的控件生效；checkbox 逻辑值=布尔故空转；`.change` 对选择类冗余但无害。

### 7. 防循环：单实例沿用 `_selfWriting`

checkbox 单值场景下，`el.checked =` 不冒泡 `change`/`input`，无栈溢出；写入置 `_selfWriting=true`、随之而来的 read 回调识别并跳过自身回写（同 ADR-0018 决策 4）。无组级协调需求。

## 推迟项（明确划界，避免后续误判为遗漏）

以下**不在本期**，留待后续 ADR，且本期**不**做相关 schema 变更：
- **radio / select 双向绑定**（含 select `<option>` 自动生成）；
- **组收集**（checkbox 组数组 toggle、select 多值收集、radio 标量选择）——无容器自动生成、无数组 toggle；
- **`choices` 选项统一**：原拟把 `AutoWidgetSelect.select` 重命名为 `choices` 并给 `AutoWidgetRadio`/`AutoWidgetCheckbox` 加 `choices: {label,value}[]`，以及据此自动生成组输入 / 响应式重生成——全部推迟。`AutoWidgetSelect.select` 字段本期保持不变，不动 core schema API。

## 后果

- **正向**：checkbox 单值布尔双向绑定就绪，复用 x-model 全套能力（get/set、防循环、元数据注入、冲突报错）；控件感知冲突与注入白名单为后续 radio/select 铺好扩展点（`ControlKind` 分支）。
- **负向/限制**：radio/select/组/选项统一未实现（本期有意）；checkbox 仅单值布尔，数组收集（如多选兴趣）不支持；`choices` 字段未引入，选项类控件暂无统一选项词汇。
- **后续**：实现 radio/select/组时，重启 `choices` 统一 + 组收集 + 响应式重生成的 grill，复用本期 `ControlKind` 分派骨架。
