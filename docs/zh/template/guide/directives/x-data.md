# 局域数据

`x-data` 在元素上声明一份**局部响应式数据**，供该元素子树的表达式读取。它把模板所需的临时状态就近放在一起，无需全部塞进全局 store。

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

### 私有响应域

默认（`x-data="{...}"`）把数据写入元素的**私有响应式域**（`store.state._scopes[scope.id]`）：子树可见、scope 间隔离，字段级细粒度更新。

<demo html="template/data/local.html"/>

```html
<div x-data="{ msg: '你好', times: 1 }">
    <p>{{ msg }}（第 {{ times }} 次）</p>
    <button @click="bump">+1</button>
</div>
```

### 全局合并

`.global` 修饰符把数据**合并进全局 store 根键**——所有 scope 可见，**不止声明它的子树**。任意独立子树、其他 `x-data` 私有域都能读到，改全局时所有订阅者同步更新。

<demo html="template/data/global.html"/>

```html
<!-- 声明处：theme/lang 合并进 store 根键 -->
<div x-data.global="{ theme: 'green', lang: 'zh' }">...</div>

<!-- 独立子树（未声明 x-data）也能读 —— 全局可见 -->
<div><p>主题：{{ theme }}</p></div>

<!-- 另一个 x-data 私有域：私有数据隔离，但仍能读全局 theme -->
<div x-data="{ local: '私有' }"><p>{{ local }} / {{ theme }}</p></div>
```

改全局直接操作 `engine.state.<键>` 即可（数据已在 store 根键）。元素销毁时，global 模式按 CAS 删除自己写入、且未被后写者覆盖的键。

### 嵌套作用域

父子元素的 data 经 `getContext` 的 parent 链层叠，读取时**就近命中**：

- **同名键覆盖**：子层声明的同名键覆盖父层——子读到自己那份，父层值不受影响。
- **未声明键继承**：子层没声明的键，沿 parent 链向上取最近一层的值（父 → 祖父 → … → 全局 state）。
- **写入命中本层**：`this.data.<键> = v` 只改本层 data 已有的键；本层没有则向上委托。

<demo html="template/data/nested.html"/>

```html
<div x-data="{ user: '张三', role: 'admin' }">
    <!-- 祖父层：user=张三  role=admin -->
    <div x-data="{ user: '李四', score: 88 }">
        <!-- 父层：user 覆盖=李四  role 继承祖父=admin  score 新增=88 -->
        <div x-data="{ score: 100 }">
            <!-- 子层：user 继承父=李四  role 继承祖父=admin  score 覆盖父=100 -->
        </div>
    </div>
</div>
```

::: tip 改某层只影响该层及后代的读取
点 demo 里「祖父级 · 改本层 user」只动祖父层，父/子层因已覆盖 user 而**纹丝不动**；点「父级 · 改本层 user」则子层（继承父）**跟变**、祖父层不变。这正是 x-data 作用域隔离的核心。
:::

### 运行时更新

`x-data` 仅在编译期注入一次，不监听属性变化。运行时改局部数据有两条路：

- **在动作内**（推荐）：直接写 `this.data.<键> = v`——AutoTemplateActionContext.data 的 set 陷阱透传到本层私有响应式域，触发细粒度更新。
- **命令式 `engine.data(el, data)`**：合并进 el 对应 scope 的私有域，路径订阅自动驱动。适合在动作之外（定时器、外部回调）更新。

<demo html="template/data/runtime.html"/>

```javascript
// 动作内：最简，直接写本层 data
bump: function () { this.data.times++; }

// 命令式：el 必须是挂 DOM 的 scope 元素（见下方警告）
engine.data(document.getElementById("block"), { times: 10 });
```

::: warning engine.data 的 el 不能是根挂载容器
`engine.data(el)` 靠 `_findScopeByEl(el)` 比对 `scope.el === el` 定位 scope。根挂载容器的 scope 绑在编译期的**内部克隆节点**上（engine 只把子节点挂回容器、容器本身的 scope 不进 DOM），传入根容器会命中不到、被静默忽略。el 必须是挂 DOM 的 scope 元素——含 x-data 的子元素，engine 构造后经 `getElementById` / `querySelector` 取到的即是 `scope.el`。
:::

## 配置

`x-data` 的指令值是宽松 JSON 对象（必填，非表达式，编译期解析注入）。下列配置项控制注入目标；带 ✅ 者可用修饰符方式启用。

| 配置项    | 默认值 | 修饰符 | 说明                                                       |
| --------- | ------ | ------ | ---------------------------------------------------------- |
| `.global` | 未启用 | ✅     | 合并进全局 store 根键；默认写入 scope 私有域 `_scopes[id]` |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **值是 JSON 字面量，不是表达式**：`x-data="{a:1+1}"` 不会求值 `1+1`，需直接写 `{a:2}`。运行时计算用动作改 state。
- **仅编译期注入**：`x-data` 不监听属性变化，运行时更新用 `engine.data(el, data)`。
- **局部数据隔离**：默认模式下各 scope 的私有域互不影响；要共享就用 `.global` 或全局 store。
- **永不整体替换私有域**：内部按字段 `Object.assign`，不要试图整体替换 `_scopes[id]`。
