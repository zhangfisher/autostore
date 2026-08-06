/**
 * 插值（Mustache `{{ }}`）解析与表达式合成
 *
 * `{{ expr }}` 覆盖**文本节点**与**属性值**两个表面。本模块仅提供纯函数：
 * - 把文本解析为「字面量段 / 表达式段」序列；
 * - 属性值合成（整体单段透传原值 / 混合段 concat + nullish 强转）；
 * - raw-text 元素判定（SCRIPT/STYLE 不插值）。
 *
 * 反应式由 compiler 经 `scope.watch` 接入（复用 `watchExpression` + `collectDependencies`），
 * 本模块不涉及订阅。见 ADR-0004。
 */

/** 探测用正则（**无 g 标志**——避免 `.test` 的 `lastIndex` 跨调用累积副作用） */
const HAS_MUSTACHE = /\{\{[\s\S]*?\}\}/;
/** 解析用正则（g 标志，`exec` 循环；每次用前重置 `lastIndex`） */
const MUSTACHE_G = /\{\{\s*([\s\S]*?)\s*\}\}/g;

export type LiteralSegment = { literal: string };
export type ExprSegment = { expr: string };
export type Segment = LiteralSegment | ExprSegment;

/** 文本是否含 `{{ }}`（供 filter/门控探测，安全可重复调用） */
export function hasMustache(text: string | null | undefined): boolean {
    return HAS_MUSTACHE.test(text ?? "");
}

/**
 * 解析插值文本为段序列。
 *
 * - 纯字面量（无 `{{}}`）→ 返回 `null`（调用方按整段字面量处理）；
 * - 否则返回段数组：字面量段保留原始文本，表达式段去两端空白；
 * - `{{}}` / `{{ }}`（空表达式）→ 保留原始字面量（不作为表达式段，避免求值空串）。
 *
 * @returns 段数组（至少含一个表达式段）；无插值返回 null
 */
export function parseInterpolation(text: string): Segment[] | null {
    const segments: Segment[] = [];
    let last = 0;
    let hasExpr = false;
    MUSTACHE_G.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = MUSTACHE_G.exec(text)) !== null) {
        hasExpr = true;
        const before = text.slice(last, m.index);
        if (before.length > 0) segments.push({ literal: before });
        const expr = (m[1] ?? "").trim();
        if (expr.length > 0) {
            segments.push({ expr });
        } else {
            // 空表达式：保留原始 {{}} 字面量，不作为表达式段
            segments.push({ literal: m[0] });
        }
        last = m.index + m[0].length;
    }
    if (!hasExpr) return null;
    const tail = text.slice(last);
    if (tail.length > 0) segments.push({ literal: tail });
    return segments;
}

function isLiteral(s: Segment): s is LiteralSegment {
    return "literal" in s;
}

/**
 * 合成属性插值表达式（desugar-to-x-bind）。
 *
 * - **整体单段**（整个值恰为单个 `{{E}}`，无字面量）→ 返回原始 `E`。
 *   透传原值让 `BindDirective` 类型分派拿到**原生值**：boolean 拿 bool、class 拿对象/数组、
 *   property 拿原生类型——规避 `disabled="{{flag}}"` 在 `false` 时合成字符串 `"false"` 恒真、
 *   照样禁用的 HTML boolean 坑（见 ADR-0004 决策 10）。
 * - **混合段**（字面量 + ≥1 表达式）→ concat，每表达式段 nullish→`''` 强转 `(E==null?"":E)`，
 *   靠 `+` 隐式 stringify；字面量段用 `JSON.stringify` 包裹（安全转义引号/反斜杠）。
 *
 * 表达式段 `E` 被求值两次（三元两处）——`collectDependencies` 按路径去重，无重复订阅，
 * 表达式假定无副作用。
 */
export function synthAttrExpr(value: string): string {
    const segments = parseInterpolation(value);
    if (!segments) return value; // 理论不进（调用前已 hasMustache 判定）
    const exprSegs = segments.filter((s) => !isLiteral(s)) as ExprSegment[];
    const hasLiteral = segments.some(isLiteral);
    if (exprSegs.length === 1 && !hasLiteral) {
        return exprSegs[0]!.expr;
    }
    return segments
        .map((s) => (isLiteral(s) ? JSON.stringify(s.literal) : `((${s.expr})==null?"":(${s.expr}))`))
        .join("+");
}

/** raw-text 元素集合：文本为代码/样式源，插值无意义（SCRIPT 已执行、STYLE 改写怪异） */
const RAW_TEXT_TAGS = new Set(["SCRIPT", "STYLE"]);

/** 元素是否为 raw-text 元素（其文本不插值） */
export function isRawTextElement(el: Element | null | undefined): boolean {
    return !!el && RAW_TEXT_TAGS.has(el.nodeName);
}
