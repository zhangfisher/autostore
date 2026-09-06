/**
 * cron 表达式编辑 widget
 *
 * 方言（见 CONTEXT.md「Cron 方言」）：默认 6 字段 `分 时 日 月 周 年`，
 * enableSeconds 启用后为 7 字段 `秒 分 时 日 月 周 年`（秒在最前）。
 * 字段模式恒三选一：不限 `*` / 间隔 `X/N` / 指定（枚举，连续数字压缩为 a-b）。
 * 周 1=周一…7=周日，解析兼容 0（视为周日）。日/周同时指定为标准 cron 交集语义。
 */
import { state } from "lit/decorators.js";
import { css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
import { AutoField } from "@/field";
import { AutoDropdownField } from "@/field/dropdown";
import { tag } from "@/utils/tag";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/radio/radio.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";

/* ------------------------------------------------------------------
 * 数据模型与纯函数（无 DOM 依赖，可独立测试）
 * ------------------------------------------------------------------ */

/** cron 字段键（UI 大→小顺序） */
export type CronField = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";

/** 字段模式：不限 | 间隔 | 指定 */
export type CronFieldPattern = "any" | "interval" | "pick";

/** 单字段的解析结果 */
export type CronFieldValue = {
    pattern: CronFieldPattern;
    /** interval: 起始值 X 与步长 N */
    start?: number;
    step?: number;
    /** pick: 枚举值（已展开 a-b） */
    picks?: number[];
    /** 高级语法：UI 无法可视化，保留原始片段（pattern=any 时挂载） */
    advanced?: string;
};

/** 表达式解析结果 */
export type CronExpression = {
    valid: boolean;
    /** 解析失败时回显原始串 */
    raw?: string;
    second?: CronFieldValue;
    minute?: CronFieldValue;
    hour?: CronFieldValue;
    day?: CronFieldValue;
    month?: CronFieldValue;
    week?: CronFieldValue;
    year?: CronFieldValue;
};

/** 字段元数据：值域（年字段的可选域由 yearRange 配置决定，此处仅作序列化边界） */
const FIELD_SPECS: Record<CronField, { min: number; max: number }> = {
    second: { min: 0, max: 59 },
    minute: { min: 0, max: 59 },
    hour: { min: 0, max: 23 },
    day: { min: 1, max: 31 },
    month: { min: 1, max: 12 },
    week: { min: 1, max: 7 },
    year: { min: 1970, max: 9999 },
};

/** 表达式字段顺序（小→大）；秒在最前 */
const EXPR_ORDER: CronField[] = ["second", "minute", "hour", "day", "month", "week", "year"];
/** UI tab 顺序（大→小）；秒启用时追加在末尾 */
const UI_ORDER: CronField[] = ["year", "month", "week", "day", "hour", "minute", "second"];

/**
 * 解析单字段片段
 *
 * 值域外/非法数字返回 any+advanced 透传；L/W/#、混合式等合法高级语法同样透传。
 */
function parseField(part: string, field: CronField): CronFieldValue {
    const spec = FIELD_SPECS[field];
    if (part === "*") return { pattern: "any" };
    // 间隔：X/N 或 */N
    const interval = part.match(/^(\*|\d+)\/(\d+)$/);
    if (interval) {
        // 周 0=周日 兼容：规范化为 7 后再校验值域
        const start =
            interval[1] === "*"
                ? spec.min
                : field === "week" && Number(interval[1]) === 0
                  ? 7
                  : Number(interval[1]);
        const step = Number(interval[2]);
        if (start < spec.min || start > spec.max || step < 1 || step > spec.max)
            return { pattern: "any", advanced: part };
        return { pattern: "interval", start, step };
    }
    // 指定：a,b,c 或 a-b（混合 a-b/c 视为高级语法透传）
    if (/^\d+(-\d+)?(,\d+(-\d+)?)*$/.test(part)) {
        const picks: number[] = [];
        for (const seg of part.split(",")) {
            const range = seg.match(/^(\d+)-(\d+)$/);
            if (range) {
                const from = Number(range[1]);
                const to = field === "week" && Number(range[2]) === 7 ? 7 : Number(range[2]);
                if (from < spec.min || to > spec.max || from > to)
                    return { pattern: "any", advanced: part };
                for (let v = from; v <= to; v++) if (!picks.includes(v)) picks.push(v);
            } else {
                // 周 0=周日 兼容：规范化为 7 后再校验值域
                const v = field === "week" && Number(seg) === 0 ? 7 : Number(seg);
                if (v < spec.min || v > spec.max) return { pattern: "any", advanced: part };
                if (!picks.includes(v)) picks.push(v);
            }
        }
        picks.sort((a, b) => a - b);
        return { pattern: "pick", picks };
    }
    // 其余合法 cron 语法（L/W/#、混合式等）：高级语法透传
    return { pattern: "any", advanced: part };
}

/**
 * 解析 cron 表达式字符串
 *
 * 字段数与 enableSeconds 必须严格匹配（6↔6、7↔7），不匹配判为不可解析。
 */
export function parseCron(expr: string, enableSeconds = false): CronExpression {
    const result: CronExpression = { valid: false, raw: expr };
    if (typeof expr !== "string" || expr.trim() === "") return result;
    const parts = expr.trim().split(/\s+/);
    const expect = enableSeconds ? 7 : 6;
    if (parts.length !== expect) return result;
    const order = enableSeconds ? EXPR_ORDER : EXPR_ORDER.filter((f) => f !== "second");
    for (let i = 0; i < order.length; i++) {
        (result as any)[order[i]] = parseField(parts[i], order[i]);
    }
    result.valid = true;
    return result;
}

/** picks 序列化：连续数字压缩为 a-b（如 1,2,3,10 → "1-3,10"）；空返回空串 */
function compressPicks(picks: number[]): string {
    const sorted = picks.slice().sort((a, b) => a - b);
    if (sorted.length === 0) return "";
    const segments: string[] = [];
    let from = sorted[0];
    let prev = sorted[0];
    for (let i = 1; i <= sorted.length; i++) {
        const cur = sorted[i];
        if (cur !== prev + 1) {
            segments.push(from === prev ? `${from}` : `${from}-${prev}`);
            from = cur;
        }
        prev = cur!;
    }
    return segments.join(",");
}

/**
 * 序列化单字段：连续数字压缩为 a-b
 */
function serializeField(field: CronField, value: CronFieldValue | undefined): string {
    if (!value || value.pattern === "any") {
        // 高级语法透传：any+advanced 表示「解析出了无法可视化的片段」
        return value?.advanced ?? "*";
    }
    if (value.pattern === "interval") {
        const spec = FIELD_SPECS[field];
        const start = value.start ?? spec.min;
        return start === spec.min ? `*/${value.step}` : `${start}/${value.step}`;
    }
    // pick → 连续段压缩（空 picks 等同 *）
    return compressPicks(value.picks ?? []) || "*";
}

/**
 * 序列化为 cron 表达式字符串
 */
export function serializeCron(expr: CronExpression, enableSeconds = false): string {
    const order = enableSeconds ? EXPR_ORDER : EXPR_ORDER.filter((f) => f !== "second");
    return order.map((f) => serializeField(f, (expr as any)[f])).join(" ");
}

/* ------------------------------------------------------------------
 * i18n（全量文案 + 描述模板，zh-CN 默认值；模板用 {xxx} 占位符 + params 插值）
 * ------------------------------------------------------------------ */

export type CronI18n = {
    // tab 名
    year: string;
    month: string;
    week: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    // 模式名
    patternAny: string;
    patternInterval: string;
    patternPick: string;
    // 间隔模式
    intervalEvery: string; // 「每{interval}」（描述生成用整句模板）
    intervalFrom: string; // 「从{start}开始」（描述生成用整句模板）
    intervalUnit: string; // 间隔值的单位后缀（中文为空串）
    fromPrefix: string; // 「从」（面板 UI 词级组合）
    fromSuffix: string; // 「开始」（面板 UI 词级组合）
    stepLabel: string; // 「步长」（面板 UI 词级组合）
    intervalSuffix: string; // 「{field}（步长）」间隔行尾部（面板 UI 词级组合）
    intervalPreviewEvery: string; // 「每{field} {values}」预览行（values 为命中值列表）
    // 指定模式辅助
    pickAll: string;
    pickInvert: string;
    pickClear: string;
    pickInputHint: string; // 「如 1,1-2,33,22」指定模式输入框占位提示
    // 周显示名（1=周一…7=周日）
    weekNames: [string, string, string, string, string, string, string];
    // 触发器/预览描述模板
    descSecond: string; // 「第{value}秒」
    descMinute: string; // 「第{value}分」
    descHour: string; // 「{value}点」
    descDay: string; // 「{value}日」
    descMonth: string; // 「{value}月」
    descWeek: string; // 「周{value}」（weekNames 已是全名，此模板用于覆盖场景）
    descYear: string; // 「{value}年」
    descEveryField: string; // 「每{value}」（value=「5分钟」这类带单位短语）
    descJoin: string; // 片段连接符「、」
    descRange: string; // 连续值压缩「{from}-{to}」（如 1-3分钟；from==to 时退化为单值）
    descEveryMinute: string; // 全 * 时的兜底「每分钟」
    descEverySecond: string; // 全 *（含秒）时的兜底「每秒」
    // 提示
    placeholder: string;
    unparseable: string; // 「表达式无法解析」
    advanced: string; // 「高级语法（未可视化）：{value}」
    resetToStart: string; // 「当前值无法解析，编辑将从默认开始」
};

const DEFAULT_I18N: CronI18n = {
    year: "年",
    month: "月",
    week: "周",
    day: "日",
    hour: "小时",
    minute: "分钟",
    second: "秒",
    patternAny: "不限",
    patternInterval: "间隔周期",
    patternPick: "指定",
    intervalEvery: "每{interval}",
    intervalFrom: "从{start}开始",
    intervalUnit: "",
    fromPrefix: "从",
    fromSuffix: "开始",
    stepLabel: "步长",
    intervalSuffix: "{field}（步长）",
    intervalPreviewEvery: "每{field} {values}",
    pickAll: "全选",
    pickInvert: "反选",
    pickClear: "清空",
    pickInputHint: "如 1,1-2,33,22",
    weekNames: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    descSecond: "{value}秒",
    descMinute: "{value}分",
    descHour: "{value}点",
    descDay: "{value}日",
    descMonth: "{value}月",
    descWeek: "周{value}",
    descYear: "{value}年",
    descEveryField: "每{value}",
    descJoin: "、",
    descRange: "{from}-{to}",
    descEveryMinute: "每分钟",
    descEverySecond: "每秒",
    placeholder: "请选择执行周期",
    unparseable: "表达式无法解析",
    advanced: "高级语法（未可视化）：{value}",
    resetToStart: "当前值无法解析，编辑将从默认开始",
};

/* ------------------------------------------------------------------
 * 友好描述生成（省略 * 字段；秒为 0 省略）
 * ------------------------------------------------------------------ */

/**
 * 生成 cron 表达式的友好描述
 *
 * 规则：`*` 字段省略不说；秒为单值 0 时省略；间隔说出「每N<单位>（从X开始）」。
 */
export function describeCron(
    expr: CronExpression | string,
    enableSeconds = false,
    textsOverride?: Partial<CronI18n>,
): string {
    const texts = { ...DEFAULT_I18N, ...textsOverride };
    const parsed = typeof expr === "string" ? parseCron(expr, enableSeconds) : expr;
    if (!parsed.valid) return typeof expr === "string" ? expr : (parsed.raw ?? "");
    const segments: string[] = [];
    /** 描述一个维度：pick 连续值压缩为 a-b<单位>，interval 用「每N<单位>」 */
    const pushDim = (
        field: CronField,
        descKey: keyof CronI18n,
        valueFormatter?: (v: number) => string,
    ) => {
        const v = (parsed as any)[field] as CronFieldValue | undefined;
        if (!v || v.pattern === "any") return;
        const label = texts[field];
        if (v.pattern === "interval") {
            const step = v.step ?? 1;
            const unit = texts.intervalUnit.params({ field: label });
            const every = texts.descEveryField.params({
                value: `${step > 1 ? step : ""}${label}${unit}`,
            });
            const fromMin = v.start === undefined || v.start === FIELD_SPECS[field].min;
            segments.push(
                fromMin ? every : `${every}${texts.intervalFrom.params({ start: v.start! })}`,
            );
            return;
        }
        if (v.pattern === "pick" && v.picks?.length) {
            if (valueFormatter) {
                // 周：值已是全名（周一…），无连续压缩，直接连接
                segments.push(v.picks.map((n) => valueFormatter(n)).join(texts.descJoin));
                return;
            }
            // 数字值：连续序列压缩为「from-to」，单位由 descKey 模板渲染在段尾（如 1-3分钟）
            const picks = v.picks.slice().sort((a, b) => a - b);
            const parts: string[] = [];
            let from = picks[0];
            let prev = picks[0];
            const flush = (to: number) => {
                parts.push(
                    to === from
                        ? (texts[descKey] as string).params({ value: from })
                        : texts.descRange.params({ from, to }) +
                          (texts[descKey] as string).params({ value: "" }),
                );
            };
            for (let i = 1; i < picks.length; i++) {
                if (picks[i] !== prev + 1) {
                    flush(prev);
                    from = picks[i];
                }
                prev = picks[i];
            }
            flush(prev);
            segments.push(parts.join(texts.descJoin));
        }
    };
    // 秒为单值 0 时省略（「整分」语义无需说出）
    const second = parsed.second as CronFieldValue | undefined;
    const omitSecond =
        second?.pattern === "pick" && second.picks?.length === 1 && second.picks[0] === 0;
    // 大→小：年/月/周/日（周显示 weekNames 全名）；时间部分按 点→分→秒 口语顺序
    pushDim("year", "descYear");
    pushDim("month", "descMonth");
    pushDim("week", "descWeek", (v) => texts.weekNames[v - 1]);
    pushDim("day", "descDay");
    pushDim("hour", "descHour");
    pushDim("minute", "descMinute");
    if (!(enableSeconds && omitSecond)) pushDim("second", "descSecond");
    if (segments.length === 0) {
        return enableSeconds ? texts.descEverySecond : texts.descEveryMinute;
    }
    return segments.join(texts.descJoin);
}

/* ------------------------------------------------------------------
 * widget 配置
 * ------------------------------------------------------------------ */

/**
 * cron widget 的配置类型
 */
export interface AutoFieldCronOptions {
    /**
     * 启用秒字段（表达式变为 7 字段），默认 false
     */
    enableSeconds?: boolean;
    /**
     * 显示年 tab，默认 false（隐藏时年字段恒输出 *）
     */
    showYear?: boolean;
    /**
     * 年 tab 可选范围，默认 [当前年, 当前年+10]
     */
    yearRange?: [number, number];
    /**
     * 覆盖各字段的间隔步长预设
     */
    stepOptions?: Partial<Record<CronField, number[]>>;
    /**
     * 字段值为空时的默认表达式（挂载即写入 store）
     */
    defaultCron?: string;
    /**
     * 触发器占位文案
     */
    placeholder?: string;
    /**
     * 下拉面板最小宽度（px），面板宽度=触发器宽度但不小于该值，默认 620
     */
    panelMinWidth?: number;
    /**
     * 覆盖 UI 文案与描述模板（zh-CN 默认值）
     */
    i18n?: Partial<CronI18n>;
}

/* ------------------------------------------------------------------
 * 组件
 * ------------------------------------------------------------------ */

@tag("auto-field-cron")
export class AutoFieldCron extends AutoDropdownField<AutoFieldCronOptions> {
    static styles = [
        AutoField.styles,
        AutoDropdownField.styles,
        css`
            :host {
                display: block;
            }
            /* 面板高度自动：由内容（编辑区）决定，上限约束在可视区内 */
            .cron-panel {
                display: flex;
                flex-direction: column;
                max-height: min(380px, 80vh);
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-sizing: border-box;
                overflow: hidden;
            }
            .cron-body {
                flex: 1 1 auto;
                min-height: 0;
                display: flex;
                overflow: hidden;
            }
            /* tab-group 充满 .cron-body（shoelace :host 默认 display:block，不参与拉伸） */
            .cron-tab-group {
                flex: 1 1 auto;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }
            /* base=横向布局根：nav 列固定内容宽，body(panel) 占满剩余空间 */
            .cron-tab-group::part(base) {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                min-height: 0;
                border-right: var(--auto-border);
            }
            /* nav 两侧默认 x-large 留白会撑宽 tab 列，收敛为小间距 */
            .cron-tab-group::part(nav) {
                flex: 0 0 auto;
                padding: 0 var(--sl-spacing-small);
            }
            /* tab 固定宽度：内容自适应 + 统一最小宽，不随容器拉伸 */
            .cron-tabs sl-tab {
                flex: 0 0 auto;
                min-width: 5em;
                font-size: var(--auto-font-size);
            }
            .cron-tabs sl-tab::part(base) {
                justify-content: center;
            }
            /* body 是 tab-panel 的直接父级，占满剩余宽度与高度 */
            .cron-tab-group::part(body) {
                flex: 1 1 auto;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            /* 不能对 sl-tab-panel 设 display：shoelace 依赖 :host{display:none}/:host([active]){display:block}
               控制显隐，外部 display:flex 会覆盖 none 导致所有 panel 恒显、切换失效。
               高度 100% 只能借 host 自身选择器设 height（不触碰 display），
               flex 拉伸对 block host 无效；内部布局在 ::part(base) 上展开。 */
            .cron-body sl-tab-panel {
                height: 100%;
                min-height: 0;
            }
            .cron-body sl-tab-panel::part(base) {
                display: flex;
                flex-direction: column;
                height: 100%;
                min-height: 0;
                box-sizing: border-box;
            }
            .cron-tabs sl-tab {
                font-size: var(--auto-font-size);
            }
            /* 面板内容容器：gap + 自动换行；按钮网格自适应换行填满面板，不出滚动条 */
            .cron-editor {
                flex: 1 1 auto;
                width: 100%;
                box-sizing: border-box;
                padding: 0.8em;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;
                gap: 0.8em;
            }
            .pattern-row sl-radio-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5em;
            }
            /* 间隔配置从属于「间隔」radio：缩进对齐 radio 文案，与后续 radio 同列 */
            .interval-slot {
                padding-left: calc(var(--sl-toggle-size-small) + 0.5em);
            }
            .interval-row {
                display: flex;
                align-items: center;
                gap: 0.5em;
                flex-wrap: wrap;
                max-width: 100%;
                padding-top: 1em;
                padding-bottom: 0.2em;
            }
            .interval-row .label {
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
            }
            /* 间隔模式预览：灰色小字两行（配置句 + 命中值展开） */
            .interval-preview {
                display: flex;
                flex-direction: column;
                gap: 0.15em;
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                line-height: 1.5;
            }
            /* 下拉宽度由内容决定：外部 width:auto 无效，因内部 display input 有默认内在宽度（约 20 字符）。
               间隔值最多两位数字（年无间隔模式），按 ch 收缩 input 即可让整体贴合内容 */
            .interval-row sl-select {
                flex: 0 0 auto;
                width: auto;
                min-width: 0;
            }
            .interval-row sl-select::part(display-input) {
                width: 2.5ch;
            }
            /* 间隔下拉的弹出层：面板是 overflow:hidden 的固定高容器（380px），select 处于面板下部时
               floating-ui flip 会把 listbox 翻到上方并按剩余可视高度压缩（auto-size vertical），
               表现为「向上弹 + 只有一行」。hoist 属性让 popup 以 fixed 定位逃出裁剪容器，
               再用 max-height 放开高度限制（listbox 自身 overflow:auto 会出滚动条）。 */
            .interval-row sl-select::part(listbox) {
                max-height: 16em;
            }
            .pick-toolbar {
                display: flex;
                flex-wrap: wrap;
                gap: 0.4em;
            }
            .pick-toolbar sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
            }
            .pick-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.3em;
                width: 100%;
            }
            /* 间隔模式的覆盖范围网格：只读高亮（用户已移除该预览，样式保留以防回退） */
            .pick-grid.readonly {
                pointer-events: none;
            }
            /* 指定模式输入框：占位提示即格式说明 */
            .pick-input-row {
                width: 100%;
            }
            .pick-input-row sl-input {
                width: 100%;
                font-family: var(--sl-font-mono);
            }
            .pick-grid sl-button {
                margin: 0;
            }
            .pick-grid sl-button::part(base) {
                font-size: calc(0.85 * var(--auto-font-size));
                padding-left: 0.4em;
                padding-right: 0.4em;
            }
            .pick-grid sl-button.week::part(base) {
                font-size: calc(0.95 * var(--auto-font-size));
            }
            .advanced-tip {
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
            }
            .advanced-tip::before {
                content: "⚠ ";
            }
            .reset-banner {
                padding: 0.4em 0.8em;
                font-size: calc(0.85 * var(--auto-font-size));
                color: var(--sl-color-warning-600);
                background-color: var(--sl-color-warning-100);
            }
            .reset-banner::before {
                content: "⚠ ";
            }
            /* 面板顶部：cron 友好描述（编辑即时更新） */
            .cron-desc {
                padding: 0.5em;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                border-bottom: var(--auto-border);
                flex-shrink: 0;
            }
            .trigger-desc {
                flex: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-expr {
                font-size: calc(0.8 * var(--auto-font-size));
                color: var(--auto-border-color);
                font-family: var(--sl-font-mono);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .trigger-warn {
                color: var(--sl-color-warning-600);
                margin-left: 0.3em;
            }
        `,
    ] as any;

    /** 编辑态（面板打开期间的字段值快照），null 表示未初始化 */
    @state()
    private _editing: CronExpression | null = null;
    /** 指定模式输入框的原始文本（按字段）：渲染时优先显示，避免区间被展开覆写正在输入的内容 */
    private _pickTexts: Partial<Record<CronField, string>> = {};
    /** 拖选状态：按下时首按钮状态决定整片选/取消方向 */
    private _dragging = false;
    private _dragSelect = true;

    getInitialOptions() {
        const now = new Date();
        return {
            ...super.getInitialOptions(),
            enableSeconds: false,
            showYear: false,
            yearRange: [now.getFullYear(), now.getFullYear() + 10] as [number, number],
            stepOptions: {},
            defaultCron: undefined,
            placeholder: DEFAULT_I18N.placeholder,
            panelMinWidth: 620,
            i18n: {},
        };
    }

    get texts(): CronI18n {
        return { ...DEFAULT_I18N, ...this.options.i18n } as CronI18n;
    }

    connectedCallback(): void {
        super.connectedCallback();
        // defaultCron：值为空时挂载即写入 store（Q33-a）
        if (this._isEmpty() && this.options.defaultCron) {
            const parsed = parseCron(this.options.defaultCron, this.options.enableSeconds);
            if (parsed.valid) {
                this._commit(parsed);
            }
        }
    }

    /** 当前表达式（编辑态优先，其次 store 值解析） */
    get _expr(): CronExpression {
        if (this._editing) return this._editing;
        return parseCron(this.value ?? "", this.options.enableSeconds);
    }

    _isEmpty() {
        return !this.value || (typeof this.value === "string" && this.value.trim() === "");
    }

    getInputValue() {
        const expr = this._expr;
        // 隐藏年 tab 时年字段恒输出 *（外部传入的年值不参与序列化）
        if (!this.options.showYear && expr.valid) (expr as any).year = { pattern: "any" };
        return serializeCron(expr, this.options.enableSeconds);
    }

    /** 编辑并即时写回 store */
    private _commit(expr: CronExpression) {
        this._editing = expr;
        this.onFieldChange();
    }

    /** 面板打开期间获取编辑态：未初始化则由当前值解析；不可解析时从全 * 开始（Q19/Q21） */
    private _ensureEditing(): CronExpression {
        if (!this._editing) {
            const parsed = parseCron(this.value ?? "", this.options.enableSeconds);
            this._editing = parsed.valid
                ? parsed
                : ({
                      valid: true,
                      ...UI_ORDER.reduce(
                          (acc, f) => ({ ...acc, [f]: { pattern: "any" as const } }),
                          {},
                      ),
                  } as CronExpression);
        }
        return this._editing;
    }

    /** 更新编辑态某字段并提交 */
    private _setField(field: CronField, value: CronFieldValue) {
        const editing = this._ensureEditing();
        this._commit({ ...editing, [field]: value } as CronExpression);
    }

    /* ---------- 触发器 / 只读视图 ---------- */

    renderSelection() {
        // 触发器只渲染最终的 cron 表达式（友好描述移至下拉面板顶部）
        if (this._isEmpty()) return html``;
        const parsed = parseCron(this.value, this.options.enableSeconds);
        if (!parsed.valid) {
            return html`<span class="trigger-desc">${this.value}</span
                ><span class="trigger-warn" title="${this.texts.unparseable}">⚠</span>`;
        }
        return html`<span class="trigger-expr">${this.value}</span>`;
    }

    renderView() {
        if (this._isEmpty()) return html``;
        const parsed = parseCron(this.value, this.options.enableSeconds);
        if (!parsed.valid) return html`${this.value}`;
        return html`<div>
                ${describeCron(parsed, this.options.enableSeconds, this.options.i18n)}
            </div>
            <div class="trigger-expr">${this.value}</div>`;
    }

    /* ---------- 面板 ---------- */

    renderDropdown() {
        const fields = UI_ORDER.filter(
            (f) =>
                (f !== "second" || this.options.enableSeconds) &&
                (f !== "year" || this.options.showYear),
        );
        const expr = this._ensureEditing();
        const unparseable =
            !this._isEmpty() && !parseCron(this.value, this.options.enableSeconds).valid;
        return html`<div class="cron-panel" style="min-width:${this.options.panelMinWidth}px">
            ${when(
                unparseable,
                () => html`<div class="reset-banner">${this.texts.resetToStart}</div>`,
            )}
            <div class="cron-desc">
                ${describeCron(expr, this.options.enableSeconds, this.options.i18n)}
            </div>
            <div class="cron-body">
                <sl-tab-group placement="start" class="cron-tabs cron-tab-group">
                    ${repeat(
                        fields,
                        (f) => `tab-${f}`,
                        (f) => html`<sl-tab slot="nav" panel="${f}">${this.texts[f]}</sl-tab>`,
                    )}
                    ${repeat(
                        fields,
                        (f) => `panel-${f}`,
                        (f) =>
                            html`<sl-tab-panel name="${f}"
                                ><div class="cron-editor">
                                    ${this._renderFieldEditor(f, expr)}
                                </div></sl-tab-panel
                            >`,
                    )}
                </sl-tab-group>
            </div>
        </div>`;
    }

    /* ---------- 单字段编辑区 ---------- */

    private _renderFieldEditor(field: CronField, expr: CronExpression) {
        const value = (expr as any)[field] as CronFieldValue | undefined;
        const pattern = value?.pattern ?? "any";
        const spec = FIELD_SPECS[field];
        // 年字段无间隔语义（「每 N 年」场景不存在），不提供 interval 模式
        const hasInterval = field !== "year";
        return html`<div class="pattern-row">
                <sl-radio-group
                    size="small"
                    .value=${pattern}
                    @sl-change=${(e: CustomEvent) => {
                        const next = (e.target as HTMLInputElement).value as CronFieldPattern;
                        // 模式切换后旧输入文本失效，清除避免回显过期内容
                        delete this._pickTexts[field];
                        if (next === "any") this._setField(field, { pattern: "any" });
                        else if (next === "interval")
                            this._setField(field, {
                                pattern: "interval",
                                start: spec.min,
                                step: this._steps(field)[0],
                            });
                        else this._setField(field, { pattern: "pick", picks: [spec.min] });
                    }}
                >
                    <sl-radio value="any">${this.texts.patternAny}</sl-radio>
                    ${when(
                        hasInterval,
                        () =>
                            html`<sl-radio value="interval"
                                >${this.texts.patternInterval}</sl-radio
                            >`,
                    )}
                    ${when(
                        pattern === "interval" && hasInterval && value,
                        // 间隔配置作为 slot 子元素插在「间隔」radio 之后：纵向布局下紧贴其下方（radio-group 只识别 sl-radio，非 radio 子元素不影响同步）
                        () =>
                            html`<div class="interval-slot">
                                ${this._renderInterval(field, value!)}
                            </div>`,
                        () => nothing,
                    )}
                    <sl-radio value="pick">${this.texts.patternPick}</sl-radio>
                </sl-radio-group>
            </div>
            ${when(
                value?.advanced,
                () =>
                    html`<div class="advanced-tip">
                        ${this.texts.advanced.params({ value: value!.advanced! })}
                    </div>`,
            )}
            ${when(
                pattern === "pick" && value,
                () => this._renderPick(field, value!),
                () => nothing,
            )}`;
    }

    /** 步长可选项：stepOptions 覆盖，否则用字段全值域（1..max） */
    private _steps(field: CronField): number[] {
        return this.options.stepOptions?.[field] ?? this._range(1, FIELD_SPECS[field].max);
    }

    private _renderInterval(field: CronField, value: CronFieldValue) {
        const spec = FIELD_SPECS[field];
        const steps = this._steps(field);
        const starts = this._range(spec.min, spec.max);
        const start = value.start ?? spec.min;
        const step = value.step ?? steps[0];
        const label = this.texts[field];
        // 预览：命中值展开（如 10,15,20,25,30），周字段显示中文全名
        const covered = this._expandInterval(field, value);
        const unit = field === "week" ? "" : label;
        const valuesText = covered
            .map((v) => (field === "week" ? this.texts.weekNames[v - 1] : String(v)))
            .join(this.texts.descJoin);
        return html`<div class="interval-row">
                <span class="label">${this.texts.fromPrefix}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(start)}
                    @sl-change=${(e: CustomEvent) => {
                        e.stopPropagation();
                        this._setField(field, {
                            pattern: "interval",
                            start: Number((e.target as HTMLInputElement).value),
                            step: value.step ?? steps[0],
                        });
                    }}
                >
                    ${repeat(starts, (s) => html`<sl-option value="${s}">${s}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.fromSuffix}，</span>
                <span class="label">${this.texts.intervalEvery.params({ field: label })}</span>
                <sl-select
                    size="small"
                    hoist
                    .value=${String(step)}
                    @sl-change=${(e: CustomEvent) => {
                        e.stopPropagation();
                        this._setField(field, {
                            pattern: "interval",
                            start: value.start ?? spec.min,
                            step: Number((e.target as HTMLInputElement).value),
                        });
                    }}
                >
                    ${repeat(steps, (s) => html`<sl-option value="${s}">${s}</sl-option>`)}
                </sl-select>
                <span class="label">${this.texts.intervalSuffix.params({ field: unit })}</span>
            </div>
            <div class="interval-preview">
                ${this.texts.intervalPreviewEvery.params({ field: label, values: valuesText })}
            </div>`;
    }

    /**
     * 展开 interval 为命中值列表：从 start 开始、步长 N，到字段上限（年字段到 yearRange 上限）
     */
    private _expandInterval(field: CronField, value: CronFieldValue): number[] {
        const [min, max] = this._pickBounds(field);
        const start = value.start ?? min;
        const step = value.step ?? 1;
        const out: number[] = [];
        for (let v = start; v <= max; v += step) out.push(v);
        return out;
    }

    /**
     * 渲染值域按钮网格（指定模式可交互）
     */
    private _renderPickGrid(field: CronField, picks: number[]) {
        const [min, max] = this._pickBounds(field);
        const compact = max > 24; // 分/秒 60 个按钮用紧凑号
        return repeat(
            this._range(min, max),
            (v) => v,
            (v) =>
                html`<sl-button
                    size="small"
                    class="${field === "week" ? "week" : compact ? "compact" : ""}"
                    variant="${picks.includes(v) ? "primary" : "default"}"
                    pill
                    @mousedown=${(e: MouseEvent) => {
                        e.preventDefault();
                        this._dragging = true;
                        this._dragSelect = !picks.includes(v);
                        this._togglePick(field, v, this._dragSelect);
                    }}
                    @mouseenter=${() => {
                        if (this._dragging) this._togglePick(field, v, this._dragSelect);
                    }}
                    >${this._pickLabel(field, v)}</sl-button
                >`,
        );
    }

    private _renderPick(field: CronField, value: CronFieldValue) {
        const [min, max] = this._pickBounds(field);
        const picks = value.picks ?? [];
        // 所有字段的指定模式均提供输入行：优先显示用户原始输入（如 1-5，不被序列化覆写），
        // 未编辑过（含按钮切换后清除 _pickTexts）回落为压缩序列化值，与按钮网格双向同步
        const text = this._pickTexts[field] ?? compressPicks(picks);
        // 值域过大（分/秒 60 个）时不渲染按钮网格，仅输入框
        const hasGrid = max - min + 1 <= 31;
        return html`<div class="pick-input-row">
                <sl-input
                    size="small"
                    .value=${text}
                    placeholder="${this.texts.pickInputHint}"
                    @sl-change=${(e: CustomEvent) => {
                        e.stopPropagation();
                        this._parsePickInput(field, (e.target as HTMLInputElement).value);
                    }}
                    @sl-input=${(e: CustomEvent) => {
                        e.stopPropagation();
                        this._parsePickInput(field, (e.target as HTMLInputElement).value);
                    }}
                ></sl-input>
            </div>
            ${when(
                hasGrid,
                () => html`<div
                        class="pick-grid"
                        @mouseup=${() => (this._dragging = false)}
                        @mouseleave=${() => (this._dragging = false)}
                    >
                        ${this._renderPickGrid(field, picks)}
                    </div>
                    <div class="pick-toolbar">
                        <sl-button
                            size="small"
                            @click=${() => {
                                delete this._pickTexts[field];
                                this._setField(field, {
                                    pattern: "pick",
                                    picks: this._range(min, max),
                                });
                            }}
                            >${this.texts.pickAll}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${() => {
                                delete this._pickTexts[field];
                                this._pickInvert(field, min, max);
                            }}
                            >${this.texts.pickInvert}</sl-button
                        >
                        <sl-button
                            size="small"
                            @click=${() => {
                                delete this._pickTexts[field];
                                this._setField(field, { pattern: "any" });
                            }}
                            >${this.texts.pickClear}</sl-button
                        >
                    </div>`,
            )}`;
    }

    /**
     * 解析指定模式的输入串：逗号分隔的值与 a-b 区间（如 "1,1-2,33,22"），
     * 展开 a-b 并去重排序后写入编辑态；空串回落「不限」，非法输入忽略（保持原值）。
     * 原始输入文本记录在 _pickTexts，输入框显示原文而非展开值（1-5 不被覆写为 1,2,3,4,5）
     */
    private _parsePickInput(field: CronField, input: string) {
        const spec = FIELD_SPECS[field];
        const text = input.trim();
        this._pickTexts[field] = input;
        if (text === "") {
            delete this._pickTexts[field];
            this._setField(field, { pattern: "any" });
            return;
        }
        const picks = new Set<number>();
        for (const seg of text.split(/[,，]/)) {
            const m = seg.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
            if (!m) return; // 含非法片段：整体忽略，等待继续输入
            const from = field === "week" && Number(m[1]) === 0 ? 7 : Number(m[1]);
            if (m[2] === undefined) {
                if (from < spec.min || from > spec.max) return;
                picks.add(from);
            } else {
                const to = field === "week" && Number(m[2]) === 0 ? 7 : Number(m[2]);
                if (from < spec.min || to > spec.max || from > to) return;
                for (let v = from; v <= to; v++) picks.add(v);
            }
        }
        this._setField(field, { pattern: "pick", picks: [...picks].sort((a, b) => a - b) });
    }

    /** 各字段多选按钮的取值域：年取 yearRange，其余取字段值域 */
    private _pickBounds(field: CronField): [number, number] {
        if (field === "year") return this.options.yearRange!;
        const spec = FIELD_SPECS[field];
        return [spec.min, spec.max];
    }

    private _pickLabel(field: CronField, v: number): string {
        if (field === "week") return this.texts.weekNames[v - 1];
        return String(v);
    }

    private _togglePick(field: CronField, v: number, select: boolean) {
        // 按钮切换后原始输入文本失效：清除使其回落为压缩序列化值，输入框与网格同步
        delete this._pickTexts[field];
        const cur = ((this._ensureEditing() as any)[field] as CronFieldValue | undefined) ?? {
            pattern: "pick" as const,
            picks: [],
        };
        let picks = cur.picks ?? [];
        if (select) {
            if (!picks.includes(v)) picks = [...picks, v];
        } else {
            picks = picks.filter((p) => p !== v);
        }
        // 选空自动回落「不限」，保证表达式恒合法（Q20）
        if (picks.length === 0) {
            this._setField(field, { pattern: "any" });
            return;
        }
        this._setField(field, { pattern: "pick", picks });
    }

    private _pickInvert(field: CronField, min: number, max: number) {
        const all = this._range(min, max);
        const cur =
            ((this._ensureEditing() as any)[field] as CronFieldValue | undefined)?.picks ?? [];
        const inverted = all.filter((v) => !cur.includes(v));
        if (inverted.length === 0) {
            this._setField(field, { pattern: "any" });
            return;
        }
        this._setField(field, { pattern: "pick", picks: inverted });
    }

    private _range(min: number, max: number): number[] {
        const out: number[] = [];
        for (let i = min; i <= max; i++) out.push(i);
        return out;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-field-cron": AutoFieldCron;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        cron: AutoFieldCronOptions;
    }
}
