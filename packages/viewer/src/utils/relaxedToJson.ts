/**
 * 轻量宽松 JSON 转标准 JSON，替代 really-relaxed-json (~214 KB UMD bundle)。
 *
 * 用法：JSON.parse(relaxedToJson(raw))
 *
 * 支持：无引号键名、尾逗号、单引号字符串、嵌套对象和数组、裸值透传。
 */
export function relaxedToJson(input: string): string {
    const len = input.length;
    let i = 0;
    let result = "";

    while (i < len) {
        const ch = input[i]!;

        // ── 双引号字符串 — 透传 ──
        if (ch === '"') {
            result += '"';
            i++;
            while (i < len && input[i] !== '"') {
                if (input[i] === "\\" && i + 1 < len) {
                    result += input[i]!;
                }
                result += input[i]!;
                i++;
            }
            if (i < len) result += '"';
            i++; // 跳过 closing "
            continue;
        }

        // ── 单引号字符串 → 转双引号 ──
        if (ch === "'") {
            result += '"';
            i++;
            while (i < len && input[i] !== "'") {
                if (input[i] === "\\" && i + 1 < len) {
                    const next = input[i + 1]!;
                    if (next === "'") {
                        // \' → 双引号字符串中不需要转义单引号
                        result += "'";
                    } else {
                        result += input[i]!;
                        result += next;
                    }
                    i += 2;
                    continue;
                }
                if (input[i] === '"') {
                    // 双引号在单引号字符串内 → 转义
                    result += '\\"';
                } else {
                    result += input[i]!;
                }
                i++;
            }
            result += '"';
            i++; // 跳过 closing '
            continue;
        }

        // ── 无引号键名/裸值检测 ──
        // 排除：前一字符是数字/小数点/负号时，e/E 属于科学计数法，不作标识符
        if (isIdentStart(ch) && !(i > 0 && isDigitOrSign(input[i - 1]!))) {
            let j = i;
            while (j < len && isIdentChar(input[j]!)) j++;
            const ident = input.slice(i, j);

            // 跳过空白，检查是否后跟 ':'
            let k = j;
            while (k < len && isSpace(input[k]!)) k++;

            if (k < len && input[k] === ":") {
                // 是键 → 加引号
                result += '"';
                result += ident;
                result += '"';
                i = j;
                continue;
            }

            // 不是键：JSON 关键字透传，其他裸标识符转字符串
            if (ident === "true" || ident === "false" || ident === "null") {
                result += ident;
            } else {
                result += '"' + ident + '"';
            }
            i = j;
            continue;
        }

        // ── 尾逗号：跳过 , 后面紧跟 } 或 ] 的逗号 ──
        if (ch === ",") {
            let j = i + 1;
            while (j < len && isSpace(input[j]!)) j++;
            if (j < len && (input[j] === "}" || input[j] === "]")) {
                i++;
                continue; // 跳过尾逗号
            }
            result += ch;
            i++;
            continue;
        }

        // ── 其他字符透传 ──
        result += ch;
        i++;
    }

    return result;
}

function isSpace(ch: string): boolean {
    return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function isIdentStart(ch: string): boolean {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_" || ch === "$";
}

function isIdentChar(ch: string): boolean {
    // 允许连字符：kebab-case 裸键（`{delay-close: 2000}`，ADR-0007 kebab 选项键）与
    // 裸值（`foo-bar`）——首字符仍须 isIdentStart（`-5` 负数不入标识符分支）
    return isIdentStart(ch) || (ch >= "0" && ch <= "9") || ch === "-";
}

function isDigitOrSign(ch: string): boolean {
    return (ch >= "0" && ch <= "9") || ch === "." || ch === "-" || ch === "+";
}
