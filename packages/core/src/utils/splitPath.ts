import { PATH_DELIMITER } from "../consts";

/**
 * 反转义单个路径段。
 *
 * 将转义序列还原为字面量字符：
 * - `\.` -> `.`
 * - `\\` -> `\`
 * - 其他 `\x` -> `x`（保守处理，丢弃未识别转义的反斜杠）
 *
 * @param segment - 已拆分的单个路径段（不含分隔符）
 * @returns 反转义后的真实 key
 */
export function unescapePath(segment: string): string {
    let result = "";
    for (let i = 0; i < segment.length; i++) {
        if (segment[i] === "\\" && i + 1 < segment.length) {
            result += segment[i + 1];
            i++;
        } else {
            result += segment[i];
        }
    }
    return result;
}

/**
 * 转义单个路径段，使其在拼接后能被 {@link splitPath} 正确还原。
 *
 * 先把 `\` 转义为 `\\`，再把 delimiter 转义为 `\` + delimiter，
 * 避免段内的分隔符与反斜杠在拼接/拆分时产生歧义。
 *
 * @param segment - 原始 key
 * @param delimiter - 路径分隔符，默认 `PATH_DELIMITER`（`.`）
 * @returns 转义后的段字符串
 */
export function escapePath(segment: string, delimiter: string = PATH_DELIMITER): string {
    return segment
        .replace(/\\/g, "\\\\")
        .replace(new RegExp(`\\${delimiter}`, "g"), `\\${delimiter}`);
}

/**
 * 按未转义的 delimiter 拆分字符串路径，并对每段反转义。
 *
 * 支持 `\.` 转义分隔符，使对象 key 可以包含 delimiter 字符。
 * 例如当 delimiter 为 `.` 时：
 * - `'a.b'`   -> `['a','b']`（与 `split('.')` 完全一致，向后兼容）
 * - `'a\.b'`  -> `['a.b']`
 * - `'a\.b.c'`-> `['a.b','c']`
 * - `'a\\b'`  -> `['a\b']`
 *
 * 采用状态机扫描实现，避免正则 lookbehind 在旧运行时的兼容问题。
 *
 * @param path - 字符串形式的路径
 * @param delimiter - 路径分隔符，默认 `PATH_DELIMITER`（`.`）
 * @returns 拆分并反转义后的路径段数组
 */
export function splitPath(path: string, delimiter: string = PATH_DELIMITER): string[] {
    const segments: string[] = [];
    let current = "";
    for (let i = 0; i < path.length; i++) {
        const ch = path[i];
        if (ch === "\\" && i + 1 < path.length) {
            // 转义：保留下一个字符的字面量（含 delimiter），不分段
            current += ch;
            current += path[i + 1];
            i++;
        } else if (ch === delimiter) {
            segments.push(current);
            current = "";
        } else {
            current += ch;
        }
    }
    segments.push(current);
    return segments.map(unescapePath);
}
