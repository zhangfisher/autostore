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

import type {
    SchemaBuilder,
    SchemaDescriptorBuilder,
    SchemaOptions,
    SchemaValidator,
} from './types';

type SchemaArgs = {
    value: any;
    options: SchemaOptions;
    validator: SchemaValidator;
};

/**
 * 将options里面的on和render开头的函数标识为raw
 * @param options 
 */
function markRawOptions(options: SchemaOptions) {
    if (isPlainObject(options)) { 
        forEachObject(options, ({ value, key, parent }) => {
            if (
                (isFunction(value) &&
                    (key.startsWith('on') || key.startsWith('render') || key.startsWith('to'))) 
            ) {
                // @ts-ignore
                parent[key] = markRaw(value);
            }
        });
    }
}

/**
 * 解析 schema 参数
 *
 * @param args 参数数组，可能包含值、验证函数和选项对象
 * @returns 包含解析后参数的对象，结构为 { value, options?, validator? }
 *
 * 参数解析规则：
 */
function parseSchemaOptions(args: any[]): SchemaArgs {
    const finalArgs: any = {
        value: args[0],
        options: Object.assign(
            {
                onFail: 'throw-pass',
            },
            args[1],
        ),
    };
    // 自动推断widget类型，但是如果指定了toInput参数，则不需要自动推断
    // 因为无法判断toInput对值进行如何转换，所以不需要自动推断widget类型
    if (!finalArgs.options.widget && typeof finalArgs.options.toInput !== 'function') {
        const datatype = typeof finalArgs.value;
        if (datatype === 'boolean') {
            finalArgs.options.widget = 'checkbox';
        } else if (datatype === 'number') {
            finalArgs.options.widget = 'number';
        }
        if (Array.isArray(finalArgs.options.select)) {
            finalArgs.options.widget = 'select';
        }
    }
    if ('onValidate' in finalArgs.options) {
        markRaw(finalArgs.options.onValidate);
    }
    markRawOptions(finalArgs.options);
    return finalArgs as SchemaArgs;
}

export const schema = function () {
    const [initial, options] =
        arguments.length === 1 && typeof arguments[0] === 'object'
            ? [undefined, arguments[0]]
            : [...arguments];
    const args = parseSchemaOptions([initial, options]);
    const value = initial;
    const datatype = Array.isArray(value) ? 'array' : typeof value;
    const builder = () => ({
        value,
        datatype,
        options: args.options,
    });
    builder[VALUE_SCHEMA_BUILDER_FLAG] = true;
    return builder as SchemaDescriptorBuilder;
} as unknown as SchemaBuilder;

export const configurable = schema;
export const c = schema;

export function createTypeSchemaBuilder<Value = any>(
    isValid: (val: any) => boolean,
    defaultTips: string,
) {
    const typeSchema = function () {
        const opts = Object.assign({}, arguments[1]);
        if (typeof opts.onValidate !== 'function') {
            opts.onValidate = isValid;
        }
        if (!opts.invalidTips) {
            opts.invalidTips = defaultTips;
        }
        return schema(arguments[0], opts);
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
