/**
 * 将任意 class 绑定值规范化为类名 token 集合。
 *
 * 供 `x-bind:class`（及 `x-class` / `:class` 别名）使用。整值表达式求值后，结果可能是：
 *
 * - **字符串**：按空白拆分为多个类名（`className` 本就是空格分隔语义），
 *   如 `"btn primary"` → `{btn, primary}`
 * - **对象**：键为类名、值为 truthy 时应用该键（多条件开关场景），
 *   如 `{active: isActive, disabled: isDisabled}`；值判定为 **truthy**，非严格 `=== true`
 * - **数字**：`toString` 作为单个类名，如 `7` → `{7}`
 * - **falsy**（`null` / `undefined` / `false` / `true` / `""`）：产出空集合
 *   （boolean 不作类名）
 * - **数组**：语法已废弃，记 warn 并忽略（防御性；用户若写数组表达式会得到提示）
 *
 * 作为纯函数独立于指令，便于将来 `x-bind:class` 与潜在独立 ClassDirective 共用（DRY）。
 *
 * @param value  表达式求值结果（任意类型）
 * @param logger 可选日志器，数组语法废弃时告警
 * @returns      类名 token 集合（去重）
 */
export function normalizeClass(
    value: any,
    logger?: { warn: (msg: string) => void },
): Set<string> {
    const out = new Set<string>();
    // falsy 与 boolean（true/false 均不作类名）→ 空
    if (value == null || value === false || value === true || value === "") return out;

    if (typeof value === "string") {
        // trim 后按空白拆分；过滤空串（兼容多空格 / 首尾空格）
        for (const token of value.trim().split(/\s+/)) {
            if (token) out.add(token);
        }
        return out;
    }

    if (typeof value === "number") {
        out.add(String(value));
        return out;
    }

    if (typeof value === "object") {
        if (Array.isArray(value)) {
            logger?.warn("x-class: 数组语法已废弃，请使用对象或字符串");
            return out;
        }
        // 对象：键 = 类名，值 truthy 时应用（含计算属性名 {[k]:v}，用户显式写自负责）
        for (const [key, val] of Object.entries(value)) {
            if (val) out.add(key);
        }
        return out;
    }

    // 其余类型（symbol / function 等，实际罕见）兜底 toString
    out.add(String(value));
    return out;
}
