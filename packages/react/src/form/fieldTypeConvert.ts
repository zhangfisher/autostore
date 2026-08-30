
/**
 * useField 的类型驱动转换默认实现(Type-Driven Conversion)
 *
 * 数据类型转换由 toState/fromState 的默认实现进行，开发者可以替换
 *
 * - defaultToState:  将 input 原始值转换为状态值(类型依据 = 当前绑定值的 typeof)
 * - defaultFromState: 将状态值转换为 input 显示值
 *
 * 规则:
 *
 * - number  : 字符串转数字；产物 NaN 视为空值，写入类型默认值 0
 * - boolean : 'true'/'false' 转 boolean；其他值 Boolean() 化
 * - string  : 原样保持字符串(不做任何类型猜测，避免 '0123' 被污染为数字)
 * - 空值    : 状态值为 undefined/null/NaN 时视为无类型依据，
 *             按事件源控件类型推断: checkbox -> boolean, number/range -> number, 其余 -> string
 *             类型一经写入状态即自锁定，后续转换走 typeof 状态值路径
 *
 */
/**
 * 判断状态值是否为空值(无类型依据)
 *
 * NaN 等效于 null，空值时按控件类型推断写入类型默认值
 */
export function isEmptyStateValue(value: any): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'number' && isNaN(value))
    );
}

/**
 * 依据事件源控件类型推断目标类型
 *
 * checkbox -> boolean, number/range -> number, 其余(text/textarea/select/radio...) -> string
 */
function inferTypeFromEvent(e: any): 'number' | 'boolean' | 'string' {
    const inputType = e?.currentTarget?.type;
    if (inputType === 'checkbox') return 'boolean';
    if (inputType === 'number' || inputType === 'range') return 'number';
    return 'string';
}

/**
 * 默认写入转换: input 原始值 -> 状态值
 *
 * @param value    input 的原始值(未经类型转换)
 * @param options  { path, part, stateValue } stateValue 为当前绑定值，作为类型依据
 */
export function defaultToState(
    value: any,
    options?: { path?: string[] | undefined; part?: number; stateValue?: any; event?: any },
) {
    let stateValue = options?.stateValue;
    // 空值(含 NaN)视为无类型依据，按事件源控件类型推断
    if (isEmptyStateValue(stateValue)) {
        const inferred = inferTypeFromEvent(options?.event ?? value)
        stateValue =
            inferred === 'number' ? 0 : inferred === 'boolean' ? false : '';
    }
    const targetType = typeof stateValue;
    if (targetType === 'number') {
        const num = Number(value);
        // 产物 NaN 视为空值，写入类型默认值
        return isNaN(num) ? 0 : num;
    } else if (targetType === 'boolean') {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return Boolean(value);
    }
    // string 及其他(object/array 等)原样透传
    return value;
}

/**
 * 默认显示转换: 状态值 -> input 显示值
 *
 * 空值(undefined/null/NaN)显示为空字符串，其余原样返回
 */
export function defaultFromState(
    value: any,
    _options?: { path?: string[] | undefined; part?: number },
) {
    if (isEmptyStateValue(value)) return '';
    return value;
}
