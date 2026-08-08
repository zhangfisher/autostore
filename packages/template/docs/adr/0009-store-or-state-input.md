# ADR-0009：构造器第二参接受 `store | state`（自建 store 归 engine 销毁）

- **状态**：Accepted（Round 3，grill-with-docs）｜⏳ 实现待落地（决策已定，业务代码未改）
- **日期**：2026-08-08
- **关联**：[glossary.md](../glossary.md)、[ADR-0006](0006-x-slot-directive.md)（child engine 构造——本 ADR 决策 6 修订其决策 4 / 实现注记）

## 背景

`AutoTemplateEngine` 构造器第二参 `store` 此前**硬校验**为 `AutoStore` 实例（`engine.ts:86-93`，非实例即抛错），且有两处成文不变量：

- `engine.ts:49`：`外部传入的响应式数据源（引擎不创建、销毁时也不碰）`
- `engine.ts:459-461`：`**关键约束**：store 为外部共享资源，**绝不调用 store.destroy()**`

需求（/grill-with-docs）：第二参既可传 `AutoStore` 实例，也可直接传裸 `{...}` 状态——后者由 engine 自动 `new AutoStore(state)`。这本质是**打破"引擎不创建/不销毁 store"的对称不变量**，须明确打破到什么程度。

拷问暴露出四个真正要决策的接缝：① 自建 store 归谁销毁（直接抵触上述不变量）；② 怎么判别 store 实例 vs 裸状态；③ 自建 store 是否透传 `AutoStoreOptions`；④ 第二参的输入校验边界。

## 决策

### 1. 联合输入：`AutoStore<State> | State`，形参名保留 `store`

构造签名放宽为 `constructor(el, store: AutoStore<State> | State, options?)`。形参名**保留 `store`**——字段 `engine.store` 已是公开契约，改名是连带 churn；联合类型 + glossary 术语（种子状态 / 响应式状态句柄）澄清"可能是裸状态"。`engine.store` 与 `engine.state`（getter 返回 `store.state`）字段语义不变。

### 2. 自建 store 归 engine 销毁（谁建谁拥有）；外部 store 一律不碰（`_ownsStore` 分流）

引擎新增私有标志 `_ownsStore: boolean`。构造期据决策 3 判别结果分流：

- 命中 AutoStore 实例 → `this.store = store; _ownsStore = false`（借用，外部共享资源）。
- 裸状态 → `this.store = new AutoStore(state, options?.storeOptions); _ownsStore = true`（拥有）。

`destroy()` 在现有清理（scopes / scheduler / dispatcher / DOM）之后，**仅当 `_ownsStore`** 才 `this.store.destroy()`——回收自建 store 的 computedObjects / 事件订阅 / Proxy 等 core 资源。外部 store 一如既往**绝不 destroy**（保留原不变量的"借用"语义）。

理由（否决"永不销毁"/"显式 opt-in"，见被否决方案）：与引擎现有销毁纪律自洽——"清理引擎自有资源"已涵盖 scope / watcher / scheduler / dispatcher / DOM，自建 store 同属引擎自有资源。外部 store 借用、自建 store 拥有，二者语义不同，以 `_ownsStore` 区分（RAII）。`_ownsStore` 设私有字段、**不暴露 public getter**（无消费者需要，YAGNI）。

### 3. 判别：`instanceof AutoStore` 主、`__AUTO_STORE__` brand 兜重复包

`AutoStore` 已加实例字段 `__AUTO_STORE__: boolean = true`（`store.ts:90`，经 `super()` 子类如 `ReactAutoStore` 亦有）。判别 helper：

```ts
const isAutoStore = (x: unknown): x is AutoStore<any> =>
    x instanceof AutoStore ||
    (x !== null && typeof x === "object" && (x as any).__AUTO_STORE__ === true);
```

`instanceof` 为主；brand 兜本仓库已知的"双副本 autostore 致 instanceof 失灵"场景（见 bun workspace 自引用解析问题）。**未**采用 Symbol brand / `Symbol.hasInstance`——core 改动面更大，YAGNI，待 instanceof 实际命中重复包 bug 再升级。

### 4. `storeOptions` 透传（仅自建路径）；options interface 泛型化

`AutoTemplateEngineOptions` 加 `storeOptions?: AutoStoreOptions<State>`，**仅当第二参为裸状态（自建路径）**消费：`new AutoStore(state, options?.storeOptions)`。第二参为 AutoStore 实例时 `storeOptions` 被忽略（用户已自配）。

为让 `storeOptions` 与第二参推断的 `State` 精确联动，`AutoTemplateEngineOptions` **泛型化**：`interface AutoTemplateEngineOptions<State extends Dict = any>`。`默认 = any` 保所有现有裸用 `AutoTemplateEngineOptions`（无类型参）调用点不破。engine 的 `options` getter 返回类型顺带改 `AutoTemplateEngineOptions<State>`、构造参改 `Partial<AutoTemplateEngineOptions<State>>`（`engine.ts:52-59` 已对 TS2610 accessor override 专门处理，泛型化只加类型参、不动该逻辑）。

### 5. 第二参校验：静默兜空（不抛错）

**移除**现有 `if (!store || !(store instanceof AutoStore)) throw`（`engine.ts:91-93`）。`null` / `undefined` / 非对象经决策 3 判别为"非 store" → 走自建路径 → `new AutoStore(state)` → core 的 `state || {}` 兜成 `{}`（空 store）。**静默渲染空状态，不报错**；原始值/函数误传同理交由 core 处理。

### 6. x-slot child engine 顺带简化（修订 ADR-0006 决策 4）

ADR-0006 决策 4 / 实现注记现写 `new AutoTemplateEngine(this.el, new AutoStore({}))`（`slot.ts:128`，`slot.ts:1` 单独 `import { AutoStore }` 仅为这一处）。本决策后简化为 `new AutoTemplateEngine(this.el, {})`：child engine 自建 store 且 `_ownsStore = true`，`childEngine.destroy()` 经决策 2 自动销毁它——既删一处构造 + 一个 import，又使 child store 的 core 资源随 child engine 销毁而回收（child engine 此前 `destroy()` 不碰 store，空 store 残留虽小、但不再有"engine 建却不拥有"特例）。

**ADR-0006 决策 4 / 实现注记的 `new AutoStore({})` 字样、`slot.ts` 代码、`engine.ts` 注释与 import 一并于实现时同步**（本 ADR 仅记决策，不预改既有 ADR 正文以免与当前代码不符）。

## 被否决的方案

- **永不销毁 store（保持字面不变量）**：自建 store 的 computedObjects / 事件订阅 / Proxy 不回收，且"我给你裸对象、你建 store、却要我自己 destroy"反直觉。否决——改"谁建谁销毁"（决策 2）。
- **显式 opt-in（`options.destroyStore` / 独立 `engine.dispose()`）**：API 面变大，且自建路径的销毁语义本就确定（必销毁）、无需用户选。否决。
- **鸭子类型判别（`x.state && typeof x.watch === 'function'`）**：裸状态恰好有 `state`/`watch` 字段即误判，比 instanceof 更脆。否决。
- **Symbol brand / `Symbol.hasInstance`**：稳健但 core 改动面更大，YAGNI。否决——改实例字段 `__AUTO_STORE__` + instanceof（决策 3）。
- **`storeOptions` 松挂 `AutoStoreOptions<any>`**：零 ripple 但失与 `State` 的类型联动。否决——改 options 泛型化（决策 4）。
- **第二参硬校验抛错**：用户选定最大宽松——漏传/误传静默兜空 store、由 core 处理。否决（决策 5）。
- **形参改名（`store` → `state`）**：字段 `engine.store` 是公开契约，改名连带 churn 大于收益。否决——保留 `store` + 联合类型 + glossary 术语澄清（决策 1）。

## 后果

- ✅ **便利路径开箱即用**：`new AutoTemplateEngine(el, {count:0})` 直接可用，不必先 `new AutoStore`。
- ✅ **所有权自洽**：自建 store 随 engine 销毁、外部 store 不被 engine 碰——借用 vs 拥有语义清晰。
- ✅ **可配性保留**：自建路径经 `storeOptions` 仍可配 async computed / plugins / hooks；全控路径仍走"自建 store 传入"。
- ⚠️ **不变量措辞需更新**：`engine.ts:49` / `engine.ts:459-461` 的"绝不创建/销毁 store"须改为"外部 store 不碰；自建 store 归 engine 销毁"——实现时同步注释。
- ⚠️ **静默空 store 的可观测性**：漏传第二参不报错、静默渲染空——开发者排查需知此契约（glossary「种子状态」明示）。
- ⚠️ **`__AUTO_STORE__` 为实例字段**：裸状态对象**极小概率**自带 `__AUTO_STORE__: true`（双下划线保留约定）会被误判为 store——instanceof 为主已极大降低概率，接受。

## 待决（fast-follow）

- **Symbol brand 升级**：若 instanceof 重复包失灵在生产命中，core 改 `Symbol.hasInstance` / 品牌 Symbol。
- **静默空 store 的 dev 提示**：可选 `options.debug` 下对 `null`/`undefined` 第二参 `logger.warn`（不抛错）。
