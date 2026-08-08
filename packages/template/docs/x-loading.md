# x-loading 指令设计文档

> 本文档由 `/grill-with-docs` 会话沉淀。记录术语、API 规格、关键决策（ADR）与边界。
>
> **x-loading 是运行时指令（`DirectiveKind.Runtime`）**——走 observer 通道，属性保留在结果 DOM 上、
> 允许 DOM API 动态增删改、在元素 mount/unmount 时自动生效与回收。指令类别系统的完整背景见
> [ADR-0001 指令类别系统](./adr/0001-directive-kind-system.md) 与 [统一语言词表](./glossary.md)。

## 1. 术语表（Glossary）

| 术语 | 含义 |
|---|---|
| **宿主元素** | 声明 `x-loading` 的元素，覆盖层挂在其内部作为子节点 |
| **覆盖层（overlay）** | loading 指令创建的 `div.x-loading-overlay`，绝对定位充满宿主（或全屏） |
| **遮罩底色（bgColor）** | 覆盖层的背景颜色，默认 `black`；与 `opacity` 合成为半透明 `rgba` |
| **opacity（alpha）** | 遮罩底色的不透明度，默认 `0.5`；映射为 bgColor 的 alpha 通道，**非**元素 `style.opacity` |
| **loader 动画** | 覆盖层中央的旋转圆环（给定 CSS），颜色由 `color` 控制（默认灰 `#888`） |
| **message** | loader 下方可选文本，默认不渲染；存在时固定白色 |
| **visible 表达式** | 决定覆盖层显隐的**全局 store** 路径/表达式，truthy 显示、falsy 移除 |
| **字面量模式** | 裸 `x-loading` / 缺省 visible ≡ `true`；`"true"`/`"false"` 为特殊布尔字面量（非路径）→ 静态显隐、无订阅 |
| **快速绑定** | 字符串语法 `x-loading="isLoading"`：整个值即 visible 表达式，配置全默认 |
| **配置绑定** | 对象语法 `x-loading="{visible,message,...}"`：字段化配置 |
| **防闪烁（delay）** | visible 变 true 后延迟 N ms 才真正显示；延迟窗口内回 false 则不显示 |
| **运行时指令** | `DirectiveKind.Runtime`：编译器致盲（不建 scope），属性保留在结果 DOM，由 observer 通道驱动生命周期 |
| **observer 通道** | `static initialize` 在 engine.el 上建立的 MutationObserver，检测 `x-loading` 元素的 add/remove/attr-change，分别触发 `mounted`/`unmounted`/`attrChanged` |

## 2. API 规格

### 2.1 两种绑定语法

```html
<!-- 裸属性 / 字面量：静态显隐，不订阅状态 -->
<div x-loading></div>                       <!-- ≡ x-loading="true"，默认显示 -->
<div x-loading="true"></div>                <!-- 字面量 true：显示 -->
<div x-loading="false"></div>               <!-- 字面量 false：隐藏 -->

<!-- 快速绑定：值 = visible 表达式（全局 store 路径），全默认配置 -->
<div x-loading="order.isSubmit"></div>
<div x-loading="isLoading"></div>          <!-- isLoading 须为全局 store 状态 -->

<!-- 配置绑定：对象，visible 可省略（省略 ≡ true） -->
<div x-loading="{ message:'正在加载', bgColor:'white', color:'red', visible:'isLoading', opacity:0.5, delay:300 }"></div>
```

**值类型判定**（优先级从高到低）：
1. **字面量布尔**：空值（裸 `x-loading` / 配置缺省 visible）≡ `true`；`"true"` / `"false"`（大小写不敏感）为特殊布尔字面量，**非**状态路径 → 静态显隐、无订阅；
2. **配置绑定**：`this.value` trim 后以 `{` 开头 → `really-relaxed-json` 解析对象；
3. **快速绑定**：其余 → 整值作 visible 表达式（全局路径/表达式）。

> 直觉：**没说何时显示，就总是显示**。故裸属性、缺省 visible、`"true"` 都显示；`"false"` 隐藏；其余才按状态路径反应式控制。

> **⚠️ visible 只解析全局 store 路径/表达式**：x-loading 是运行时指令，无 scope 上下文，visible 经
> `engine.store.watch` 订阅。**不支持** x-data 局部变量、x-for item 等 scope 相对表达式。需要局部
> 状态控制 loading 时，请将该状态提升到全局 store，或改用编译时指令方案。详见
> [ADR-0001 §方案 A 反应式降级](./adr/0001-directive-kind-system.md)。

### 2.2 配置字段

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `visible` | string | — | **配置绑定必填**；visible 表达式（路径或表达式） |
| `message` | string | `undefined` | 可选文本；不传则不渲染文字层 |
| `bgColor` | string | `"black"` | 遮罩底色（任意合法 CSS 颜色） |
| `color` | string | `"#888"` | loader 动画色（任意合法 CSS 颜色） |
| `opacity` | number | `0.5` | 遮罩底色 alpha，`0~1` |
| `selector` | string | `undefined` | 覆盖层挂载目标选择器，默认挂宿主。普通值（如 `'#target'`）→ `宿主.querySelector`；以 `@` 开头（如 `'@#modal'`）→ `document.querySelector`；未命中/非法 → 回退宿主（见 ADR-009） |
| `delay` | number | `0` | 防闪烁延迟（ms）；0 = 立即显示 |

### 2.3 修饰符

| 修饰符 | 行为 |
|---|---|
| `.screen` | 覆盖层 `position:fixed;inset:0`，撑满视口；留在宿主子树（不 teleport） |

### 2.4 运行时行为（observer 通道）

x-loading 走 observer 通道，`x-loading` 属性**保留在结果 DOM 上**，可被 DOM API 直接操作：

```js
const el = document.querySelector('#h');
el.setAttribute('x-loading', 'otherLoading'); // 改绑到新表达式 → attrChanged 重绑
el.removeAttribute('x-loading');               // 删除属性 → 卸载实例、移除覆盖层
```

**observer 检测的三类变化**（在 `static initialize` 中建立，`engine.destroy` 时 `dispose` 断开）：

| 变化 | 触发 | 行为 |
|---|---|---|
| 元素/子树新增（含 `x-loading`） | `mounted()` | 解析配置 + 建全局订阅 + 首渲（静态元素由初始扫描同步挂载） |
| 元素/子树移除 | `unmounted()` | off 订阅 + 清 delay 定时器 + 移除覆盖层 |
| `x-loading` 属性值变化 | `attrChanged(newVal, oldVal)` | 拆旧绑定后按新值重绑（保留实例，不重建覆盖层以外的状态） |

**动态生效**：连用户用**原生 DOM API 塞进来**的 `<div x-loading>` 也会被 observer 接管——无需经过模板编译。
**属性保留**：编译结果元素上仍带 `x-loading` 属性（`el.hasAttribute('x-loading') === true`），便于外部读取/操作。
**生命周期自动回收**：宿主元素离开 DOM → 自动 `unmounted`；`engine.destroy()` → observer 断开、全部实例卸载，无泄漏。

## 3. 视觉决策（ADR-001）

### ADR-001：遮罩用 bgColor 的 alpha，而非元素 opacity

**背景** 需求同时出现「黑色/灰色/透明背景」与「opacity 默认 0.5」。

**决策** 覆盖层 = 半透明黑色遮罩（bgColor 默认 `black`、opacity 默认 `0.5`）。`opacity` 映射为 **bgColor 的 alpha 通道**（合成 `rgba(r,g,b,0.5)`），**不**设覆盖层元素的 `style.opacity`。

**理由** 若用元素 `style.opacity=0.5`，loader 动画与 message 文字一并被压暗；用背景色 alpha 则仅背景半透明，动画与文字保持清晰。这是 overlay 的正确写法。

**颜色解析** 提炼至 [`utils/colors.ts`](../src/utils/colors.ts)：`hex`(#rgb/#rrggbb/#rrggbbaa) / `rgb()` / `rgba()` / `hsl()` / 常用颜色名表。**不**依赖 `getComputedStyle`/canvas/`color-mix()`——实测 happy-dom 既不规范化 `getComputedStyle().color`（`"red"` 读回仍 `"red"`、`oklch` 被吞成 `"white"`），又把 `color-mix()` 当非法值丢弃，故手写解析以保证**生产浏览器与 happy-dom 测试行为一致**。未识别颜色 → 回退黑色。供复用：`parseColor` / `rgba` / `hexToRgb` / `hslToRgb` / `NAMED_COLORS`。

### ADR-002：loader 颜色用 currentColor 注入

**决策** 给定 CSS 的两处 `#ffa516` 替换为 `currentColor`；通过覆盖层 loader 元素 `style.color = color`（默认 `#888` 灰）注入。`-webkit-mask` 不含色调，原样保留。

**理由** `color:red` 时 gradient 两处自然变红，无需重建 CSS 文本；符合 `currentColor` 语义。

### ADR-003：message 默认不渲染、固定白色

**决策** 未传 `message` → 不创建文本节点；传了 → 渲染在 loader 下方，颜色固定白色，独立于 `color`（`color` 只管动画）。

**理由** 黑色遮罩上灰色/红色文字可读性差；白色保证可读。动画色与文字色解耦，各自可控。

## 4. 行为决策（ADR-004 ~ 009）

### ADR-004：false 移除 DOM，true 重建

**决策** visible=falsy → 覆盖层节点从 DOM 移除；truthy → 重建。符合需求原话「=false 时移除」。loading 通常低频切换，重建开销可接受，DOM 无残留、动画从 0 重启。

### ADR-005：.screen 用 fixed，不 teleport

**决策** `.screen` 覆盖层 `position:fixed;inset:0`，留在宿主子树；宿主元素移除时 observer 自动 `unmounted` 回收。

**权衡** 宿主祖先若有 `transform/filter/will-change` 会形成层叠上下文，使 fixed 失效（转相对该祖先）——这是已知限制，文档声明，不引入 teleport 的生命周期复杂度。

### ADR-006：不动宿主 position

**决策** 覆盖层用 `position:absolute;inset:0` 充满宿主，但**不**强制给宿主设 `position:relative`。若宿主为 `static`，覆盖层会定位到最近 positioned 祖先——**文档声明要求开发者保证宿主 position 非 static**。

**理由** 不破坏开发者既有布局；代码最干净。「自动充满」的承诺以宿主已 positioned 为前提。

### ADR-007：delay 防闪烁

**决策** 支持 `delay`（ms，默认 0）。visible=true → `setTimeout(delay)` 后才挂载覆盖层；窗口内 visible 变 false → 取消定时器、不显示。`unmounted`（元素移除 / engine.destroy）时清定时器。

### ADR-008：裸属性 / true / false 为字面量布尔，非状态路径

**背景** 用户期望 `<div x-loading>` 直接显示（无需绑定状态），且 `x-loading="true"`/`"false"` 能快速静态控制显隐。若把 `true`/`false` 当状态路径，会去 `state.true`/`state.false` 查值（几乎必然 undefined → 不显示），违反直觉。

**决策** visible 解析优先级：① 空值（裸属性 / 配置缺省）≡ `true`；② `"true"`/`"false"`（大小写不敏感）为字面量布尔；③ 其余走反应式全局路径/表达式。字面量模式静态显隐、**无订阅**。

**理由** "没说何时显示，就总是显示"符合直觉；保留 `true`/`false` 作特殊值而非路径，避免与极罕见的 `state.true` 键冲突（坏命名，不应鼓励）。配置缺省 visible 也默认显示，与裸属性语义统一。

**边界** 若确需监听名为 `true`/`false` 的状态键（不推荐），无法直接绑定——可用表达式包裹（如 `x-loading="!!stateTrue"`）绕过。

**派生：命令式 overlay 模式（feedback 复用）** 上述「空 visible ≡ true」有一处派生用途——对象配置**省略 visible** 时（如外部 `setAttribute('x-loading', JSON.stringify({message:'保存中', bgColor:'#000'}))`），`parseObject` 解析得 `visible:""`，`resolveLiteral("")===true` → **属性存在即显示、用配置渲染**；`removeAttribute('x-loading')` → 隐藏。此「命令式 overlay 模式」被 x-on 的 `.feedback` 修饰符（[ADR-0008](./adr/0008-x-on-feedback-modifier.md)）复用——feedback 在 pending 时 set 配置对象、resolved/rejected 时 remove，实现命令式 overlay 显隐而 **x-loading 零改动**。已测试锁定（`resolveLiteral("")===true`）+ 文档化为正式契约；重构 `resolveLiteral` 时测试会守住该行为。

### ADR-009：selector 指定覆盖层挂载目标

**背景** 有时 loading 应覆盖的不是声明 `x-loading` 的元素本身，而是其内部某个区域（如表格体），甚至宿主外的全局元素（如模态框）。

**决策** 配置增加可选 `selector`：
- 普通值（`'#target'`）→ `宿主.querySelector(selector)`，挂到宿主后代；
- 以 `@` 开头（`'@#modal'`）→ `document.querySelector(去@部分)`，挂到宿主外/全局元素；
- 未命中 / 非法选择器（querySelector 抛错）→ **回退宿主**，记 warn，不中断。

**理由** 宿主后代用 `querySelector`、全局用 `@` 前缀切到 `document`，覆盖"内/外"两类需求；回退宿主保证健壮性（selector 失效不致 loading 消失）。目标元素的非 static position 约定同 ADR-006（由开发者保证）。

**生命周期** 覆盖层是目标元素的子节点，但实例仍挂在宿主（x-loading 属性所在）。宿主移除 → observer 触发 `unmounted` → `overlay.remove()` 从目标处干净移除，无孤儿。

## 5. 指令元信息

| 字段 | 值 | 理由 |
|---|---|---|
| `kind` | `Runtime` | 运行时指令：走 observer 通道，属性保留在结果 DOM，由 mounted/unmounted/attrChanged 驱动 |
| `priority` | `0` | runtime 指令不走 scope 通道（编译器致盲），priority 不影响其执行；沿用默认值 |
| `singleton` | `true` | 一个元素只需一个 loading |
| `ownsChildren` | `false` | 不占有子树，可与 x-if/x-for 共存 |

## 6. CSS 注入

模块级标志 `stylesInjected`，在 `static initialize(engine)`（engine 初始化后调用一次）注入一次
`<style id="x-loading-styles">` 到 `document.head`，含 `.x-loading-overlay` 布局、
`.x-loading-loader`（currentColor + mask 动画）、`@keyframes`、`.x-loading-message`。

**为何放 initialize 而非每个实例的 mounted**：样式是类级/文档级共享资源，全模板共用一份；
initialize 恰是"每类、每 engine、一次"的钩子。initialize 内顺序固定 `injectStyles → 建 observer →
初始扫描`——扫描会同步触发 mounted 构建覆盖层，样式必须先就绪，否则首屏 FOUC。

**销毁不回收**：全局共享、跨 engine 常驻、体量可忽略（违背 KISS）；多 engine 场景下 dispose 不碰样式。

## 7. 覆盖层 DOM 结构

```html
<div class="x-loading-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:9999">
  <div class="x-loading-box">
    <div class="x-loading-loader" style="color:#888"></div>
    <div class="x-loading-message">正在加载</div>   <!-- 仅当有 message -->
  </div>
</div>
```
