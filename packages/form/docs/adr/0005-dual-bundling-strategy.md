# @autostorejs/form 双打包策略：全量产物与按需产物并存

## 背景

`@autostorejs/form` 此前只有单一入口 `src/index.ts`，tsup 一次构建出 esm/cjs/iife 三格式。单一入口存在结构性问题：

1. **不可 tree-shake 的副作用注册**：入口首行 `import "./widgets"` 把 39 个 widget 的 `customElements.define`（经 `@tag` 装饰器）与 29 个 shoelace 组件的副作用 import 全部带入。bundler 用户即使只渲染 input 字段，也要下载全部 widget 代码（全量 ESM 273 KB / gzip 68 KB）。
2. **cjs 产物无人消费**：monorepo 内无 require 消费者；`publishConfig.exports` 的 `require: "./dist/cjs"` 指向不存在的路径（实际产物是 `dist/index.cjs`）——该条件从发布起就是坏的，证明 CJS 链路从未被使用。
3. **架构上拆分是干净的**：form 核心对 widget 是纯字符串约定（`form/index.ts` 以 `unsafeStatic(\`auto-field-${widget}\`)` 按名渲染），不存在反向静态引用；`tag()` 装饰器内置 `customElements.get` 守卫，全量包与单 widget 包混用天然安全。

## 决策

### 1. 双策略并存，全量主入口零变化

同一次 `bun run build`（tsup config 数组）同时产出全量产物与按需产物：

- **全量产物**：`.` 主入口（`dist/index.js`）+ `./browser`（`dist/index.global.js`，全局名 `AutoForm`）——导出清单、副作用行为与拆分前**逐字节等价级不变**。
- **按需产物**：core 入口（`dist/core.js`）+ 39 个 widget 入口（`dist/widgets/*.js`），走新增 exports 子路径 `"./widgets/*"`（通配一条覆盖，新增 widget 零配置）。

不采用构建开关（`build:full` / `build:split` 二选一）——会出现「忘了跑 split」的发版事故；不拆多个 npm 包——39 个包的 changeset/review/发布成本不可接受。发布仍是单包，patch 版本即可（exports 只增不改）。

### 2. core 含 input：隐式默认 widget 跟核心走

form 的 fallback 是 `schema.widget || "input"`。若 core 零 widget，只引 core 的用户任何未声明 widget 的字段都会静默渲染成未知元素——把最常见的静默失败埋给用户。core 产物包含 input（唯一隐式契约），其余 38 个 widget 各自独立产物。

### 3. 公共部分锚定 core 入口图，零代码搬移

widget 重复消费的公共模块——`AutoField`/`AutoDropdownField` 基类、`tag()`、`AsyncOptionState` 控制器、`@lit/context` context、utils、图标（`registerIcons` 及 preset 表，由 form/groups bootstrap 调用）——不做目录重构，而是由新建的 `src/core.ts` 入口显式 import，使 esbuild code splitting 把它们物理归入 core chunk。widget ESM 入口自动 import-from-core，公共代码全仓单份。

`src/index.ts` 改为 `export * from "./core"` + `import "./widgets"`（全量副作用），单一事实源。

### 4. lit 单例：ESM 靠共享 chunk，IIFE 靠 AutoFormCore 命名空间

lit 必须单例（两份 `LitElement` 基类会使 `@lit/context` 静默失联）：

- **ESM**：39+1 入口同一次构建，`splitting: true` 使 lit/@lit/context/flex-tools 进 core 共享 chunk，单例自动成立。
- **IIFE**：`dist/iife/core.global.js` 内联 lit 并挂单一全局命名空间 `window.AutoFormCore = { lit, litContext, AutoField, AutoForm, registerIcons, ... }`；per-widget IIFE（`dist/iife/widgets/*.global.js`，全局名 `AutoFormWidgets.{Pascal}`）经 tsup `globals` 映射引用该命名空间。core 未加载时 widget 启动即报「请先引入 core.global.js」——依赖契约显式化，且零撞名风险（不用裸 `Lit` 全局）。

### 5. 格式矩阵收敛为 ESM + IIFE

全量与 split 均只出 ESM + IIFE，删除 CJS（含失效的 `require` exports 条件）。form 是 Lit WebComponent 库，消费场景是浏览器/bundler ESM；code splitting 本就是 ESM-only 能力，cjs 拆分还会使共享代码在每个文件重复。

### 6. 类型层与运行时按需语义对齐

每个 widget 入口的 d.ts 各带本 widget 的 `declare module "autostore"` 键（ADR-0004 类型链）：只引 core 时 `AutoStoreWidgets` 不含 cron 键（core 没有夹带），引 core + `form/widgets/cron` 时键出现。不强制 re-export 全量键表——那会让 `schema.widget='typo'` 在类型层放行。`__tests__/widget-entry.test-d.ts` 双场景断言钉死此契约。

## 后果

**正向**：
- bundler 用户按 `schema.widget` 所需引入，最小依赖 = core（gzip 阈值 ≤45 KB）+ 实际用到的 widget（单件 gzip 阈值 ≤8 KB，千行大户单列例外）。
- 无 bundler 用户双 `<script>`（core.global.js + widget.global.js）即可按需使用。
- CJS 死产物移除，构建时间约省 1/3。

**负向/代价**：
- exports 契约收窄（删 require 条件）严格说是 breaking change——因原路径本就失效，实际无可破坏者。
- `window.AutoFormCore` 占用一个全局名；widget IIFE 强依赖加载顺序（core 必须先行）。
- 全量 IIFE 用户与按需 IIFE 用户不可混引同一页（两份 lit），文档需明确提示。

**验证门槛**（合并前）：
1. 全量 `index.d.ts` 导出清单 diff 为空；全量 ESM/IIFE 体积波动 ±3%。
2. `widget-entry.test-d.ts` 双场景过 `tsc --noEmit`。
3. split demo（双 script）四件事人工确认：无 console 错误 / 元素升级 / 状态回写 / 暗色主题。
4. `docs/public/autoform.js` 复制链路不断，44 个存量 demo 零改动。
