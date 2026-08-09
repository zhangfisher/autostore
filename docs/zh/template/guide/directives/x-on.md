# x-on 事件处理

## 概述

`x-on:event`（简写 `@event`）监听任意事件，触发一个**动作**（action）或求值一段表达式。它是交互的入口——动作里改写状态，状态变化再驱动界面更新。

```html
<button @click="save">保存</button>
<input @input="onInput($event)" />
```

## 快速入门

<demo html="template/on/basic.html"/>

```html
<button @click="inc">+1</button>
<button @click.ctrl="ctrlClick">Ctrl+点击</button>
<input @keydown.enter="onEnter($event)" />
```

指令值若匹配「裸标识符」或「标识符(参数)」则当**动作**查找（沿 scope 链：局部 `<script type="actions">` → `engine.actions`）；否则当**表达式**求值（如 `count++`、`alert(1)`）。详见[动作](../action.md)。

## 指南

### 基础事件与参数

```html
<!-- 无参：直接引用动作名 -->
<button @click="save">保存</button>
<!-- 带参：动作名(参数)，$event 拿事件对象 -->
<button @click="remove(item.id)">删除</button>
<input @input="onInput($event)" />
```

<demo html="template/on/basic.html"/>

### 修饰符

修饰符串联在事件名后，按类型分三类：

| 类型 | 修饰符 | 作用 |
| --- | --- | --- |
| option | `.once` `.capture` `.passive` | 合并进 `addEventListener` 第 3 参 |
| guard | `.self` `.ctrl` `.alt` `.shift` `.meta` `.exact` `.enter` `.esc` `.space` ... `.left` `.right` `.middle` | 组成 AND 链，任一不满足则短路 |
| wrapper | `.debounce` `.feedback` | 由外向内包裹整条管道 |

```html
<!-- 只触发一次 -->
<button @click.once="init">初始化</button>
<!-- 需 Ctrl + 点击 -->
<button @click.ctrl="adminOp">管理操作</button>
<!-- 回车键提交（input 上） -->
<input @keydown.enter="submit($event)" />
```

修饰符与指令选项等价：`@click.ctrl` 等同 `@click="fn" x-on-options="{ctrl:true}"`。

### .debounce 防抖

`.debounce` 让动作延迟触发、期间重复事件只算最后一次。延时经指令选项配置：

```html
<input @input.debounce="search" x-on-options="{ debounce: 300 }" />
```

### .feedback 执行反馈

`.feedback` 为触发元素提供**声明式执行反馈**——动作 pending 时加 `pending` 类、resolved 加 `resolved` 类、rejected 加 `rejected` 类：

<demo html="template/on/feedback.html"/>

```html
<!-- 裸 .feedback：用默认反馈类 -->
<button @click.feedback="save">保存</button>
<!-- 自定义反馈类、目标、终态延时 -->
<button
    @click.feedback="save"
    x-on-options="{ feedback: { pendingClass: 'loading', resolvedClass: 'ok', timeout: 1000 } }"
>
    保存
</button>
```

feedback 捕获动作返回的 Promise 精确反馈，连点时用 generation 计数防陈旧覆盖。详见[动作 · feedback](../action.md#feedback-修饰符声明式反馈)。

### phase 修饰符与祖先聚合

监听**后代**触发的动作生命周期，用 `@action:<name>` 配合 `.pending` / `.resolved` / `.rejected` 按阶段过滤——靠 DOM 冒泡聚合后代，天然按层级隔离：

```html
<form @action:submit.pending="onStart" @action:submit.resolved="onDone">
    <button @click="submit">提交</button>
    <button @click="submit">保存草稿</button>
</form>
```

## 配置

`x-on` 的指令值是动作名或表达式；修饰符与反馈等行为经指令选项配置（详见[指令配置](../config.md)）。

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `priority` | `50` | 绑定类指令 |
| `singleton` | `false` | 同一元素可声明多个不同事件（如 `@click` 与 `@input` 并存） |

## 注意事项

- **`singleton=false`**：同一元素可绑多个 `@event`（不同事件类型），互不影响。
- **修饰符是 AND 关系**：多个 guard 修饰符（如 `.ctrl.shift`）需同时满足。
- **表达式兜底**：动作名查不到时退化为表达式求值——`@click="count++"` 直接改状态也行。
- **feedback / phase 的完整语义**（同步异步统一、防陈旧、祖先聚合）见[动作](../action.md)。
