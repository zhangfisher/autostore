# ADR-0028：x-model select 自动选中（autoSelect，值不在选项集时）

- **状态**：Accepted
- **日期**：2026-08-22
- **关联**：[ADR-0026](0026-x-model-select.md)（select 主干，决策 3「选中丢失不回写」被本 ADR 条件性修订）、[ADR-0027](0027-x-model-empty-fallback.md)（空值回填——链式前置）、[ADR-0020](0020-x-model-schema-auto-injection.md)（schema 元数据两级声明先例）、[CONTEXT.md](../../CONTEXT.md)

## 背景

省市区县三级级联暴露的缺口：切省后市级 choices 重建，原市值不在新选项集 → 严格匹配不勾中 → 显示空且 **state 不回写** → 下一级（区县）的 choices 引用旧市值，链条断裂——「选中丢失不回写」（ADR-0026 决策 3）在级联场景是**反模式**：它保护了 state 真相源，却牺牲了联动可用性。本 ADR 引入 `autoSelect`：值不在选项集时自动选中一项并**回写 state**，令级联开箱即用。

## 决策

### 1. 行为：值不在选项集 → 自动选中 + 回写 state（默认开启）

- **触发判定**：每次 `_applySelectSelection`（含 choices 重建后的重放）时，当前显示值为字符串但**不在渲染后的 options 值集内** → 触发。
- **选取规则**：choices 项含 `default:true` 的**第一个**项（多于一个取首个命中，不 warn）> 渲染后第一个 option（含 optgroup 内首个，与 ADR-0027 首项规则同构）。
- **回写**：选中后经既有 `_writeToState` 管道写回 state（`flags:-seq` + `_selfWriting` 置位——与用户手选**逐字节同一条写路径**，set 表达式/防循环/下游触发语义全部复用）。回写 → state 变 → read 回调时值已在集内 → 正常勾中，**自然收敛无死循环**。
- **默认值 true**（grilling 修订：Q3 初裁 b「默认关」，Q8 终裁**默认开**且模板/schema 均可声明覆盖）——级联开箱即用是主场景；旧行为（不勾中+不回写）经 `autoSelect:false` 显式退回。

### 2. 声明来源：模板 > schema 两级，默认 true

- 模板：`x-model-options="{autoSelect:false}"`（含 `x-options` 宿主回退）；
- schema：`configurable(v, {autoSelect: false})` 元数据；
- 均未声明 → `true`。模板显式声明优先于 schema（与 choices/multiple 的两级先例一致）。

### 3. 触发边界

- **类型不匹配不参与**：非字符串（数字/数组配单选）维持现状（warn 一次 + 不勾中）——类型错误是 bug 应出声，不是「换选项」能救的；本机制只接管「类型对但值过期」。
- **空 choices 静默**：选项集为空（级联中段无数据）→ 无项可选，不勾中、不回写、不 warn。
- **与 ADR-0027 链式**：空值 → `default` 回填值 → 回填值若不在集 → 再走本机制选 `default:true`/首项并回写——统一的「最终选中项必在选项集内」不变量。
- **静态 select 参与**：判定依据是渲染后的 `el.options`，与选项来源无关（手写 option 同样自动选中）；**radio 不参与**（多元素无「第一支」，维持 ADR-0027 决策 6）。

### 4. 多选：过滤式

数组中不在集的项**剔除**、保留有效项回写（过滤式，非整组重选）；全不在集/空数组 → 不勾不回写（多选的「全不勾」是合法态）。多选不引入 `default:true` 回填集语义（YAGNI）。

### 5. `default:true` 仅作选取依据

choices 项的 `default:true` 字段**不影响渲染**（selected 永远由 state 驱动），只在「值不在集」时决定选谁。core 的 `AutoWidgetSelect.choices` 项类型已含 `default?: boolean`（模板与 schema 两来源的项都识别）。

## 后果

- **正向**：三级级联开箱即用（切省 → 市自动选中并回写 → 区县随之重算，链路闭合）；「依赖 state 真相源」与「联动可用性」的矛盾经显式开关解决。
- **负向/限制**：**行为变更**——值不在集的场景从「不勾中不回写」变为「自动选中并回写」（默认开启，存量「依赖 -1/旧值」的代码须显式 `autoSelect:false` 退回，迁移提示进文档）；选项集高频重建 + 值高频过期时回写频繁（每 tick scheduler 合并，可接受）。
- **修订**：ADR-0026 决策 3 的「选中丢失不回写」仅在 `autoSelect:false` 时成立（默认路径改为回写）；CONTEXT.md「choices」词条补 autoSelect、新增「自动选中」词条。
