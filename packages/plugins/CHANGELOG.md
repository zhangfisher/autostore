# @autostorejs/plugins

## 4.6.0

### Minor Changes

-   502ea07: cycleDetect 插件移除异步循环依赖检测功能：

    -   异步计算属性不再参与循环依赖检测，重入由 core 的 `_running` 重入保护兜底（`observer/*/cancel` 事件），避免检测错误在事件总线链路上变成进程级未捕获异常
    -   保留同步计算属性的构造期（嵌套创建链）与执行期（getter 重入）两阶段检测
    -   同步循环检测错误不再中断 store 构造，改为记录在嵌套最深层 observer 的 `error` 属性上
    -   文档与单元测试同步更新（11 个测试全部通过）

### Patch Changes

-   autostore@4.6.0

## 4.5.0

### Minor Changes

-   21488a1: Schema widget 类型系统升级（ADR-0005 widget config vocabulary），固定版本组 4.3.2 → 4.5.0：

    -   **core**: base widget 类型仅收录 HTML 词汇，字段词汇统一为 camelCase，重叠组件字段下沉至 core 类型表，消除 TS2717 类型冲突
    -   **form**: input/select widget 配置对齐新词汇表，field/form 样式与 hostClass 控制增强；`autostore` 依赖从 peerDependencies 移至 dependencies

### Patch Changes

-   Updated dependencies [21488a1]
    -   autostore@4.5.0

## 4.3.2

### Patch Changes

-   8f9d366: 修复发布包依赖中 `workspace:*` 协议未替换为实际版本号导致安装失败的问题，重新发布以修复 npm 上的依赖引用错误
    -   autostore@4.3.2

## 4.3.1

### Patch Changes

-   06a6a5a: fix
-   Updated dependencies [06a6a5a]
    -   autostore@4.3.1

## 4.3.0

### Minor Changes

-   升级版本到 4.3.0

### Patch Changes

-   Updated dependencies
    -   autostore@4.3.0
