# AutoStore

一个基于 Proxy 的响应式状态管理库：状态树的所有读写删除操作都被捕获为「操作(Operate)」，通过事件总线广播给订阅者，驱动计算属性与监听器。

## Language

**State（状态）**:
被 Proxy 包装的响应式对象树，所有变化都经操作事件对外通知。
_Avoid_: store data, model

**Operate / StateOperate（操作）**:
对状态某路径的一次原子变更描述，包含 `type`（get/set/delete/insert/update/remove/batch）、`path`、`value`、`oldValue` 等。是整个响应式系统的基本事件载荷。
_Avoid_: event, action, mutation（这些词保留给更上层概念）

**Operate Type（操作类型）**:
操作所属的变更族——对象族 `set`/`delete`，数组族 `insert`/`update`/`remove`，以及读 `get` 与聚合 `batch`。后代监听器收到的类型由「该后代路径实际发生了什么」推导，而非继承父操作类型。

**Watch（监听）**:
对一条或多条状态路径的订阅；当这些路径（或其子树，见「子树广播」）发生变更时回调。订阅路径支持通配符 `*`（一层）与 `**`（多层）。
_Avoid_: listener, observer（observer 另有含义）

**Depth（深度钻取）**:
`WatchListenerOptions.depth` 声明的"向后代钻取的深度"，补足通配符无法表达"自身 + 恰好一级后代"的空缺。实为三档语义而非连续深度：`0`（默认，仅自身被重新赋值）/ `1`（自身 + 恰好一级后代）/ `≥2`（自身 + 全部后代）。回调中的 `operate.path` 仍是真实发生变更的后代路径。详见 ADR-0003。
_Avoid_: drilldown（OLAP 术语，语境生僻）

**Observer（观察者对象）**:
挂载在状态树某路径上的动态值对象，分 computed（计算属性）与 watch 两种。拥有独立的生命周期与自通知机制，不参与子树广播。
_Avoid_: computed（computed 只是 observer 的一种）

**Broadcast / 子树广播（Subtree Broadcast）**:
发布端能力：对一条路径 `emit` 时，除精确命中自身外，同时唤醒该路径子树内**已订阅**的所有后代监听器（含通配符），并允许为每个后代改写其收到的操作。方向仅向下。用于修复「整体替换对象时后代监听器不触发」的语义缺陷。
_Avoid_: fan-out, propagate

**Peep（偷看）**:
在 `_peeping=true` 守卫下读取状态，抑制 `get` 操作事件，避免在监听器/广播回调内部读值引发无限循环。
_Avoid_: silent read, peek

**类型驱动转换（Type-Driven Conversion）**:
useField 的 input↔状态双向类型转换，以**状态值的 `typeof`** 为依据（而非对输入做启发式猜测）：number 字段字符串转数字（NaN 视为空值写 0）、boolean 字段 `'true'/'false'` 转 boolean、string 字段原样保持（`'0123'` 不被污染）；状态值为空值（`undefined`/`null`/`NaN`）时按控件类型推断，类型一经写入即自锁定。转换逻辑是 `toState`/`fromState` 的**默认实现**，开发者传入自定义函数即整体替换。
_Avoid_: 自动类型转换、类型强转（未体现“以状态类型为依据”）

**响应式对象身份（Reactive Identity）**:
从 store 读出的对象型状态是包装该原始对象的 Proxy（按 target 在 `proxyCache` 中缓存），其引用与原始对象永不相等。因此判别「当前状态是否为某对象」不能用 `===` 比较读出的值与原始引用——应以布尔/字符串等原始值作状态判据，或比较某个判别字段。
_Avoid_: 对象引用、原始对象引用

**Shallow 浅响应（Shallow）**:
`shallow(obj, deep)` 标记的对象值进入状态树后创建浅代理：顶层的读写与数组操作照常产生操作事件，但属性值不再递归代理——读出即为原始引用，直接修改其内部不产生任何事件。`deep`（仅 0|1 两档，默认 0）声明向下多代理一层：`deep=1` 时成员也获得浅代理（成员属性读写有事件、成员内函数照常建计算属性），孙级及以下读出即 raw；成员在首次经代理读取时惰性纳管。标记经内部 Symbol 键挂载、全局先到先得，不泄漏进序列化。用于大数组/大对象的性能特区。代理深度由此三分：深代理（默认）/ 浅代理（shallow）/ 不代理（markRaw）。
_Avoid_: 非响应式（那是 markRaw）、局部响应式、部分代理；deep ≠ watch 的 depth（那是监听器的钻取档位，见「深度钻取」）

**双值选项对（Pair Choices）**:
checkbox/switch 控件上 `choices` 键的专属语义：`[选中项, 未选中项]` 恰好两项、顺序有义——勾选时状态取第一项 value 并显示其 label，未勾选取第二项。它是 boolean 开关的双值化修饰，不是数据源。与选项类控件（select/radio/list/…）同键名的「候选项列表」语义无关。
_Avoid_: 候选项、多选项（那是 select/radio 的 choices 语义；checkbox 的 choices 是开关档位，写 3 项会被静默忽略）

**整体编辑（Whole-object Edit）**:
查看器行内编辑对**所有对象/数组节点**（含 configurable 容器与 markRaw 对象）的默认编辑形态：以 JSON 文本在多行文本域中整块读写（缩进 2 序列化，解析失败即校验报错且暂不写入，输入合法即整体替换写回）。configurable 容器照常渲染子节点，整容器与各成员均可编辑——整体编辑与成员编辑并存；声明 schema.widget 的容器按声明控件渲染。computed/function 叶子无编辑语义，不可编辑。
_Avoid_: JSON 编辑（那是形态不是规则）、批量编辑（那是跨节点操作）

**图标注册链（Icon Resolution Chain）**:
查看器节点图标的解析顺序：**slot 自定义 > 内置 > icon-url 拉取**。同名时自定义覆盖内置；未知名经 icon-url 模板批量拉取（一次请求多个，`not_found` 与请求失败均负缓存——会话内不重试，节点回落类型图标）。`schema.icon` 是节点身份视觉，不受 disable-schema 开关影响。icon-modify 仅给远程请求名追加风格后缀（home → home-outline），引用名不变。
_Avoid_: 图标下载、图标热替换（拉取结果注册后即与内置同权，非运行时替换机制）

**特性（Feature）**:
viewer 组件内一个可独立命名的关注点（图标链、store 绑定、树、列宽测量、编辑交互、toast、菜单开合……），一特性一文件一控制器，生命周期（挂载/卸载/更新）自治。特性经窄宿主接口（XxxHost）消费宿主与兄弟能力，不知晓彼此实现。渲染不是特性——它是组件本体的表意层，留在壳。
_Avoid_: 模块（太泛）、插件（widgets/ 的可注册扩展点才是插件形态）、服务（无依赖注入语义）

**编辑模式（Edit Modes）**:
查看器的三态编辑模式：**view**（只读）/ **click-edit**（双击值或点编辑按钮进入，单状态机管理）/ **edit**（叶子成员常驻编辑控件）。edit 常驻的值写回走**根事件委托**（控件不绑节点级监听），校验链与 click-edit 状态机共用；容器保持双击 JSON 整体编辑；常驻叶子的值类更新冻结树刷新，blur 不退出。编辑态的内置表单控件自动携带原生 `name`：`schema.name`（非空字符串）优先，否则用与行 data-path 同源的完整 store 路径；radio 以互斥组名优先（豁免）；编辑链路整体不受 disable-schema 门控（同 schema.icon 待遇），schema.toRender 自定义控件自理。
_Avoid_: 行内编辑（click-edit 与 edit 都是行内形态，模式名不描述形态）

**渲染模式（Render Modes）**:
查看器子树的两态渲染策略：**full**（默认）——全部节点常驻 DOM，折叠仅以 grid 行高收起（`1fr→0fr` 过渡）并 `inert` 封锁交互，编辑中输入/焦点随折叠保留；**lazy**——优化开关，维持「展开渲染、折叠自 DOM 移除」，**折叠与 full→lazy 切换丢弃未提交编辑**是其固有契约而非缺陷。`mode=edit` 恒为 full（显声明 lazy 被忽略并警告）；动画时长经 CSS 变量控制（设 0 即关闭）。
_Avoid_: 虚拟渲染、按需渲染（是 lazy 的机制描述而非模式名）

**值渲染钩子（Value Renderers）**:
查看器对 schema.toView/toRender 的渲染契约：**toView 管看、toRender 管改**——查看态 toView(value) 替代默认文本（优先于 choices 标签与格式化），编辑态 toRender(value) 替代默认编辑控件，值写回由自定义控件自理。返回三态（lit 模板 / HTML 字符串 / Node），受 disable-schema 门控，抛错回落默认渲染。widget=color/checkbox 有内置默认查看渲染（色块 / 只读勾选框）。
_Avoid_: 自定义组件（toRender 是值级渲染钩子，非组件注册机制）

**值装饰（Value Affix）**:
`schema.prefix`/`schema.suffix` 声明的值文本前后展示装饰（`¥5000`、`512 MB`），**不属于值本身**——状态值与编辑写回均为裸值。查看态只拼裸值层（toView 自定义渲染、choices 标签、range 迷你滑轨/color 色块等既有视图不拼）；编辑态在编辑外壳与控件并排显示；值为空不拼；受 disable-schema 门控（展示词汇家族，同 label/help）。form 文本系的同名键是拼接实现（状态值拼含前后缀、显示时剥离）——同名分野，语义以各消费方注释为准。
_Avoid_: 单位字段（单位进值）、form 前后缀拼接（那是 form 的值转换语义，值含装饰）

**Action（动作）**:
schema 声明的、附着在字段/节点上的**用户可触发操作**，三形态：button（按钮）/ dropdown（下拉菜单，items 含 "-" 分割线）/ image（图片按钮）。是「action 保留给上层概念」的那个正名——区别于 Operate（状态原子变更的事件载荷）：action 是交互入口，点击后经 `ctx.update` 产生 Operate。`onClick(value, ctx)` 的 value 是节点当前**状态值**（非输入值、非显示值）；`visible` 控制渲染、`enable` 控制可点（顶层与菜单项同语义）；悬停提示正名是 **tooltip**。点击同时派发 **`action` DOM 事件**（先于 onClick、cancelable 可拦截，detail={path, value, action}——path 与行 data-path 同源的完整 store 路径）。
_Avoid_: 操作（那是 Operate）、事件 handler（那是回调机制）

**Cron 方言（Cron Dialect）**:
`@autostorejs/form` cron widget 编辑的定制 cron 表达式：默认 **6 字段 `分 时 日 月 周 年`**，秒字段由配置属性启用（启用后为 7 字段 `秒 分 时 日 月 周 年`），表达式格式恒定，不因秒/年是否启用而增删字段。
_Avoid_: 标准 5 字段 crontab、Quartz 7 字段（本方言均不是）

**Cron 字段模式（Field Pattern）**:
cron 单个字段的编辑模式，恒为三选一：**不限**（`*`）、**间隔**（`X/N`，支持起始偏移）、**指定**（枚举多选，序列化时连续数字自动压缩为 `a-b` 区间，解析时展开）。不存在独立的「范围」模式。
_Avoid_: 范围模式（范围只是「指定」模式的序列化压缩形态）

**Cron 不限（Any / `*`）**:
某字段「不参与指定」的唯一表达，即 `*`。「启用某 tab」与「切到不限」是同一语义，UI 上合一，不引入字段剔除概念。
_Avoid_: 禁用、剔除字段

**Cron 周（Week Field）**:
周字段以 `1=周一 … 7=周日` 编码，解析兼容 `0`（视为周日）；UI 显示中文周一~周日。
_Avoid_: 0=周日 为首的编码（仅作为解析兼容输入）

**Cron 高级语法（Advanced Syntax）**:
UI 无法可视化表达的合法 cron 片段（`L`、`W`、`#`、混合式如 `1-5/2`）。解析尽力而为，该字段 tab 显示原始片段并标注「高级语法（未可视化）」，用户一旦改动该 tab 即覆盖——不丢数据，不假崩溃。
_Avoid_: 不支持的表达式、非法表达式（它们是合法的，只是不可视化）

**全量产物（Full Bundle）**:
`@autostorejs/form` 的单一完整产物：表单框架、全部 widget 与 autostore 运行时打包在一起，引入即完成全部 widget 注册。是主入口的默认形态，兼容一切消费方式。IIFE 形态下单 script 即拿到完整生态（`AutoForm` 命名空间同时承载 autostore 全量 API）。
_Avoid_: 完整包、单体包

**捆绑副本（Bundled Runtime）**:
IIFE 产物内嵌的 autostore 实现。与页面上的其它 autostore 实例（如独立加载的 autostore.js）互为异源——跨副本的 instanceof 与 Symbol 身份判别会静默失效。浏览器场景的正道是使用重导出的 API（`AutoForm.configurable` 等）：与捆绑副本同源，天然兼容。
_Avoid_: 内置 store（副本是整个 autostore 运行时，不只是 store 对象）

**按需产物（Split Bundles）**:
与全量产物并存的拆分形态：由一个 core 产物加若干 widget 产物组成，消费者按 `schema.widget` 实际所需引入。类型层的 widget 键合并与运行时引入严格对齐——引了什么，类型才认什么。
_Avoid_: 分包、tree-shaking 产物（前者泛指任意拆包，后者是 bundler 机制名）

**core 产物（Core Bundle）**:
按需引入的最小前置：表单框架、公共基类、图标注册、默认 widget（input），以及捆绑的 autostore 运行时（平铺 API + `AutoStoreNS` 命名空间）。input 随 core 走是因为它是「未声明 widget 时的隐式取值」这一契约的一部分，不随 core 发货会把最常见的静默失败埋给用户。IIFE 场景下它同时是 lit 单例的宿主（`AutoFormCore` 命名空间），必须先于任何 widget 产物加载。
_Avoid_: 基础包、框架包

**widget 产物（Widget Bundle）**:
单个 widget 的独立产物，前提是 core 已被引入（IIFE 场景还要求 core 先行加载）。引入即完成该 widget 的元素注册，与全量产物混用安全（注册有防重复守卫），但 IIFE 形态的全量与按需不可混引同一页（两份 lit）。
_Avoid_: 组件包、插件包
