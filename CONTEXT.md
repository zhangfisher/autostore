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
