# @autostorejs/form IIFE 捆绑 autostore 运行时（单 script 承诺）

## 背景

ADR-0005 落地后，IIFE 产物（`autoform.js` / `core.global.js`）在使用上要求页面先加载 `autostore.js`（`AutoStoreSpaces` 命名空间），否则 demo 里最常见的 `configurable()` 都无处可取——浏览器用户要写两个 script 标签，且必须按顺序。

调查发现现状比「autostore 是 external」更微妙：

- **IIFE 无法表达 external import**。tsup/esbuild 对 iife format 的构建把 `dependencies`/`peerDependencies` 全部内联，而同一 config 的 esm 产物则全部 external——同一份配置两种 format 行为分叉，且是平台未文档化行为。
- 因此 form 的 IIFE 产物里**早已有**一份残缺的 autostore 副本：`AutoStore` 类（含 `Symbol("autostore.broadcast")` 等身份敏感成员）被 `@autostorejs/plugins`（asyncpro）的依赖链拖入，供 `AutoForm` 内部 `new AutoStore()` 使用；但没人 import 的部分（schema builder 的 `configurable` 等）被 tree-shake 裁掉，也不在 exports 上。
- 页面上「外部 autostore.js 创建的 store/builder」与「form 内部副本」**一直在双实例共存**，靠字符串常量（`__OBSERVER_TYPE__`）而非 Symbol 身份恰好兼容。

即：目标不是「把 external 改为打包」，而是把**被动残缺内联**变成**主动完整副本并导出**。

## 决策

### 1. 双格式分野：IIFE 捆绑、ESM external re-export

- **全量 IIFE**（`dist/index.global.js`，全局名 `AutoForm`）：捆绑 autostore 全量并 `export * from "autostore"` 重导出。浏览器用户单 script 即拿到 form + 39 widget + autostore 完整生态（`AutoForm.configurable`、`AutoForm.AutoStore`、`AutoForm.FastEvent`…）。
- **split IIFE**（`dist/iife/core.global.js`，全局名 `AutoFormCore`）：同样捆绑，平铺 API + `AutoStoreNS` 命名空间成员（供 widget IIFE 桥接）。split 场景从「三 script」减为「双 script」。
- **ESM（npm 消费）**：autostore 保持 external，入口（`index.ts`/`core.ts`）的 `export * from "autostore"` 被原样保留为 external re-export——解析到消费者自装的同一份单例，不引入第二副本。`import { configurable } from '@autostorejs/form'` 在 npm 侧同样成立。
- `package.json` 不动：autostore 维持 peerDependencies + devDependencies 双声明。peer 语义对 ESM 消费者依然成立，且避开「peer 依赖触发 changeset major 升级」的坑（见仓库记忆）。

### 2. 显式拆 config，不依赖平台默认行为

原 config1（esm+iife 共享）拆为两项：`{esm + dts}`（noExternal 不变）与 `{iife, noExternal: [..., "autostore", "@autostorejs/plugins"]}`。config3（split IIFE）noExternal 同步追加 autostore。

理由：esm/iife 的 external 分叉是 tsup/esbuild 的未文档化行为，跨版本可能变卦；构建配置是回归红线的载体，捆绑意图必须显式可读。clean 竞态由既有 build 脚本（`rm -rf dist` 串行预清空）兜底，不回潮。

### 3. 同源原则：重导出的 API 与捆绑副本天然兼容

浏览器场景的正道是用**重导出的 API**（`AutoForm.configurable` / `AutoForm.AutoStore`）创建状态——与 form 内部副本同源，instanceof/Symbol 判别全部成立。

对 `.store` 属性传入外部实例（如独立 autostore.js 创建）的情况，`AutoForm.willUpdate` 加守卫：`instanceof AutoStore`（内部副本）失败即 console.warn。显式 warn 优于静默功能退化（跨副本的 broadcast Symbol 永不相等）。**不做** core 身份机制的跨副本兼容改造——为「用户执意混用两份实现」改造 core 的成本与收益不成比例。

### 4. widget IIFE 的防御性 shim

`build-widget-iife.ts` 把 `autostore` 从 external 列表移入 shim 表（`autostore → __core.AutoStoreNS`）。现状 widget 对 autostore 的直接导入全是 type-only（产物中无实体引用），此桥接是防御性的：未来 widget 直接 import core 运行时值时不断链，且保证桥接到 core 捆绑副本——若随 widget 打包会出现多份 AutoStore 实现。

### 5. 顺手修复 ADR-0005 潜伏缺陷：shim 成员必须命名空间化

本次冒烟暴露：ADR-0005 的 cjs 桥（`module.exports = bare`）经 esbuild interop 是**属性复制**语义——shim 成员若映射到裸类/函数（原 `AutoDropdownField`/`tag`/`vars` 等），widget 侧 named import 永远取到 undefined（类自身没有以自己命名的属性）。旧产物同样携带此缺陷，只是 split widget 产物从未被自动化冒烟覆盖。

修复：`core-iife.ts` 的包内公共模块全部改为命名空间导出（`Field`/`FieldDropdown`/`UtilsTag`/`ControllersAsyncState`/`Controllers`/`UtilsRenderWidget`/`UtilsGetInputValue`/`FormVars`），shim 表对应换名。lit 系命名空间成员（`lit`/`litDecorators`/…）本就是命名空间，不受影响。

### 6. MutableRecord 消歧

form 的 `MutableRecord`（`src/types.ts`，判别联合展开形态）与 core 的同名类型不同形。两个 `export *` 冲突时 ES/TS 语义是静默排除该名字——`index.ts`/`core.ts` 显式 `export type { MutableRecord } from "./types"` 消歧：form 出口提供 form 版本，core 版本经 `from 'autostore'` 直接导入。

## 验证门槛（新红线）

- **导出清单**：全量 IIFE 142 个导出 = form 49 唯一 ∪ autostore 93 运行时导出（含 `FastEvent` 命名空间），快照存档 `0006-export-snapshot.json`。此后增删必须过 ADR。
- **体积基线**（gzip）：全量 iife 165.76 kB / core.global.js 98.05 kB；widget 产物体积与捆绑前**完全不变**（shim 是防御性的，零实体代码）。
- **运行时冒烟**（node 伪 DOM + vm 全局执行）：全量产物 configurable→AutoStore→watch 响应式链路；split 产物 AutoStoreNS/平铺 API/命名空间 shim 成员；cron widget 经桥接加载且 `AutoFieldCron` 类可达。
- **dts 冒烟**（模拟 peer 安装，d.ts 复制隔离）：`configurable/computed/watch/AutoStore` 等从 `.` 与 `./core` 出口均可导出，双侧 MutableRecord 各归其位。
- **demo**：70 个 autoform demo 全量迁移（69 单 script `AutoForm.*` + 1 split 双 script `AutoFormCore.*`），引用的全部本地资源 200 可达。widget IIFE 产物由构建复制到 `docs/public/autoform/`（原为手工复制，链路缺口已补）。

## 后果

- 浏览器用户引入成本减半（单 script）；文档 demo 叙事与产物形态一致。
- 全量 IIFE 体积 +1.8 kB gz（core 大部分本已被 plugins 链拖入，纯增量只有 schema builder 等）。
- `docs/public/autostore.js` 的复制链路保留——syncer/template/react 等其它目录 demo 仍在使用。
- 双副本风险被显式化（同源原则 + `.store` 守卫 warn），但不消除——用户混用两份实现时的行为边界以本 ADR 与 CONTEXT.md「捆绑副本」术语为准。
