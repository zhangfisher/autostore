/**
 * 组件 `<style>` 响应式绑定改写器（ADR-0022 决策四-4.1）。
 *
 * 在 scoped CSS（决策四-4，属性后缀法）之上，把 `<style>` 声明值里的 `bind(expr)` 占位替换为
 * CSS 变量引用，并产出一份声明性 bind 清单供实例化期建订阅。
 *
 * 工作原理：
 * 1. **编译期**（本模块，`extractStyleBinds`）：遍历 CSS 声明体，识别 `bind(expr)`，
 *    按 expr 派生变量名（纯路径 → `--{路径}`，表达式 → `--h{hash}`），把占位替换为
 *    `var(--name, unset)`，产出 `{ rewritten, binds }`。rewritten 随后喂现有 `rewriteScopedCss`
 *    （两步正交：bind 替换只动属性值区，scoped 只动选择器区）。
 * 2. **实例化期**（compiler.instantiateComponent）：遍历 binds 调 `hostScope.watch(expr)`，
 *    求值结果写入**组件根元素**的 CSS 变量（每实例独立）；null/undefined 不写、走 `unset` 回退。
 *
 * **按表达式复用**（决策四-4.1-(2)，本机制的性能与正确性基石）：同 expr → 同变量名 → 一处 watch、
 * 多处 `var()` 共享。跨多个 `<style>` 块由调用方传入合并后做全局去重（见 extractStyleBindsFromMany）。
 */
import { isSimpleStatePath } from "../scope";

/** 单个 bind 绑定：表达式 + 派生的 CSS 变量名。声明性清单，多实例共享只读。 */
export interface StyleBind {
    /** bind 的表达式原文（已去引号、去首尾空白） */
    expr: string;
    /** 派生的 CSS 变量名，如 `--order-style` / `--h1a2b3c`（不含 `var()` 包裹） */
    varName: string;
}

/** extractStyleBinds 的产出：改写后的 CSS 文本 + bind 清单。 */
export interface ExtractStyleBindsResult {
    /** `bind(...)` 已替换为 `var(--name, unset)` 的 CSS 文本（供 rewriteScopedCss 继续 scoped 改写） */
    rewritten: string;
    /** 提取出的 bind 清单（按 expr 全局去重，保持首次出现顺序） */
    binds: StyleBind[];
}

/** `var()` 回退值固定为 unset（决策四-4.1-(4) B1）：无效值不影响布局。 */
const FALLBACK = "unset";

/** bind 占位的回退值（含括号），改写为 `var(--name, unset)` */
function varRef(varName: string): string {
    return `var(${varName}, ${FALLBACK})`;
}

/**
 * FNV-1a 32 位确定性短 hash（决策四-4.1-(2)）。
 *
 * 同表达式同 hash（跨实例、跨 `<style>` 块一致），转 base36 得 ~6 字符。
 * 非安全用途（仅作变量名派生），用同步简单 hash 即可（YAGNI，不用 crypto）。
 */
function fnv1aHash(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        // FNV prime，乘后用 Math.imul 保证 32 位整数语义（避免 JS 位运算转符号溢出问题）
        hash = Math.imul(hash, 0x01000193);
    }
    // 无符号化
    return hash >>> 0;
}

/**
 * 把表达式派生为 CSS 变量名（决策四-4.1-(2)）。
 *
 * - **纯路径**（命中现有 `isSimpleStatePath`，正则 `^[\w$]+(?:\.[\w$]+)*$`）：`--{路径}`，
 *   `.`→`-`、`*`→`_`，其余原样保留（驼峰/下划线不动，如 `user.firstName` → `--user-firstName`）。
 *   注意 `isSimpleStatePath` 的 `\w` 不含 `-`，故**路径段含连字符**（如 `order-foo.bar`）**不匹配纯路径**，
 *   会走表达式 hash 分支——这与 core 路径定义一致（含 `-` 的路径本就非"简单路径"，watch 时亦走表达式支路）。
 * - **表达式**（非纯路径）：`--h{hash36}`——`h` 前缀保证首字符非数字（CSS Custom Properties
 *   要求 `--` 后构成合法 identifier，不能以数字开头，否则浏览器丢弃整条声明）。
 *
 * 不考虑 hash 变量名与纯路径变量名或用户自定义变量（`--my-color`）的冲突（决策四-4.1-(2)，
 * 罕见重叠可接受）。
 */
export function exprToVarName(expr: string): string {
    const trimmed = expr.trim();
    if (isSimpleStatePath(trimmed)) {
        return `--${trimmed.replace(/\./g, "-").replace(/\*/g, "_")}`;
    }
    return `--h${fnv1aHash(trimmed).toString(36)}`;
}

/**
 * 从一段 bind 参数原文（`bind(...)` 括号内的内容）解析出表达式。
 *
 * - 去首尾空白；
 * - 去包裹引号（`"..."` / `'...'`，决策四-4.1-(1) 引号可选，二者等价）。
 * 空串（`bind()`）由调用方判 warn。
 */
function parseBindArg(raw: string): string {
    let s = raw.trim();
    if (s.length >= 2) {
        const first = s[0];
        const last = s[s.length - 1];
        if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
            s = s.slice(1, -1);
        }
    }
    return s.trim();
}

/** 匹配 `bind\s*\(` 开头（决策四-4.1-(8)：仅识别此形态，其余视为普通 CSS 值） */
const BIND_PREFIX_RE = /^\s*bind\s*\(/;

/**
 * 提取 CSS 文本中所有 `bind(...)` 占位并替换为 `var(--name, unset)`（决策四-4.1-(5)）。
 *
 * 复用 scoped 改写器同款状态机（按 `{`/`}` 深度遍历、跳过注释）：仅遍历**声明体**层
 * （选择器 `{ ... }` 内部），对每个声明 `prop: value;` 检查 value 是否以 `bind(` 开头且
 * 括号闭合——命中则替换为 `var(...)`、记录 bind；不命中则原样保留。
 *
 * @-rule 处理边界：
 * - `@media`/`@supports`/`@container`：递归进其内部规则体处理（包裹，内部仍是普通规则）；
 * - `@keyframes`：整体保留不提取（关键帧声明体 `from/50%/to` 的 bind 无意义）；
 * - 无 body 的 @-rule（`@import`）：原样保留。
 *
 * @param cssText 原始 `<style>` 文本
 * @param bindMap 跨块共享的 expr→StyleBind 映射（多 `<style>` 合并去重用，单块传新 Map）
 * @returns { rewritten, binds }
 */
export function extractStyleBinds(
    cssText: string,
    bindMap: Map<string, StyleBind> = new Map(),
): ExtractStyleBindsResult {
    const out = rewriteDeclarations(cssText, bindMap);
    return { rewritten: out, binds: Array.from(bindMap.values()) };
}

/**
 * 遍历样式表，对声明体做 bind 替换（结构同 scopedStyle.rewriteStylesheet，但只动声明值区）。
 */
function rewriteDeclarations(css: string, bindMap: Map<string, StyleBind>): string {
    let out = "";
    let i = 0;
    while (i < css.length) {
        // 跳过并保留空白
        while (i < css.length && /\s/.test(css[i]!)) {
            out += css[i];
            i++;
        }
        if (i >= css.length) break;
        // 注释保留
        if (css.startsWith("/*", i)) {
            const end = css.indexOf("*/", i + 2);
            const stop = end === -1 ? css.length : end + 2;
            out += css.slice(i, stop);
            i = stop;
            continue;
        }
        // @-rule
        if (css[i] === "@") {
            const rule = readAtRule(css, i);
            out += rewriteAtRuleDecls(rule.prelude, rule.body, bindMap);
            i = rule.end;
            continue;
        }
        // 普通规则：选择器 { 声明体 }
        const braceIdx = css.indexOf("{", i);
        if (braceIdx === -1) {
            // 残余文本（无体的 at-rule 或语法残缺），原样保留
            out += css.slice(i);
            break;
        }
        const selector = css.slice(i, braceIdx);
        const bodyEnd = findMatchingBrace(css, braceIdx);
        const body = css.slice(braceIdx + 1, bodyEnd); // 去外层 { }
        out += `${selector}{${rewriteDeclarationBlock(body, bindMap)}}`;
        i = bodyEnd + 1;
    }
    return out;
}

/**
 * 改写 @-rule 的声明体：@media/@supports/@container 递归处理 body 内部；@keyframes 整体保留。
 */
function rewriteAtRuleDecls(prelude: string, body: string, bindMap: Map<string, StyleBind>): string {
    if (body === "") return prelude; // @import 等无体 at-rule
    const name = prelude.trim().split(/\s/, 1)[0] ?? "";
    // @keyframes：内部是关键帧百分比选择器，不提取 bind（无意义）
    if (name === "@keyframes" || name.endsWith("keyframes")) {
        return prelude + "{" + body + "}";
    }
    // @media / @supports / @container 等：递归改写 body 内部
    return prelude + "{" + rewriteDeclarations(body, bindMap) + "}";
}

/**
 * 改写一个规则块内的声明体（`{ }` 之间的内容）。
 *
 * 按声明逐条处理：每条 `prop: value;`，value（trim 后）若以 `bind(` 开头且能读到闭合括号，
 * 则解析参数 → 派生变量名 → 替换为 `var(--name, unset)` 并登记 bind；否则原样保留。
 * 保留原声明的空白与分号结构（最小侵入）。
 */
function rewriteDeclarationBlock(block: string, bindMap: Map<string, StyleBind>): string {
    // 按顶层分号分割声明（忽略括号/字符串内的分号——属性值罕见含分号，简化处理）
    const parts = splitTopLevelSemicolons(block);
    return parts
        .map((part) => rewriteSingleDeclaration(part, bindMap))
        .join(";");
}

/**
 * 按顶层分号分割（忽略括号内的分号）。
 */
function splitTopLevelSemicolons(text: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let cur = "";
    for (const ch of text) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === ";" && depth === 0) {
            parts.push(cur);
            cur = "";
        } else {
            cur += ch;
        }
    }
    if (cur.trim() || parts.length === 0) parts.push(cur);
    return parts;
}

/**
 * 改写单条声明。返回改写后的声明文本（含 `prop: value`，不含分号）。
 */
function rewriteSingleDeclaration(decl: string, bindMap: Map<string, StyleBind>): string {
    // 定位首个冒号（区分属性名与值）。注意选择器层面的伪类冒号不会进到这里——这里只处理
    // 规则块内部的声明，故首个冒号即属性分隔。
    const colonIdx = decl.indexOf(":");
    if (colonIdx === -1) return decl; // 无冒号：非声明（残缺/嵌套规则），原样保留
    const prop = decl.slice(0, colonIdx);
    const value = decl.slice(colonIdx + 1);
    // 仅识别 value 以 `bind(` 开头
    if (!BIND_PREFIX_RE.test(value)) return decl;
    // 取 `bind(` 之后的参数，找匹配的闭合括号（考虑参数内嵌套括号，如 bind("fn(a,b)")）
    const afterPrefix = value.slice(value.indexOf("(") + 1);
    const closeIdx = findMatchingParen(afterPrefix);
    if (closeIdx === -1) return decl; // 括号不闭合：视为非 bind，原样保留（决策四-4.1-(8)）
    const rawArg = afterPrefix.slice(0, closeIdx);
    const trailing = afterPrefix.slice(closeIdx + 1); // 闭合括号后的残余（应仅空白）
    // 残余含非空白（如 `bind(x) !important` 或复合值）→ 视为非整体值，原样保留（决策四-4.1-(1) 仅整体值）
    if (trailing.trim() !== "") return decl;
    const expr = parseBindArg(rawArg);
    if (expr === "") {
        // bind() 空参：warn 语义由调用方/上下文承载，此处产出空值（声明变为 `prop: ;`）
        // 不登记 bind（无可订阅表达式），仅把占位清空。
        return `${prop}: `;
    }
    const varName = exprToVarName(expr);
    // 按 expr 复用：同 expr 共享同一 StyleBind（bindMap 去重），多处 var() 引用同一变量
    if (!bindMap.has(expr)) {
        bindMap.set(expr, { expr, varName });
    }
    // 保留 prop 与原值前后空白结构
    const leadWs = value.slice(0, value.indexOf("bind")) ?? "";
    return `${prop}:${leadWs}${varRef(varName)}`;
}

/**
 * 找匹配的闭合 `)`（从开 `(` 后第一个字符起，考虑嵌套括号）。
 * 返回闭合括号在 text 中的索引，不匹配返回 -1。
 */
function findMatchingParen(text: string): number {
    let depth = 1;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]!;
        if (ch === "(") depth++;
        else if (ch === ")") {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

/**
 * 找匹配的闭合 `}`（从开 `{` 起，考虑嵌套）。
 */
function findMatchingBrace(css: string, openIdx: number): number {
    let depth = 0;
    for (let i = openIdx; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) return i;
        }
    }
    return css.length - 1;
}

/**
 * 读取一个 @-rule 的前缀（@name ...）与起始位置（结构同 scopedStyle.readAtRule）。
 */
function readAtRule(css: string, start: number): { prelude: string; body: string; end: number } {
    const braceIdx = css.indexOf("{", start);
    const semiIdx = css.indexOf(";", start);
    if (semiIdx !== -1 && (braceIdx === -1 || semiIdx < braceIdx)) {
        return { prelude: css.slice(start, semiIdx + 1), body: "", end: semiIdx + 1 };
    }
    const prelude = css.slice(start, braceIdx);
    const bodyEnd = findMatchingBrace(css, braceIdx);
    return {
        prelude,
        body: css.slice(braceIdx + 1, bodyEnd),
        end: bodyEnd + 1,
    };
}

/**
 * 把值归一化为可写入 CSS 变量的字符串（决策四-4.1-(4) B1）。
 *
 * - `null` / `undefined` → 返回 `null`（调用方据此 `removeProperty`，CSS 走 `var(--name, unset)` 回退）；
 * - 其余 → `String(value)`（数字 `100` → `"100"`，布尔 `true` → `"true"`，字符串透传，对象走 `String()`）。
 */
export function coerceStyleValue(value: unknown): string | null {
    if (value == null) return null;
    return String(value);
}
