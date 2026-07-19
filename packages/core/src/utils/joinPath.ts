import { PATH_DELIMITER } from "../consts";
import { escapePath } from "./splitPath";

/**
 * 将路径数组合并成字符串，使用 PATH_DELIMITER 作为连接符。
 *
 * 对每个路径段调用 `escapePath` 转义，使含分隔符的 key 能被 `splitPath` 正确还原，
 * 从而与 `getVal`/`splitPath` 形成 round-trip 闭环：
 * `splitPath(joinValuePath(['a.b','c'])) === ['a.b','c']`。
 *
 * @param paths 路径段数组，元素可以是字符串或字符串数组（嵌套段会先按分隔符拼接）
 * @returns 拼接后的字符串路径
 */
export function joinPath(paths?: (string | string[])[]): string {
    return (paths || ["ROOT"])
        .map((p) => {
            if (Array.isArray(p)) {
                return p.map((s) => escapePath(s)).join(PATH_DELIMITER);
            }
            return escapePath(p);
        })
        .join(PATH_DELIMITER);
}
