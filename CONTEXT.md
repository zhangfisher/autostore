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

**双值选项对（Pair Choices）**:
checkbox/switch 控件上 `choices` 键的专属语义：`[选中项, 未选中项]` 恰好两项、顺序有义——勾选时状态取第一项 value 并显示其 label，未勾选取第二项。它是 boolean 开关的双值化修饰，不是数据源。与选项类控件（select/radio/list/…）同键名的「候选项列表」语义无关。
_Avoid_: 候选项、多选项（那是 select/radio 的 choices 语义；checkbox 的 choices 是开关档位，写 3 项会被静默忽略）

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
