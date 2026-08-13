/**
 * 组件作用域 CSS 改写器（ADR-0022 决策四-4，属性后缀法，仿 Vue `<style scoped>`）。
 *
 * 给定组件 CSS 文本与作用域 id，把每条选择器末尾追加 `[data-cmp-{id}]`，使样式仅命中本组件实例
 * 的元素（组件根 + 后代在实例化时被打 `data-cmp-{id}` 属性）。不支持穿透（无 `:deep()`/`>>>`），
 * 纯隔离——YAGNI，真实需求出现再加（仅改写器一个额外规则，不影响架构）。
 *
 * 改写规则（仿 Vue 行为）：
 * - `.foo` → `.foo[data-cmp-1]`（末尾选择器加后缀）
 * - `.a .b` → `.a .b[data-cmp-1]`（仅末尾选择器加，祖先选择器不加）
 * - `a, b` → `a[data-cmp-1], b[data-cmp-1]`（逗号分组，各组末尾分别加）
 * - `:hover` → `[data-cmp-1]:hover`（伪类：属性后缀置于伪类**前**，Vue 行为）
 * - `::before` → `[data-cmp-1]::before`（伪元素同伪类）
 * - `@media (...) { .foo {} }` → 包裹保留，内部 `.foo` 照常改写
 * - `@keyframes name { ... }` → 整体保留不改写（关键帧名不隔离，按组件名约定避免冲突）
 *
 * @param cssText  组件 `<style>` 原始 CSS 文本
 * @param scopeId  作用域 id（数值，用作 `data-cmp-{scopeId}` 属性名后缀）
 * @returns 改写后的 CSS 文本
 */
export function rewriteScopedCss(cssText: string, scopeId: number): string {
    const attr = `[data-cmp-${scopeId}]`;
    // 按顶层规则块改写：用状态机遍历，区分普通规则、@-rule（@media/@keyframes/@supports 等）。
    // 简化策略：按 `{` `}` 深度跟踪，对每个「选择器 { 体 }」单元改写其选择器部分。
    return rewriteStylesheet(cssText, attr);
}

/**
 * 改写整个样式表：遍历顶层规则，对普通规则改写选择器，对 @-rule 递归处理其内部。
 */
function rewriteStylesheet(css: string, attr: string): string {
    let out = "";
    let i = 0;
    while (i < css.length) {
        // 跳过空白
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
            out += rewriteAtRule(rule.prelude, rule.body, attr);
            i = rule.end;
            continue;
        }
        // 普通规则：选择器 { 体 }
        const braceIdx = css.indexOf("{", i);
        if (braceIdx === -1) {
            // 残余文本（无体的 at-rule 如 @import，或语法残缺），原样保留
            out += css.slice(i);
            break;
        }
        const selector = css.slice(i, braceIdx);
        const bodyEnd = findMatchingBrace(css, braceIdx);
        const body = css.slice(braceIdx, bodyEnd + 1);
        out += `${rewriteSelectorList(selector, attr)}${body}`;
        i = bodyEnd + 1;
    }
    return out;
}

/**
 * 读取一个 @-rule 的前缀（@name ...）与起始位置。
 * 返回 prelude（@xxx 到 { 前）、body（{...} 内容，可能含嵌套）、end（结束位 +1）。
 */
function readAtRule(css: string, start: number): { prelude: string; body: string; end: number } {
    const braceIdx = css.indexOf("{", start);
    // 无 body 的 at-rule（@import ...;）
    const semiIdx = css.indexOf(";", start);
    if (semiIdx !== -1 && (braceIdx === -1 || semiIdx < braceIdx)) {
        return { prelude: css.slice(start, semiIdx + 1), body: "", end: semiIdx + 1 };
    }
    const prelude = css.slice(start, braceIdx);
    const bodyEnd = findMatchingBrace(css, braceIdx);
    return {
        prelude,
        body: css.slice(braceIdx, bodyEnd + 1),
        end: bodyEnd + 1,
    };
}

/**
 * 改写 @-rule：@media/@supports 内部递归改写；@keyframes 整体保留（关键帧不改写）。
 */
function rewriteAtRule(prelude: string, body: string, attr: string): string {
    if (body === "") return prelude; // @import 等无体 at-rule
    const name = prelude.trim().split(/\s/, 1)[0] ?? "";
    // @keyframes / @-webkit-keyframes：内部是关键帧百分比选择器，不改写
    if (name === "@keyframes" || name.endsWith("keyframes")) {
        return prelude + body;
    }
    // @media / @supports / @container 等：递归改写 body 内部
    const inner = body.slice(1, -1); // 去掉外层 { }
    return prelude + "{" + rewriteStylesheet(inner, attr) + "}";
}

/**
 * 改写选择器列表（逗号分隔的多个选择器），每组末尾选择器加属性后缀。
 */
function rewriteSelectorList(selectorText: string, attr: string): string {
    // 保留选择器列表的尾空白（选择器与 { 之间的空格），改写仅作用于非空白部分
    const tailWs = selectorText.match(/\s*$/)?.[0] ?? "";
    // 按逗号分组（不考虑嵌套括号内的逗号——属性选择器内罕见，简化处理）
    const groups = splitTopLevelCommas(selectorText);
    return (
        groups
            .map((g) => appendAttrToLastCompound(g, attr))
            .join(",") + tailWs
    );
}

/**
 * 按顶层逗号分割（忽略括号内的逗号）。
 */
function splitTopLevelCommas(text: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let cur = "";
    for (const ch of text) {
        if (ch === "(") depth++;
        if (ch === ")") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            parts.push(cur);
            cur = "";
        } else {
            cur += ch;
        }
    }
    if (cur.trim()) parts.push(cur);
    return parts;
}

/**
 * 给单个选择器的末尾 compound 选择器追加属性后缀（仿 Vue）。
 *
 * `.a .b:hover` → `.a .b:hover[data-cmp-1]`？不——Vue 行为是属性置于伪类前：`.a .b[data-cmp-1]:hover`。
 * 故需定位末尾 compound（最后一个后代段），在其末尾、伪类/伪元素之前插入属性。
 */
function appendAttrToLastCompound(selector: string, attr: string): string {
    const trimmed = selector.trim();
    if (trimmed === "") return selector;
    // 找最后一个后代分隔（空白，但不是括号内）后的位置 → 末尾 compound 起点
    let compoundStart = 0;
    let depth = 0;
    for (let i = 0; i < trimmed.length; i++) {
        const ch = trimmed[i]!;
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        else if (depth === 0 && /\s/.test(ch)) {
            // 跳过连续空白，compoundStart 指向下一个非空白
            let j = i;
            while (j < trimmed.length && /\s/.test(trimmed[j]!)) j++;
            compoundStart = j;
            i = j - 1;
        }
    }
    const prefix = trimmed.slice(0, compoundStart);
    const last = trimmed.slice(compoundStart);
    // 在末尾 compound 中，找首个伪类/伪元素（: 或 ::），属性插入其前
    const pseudoIdx = last.indexOf(":");
    let insertAt: number;
    if (pseudoIdx === -1) {
        insertAt = last.length;
    } else {
        insertAt = pseudoIdx;
    }
    const rewritten = last.slice(0, insertAt) + attr + last.slice(insertAt);
    // 保留前后空白
    const lead = selector.slice(0, selector.indexOf(trimmed[0]!));
    return lead + prefix + rewritten;
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

// ── 样式注入与引用计数（按组件定义缓存，多实例共享）──────────────────────────

/** 引用计数：key=`${defName}`，value=当前实例数。归零时移除 <style> 元素。 */
const styleRefCount = new Map<string, number>();

/**
 * 为组件实例注入 scoped 样式（ADR-0022 决策四-4）。
 *
 * - 同名组件定义的样式只改写、注入一次（`<style data-cmp-def="${defName}">`），多实例共享，引用计数管理；
 * - 实例化（mountComponentStyle）时计数 +1，卸载（releaseComponentStyle）时 -1，归零移除 `<style>`；
 * - scopeId 用于改写时的属性后缀——但同 def 共享一份样式，故用 defName 作 key，scopeId 取首实例的 id
 *   （实例化时给元素打的 data-cmp-{id} 属性须与此处改写用的 id 一致 → 见 mountComponentScopedAttr）。
 *
 * @param defName   组件名（样式缓存 key）
 * @param styles    组件 `<style>` 文本数组
 * @param scopeId   作用域 id（改写用）
 * @returns 注入的 `<style>` 元素（已存在则返回既有）
 */
export function injectComponentStyle(
    defName: string,
    styles: string[],
    scopeId: number,
): HTMLStyleElement | null {
    if (styles.length === 0) return null;
    const cacheKey = `cmp-style-${defName}`;
    let el = document.head.querySelector<HTMLStyleElement>(
        `style[data-cmp-def="${cssEscape(defName)}"]`,
    );
    if (!el) {
        const rewritten = styles.map((s) => rewriteScopedCss(s, scopeId)).join("\n");
        el = document.createElement("style");
        el.setAttribute("data-cmp-def", defName);
        el.textContent = rewritten;
        document.head.appendChild(el);
    }
    styleRefCount.set(cacheKey, (styleRefCount.get(cacheKey) ?? 0) + 1);
    return el;
}

/**
 * 释放组件实例的样式引用（计数 -1，归零移除 `<style>`）。
 */
export function releaseComponentStyle(defName: string): void {
    const cacheKey = `cmp-style-${defName}`;
    const count = (styleRefCount.get(cacheKey) ?? 0) - 1;
    if (count <= 0) {
        styleRefCount.delete(cacheKey);
        const el = document.head.querySelector(
            `style[data-cmp-def="${cssEscape(defName)}"]`,
        );
        el?.remove();
    } else {
        styleRefCount.set(cacheKey, count);
    }
}

/**
 * 给元素及其后代打 scoped 属性 `data-cmp-{scopeId}`（实例化时调用）。
 */
export function mountComponentScopedAttr(root: HTMLElement, scopeId: number): void {
    root.setAttribute(`data-cmp-${scopeId}`, "");
    root.querySelectorAll("*").forEach((n) => n.setAttribute(`data-cmp-${scopeId}`, ""));
}

/** CSS 转义（属性选择器中 defName 含特殊字符时） */
function cssEscape(s: string): string {
    return s.replace(/["\\]/g, "\\$&");
}
