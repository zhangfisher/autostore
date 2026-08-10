# 指令配置

## 概述

每条指令除了「指令值」（表达式），还可以通过三种写法配置行为：**属性参数**、**修饰符**、**指令选项**。本章讲清这套通用机制——它适用于所有指令，各指令文档的「配置」一节只列出该指令具体支持哪些项。

## 指南

### 三种配置写法

以 `x-on:click.enter="submit"` 为例，一条指令声明可同时包含三种配置：

```html
<button
    x-on:click.enter="submit"
    x-on-options="{ once: true }"
></button>
```

| 写法 | 形式 | 作用 |
| --- | --- | --- |
| 属性参数 | `x-on:click` 的 `click` | 指明指令作用于哪个具体目标（事件名 / 属性名） |
| 修饰符 | `.enter` | 无值开关，启用某项内置行为 |
| 指令选项 | `x-on-options="{ once: true }"` | 指令级配置对象，权威配置来源 |

#### 属性参数

指令名冒号后的标识。`x-on:click` 指事件类型 `click`，`x-bind:title` 指属性 `title`，`x-for` 无参数。参数是字符串，不带值。

#### 修饰符

指令名点后的开关项，**不带值**。多个修饰符可串联：`@click.enter.ctrl`。

#### 指令选项

`x-{name}-options="..."` 声明指令级配置对象，值用**宽松 JSON** 解析（见下文），必须是普通对象。

### 修饰符 = 指令选项的快捷写法

修饰符在解析期被**注入为同名的指令选项**（布尔 `true`）。因此二者等价：

```html
<!-- 修饰符写法 -->
<span x-text.hide="user.name"></span>

<!-- 等价的指令选项写法 -->
<span x-text="user.name" x-text-options="{ hide: true }"></span>
```

是否为某个开关提供修饰符快捷方式，由指令作者决定；但底层都走指令选项。

### 宿主选项 x-options

`x-options` 声明**元素级共享配置**，挂在宿主元素的 scope 上，供该元素上**所有指令**回退读取。它不是数据、不进入表达式视图，仅作配置。

```html
<!-- 该元素所有指令都能经回退读到 { empty: '暂无' } -->
<span x-options="{ empty: '暂无' }" x-text="stock"></span>
```

### 两层回退

读取某个配置键时，按固定顺序查找：

1. **指令选项**（`x-{name}-options`，含解析期注入的修饰符）
2. **宿主选项**（`x-options`）

**关键：缺失才回退，不做合并、不做覆盖。** 指令选项里显式写了某个键（哪怕 `false`）就命中、阻断回退；两层都没有返回 `undefined`。

<demo html="template/config/options.html"/>

```html
<!-- 1) 仅宿主选项：stock 为空时回退读到 x-options 的 empty -->
<span x-options="{ empty: '（宿主占位）' }" x-text="stock"></span>

<!-- 2) 指令选项直接给值：覆盖式，不走回退 -->
<span x-text="score" x-text-options="{ empty: '【指令占位】' }"></span>

<!-- 3) 两者并存：指令选项命中，宿主被阻断 -->
<span x-options="{ empty: '宿主' }" x-text="count" x-text-options="{ empty: '指令' }"></span>
```

### 宽松 JSON

`x-*-options` 的值用宽松 JSON（relaxed-json）解析，比标准 JSON 宽容：

```html
<!-- 键名可不加引号、单引号字符串、尾逗号 -->
<span x-text-options="{ empty: '暂无', emptyValues: [0,] }"></span>
```

::: warning 宽松 JSON 表达不了的值
`undefined` 会被解析成字符串 `"undefined"`，`NaN` 会解析报错。所以 `emptyValues` 只适合追加 `0` / `""` / `false` 这类 JSON 能表达的值；`null` / `undefined` / `NaN` 由默认集保证。
:::

### 动作内的 $options

在 `x-on` 的动作函数里，可通过上下文的 `$options` 读取聚合后的配置（按两层回退虚拟合并、零拷贝）。这对自定义反馈逻辑有用，详见[x-on](./directives/x-on.md)。

---

各指令支持的选项与修饰符见对应指令文档的「配置」一节。
