# @autostorejs/plugins

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
