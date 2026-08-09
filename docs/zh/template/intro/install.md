# 安装

`@autostorejs/template` 是 [AutoStore](../../store/guide/store/about.md) 的声明式模板渲染引擎。它以 `autostore` 为同伴依赖（peerDependency），两者配套使用。

## 包管理器安装

::: code-group

```bash [npm]
npm install autostore @autostorejs/template
```

```bash [pnpm]
pnpm add autostore @autostorejs/template
```

```bash [yarn]
yarn add autostore @autostorejs/template
```

```bash [bun]
bun add autostore @autostorejs/template
```

:::

## 引入方式

### ES Module（推荐）

```javascript
import { AutoTemplateEngine } from "@autostorejs/template";
import { AutoStore } from "autostore";

const store = new AutoStore({ user: { name: "张三" } });
const engine = new AutoTemplateEngine(document.getElementById("app"), store);
```

### IIFE（浏览器直接引入）

在浏览器中用 `<script>` 标签引入 IIFE 产物，挂载在全局 `AutoTemplateSpaces` 下：

```html
<script src="https://unpkg.com/@autostorejs/template/dist/index.global.js"></script>
<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    const engine = new AutoTemplateEngine(document.getElementById("app"), {
        user: { name: "张三" },
    });
</script>
```

::: tip 传入裸状态即可
构造器第二参既可传 `AutoStore` 实例，也可直接传**裸状态对象**——引擎会自动建立 store。上例 IIFE 形式传的就是裸状态，无需手动 `new AutoStore`。详见[初始化](../guide/initial.md)。
:::

### CommonJS

```javascript
const { AutoTemplateEngine } = require("@autostorejs/template");
```

## 依赖说明

| 依赖 | 关系 | 说明 |
| --- | --- | --- |
| `autostore` | peerDependency | 响应式状态层，必须配套安装 |
| `really-relaxed-json` | dependency | 解析 `x-*-options` 的宽松 JSON，随包安装 |

## TypeScript

`@autostorejs/template` 自带类型声明，开箱即用：

```typescript
import { AutoTemplateEngine } from "@autostorejs/template";
import type { AutoTemplateEngineOptions } from "@autostorejs/template";

const options: Partial<AutoTemplateEngineOptions> = { debug: true };
const engine = new AutoTemplateEngine(el, state, options);
```

---

安装完成后，前往[快速入门](./get-started.md)写下第一个模板。
