# 安装

`@autostorejs/syncer` 用来实现同步不同 `AutoStore` 的数据，支持一对一、一对多等同步场景。

:::code-group

```bash [npm]
npm install  @autostorejs/syncer
```

```bash [yarn]
yarn add @autostorejs/syncer
```

```bash [pnpm]
pnpm add @autostorejs/syncer
```

```bash [bun]
bun add @autostorejs/syncer
```

:::

## 依赖关系

`@autostorejs/syncer` 依赖于 `autostore` 核心包，请确保已安装：

```bash
npm install autostore @autostorejs/syncer
```

## 浏览器环境

在浏览器中使用时，可以直接通过 CDN 引入：

```html
<script type="module">
    import { AutoStore } from "https://esm.sh/autostore";
    import { AutoStoreSyncer } from "https://esm.sh/@autostorejs/syncer";
</script>
```
