# 图标

## 指南

### 自定义图标库

默认情况下，`AutoForm`使用`lucide`图标库,可以在[lucide](https://lucide.dev/icons/)查询图标。
你也可以通过`registerIcons`自定义配置图标库。

```ts
import { registerIcons } from '@autostorejs/form';

// registerIcons(url, icons)
registerIcons(
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg",
    {
    'expand:`<图标SVG数据>`,
    'collapse:`<图标SVG数据>`
    // ....
})

```

-   `url`：图标地址，`{name}`为图标名称。
-   `icons`：图标名称和图标 SVG 数据，用于预设图标数据库。

:::warning 提示
最佳实践: 使用`registerIcons`的`icons`参数提供预加载的图标，而`url`参数则提供的图标则仅在需要在加载。
:::

### 内置图标

`AutoForm`内置了一些常用图标，可以直接使用：

`help`,`error`,`email`,`search`,`lock`,`user`,`globe`,`date`,`time`,`phone`,`copy`,`remove`,`refresh`,`datetime`,`bell`

<demo html="autoform/icons.html"/>
