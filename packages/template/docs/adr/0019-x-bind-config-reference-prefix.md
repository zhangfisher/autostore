# ADR-0019：x-bind `@` 分隔符——configManager 元数据绑定

- **状态**：Accepted
- **日期**：2026-08-12（`@` 语法修订）
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0007](0007-directive-options-and-modifiers.md)、[ADR-0018](0018-x-model-two-way-binding.md)

## 语法演进

本 ADR 初版采用 `~` 值前缀（`~order.price.placeholder`），约定路径**末段恒为配置属性**。该方案有局限：末段是单段，**无法绑定 schema 中的嵌套对象属性**（如 `schema.style.color`）。

现修订为 **`@` 路径中缀分隔符**：

- `order.price@placeholder` —— 左侧 `order.price` 为配置状态路径，右侧 `placeholder` 为配置属性路径
- `order.price@style.color` —— 右侧支持嵌套，绑 schema 的 `style.color`

`@` 把「定位 schema 条目」与「读 schema 属性」显式分开，两侧均可为多段路径，灵活支持任意深度嵌套。`~` 前缀语法**移除**（尚未发布、无兼容包袱；原 `~` 测试改写为 `@`）。

> `@` 作分隔符无歧义：`@` 在 getDirectives 里是**属性名**前缀（`rawName.startsWith("@")` → x-on 事件），而本语法的 `@` 在 x-bind 的**值字符串**里，值解析与属性名解析正交。状态路径段名是合法 JS 标识符、不含 `@`，故 `@` 作值内分隔符无碰撞。

## 背景

现有 x-bind（`:`/`x-bind:`）经 `scope.watch` 绑定 **store 状态**到 DOM 属性。但 AutoStore 的 `configManager` 维护着字段的**元数据 schema**（`placeholder`/`title`/`label`/`help`/`required`/`readonly`/`widget`…，可扩展），是另一套独立于状态值的数据源。表单场景需要把元数据驱动到 input 属性（`<input :placeholder="order.price@placeholder"/>`），而 `configManager` 是全局性的（不随每个 scope 引用）、其 state key 与 store 状态树结构不同（flat 点连接 key）。

本 ADR 为 x-bind 引入 `@` 分隔符，让指令值能显式指向 configManager 元数据。configManager 元数据驱动 x-model 的「自动注入 + 白名单」（`name` 默认路径等）留待 ADR-0020，本 ADR 仅落地 `@` 分隔符本身。

## 决策

### 1. `@` 分隔符 = configManager 绑定（区别 scope.watch 状态绑定）

x-bind 的 `value` 含 `@` 时，绑定来源从 `scope.watch(store.state)` 切换为 `configManager`（经 `this.store.configManager`）。两个来源正交：

- **状态绑定**（无 `@`）：`this.binding.watch(expr)` → store.state，支持相对表达式（x-for item / x-data 局部变量）。`order.price` = 绑状态值。
- **配置绑定**（`@`）：`configManager.collectDependencies` → configManager.state，**仅绝对配置路径**（configManager 是全局对象，无 scope 相对语义）。`order.price@placeholder` = 绑 schema 的 placeholder 属性、`order.price@value` = 绑 schema 的 value 属性。

`@` 是「配置引用」语义，把「定位 schema 条目」（左）与「读 schema 属性」（右）显式分开。无 `@` 即状态绑定——语义清晰，比初版 `~` 前缀（无 `~` 也可能想绑 schema）更少歧义。

### 2. `@` 右侧为配置属性路径，支持嵌套，无白名单

`order.price@placeholder` 中 `@` 左侧 `order.price` 为**配置状态路径**（定位 configManager.state 中的 schema 条目），右侧 `placeholder` 为**配置属性路径**（schema 对象的属性，**支持多段嵌套**，如 `@style.color` 读 `schema.style.color`）。

- 用 `indexOf("@")` 取**第一个** `@` 分割（配置状态路径在左、不含 `@`；右侧多余的 `@` 在 getVal 时取不到值、走 falsy 降级，不需特判）。
- **不用白名单**判定属性边界——因为 schema 是**可扩展数据结构**（用户可加任意自定义元数据 key），白名单会封闭这个开放集合。`@` 显式分隔即可，无需猜属性边界。

> 较初版 `~`（末段恒属性、单段）的核心改进：右侧属性路径支持嵌套，能绑 `schema.style.color` 这类对象属性。

### 3. 路径用 `splitPath`（`.`）拆，与 configManager state key join 同构

AutoStore 实现有**两个事件触发器**：

- **AutoStore 生命周期事件**（`store.emit/on`）：用 `/`（`store.options.delimiter`）。
- **状态变化事件**（`operates.emit/on`，即 `store.watch` 监听的）：用 `.`（`PATH_DELIMITER`）。

`store.delimiter` getter 恒返回 `.`（store.ts:232-234）。`configManager.state` 的 key 经 `joinPath([configKey, ...pathKey])` 用 `.` join（manager.ts `add`），`configManager.watch` 也用 `.` 匹配 operates 事件——**自洽**，无不对称。

故 `order.price@placeholder` 用 `indexOf("@")` 先分割左右，再各用 `splitPath(raw, ".")` 拆（默认参数即 `.`），复用其 `escapePath` 支持 key 含 `.` 的转义，与 `add` 的 join 形成 round-trip 闭环。

### 4. fullKey 拼接复刻 `add` 算法（仅左侧，configKey 空串不加前缀）

`configManager.state` 的 key 由 `add` 生成：`joinPath([configKey?, ...pathKey])`，其中 `configKey` 由 `store.configKey` 提供（构造期 store.ts:298 把 undefined 归一为 store.id，故**永非 undefined**；空串 `""` 合法，`add` 内 `if (store.options.configKey) splice(...)` 对空串 falsy 不执行 → 不加前缀）。

`@` 分支的 fullKey 拼接**仅用左侧配置状态路径**，完全复刻 `add` 算法，确保与 state key 精确对齐（右侧属性路径不进 fullKey，而是作为 getVal 路径读 schema 对象）：

```typescript
const at = raw.indexOf("@");
const leftSegs = splitPath(raw.slice(0, at), ".");  // ["order","price"]
const rightPath = splitPath(raw.slice(at + 1), "."); // ["placeholder"] 或 ["style","color"]（嵌套）
const fullKey = joinPath(
  configKey ? [configKey, ...leftSegs] : leftSegs
);  // configKey="s1" → "s1.order.price"；configKey="" → "order.price"
```

直接复用 `joinPath`，不手写拼接。

### 5. `@` 两侧非空（任一为空 → warn + 静默）

`@placeholder`（左侧空，无配置状态路径）或 `order.price@`（右侧空，无属性路径）→ warn + 静默（不动 DOM）。合法引用两侧均非空（`name@placeholder`）。

### 6. 三层降级（静默优先，属性缺失不额外 warn）

- **configManager 不存在**（store 未配置 configManager，`this.store.configManager` 为 undefined）：`engine.logger.warn` + 不动 DOM。
- **schema 不存在**（`configManager.state[fullKey]` 为 undefined）：`engine.logger.warn` + 不动 DOM。
- **schema 属性取不到**（`getVal(schema, rightPath)` 为 undefined/null，含嵌套路径中途断裂）：**复用 patch 既有 falsy 分支** `removeAttribute`，**不额外 warn**——属性缺失是常态（某字段没配 placeholder，或嵌套路径 `style.color` 但 schema 无 `style`），频繁 warn 是噪音。

> 与 Q3（configManager 不存在）、Q2（schema 不存在）一致的降级风格：首版宽松，KISS。要硬约束后续可加 `.strict` 修饰符。

### 7. 依赖收集用 `configManager.collectDependencies("read")` 自动追踪（含嵌套路径）

要在 schema 的某属性（含嵌套 `style.color`）变化时触发回调。configManager.state 的 key 是 flat `.` 连接串，value 是 schema 对象（含各属性）。改 `schema.style.color` 经 Reactive Proxy set → `_notify` → 后代广播（ADR-0001，整体替换对象也唤醒后代）→ operates 事件。

**不手工拼 watch 路径**（易在 delimiter/key 形态上踩坑），改用 `configManager.collectDependencies("read")` 自动收集——在求值回调内 `getVal(configManager.state[fullKey], rightPath)` 读，让响应式系统自动追踪 `[fullKey, ...rightPath]` 依赖路径（含嵌套层，与 `scope.watchExpression` scope.ts:333 同构）。watcher 订阅收集到的依赖，回调经 scheduler 合并后 patch。

### 8. 回调经 `engine.scheduler` 合并（与 scope.watch 一致）

同 tick 内多个 schema 字段变化（或同元素多个 `@` 绑定）会多次触发回调。经 `engine.scheduler.schedule(update)` 微任务合并，与 `scope.watchPath`/`scope.watchExpression` 的 update 闭包模式同构——同元素多次变化合并成一次 patch。

### 9. watcher 随 scope.destroy 回收

`@` 分支的 watcher `push` 进 `this.watchers`（基类字段），由 `scope.destroy` 统一 off（与现有 scope 通道指令同构）。不在 `destroy()` 钩子手动 off——复用现有回收机制，无遗漏。

### 10. patch 全分派复用（Q11=A）

`@` 分支拿到 configManager 值后，完整复用 `BindDirective.patch` 的全部分派：`class`→normalizeClass diff / `style`→cssText 或对象 diff / property（value/checked）→`el[attr]=` / boolean（disabled/readonly/…）→setAttribute-toggle / 普通 attr→setAttribute/removeAttribute。`@` 只是换「值来源」，写入语义不应因此分叉；`:class="x@inputClass"`、`:style="x@style"`、`:disabled="x@disabled"` 同样支持。

### 11. `@` 两侧纯路径 only（Q12=A）

`@` 两侧必须且仅能是点分纯路径，**不支持运算/拼接**（`:placeholder="x@placeholder + ' 元'"` 非法）。要变换走 x-model get（ADR-0018）或 computed。混合会让 collectDependencies 的依赖收集与路径切分纠缠——KISS。

### 12. `:value="x@value"` 与 x-model 同元素 → 编译期报错

x-model 的 `:value` 冲突检查（ADR-0018 决策 7）在 `created` 内扫描同元素 bind 指令的 `attr==="value"`——**无论该 bind 的值是否含 `@`**，`:value="x@value"` 与 x-model 同样竞写 `input.value`，故保持现有编译期报错，不为 `@` 开例外。

### 13. configKey="" 边界测试覆盖

configKey 显式设空串（`new AutoStore(state, {configKey:""})`）时不加前缀，`order.price@placeholder` → fullKey 直接是 `order.price`。测试覆盖此边界，确保与 `add` 的空串语义一致。

## 后果

- **正向**：x-bind 可响应式绑定 configManager 元数据到任意属性（含 class/style/property/boolean 全分派）；`@` 右侧属性路径支持**任意深度嵌套**（`style.color`），突破初版 `~` 末段单段限制；`@` 与状态绑定正交、无 `@` 即状态绑定，语义清晰；collectDependencies 自动收集（含嵌套）规避手工拼 watch 路径的全部坑；三层降级保证「configManager/schema/属性 缺失」均不中断编译。
- **负向/限制**：`@` 不支持表达式（两侧纯路径 only）；configManager/schema 不存在仅 warn 不报错（首版宽松）；初版 `~` 语法移除（breaking，但未发布无兼容包袱）。
- **后续（ADR-0020）**：x-model 编译期合成隐式 `@` 绑定 + 白名单注入 + `name` 默认路径——消费本 ADR 落地的 `@` 能力，把「字段元数据自动注入 input 属性」自动化。
