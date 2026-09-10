# Cron

## 概述

`Cron`是 cron 表达式编辑组件。下拉触发器显示中文描述与原始表达式，面板内以左侧垂直 tab（月/周/日/小时/分钟，启用秒时追加秒，`showYear`开启后追加年）编辑各字段，改动即时写回状态。

## 方言

默认 **6 字段**`分 时 日 月 周 年`；`enableSeconds`启用后为 **7 字段**（秒在最前）。字段数不匹配的外部值判为不可解析，不做静默补删。

每个字段恒为三种模式之一：

| 模式 | 语法      | 说明                                                         |
| ---- | --------- | ------------------------------------------------------------ |
| 不限 | `*`       | 该维度不参与指定                                             |
| 间隔 | `X/N`     | 每 N 个，支持起始偏移（起始为字段最小值时序列化为`*/N`）      |
| 指定 | `a,b,a-b` | 枚举多选，连续数字序列化时自动压缩为`a-b`区间                 |

周编码`1=周一 … 7=周日`（解析兼容`0`视为周日）；日与周同时指定为标准 cron 交集语义。

外部值含 UI 无法表达的合法片段（如`L`、`W`、`#`、`1-5/2`）时该字段 tab 显示原始片段并标注高级语法，用户改动该字段即覆盖。

## 示例

声明一个 cron 字段只需要指定`widget: 'cron'`，值是一个 cron 表达式字符串：

```ts
const form = document.querySelector('#form');
form.state = {
    schedule: configurable('', {
        label: '执行周期',
        widget: 'cron',
        placeholder: '请选择执行周期',
    }),
};
```

<demo html="autoform/widgets/cron.html"/>

## 指南

### 启用秒与年

默认编辑 6 字段表达式`分 时 日 月 周 年`。`enableSeconds`启用秒字段（表达式变为 7 字段，秒在最前）；`showYear`控制是否显示年 tab，隐藏时年字段恒输出`*`：

```ts
form.state = {
    withSeconds: configurable('', {
        label: '含秒周期',
        widget: 'cron',
        enableSeconds: true, // [!code ++]
    }),
    withYear: configurable('', {
        label: '显示年',
        widget: 'cron',
        showYear: true, // [!code ++]
    }),
};
```

`yearRange`限定年 tab 的可选范围，默认`[当前年, 当前年+10]`。

### 间隔步长

`stepOptions`覆盖各字段的间隔步长预设，按字段名（`year`/`month`/`week`/`day`/`hour`/`minute`/`second`）指定可选步长数组：

```ts
form.state = {
    custom: configurable('', {
        label: '自定义',
        widget: 'cron',
        yearRange: [2026, 2030],
        stepOptions: { minute: [1, 5, 15, 30] }, // [!code ++]
        panelMinWidth: 680, // [!code ++]
    }),
};
```

`panelMinWidth`指定下拉面板最小宽度（px），面板宽度=触发器宽度但不小于该值，默认`620`。

### 默认表达式

`defaultCron`在字段值为空时作为默认表达式，挂载即写入状态：

```ts
form.state = {
    withDefault: configurable('', {
        label: '默认周期',
        widget: 'cron',
        defaultCron: '0 8 1 * * 2027', // [!code ++]
    }),
};
```

### 国际化

`i18n`覆盖 UI 文案与中文描述生成模板，包括 tab 名、模式名、辅助按钮（全选/反选/清空）、周显示名以及描述模板。模板使用`{xxx}`占位符：

```ts
form.state = {
    schedule: configurable('', {
        label: 'Schedule',
        widget: 'cron',
        i18n: { // [!code ++]
            minute: 'Minute', // [!code ++]
            weekNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // [!code ++]
            descMinute: 'at {value}m', // [!code ++]
        }, // [!code ++]
    }),
};
```

### 按需引入

cron 产物可以脱离全量包按需引入，详见[按需引入](../on-demand.md)。ESM 场景引入`core`与`widgets/cron`两个产物：

```ts
import "@autostorejs/form/core";
import "@autostorejs/form/widgets/cron";
// 现在 schema.widget: 'cron' 可用
```

浏览器双`script`（IIFE）场景下顺序是硬约束——`core`必须先行，它是 lit 单例的宿主：

```html
<script src="https://cdn.example.com/autostore.js"></script>
<!-- 先 core，后 widget -->
<script src="https://cdn.example.com/form/core.global.js"></script>
<script src="https://cdn.example.com/form/widgets/cron.global.js"></script>
```

<demo html="autoform/split/cron.html" title="按需引入（core + cron 双 script）"/>

## 属性

| 属性            |    类型     |        默认值        | 说明                                                        |
| --------------- | :---------: | :------------------: | ----------------------------------------------------------- |
| `enableSeconds` |  `boolean`  |       `false`        | 启用秒字段（表达式变为 7 字段）                             |
| `showYear`      |  `boolean`  |       `false`        | 显示年 tab（隐藏时年字段恒输出`*`）                         |
| `yearRange`     | `[number, number]` | `[当前年, 当前年+10]` | 年 tab 可选范围                                    |
| `stepOptions`   |   `object`   |         `{}`         | 覆盖各字段的间隔步长预设                                    |
| `defaultCron`   |  `string`   |                      | 字段值为空时的默认表达式（挂载即写入状态）                  |
| `placeholder`   |  `string`   |   `请选择执行周期`   | 触发器占位文案                                              |
| `panelMinWidth` |  `number`   |        `620`         | 下拉面板最小宽度（px）                                      |
| `i18n`          |   `object`   |         `{}`         | 覆盖 UI 文案与描述模板（zh-CN 默认值）                      |

## 注意事项

-   字段数不匹配的外部值（如 6 字段模式下传入 7 字段表达式）判为不可解析，不做静默补删。
-   外部值含`L`、`W`、`#`、`1-5/2`等高级语法时该字段 tab 显示原始片段并标注，用户一旦改动该字段即覆盖原片段。
-   周`0`仅用于解析兼容（视为周日），序列化输出始终为`1-7`编码。
