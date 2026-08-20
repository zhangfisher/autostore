# ADR-0024：x-model `.boolean` 修饰符（严格集转布尔）

- **状态**：Accepted
- **日期**：2026-08-20
- **关联**：[ADR-0018](0018-x-model-two-way-binding.md)（x-model 主干）、[ADR-0023](0023-x-model-checkbox-single-boolean.md)（checkbox/radio，决策 3 顺带修订）、[ADR-0007](0007-directive-options-and-modifiers.md)（修饰符=指令选项）、[CONTEXT.md](../../CONTEXT.md)

## 背景

checkbox（ADR-0023）与 radio 落地后，仍缺「字符串输入 → 布尔 state」的类型归一手段：radio 布尔对（`value="true"/"false"` 的「开启/关闭」单选）会往 state 写字符串 `"true"`；text 输入调试面板的布尔文本表达同理。曾拟「checkbox 值域绑定」（schema `choices`/`checkedValue` 映射，如 checked→'男'），grilling 后废弃——动机是类型安全而非值映射，且与 ADR-0023 推迟的「choices 组语义」同形异义撞车；`.boolean` 以最小代价覆盖真实需求（值域提案关闭，`choices` 一词保留给未来组收集）。

## 决策

### 1. 语义：写方向严格字符串集转换

仅写方向（DOM→state），完全镜像 `.number`（读方向不新增语义）。转换表（**严格集**，大小写敏感）：

| `el.value` | 写入 state |
|---|---|
| `"true"` | `true` |
| `"false"` | `false` |
| `""` | `false`（空=否定，避免空串污染 state） |
| 其他（`"0"`/`"abc"`/`" True "`） | **保留原值**（镜像 `.number` 的 NaN 回退「不破坏」原则） |

否决裸 `Boolean()`：`Boolean("false")===true` 是陷阱重灾区。否决宽容集（额外认 `"1"/"0"/"on"/"yes"`）：未识别隐式转 false 会静默毁数据；需要者走 `.number` + set 自定义。

### 2. 作用控件：text-like + radio 进管道，checkbox 空转

`.boolean` 作用于读 `el.value` 的控件。radio 进管道顺带修复现状缺口（原 radio 分支读 `el.value` 却不跑 `.trim/.number` 管道，与 ADR-0023 决策 6 措辞不符）。checkbox 写方向恒布尔（ADR-0023 决策 2），`.boolean` 冗余空转（无害），与 `.trim/.number` 对 checkbox 空转的既有文档一致，不为它单特判运行时 warn。

### 3. 多类型修饰符交互：按书写序顺序执行，不短路不告警

`.number`/`.boolean` 均为类型终态声明。同写两个时（如 `x-model.boolean.number`）**按书写序顺序执行**：键序来自 `Object.keys` 插入序（getDirectives 步骤 5 按序注入修饰符，已考证），`boolean` 先转 `"true"→true`、`number` 再 `Number(true)=1`——最终 `1`，布尔被毁。**冲突后果开发者自担**，不短路、不 warn。否决「warn + boolean 优先」（grilling 中用户裁决：顺序执行逻辑最简单，开发者写了冲突自己承担）。

### 4. radio 未识别值：warn 一次 + 保留原值

radio 的 `el.value` 来自模板静态 `value` 属性，不在严格集（如 `value="abc"`）是模板 bug——warn 一次（复用 `_readonlyWarned` 去重模式）+ 保留原值写回。text 场景静默保留（用户输入不预设）。

### 5. 宿主选项：走既有两层回退，不限制

`x-options="{boolean:true}"` 可元素级生效（getOption 两层回退）。宿主选项本就是「元素级共享配置」，布尔 radio 组是典型场景；误伤同元素 text 输入属配置错误，与 `.number` 同风险等级，不特判。

### 6. 顺带修订：ADR-0023 决策 3 默认事件

grilling 中发现 ADR-0023 决策 3 写「checkbox/radio 默认 `change`」，实现（`model.ts`）与文档表格均为默认 `input`。**修订为全控件统一默认 `input`**（见 ADR-0023 决策 3 修订注），`.change` 修饰符显式切换。

## 后果

- **正向**：radio 布尔对 / text 布尔输入的类型安全就绪；radio 顺带获得完整修饰符管道；checkbox 语义不变。
- **负向/限制**：`.number`+`.boolean` 同写无保护（有意，冲突自担）；`.boolean` 不作用于读方向——布尔 state 驱动 radio 选中态需 `get:'String(value)'` 配合（文档已标注 sharp edge）。
- **关闭**：checkbox 值域绑定提案（schema choices/checkedValue 映射）废弃，不留排期；`AutoWidgetSelect.select` 等 core schema API 不动。
