# Schema 配置的 Widget 类型系统：模块扩展与通用元数据上移

## 背景

`schema(initial, options)` 的第二个参数中，除 `AutoStateSchemaBase` 定义的通用元数据外，还有一部分配置键由 `widget` 取值决定（如 `widget: "number"` 时的 `min/max/step`）。core 通过重载 + 泛型 `W extends keyof AutoStoreWidgets` + `WidgetConfigPrecise<W>` 交叉实现了这一"widget 决定类型"的机制，但存在系统性缺口：

1. **覆盖面**：`AutoStoreWidgets` 只收录 21 个 HTML 原生 widget；`@autostorejs/form` 实际有 34 个组件（`switch/rating/cascader/tree-select/...`），全部落入 `widget?: string` 回退重载，零类型检查。form 的默认 widget `input` 也不在 core 键中。
2. **假类型**：base 的 `choices` 键在 form 运行时**零消费**——所有选项类组件实际读的是 `select` 键。类型说有、运行时不读。
3. **类型坍缩 bug**：`AutoWidgetSelect.value?: string | string[]` 与 base 的 `value: Value` 交叉，`Value=number` 时坍缩为 `never`。
4. **通用元数据缺失**：`valueKey`(×7 组件)/`labelKey`(×4)/`clearable`(×3)/`pill`(×4)/`filled`(×3)/`labelPos`(form 基类消费) 等跨 widget 高频键无类型。
5. **死分支**：`AutoStoreStateSchema` 的 `keyof AutoStoreWidgets extends never` 回退不可达（interface 一旦有成员即无法被模块扩展清空）。

## 决策

### 1. 类型注入采用模块扩展（declaration merging），不用平行类型体系

form 包在每个组件文件内 `declare module "autostore"` 向 `AutoStoreWidgets` 合并自有键；不建 `FormWidgets` 平行接口。理由：`AutoStoreWidgets` 设计为 interface 即为此意图；平行体系会造成两套真相。入口 `form/src/index.ts` 显式保证 declare 进入类型链（不依赖隐式 d.ts 合并）。

**重叠键规则**：core 已有的键（`number/date/select/...`）form 不重复声明（interface 同名成员必须类型一致，无法"覆盖"）。重叠组件的 form 专有字段（`renderItem/placement/maxOptionsVisible/card/itemWidth` 等）**补写进 core 的 `widget-types.ts` 对应接口**——core 的 widget 接口定位是"widget 配置类型"而非"HTML 属性镜像"（`AutoWidgetSelect.choices` 已是证据）。

**回退重载保留**：未引入 form 的纯 core 项目，`widget: "switch"` 匹配 `widget?: string` 回退通过——类型随依赖出现是模块扩展的固有特性，不是缺陷。

### 2. `choices` 正名化（运行时改向，非类型迁就）

base 的 `choices` 是类型正名（语义："候选项"，与同名组件 `select`/单选行为无多义冲突）；form 运行时 6 个选项类组件（select/radio/radio-button/checkbox-group/list/cascader）+ `AsyncOptionState` 构造处的键名从 `select` 改读 `choices`。**硬切无双轨**：`choices` 在 form 运行时从未生效过，把"从未生效"改为"生效"是修复不是破坏；examples 中已用 `choices` 的 4 处从坏代码变正确，用 `select:` 的存量同步改。core 侧不消费 `choices`（仅类型声明），改名对 core 运行时零影响。

### 3. 通用元数据上移 base 的口径：语义泛化，非出现频次

判定标准是"这个键离开具体 widget 还有没有意义"，不是统计阈值：

**上移 `AutoStateSchemaBase`**：仅收 HTML 标准词汇——`disabled`/`readOnly`（通用输入态，与业务开关 `enable` 语义分层）、`clearable`（输入行为：清除输入内容）。

**下沉 widget 层（form 词汇，不进 base）**：`valueKey`/`labelKey`（选项类组件的数据映射）、`pill`/`filled`（视觉样式）、`labelPos`。其中重叠组件（select/radio 等）的字段落 core 表（Q24-C 机制：interface 同名成员无法被 form 增强，重叠组件的 form 消费字段补写进 core 的 `widget-types.ts`）；`labelPos` 收进 core 的 `BaseInputAttributes`（form 字段基类对所有 widget 生效，按 widget 分组 declare 会给 `widget: "number"` 制造假类型错误）。"下移到 form"的实义是"下沉到 widget 层"，物理位置随 Q24-C 机制走。

**不上移**：`multiple`（是**行为**非数据映射，radio/checkbox-group 无此概念，留在选项类 widget 接口）；`delimiter`/`max`/`min`/`tips`/`size`（同名异义：max 在 number 是数值、在 rating 是星数、在 date 是日期串）；`path`（form 渲染时注入，非用户配置键，写进类型诱导误配）；`renderItem`（渲染定制，留在 widget 接口层）。

**widget 接口删除与 base 重复的源定义**（`name/required/placeholder/width/height`），单一事实来源；`BaseInputAttributes` 保留 `disabled/readOnly` 并 JSDoc 标注与 `enable` 的区别。**消除 `value` 坍缩**：widget 接口不再声明 `value`。

### 4. widget 属性允许 Computedable（与运行时一致）

调查证实运行时解析是"全部函数值属性 − 黑名单（`validate`/`on*`/`render*`/`to*`）"，非白名单——`min: computed(...)` 运行时本就支持。类型层 `WidgetConfigPrecise<W>` 经 `Computedable` 包装与运行时对齐。**已知限制**：异步 computed 的 widget 属性首读 `undefined`、结果写回 ConfigManager 状态树，form 字段的 `_handleSchemaChange` watch 用户 store 监听不到（不重渲染）——此缺口是 form 对异步 computed 的通病，非 widget 属性特有，记 JSDoc（"widget 特有属性建议用同步 computed"），修复另行立项。

### 5. 工厂函数支持 widget 泛型

`SchemaBuilderFactory`（`s.number`/`schemas.number`）加与 `schema()` 对齐的 widget 重载，否则 `s.number(100, {widget: "range", min: 0})` 报错且 `ExtractWidgetFromBuilder` 在 `ConfigurableState` 中静默丢失 widget 信息。

### 6. 死代码与死分支清理

删除 `AutoStoreStateSchema` 空集回退分支与 `WidgetKeys` 泛型工具（唯一消费点即死分支）。form 的 4 个未导出组件（`markdown/cron/stepper/table`）不进类型面、不注入模块扩展；仅修正 `cron.ts` 的类型名复制粘贴错误（`AutoFieldStepperOptions` → `AutoFieldCronOptions`，拆除未来同导出即静默冲突的雷）。**死配置键不上类型**（`ipaddress.size`/`parts.onlyNumber`/`list.maxItems/minItems`/`tree-select.maxItems/minItems/showAsPath`——声明未读，上类型即制造新假类型）。

## 后果

- form 真类型化范围：有自有配置键且文档有页面的核心组件（选项类 7 + 输入类 5 + 专项类 11）；薄组件（date/time/email 等，自有键仅 icon）仅注入键名使 `widget` 字面量可识别；`combine/custom/tree-dropdown` 与死代码 4 组件完全不注入（落回退重载）。
- core 收录"HTML input type 全集"，form 组件集是"子集 + 扩展"；`datetime-local`（core，HTML 原生）与 `datetime`（form tag）并存是接受的现状，键名不互相对齐。
- 验证：core 扩充 `widget-inference.test-d.ts`（含真反例 `@ts-expect-error`）+ form 新建 `__tests__/` 类型测试；`tsc --noEmit` 过滤 ConfigManager TDZ 既有报错看增量。
- 异步 computed 的 form 重渲染缺口成为已知限制，待独立 ADR。
