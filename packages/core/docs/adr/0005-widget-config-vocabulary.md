# Widget 配置词汇收敛：camelCase 统一与收录判据

## 背景

ADR-0004 把重叠组件（form 也实现的 core 键）被 form 实际消费的字段补写进 `widget-types.ts`，但遗留两个系统性问题：

1. **大小写双轨**：core 接口收 HTML 小写（`maxlength`/`minlength`），form 组件实现读 camelCase（`maxLength`/`minLength`）——类型写小写则运行时读不到，写 camelCase 则类型报错。补字段时曾以双轨（两套都声明）过渡。
2. **继承即消费的语义谎言**：form 的 password/search/email/url/number/date 组件继承泛型输入框（`AutoFieldInput`），实现层面会读 input 的全部配置（含 `max`/`min`/`step`/`pattern`/`prefix`…）——但 HTML `type=password` 不支持 `max`，number 值拼接 `prefix` 会把状态值污染为 string。类型全盘照收 = 为静默无效/有害字段背书。

## 决策

### 1. 字段词汇统一 camelCase（删除小写，类型层 breaking）

form 组件以 camelCase 读取配置，且 schema 配置层面（examples/docs demos）小写已验证**零使用**——删除 7 个键（text/tel/email/password/search/url/textarea）的小写声明，统一 camelCase。发布类型中公开词汇收窄按 **minor** 发版（changeset 注明），不升 major：实际破坏面≈0，major 会令固定版本组 5 包联动，成本远超收益。

### 2. 收录判据：实现消费 ∩ widget 语义

重叠键收字段的判据是**实现真实生效**（form 逻辑或浏览器承认），不是「实现代码读了」：
- 静默无效字段不收——HTML 明确不支持（password 的 `max`/`min`/`step`；number/date 的 `pattern`/`minLength`/`maxLength`/`spellcheck`/`autocorrect`）
- 破坏值类型的字段不收——number 的 `prefix`/`suffix`（拼接变 string）
- 实现有效的扩展字段收——date 的 `prefix`/`suffix`（值本就是 string，拼接生效）、`filled`/`pill`（纯视觉，全 input 形态有效）

判据由 `widget-inference.test-d.ts` 的正例 + `@ts-expect-error` 反例断言固化为回归防线。

### 3. 共享词汇提取 `AutoWidgetInputExtras`（core 导出，form 反向引用）

文本系共享词（`minLength`/`maxLength`/`pattern`/`prefix`/`suffix`/`filled`/`pill`/`spellcheck`/`autocorrect`）收敛为单一接口，text/tel/password/search/email/url extends 它；form 的 `AutoFieldInputOptions` 反向 `extends AutoWidgetInputExtras` 保持两侧词汇同步（core 不依赖 form，方向只能是 form → core）。数值/日期系（number/date）**不 extends**——只平铺对自身有效的装饰字段（判据见决策 2），避免为省 4 行重复开「只要装饰不要校验」的子接口（无此消费证据，YAGNI）。

## 已知遗留

`AutoWidgetCheckbox.choices` 是**双值选项对**语义（`[选中项, 未选中项]`，恰好两项且顺序有义），与 base `choices` 的「候选项列表」同键异义，且与 `switchValues` 职能重叠——术语辨析已记入根 CONTEXT.md，改名（如 `pairChoices`）留待下次 major。
