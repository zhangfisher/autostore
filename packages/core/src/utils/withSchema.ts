export type ValueSchema = {
    // 执行校验时的行为
    validate?: 'none' | 'pass' | 'throw' | 'ignore' | 'throw-pass';
    // 静默更新，不触发事件
    slient?: boolean;
};
/*
 * 用于在对状态值进行赋值时提供额外的信息用于控制更新行为
 *
 * const store = new AutoStore({
 *      value:100
 *
 * })
 *
 * - 赋值时如果校验失败时，直接放行
 * store.state.value= withSchema(200,{onInvalid:'pass'})
 *
 * @param value
 * @param options
 * @returns
 */
export const WITH_SCHEMA_VALUE = '__WITH_SCHEMA_VALUE__';
export function withSchema<T = any>(value: T, options?: ValueSchema) {
    return Object.assign(
        {
            validate: 'throw',
        },
        options,
        {
            [WITH_SCHEMA_VALUE]: true,
            value,
        },
    ) as T;
}

export function isWithSchemaValue(value: any): boolean {
    return value && typeof value === 'object' && value[WITH_SCHEMA_VALUE] === true;
}
export function getSchemaValue(value: any): [any, Required<ValueSchema> | undefined] {
    if (isWithSchemaValue(value)) {
        return [value.value, value];
    } else {
        return [value, undefined];
    }
}
