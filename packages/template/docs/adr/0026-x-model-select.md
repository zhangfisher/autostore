# ADR-0026：x-model select 支持（choices 三源 / group 分组 / multiple）

- **状态**：Accepted
- **日期**：2026-08-21
- **关联**：[ADR-0018](0018-x-model-two-way-binding.md)（x-model 主干）、[ADR-0023](0023-x-model-checkbox-single-boolean.md)（ControlKind 分派，决策 3 本 ADR 二次修订）、[ADR-0020](0020-x-model-schema-auto-injection.md)（元数据注入白名单）、[ADR-0024](0024-x-model-boolean-modifier.md)（修饰符管道）、[CONTEXT.md](../../CONTEXT.md)

## 背景

x-model 已覆盖 text-like / checkbox / radio，select 为 ControlKind 预留分支。select 的特殊性在于**选项子树的来源**：可来自模板手写 `<option>`、schema 的 `choices`（响应式，可动态更新）、或 `x-model-options` 的 `choices`。grilling 就三源优先级、`multiple` 多源收敛、`group` 分组渲染、类型不匹配边界等 13 问逐一裁决。

## 决策

### 1. 选项源三级优先：静态 option > 模板 choices > schema choices

- **静态模式**：select 下存在任一 `<option>`/`<optgroup>` 子元素即视为静态——choices 两来源**整体忽略**（含 schema.choices 的后续响应式变化），选项子树完全放权给模板手写。
- **模板 choices**：`x-model-options="{choices:[...]}"`（宿主选项亦可）优先于 schema。
- **schema choices**：`configurable(initial,{choices})`，经 configManager 响应式订阅——**任何变更（整体替换/增删/单项字段含 label、value、group 键）全量重建** options 子树（无 diff），重建后重放当前 state 值恢复选中。option 子树极简，全量重建成本可忽略（KISS，不做增量 diff）。**依赖须深读**（实现期发现）：collectDependencies 只读数组引用收集不到项字段路径（`app.car.choices` 订阅对 `choices[0].label=x` 不触发），须在求值回调内遍历读各项的 `label/value/group` 字段，收集 `app.car.choices.0.label` 等深路径。
- 三源皆空 → warn 一次「无可选项」，不生成。

### 2. multiple：运行时唯一真相源是 `el.multiple`

`multiple` 可来自四处——静态属性、`.multiple` 修饰符、schema.multiple、指令/宿主选项。收敛规则：**显式（静态属性 ≡ 修饰符 ≡ 指令/宿主选项，任一为真即真）> schema.multiple（合成注入，静态属性已存在则跳过）**。值语义（单值 `string` / 多值 `string[]`）一律派生自 `el.multiple`，指令内不另存副本。与 ADR-0020 决策 9「显式优先」同构。

### 3. 值形态与读写方向

- **单选**：读 `el.value`（string），写 `el.value = display`（仅 `typeof display === "string"` 时；非字符串不勾中任何项 `selectedIndex=-1`）；
- **多选**：读 `selectedOptions` 收集 `string[]`，写逐项 `option.selected = (state.includes(option.value))`；
- **选中匹配严格 `===`**（Q11-a）：与 radio 先例（`display === el.value`）一致——`option.value` 恒字符串，故**非字符串 state（数字/数组）一律不勾中**，warn 一次后自然退化；`String()` 强转写入会令数字 `1` 勬中 `"1"`（实现期发现并否决的偏差），掩盖类型漂移无益。`.number` 写回数字后回读勾不中是**文档化锐边**（与 ADR-0024 对 radio 的处理同构），需 `get:'String(value)'` 配合。
- **类型不匹配 warn 一次**（Q3-a）：数组配单选 / 字符串配多选（includes 恒 false）——select 的不匹配比 text 更隐蔽（视觉「永远勾不中」），出声一次后自然退化。
- **state 为 undefined**：沿用「warn + 不动 DOM」+ 浏览器自动显示首项的视觉默认是**文档化锐边**（Q12-a，建议 state 必须初始化；需占位者自放 `{value:"",label:"请选择"}`）。否决自动占位空选项机制（YAGNI）。
- **选中丢失不回写 state**：重建后 state 值在新选项中无匹配 → 该项不选中（多选忽略、单选 `selectedIndex=-1`），**不修正 state**（state 是真相源）。
- **选中态推迟应用**（实现期发现）：编译产物经 `engine.compile` 的 `replaceChildren` 搬运挂载，DOM 移动会**重置 select 选中状态**（happy-dom 实测，浏览器同险）；且编译期 el 是浅克隆、静态 option 尚未挂入。故读方向写目标统一为「缓存显示值 + microtask 重放」（scheduler Set 按闭包去重，总是取最新值）。

### 4. group 分组渲染

`x-model-options="{group:'<字段名>'}"`（如 `group:'category'`）按 choices 项的指定字段值分组到 `<optgroup label="...">`：

- **无该字段的项**渲染为顶层 `<option>`，顺序遍历（遇无组项追加顶层、遇有组项归组——组按首次出现追加），可与组交错；
- label 缺失 → 回退 `String(value)`；group 字段值非字符串 → `String()` 强转；
- group 仅作用于 choices 渲染路径（两来源均可），**静态模式不适用**（手写 optgroup）；
- group 键只在模板侧声明（`x-model-options`/`x-options`），**schema 不加 group 字段**（`AutoWidgetSelect` 不动）；
- choice 级 / optgroup 级 `disabled` 本期不支持（YAGNI）。

### 5. choice 形态：label 可缺省、value 可缺省、开放附加字段

`{ label?: string; value?: any; [k: string]: any }`：

- **缺 value** → 省略 value 属性，走 HTML 原生回退（`<option>极氪</option>` 的 `el.value === "极氪"`，label 即值，Q13-a）；
- **缺 label** → 回退 `String(value)`；
- 附加字段（如 `category:"轿车"`）合法，作 group 键的取值来源。
- core 的 `AutoWidgetSelect.choices` 类型同步放宽为 `{ label?: string; value: any; [k: string]: any }[]`（原 `{label,value}[]` 收太紧，容不下 group 键与缺省）。

### 6. 默认事件：`change`（修订 ADR-0023 决策 3 / ADR-0024 决策 6）

select 无「打字中间态」，`change` 是其语义事件（Vue/Alpine 惯例）。**修订「全控件统一默认 `input`」为「text-like 与 checkbox/radio 默认 `input`，select 默认 `change`」**。`.change` 修饰符显式声明同效（幂等）。

### 7. select 注入白名单

`SELECT_INJECT_ATTRS = [title, required, enable(→ :disabled.invert 合成), size]`——裁掉 placeholder/pattern/minlength/maxlength/readonly/min/max/step（对 select 无意义），补 `size`（`AutoWidgetSelect` 既有字段）。`choices` 不走属性注入，走决策 1 的选项子渲染。name 注入沿用 ADR-0020 决策 8；**不加 id 注入**（YAGNI，id 是布局/锚点关注点）。

**multiple 不在白名单**（性能/DRY 审查修订）：属性注入与 `_initSelect` 的语义收敛会双写 `el.multiple`（synth 在 compile 后响应式、`_initSelect` 在 created 期一次性，时序竞争），且 multiple 切换意味着值语义 string↔string[] 变更——光改属性不动值是半吊子联动。multiple 由 `_initSelect` **唯一管理**（初始化期收敛，运行时切换属罕见，YAGNI 文档标注）。

### 8. 修饰符管道 × 多选：逐项应用

`.trim/.number/.boolean` 对多选数组**逐项 map**（`["1","2"]` + `.number` → `[1,2]`）；单选照常单项。与既有管道函数复用（数组包一层）。

## 后果

- **正向**：choices 词条激活（select 首个消费者）；schema 驱动的动态选项（响应式增删改）就绪；group 分组零 schema 侵入；radio/checkbox 组收集仍有 choices 词汇可沿。
- **负向/限制**：严格 `===` 匹配下 `.number` 多选需 get 配合（锐边文档化）；重建无 diff（选项量大时全量重排，千级 option 才可感知）；schema.choices 变更在静态模式下被忽略（文档标注）。
- **修订**：ADR-0023 决策 3 的「全控件统一默认 `input`」按控件类别分裂；CONTEXT.md「choices（规划中）」词条激活、「控件类别」词条补 select 分支；core `AutoWidgetSelect.choices` 类型放宽。

## 附：落地后的专项审查（性能/安全/功能/DRY/响应式完整性）

实现后一轮专项审查发现并修复：

1. **multiple 双写竞争**（决策 7 修订）：见上文。
2. **fullKey 拼接三处重复**（DRY）：提取 `toFullConfigKey` 模块函数，synthesizeSchemaBindings / `_fullConfigKey` 共用单一真相源。
3. **`_applyModifiers` 每键重聚合键序表**（性能）：键序表缓存实例字段 `_modifierKeys`（指令/宿主选项编译期定格，生命周期不变）。
4. **get/set/args 每键 `new Function` 重编译**（性能）：模块级 `compiledFnCache`（源码串为键，跨实例共享，单调增长有界）。
5. **防循环跳过导致 select 显示值缓存分叉**（响应式完整性 bug）：`writeToDom` 的 `_selfWriting` 跳过分支对 select 仍须刷新 `_lastDisplayValue`——否则「级联联动 → 自写 → 再联动」三段序列后，choices 重建的重放会取到自写前的旧值，与 state 分叉（新增回归测试钉死该序列）。
6. **computed choices 级联验证**：`schema.choices` 为计算属性（引用主 store 字段）时，字段值 → 计算属性 → schema → 选项重建的完整链路成立（省市级联测试 + demo）；文档补「联动链的响应式保证」三层机制表与安全说明（get/set 是代码执行点，禁拼用户输入）。
