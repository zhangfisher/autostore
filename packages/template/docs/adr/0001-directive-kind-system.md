# ADR-0001：指令类别（DirectiveKind）系统与执行通道分离

- **状态**：Accepted
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)

## 背景

现有 `AutoTemplateDirectiveBase` 的所有指令（含 `x-loading`）走**单一 scope/compiler 通道**：
`createDirectives` 实例化 → `created()`（建订阅）→ `compile()`（首渲）→ `destroy()`（清理）；
`compiler.removeDirectives(el)` 剥除**所有**指令属性。

需求出现两类职责迥异的指令：
- **编译时指令**（`x-if`/`x-for`）：编译期变换树，结果元素上不应残留。
- **运行时指令**（`x-loading`）：需**保留在结果元素**、允许 DOM API 改值/删除、并能在运行时动态生效（连原生 DOM API 塞进来的元素也要响应）。

二者触发源不同（编译/state 变化 vs 原生 DOM 变更），强行塞进单通道会产生**双通道重入**与**属性去留**的矛盾。

## 决策

### 1. 引入 `DirectiveKind` 静态类字段，区分两条执行通道

| Kind | 通道 | 编译期 | 结果元素属性 | 反应式来源 | 生命周期钩子 |
|---|---|---|---|---|---|
| `Compile`(0，默认) | scope 通道 | 建实例、变换树 | **剥除** | `scope.watch`（相对表达式） | `created`/`compile`/`destroy` |
| `Runtime`(1) | observer 通道 | **致盲**（不建 scope、不调 created/compile） | **保留** | `engine.store.watch`（绝对路径） | `mounted`/`unmounted` |
| `Hybrid`(2) | scope + observer 双通道 | 建 scope（`created`/`compile`/`destroy`）+ observer（`mounted`/`unmounted`） | **保留** | `scope.watch`（相对）；运行时新增元素无 scope → 仅生命周期 | `created`/`compile`/`destroy` + `mounted`/`unmounted` |

> `mounted()`/`unmounted()` 此前在 `base.ts` 声明但全库零调用（死代码）。本决策为它们确立了**唯一调用方 = observer 通道**。编译时指令不使用它们。

### 2. 运行时指令走纯 observer 通道（方案 A）

- **编译器对 runtime 指令致盲**：`createDirectives` 把 runtime 类指令从 scope 通道**过滤**；`removeDirectives` 按 kind 决定是否剥属性（runtime **保留**）。
- **observer 即 mount/unmount 检测器**：`childList add → mounted()`、`remove → unmounted()`、`attributes → 重绑定`。
- **反应式降级**：runtime 指令只能 `engine.store.watch(绝对路径)`，**不支持 scope 相对表达式**（运行时 DOM 新增元素无 scope 上下文）。这是方案 A 的已知代价。
- **marker class / 标识 relocated**：原先"编译期加类"的无副作用初始化，改由实例 `mounted()` 完成，保持编译器致盲、通道纯净。
- **混合元素无冲突**：`<div x-text="x" x-loading="y">` 两通道对同一元素独立工作。

### 3. `static initialize(engine)` / `static dispose(engine)` 对称钩子（所有 kind 通用，可选）

- **通用性**：对所有注册指令类（Compile/Runtime/Hybrid）调用，不限于 runtime。基类提供 no-op 默认——指令不需要类级初始化则零成本继承空实现，按需 override。
- **initialize**：engine 构造末尾（autostart compile 之后）对每个注册指令类调用一次；晚注册经 `DirectiveManager.set` 补调。典型职责 = runtime 指令连接 per-engine MutationObserver + 初始扫描 `[attr]` 元素、注入全局样式；编译时指令亦可借此做一次性类级设置。
- **dispose**：`engine.destroy()` 遍历已 initialize 的类调用 `Cls.dispose(engine)`。职责 = `observer.disconnect()` + 全部 live 实例 `unmounted()`。**对称、显式、引擎不侵入指令内部结构。**
- **幂等**：同一 (类, engine) 仅 initialize 一次（`DirectiveManager._initialized` 集合保证）。
- **多 engine 隔离**：observer 等 per-engine 资源存于指令类的 `WeakMap<engine, handle>`；禁止进程级全局 observer 状态。
- **命名**：小写 `initialize`/`dispose`，对齐库静态字段约定（`priority`/`singleton`/`ownsChildren`）。

## 被否决的方案

- **双通道 + 去重标记（Round 1 方案 B）**：静态元素走 scope、动态元素走 observer，需 dataset 去重。复杂度高、去重易漏。
- **单 observer + scope 回溯（Round 1 方案 C）**：每元素 O(树深) 查 scope，运行时元素常无 scope。复杂度中等但收益不稳。
- **WeakMap + FinalizationRegistry 回收（Round 2 方案 C）**：依赖 GC、时机不定、引擎被引用则永不释放。脆弱。
- **engine 持有 runtime 注册表（Round 2 方案 B）**：静态钩子被引擎内部格式耦合，不对称。

## 后果

- ✅ `mounted`/`unmounted` 死代码复活，语义明确（仅 runtime）。
- ✅ x-loading 升级为 runtime：`Initialize` 建全局 observer，运行时动态生效（含 DOM API 增删改）。
- ✅ 默认 `kind=Compile` 保持所有现存指令行为不变（向后兼容）。
- ⚠️ runtime 指令放弃 scope 相对表达式——文档与测试需明确。
- ⚠️ `compiler.removeDirectives` / `createDirectives` 需按 kind 分流（实现工作量）。

## 待决（Round 4）
- ~~runtime 实例基类形状~~ → **已决：方案 C（单基类 + `RuntimeDirective` 接口）**。

## 已决：runtime 实例基类形状（方案 C）
- **单一 `AutoTemplateDirectiveBase`**：`binding` 改可选、`el` 与 `binding.el` 解耦（runtime 实例由 observer 注入 `el`）；新增静态 `initialize(engine)`/`dispose(engine)`、实例 `attrChanged?`。
- **`interface RuntimeDirective`**：`mounted`/`unmounted`/`attrChanged?`。Runtime/Hybrid 指令 `extends AutoTemplateDirectiveBase implements RuntimeDirective`。
- **与 Hybrid 的契合**：Hybrid = `extends AutoTemplateDirectiveBase implements RuntimeDirective` + `kind=Hybrid`——compiler 建 scope 走 created/compile/destroy，observer 同时驱动 mounted/unmounted。单基类方案让 Hybrid 自然落地（双基类方案下 Hybrid 无法同时继承两者，已否决）。
- **运行时判别**：以 `static kind` 为准（`Runtime`/`Hybrid`）；`implements RuntimeDirective` 仅编译期契约。

## 被否决（Round 4）
- **单立 `AutoTemplateRuntimeDirectiveBase`（方案 A）**：ISP 最纯，但 Hybrid 需同时继承两个基类，TS 不可行——与"保留 Hybrid"冲突。
- **共用基类 + binding 改可选、无接口（方案 B）**：胖接口，runtime 实例带一堆 undefined scope 字段 + 无意义的 created/compile。

## 实现注记（非架构决策，落地时遵循）
- **`DirectiveKind` 表示**：`const DirectiveKind = { Compile:0, Runtime:1, Hybrid:2 } as const` + 字面量联合类型。
- **observer 粒度**：建议 engine.el 上**单一共享 observer**（`{childList:true, subtree:true, attributes:true, attributeFilter:[所有 runtime 属性]}`），按变更的属性名分发到对应指令类——比"每类一个 observer"高效。
- **attributeFilter 重建**：晚注册 runtime 指令时需重建 observer 的 `attributeFilter`（或 disconnect + 重连 + 重扫）。
- **指令名 → DOM 属性名映射**：observer 匹配 `[x-loading]`（`x-` + name）；带 attr 的指令（如 `x-on:click`）runtime 形态另议。
- **attr-change 策略**：属性值变化时，优先 `attrChanged(newVal,oldVal)` 钩子（仅重绑 watcher，保留实例状态如 delay 定时器），而非 unmount+remount（会丢状态）。
- **共享资源归属（SRP）**：类级/文档级共享资源（如 x-loading 的全局 `<style>`）放 `initialize` 注入，**不放每个实例的 `mounted`**。`initialize` 内顺序固定：`injectStyles` → 建 observer → 初始扫描（否则首屏 FOUC）。`dispose` **不移除**文档级共享资源——双重理由：(1) 体量可忽略，回收复杂度（引用计数/最后移除）违背 KISS；(2) 多 engine 共享同一份 document 级样式，单 engine 的 dispose 无法判断"是否最后一个"，强行移除会误伤存活 engine。

## 已决议
- ✅ Hybrid 保留，采用**双通道定义**（scope 通道管反应性 + observer 通道管生命周期，职责不重叠无需去重）。
- ✅ `DirectiveKind` = const object + 字面量联合。
- ✅ Hybrid 唯一自洽用例：**包装命令式第三方组件**的指令（如 `x-datepicker`/`x-widget`）——scope 相对配置绑定 + 组件实例 mount/unmount 生命周期。当前仓库无此指令，作为未来口子保留。
