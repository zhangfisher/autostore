# ADR-0008：x-on feedback 修饰符（async action 执行反馈）

- **状态**：Accepted
- **日期**：2026-08-08
- **关联**：[ADR-0003](0003-engine-event-bus.md)（actions 域）、[ADR-0007](0007-directive-options-and-modifiers.md)（modifier 注入 options）、[x-loading.md](../x-loading.md)（ADR-008 字面量模式）、[x-on-action.md](../specs/x-on-action.md)

## 背景

async action 经 `engine.buildAction` 在注册时自动包装，触发时广播 `actions/<name>/{pending,resolved,rejected}`（见 [ADR-0003](0003-engine-event-bus.md) actions 域）。但 x-on 侧此前**无声明式反馈出口**——开发者要手写 `engine.on('actions/save/*', ...)` 订阅 + 手动 `classList.add`，模板里看不出"这个按钮点击后会反馈执行状态"。

需求（来自 `/grill-with-docs` 会话）：`x-on:click.feedback="submit"` 启用后，**自动**在宿主元素加 `pending`/`resolved`/`rejected` 类，并支持经 `x-on-options` / `x-options` 配置目标元素（`at`）、延时清除（`timeout`）、类名（`pendingClass` 等）、是否叠加 loading overlay（`loading`）。同时探索根据 action 返回结果做 UI 反馈的应用场景。

## 决策

### 1. 信号源：handler 返回值捕获（**非**全局事件订阅）

feedback 得知 pending/resolved/rejected 的信号源，是 **business handler 的返回值**（action 的返回值冒泡），**不是**订阅 `actions/<name>/*` 全局事件。

```ts
// on/eval.ts —— business 返回值冒泡（action 分支 + 表达式分支各 +1 return）
return (event) => {
    if (name) {
        const action = scope.getAction(name);
        if (typeof action === "function") {
            ...
            return action.call(ctx, ...args);   // ← 原返回值被丢弃
        }
    }
    ...
    return exprGetter(event, data);             // ← 原返回值被丢弃
};
```

理由：全局事件订阅有两个无法回避的硬伤——

- **串扰**：`actions/submit/pending` 按 **action name** 全局广播，且 payload **不带 el**（ADR-0003 明确"避免持 DOM 引用泄漏"）。页面上两个 `x-on:click.feedback="submit"` 按钮，点其一 → 两个都进 pending，feedback 无法区分是哪个按钮触发的。
- **同步 action 失效**：ADR-0003 明确"仅 async action（返回 thenable）广播；同步 action 不广播"。若 submit 是同步函数，事件根本不发，feedback 永远停在初态。

返回值捕获**精确到本次触发**：feedback wrapper 拿到的就是"这一次点击"对应的那个 Promise，与元素一一对应；同步 action 返回非 thenable → feedback 静默无效（符合"反馈只对耗时操作有意义"的直觉）。

> **全局 `actions/<name>/*` 事件保留不动**——它服务于**全局**消费者（全局 loading 条、错误 toast、可观测埋点），与 feedback 的**元素级精确**反馈正交。两者并存：buildAction 照常广播，feedback 额外在 handler 层捕获返回值。

### 2. feedback 是 wrapper 修饰符，且固定管道最内层

feedback 复用 ADR-0007 的修饰符三类（option/guard/wrapper），归为 **`wrapper`**：`apply(next, rt, cleanup)` 包裹 business，`const ret = next(event)` 拿本次返回值，若是 thenable 则驱动状态机。

**关键约束：feedback 必须是 wrapper 链的最内层**（最靠近 business）。因为 wrapper 是"由外向内包裹"，越内层越先拿到 business 的原始返回值。若 feedback 在 debounce 外层，`next(event)` 调的是 debounce 的 handler，其返回 `undefined`（setTimeout 异步，无法同步返回 Promise）→ feedback 拿不到返回值。

落地：给 `WrapperModifierDesc` 增加可选 `order?: number`（默认 `0`，越大越内层）。`OnDirective.created()` 对 `wrapperRts` 按 `order` 升序排序后再由外向内包裹。feedback 声明 `order: Infinity`（或大常数），保证无论用户书写 `.feedback.debounce` 还是 `.debounce.feedback`，feedback 恒在最内层。

```ts
// modifiers/feedback.ts
export default {
    name: "feedback",
    type: "wrapper",
    order: Infinity,        // ← 固定最内层，拿 business 返回值
    apply: (next, rt, cleanup) => { ... },
} as WrapperModifierDesc;
```

### 3. 状态机：pending 常驻，仅清终态类

```
idle ──(action 返回 thenable)──▶ pending(加 pendingClass，常驻)
                                   │
                           resolve │ reject
                                   ▼
                         resolved / rejected(加终态类，清 pendingClass)
                                   │
                             timeout > 0
                                   ▼
                                 idle(清终态类)
```

- **pending 常驻**：action 在跑多久，pending 类就显多久。**pending 不受 timeout 清除**——若 action 耗时 > timeout 就清掉 pending，UI 看起来像"没在跑"，与反馈初衷相悖。
- **终态类受 timeout 清除**：resolved/rejected 停留 `timeout` ms 后清除，回到无类状态。符合"成功闪一下绿、失败闪一下红"的常见 UX。
- **`timeout: 0`（默认）= 终态常驻**：终态类一直挂到下次 pending 触发时被清（pending 进入时清终态类 + 清终态计时器）。

### 4. 重入与防陈旧（generation 计数）

action 还在 pending 时再次触发（用户连点）：用单调递增的 `gen` 计数标记每次触发，`ret.then` 回调里校验 `my === gen` 才生效。新 pending 进入时 `gen++`，旧 Promise 的 resolve/reject 因 `my !== gen` 被忽略——避免"旧的慢 action 比 新的快 action 后 resolve，把终态类覆盖成旧结果"的竞态。

> 旧 Promise **不取消**（core 当前无 cancel 能力），它仍在后台跑；buildAction 的内部 `then` 照常广播 `actions/<name>/resolved|rejected`（全局可观测），只是 feedback 元素侧因 gen 不匹配而忽略。两者互不干扰。

### 5. 配置 Schema（FeedbackConfig）

经 `x-on-options="{feedback:{...}}"` 或宿主级 `x-options="{feedback:{...}}"` 提供（两层回退，ADR-0007 决策 3）。`.feedback` 裸修饰符 = 全默认（`options.feedback=true`）。

```ts
interface FeedbackConfig {
    /** 目标元素选择器。省略=宿主；普通串=宿主.closest(串)；'@'开头=document.querySelector(去@)。默认宿主 */
    at?: string;
    /** 终态类延时清除(ms)。0=不清(终态常驻，默认)。pending 类不受此影响 */
    timeout?: number;
    /** pending 类名，默认 "pending" */
    pendingClass?: string;
    /** resolved 类名，默认 "resolved" */
    resolvedClass?: string;
    /** rejected 类名，默认 "rejected" */
    rejectedClass?: string;
    /**
     * 是否叠加 loading overlay。false(默认)=仅类名；true=默认 overlay；对象=带配置的 overlay。
     * 叠加模式下，overlay 与类名同时生效（见决策 7）。
     */
    loading?: boolean | LoadingFeedbackConfig;
}

/** 透传给 x-loading 的配置（命令式 overlay 模式，不含 visible） */
interface LoadingFeedbackConfig {
    message?: string;
    bgColor?: string;
    color?: string;
    opacity?: number;
    delay?: number;
}
```

### 6. `at` 选择器：closest + @ 全局

- **省略** → 宿主元素 `this.el`；
- **普通串**（`'.form'`）→ `宿主.closest(串)`，从宿主（含自身）向上找祖先——适合给祖先容器加类（如 `form.submitting`），是反馈场景常见需求；
- **`@` 开头**（`'@#modal'`）→ `document.querySelector(去@)`，挂到宿主外/全局元素。

**与 x-loading 的 `selector` 对齐 `@` 前缀**（x-loading 的全局前缀也是 `@`），减少认知负担。区别：x-loading 的普通 selector 是 `querySelector`（向下找后代），feedback 的普通 `at` 是 `closest`（向上找祖先）——方向不同，因反馈"给容器加类"通常向上、loading"覆盖某区域"通常向下。

### 7. loading 复用：DOM 属性操控（叠加，非替代）

`loading` 开启时，feedback 在 `at` 元素上**命令式操控** `x-loading` 属性，由运行时 x-loading 指令负责 overlay 渲染：

```
pending:   target.setAttribute("x-loading", <cfg>)    // 显示 overlay
resolved:  target.removeAttribute("x-loading")         // 移除 overlay
rejected:  target.removeAttribute("x-loading")
```

**叠加语义**：`loading` 开启时，类名反馈**照常生效**（pending/resolved/rejected 类照加），overlay 是额外叠加。类名给 CSS 钩子（如 `.pending{opacity:.7}` 改按钮色），overlay 给遮罩，各司其职。**非互斥**——不因开了 loading 就抑制类名。

### 8. loading 配置对象 = x-loading 命令式 overlay 模式（零改动 x-loading）

`loading: { message, bgColor, ... }` 时，feedback `setAttribute("x-loading", JSON.stringify(cfg))`（cfg **不含 `visible`**）。这依赖 x-loading 的一个**已存在行为**：

> x-loading 的 `resolveLiteral` 把空 visible 当 `true`（为"裸 `x-loading` ≡ 显示"设计，见 [x-loading.md ADR-008](../x-loading.md)）；`parseObject` 会解析对象配置的 `message`/`bgColor`/`color`/`opacity`/`delay` 等字段。故无 `visible` 的对象配置 → `visible:""` → `resolveLiteral("")===true` → 带配置静态显示。

即 **x-loading 已支持「命令式对象模式」——属性存在即显示（用配置），属性移除即隐藏**。feedback 直接复用，**x-loading 零代码改动**。代价是 feedback 正式依赖 `resolveLiteral("")===true` 这个原为裸属性设计的副作用。

**契约稳定性**：经 [决策 9 的测试锁定] + 文档化（见后果），把该副作用升格为 x-loading 的正式契约"对象配置省略 visible = 命令式静态显示"。未来若重构 `resolveLiteral`，测试会守住这条行为。

## 被否决的方案

- **订阅全局 `actions/<name>/*` 事件**：串扰（同名 action 多元素同时亮）+ 同步 action 永不触发 + payload 无 el 无法按元素过滤。否决，改用返回值捕获（决策 1）。
- **事件 payload 加 el 标识 + 订阅时按 el 过滤**：违反 ADR-0003"payload 不带 el"决策；且 buildAction 在**注册时**包装，广播发生在 action 返回的 Promise 的 `then` 里，拿不到调用点的 el（el 在 `action.call(ctx)` 的 `this=AutoTemplateActionContext` 上，要透传到 then 回调较绕）。否决。
- **feedback 自渲染 overlay（内建轻量渲染）**：与 x-loading 双份渲染逻辑，违反 DRY。否决，改用 DOM 属性操控复用 x-loading（决策 7）。
- **显式 `imperative:true` 字段（小改 x-loading）**：契约更清晰、不依赖副作用，但核验后发现现有 `resolveLiteral("")===true` 已能工作，改 x-loading 是无谓成本。否决，改用隐式行为 + 测试锁定（决策 8）。
- **全态 timeout（pending 也计时清除）**：action 耗时 > timeout 时 pending 消失，UI 误示"没在跑"。否决，改仅清终态类（决策 3）。
- **loading 替代类名（互斥）**：丢失 CSS 钩子表达力（无法仅靠类名改按钮色而不上 overlay）。否决，改叠加（决策 7）。
- **per-action-name 类名映射（如 `loading:{submitMsg,saveMsg}`）**：把 feedback 变成 action 结果分发器，复杂度爆炸、YAGNI。终态类名统一（resolved/rejected），具体文案走 loading.message（pending 期间）。否决。
- **rejected 时在 overlay 显示 error 信息**：依赖 loading 配置对象扩展 + rejected 后 overlay 仍需显示（但决策 7 中 rejected 时 overlay 已移除）。当前 feedback 的 overlay 仅覆盖 pending 期；错误信息显示留作后续探索（YAGNI，核心类名+loading 已覆盖主场景）。

## 后果

- ✅ **声明式反馈**：`x-on:click.feedback="save"` 一行声明，自动加类/overlay，模板即文档。
- ✅ **精确无串扰**：返回值捕获确保每个元素只反馈自身触发的那次 action。
- ✅ **统一同步/异步**：同步 action 返回非 thenable → feedback 静默无效，无需特判。
- ✅ **DRY 复用 x-loading**：overlay 渲染单一来源，feedback 只管"何时显隐"。
- ✅ **配置入口零新建**：复用 ADR-0007 的 `options.feedback`（修饰符注入 + x-on-options + x-options 回退）。
- ⚠️ **管道返回值透传契约**：`eval.ts` business 须 `return`（+2 处）；`OnDirective` 的 guardWrapped 与所有 wrapper 须 `return next(event)` 透传。现有仅 debounce 一个 wrapper（其异步特性致返回 undefined，是已知例外，文档声明）。
- ⚠️ **wrapper 顺序敏感 → 引入 `order` 字段**：`WrapperModifierDesc` 增 `order?`，`OnDirective` 对 wrapperRts 排序。是对修饰符系统的小扩展（向后兼容，默认 0）。
- ⚠️ **feedback 正式依赖 `resolveLiteral("")===true`**：x-loading 的该副作用升格为契约，须加测试锁定（见实现注记）。
- ⚠️ **attrChanged 闪烁**：feedback 重入（gen++）时若再次 `setAttribute("x-loading", cfg)` 相同值，MutationObserver 仍触发 `attrChanged` → overlay teardown+remount 闪烁。feedback 须缓存"当前是否已 set"，相同状态不重复 set（见实现注记）。

## 实现注记（非架构决策，落地时遵循）

- **返回值冒泡点**：`on/eval.ts` 的 `createEvalHandler` 返回的闭包，action 命中分支 `return action.call(ctx, ...args)`、表达式兜底分支 `return exprGetter(event, data)`。`on/index.ts` 的 `guardWrapped` 改 `return business(eventObj)`；wrapper apply 返回的 handler 末尾 `return next(event)`（feedback 自身也透传，供外层 wrapper 或未来消费者用）。
- **feedback.ts 状态机骨架**：
    ```ts
    apply: (next, rt, cleanup) => {
        const cfg = resolveFeedbackConfig(rt.options.feedback); // true→全默认 / 对象→取配置
        const target = () => resolveTarget(rt.el, cfg.at); // 宿主/closest/@
        let gen = 0,
            termTimer: any = null;
        cleanup.cancel = () => {
            clearTimeout(termTimer);
            stripAll();
        };
        const enter = (cls) => {
            // pending 进入
            clearTimeout(termTimer);
            target().classList.remove(cfg.resolvedClass, cfg.rejectedClass);
            target().classList.add(cls);
            if (cfg.loading) setLoading(target(), cfg.loading); // setAttribute(x-loading, cfg)
        };
        const settle = (cls) => {
            // resolved/rejected 终态
            clearTimeout(termTimer);
            const t = target();
            t.classList.remove(cfg.pendingClass);
            t.classList.add(cls);
            if (cfg.loading) t.removeAttribute("x-loading");
            if (cfg.timeout > 0) termTimer = setTimeout(() => t.classList.remove(cls), cfg.timeout);
        };
        return (event) => {
            const ret = next(event);
            if (!ret || typeof ret.then !== "function") return ret; // 同步: 静默
            const my = ++gen;
            enter(cfg.pendingClass);
            ret.then(
                (v) => my === gen && settle(cfg.resolvedClass),
                (e) => my === gen && settle(cfg.rejectedClass),
            );
            return ret;
        };
    };
    ```
- **`resolveTarget`**：`at` 省略 → `el`；`at` 以 `@` 开头 → `document.querySelector(at.slice(1))`；否则 → `el.closest(at)`。`closest`/`querySelector` 未命中或非法 → 回退 `el` + `logger.warn`（与 x-loading selector 回退语义一致，健壮不中断）。
- **`setLoading` 防闪烁**：缓存 `currentLoadingAttr`，`setAttribute` 前比对——相同 JSON 不重复 set，避免 MutationObserver 的 `attrChanged` 触发 overlay teardown+remount 闪烁。pending→resolved 的 `removeAttribute` 总是执行。
- **`order` 排序**：`WrapperModifierDesc` 增 `order?: number`；`OnDirective.created()` 分桶后 `wrapperRts.sort((a,b) => (MODIFIERS[b.name].order ?? 0) - (MODIFIERS[a.name].order ?? 0))`（**降序**）。apply 语义是"把 current 包进新 handler、新 handler 在 current 外层"，故先 apply 的 wrapper 居内层；降序使 order 大者先 apply → 居内层。feedback(order=Infinity) 据此固定最内层。
- **x-loading 测试锁定**：在 `x-loading.test.ts` 用**初始** x-loading（`<div x-loading="{message:...}">` 无 visible）断言 overlay 挂载 + message，锁定 `resolveLiteral("")===true` 命令式契约；「移除即隐藏」由该文件 removeAttribute→unmount 既有测试覆盖。
- **测试隔离约束（happy-dom）**：原拟用运行时 `setAttribute`/`removeAttribute` 测命令式端到端，但 happy-dom 在**全量测试累积**下，运行时 `removeAttribute('x-loading')` 的 MutationObserver 回调严重滞后（>5s）致 flake。故 feedback 测试只验证自身职责（`hasAttribute` 证 setAttribute/removeAttribute 调用 + overlay 出现），不断言 overlay DOM 移除（归 x-loading unmounted 职责，由 x-loading.test.ts 覆盖）。生产环境 MutationObserver 为标准微任务，无此问题——纯测试隔离约束。
- **x-on-action.md / x-loading.md 文档**：x-on-action.md 增 feedback 小节指向本 ADR；x-loading.md 在 ADR-008 补注"对象配置省略 visible = 命令式静态显示（feedback 复用）"。
- **配置归一化**：`resolveFeedbackConfig(raw)`：`raw===true`/`undefined` → 全默认对象；`raw` 为对象 → 合并默认值（`at`/`timeout:0`/`pendingClass:"pending"` 等）。`loading` 字段 `true` → `setAttribute("x-loading","true")`；对象 → `setAttribute("x-loading", JSON.stringify(obj))`。
- **作用域**：feedback 是 wrapper，cleanup 经 `OnDirective.cleanups` 在 `destroy()` 时调 `cancel`——清终态计时器 + strip 所有 feedback 类 + `removeAttribute("x-loading")`，避免元素销毁后残留类/overlay。
