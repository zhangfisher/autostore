# autostore

## 4.7.1

### Patch Changes

-   c1d7191: upgrade fastevent

## 4.7.0

### Minor Changes

-   14e95ee: 重写 `reset()`：从「逆放变更操作」改为「还原首次变脏基线」，并新增 `resetable` 路径规则。

    ## 基线模型

    `reset()` 语义变更。旧实现逆放每次变更的操作（记录每个 key 的旧值，再按序回写）；新实现记录路径**首次变化前的基线快照**，还原时直接把该路径写回基线。类型不变但可观察行为有别：

    ```ts
    const { state } = createStore({ list: [1, 2, 3] }, { resetable: true });

    state.list.push(4);
    state.list.pop();

    store.reset();
    // 旧: []        —— 逆放了 push(4) 和 pop()
    // 新: [1,2,3]   —— 回到首次变脏前的基线
    ```

    基线一经记录，后续对该路径的修改不再记录（去抖），所以基线对应用途而非逆序日志。设计取舍见 `docs/adr/0037-reset-baseline-model.md`。

    ## 数组

    `push`/`pop`/`shift`/`unshift`/`splice`/`fill`/`sort`/`reverse`/`length`/单下标赋值/下标 `delete` 均可在还原后精确回到基线。数组基线保存变更前的元素表副本，对应的数组对象不额外复制。

    ## 键存在性

    新增的键还原为消失，删除的键还原为恢复，键原本存在但值为 `undefined` 时还原为 `undefined`。含 `.` 的键名按转义路径编码处理，不产生多余层级。

    ## `resetable` 接受路径规则

    `resetable` 类型由 `boolean` 拓宽为 `boolean | string[]`：

    ```ts
    resetable: ['orders.items']; // 纳入规则，命中即判定可重置，范围为整棵子树（含自身）
    resetable: ['!orders.items']; // 排除规则，命中即判定不可重置
    resetable: ['!orders.items', 'orders']; // orders.items 不可重置，orders.price 可重置
    ```

    -   **首匹配即止**：按书写顺序匹配，命中即决定，后续规则不再检查。因此顺序遮蔽是常态——`["orders", "!orders.items"]` 里的排除规则是死代码。
    -   通配符 `*` 匹配恰好一层，`**` 匹配任意层（含零层，故 `["!**"]` 排除整棵树）。
    -   零命中兜底：**存在纳入规则时**默认可重置为否；**只有排除规则时**默认可重置，即 `["!x"]` 表示「除 x 外都记」。
    -   容器基线会吸收其后代；若某容器在子树内已有脏路径之后才被整体替换，则不捕获该容器基线，还原降级为逐个脏路径。

    `true`（无规则）与 `false`/`[]` 的运行时开销与改造前持平：采集回调装在 reactive 的 options 上，禁用态不挂载。

    ## 破坏性变更

    -   **`updatedState` 由可写字段降级为只读 getter**，且不再作为还原依据，仅保留为调试视图。直接赋值不再生效。
    -   **`resetable` 默认值由 `true` 改为 `false`**。基线采集会在每次写入时检查"子树内是否已有脏路径"，默认关闭可让绝大多数 store 回到零开销。需要回滚能力的场景（表单回退、开发调试、测试隔离）必须显式开启：

        ```ts
        new AutoStore(state, { resetable: true }); // 或 store.resetable = true
        ```

        受影响的下游：`AutoForm` 内部 store 已显式传 `resetable: true`，不受影响；外部 store（`.store` 属性）由 `AutoForm` 在绑定时补开启（见下）。`ConfigManager` 有自己的 `reset()` 覆写，不依赖此选项。

    -   **新增只读属性 `store.resetableExplicit`**，用于区分「用户没配 `resetable`」与「用户显式配了 `resetable: false`」。构造器会把默认值合并进 `options`，因此 `store.resetable` 在两种情况下读数都是 `false`，消费方无从分辨。`AutoForm` 依此在绑定外部 store 时：未显式配置则自动开启 `resetable`（打一条 info 日志）以保证 `form.reset()` 可用；显式传 `false` 则尊重，不覆盖。

        ```ts
        new AutoStore(state).resetableExplicit; // false
        new AutoStore(state, { resetable: false }).resetableExplicit; // true
        ```

        此前依赖「`resetable` 默认 `true`」在外部 store 上调用 `form.reset()` 的代码无需改动。

    -   **`reset(entry)` 不再误伤同前缀兄弟路径**：`reset("user")` 精确匹配该路径及其后代，不影响 `username`。
    -   **还原单个容器只产生一次节点级写回**，其后代的重置事件不再逐条触发。若有代码依赖「每个脏叶子各触发一次」来更新自身，此行为需调整。
    -   **计算属性路径不参与还原**（在依赖变化时自动重算），不再被记录。
    -   `@autostorejs/plugins/watch` 与 `@autostorejs/plugins/shadow` 在 `reset()` 期间不刷新——其 `onAny` 订阅收不到广播派生事件。改造前同样如此，未新增退化。

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

## 4.6.1

### Patch Changes

-   cceb22f: 增加 shallow 到 sandboxVars

## 4.6.0

## 4.5.0

### Minor Changes

-   21488a1: Schema widget 类型系统升级（ADR-0005 widget config vocabulary），固定版本组 4.3.2 → 4.5.0：

    -   **core**: base widget 类型仅收录 HTML 词汇，字段词汇统一为 camelCase，重叠组件字段下沉至 core 类型表，消除 TS2717 类型冲突
    -   **form**: input/select widget 配置对齐新词汇表，field/form 样式与 hostClass 控制增强；`autostore` 依赖从 peerDependencies 移至 dependencies

## 4.3.2

## 4.3.1

### Patch Changes

-   06a6a5a: fix

## 4.3.0

### Minor Changes

-   升级版本到 4.3.0

## 4.2.2

### Patch Changes

-   10b205a: [feat] `refStore`参数现在支持传入多个`Store`，在`ref`函数中允许通过`ref("@\<store.id>/\<路径>")`方式引用。

    ```ts
    const accountStore = new AutoStore(
        {
            user: {
                name: 'Alice',
                age: 25,
            },
        },
        { id: 'account' },
    );
    const orderStore = new AutoStore(
        {
            order: {
                price: 100,
                count: 1,
            },
        },
        { id: 'shop' },
    );

    const mainStore = new AutoStore(
        {
            userName: computed((scope, { ref }) => {
                const name = ref('@account/user.name');
                return `User: ${name}`;
            }),
            total: computed((scope, { ref }) => {
                return ref('@shop/order.price') * ref('@shop/order.count');
            }),
        },
        { refStore: [accountStore, orderStore], id: 'main' },
    );
    ```

## 4.0.13

### Patch Changes

-   8bce8c8: fix deps

## 4.0.12

### Patch Changes

-   49b440f: fix types errors

## 4.0.11

### Patch Changes

-   1eddd98: fix some errors

## 4.0.10

### Patch Changes

-   6b18807: fix ci error

## 4.0.9

### Patch Changes

-   fadc0b8: fix publishConfig

## 4.0.8

### Patch Changes

-   977ad77: fix ci release

## 4.0.7

### Patch Changes

-   18ae236: add publishConfig support

## 4.0.6

### Patch Changes

-   3ee957d: fix ci

## 4.0.5

### Patch Changes

-   0abe705: fix ci update

## 4.0.4

### Patch Changes

-   ed5adb9: update ci

## 4.0.3

### Patch Changes

-   3a94376: fix build scripts

## 4.0.2

### Patch Changes

-   c98966d: fix some errors

## 4.0.1

### Patch Changes

-   bf53248: 全新同步功能发布

## 4.0.0

### Major Changes

-   737ca89: - 全面升级优化配置系统
    -   事件系统升级为 FastEvent
    -   优化同步机制

## 3.2.11

## 3.2.10

### Patch Changes

-   60e7588: 同步时 schema 支持计算属性

## 3.2.9

### Patch Changes

-   4c4804c: 修复双向同步 schema 数据时状态数据被复位的问题

## 3.2.8

### Patch Changes

-   510bbf4: 修复 schema 中包括计算属性时的一个计算错误

## 3.2.7

### Patch Changes

-   f6734bd: 修复当双向同步时存在的错误

## 3.2.6

### Patch Changes

-   4107a4d: 修复同步时 schmea 同步错误的问题

## 3.2.5

### Patch Changes

-   b7df43a: fix some error

## 3.2.4

### Patch Changes

-   2326dad: 同步时支持计算属性同步

## 3.2.3

## 3.2.2

## 3.2.1

### Patch Changes

-   213b54c: fix type errors

## 4.0.0

### Minor Changes

-   b8ab118: 升级 sync 算法，支持 configure 项可以是数组和对象

### Patch Changes

-   889fc70: update sync configurable support array and object

## 3.1.16

## 3.1.15

### Patch Changes

-   63e1fa9: 修复导出错误

## 3.1.14

### Patch Changes

-   3257305: fix errors

## 3.1.13

### Patch Changes

-   2123556: form widgets support async load

## 3.1.12

### Patch Changes

-   [`e851fe0`](https://github.com/zhangfisher/autostore/commit/e851fe0d42bffcd35a003b51534961473bd9557f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - schema 增加签名调用，可以省略初始化值

## 3.1.11

### Patch Changes

-   [`4ee96ff`](https://github.com/zhangfisher/autostore/commit/4ee96ffec9243825153f9ad5a371a68af2678891) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix syncer

## 3.1.10

### Patch Changes

-   [`77307c9`](https://github.com/zhangfisher/autostore/commit/77307c9893661d6a729373dd9ce47e9343382c6f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix some errors

-   [`123760b`](https://github.com/zhangfisher/autostore/commit/123760b77062eeb75c79d6ac8bd6ec0ea1601863) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix export errors

## 3.1.8

### Patch Changes

-   [`2c96658`](https://github.com/zhangfisher/autostore/commit/2c9665884b67a440bcbaecd5be25f0ec2141b186) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add color-picker preset colors

## 3.1.7

### Patch Changes

-   [`5e2b1ab`](https://github.com/zhangfisher/autostore/commit/5e2b1ab7bae36a01c11adc077bb8bb221824512d) Thanks [@zhangfisher](https://github.com/zhangfisher)! - feat: support store.schemas.add(\<path>,\<schema>) method

## 3.1.6

### Patch Changes

-   [`664ba52`](https://github.com/zhangfisher/autostore/commit/664ba52a0dab9b3e69bd91677fdbe76fc035b965) Thanks [@zhangfisher](https://github.com/zhangfisher)! - upgrade deps

## 3.1.5

### Patch Changes

-   [`57ab216`](https://github.com/zhangfisher/autostore/commit/57ab216f05334845b426a8774027502de77a0e83) Thanks [@zhangfisher](https://github.com/zhangfisher)! - feat: add schemaManager.size method

## 3.1.4

## 3.0.3

## 3.0.2

### Patch Changes

-   [`2a5f532`](https://github.com/zhangfisher/autostore/commit/2a5f532396c2bae75f70a535f0e9d72a54d01fe4) Thanks [@zhangfisher](https://github.com/zhangfisher)! - - [feat] 新增加`onObserverInitial`参数，用于在创建`computedt`或`watched`等`observer`可观察对象前调用，允许`return false`来阻止创建，将函数标识为`raw`
    -   [feat] 优化了`AutoForm`的图标注册逻辑

## 3.0.1

### Patch Changes

-   [`62bd346`](https://github.com/zhangfisher/autostore/commit/62bd346ebcd105ef49b8d95e63427d1104b3b75b) Thanks [@zhangfisher](https://github.com/zhangfisher)! - rename onForEachObject to onForEachState

## 3.0.0

### Minor Changes

-   [`8e85f34`](https://github.com/zhangfisher/autostore/commit/8e85f34bd78ebaf72a50cefc3827858b8c1b2814) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add tabs and collapse field groups

## 2.0.4

### Patch Changes

-   [`6a82d92`](https://github.com/zhangfisher/autostore/commit/6a82d92cc331f71a3903700569c6da7cec08af9d) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 新增加 onForEachObject 回调在初始化时回调

## 2.0.3

## 2.0.2

## 2.0.1

## 2.0.0

### Major Changes

-   [`55cef3a`](https://github.com/zhangfisher/autostore/commit/55cef3afb4869c41041f1c975174e05e7bc5c384) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 全面升级增加 schema 功能

## 1.3.21

## 1.3.20

## 1.3.19

### Patch Changes

-   [`dedd9cc`](https://github.com/zhangfisher/autostore/commit/dedd9cc282202d3e4df35a27e0f0c3946c59e74d) Thanks [@zhangfisher](https://github.com/zhangfisher)! - - [特性] 重构同步功能，现在同步功能由`@autostorejs/syncer`提供

## 1.3.18

## 1.3.17

## 1.3.16

## 1.3.15

## 1.3.14

### Patch Changes

-   [`77543fe`](https://github.com/zhangfisher/autostore/commit/77543feb2a9da3ac4e6090f090251260763a372e) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 修改所有 Symbol 标识常量为字符串以减少版本冲突的可能性

## 1.3.13

### Patch Changes

-   [`e16301a`](https://github.com/zhangfisher/autostore/commit/e16301ab9998208e9b970d7be345662fa68c0c9f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 修复 syncer 引用错误

## 1.3.12

### Patch Changes

-   [`5c32540`](https://github.com/zhangfisher/autostore/commit/5c3254072c89a1f6e3f3220a51b3885e546270ef) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 优化同步逻辑，新增加 SYNC_INIT_FLAG

## 1.3.11

### Patch Changes

-   [`df0adbf`](https://github.com/zhangfisher/autostore/commit/df0adbf17d31f136f6df5bacdff1f222f7f5d8e4) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add SchemaState type

## 1.3.10

### Patch Changes

-   [`a1246a3`](https://github.com/zhangfisher/autostore/commit/a1246a34538dda21c1ccc20768e3fa2ddf23e783) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix: schema(value) value error

## 1.3.9

## 1.3.8

### Patch Changes

-   [`37e9870`](https://github.com/zhangfisher/autostore/commit/37e9870577c1da0ff90234072be9ca303d82a1db) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add params\<pathMap> for sync

## 1.3.7

### Patch Changes

-   [`e6fd129`](https://github.com/zhangfisher/autostore/commit/e6fd1296256dc882bc01a6a698c761bf147348eb) Thanks [@zhangfisher](https://github.com/zhangfisher)! - feat: watch support wildcards

## 1.3.6

### Patch Changes

-   [`79dcc13`](https://github.com/zhangfisher/autostore/commit/79dcc136b0d6026799c9dd4fe01fc4ccf95728d7) Thanks [@zhangfisher](https://github.com/zhangfisher)! - feat: add sync and clone

## 1.3.5

### Patch Changes

-   [`c872c68`](https://github.com/zhangfisher/autostore/commit/c872c688a6b91138c72f7404fe46adeecd79f4c5) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add store.schemas.getState() method and types

## 1.3.4

### Patch Changes

-   [`2a6e9ab`](https://github.com/zhangfisher/autostore/commit/2a6e9abfd06db09a81c6c3240f65460d2d734b60) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix schema builder

## 1.3.3

### Patch Changes

-   [`d69558d`](https://github.com/zhangfisher/autostore/commit/d69558d45c4877206e0802468f555bd807d0525f) Thanks [@zhangfisher](https://github.com/zhangfisher)! - update schemaobject

## 1.3.2

### Patch Changes

-   [`83a040e`](https://github.com/zhangfisher/autostore/commit/83a040ef0c4af568e6d0aff7dd2b1a45978d9707) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix schema types exports

-   [`e51c9d6`](https://github.com/zhangfisher/autostore/commit/e51c9d671c418b1d156c8923f8896872f38143fe) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add alias configurable for schema

## 1.3.1

### Patch Changes

-   [`261841b`](https://github.com/zhangfisher/autostore/commit/261841b1b04c0a86aefbd126723d88442a796f75) Thanks [@zhangfisher](https://github.com/zhangfisher)! - rename validator to schema

## 1.3.0

### Minor Changes

-   [`6e2e8ec`](https://github.com/zhangfisher/autostore/commit/6e2e8ec1f3dec54b2cc5f1349f84846a6192713e) Thanks [@zhangfisher](https://github.com/zhangfisher)! - add validate feature

## 1.2.4

### Patch Changes

-   [`fee6526`](https://github.com/zhangfisher/autostore/commit/fee652668930bc5fa8c44afad87ba56d0ed2e86c) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix release

## 1.2.3

### Patch Changes

-   [`9c86dd4`](https://github.com/zhangfisher/autostore/commit/9c86dd4c4c60de5d978c833a6b1e2898e2fdcc2b) Thanks [@zhangfisher](https://github.com/zhangfisher)! - use `store.watch("*",listener)` not work

## 1.2.2

### Patch Changes

-   [`e3072e3`](https://github.com/zhangfisher/autostore/commit/e3072e34762656794101488b11e1e21e8aff72f0) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 修复循环依赖检测结果显示方向问题

## 1.2.1

### Patch Changes

-   [`10463d9`](https://github.com/zhangfisher/autostore/commit/10463d959cc312fa54ea0e329527cce9c1c985f6) Thanks [@zhangfisher](https://github.com/zhangfisher)! - [BUG🐛] 修复当状态中存在`markRaw`标识的成员时类型推导出错的问题

## 1.2.0

### Minor Changes

-   [`48800d3`](https://github.com/zhangfisher/autostore/commit/48800d34ee1843ac8a7892337ab4cf8d7697d91e) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 实现了完整的表单功能

## 1.1.2

### Patch Changes

-   [`9c5a1b8`](https://github.com/zhangfisher/autostore/commit/9c5a1b8c9f70103cd6f254385edabb4087ab29c9) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 更新表单字段组件

## 1.1.1

### Patch Changes

-   [`167c0f2`](https://github.com/zhangfisher/autostore/commit/167c0f21817911883479f6f7b58826b1f89bf2cb) Thanks [@zhangfisher](https://github.com/zhangfisher)! - fix field split

## 1.1.0

### Minor Changes

-   [`57e9a4d`](https://github.com/zhangfisher/autostore/commit/57e9a4d306eddb680e1c28c2b142affd1761b359) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 正式发布

### Patch Changes

-   [`970ad90`](https://github.com/zhangfisher/autostore/commit/970ad908aaf4e28730082562ba8d475f70f5fa72) Thanks [@zhangfisher](https://github.com/zhangfisher)! - 增加`store.reset()`方法，可以在`resetable=true`时调用`reset`方法恢复状态数据

## 1.0.1

### Patch Changes

-   [`0e3197c`](https://github.com/zhangfisher/autostore/commit/0e3197caa84d318a073840482e107bb524b78428) Thanks [@zhangfisher](https://github.com/zhangfisher)! - V1.0 正式发布，状态管理库`AutoStore`的核心功能已经稳定，欢迎大家使用。

-   [`78ea04c`](https://github.com/zhangfisher/autostore/commit/78ea04cd3926b183d773a78b7fb1a8fdf5bc2e07) Thanks [@zhangfisher](https://github.com/zhangfisher)! - release: 1.0.0@beta1
