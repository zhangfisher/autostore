# @autostorejs/viewer

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
