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

import { VALUE_SCHEMA_BUILDER_FLAG } from "../consts"
import { forEachObject, isFunction, isPlainObject } from "../utils"
import type { SchemaBuilder, SchemaDescriptorBuilder, SchemaOptions, SchemaValidator, SchemaWidgetAction } from './types';
import { markRaw } from '../utils/markRaw';


type SchemaArgs = {
    value: any
    options: SchemaOptions
    validator: SchemaValidator
}

/**
 * 对Schema.options里面的actions进行标记
 * 
 * 将actions里面所有onXXX开头的事件处理函数全局markRaw
 * 
 * 
 */
function markRawActions(actions: SchemaWidgetAction[]) {
    if (Array.isArray(actions)) {
        actions.forEach(action => {
            if (typeof (action) === 'object') {
                Object.entries(action).forEach(([key, value]) => {
                    if (key === 'items' || (typeof (value) === 'function' && key.startsWith('on'))) {
                        //@ts-ignore
                        action[key] = markRaw(value)
                    }
                })
            }
        })
    }
}

// 将options里面的on和render开头的函数标识为raw
function markRawOptions(options: SchemaOptions) {
    if (isPlainObject(options)) {
        forEachObject(options, ({ value, key, parent }) => {
            if (isFunction(value) && (
                key.startsWith('on')
                || key.startsWith('render')
                || key.startsWith('to')
            )) {
                // @ts-ignore
                parent[key] = markRaw(value)
            }
        })
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
        validator: {},
        options: Object.assign({
            onFail: 'throw-pass',
        }, args[1])
    }
    // 设置默认的widget
    if (!finalArgs.options.widget) {
        const datatype = typeof (finalArgs.value)
        if (datatype === 'boolean') {
            finalArgs.options.widget = 'checkbox'
        } else if (datatype === 'number') {
            finalArgs.options.widget = 'number'
        }
        if (Array.isArray(finalArgs.options.select)) {
            finalArgs.options.widget = 'select'
        }
    }
    if ('invalidMessage' in finalArgs.options) {
        finalArgs.validator.message = finalArgs.options.invalidMessage
        delete finalArgs.options.invalidMessage
    }
    if ('onFail' in finalArgs.options) {
        finalArgs.validator.onFail = finalArgs.options.onFail
        delete finalArgs.options.onFail
    }
    if ('onValidate' in finalArgs.options) {
        finalArgs.validator.validate = finalArgs.options.onValidate
        delete finalArgs.options.onValidate
    }
    if (Object.keys(finalArgs.validator).length === 0) {
        delete finalArgs.validator
    }
    markRawOptions(finalArgs.options)
    return finalArgs as SchemaArgs
}


export const schema = function () {
    const args = parseSchemaOptions([...arguments])
    const value = arguments[0]
    const datatype = Array.isArray(value) ? 'array' : typeof (value)
    const builder = () => ({
        value,
        datatype,
        validator: args.validator,
        options: args.options,
    })
    builder[VALUE_SCHEMA_BUILDER_FLAG] = true
    return builder as SchemaDescriptorBuilder
} as unknown as SchemaBuilder

export const configurable = schema

export function createTypeSchemaBuilder<Value = any>(isValid: (val: any) => boolean, defaultTips: string) {
    const typeSchema = function () {
        const args = parseSchemaOptions([...arguments]);
        if (!args.validator) {
            args.validator = {} as any;
        }
        if (typeof (args.validator.validate) !== 'function') {
            args.validator.validate = isValid;
        }
        if (!args.validator.message) {
            args.validator.message = defaultTips;
        }
        return schema(args.value, args.options)
    }
    return typeSchema as SchemaBuilder<Value>
}

export const schemas = {
    number: createTypeSchemaBuilder<number>((val) => typeof (val) === 'number', 'must be a number'),
    string: createTypeSchemaBuilder<string>((val) => typeof (val) === 'string', 'must be a string'),
    boolean: createTypeSchemaBuilder<boolean>((val) => typeof (val) === 'boolean', 'must be a boolean'),
    date: createTypeSchemaBuilder<Date>((val) => val instanceof Date, 'must be a date'),
    bigint: createTypeSchemaBuilder<bigint>((val) => typeof (val) === 'bigint', 'must be a bigint'),
    array: createTypeSchemaBuilder<any[]>((val) => Array.isArray(val), 'must be an array'),
    object: createTypeSchemaBuilder<object>((val) => typeof (val) === 'object', 'must be an object')
}

export const s = schemas