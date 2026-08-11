# ADR-0019：x-model 元数据驱动（阶段2）— GRILLING 进行中

> ⚠️ **这是 grilling 进度文件，非最终 ADR。** 决策树尚未闭合（Q20-Q22 待决）。grilling 完成后会重写为本格式 ADR。
>
- **状态**：Grilling in progress（阶段2）
- **日期**：2026-08-11
- **关联**：[ADR-0018](0018-x-model-two-way-binding.md)、[CONTEXT.md](../../CONTEXT.md)、[ADR-0007](0007-directive-options-and-modifiers.md)

## 重启指引（明天怎么继续）

1. 重跑 skill：`/grill-with-docs 继续 packages\template\docs\adr\0019-x-model-metadata-driven.grilling-state.md`
2. 从 **Q20** 开始提问（Q1-Q17 已 settle，Q18 待重定位，Q19 已重定义 `~` 语义）。
3. grilling 闭合（frontier 清空）后：重写本文件为正式 ADR-0019，更新 CONTEXT.md 增补阶段2 术语。

---

## 最关键认知（务必先读）

**`~` 不是指令前缀，是 x-bind 表达式前缀**（Q19 重定义，推翻前四轮对 `~` 的理解）：

```html
<input x-model="order.price" :placeholder="~placeholder" />
```

- `~placeholder` = 当前字段（order.price）在 `store.configManager` 里的 placeholder 值。
- `~` 切换绑定数据源：从 `engine.store` → `engine.store.configManager`。
- **不存在** `~price` / `~price.number` 用法（`~` 不带修饰符；`.number`/`.trim`/`.change` 是 x-model 的修饰符，与 `~` 无关）。

**configManager 是独立 AutoStore**（命门，反复出现）：schema 元数据存在 `configManager.state[configKey]`，与原始 `engine.store.state` 是两个 store 实例。跨 store 订阅是多个决策被推翻的根因。

---

## 已 settle 的设计树

| 决策 | 结论 |
|---|---|
| **Q1** | 弱硬依赖 core ConfigManager：数据源单一用 core（不在 template 重造 schema）；运行时分级——有元数据则注入、configManager 未开 / path 无 schema 则降级纯双向 + warn。 |
| **Q9** | ModelDirective **内部一次性 setAttribute 注入**（compile 期）。**非编译期合成 bind、非响应式**——configManager 跨 store 订阅成本过高，有意限制元数据不响应式。 |
| **Q11** | **交集法**：注入集合 = `schema.options 实际 keys ∩ INJECTABLE_INPUT_ATTRS`。右元动态由 schema 驱动，不硬编码字段。 |
| **Q12** | 注入落点：ModelDirective `compile()` 内调 `_injectMeta()`，与 `_attachEvent()` 并列。created 保持纯 scope/watch。 |
| **Q13** | 逐属性抑制：注入某属性前查 `binding.directives`(bind+同名attr) ∪ `el.attributes`(原生同名属性)，任一存在则跳过该属性。 |
| **Q14** | warn 去重：场景 A（configManager 未开）per-engine 一次；场景 B（path 无 schema）per-instance 一次（复用阶段1 `_readonlyWarned` 模式）。 |
| **Q15** | 右元 `INJECTABLE_INPUT_ATTRS` 是**显式安全白名单**，**排除所有 `on*`**（防 configManager 外部加载值注入 XSS，如 `onclick`）。 |
| **Q16** | **`type` 排除出注入集**——type 注入击穿阶段1「text-like only」核心假设（model.ts 统一读写 el.value，checkbox/radio 语义失效）。 |
| **Q17** | `enable===false`→`disabled` 是交集外**唯一非直映特例**（core schema 用 enable、HTML 用 disabled，语义反转）。`undefined`/`true` 不碰（不抹用户手写 disabled）。 |

---

## 作废的决策（grilling 中被推翻，将来写进 ADR「否决方案」）

| 决策 | 原结论 | 推翻者 | 根因 |
|---|---|---|---|
| **Q2** | 编译期合成隐式 bind（元数据响应式） | Q9 | configManager 是独立 AutoStore，BindDirective 的 watch 订阅 engine.store，跨 store 订阅需新建桥接机制，违背 KISS。 |
| **Q8** | 窄白名单（硬编码 placeholder/required/disabled 三项） | Q11 | `AutoStateSchemaBase` 是开放接口（按 widget 泛型扩展任意字段），硬编码白名单方向错误；改为 schema 动态驱动。 |
| **Q4** | `~` 作第四类指令前缀（与 `@`/`:` 对称） | Q19 | `~` 不是指令前缀，是 x-bind 表达式前缀（切换数据源到 configManager）。 |
| **Q5** | 元数据合成上移到 `_createDirectives` | Q4/Q9 | 随 Q4（无 `~` 指令）、Q9（无合成 bind）一并作废。getDirectives 保持纯解析。 |
| **Q19(旧)** | `~` 复用 x-model 修饰符管线（`~price.number`） | Q19(新) | `~` 不带修饰符；修饰符是 x-model 的。 |

---

## 待重定位（幸存但需在新 `~` 语义下重新确认）

| 决策 | 原结论 | 新语义下的落点 |
|---|---|---|
| **Q3** | 逐属性抑制 | 语义不变，落点在 ModelDirective `_injectMeta()` 内（Q13 已落地）。 |
| **Q6** | name 仅作 `~` 无值时回退 | 入口从 `~` 改为 **x-model**：`<input name="price" x-model>` ≡ `<input x-model="price">`。 |
| **Q7** | 降级纯双向 + warn | 不变。 |
| **Q18** | 「取路径作为名称」 | 新语义下暂理解：x-model 无值时用 name 作路径（= Q6）。**待 Q20-Q22 settle 后最终确认**。 |

---

## 待决 frontier（明天从这里继续）

### Q20 - x-model 自动注入 vs `~` 显式绑定：谁是主，谁是补？

四种关系：
- (a) x-model 自动注入交集全集；`~` 是用户精细控制/覆盖（逐属性抑制协调）。
- (b) x-model 不自动注入；全靠 `~` 显式逐个写。
- (c) x-model 自动注入；`~` 仅供非 x-model 元素访问 configManager。
- (d) 完全分离，两者不联动。

**推荐 (a)**：用户原话「x-model 内部根据 order.price 从 configManager 获取 placeholder」→ 自动注入；`~` 作为显式语法的独立价值在「用户自己控制某属性」。逐属性抑制（Q13）协调两者。

### Q21 - `~placeholder` 无路径，当前字段路径从哪来？

- (a) 同元素 x-model 路径（推荐）：`:placeholder="~placeholder"` 取同元素 x-model 的路径。
- (b) 同元素 name 属性。
- (c) `~` 必须带完整路径 `~order.price.placeholder`（与用户无路径示例矛盾）。

**推荐 (a)**：无路径 `~field` 依赖同元素 x-model 提供上下文；无 x-model 时 `~` 必须带完整路径。

### Q22 - `~` 在求值层的落点（跨 store 订阅命门重现）

`~` 在 `:placeholder="~placeholder"` 的**值表达式**里，getDirectives 把它解析为 `{name:'bind', attr:'placeholder', value:'~placeholder'}`——`~` 在 value 字符串，getDirectives 不感知。`~` 处理须在 BindDirective 求值阶段：

- (a) BindDirective watch 前预处理改写为 configManager 路径 → 跨 store 订阅问题。
- (b) BindDirective 为 `~` 开专用求值分支：识别 `~` 前缀 → configManager.watch + 手动 patch（推荐）。
- (c) scope 注入 configManager 上下文 → 跨 store 桥接。

**推荐 (b)**：configManager 跨 store 是硬事实，`~` 显式绑定要响应式必须直连 configManager.watch。**与 Q9 区分**：x-model 自动注入非响应式（静态结构可接受）；`~` 显式绑定是用户主动声明的响应式绑定，应响应式。

---

## 关键事实索引（grilling 中考证过，明天不必重查）

- **ConfigManager 默认关闭**：`packages/core/src/schema/manager.ts:73` 默认 `configManager:false`；engine 自建 store（`engine.ts:117`）不自动开。
- **元数据不在 state 路径上**：schema options 存 `configManager.state[configKey]`（受 `store.options.configKey` 前缀影响，`manager.ts:264-300`）；原始 `state.order.price` 上无 placeholder 等字段。core 无现成 `getSchemaByPath()` API。
- **schema 注册门槛**：仅 `schema()` 描述符字段进 configManager（`observers.ts:39-52`）；裸 `{name:'zhang'}` 无元数据。
- **`AutoStateSchemaBase` 开放接口**：`schema/types.ts:57`，按 widget 泛型扩展任意字段（`WidgetConfigPrecise<W>`，line 210-214）。→ 交集法依据。
- **BindDirective 属性分类常量**：`bind.ts:64` PROPERTY_ATTRS(value/checked)、`bind.ts:66-73` BOOLEAN_ATTRS(disabled/readonly/hidden/selected/multiple)。阶段2 注入应复用扩展。
- **ModelDirective 现有结构**：`model.ts` created(line112) scope 通道 / compile(line129) 首渲+挂事件 / `_readonlyWarned`(line106) per-instance warn 去重 pattern。
- **getDirectives 纯解析边界**：`getDirectives.ts:116` 只认 `@`/`:`/`x-` 三类前缀，普通 HTML 属性 line 180 忽略。`~` 在 value 字符串里，getDirectives 不感知（Q22）。
- **ADR-0007 修饰符管线**：修饰符解析期注入 options（`getDirectives.ts:196-203`），指令统一读 `getOption`。
