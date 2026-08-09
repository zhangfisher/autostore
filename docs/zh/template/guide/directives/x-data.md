# x-data 局域数据

## 概述

`x-data` 在元素上声明一份**局部数据**，供该元素子树的表达式读取。它把模板所需的临时状态就近放在一起，无需全部塞进全局 store。

```html
<div x-data="{ count: 0, tab: 'home' }">
    <span x-text="count"></span>
    <span x-text="tab"></span>
</div>
```

`x-data` 的值是**宽松 JSON 对象**（不是表达式），编译期一次性解析注入。

## 快速入门

<demo html="template/data/local.html"/>

```html
<div x-data="{ msg: '你好', times: 1 }">
    <p>{{ msg }}（第 {{ times }} 次）</p>
</div>
```

## 指南

### 默认模式：私有响应式域

默认（`x-data="{...}"`）把数据写入元素的**私有响应式域**（`store.state._scopes[scope.id]`）：子树可见、scope 间隔离，字段级细粒度更新。

<demo html="template/data/local.html"/>

```html
<div x-data="{ msg: '你好', times: 1 }">
    <p>{{ msg }}（第 {{ times }} 次）</p>
    <button @click="bump">+1</button>
</div>
```

### global 模式：合并进全局

`.global` 修饰符把数据**合并进全局 store 根键**，所有 scope 可见：

<demo html="template/data/global.html"/>

```html
<div x-data.global="{ theme: 'green', lang: 'zh' }">
    <p>主题：{{ theme }}，语言：{{ lang }}</p>
</div>
```

元素销毁时，global 模式会按 CAS 删除自己写入、且未被后写者覆盖的键。

### 嵌套覆盖

父子元素的 dataScope 经作用域链层叠，**子覆盖父同名键**：

```html
<div x-data="{ size: 'M' }">
    <!-- 读到 M -->
    <div x-data="{ size: 'L', color: 'red' }">
        <!-- 读到 L / red -->
    </div>
</div>
```

### 运行时更新：engine.data

`x-data` 仅在编译期注入一次，不监听属性变化。运行时改局部数据用 `engine.data(el, data)`——合并进该元素的私有域，路径订阅自动驱动更新：

```javascript
engine.data(el, { times: 10, tab: "settings" });
```

## 配置

| 配置项 | 形式 | 说明 |
| --- | --- | --- |
| 指令值 | `x-data="{...}"` | 宽松 JSON 对象（非表达式），编译期解析注入 |
| `.global` | 修饰符 | 合并进全局 store 根键（默认为私有域） |

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `priority` | `200` | 最高，保证数据先于兄弟指令的 watch 注入 |
| `singleton` | `true` | 同元素同名取最后声明 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **值是 JSON 字面量，不是表达式**：`x-data="{a:1+1}"` 不会求值 `1+1`，需直接写 `{a:2}`。运行时计算用动作改 state。
- **仅编译期注入**：`x-data` 不监听属性变化，运行时更新用 `engine.data(el, data)`。
- **局部数据隔离**：默认模式下各 scope 的私有域互不影响；要共享就用 `.global` 或全局 store。
- **永不整体替换私有域**：内部按字段 `Object.assign`，不要试图整体替换 `_scopes[id]`。
