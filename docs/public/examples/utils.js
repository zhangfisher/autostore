export const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export function parsePadding(padding) {
    // 默认值
    const result = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        unit: 'px', // 默认单位为 px
    };

    // 去除空格并按空格分割
    const parts = padding.trim().split(/\s+/);

    // 解析数值和单位
    const parseValue = (value) => {
        const match = value.match(/^(\d+)([a-z%]*)$/);
        if (!match) return 0;

        // 更新单位（如果未设置，则使用默认值）
        if (match[2]) result.unit = match[2];
        return parseInt(match[1], 10) || 0;
    };

    // 根据输入值的数量设置边距
    switch (parts.length) {
        case 1: {
            // 单值：所有边距相同
            const value = parseValue(parts[0]);
            result.top = value;
            result.right = value;
            result.bottom = value;
            result.left = value;
            break;
        }
        case 2: // 双值：上下、左右
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = parseValue(parts[0]);
            result.left = parseValue(parts[1]);
            break;

        case 3: // 三值：上、左右、下
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = parseValue(parts[2]);
            result.left = parseValue(parts[1]);
            break;

        case 4: // 四值：上、右、下、左
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = parseValue(parts[2]);
            result.left = parseValue(parts[3]);
            break;

        default:
            throw new Error(`Invalid padding format: "${padding}". Expected 1-4 values.`);
    }

    return result;
}
/**
 * 将输入的字符串数组转换为有效的 CSS padding 值，支持简写模式。
 * - 如果所有边值相同，则返回单个值（如 `['1px', '1px', '1px', '1px']` → `'1px'`）。
 * - 否则按标准 CSS padding 规则生成值：
 *   - 1 个值：所有边相同（如 `'1px'` → `'1px'`）
 *   - 2 个值：上下相同，左右相同（如 `['1px', '2px']` → `'1px 2px'`）
 *   - 3 个值：上、左右、下（如 `['1px', '2px', '3px']` → `'1px 2px 3px'`）
 *   - 4 个值：上、右、下、左（如 `['1px', '2px', '3px', '4px']` → `'1px 2px 3px 4px'`）
 *
 * @param values - 包含 padding 值的字符串数组，长度必须为 1、2、3 或 4。
 * @returns 返回格式化后的 CSS padding 字符串（自动简写）。
 * @throws 如果输入数组长度无效（不为 1、2、3 或 4），抛出错误。
 *
 * @example
 * toPadding(['1px']); // 返回 '1px'
 * toPadding(['1px', '1px']); // 返回 '1px'
 * toPadding(['1px', '2px', '1px']); // 返回 '1px 2px 1px'
 * toPadding(['1px', '2px', '1px', '2px']); // 返回 '1px 2px'
 */
export function toPadding(values) {
    const length = values.length;
    if (length < 1 || length > 4) {
        throw new Error('输入无效：数组长度必须为 1、2、3 或 4。');
    }

    // 检查是否所有值相同（支持简写）
    const allEqual = values.every((v) => v === values[0]);
    if (allEqual) {
        return `${values[0]}px`; // 简写为单个值
    }

    // 标准模式
    switch (length) {
        case 1:
            return `${values[0]}px`;
        case 2:
            return `${values[0]}px ${values[1]}px`;
        case 3:
            return `${values[0]}px ${values[1]}px ${values[2]}px`;
        case 4:
            // 检查是否可简写为 2 值模式（上下相同且左右相同）
            if (values[0] === values[2] && values[1] === values[3]) {
                return `${values[0]}px ${values[1]}px`;
            }
            return `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
        default:
            throw new Error('意外错误：无效的数组长度。');
    }
}
