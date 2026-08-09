# 指令类型

## 指令是什么

指令是宿主元素上一个**属性声明的行为单元**。模板引擎识别三种前缀的属性：

| 前缀 | 形态 | 示例 | 归一化 |
| --- | --- | --- | --- |
| `x-*` | 全称指令 | `x-text` `x-if` `x-for` | 原样 |
| `:*` | 属性绑定简写 | `:class` `:title` | `x-bind:*` |
| `@*` | 事件绑定简写 | `@click` `@input` | `x-on:*` |

::: tip :class / :style 是 x-bind 的特例
`:class` / `:style` / `x-class` / `x-style` 没有独立指令类——它们在解析期归一化为 `x-bind` + `class` / `style` 参数，复用 `x-bind` 的五路分派。详见[x-bind](./directives/x-bind.md)。
:::

## 指令名由注册表决定

指令名由预设注册表 `presetDirectives` 的 key 标识（如 `text` / `if` / `for` / `on` / `bind`），**不是**类的 `Function.name`。当前已注册：`text` `html` `if` `for` `data` `bind` `on` `loading` `slot` `patch`。

## 一条声明的组成

```html
<button x-on:click.enter.once="submit"></button>
<!--       └┬┘ └─┬─┘ └─┬─┘ └─┬─┘ └──┬──┘ -->
<!--      指令名  参数  修饰符 修饰符  指令值(表达式) -->
```

- **指令名**：`x-on`
- **参数**：`click`（指令作用于哪个目标）
- **修饰符**：`.enter` `.once`（无值开关，注入为指令选项）
- **指令值**：`submit`（表达式或动作名）

参数、修饰符、指令选项的通用机制见[指令配置](./config.md)。

## 执行通道（用户视角）

指令分两类执行通道，了解这点有助于理解某些边界行为：

- **编译时指令**（`x-if` / `x-for` / `x-text` / `x-bind` 等）：在模板编译期变换结构或绑定，**指令属性会被剥除**，不出现在渲染 DOM 里。它们的响应式来源是 `scope.watch`，支持相对路径、`x-data` 局部变量、`x-for` 项。

- **运行时指令**（`x-loading`）：编译器「致盲」、**属性保留**在渲染 DOM，由 `MutationObserver` 在运行时驱动。响应式来源**只接受绝对路径**（运行时新增的 DOM 元素没有 scope 上下文）。

### 为什么需要 x-patch 哨兵？

`engine.patch(selector, updater)` 靠「模板元素 → scope」的正向桥定位运行元素。但**纯静态裸元素没有指令、没有插值，不会建 scope**，也就进不了正向桥——`patch` 找不到它。

`x-patch` 就是为这种情况准备的零副作用哨兵指令：它让一个裸元素成为 scope、进入正向桥，从而能被 `patch` 定位，除此之外什么都不做。

```html
<!-- 这个 div 原本是裸元素，加 x-patch 后即可被 engine.patch('#box', ...) 定位 -->
<div id="box" x-patch></div>
```

详见[动态模板](./patch.md)。

## 自定义指令

所有内置指令都继承自 `AutoTemplateDirectiveBase`。你可以编写自己的指令类，通过 `engine.directives.set(name, DirectiveClass)` 注册。自定义指令需声明静态元数据（`priority` / `kind` / `singleton`）并按通道实现生命周期钩子（`created` / `compile` / `destroy`，或运行时的 `mounted` / `unmounted`）。

::: info 进阶内容
自定义指令的开发细节（钩子契约、通道选择、选项消费）属于进阶主题，可在熟悉内置指令后参考源码 `src/directives/base.ts` 与内置指令实现。
:::

---

接下来逐个学习指令，从[属性绑定 x-bind](./directives/x-bind.md) 开始。
