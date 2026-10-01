# @autostorejs/form

## 4.7.0

### Patch Changes

-   Updated dependencies [14e95ee]
    -   autostore@4.7.0
    -   @autostorejs/plugins@4.7.0

## 4.6.2

### Patch Changes

-   2709e4e: **viewer（ADR-0035/0036）**：

    -   新增 `header` / `footer` 区头区尾：支持属性声明（JSON 经 relaxedToJson 容错解析）与 `slot="header"|"footer"|"title"` 分发替换；未声明时默认渲染 `<store.title>` 标题 + 重置/保存动作（`mode:'edit'` 仅编辑模式显示），显式置空或内容全空不渲染。
    -   动作新增 `mode`（view/click-edit/edit 逗号分隔模式显隐门控）与 `align`（left/right 侧别分组，区头默认 right、区尾默认 left，组内保持声明序）；动作抽象为 ActionTarget，节点动作与区域动作共用渲染/触发契约（区域动作无 path，`update` 为 noop）。
    -   新增表单提交：`action`/`method` 透传，shadow 内包裹全组件 `<form>`，保存 = `requestSubmit()`（保留原生校验）；未声明 `action` 时仅派发 `action` 事件 + warn，不触发原生提交刷新页面。
    -   新增列宽拖拽（ADR-0036）：key 手柄委托 + 位移 rAF 合并，拖拽期间标签宽测量锁存让位，双击手柄复位解锁，变更派发 `key-width-change` 事件；`--viewer-height` 随宿主可见区高度同步。

    **core**：

    -   `group` 支持逗号分隔声明多个配置组（如 `"network,advanced"`）与 `SchemaGroup` 对象形态（name + title/icon/order 元数据，重复登记保留先登记记录、元数据可后补）；`group` getter 更名为 `groups`。
    -   `AutoStoreOptions` 新增 `title` 友好标题选项，新增 `title` getter（缺省回落 `id`）。
    -   `AutoStoreAction` 新增 `mode` / `align` 字段，移除 `tips`（统一改用 `tooltip`）。

    **form**：

    -   提示属性 `tips` 全面重命名为 `tooltip`（action、captcha、qrcode、upload、radio、checkbox-group、loading 等）。
    -   表单分组过滤 `group` 支持 `SchemaGroup` 对象形态（取 `name` 匹配）。

-   Updated dependencies [2709e4e]
    -   autostore@4.6.2
    -   @autostorejs/plugins@4.6.2

## 4.6.1

### Patch Changes

-   Updated dependencies [cceb22f]
    -   autostore@4.6.1
    -   @autostorejs/plugins@4.6.1

## 4.6.0

### Patch Changes

-   Updated dependencies [502ea07]
    -   @autostorejs/plugins@4.6.0
    -   autostore@4.6.0

## 4.5.0

### Minor Changes

-   21488a1: Schema widget 类型系统升级（ADR-0005 widget config vocabulary），固定版本组 4.3.2 → 4.5.0：

    -   **core**: base widget 类型仅收录 HTML 词汇，字段词汇统一为 camelCase，重叠组件字段下沉至 core 类型表，消除 TS2717 类型冲突
    -   **form**: input/select widget 配置对齐新词汇表，field/form 样式与 hostClass 控制增强；`autostore` 依赖从 peerDependencies 移至 dependencies

### Patch Changes

-   Updated dependencies [21488a1]
    -   autostore@4.5.0
    -   @autostorejs/plugins@4.5.0

## 4.3.2

### Major Changes

-   升级到 4.x 版本系列
-   更新依赖项以兼容最新的 autostore 和 @autostorejs/syncer
-   TypeScript 版本升级到 6.x
-   tsup 构建工具升级到 8.5.1

### Dependencies

-   autostore: workspace:\*
-   @autostorejs/syncer: workspace:\*
-   flex-tools: ^1.6.4

## 3.2.11

### Patch Changes

-   c347b82: 修改不能同步异步计算属性的问题
    -   autostore@3.2.11

## 3.2.10

### Patch Changes

-   60e7588: 同步时 schema 支持计算属性
-   Updated dependencies [60e7588]
    -   autostore@3.2.10

## 3.2.9

### Patch Changes

-   Updated dependencies [4c4804c]
    -   autostore@3.2.9

## 3.2.8

### Patch Changes

-   510bbf4: 修复 schema 中包括计算属性时的一个计算错误
-   Updated dependencies [510bbf4]
    -   autostore@3.2.8

## 3.2.7

### Patch Changes

-   Updated dependencies [f6734bd]
    -   autostore@3.2.7

## 3.2.6

### Patch Changes

-   Updated dependencies [4107a4d]
    -   autostore@3.2.6

## 3.2.5

### Patch Changes

-   Updated dependencies [b7df43a]
    -   autostore@3.2.5

## 3.2.4

### Patch Changes

-   2326dad: 同步时支持计算属性同步
-   Updated dependencies [2326dad]
    -   autostore@3.2.4

## 3.2.3

### Patch Changes

-   2f5f679: update dependencies
-   5a91e6c: update dependencies
    -   autostore@3.2.3

## 3.2.2

### Patch Changes

-   7350e2a: update lit dependencies
    -   autostore@3.2.2

## 3.2.1

### Patch Changes

-   213b54c: fix type errors
-   Updated dependencies [213b54c]
    -   autostore@3.2.1

## 4.0.0

### Minor Changes

-   b8ab118: 升级 sync 算法，支持 configure 项可以是数组和对象

### Patch Changes

-   889fc70: update sync configurable support array and object
-   Updated dependencies [889fc70]
-   Updated dependencies [b8ab118]
    -   autostore@4.0.0

## 3.1.16

### Patch Changes

-   66800e8: fix form widget list show error
    -   autostore@3.1.16

## 3.1.15

### Patch Changes

-   63e1fa9: 修复导出错误
-   Updated dependencies [63e1fa9]
    -   autostore@3.1.15

## 3.1.14

### Patch Changes

-   3257305: fix errors
-   Updated dependencies [3257305]
    -   autostore@3.1.14

## 3.1.13

### Patch Changes

-   2123556: form widgets support async load
-   Updated dependencies [2123556]
    -   autostore@3.1.13

## 3.1.12

### Patch Changes

-   Updated dependencies [[`e851fe0`](https://github.com/zhangfisher/autostore/commit/e851fe0d42bffcd35a003b51534961473bd9557f)]:
    -   autostore@3.1.12

## 3.1.11

### Patch Changes

-   [`4ee96ff`](https://github.com/zhangfisher/autostore/commit/4ee96ffec9243825153f9ad5a371a68af2678891) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix syncer

-   Updated dependencies [[`4ee96ff`](https://github.com/zhangfisher/autostore/commit/4ee96ffec9243825153f9ad5a371a68af2678891)]:
    -   autostore@3.1.11

## 3.1.10

### Patch Changes

-   [`77307c9`](https://github.com/zhangfisher/autostore/commit/77307c9893661d6a729373dd9ce47e9343382c6f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix some errors

-   [`123760b`](https://github.com/zhangfisher/autostore/commit/123760b77062eeb75c79d6ac8bd6ec0ea1601863) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix export errors

-   [`4e02e01`](https://github.com/zhangfisher/autostore/commit/4e02e014c214ed18dc18b71b40005476083705f9) Thanks [@zhangfisher](https://github.com/zhangfisher)! - auto store

-   Updated dependencies [[`77307c9`](https://github.com/zhangfisher/autostore/commit/77307c9893661d6a729373dd9ce47e9343382c6f), [`123760b`](https://github.com/zhangfisher/autostore/commit/123760b77062eeb75c79d6ac8bd6ec0ea1601863)]:
    -   autostore@3.1.10

## 3.1.8

### Patch Changes

-   [`2c96658`](https://github.com/zhangfisher/autostore/commit/2c9665884b67a440bcbaecd5be25f0ec2141b186) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add color-picker preset colors

-   Updated dependencies [[`2c96658`](https://github.com/zhangfisher/autostore/commit/2c9665884b67a440bcbaecd5be25f0ec2141b186)]:
    -   autostore@3.1.8

## 3.1.7

### Patch Changes

-   Updated dependencies [[`5e2b1ab`](https://github.com/zhangfisher/autostore/commit/5e2b1ab7bae36a01c11adc077bb8bb221824512d)]:
    -   autostore@3.1.7

## 3.1.6

### Patch Changes

-   [`664ba52`](https://github.com/zhangfisher/autostore/commit/664ba52a0dab9b3e69bd91677fdbe76fc035b965) Thanks [@zhangfisher](https://github.com/zhangfisher)! - upgrade deps

-   Updated dependencies [[`664ba52`](https://github.com/zhangfisher/autostore/commit/664ba52a0dab9b3e69bd91677fdbe76fc035b965)]:
    -   autostore@3.1.6

## 3.1.5

### Patch Changes

-   [`86c9839`](https://github.com/zhangfisher/autostore/commit/86c9839186f6685e2bd18f60e66aa56dbcd193fe) Thanks [@zhangfisher](https://github.com/zhangfisher)! - upgrade themepro deps

-   Updated dependencies [[`57ab216`](https://github.com/zhangfisher/autostore/commit/57ab216f05334845b426a8774027502de77a0e83)]:
    -   autostore@3.1.5

## 3.1.4

### Patch Changes

-   [`f5171f6`](https://github.com/zhangfisher/autostore/commit/f5171f60ffc7872c75b1bf79c0a0d7b354cf381c) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add theme support for form

-   Updated dependencies []:
    -   autostore@3.1.4

## 3.0.3

### Patch Changes

-   [`0283110`](https://github.com/zhangfisher/autostore/commit/0283110525143d76197f409955089c73fcb0b763) Thanks [@zhangfisher](https://github.com/zhangfisher)! - feat: add upload preview image to close

-   Updated dependencies []:
    -   autostore@3.0.3

## 3.0.2

### Patch Changes

-   [`2a5f532`](https://github.com/zhangfisher/autostore/commit/2a5f532396c2bae75f70a535f0e9d72a54d01fe4) Thanks [@zhangfisher](https://github.com/zhangfisher)! - - [feat] 新增加`onObserverInitial`参数，用于在创建`computedt`或`watched`等`observer`可观察对象前调用，允许`return false`来阻止创建，将函数标识为`raw`
    -   [feat] 优化了`AutoForm`的图标注册逻辑
-   Updated dependencies [[`2a5f532`](https://github.com/zhangfisher/autostore/commit/2a5f532396c2bae75f70a535f0e9d72a54d01fe4)]:
    -   autostore@3.0.2

## 3.0.1

### Patch Changes

-   Updated dependencies [[`62bd346`](https://github.com/zhangfisher/autostore/commit/62bd346ebcd105ef49b8d95e63427d1104b3b75b)]:
    -   autostore@3.0.1

## 3.0.0

### Minor Changes

-   [`8e85f34`](https://github.com/zhangfisher/autostore/commit/8e85f34bd78ebaf72a50cefc3827858b8c1b2814) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add tabs and collapse field groups

### Patch Changes

-   Updated dependencies [[`8e85f34`](https://github.com/zhangfisher/autostore/commit/8e85f34bd78ebaf72a50cefc3827858b8c1b2814)]:
    -   autostore@3.0.0

## 2.0.4

### Patch Changes

-   Updated dependencies [[`6a82d92`](https://github.com/zhangfisher/autostore/commit/6a82d92cc331f71a3903700569c6da7cec08af9d)]:
    -   autostore@2.0.4

## 2.0.3

### Patch Changes

-   [`d785aff`](https://github.com/zhangfisher/autostore/commit/d785aff7e86faaadcf69cc3b34489e46c321b6cb) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 优化 customElement 注册问题

-   [`d454069`](https://github.com/zhangfisher/autostore/commit/d454069fbaeaae0eac34393543dfb79453bf23e9) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 将 magic-flex 更名为 auto-flex

-   Updated dependencies []:
    -   autostore@2.0.3

## 2.0.2

### Patch Changes

-   [`b0b9b03`](https://github.com/zhangfisher/autostore/commit/b0b9b035ac3a96679bdc4ef83db0642e72f10bd3) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 优化组件重复注册一

-   Updated dependencies []:
    -   autostore@2.0.2

## 2.0.1

### Patch Changes

-   [`f2b8429`](https://github.com/zhangfisher/autostore/commit/f2b8429c58ce6b91d3ea11009ce7db89da86528f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 优化 webcomponent 重复加载时提示组件已注册的问题

-   Updated dependencies []:
    -   autostore@2.0.1

## 2.0.0

### Major Changes

-   [`55cef3a`](https://github.com/zhangfisher/autostore/commit/55cef3afb4869c41041f1c975174e05e7bc5c384) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 全面升级增加 schema 功能

### Patch Changes

-   Updated dependencies [[`55cef3a`](https://github.com/zhangfisher/autostore/commit/55cef3afb4869c41041f1c975174e05e7bc5c384)]:
    -   autostore@2.0.0
