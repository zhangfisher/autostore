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
import { isFunction, isPlainObject } from "../utils"
import { SchemaBuilder, SchemaDescriptorBuilder, SchemaOptions, SchemaValidator, SchemaWidgetAction } from './types';
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
function markActions(actions: SchemaWidgetAction[]) {
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
function markOptions(options: SchemaOptions) {
    if (isPlainObject(options)) {
        Object.entries(options).forEach(([key, value]) => {
            if (isFunction(value) && (
                key.startsWith('on')
                || key.startsWith('render')
                || key.startsWith('to')
            )) {
                options[key] = markRaw(value)
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
 * 1. 第一个参数作为 value
 * 2. 最后一个参数如果是普通对象则作为 options
 * 3. 第二个参数如果是函数则作为验证器
 * 4. 第三个参数如果是字符串则作为验证错误提示
 */
function parseSchemaArgs(args: any[]): SchemaArgs {
    const finalArgs: any = {
        value: args[0]
    }
    let validator: SchemaValidator | undefined
    if (args.length >= 2 && typeof (args[1]) === 'function') {
        validator = {
            onFail: 'throw-pass',
            validate: args[1]
        }
    }
    if (validator && args.length >= 3 && typeof (args[2]) === 'string') {
        validator.message = args[2]
    }
    if (args.length >= 2 && isPlainObject(args[1]) && 'validate' in args[1]) {
        validator = Object.assign({
            onFail: 'throw-pass',
        }, args[1]) as SchemaValidator
    }
    if (args.length >= 2 && isPlainObject(args[args.length - 1]) && !('validate' in args[args.length - 1])) {
        finalArgs.options = Object.assign({}, args[args.length - 1])
    }
    if (validator) {
        finalArgs.validator = validator
    }
    if (finalArgs.options) {
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
        if (finalArgs.options.actions) {
            markActions(finalArgs.options.actions)
        }
        markOptions(finalArgs.options)
    }
    return finalArgs as SchemaArgs
}

/**
 * schema(value,validate,errorTips,options)
 * schema(value,validate,options) // 没有指定errorTips
 * schema(value,options) // 没有指定validate
 */
export const schema = function () {
    const args = parseSchemaArgs([...arguments])
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
        const args = parseSchemaArgs([...arguments]);
        if (!args.validator) {
            args.validator = {} as any;
        }
        if (typeof (args.validator.validate) !== 'function') {
            args.validator.validate = isValid;
        }
        if (!args.validator.message) {
            args.validator.message = defaultTips;
        }
        return schema(args.value, args.validator, args.options)
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