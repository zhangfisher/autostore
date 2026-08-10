# ADR-0015：x-style `.transition` 修饰符（注入 CSS transition）

- **状态**：Accepted（grill-with-docs）
- **日期**：2026-08-10
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0007](0007-directive-options-and-modifiers.md)

## 背景

`x-style` / `:style` / `x-bind:style` 是解析期归一化为 `bind` + `attr="style"` 的**别名，零运行时实体**（`getDirectives.ts:178-186`）。`BindDirective.patchStyle` 现有两种写法：对象按 key 增删 diff、字符串走 `el.style.cssText` 整体替换（`bind.ts:patchStyle`）。**无任何「过渡动画」能力**——要让样式变化被 CSS 过渡，用户只能自己在样式对象/串里手写 `transition`，每次切换都得带。

需求：加 `.transition` 修饰符，写法 `x-style.transition="s"`，让内联样式变化自动过渡，默认 `all 0.3s ease-in`。

拷问暴露出**决定方案形态的六个既有事实**（使本 ADR 落在「复用既有机制 + 定注入时机」，而非造新机制）：

1. **配置载体已存在**：ADR-0007 已落地「修饰符解析期注入为同名指令选项（`getDirectives.ts:207`）」+ 基类 `getOption(key)` 两层回退。`x-style.transition` 现在就已经解析成 `{name:"bind", attr:"style", modifiers:["transition"]}` 并注入 `options.transition=true`——**解析层零改动，缺的只是 `BindDirective` 的消费侧**。
2. **`patchStyle` 字符串模式会擦除一次性写入**：`el.style.cssText = String(value)` 是**整体替换**，会抹掉之前设的任何内联属性（含 `transition`）。故「在 `created()` 设一次 `transition`」的方案被字符串模式首帧击穿——**注入必须发生在每次 patch 内部**。这是选 per-patch 注入的硬约束。
3. **`transition` 一词已被占用（命名碰撞）**：仓库已有 `x-transition` 指令（`transition.ts`），当前是空壳（`render(){}`），文档定位「转场动画，配合 x-if / x-show / x-teleport」——即**挂载/卸载生命周期的进出场动画**。本 ADR 的 `.transition` 是 **CSS `transition` 属性**（让内联样式*变化*被过渡），是另一个轴上的概念，却同名。
4. **`x-style-options` 有已存在 quirk**：因 `x-style` 归一化为 `bind`，`x-style-options="{...}"` 找 `name:"style"` 匹配不到 `name:"bind"`，被 `getDirectives` 静默丢弃（`getDirectives.ts:195-203`）。覆盖 transition 值只能走 `x-bind-options`（匹配 `bind`）或元素级 `x-options`。
5. **覆盖路径受两级回退 + 修饰符注入层级约束**：`.transition` 注入到**指令选项层**（`options.transition=true`）；按 ADR-0007「指令选项 → 宿主选项」回退，**指令选项层遮蔽宿主选项层**。故带 `.transition` 修饰符时，`x-options`（宿主层）**无法**覆盖/关闭它——必须用同在指令选项层、且合并更早的 `x-bind-options`（`getDirectives` step4 先于 step5 修饰符注入，显式值胜出）。
6. **x-style 文档当前明确声明**「`x-style` 的指令值即样式表达式，**无独立指令选项与修饰符**」。本 ADR 直接推翻该声明。

## 决策

### 1. 语义：注入 CSS `transition` 属性，使内联样式变化被浏览器过渡

`.transition` 修饰符（**仅 `attr === 'style'`**）在每次写样式时注入一条 CSS `transition` 声明，让该元素内联样式的响应式变化被浏览器自动过渡动画。与 `x-transition` 指令（进出场生命周期转场，空壳、后续另议）是**同名正交**的两个概念。

```html
<div x-style.transition="box.on ? box.big : box.small"></div>
<!-- 首渲即带 transition，box.on 切换时尺寸/颜色自动过渡 -->
```

### 2. 注入时机：每次 patch 内部合并（非 `created()` 设一次）

新增 `resolveTransitionOption()` 算配置层有效值，`patchStyle` 在每次写入时合并：

- **对象模式**：把有效 `transition` 并入写入对象再做 key diff（用户对象自带 `transition` key 时不并入——见决策 3 的①层）；
- **字符串模式**：**前置**注入 `transition:${value};` 到 `cssText` 前——用户串内若已声明 `transition`，因 CSS「后声明优先」仍胜出。

**否决「`created()` 设一次」**：被事实 2 的 `cssText` 整替擦除击穿。per-patch 注入保证两种写法下都生效，注入项纳入 `lastAppliedStyle` 追踪、持续存在。

### 3. 三级优先：显式 > 配置 > 默认

`transition` 值来自多处时，按以下顺序取一个生效（高优先级先命中）：

```
effective transition =
  ① 用户 style 对象自带的 transition key      （显式，最高）
  ② getOption('transition')                   （true→默认；字符串→自定义；false/undefined→不注入）
  ③ 'all 0.3s ease-in'                        （仅 ②===true 时）
```

- `resolveTransitionOption()` 只负责 ②③ 层；① 层（用户对象自带 key）由 `patchStyle` 对象分支结构处理——对象有 `transition` key 即不并入、原样写入，自然成为最高优先。
- 用户对象写 `transition:'none'` → 临时关掉某次动画（显式优先）。
- `getOption('transition')` 为字符串（来自 `x-bind-options`/`x-options`）→ 用该字符串；为 `true`（`.transition` 注入）→ 用默认；为 `false`/`undefined` → 不注入。

### 4. 覆盖/关闭路径：`x-bind-options`（指令选项层），非 `x-options`

受事实 5 约束：`.transition` 注入到指令选项层，遮蔽宿主选项层。故：

- **覆盖默认值**：`x-bind-options="{transition:'opacity 1s'}"`（与 `.transition` 同层、合并更早 → 胜出）；
- **关闭注入**：`x-bind-options="{transition:false}"`（显式 false，与 ADR-0007「显式 false 生效」一致）；
- **`x-options`（宿主层）仅在无 `.transition` 修饰符时生效**——`<div x-options="{transition:'opacity 1s'}" x-style="s">`（无修饰符）能注入；但 `<div x-style.transition="s" x-options="{transition:false}">` 中 `x-options` 被修饰符的 `true` 遮蔽、不生效。

文档须明确引导：**带 `.transition` 时用 `x-bind-options` 覆盖/关闭**。

### 5. 作用域：仅 `attr === 'style'`，class 不支持

`transition` 本质是 style 属性，挂在 class 上语义别扭（class 无法承载它，最终还是得写进 `el.style`）。`.transition` 只在 `patchStyle` 内消费——`patch()` 仅当 `attr==='style'` 才分派到 `patchStyle`（`bind.ts:patch`），故 `:title.transition` 等非 style 绑定的 `.transition` **静默忽略**。

### 6. falsy 清空：transition 随 `removeAttribute('style')` 一并清除

style 求值为 `null/''/false` → `removeAttribute("style")` + `lastAppliedStyle.clear()`，注入的 `transition` 随之清除；下一次非空 patch 按 per-patch 模型重新注入。无特殊处理——是决策 2 的自然推论。

### 7. 命名：保留 `transition`，与 `x-transition` 指令共存

`.transition` 与 CSS `transition` 属性 1:1 对应，对用户最直觉；`x-transition`（指令）作用在另一个轴（mount/unmount 生命周期）、且当前是空壳，实际混淆风险低。**保留 `transition`**，靠文档讲清两者区别，并在 CONTEXT.md 术语表作两个条目区分。

### 8. `x-style-options` quirk 不在本 ADR 修（延后）

事实 4 的 quirk（`x-style-options` 静默丢弃）是 `getDirectives` 归一化的独立问题，影响所有 `x-style-options` 配置、非 transition 专属。覆盖 transition 值已有可用路径（`x-bind-options` / 无修饰符时的 `x-options`），修 quirk 扩大改动面到解析层、YAGNI。留作独立议题。

## 被否决的方案

- **`created()` 设一次 `transition`**：被字符串模式 `cssText` 整替擦除击穿（事实 2）。必须 per-patch 注入。
- **修饰符改名避开 `transition`**（`.smooth`/`.animated`/`.tween`）：牺牲与 CSS `transition` 属性的直觉映射；`x-transition` 指令是空壳且作用在另一轴，混淆风险低。保留 `transition`（决策 7）。
- **扩到 `x-class.transition`**：`transition` 是 style 属性，挂在 class 上语义别扭；用户明确范围是 x-style。仅 style（决策 5），class 场景有需求再加。
- **顺手修 `x-style-options` quirk**：扩大改动面到解析层，且覆盖已有可用路径。延后为独立议题（决策 8）。
- **`x-options` 覆盖 `.transition` 修饰符**：被两级回退中指令选项层对宿主选项层的遮蔽挡住（事实 5），不可行。覆盖/关闭改走 `x-bind-options`（决策 4）。
- **字符串模式后置注入 transition**：会使用户串内已声明的 `transition` 被我们的默认值覆盖（CSS 后声明优先，后置 = 我们居后 = 我们胜出 = 错）。**前置**注入让用户显式声明胜出，与决策 3 的「显式优先」一致。

## 后果

- ✅ **零解析层改动**：`.transition` 经 ADR-0007 既有机制注入，`BindDirective` 仅消费侧加一个 helper + `patchStyle` 合并逻辑。
- ✅ **两种写法均生效**：对象/字符串模式都注入，字符串模式不被 `cssText` 整替擦除。
- ✅ **显式可控**：三级优先 + `x-bind-options` 覆盖/关闭，行为可预测。
- ⚠️ **推翻 x-style 文档既有声明**：「无独立指令选项与修饰符」不再成立，须改文档。
- ⚠️ **覆盖路径有层级陷阱**：带 `.transition` 时 `x-options` 不生效，须引导用户用 `x-bind-options`（文档 + tip 已明示）。
- ⚠️ **`x-style-options` quirk 仍在**：影响所有 `x-style-options` 配置，延后单独修。

## 实现注记（非架构决策，落地时遵循）

### `bind.ts`

- **`resolveTransitionOption()`**（新增私有方法）：`const opt = this.getOption("transition"); if (opt === true) return "all 0.3s ease-in"; if (typeof opt === "string") return opt; return undefined;`——只管 ②③ 层。
- **`patchStyle(value)`**：falsy 分支不变（`removeAttribute` + `clear`）；非 falsy 分支起首 `const transition = this.resolveTransitionOption();`：
  - 对象模式：`merged = transition && !hasOwnProperty(value,"transition") ? {...value, transition} : value;` 后续 diff 改用 `merged`（① 层由 hasOwnProperty 自然处理）；
  - 字符串模式：`el.style.cssText = transition ? \`transition:${transition};${String(value)}\` : String(value);`（前置注入）。
- **类 JSDoc**：补 `.transition` example；`patchStyle` JSDoc 补注入说明。

### 测试（已落地，`__tests__/x-bind.test.ts`）

新增 `describe("x-style.transition 过渡动画注入")`：默认值注入（对象）、无修饰符时 `x-options` 宿主回退、`x-bind-options` 覆盖（指令选项层优先）、对象自带 `transition` key 显式优先、字符串模式存活、多次 patch 持续生效、falsy 重注入、非 style attr 静默忽略、`x-bind-options` 显式 false 关闭。全量 488 测试通过、无回归。

### 文档（已落地）

- `docs/zh/template/guide/directives/x-style.md`：删「无修饰符」声明；新增「过渡动画 `.transition`」section（默认值、`x-bind-options` 覆盖/关闭、三级优先 tip、per-patch 注入 warning）；改写「配置」section；
- 新增 demo `docs/demos/template/bind/style-transition.html`（默认 vs `x-bind-options` 自定义对照）；
- `x-bind.md`「绑定 style」段加 `.transition` 指引链回 x-style.md；
- `CONTEXT.md`：新增「`.transition` 修饰符」术语条目（peer `.hide`），`_Avoid_` 注明勿与 `x-transition` 指令混淆。
