/**
 * import { v } from "autostore"
 *
 * const store = new AutoStore({
 *    price: v.number(100,(val)=>val>0 && val<100,{
 *        title:'价格',
 *        tips:'价格必须大于0小于100',
 *        errorTips:'价格必须大于0小于100',
 *
 *    })
 *    count: v.number(100,(val)=>val>0,'价格')
 *
 *    })
 * })
 *
 * store.validators
 *
 * const priceValidator = store.validators.add("order.price",)
 *
 * priceValidator.title
 *
 *
 *
 * (store.state.price)
 *
 */

import { VALUE_SCHEMA_BUILDER_FLAG } from '../consts';
import { forEachObject, isFunction, isPlainObject } from '../utils';
import { markRaw } from '../utils/markRaw';

import type { AutoStateSchema, SchemaDescriptorBuilder, SchemaBuilder } from './types';

type SchemaArgs = {
    value: any;
    schema: AutoStateSchema;
};

/**
 * 将options里面的on和render开头的函数标识为raw
 * @param schema
 */
function markRawSchema(schema: any) {
    if (isPlainObject(schema)) {
        forEachObject(schema, ({ value, key, parent }) => {
            if (
                isFunction(value) &&
                (key.startsWith('on') || key.startsWith('render') || key.startsWith('to'))
            ) {
                // @ts-expect-error
                parent[key] = markRaw(value);
            }
        });
    }
}

/**
 * 解析 schema 参数
 *
 * @param args 参数数组，可能包含值、验证函数和选项对象
 * @returns 包含解析后参数的对象，结构为 { value, options? }
 *
 * 参数解析规则：
 */
function parseSchemaArgs(args: any[]): SchemaArgs {
    const finalArgs: any = {
        value: args[0],
        schema: Object.assign(
            {
                onInvalid: 'throw',
            },
            args[1],
        ),
    };
    markRawSchema(finalArgs.schema);
    return finalArgs as SchemaArgs;
}

export const schema = function <Value>(initial: Value, options?: AutoStateSchema<Value>) {
    const args = parseSchemaArgs([initial, options]);
    const value = initial;
    if (typeof value === 'object') {
        markRaw(value);
    }
    args.schema.datatype = Array.isArray(value) ? 'array' : typeof value;
    const builder = () => ({
        value,
        schema: args.schema,
    });
    builder[VALUE_SCHEMA_BUILDER_FLAG] = true;
    return builder as SchemaDescriptorBuilder<Value>;
};

export const configurable = schema;

export function createTypeSchemaBuilder<Value = any>(
    isValid: (val: any) => boolean,
    defaultTips: string,
) {
    const typeSchema = function (initial: Value, options?: any) {
        const opts = Object.assign({}, options);
        if (typeof opts.onValidate !== 'function') {
            opts.onValidate = isValid;
        }
        if (!opts.invalidTips) {
            opts.invalidTips = defaultTips;
        }
        return schema(initial, opts);
    };
    return typeSchema as SchemaBuilder<Value>;
}

export const schemas = {
    number: createTypeSchemaBuilder<number>((val) => typeof val === 'number', 'must be a number'),
    string: createTypeSchemaBuilder<string>((val) => typeof val === 'string', 'must be a string'),
    boolean: createTypeSchemaBuilder<boolean>(
        (val) => typeof val === 'boolean',
        'must be a boolean',
    ),
    date: createTypeSchemaBuilder<Date>((val) => val instanceof Date, 'must be a date'),
    bigint: createTypeSchemaBuilder<bigint>((val) => typeof val === 'bigint', 'must be a bigint'),
    array: createTypeSchemaBuilder<any[]>((val) => Array.isArray(val), 'must be an array'),
    object: createTypeSchemaBuilder<object>((val) => typeof val === 'object', 'must be an object'),
};

export const s = schemas;
