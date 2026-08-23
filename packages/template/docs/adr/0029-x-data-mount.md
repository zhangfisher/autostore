# ADR-0029：x-data 统一挂载机制（mount 选项 + 相对挂载 + .nearest）

- **状态**：Accepted
- **日期**：2026-08-23
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0007](0007-directive-options-and-modifiers.md)（指令选项体系，mount/nearest 的载体）、[ADR-0021](0021-x-scope-and-x-block.md)（占位 scope 概念）、[x-data.md](../../x-data.md)

## 背景

x-data 此前只有两种互斥形态：默认私有域（`_scopes.<id>`）与 `.global`（合并进根键）。需求起点是「`.global` 支持指定挂载位置」（如 `x-data.global` + `global:'x.y'`），grilling 中升级为统一模型：**x-data 的数据总要挂进全局状态树的某个容器，用一个 `mount` 选项统一指定挂在哪**——`global` 退为 `mount:""` 的布尔快捷方式，默认模式则是「挂在 `_scopes.<id>`」的特例。六轮 grilling 就选项命名、`.global` 行为边界、相对语法、步进语义、无效路径姿态、destroy 回收边界逐一裁决。

## 决策

### 1. 统一模型：`mount` 选项承载挂载位置，三形态归一

| 形态 | 写法 | 落点 | `scope._data` |
| --- | --- | --- | --- |
| 默认 | `x-data="{a:1}"` | `_scopes.<id>` | 指向该容器（现状不变） |
| 根 | `.global` ≡ `mount:""` | 根键 `state.a` | **不设——`.global` 完全保持现状**（Q4 用户裁决） |
| 路径 | `mount:'x.y'` | `state.x.y` | 指向挂载容器代理 |

- **命名**：`mount`（否决 `path`/`to`/`at`/`mountPath`）——`mount` 的挂载动作语义与「数据挂到哪」直觉直达，且不与 CONTEXT.md 既有「XX 路径」术语族撞名。
- **修饰符无参约束**（ADR-0007 继承）：`.mount` 修饰符只能注入 `mount:true`，携带不了路径字符串——mount **只有指令选项一种写法**；`.global` 保留为 `mount:""` 的唯一布尔快捷方式。
- **优先级与规范化**：`mount`(非空串) > `global` > 默认。mount 与 global 同写 → mount 胜出 + warn；`mount:""` ≡ 根；mount 非字符串（误写修饰符产生的 `true`）→ warn + 忽略回默认；`global` 带路径值（旧提案残留）→ warn + 按根处理。

### 2. `.global` 行为冻结：只挂根，不改 scope 任何行为

grilling Q4 用户裁决：**`.global` 不设 `_data`、`this.data` 不可用、`engine.data()` 行为不动、不加 warn**。曾提议统一为 `_data = store.state`（令 `this.data.theme` 可写、修掉 `engine.data()` 在 global 元素上误建私有域的陷阱），被否决——已交付行为不再变更，全局运行时修改维持「直接操作 `engine.state`」的既定姿势。mount 模式才是行为同构于默认模式的新形态（见决策 3）。

### 3. path 模式 `_data` 指向挂载容器（能力红利）

`scope._data = state.x.y`（响应式代理）→ 与默认模式**行为同构**：

- **双径读取**：声明子树内 `{{a}}` 直读（data 层进 `getContext`）；全树任意处 `{{x.y.a}}` 可读；
- **`this.data.a` 可写**（细粒度响应式）；**`engine.data(el,…)` 直接 merge 进容器**（不建私有域、不重建子树）。

这是统一模型的最大红利：默认与 path 的唯一差别变成「容器在哪」，开发者心智单一。

### 4. 写入 = merge；中间路径不存在自动创建；断裂降级

- **merge**：`Object.assign` 进容器，他人旧键保留（容器是共享容器）；**不做「先删消失键」**——旧键可能是他人数据，只有声明清单内的键归本指令管（回收也只删这些键）。
- **自动创建**仅对「不存在」生效：`mount:'x.y'` 而 `x` 缺失 → 逐级建出 `x:{y:{...}}`。
- **断裂**（存在但非对象，如 `state.x=5`）或**任一段是数组** → warn + **降级默认私有域**：数据不丢、子树 `{{a}}` 照常工作，只是没落到指定路径。绝不覆盖用户数据。
- **`mount:'_scopes.<id>'` 直指他域**：warn + **放行**（Q3 用户裁决，否决我的拒绝提案）——后果自负：目标 scope 销毁时整删条目，挂载数据被连带蒸发。

### 5. 相对挂载语法：`/` 分隔段，`..` = 直接父，无容器则创建

- **语法**：以 `.` / `..` 开头、段间 `/` 分隔（`'./x'`、`'../settings/theme'`）——与 x-teleport 同构，规避 `..` 与状态路径分隔符 `.` 的字符冲突（`"../theme"` 若按 `.` split 会碎成空段）。绝对路径仍是 `.` 分隔。
- **基准点**：`./x` = 自身容器下；每级 `..` = **直接父 scope**（不跳层，Q2-Round5 用户裁决）；越顶（超出链顶）= 落根 `state.<段>`（与 x-teleport 越界到 body 同构）。
- **无容器则创建**（Q1-Round5 用户裁决）：`./` / `..` 命中的 scope 无 `_data` → 就地创建空私有域（`_scopes[pid]={}` + 设 `_data` + `invalidateScopeView()`，复用 `engine.data()` 先例），含 x-for item scope（数据随 item 生死）。曾提议「跳过无数据祖先找最近容器」被否决——确定性差；该语义后经 `.nearest` 作为显式 opt-in 拿回（决策 6）。
- **nearest 命中 path 模式祖先**：挂到其挂载容器下（非 `_scopes`）——目标 scope 的 DataDirective 已解析 mountSegments，直接拼段。

### 6. `.nearest` 修饰符：`..` 按最近数据祖先步进（显式 opt-in）

`.nearest`（≡ `nearest:true`）改变每级 `..` 的步进单位：从「直接父 scope」变为「最近的持有 `_data` 的祖先 scope」（跳过 x-if/x-for/x-scope 等占位元素）。

- `./x` 仍指自身容器（两模式共享语法，仅 `..` 步进粒度不同——Round6 Q2 用户选 A，否决「`./` 在 nearest 下漂移为向上找」的字面直译）；
- 上溯途中再无数据祖先 → 落根（不降级、不创建）；
- 配绝对路径：无相对段，静默忽略（它是解析策略开关，不是独立断言，不值得 warn）。

### 7. destroy 回收：键级 CAS + 删空向上回收 + 运行时键残留

1. **键级 CAS**：删「初始声明注入、且当前值仍 === 自己末值」的键（被后写者覆盖的键保留）——沿用 `.global` 既有机制，双 scope 挂同一路径时 merge 覆盖 + warn，先销毁者不误删；
2. **删空向上回收**：键删完后容器若变空对象 → 连同路径上变空的中间容器逐级向上删（`x.y` 空 → 删 `y`；`x` 因此空 → 删 `x`）；容器内他人键残留 → 容器保留、停止上溯；
3. **运行时键不回收**：`engine.data()` 后来 merge 进容器的键不在声明清单（attachedKeys），视为用户接管，销毁后残留——三案（整删容器/CAS 追运行时键/残留）中残留最诚实。

## 被否决的方案

- **`global` 扩值承载路径**（`global:'x.y'`，原始需求形态）：割裂「容器在哪」与「是否全局」两个正交维度，`global` 值域变 `boolean | string` 脏类型；统一为 `mount` 后 `global` 退为纯布尔快捷方式。残留写法 warn + 按根处理。
- **选项名 `path`**：与 CONTEXT.md 既有「状态路径/配置状态路径/配置属性路径」术语族撞名（挂载点不是「读数据的路径」而是「数据的家」）；`to`/`at` 太隐晦；`mountPath` 冗长无先例。
- **`.global` 统一化 `_data = store.state`**：见决策 2——行为变更风险 > 收益，用户裁决冻结。
- **`..` 跳到最近持有容器祖先**（默认语义）：中间占位 scope 是否跳过不可预测（Round3-Q2 用户指出「容易有不确定」），改为「直接父 + 无容器则创建」的确定性语义；跳层诉求经 `.nearest` 显式 opt-in。
- **断裂时放弃挂载**（数据消失）：降级默认私有域更优雅——数据不丢、子树照常，只是没落到指定路径。
- **`mount:'_scopes.3'` 拒绝**：warn + 放行（用户裁决）——引擎不越权禁止，后果文档化。
- **引用计数判定「容器该不该删」**：多 scope 挂同一路径时追踪创建者成本高；「删空即删 + CAS」已覆盖绝大多数场景，唯一边缘（用户预建空容器被回收）可接受。

## 后果

- ✅ **单一心智模型**：「数据挂在哪」一个问题、一个选项回答；三形态行为差异收敛为「容器位置 + `_data` 是否设置」。
- ✅ **能力红利**：mount 模式子树直读 + 全树路径读 + `this.data`/`engine.data` 直写，与默认模式同构。
- ✅ **确定性**：`..` 永远是直接父；无容器就地创建；越顶落根——无隐藏跳层。
- ⚠️ **`_scopes.<id>` 依赖自增 id 的测试**：scope id 是类级静态自增（跨 engine 不重置），测试断言私有域路径须经 `findScopeByEl` 反查或预计算，不可硬编码。
- ⚠️ **相对挂载依赖编译期 scope 链**：x-for item scope 的 `..` 随 item 重建而变；挂载数据随 item 生死（文档化语义，非缺陷）。
- **交付**：`data.ts` 重构（29 用例 `x-data-mount.test.ts` 全绿、既有 25 用例回归通过）；`x-data.md`「指定挂载位置」小节；demo `data/mount.html`；CONTEXT.md「挂载 / Mount」「`.nearest`」词条。
