# ADR-0025：x-bind `.invert` 修饰符（值取反）与 enable 注入复用

- **状态**：Accepted
- **日期**：2026-08-20
- **关联**：[ADR-0019](0019-x-bind-config-reference-prefix.md)（`@` 配置绑定）、[ADR-0020](0020-x-model-schema-auto-injection.md)（元数据自动注入，决策 7 被本 ADR 修订）、[ADR-0007](0007-directive-options-and-modifiers.md)（修饰符=指令选项）、[CONTEXT.md](../../CONTEXT.md)

## 背景

ADR-0020 决策 7 的 `enable → disabled` 反向映射原先由专用注入器 `_injectEnableInvert`（34 行）实现：自建 `collectDependencies` + `cm.watch` + 取反 `patchDisabled`，与 BindDirective 的 `_bindConfig` 逐行同构、仅差取反一个 `!`。grilling 中提出：与其维护两套同构的监听/解析代码，不如给 BindDirective 加 `.invert` 修饰符（求值结果取反），让 enable 注入复用普通 `@` 绑定合成路径。

曾评估并否决过的形态（ADR-0020 当时决策 7 的理由）：「给 BindDirective 加 invert **配置选项**」——隐性开关读模板时不可见，直传心智模型被打破。本 ADR 的 `.invert` **修饰符**形态不同：声明在模板语法里（`:disabled.invert="..."` 一眼可见），机制零新增（ADR-0007 修饰符在解析期注入为同名指令选项，`getOption("invert")` 直接可读），且是**通用一元变换**——`:hidden.invert` / `:readonly.invert` 同样合法，不专为 disabled 而设。

## 决策

### 1. `.invert` 修饰符：求值结果取反

`:attr.invert="expr"` 在 patch 前对求值结果 `!value`。两个值来源均生效：

- **状态绑定**：`created()` 的 watch 回调与首渲值统一取反（`bind.ts`）；
- **配置绑定**：`_bindConfig` 的 `read()` 取反（依赖收集照常，收集的是取反前的原路径）。

等价声明：`x-bind-options="{invert:true}"`（ADR-0007 修饰符≡指令选项）。

### 2. 适用范围：boolean 型属性（约定，不强制）

语义化用于 `BOOLEAN_ATTRS`（disabled/readonly/hidden/selected/multiple）的反向词汇映射。对非布尔属性无意义（任意值 `!` 后恒布尔，字符串会 `setAttribute(attr,"")`）——引擎不禁止（KISS，不加防御分支），文档声明约定。

### 3. enable 注入改为合成 `:disabled.invert="path@enable"`

`synthesizeSchemaBindings` 的 `synth()` 支持第三参 opts，enable 分支改调 `synth("disabled","enable",{invert:true})`——合成 info 直接带 `options:{invert:true}`（合成路径不走 getDirectives，无解析歧义）。**删除** `_injectEnableInvert` 全部 34 行。显式优先（查 `explicitAttrs.has("disabled")`）语义不变，由 `synth` 入口统一承担。

## 后果

- **正向**：enable 注入回归「白名单普通成员 + invert 标记」，删除一整套与 `_bindConfig` 同构的监听代码（DRY）；`.invert` 成为绑定层通用能力，用户可显式用于任何反向词汇场景；取反逻辑从「藏在注入器」变为「模板语法一部分」。
- **负向/限制**：`.invert` 误用于非布尔属性会产生恒布尔（约定不强制）；合成 bind 实例数 +1（enable 场景，原先专用闭包换指令实例，内存等价）。
- **修订**：ADR-0020 决策 7 的「不走 BindDirective」实现策略作废（语义取反不变，实现改为复用）；CONTEXT.md「enable 反向映射」词条同步更新。
