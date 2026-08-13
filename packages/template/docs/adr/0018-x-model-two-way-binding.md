# ADR-0018：x-model 双向绑定指令（阶段1）

- **状态**：Accepted
- **日期**：2026-08-11
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0007](0007-directive-options-and-modifiers.md)、[ADR-0010](0010-action-dom-bubble-event.md)

## 背景

现有 `:value`/`x-bind:value` 仅单向 state→DOM（`bind.ts` 注释明确「回写 state 须另用 x-model」），表单输入场景缺双向绑定。`bind.ts` 注释多处把双向绑定推迟给「未来的 x-model」，`presets/model.ts` 是空壳、未注册到 `presetDirectives`。

本 ADR 落地 `x-model` 阶段1：text-like 控件双向同步 + 防循环 + get/set 变换 + 修饰符。configManager 元数据驱动（字段元数据自动注入 input 属性）留待阶段2（ADR-0019）。

## 决策

### 1. Compile 通道（原拟 Hybrid，实现时降级）

设计阶段拟 Hybrid（scope 通道读方向 + observer 通道 `mounted` 挂 input 事件）。实现时发现 **Compile 通道足够**：

- 挂 `input` 事件在 `compile` 期即可（`el` 对象存在就能 `addEventListener`，元素插入 DOM 后事件自然触发）——不需要 observer 通道的 `mounted`；
- x-model **不响应 `setAttribute` 动态改值**（不需要 observer 通道的 `attrChanged`）；
- scope 相对表达式（x-for item / x-data 局部变量）是 scope 通道能力，Compile 同样具备（`scope.watch` + `collectDependencies` + `getContext`）。

故 `kind` 取默认 Compile（属性剥除，符合 x-model 不需属性保留的语义）。代价：运行时 `setAttribute("x-model", ...)` 改绑定值不生效——首版不支持，符合 KISS。

### 2. 读写方向术语钉死

- **getter（get）= state→DOM 变换**：把状态值加工成 DOM 显示值（如 IP 拆分 `value.split('.')[0]`）。
- **setter（set）= DOM→state 变换**：把输入值拆解写回一个或多个状态字段（如 `user.first=$value.split(',')[0]`）。

经 `x-model-options="{get:'...',set:'...'}"` 声明。**砍快捷属性** `x-model-get`/`x-model-set`——`getDirectives` 只识别 `-options` 后缀（ADR-0007），要支持 `-get`/`-set` 需扩展通用解析器，违背 KISS、价值不抵成本。

### 3. get/set 值形态：字符串 only，禁箭头函数

relaxed-json 不支持函数字面量。实测 `really-relaxed-json`：

```
{get:(v)=>v+1}             → {"get":"(v)=>v+1"}    // 箭头函数降级为字符串
{a:1+1}                    → {"a":"1+1"}           // 表达式也降级为字符串
{set:(v)=>{user.first=v}}  → FAIL                  // 语句块箭头函数直接解析失败
```

故 **get/set 值只能是字符串**，**禁箭头函数字面量**（表达式体降级为字符串后求值返回函数对象非值、语句块体直接解析失败）。两条正道，复用 x-on 的 `ACTION_RE` 分派（`name(args)?` 匹配走 action、否则走表达式）：

- **表达式**：固定形参 `value`(get) / `$value`(set)，`new Function(..., "with(scope){...}")`，`scope = binding.getContext()`（localScope+dataScope+state 聚合视图）。`$value` 取 `$` 前缀与 x-on 的 `$event` 对齐（「框架注入的特殊变量」）。
- **action 名**：`splitIp(1)` 等。**当前值自动作首参**（get 的 `value` / set 的 `$value`），括号内为追加参数；`this` = `AutoTemplateActionContext`（复用 x-on 的 el/data/scope/store/state/engine/$options，附加 `value`/`$value`）。

### 4. 防循环：flags + 实例级 `_selfWriting` 标志

双向绑定的循环风险：onInput 写 state → read 回调写回 DOM。虽程序设 `el.value` 不触发 input 事件（故无同步栈溢出），但 read 回调若把值经 getter 写回，会**立即覆盖用户刚输入的内容**（UX 灾难）+ 冗余写。故须识别「自己触发的 read 回调」并跳过。

- **flags**：写入经 `store.update(fn, { flags: -this.seq })`（与 syncer 范式一致，供 syncer/未来指令识别 x-model 的写入）。`seq = ++ModelDirective._seq`（类级静态自增，仿 `AutoStoreSyncer.seq`）。
- **`_selfWriting` 实例标志**：`scope.watch` 的 scheduler 合并模型不把 `operate` 透传给 listener（flush 时重新 `safeEval` 读当前值，无参 `update` 闭包），read 回调拿不到 `operate.flags`。故防循环用实例级 `_selfWriting`：onInput 置 `true` → read 回调检查命中则重置并 `return`（跳过自己触发的回写）。

> 语义与纯 flags 等价（只跳过自己触发的回写，其他 x-model 实例 / 外部写入的 `_selfWriting=false`，正常更新显示）。flags 设了但 x-model 自身用 `_selfWriting` 防循环——flags 仅供其他消费者（syncer 等）。这是 `scope.watch` 不透传 `operate` 约束下的折中；若未来扩展 `scope.watch` 透传 `operate`，可改纯 flags。

### 5. 绑定值语义与只读降级

- **简单路径**（`order.price`）：无 get/set 时读 `scope.watch(path)`、写 `setVal` 直通（快路径，绝大多数场景）。
- **表达式**（`user.first + ',' + user.last`）：读求值；写**必须**提供 set（否则不可逆）。
- **无 setter 的表达式/computed**：`logger.warn`（一次）+ 只读降级（state→DOM 仍工作，DOM→state 静默），**不抛错、不魔法猜左值**。

### 6. 修饰符：.number / .change / .trim

默认监听 `input` 事件：

- `.change` → 改监听 `change`（失焦触发）；
- `.trim` → 写前 `value.trim()`；
- `.number` → 写前 `Number(value)`，`NaN` 回退原字符串（不破坏；解决数字字段被字符串污染致计算属性失效的问题，如 `order.count` 写回 `"23"` 会让 `price*count` 拼接）。

写回管道顺序：`el.value` →(`.trim`)→ (`.number`)→ `$value` → set/直写。修饰符经 ADR-0007 注入为指令选项（`.number` ≡ `x-model-options="{number:true}"`）。

### 7. `:value` 冲突编译期报错

`:value`/`x-bind:value` 与 `x-model` 同元素 → `created` 内抛错（两者竞写 `input.value`）。确定性优先，不搞「谁后写谁赢」。区别于阶段2的属性注入冲突（显式 `:attr` 优先、抑制自动合成，不报错）。

### 8. 控件范围：text-like only（首版）

`<input>`（除 checkbox/radio 外所有 type）+ `<textarea>`，统一读写 `el.value`。checkbox/radio/select（数组收集 / checked 语义）延后——它们的「双向」是独立的收集语义，混进来会让首版指令主干分叉。

### 9. 初始：state→DOM 单向

mount 时 state 作真相源 → DOM。state 路径不存在（求值为 undefined）→ `logger.warn` + 不动 DOM（不回填，避免 DOM 污染 state 真相源）。

## 后果

- **正向**：text-like 表单字段双向绑定就绪（18 用例全过）；防循环可靠（用户输入不被 getter 覆盖）；get/set 复用 x-on 的 `ACTION_RE` + `AutoTemplateActionContext`，认知统一；`.number` 解决数字字段污染。
- **负向/限制**：动态改 `x-model` 属性值不支持（Compile 通道，首版有意）；checkbox/radio/select 不支持（阶段1）；get/set 不支持函数字面量（relaxed-json 约束，禁箭头）；防循环用 `_selfWriting` 而非纯 flags（`scope.watch` 不透传 `operate` 的约束）。
- **阶段2**：configManager 元数据驱动（`~` 前缀 + 编译期合成隐式 bind + 白名单注入 + name 默认路径）见 ADR-0019（待）。
