# Cron

cron 表达式编辑组件。

下拉触发器显示中文描述与原始表达式，面板内以左侧垂直 tab（月/周/日/小时/分钟，启用秒时追加秒，showYear 开启年）编辑各字段，改动即时写回状态。

## 方言

默认 **6 字段** `分 时 日 月 周 年`；`enableSeconds` 启用后为 **7 字段**（秒在最前）。字段数不匹配的外部值判为不可解析，不做静默补删。

每个字段恒为三种模式之一：

| 模式 | 语法 | 说明 |
| ---- | ---- | ---- |
| 不限 | `*` | 该维度不参与指定 |
| 间隔 | `X/N` | 每 N 个，支持起始偏移（起始为字段最小值时序列化为 `*/N`） |
| 指定 | `a,b,a-b` | 枚举多选，连续数字序列化时自动压缩为 `a-b` 区间 |

周编码 `1=周一 … 7=周日`（解析兼容 `0` 视为周日）；日与周同时指定为标准 cron 交集语义。

外部值含 UI 无法表达的合法片段（如 `L`、`W`、`#`、`1-5/2`）时该字段 tab 显示原始片段并标注高级语法，用户改动该字段即覆盖。

## 参数

```ts
type AutoFieldCronOptions = {
    // 启用秒字段（表达式变为 7 字段），默认 false
    enableSeconds?: boolean;
    // 显示年 tab，默认 false（隐藏时年字段恒输出 *）
    showYear?: boolean;
    // 年 tab 可选范围，默认 [当前年, 当前年+10]
    yearRange?: [number, number];
    // 覆盖各字段的间隔步长预设
    stepOptions?: Partial<Record<CronField, number[]>>;
    // 字段值为空时的默认表达式（挂载即写入状态）
    defaultCron?: string;
    // 触发器占位文案
    placeholder?: string;
    // 下拉面板最小宽度（px），默认 620
    panelMinWidth?: number;
    // 覆盖 UI 文案与描述模板（zh-CN 默认值）
    i18n?: Partial<CronI18n>;
};
```

`i18n` 覆盖 tab 名、模式名、辅助按钮、提示语以及中文描述生成模板，模板使用 `{xxx}` 占位符（core 的 `params` 插值）。

## 示例

<demo html="autoform/widgets/cron.html"/>
