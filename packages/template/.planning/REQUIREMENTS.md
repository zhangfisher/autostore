# 需求规格 - AutoStore Template

## v1 需求

### 核心引擎

#### CORE-01: AutoRender 类初始化 API
用户可以通过 `new AutoRender(el, store, options)` 创建渲染实例。

**验收标准：**
- 接受三个参数：el（HTMLElement）、store（AutoStore）、options（配置对象）
- options 支持配置项：debug（调试模式）
- 构造函数不自动启动渲染
- 初始化失败时抛出清晰的错误信息

#### CORE-02: app.start() 方法
用户调用 `app.start()` 启动渲染引擎。

**验收标准：**
- 扫描模板中的所有指令
- 为每个指令建立响应式依赖
- 建立依赖后引擎进入活动状态
- 重复调用 start() 不产生副作用

#### CORE-03: app.stop() 方法
用户调用 `app.stop()` 停止渲染引擎。

**验收标准：**
- 移除所有 watch 监听器
- 停止所有 DOM 更新
- 状态变化不再触发 UI 更新
- 可以重新调用 start() 恢复

#### CORE-04: app.destroy() 方法
用户调用 `app.destroy()` 完全清理资源。

**验收标准：**
- 执行 stop() 的所有清理操作
- 移除所有由模板引擎添加的 DOM 元素
- 清理所有内部引用
- 实例无法再次使用

### 条件渲染

#### IF-01: x-if 指令 - 条件渲染
当表达式为 truthy 时渲染元素，为 falsy 时移除元素。

**语法：** `<div x-if="condition">...</div>`

**验收标准：**
- 条件为 truthy 时元素存在于 DOM
- 条件为 falsy 时元素不在 DOM 中
- 条件变化时自动添加/移除元素
- 支持嵌套 x-if
- 不支持与 x-for 在同一元素使用（抛出错误）

#### IF-02: x-if 性能优化
条件切换时高效复用元素。

**验收标准：**
- 条件从 false → true 时，重建 DOM 子树
- 条件从 true → false 时，移除 DOM 子树
- 移除时清理所有子元素的监听器和指令

### 列表渲染

#### FOR-01: x-for 指令 - 列表渲染
遍历数组并渲染模板。

**语法：** `<div x-for="item of items">...</div>`

**验收标准：**
- 正确解析 "item of items" 语法
- 为每个数组项克隆模板
- 支持基本类型数组（string、number）
- 支持对象数组

#### FOR-02: x-for key 属性
通过 key 属性标识列表项的唯一性。

**语法：** `<div x-for="item of items" key="item.id">...</div>`

**验收标准：**
- 使用 key 进行 diff 算法，最小化 DOM 操作
- key 重复时在开发模式发出警告
- 未指定 key 时使用索引作为 fallback
- 索引作为 key 时在开发模式警告

#### FOR-03: x-for 响应式更新
列表数据变化时高效更新 DOM。

**验收标准：**
- 新增项：追加到末尾
- 移除项：移除对应 DOM 节点
- 重新排序：复用 DOM 节点，仅调整顺序
- 替换项：更新内容而非重建

#### FOR-04: x-for 嵌套支持
支持嵌套的列表渲染。

**验收标准：**
- 支持至少 2 层嵌套
- 嵌套超过 3 层时发出性能警告
- 每层独立追踪依赖

### 内容绑定

#### TEXT-01: x-text 指令 - 文本内容
绑定文本内容到元素。

**语法：** `<span x-text="user.name"></span>`

**验收标准：**
- 将表达式的值设置为元素的 textContent
- 自动转义 HTML 特殊字符
- 表达式为 null/undefined 时显示空字符串
- 表达式变化时自动更新

#### HTML-01: x-html 指令 - HTML 内容
绑定 HTML 内容到元素。

**语法：** `<div x-html="content.html"></div>`

**验收标准：**
- 将表达式的值设置为元素的 innerHTML
- 不转义 HTML（允许渲染标签）
- 内容包含 `<script>` 标签时在开发模式警告
- 表达式变化时自动更新

### 显示控制

#### VISIBLE-01: x-visible 指令 - 显示/隐藏
通过 display 属性控制元素可见性。

**语法：** `<div x-visible="isActive"></div>`

**验收标准：**
- 表达式为 truthy 时设置 display: ''（默认值）
- 表达式为 falsy 时设置 display: none
- 元素始终存在于 DOM 中
- 保留原有的 display 值（除 none）

### 事件绑定

#### EVENT-01: x-click 指令 - 点击事件
绑定点击事件处理器。

**语法：** `<button x-click="increment()">Click</button>`

**验收标准：**
- 点击时执行表达式
- 可以访问 $event、$el、$store 上下文变量
- 可以调用 store 中的方法
- 表达式可以是函数调用或赋值语句

#### EVENT-02: x-input 指令 - 输入事件
绑定输入事件处理器。

**语法：** `<input x-input="value = $el.value">`

**验收标准：**
- 输入时执行表达式
- 可以通过 $el.value 获取输入值
- 支持 input、textarea、select 元素

#### EVENT-03: x-submit 指令 - 表单提交
绑定表单提交事件处理器。

**语法：** `<form x-submit="handleSubmit($event)">...</form>`

**验收标准：**
- 表达式可以调用 event.preventDefault()
- 默认不阻止表单提交
- 支持 $event 访问

#### EVENT-04: 通用事件语法
支持任意事件的绑定。

**语法：** `<div x-on:event="handler"></div>`

**验收标准：**
- event 可以替换为任意 DOM 事件名
- 支持事件修饰符的子集（可选）

### 属性绑定

#### BIND-01: x-bind 指令 - 属性绑定
绑定属性值到表达式。

**语法：** `<img x-bind:src="image.url">`

**验收标准：**
- 将表达式的值设置为属性值
- 表达式为 null/undefined 时移除属性
- 表达式变化时自动更新属性
- 支持任意属性名

#### BIND-02: 简写语法
使用 `:attr` 简写 `x-bind:attr`。

**语法：** `<a :href="url">Link</a>`

**验收标准：**
- 与 x-bind:attr 完全等价
- 正确解析冒号语法

#### BIND-03: 布尔属性
正确处理布尔属性（disabled、readonly、checked）。

**语法：** `<button :disabled="!isValid">Submit</button>`

**验收标准：**
- 表达式为 truthy 时添加属性
- 表达式为 falsy 时移除属性
- 属性值不需要为 true，仅存在即可

### 样式控制

#### CLASS-01: x-class 指令 - 对象语法
根据对象动态添加/移除类名。

**语法：** `<div x-class="{active: isActive, disabled: isDisabled}"></div>**

**验收标准：**
- 对象键为类名，值为条件
- 条件为 truthy 时添加类名
- 条件为 falsy 时移除类名
- 支持多个类名同时设置

#### CLASS-02: x-class 指令 - 数组语法
根据数组动态设置类名。

**语法：** `<div x-class="['class1', dynamicClass]"></div>`

**验收标准：**
- 数组项为字符串时直接添加
- 数组项为表达式时求值后添加
- 自动去重

#### CLASS-03: x-style 指令 - 对象语法
根据对象动态设置样式。

**语法：** `<div x-style="{color: textColor, fontSize: '14px'}"></div>**

**验收标准：**
- 对象键为 CSS 属性名（驼峰式）
- 对象值为样式值
- 值为 null/undefined 时移除样式
- 支持动态更新

### 异步状态

#### ASYNC-01: 异步计算状态反馈
为异步计算属性提供状态反馈。

**语法：** `<div x-if="asyncState.isLoading">Loading...</div>`

**验收标准：**
- 计算属性处于 loading 状态时返回 isLoading: true
- 计算属性完成时返回 isSuccess: true 和结果值
- 计算属性失败时返回 isError: true 和错误对象
- 状态变化自动触发更新

### 表达式系统

#### EXPR-01: 标识符访问
支持简单的标识符访问表达式。

**语法：** `user.name`, `items.length`

**验收标准：**
- 正确访问嵌套属性
- 自动追踪依赖的路径
- 依赖变化时重新求值

#### EXPR-02: 字面量
支持字符串、数字、布尔字面量。

**语法：** `'hello'`, `123`, `true`, `false`

**验收标准：**
- 字面量作为表达式直接返回
- 字面量不产生依赖

#### EXPR-03: 表达式安全性
限制表达式语法，防止代码注入。

**验收标准：**
- 只允许安全的表达式语法
- 不允许函数调用（除显式绑定的方法）
- 不允许赋值操作（除事件处理器中）
- 不安全的表达式抛出错误

### 性能

#### PERF-01: 细粒度更新
只更新受影响的 DOM 节点。

**验收标准：**
- 单个状态变更只更新相关元素
- 不重新扫描整个 DOM 树
- 使用路径索引快速定位指令

#### PERF-02: 初始渲染性能
初始渲染时间符合性能目标。

**验收标准：**
- 简单应用（< 100 个指令）初始渲染 < 20ms
- 中等应用（100-500 个指令）初始渲染 < 50ms
- 复杂应用（500-1000 个指令）初始渲染 < 100ms

#### PERF-03: 更新性能
状态变更的更新延迟符合性能目标。

**验收标准：**
- 单个状态变更的更新延迟 < 16ms（60fps）
- 批量状态变更的更新延迟 < 32ms
- 列表更新（< 100 项）< 16ms

### 开发体验

#### DEV-01: TypeScript 类型支持
完整的 TypeScript 类型定义。

**验收标准：**
- 导出完整的类型定义
- AutoStore 泛型参数正确传递
- 指令表达式支持类型推导

#### DEV-02: 错误提示
提供清晰的错误信息和警告。

**验收标准：**
- 无效指令名称时抛出错误
- 表达式语法错误时提供友好的错误信息
- 开发模式下提供警告（key 重复、深层嵌套等）
- 错误信息包含问题和解决建议

#### DEV-03: 调试模式
支持调试模式下的详细日志。

**验收标准：**
- options.debug = true 时启用调试模式
- 记录指令初始化日志
- 记录状态变更和更新日志
- 记录性能指标

### 包发布

#### PUB-01: 包结构
作为 monorepo 独立包发布。

**验收标准：**
- 包名：@autostorejs/template
- 支持 ESM、CJS、IIFE 格式
- 包含 TypeScript 声明文件
- 未压缩的 ESM 包体积 < 30KB

#### PUB-02: 集成测试
确保与 AutoStore Core 正确集成。

**验收标准：**
- 所有功能在真实 AutoStore 环境中测试
- 测试同步和异步计算属性
- 测试 watch 和事件系统
- 测试与 React 集成（可选）

## v2 需求（已推迟）

### 双向绑定
- **MODEL-01**: x-model 指令实现表单双向绑定

### 高级功能
- **SLOT-01**: 插槽系统支持
- **TRANSITION-01**: 过渡动画支持
- **TELEPORT-01**: Teleport 传送门支持

## 超出范围

以下功能明确不在 v1 范围内：

- **SSR 支持** - 仅浏览器环境
- **组件系统** - 保持指令级渲染
- **自定义指令 API** - v1 不开放
- **路由集成** - 不在模板引擎职责范围
- **旧版浏览器** - 仅支持现代浏览器

## Traceability

本需求文档将映射到 ROADMAP.md 的各个阶段。

---
*创建日期：2025-06-30*
*来源：PROJECT.md + 研究/FEATURES.md*
