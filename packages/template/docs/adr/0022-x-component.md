# ADR-0022：x-block → x-component 组件系统升级

- **状态**：Accepted（已实施，625 测试通过）
- **日期**：2026-08-13
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0021](0021-x-scope-and-x-block.md)（本 ADR 承接其 x-block/x-scope 决策）、[ADR-0001](0001-directive-kind-system.md)、[ADR-0017](0017-x-html-compile-modifier.md)
- **共识来源**：grilling 四轮决策（约 30 个决策点），本 ADR 即共识落盘
- **扩展**：决策四-4.1「组件作用域 CSS 的响应式绑定（`bind()`）」——grilling 两轮 16 决策点（Q1–Q16）后续扩展，本 ADR 决策四-4 的能力延伸（仅落盘共识，未实施）
- **修订**：决策二-3「methods 独立机制 + Proxy this」——methods 从 action 剥离为独立机制（`scope.methods` + `getMethod` 组件边界）、this 改 Proxy（策略 C 规则 B）、钩子同步 Proxy、scope.data getter 化。**已实施**（详见决策二-3 修订记录）
- **修订2**：决策二-3 (10)「组件局部变量 `_locals`」——新增 `locals` 段（非响应式、不进聚合视图、仅 `this.x` 访问）；`scope.localData` 更名 `scope.locals`（x-for 容器，语义不变）。**仅落盘共识，未实施**

> **实施修订记录**：grilling 阶段决策七「定义 scope 链（defScopeMap/ComponentDef.parent/.components）」
> 在实施中经核查发现**可大幅简化**——`compileSubtree` 编译父组件快照子树时，内层 x-component 经
> `transformElement` 再次命中收集器，归属到**父组件实例 scope**（运行期 scope 链），天然实现嵌套私有子组件
> 的严格私有（U5=A），无需定义链。详见决策七实施修订。

## 背景

ADR-0021 建立了 x-block 命名模板块机制：编译期树变换收集冻结快照，消费者（x-loading 等）经 `getBlock` 沿 scope 链就近取用。x-block 是**声明性资源**（非渲染指令、不建 scope、不实例化），其空类 `BlockDirective` 注释明示"为未来在块根挂指令生命周期留落点"。

本次升级将"模板块"概念升级为"组件"，引入：

1. **全局组件 / 作用域组件**：`AutoTemplateEngineOptions.blocks` → `.components`（全局），x-component 声明作用域组件。
2. **`<script setup>`**：为组件提供数据、方法、生命周期钩子（仿 Vue `<script setup>`）。
3. **`scope.hooks`**：组件生命周期钩子集合（created/mounted/beforeUnmount/unmounted）。
4. **组件作用域 CSS**：`<style>` 默认限本组件（仿 Vue `<style scoped>`，属性后缀法）。
5. **x-use**：实例化组件的指令。
6. **x-import**：fetch 远程加载组件定义（含 `.global` 修饰符）。
7. **嵌套声明 + 递归**：组件内可声明私有子组件、可递归调用自身。

### 与本引擎架构的关键张力（驱动决策的核心约束）

- **引擎无组件实例缓存层**：scope 销毁即销毁（x-if eager 假销毁子树 scope+watcher，不可恢复）。故 Vue 的 `activated`/`deactivated`（依赖 `<keep-alive>` 实例池）在本引擎无自然触发点。
- **编译是同步遍历，fetch 是异步**：`<div x-import="url">` 要求远端组件定义，但编译遍历到该元素时组件尚未下载——编译时序死锁。
- **细粒度响应式，无组件整体重渲染概念**：每个 watcher 各自 flush，无统一的"组件级更新"节点。故 `beforeUpdate`/`updated` 无自然对应。

## 决策

### 一、命名与兼容（硬切，无别名）

| 现有 | 升级后 |
|---|---|
| `AutoTemplateEngineOptions.blocks` | `.components` |
| `scope.blocks` | `scope.components` |
| `scope.getBlock(name)` | `scope.getComponent(name)` |
| `engine.getBlock(el, name)` | `engine.getComponent(el, name)` |
| `engine._resolveGlobalBlock` / `_wrapGlobalBlock` / `_globalBlockCache` | `_resolveGlobalComponent` / `_wrapGlobalComponent` / `_globalComponentCache` |
| `x-block` 指令 / `BlockDirective` / `block.ts` | `x-component` / `ComponentDirective` / `component.ts` |
| compiler `_collectBlock` | `_collectComponent`，匹配 `x-component` |

**策略**：硬切，删除旧名，无别名。包在演进期（v1 需求 38 个、6 阶段规划），CONTEXT.md 已有"已废弃"先例，敢于硬切。消费者跟随：x-loading 改 `getComponent("loading")`；for.ts 的 x-empty 不走 getBlock，不受影响。

> **CONTEXT.md 术语冲突标注**：R5 决策放宽了 ADR-0021 决策 8 的「Default Block Uniqueness」约束（见决策四-4）。CONTEXT.md 的 `default 块唯一性` / `Default Block Uniqueness` 术语需标注"已放宽"。

### 二、组件核心契约

#### 1. 组件本质（与 x-block 收集机制同构）

编译期树变换标记（非渲染指令），剪枝后冻结快照挂最近祖先 scope 的 `components`。消费（x-use）时 clone + 编译实例化。`ComponentDirective` 仍是注册表里的合法名位（与 `BlockDirective` 同），实际收集在 compiler 前置 transformer。

#### 2. data 统一域，废弃 props（R1 / Q2）

- 组件 `data()` 返回值注入子 scope 的 `data` 域（响应式，指向 `store.state._scopes[id]`）。
- `x-use="{..}"` 传入值注入**同一个 data 域**。
- **合并顺序**：`data()` 先注入默认，`x-use` 后覆盖（外部优先）。后续响应式更新只覆盖 x-use 声明的键（`Object.assign(data, 新值)`），组件内部状态（用户交互改的）不被外部重置。
- **无独立 `this.props`**。`this.data` = 合并了 x-use 传入 + `data()` 的统一响应式域。

**理由**：data 域本就响应式（`getContext` set 陷阱透传到响应式代理），props 复用 data 即可，无需新增 `localScope`/`scope.props` 层。KISS。

#### 3. methods 独立机制 + Proxy this（修订原决策二-3）

> **修订记录（2026-08-13）**：原决策二-3「methods 注入 `scope.actions`、this 复用 `AutoTemplateActionContext`」
> 经重新评估修订——methods 定位为**组件内部方法**（与 action 是两种完全不同机制），从 action 容器剥离为
> 独立机制，this 改为 **Proxy**（策略 C），使 `this.xxx` 可直调任意 method、且与生命周期钩子的 this 统一。

##### (1) methods 从 action 剥离为独立机制

- methods 注入**新容器 `scope.methods`**（不再进 `scope.actions`），与 action（`scope.actions` / `engine.actions`）彻底分离。
- methods **不经 `buildAction` 包装**（不广播 `actions/<name>/*`、不冒泡 `action:<name>`）——这是 action 专属能力，与"组件内部方法"定位无关，天然不涉及。
- methods/action **契约分叉可接受**：两者是不同机制（methods=组件内部方法、this=Proxy；action=全局/局部事件处理、this=ctx），各自自洽。

##### (2) `getMethod`：沿链查找 + 组件边界（封装保证）

`scope.getMethod(name)` 沿 parent 链查找 method，**遇 `isComponent` 祖先 scope 查完 methods 即停**——以组件实例 scope 为边界，**禁止穿透到父组件**：

```
组件 A 内部元素调 method：button scope → A 实例 scope(isComponent) → 查 A.methods 命中 ✓
子组件 B 内部元素调 method：B 内部 button → B 实例 scope(isComponent) → 查 B.methods 无 → 停止（不穿透到 A）✓
```

**为何要边界**：若无边界，子组件能调到父组件 method——同一组件在不同父组件内行为不同（父 A 有 `save`、父 B 无），组件不可移植、行为不可预测。组件边界保证封装。

（对比 action：action 沿链查找合理，因 action 定位是跨组件复用的"事件处理器"，类比事件冒泡找 handler；methods 是组件私有方法，类比 class method 不穿透实例边界。）

##### (3) `createEvalHandler`：methods 优先分支

x-on 求值器（`on/eval.ts`）命中 name 后，**先查 methods（this=Proxy）→ 再查 action（this=ctx）**。methods 就近优先，符合"组件内同名时用组件自己的 method"。

##### (4) Proxy this（策略 C，规则 B：无 `$` 前缀，与 action ctx 对齐）

method 与生命周期钩子执行时 `fn.call(scope.getMethodThis())`，this 是懒构造缓存的 **Proxy**。Proxy get 陷阱暴露集合（白名单，明确边界）：

**数据与状态（读 + 响应式写）**：

| 访问 | 返回 |
|---|---|
| `this.data` | `getContext()` 聚合视图（localData + 组件 data 域 + state），响应式、可读可写 |
| `this.state` | `engine.state`（全局状态） |

**组件方法（本组件内，组件边界）**：

| 访问 | 返回 |
|---|---|
| `this.<method名>` | 组件边界内 `getMethod` 命中的 method（支持 `this.inc()` 直调、`this.other()` 互调，不穿透父组件） |

**订阅与读取**：

| 访问 | 返回 |
|---|---|
| `this.watch(expr, fn)` | `scope.watch`（订阅，watcher 随销毁自动 off） |
| `this.read(expr)` | `scope.read`（读当前值不订阅） |
| `this.getComponent(name)` | `scope.getComponent`（取组件快照，与模板能力对齐） |

**引用与导航**：

| 访问 | 返回 |
|---|---|
| `this.engine` | engine 实例（引擎门面，`this.engine.emit(...)` 广播事件等） |
| `this.scope` | 当前 scope 实例（需调 scope 原生方法时用） |
| `this.el` | 组件根元素 HTMLElement（DOM 操作） |
| `this.$parent` | 父组件实例的 **Proxy**（沿链最近 `isComponent` 祖先的 `getMethodThis()`；无父组件返回 null；见 (9)） |

**明确排除**（不暴露，引擎内部/脆弱/易误用）：`parent`/`children`（裸 scope 树结构，混杂组件与非组件 scope）、`directives`/`watchers`/`hooks`/`actions`/`methods`（内部容器）、`destroy()`/`compile()`（引擎生命周期方法）、`$children`（YAGNI，向下通信应经 props）。

**set 陷阱**：框架引用键（`data`/`state`/`engine`/`scope`）**禁止整体覆盖**（warn + 忽略）；字段写入（`this.data.count = 5`）透传到聚合视图（经其 set 陷阱到响应式域）。

**为何用 Proxy 而非直接挂实例属性**：
- Proxy get 陷阱让 `this.xxx` 对**任意 method 名**都成立（无需逐个挂实例），且 method 优先于 scope 原生——用户 method 名与 scope 原生方法同名时，用户 method 胜出（仅影响用户代码 this=Proxy），**不污染 scope 实例命名空间、不破坏引擎内部**（引擎内部 this=真实 scope，不经 Proxy）。
- 规则 B（无 `$` 前缀）：与现有 `AutoTemplateActionContext` 的 data/state/engine/scope 写法完全对齐，methods 与 action 取引用一致，学习成本最低。

##### (5) 生命周期钩子同步 Proxy

`_runHooks` 改用 `fn.call(scope.getMethodThis(), ...)`——钩子与 method 的 **this 完全统一**（同一 Proxy 对象）。钩子里 `this.inc()`、`this.data`、`this.fetch()` 等与 method 内写法一致，消除"钩子调 method 要 `this.scope.methods.xxx`"的反直觉割裂。

##### (6) 配套：scope.data getter 化

this=Proxy 后 `this.data` 经 get 陷阱返回 `getContext()`，但 scope 类成员原名 `data`（指向 `_scopes[id]` 响应式域）与新 getter 语义冲突。故：
- scope 类成员 `data` → **`_data`**（私有响应式域引用，引擎内部用 `this._data`）。
- 新增 `get data() { return this.getContext(); }`（聚合视图，供 Proxy get 与外部访问）。
- 8 处 `scope.data` 读写点改 `_data`：`engine.ts`（×4 `engine.data` API）、`compiler.ts`（×2 `injectComponentSemantics`/`injectInitialData`）、`data.ts`（×3 `DataDirective.applyLocal`）、`scope.ts` 内部（`getContext`/`hasLocalContext`/`getData`，×3）。

##### (7) `$event` 改用形参

this=Proxy 后，`this.$event` 失效（scope 无 `$event` 属性，`$event` 是每次事件动态的、无法做 scope 静态属性）。method 内取事件对象改用**形参 `$event`**（x-on 经 `argsFn` 仍注入，与 this 无关）。文档明确此约束。

##### (8) `.feedback` / loading 对 method 仍生效

`.feedback` 修饰符、loading overlay 的信号源是 `next(event)` **返回值捕获**（`feedback.ts`，非订阅广播事件），与 this 是 Proxy 还是 ctx 无关——method 返回 Promise 时 `.feedback` 照常工作，无缺口。

##### (9) `this.$parent`：跨组件向上访问（返回 Proxy，支持链式）

`this.$parent` 沿 parent 链找**最近的 `isComponent` 祖先 scope**，返回**它的 Proxy this**（`parentScope.getMethodThis()`，非裸 scope）；无父组件（已是顶层组件）返回 null。

- **返回 Proxy 而非裸 scope**：与 `this` 同构——`this.$parent.data`（聚合视图）、`this.$parent.someMethod()`（直调父组件 method）、`this.$parent.$parent`（祖父组件）写法与父组件内部 `this.xxx` 完全一致；且不暴露父组件的引擎内部字段。
- **支持链式向上多层**：`this.$parent.$parent.$parent...`（Proxy get 陷阱递归处理 `$parent` 键，每层沿链找下一级 isComponent 祖先），直到无父组件返回 null。
- **与"method 不穿透边界"不矛盾**（方向不同）：`getMethod` 的组件边界禁止**子组件 method 查找被动落到父组件**（被动继承的封装）；`$parent` 是子组件**主动显式**访问父组件实例（主动寻址，类似 Vue `this.$parent`）。两者并存自洽。
- **实现**：`getMethodThis` 的 get 陷阱特判 `$parent` 键——沿 parent 链找最近 `isComponent` 祖先，返回其 `getMethodThis()`（懒构造、缓存），无则 null。

##### (10) 组件局部变量（`_locals`，非响应式，不进聚合视图）

`<script setup>` 增 `locals` 段，声明组件实例的**非响应式局部变量**——定时器句柄、缓存、防抖标记等实例内部状态，**不应进响应式 data 域**（否则无谓触发更新），也不应被模板表达式读到。

```js
{
    locals: { timer: null, cache: {} },   // 非响应式局部变量
    data() { return { count: 0 } },        // 响应式数据
    methods: {
        start() { this.timer = setInterval(() => this.data.count++, 1000) },
    },
    beforeUnmount() { clearInterval(this.timer) },
}
```

- **存储 `scope._locals`**：实例级普通对象（非响应式）。`injectComponentSemantics` 注入 `def.setup.locals` 到 `scope._locals`。
- **访问 `this.<locals键>`**：Proxy this（getMethodThis）的 get 陷阱——method/data/framework key 优先级**高于** _locals，_locals 是最低优先级（局部变量被同名 method/data 遮蔽时静默）。set 陷阱：非 framework 键写入 _locals（实例级普通赋值，不响应式）。
- **不进聚合视图**：_locals **不纳入 `getContext`**——模板表达式 `{{timer}}`/`x-text="cache"` **读不到**组件局部变量。这是与 x-for `locals`（见下）的关键区别：组件 _locals 严格隔离（只有 `this.x` 访问），x-for locals 经聚合视图暴露给模板。
- **钩子可访问**：生命周期钩子的 this 也是 Proxy，`this.timer` 等经同一 get/set 陷阱读写 _locals（跨阶段共享非响应式状态的核心用途）。
- **浅合并**：多个 `<script setup>` 的 locals 浅合并到一个 _locals（同 methods 语义，后声明覆盖先声明）。
- **更名 `scope.localData` → `scope.locals`**：x-for 的 item/index 容器（原 `scope.localData`）更名为 `scope.locals`，**语义不变**（仍进聚合视图、沿 parent 链继承）。更名理由：与新 `_locals` 命名对齐，区分"模板可见的 locals（x-for）"与"组件私有的 _locals"。两者职责分离：
  - `scope.locals`（原 localData）：x-for 注入的 item/index，**进聚合视图**，模板表达式可见。
  - `scope._locals`（新增）：组件私有局部变量，**不进聚合视图**，仅 `this.x` 访问。

#### 4. `default` 唯一性放宽（R5=B）

同名组件直接归属同一 scope 时 **warn + 后者覆盖**（不抛错）。沿 parent 链就近覆盖不变。

**理由**：放宽约束，给开发者更大灵活性；warn 保留误写提醒信号。废止 ADR-0021 决策 8 的抛错语义。

### 三、生命周期钩子（scope.hooks，四阶段）

hooks 挂 `scope.hooks`，由 compileChild 实例化流程在四阶段触发：

> **this 统一（决策二-3 修订）**：钩子的 this **与 methods 统一为 Proxy**（`fn.call(scope.getMethodThis())`），
> 非原 `ComponentMethodContext`。钩子里 `this.data`/`this.inc()`/`this.scope` 等与 method 内写法一致。

| 钩子 | 触发点 | 用途 |
|---|---|---|
| `created` | 子 scope 创建 + data 注入后、`compile()` 前 | 初始化（建订阅、读初始 props） |
| `mounted` | `scope.compile()` 完成（子 DOM 子树构建完成） | DOM 就绪后操作 |
| `beforeUnmount` | `scope.destroy()` 开头（watcher 仍活） | 带状态的精确清理（注销监听/定时器） |
| `unmounted` | `scope.destroy()` 结尾 | 无状态收尾 |

**砍掉的钩子及理由**：

- `activated`/`deactivated`：引擎无组件实例缓存层（scope 销毁即销毁），无自然触发点。引入需自建实例池（成本失控，违背轻量定位）。
- `beforeUpdate`/`updated`：细粒度响应式，每个 watcher 各自 flush，无"组件整体重渲染"节点。强加语义空洞或需伪造概念。
- `beforeMount`：与 `created` 紧邻、冗余。

**mounted 语义澄清**：本引擎"编译即挂载"——`scope.compile()` 完成时子 DOM 已构建在父 DOM 树里（整棵树未必已插入 `document`）。`mounted` 定义为"子 scope 编译完成、DOM 子树构建完成"，而非 Vue 的"插入 document"。

### 四、`<script setup>` 与 `<style>`

#### 1. `<script setup>` 位置与合并

- 仅出现在 `x-component` 子节点。
- 多个则**按段分类合并**（R3=A）：多个 data 函数 → 实例化时依次调用合并返回值；methods 浅合并；同名 hooks 串行调用。

#### 2. 执行模型

`new Function('return ' + scriptText)()` 求值为对象字面量。**信任代码**（用户声明信任）。不采用 JSON.parse（methods/hooks 是真实函数对象，无法 JSON）或自建解析器（YAGNI）。

#### 3. 容错

语法错 / `new Function` 抛错 / 返回非对象 → `logger.warn` + 丢弃该 `<script setup>`，不阻断组件其余部分。与全局块解析失败的 warn 纪律一致。

#### 4. 组件作用域 CSS（属性后缀法，仿 Vue `<style scoped>`）

- 组件实例化时给**组件根 + 所有后代元素**打唯一 `data-cmp-{id}` 属性。
- `<style>` 文本每条选择器末尾追加 `[data-cmp-{id}]`（仿 Vue：仅末尾选择器加后缀，组件根也打属性让根上 class 命中）。
- **不支持穿透**（无 `:deep()`/`>>>`/`>>>`），纯隔离。YAGNI——真实需求出现再加（仅改写器一个额外规则，不影响架构）。
- 样式按**组件定义**缓存（同名 x-component 只改写注入一次），多实例共享，引用计数管理移除。
- 改写边界（实施时须逐一覆盖）：媒体查询（`@media`）、`@keyframes`、逗号选择器（`a, b`）、伪类伪元素（`:hover`、`::before`）。

#### 4.1 组件作用域 CSS 的响应式绑定（`bind()`）

在决策四-4 的 scoped CSS 之上，为 `<style>` 增加**响应式样式绑定**——在 CSS 声明值里写 `bind(expr)`，把状态/表达式动态注入为 CSS 变量。

```html
<div x-component="theme">
    <span class="lbl">文本</span>
    <style>
        .lbl {
            /* 纯路径：注入为 --color，随 theme.primary 变化 */
            color: bind("theme.primary");
            /* 表达式：注入为 --h{hash}，随 a+b 变化 */
            width: bind("a + b");
        }
    </style>
</div>
```

##### (1) 语法

- `bind(expr)` 或 `bind("expr")`——**引号可选**，二者等价。
- **仅作为整个属性值**——不允许嵌入复合值（如 `margin: 8px bind("gap")` 是非法的，会因 CSS 空白解析破坏而失效）。`bind()` 必须独占声明值位置。
- 参数是**任意表达式**（纯路径或 `a + b`），经 `scope.watch` 的表达式支路（`watchExpression`/`collectDependencies`）求值与依赖收集，复用现有响应式能力，零新增订阅机制。

##### (2) CSS 变量名派生（按表达式内容复用）

同一表达式在多处 `bind()` 共享**同一个变量名**——只 watch 一次、写一个变量值，多处 `var()` 引用共享（是本机制的性能与正确性基石）。

| 形态 | 判定 | 变量名规则 | 示例 |
|---|---|---|---|
| **纯路径** | 命中现有 `isSimpleStatePath` | `--{路径}`，`.`→`-`、`*`→`_`，其余原样 | `bind("order.style")` → `--order-style` |
| **表达式** | 非纯路径 | `--h{hash36}`（`h` 保证首字符非数字，满足 CSS identifier 合法性——`--` 后不能以数字开头，否则浏览器丢弃整条声明） | `bind("a+b")` → `--h1a2b3c` |

- 表达式 hash 采用**确定性短 hash**（FNV-1a，转 base36），同表达式同 hash（跨实例、跨 `<style>` 块一致）。
- 纯路径段**原样保留**（驼峰/下划线不转，如 `user.firstName` → `--user-firstName`）。注意 `isSimpleStatePath` 正则 `\w` 不含 `-`，故路径段含连字符（如 `order-foo.bar`）**不算纯路径**、走表达式 hash 分支——与 core 路径定义一致（含 `-` 的路径本就非"简单路径"，watch 时亦走表达式支路）。
- **不考虑**表达式 hash 变量名与纯路径变量名或用户自定义变量（如 `--my-color`）的冲突——罕见重叠可接受，文档提示即可（YAGNI）。

##### (3) 挂载位置与隔离

- 变量挂**本实例组件根元素**（`hostScope.el`）——每实例独立变量值，与 scoped CSS 的每实例独立 `data-cmp-{id}` 同构隔离。同名组件多实例响应各自 data，互不串扰。
- 改写后 CSS 形如：`.lbl[data-cmp-1] { color: var(--order-style, unset); }`——scoped 属性后缀（选择器隔离）与 bind 变量（值响应式）**正交并存**。

##### (4) 值归一化与 fallback（B1：固定 unset）

- 有效值（数字/字符串/布尔）→ `String(value)` 写入变量（数字 `100` → `"100"`，布尔 `true` → `"true"`）。
- `null` / `undefined`（含表达式求值失败的结果）→ **不写变量**（首渲不 set；变空时 `removeProperty`），CSS 改写时统一产出 `prop: var(--name, unset)`，走 `unset` 回退——为 CSS 提供**安全默认值**（无效值不影响布局）。
- **fallback 固定 `unset`，不可配**（bind 不开放第二参）。用户要自定义默认值/精细控制，用 `:style` 指令（bind 的职责仅是「值响应式」）。

##### (5) 解析时机（编译期）与改写器叠加（Q7=A 独立前置 pass）

- 新增 `extractStyleBinds(cssText)` 作为**独立前置 pass**：复用 scoped 改写器同款状态机（按 `{`/`}` 深度遍历、跳过注释），遍历声明体（选择器 `{ }` 内部），提取所有 `bind(...)`，产出 `{ rewritten, binds }`。
  - `rewritten`：`bind(...)` 已替换为 `var(--name, unset)` 的 CSS 文本；
  - `binds`：`Array<{ expr: string; varName: string }>` 清单。
- 随后把 `rewritten` 喂给现有 `rewriteScopedCss(rewritten, scopeId)`——**scoped 改写器零改动**，两步正交（bind 替换只动属性值区，scoped 只动选择器区）。
- **bind 清单全局去重**：跨组件内所有 `<style>` 块按 `expr` 归并，同表达式只一条记录（对应 Q2 复用语义）。
- **边界**：`@media` 内的 `bind` 递归生效（@media 是包裹、内部仍是普通规则）；`@keyframes` 的关键帧声明体（`from/50%/to`）**不提取 bind**（原样保留，无意义）。

##### (6) 实例化期建订阅（Q10 时序）

`instantiateComponent` 在**步骤 2（injectComponentSemantics）之后、步骤 3（compileSubtree）之前**遍历 `def.styleBinds`，对每个 bind 调 `hostScope.watch(expr, cb)`：

```ts
for (const b of def.styleBinds) {
    hostScope.watch(b.expr, ({ value }) => {
        if (value == null) rootEl.style.removeProperty(b.varName);
        else rootEl.style.setProperty(b.varName, String(value));
    });
}
```

- 须在 data 注入后（订阅首求值要读到完整 data），与「先注入 data 再编译子树」纪律一致。
- created hook 若在订阅后改 data，会触发 watcher 重求值并更新变量（响应式自动回流），无需特殊处理。

##### (7) 订阅生命周期（Q9：复用 hostScope.watch）

- bind 订阅**复用 `hostScope.watch`**——watcher 自动进 `scope.watchers`，随 `scope.destroy()` 统一 off，**零额外卸载接线**。这是关键正确性点：scope 通道的 watcher 生命周期已被 scope 统一管理。

##### (8) 容错（与现有 warn 纪律一致）

- 仅识别声明值 trim 后以 `bind\s*\(` 开头**且括号闭合**的形态，其余一律视为普通 CSS 值不处理。
- `bind()` 空参 → `logger.warn` + 该声明产出空值（`prop: ;`，即清除该属性效果）。
- 括号不闭合 / 双括号（`bind((x))`）→ 视为非 bind，原样保留不识别、不报错（CSS 原生容错纪律）。
- 表达式求值失败（路径不存在等）→ 走 `watchExpression` 现有 `safeEval` warn 兜底，变量不写（走 `unset` fallback）。

##### (9) 类型扩展

`ComponentDef` 新增字段（编译期提取、声明性清单、多实例共享只读、无实例状态）：

```ts
styleBinds?: Array<{ expr: string; varName: string }>;
```

无 bind 的组件该字段 `undefined`，实例化期跳过。

### 五、x-use 实例化指令

#### 1. 定位（Q3=A）

复用底层 `compileChild`/`recompileSubtree`，叠加 props 注入 + hooks 触发 + scoped CSS。x-html.compile 保持原位（消费 HTML 字符串、无组件语义）。

#### 2. 根元素语义（T4=B）：宿主被组件根替换

宿主所有属性复制到组件根：

- `class`：**合并拼接**（`组件根class + 宿主class`）。
- `style`：合并，冲突键**组件根优先**（组件内部样式不被宿主意外覆盖）。
- 其他属性：不覆盖（组件根已有则保留）。
- `x-use`、`x-component` 属性不复制（否则无限实例化）。

#### 3. props 响应式

x-use 属性值经 `scope.watch` 求值得对象，watcher 重求值时 `Object.assign(data, 新值)`（只覆盖声明键）。组件内 `{{x}}` 经 getContext 重读自动刷新，**不需重编译整个组件**。

#### 4. 异步占位（R6=B）

组件定义还在 fetch 时，x-use 宿主显示 **loading 态**（复用升级后的组件化 x-loading），就绪后替换为组件实例，首次渲染用最新 props。

#### 5. 与其他指令共存（U3）

- x-use + 任意结构指令（x-if/x-for/x-slot/x-switch/x-tree 等占子树）→ 编译期 warn + 拒绝。
- x-use + 非结构指令（x-show/x-on/x-bind/x-text/x-class 等）→ 允许，属性复制到组件根生效。

#### 6. 组件根建 scope

compileChild 内禀无条件 `new AutoTemplateScope`，组件根天然建 scope，无需额外声明 x-scope。用户冗余写 x-scope 静默无副作用（与 ScopeDirective 既有纪律一致）。

### 六、x-import 远程加载

#### 1. 异步模型（Q5=A）

`getComponent` 返回 `Promise<Component>`，x-use 异步渲染（先占位、组件就绪后填充）。编译同步契约不变，异步性收敛在 x-use 这一点。

> **实施风险**：`getComponent` 改返回 Promise 影响**所有现有消费者**（x-loading 同步调用 getBlock）。须给 getComponent 一个**同步快速路径**（组件已加载时同步返回）+ 异步路径（fetch 中），或核查各消费者能否接受异步。

#### 2. fetch 复用（Q6=A）

抽取公共 `fetchHtml(url, signal)`（与 x-slot remote 共用 fetch 逻辑），但**不复用** child engine 路径——x-import 解析 fetched HTML 里的 x-component 元素注册到**当前 engine**的组件表（全局或作用域）。

#### 3. 缓存（T6）

按 url 缓存 fetch 结果（engine 级 `Map<url, ComponentDefs>`），重复引用命中缓存。

#### 4. 循环依赖（T6）

检测到循环 import（A import B import A）→ warn + 中断该条链（不抛错，已加载的照常注册）。

#### 5. `.global` 修饰符

`x-import.global="url"`：加载全局组件（注册到 engine.components）；否则注册为作用域组件（最近祖先 scope.components）。

#### 6. 容错

fetch 失败 / HTTP 非 2xx → `logger.warn` + 该 x-import 组件视为未注册。与 x-slot remote 的 `_renderError` 纪律一致。

### 七、嵌套声明与递归（U4 / U5 / U6=B）

#### 1. 递归调用（T5=A）

组件模板内 `x-use="自身名"` 实例化自身，带**深度上限保护**（默认 100，可配），超限 warn + 停止。实例化时沿 scope 链向上统计同名组件实例化深度。

#### 2. 嵌套声明（U4 / U6=B，第一版完整实现）

A 定义内声明 B → B 是 A 的**私有子组件**。

#### 3. 嵌套私有子组件（运行期 scope 链承载，实施修订）

> **实施修订（2026-08-13）**：grilling 阶段原设计「定义 scope 链（defScopeMap/ComponentDef.parent/.components）」
> 在实施核查中发现**冗余**——经 `compileSubtree` → `compileOneChild` → `transformElement`，编译父组件快照
> 子树时，内层 `x-component` 会**再次命中 x-component 收集器**，归属到**父组件实例 scope**
> （`父实例scope.components`）。因父组件实例是 x-use 创建的独立渲染 scope，嵌套声明的子组件**仅在该实例
> 子树内可见**——运行期 scope 链天然达成严格私有（U5=A），无需第二条定义链。

机制（复用运行期 scope 链，KISS）：

```
x-use 实例化组件 A 时:
  1. compiler.instantiateComponent 编译 A 快照子树到宿主（宿主 scope 化身 A 实例 scope）；
  2. A 快照内嵌套的 <div x-component="B"> 经 transformElement 再次命中 _collectComponent；
  3. _collectComponent 沿 parentElement 向上找最近祖先 scope → 命中 A 实例 scope（编译期刚建、已入 templateScopeMap）；
  4. B 冻结快照存入 A 实例 scope.components → B 仅 A 实例子树内可见（严格私有）。
```

**严格私有**（U5=A）：嵌套声明的 B 仅对声明它的 A（及 A 的实例）可见，A 实例外查不到 B（getComponent 沿 parent 链向上，B 在 A 实例子树的 scope，外层祖先链查不到）。

**与原设计的关系**：结果完全一致（嵌套声明可用、严格私有），仅实现机制从「定义 scope 链」简化为「复用运行期 scope 链」——更简洁，符合 KISS，无需 `defScopeMap`/`ComponentDef.parent`/`.components` 等结构。

### 八、文档与规范同步

1. **CONTEXT.md**：术语 block→component 全面更新；新增组件层术语（组件 / `<script setup>` / scope.hooks / scoped css / x-use / x-import / 定义 scope 链 / 局部组件 vs 全局组件）；标注 `default 块唯一性` 约束已放宽。
2. **本 ADR**（0022）即组件系统决策记录。
3. **文档**：`docs/zh/template/guide/block.md` → `component.md`；新增 x-use/x-import 指南。
4. **demo**：`docs/demos/template/` 相关 demo 更新。
5. **测试**：`x-block.test.ts` → `x-component.test.ts`，重写覆盖全部新机制。
6. **响应式 style bind（决策四-4.1，后续扩展）**：CONTEXT.md 增「样式绑定」术语；`component.md` 增「响应式样式」小节；demo `docs/demos/template/component/style-bind.html`；`x-component.test.ts` 增 11 组（基础/纯路径名/表达式名/去重/实例隔离/coerce/求值失败/坏写法/卸载/scoped 共存/@media+@keyframes 边界）。

## 实施风险提示（须重点验证）

1. **定义链查找正确性**：双链查找（运行期 + 定义链）顺序须严格，否则递归/嵌套作用域泄漏。建议先写查找单元测试再实现。
2. **异步 getComponent 的传染性**：影响所有现有消费者（x-loading 同步调用）。须同步快速路径 + 异步路径，或核查消费者。
3. **scoped CSS 选择器改写边界**：`@media`/`@keyframes`/逗号选择器/伪类伪元素改写规则须逐一明确。
4. **属性继承与 dispatcher 交互**：宿主 x-show/x-on 复制到组件根后，dispatcher 是否仍正确派发（元素引用变了）须验证。
5. **响应式 style bind 改写边界**（决策四-4.1）：`@media` 内 bind 须递归生效、`@keyframes` 内不提取；bind 订阅须随 `scope.destroy` 正确 off（依赖复用 `hostScope.watch`，须验证不泄漏）；同表达式跨 `<style>` 块去重须只 watch 一次。

## 废止

- **ADR-0021 决策 8「`default` 块唯一性抛错」**：本 ADR 决策四-4 放宽为 warn + 覆盖。
- **x-block 指令名 / `blocks` / `getBlock` 全套术语**：本 ADR 决策一硬切为 component 体系。
