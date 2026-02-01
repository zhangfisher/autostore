import { PATH_DELIMITER } from "../consts";

/**
 * 获取绝对路径
 *
 * @description
 * 当输入 path 是绝对路径时直接返回
 * 当是相对路径时，则与 basePath 为基准进行计算得出绝对路径
 * 如果没有提供 basePath，相对路径会转换为单元素数组
 * 如果相对路径回溯超出根目录，返回 undefined
 *
 * @param path - 路径，可以是绝对路径数组或相对路径字符串
 * @param basePath - 基准路径，用于计算相对路径
 * @returns 绝对路径数组，超出根目录时返回 undefined
 *
 * @example
 * ```typescript
 * // 绝对路径（数组形式）直接返回
 * getAbsolutePath(['a', 'b', 'c']) // ['a', 'b', 'c']
 *
 * // 绝对路径（字符串形式）直接分割
 * getAbsolutePath('a.b.c') // ['a', 'b', 'c']
 *
 * // 相对路径 './'
 * getAbsolutePath('./x', ['a', 'b', 'c']) // ['a', 'b', 'c', 'x']
 *
 * // 相对路径 '../'
 * getAbsolutePath('../x', ['a', 'b', 'c']) // ['a', 'b', 'x']
 *
 * // 多级 '../'
 * getAbsolutePath('../../x', ['a', 'b', 'c']) // ['a', 'x']
 *
 * // 超出根目录
 * getAbsolutePath('../../../../x', ['a', 'b', 'c']) // undefined
 *
 * // 特殊关键字
 * getAbsolutePath('CURRENT', ['a', 'b', 'c']) // ['a', 'b', 'c']
 * getAbsolutePath('SELF', ['a', 'b', 'c']) // ['a', 'b', 'c']
 * getAbsolutePath('PARENT', ['a', 'b', 'c']) // ['a', 'b']
 *
 * // 数组第一个元素是相对路径
 * getAbsolutePath(['./a', 'b', 'c'], ["x", "y"]) // ["x", "y", "a", "b", "c"]
 * getAbsolutePath(['../a', 'b', 'c'], ["x", "y"]) // ["x", "a", "b", "c"]
 * ```
 */
export function getAbsolutePath(
    path: string[] | string,
    basePath?: string[]
): string[] | undefined {
    // 判断是否是相对路径
    const isRelative = (p: string): boolean => {
        if (p.startsWith("./") || p.startsWith("../")) {
            return true;
        }
        if (["CURRENT", "SELF", "PARENT"].includes(p)) {
            return true;
        }
        return false;
    };

    // 如果 path 是字符串，先判断是否是相对路径
    if (typeof path === "string") {
        if (isRelative(path)) {
            // 是相对路径，需要与 basePath 结合
            if (!basePath) {
                // 没有 basePath，转换为单元素数组
                return [path];
            }

            // 处理特殊关键字
            if (path === "CURRENT" || path === "SELF") {
                return basePath;
            }

            if (path === "PARENT") {
                return basePath.slice(0, -1);
            }

            // 处理以 './' 开头的相对路径
            if (path.startsWith("./")) {
                const relativePart = path.slice(2); // 移除 './'
                if (relativePart === "") {
                    return basePath;
                }
                return [...basePath, ...relativePart.split(PATH_DELIMITER)];
            }

            // 处理以 '../' 开头的相对路径
            if (path.startsWith("../")) {
                const relativePart = path.slice(3); // 移除 '../'
                const parentPath = basePath.slice(0, -1); // 上一级

                // 如果父级路径为空，返回 undefined（超出根目录）
                if (parentPath.length === 0 && relativePart.startsWith("../")) {
                    return undefined;
                }

                // 递归处理多级 '../'
                if (relativePart.startsWith("../")) {
                    return getAbsolutePath(relativePart, parentPath);
                }

                if (relativePart === "") {
                    return parentPath;
                }

                return [...parentPath, ...relativePart.split(PATH_DELIMITER)];
            }

            // 其他情况转为单元素数组
            return [path];
        } else {
            // 不是相对路径，按 PATH_DELIMITER 分割
            return path.split(PATH_DELIMITER);
        }
    }

    // path 是数组形式，判断第一个元素是否是相对路径
    if (path.length > 0 && isRelative(path[0])) {
        // 第一个元素是相对路径，需要与 basePath 结合
        if (!basePath) {
            // 没有 basePath，直接返回原数组
            return path;
        }

        const firstPath = path[0];
        const remainingPaths = path.slice(1);

        // 递归解析第一个相对路径（会返回 string[] | undefined）
        const resolvedFirst = getAbsolutePath(firstPath, basePath);

        // 如果解析结果为 undefined，返回 undefined
        if (resolvedFirst === undefined) {
            return undefined;
        }

        // 将剩余路径追加到解析后的路径
        return [...resolvedFirst, ...remainingPaths];
    }

    // 不是相对路径，直接返回
    return path;
}
