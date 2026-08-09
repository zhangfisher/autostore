# 动作

## 概述

「动作（action）」是事件到状态变更的桥梁：在 `@click` 等事件里调用一个具名函数，由它改写状态、发起请求。动作统一拥有**生命周期事件**（pending / resolved / rejected），无论同步还是异步——这让全局 loading、错误提示、执行反馈都能声明式地接上。

## 注册动作

动作有两种注册方式：

### 全局动作（options.actions）

构造时传入，挂在 `engine.actions` 上，全模板可见：

```javascript
const engine = new AutoTemplateEngine(
    el,
    state,
    {
        actions: {
            save: async () => {
                engine.state.status = "保存中";
                await api.save();
                engine.state.status = "已保存";
            },
            remove: (id) => { /* ... */ },
        },
    },
);
```

运行时也可赋值（自动获得生命周期包装）：

```javascript
engine.actions.rename = () => { engine.state.user.name = "李四"; };
```

### 局部动作（`<script type="actions">`）

写在模板里的 `<script type="actions">` 注入**当前 scope 的局部动作**，沿 scope 父链优先命中：

```html
<div x-data="{}">
    <script type="actions">
        {
            toggle() { this.engine.state.local = !this.engine.state.local; }
        }
    </script>
    <button @click="toggle">切换</button>
</div>
```

::: warning 局部动作只 DOM 冒泡
局部动作**不进全局总线**（避免不同 scope 的同名局部动作串扰），只在 DOM 上冒泡。要进总线就用全局 `options.actions`。
:::

## 触发动作

```html
<!-- 无参：直接引用动作名 -->
<button @click="save">保存</button>
<!-- 带参：动作名(参数)，$event 拿事件对象 -->
<button @click="remove(item.id)">删除</button>
<button @input="onInput($event)">输入</button>
```

指令值若匹配「裸标识符」或「标识符(参数)」，优先当动作查找；否则当表达式求值（如 `count++`、`alert(1)`）。

## 统一生命周期

每个动作（无论同步异步）执行时都广播完整生命周期：

| 阶段 | 时机 |
| --- | --- |
| `pending` | 执行**之前** |
| `resolved` | 成功完成（同步立即；异步 `then`） |
| `rejected` | 抛错 / reject |

广播走**两个通道**（正交并存）：

- **总线**：`actions/<name>/{pending,resolved,rejected}`——全局消费者，可用通配订阅一批（如 `actions/*/pending` 做全局 loading）。
- **DOM 冒泡**：在触发元素上 dispatch `action:<name>` CustomEvent（`bubbles+composed`）——冒泡到祖先，供容器级聚合。

## feedback 修饰符（声明式反馈）

`.feedback` 为触发元素提供**声明式执行反馈**——动作 pending 时加 `pending` 类、resolved 加 `resolved` 类、rejected 加 `rejected` 类：

```html
<!-- 裸 .feedback：用默认反馈类 -->
<button @click.feedback="save">保存</button>

<!-- 自定义反馈类、目标、延时 -->
<button
    @click.feedback="save"
    x-on-options="{ feedback: { pendingClass: 'loading', resolvedClass: 'ok', at: 'self' } }"
>
    保存
</button>
```

feedback 捕获动作返回的 Promise 精确反馈，连点时用 generation 计数防陈旧覆盖。详见[x-on](./directives/x-on.md)。

## phase 修饰符与祖先聚合

监听**后代**触发的动作生命周期，用 `@action:<name>` 配合 `.pending` / `.resolved` / `.rejected` 修饰符按阶段过滤：

```html
<!-- 表单聚合内部任意 submit 动作：任一在跑则 form 显示提交中 -->
<form @action:submit.pending="onStart" @action:submit.resolved="onDone">
    <button @click="submit">提交</button>
    <button @click="submit">保存草稿</button>
</form>
```

`@action:<name>` 靠 DOM 冒泡聚合后代，依赖触发元素到祖先的冒泡路径——天然按 DOM 层级隔离，无需手动判断来源。

## demo

下面的动作是异步的（模拟保存）。点击后观察状态变化与生命周期日志——`pending` 在执行前、`resolved` 在完成后，均经总线广播。

<demo html="template/action/lifecycle.html"/>

---

动作系统讲完。接下来[指令类型](./directive.md)与[指令配置](./config.md)，或直接进入[指令](./directives/x-bind.md)。
