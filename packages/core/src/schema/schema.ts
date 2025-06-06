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

import { VALUE_SCHEMA } from "../consts"
import { AutoStore } from "../store/store"
import { isPlainObject } from "../utils"
import { SchemaBuilder, SchemaDescriptor, SchemaOptions, SchemaValidate, SchemaValidator } from './types';
import { Dict } from "../types"
import { ValidateError } from "../errors";



type SchemaArgs = {
    value: any
    options: SchemaOptions
    validator: SchemaValidator
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
            onFail: 'throw',
            validate: args[1]
        }
    }
    if (validator && args.length >= 3 && typeof (args[2]) === 'string') {
        validator.message = args[2]
    }
    if (args.length >= 2 && isPlainObject(args[1]) && 'validate' in args[1]) {
        validator = Object.assign({
            onFail: 'throw',
        }, args[1]) as SchemaValidator
    }
    if (args.length >= 2 && isPlainObject(args[args.length - 1]) && !('validate' in args[args.length - 1])) {
        finalArgs.options = Object.assign({}, args[args.length - 1])
    }
    if (validator) {
        finalArgs.validator = validator
    }
    return finalArgs as SchemaArgs
}
/**
 *  
 * schema(value,validate,errorTips,options)
 * schema(value,validate,options) // 没有指定errorTips
 * schema(value,options) // 没有指定validate
 */
export const schema = function () {
    const args = parseSchemaArgs([...arguments])
    const value = arguments[0]
    const datatype = Array.isArray(value) ? 'array' : typeof (value)
    return {
        [VALUE_SCHEMA]: true,
        value,
        datatype,
        validator: args.validator,
        options: args.options,
    }
} as unknown as SchemaBuilder

export const configurable = schema



export function createTypeSchemaBuilder<Value = any>(isValid: (val: any) => boolean, defaultTips: string) {
    return function typeSchema<T>(): SchemaDescriptor<T> {
        const args = parseSchemaArgs([...arguments])
        if (!args.validator) {
            args.validator = {} as any
        }
        if (typeof (args.validator.validate) !== 'function') {
            args.validator.validate = isValid
        }
        if (!args.validator.message) {
            args.validator.message = defaultTips
        }
        return schema<T>(args.value, args.validator, args.options) as SchemaDescriptor<T>
    } as SchemaBuilder<Value>
}


// export function createObjectSchemaBuilder<Value = any>(isValid: (val: any) => boolean, defaultTips: string) {
//     function objectSchema<T = Value>(value: T, options?: SchemaOptions<T>): SchemaDescriptor<T>
//     function objectSchema<T = Value>(value: T, validate?: SchemaValidate<T>, options?: SchemaOptions<T>): SchemaDescriptor<T>
//     function objectSchema<T = Value>(value: T, validate?: SchemaValidate<T>, errorTips?: SchemaOptions<T>['errorTips']): SchemaDescriptor<T>
//     function objectSchema<T = Value>(): SchemaDescriptor<T> {
//         const opts = parseSchemaArgs([...arguments])
//         if (!isValid(opts.value)) throw new ValidateError(defaultTips)
//         return createSchemaDescriptor<T>(opts, isValid, defaultTips)
//     }
//     return objectSchema
// }
// export function createArraySchemaBuilder<Value = any>(isValid: (val: any) => boolean, defaultTips: string) {
//     function arraySchema<T = Value>(value: Array<T>, options?: SchemaOptions<Array<T>>): SchemaDescriptor<Array<T>>
//     function arraySchema<T = Value>(value: Array<T>, validate?: SchemaValidate<T>, options?: SchemaOptions<Array<T>>): SchemaDescriptor<Array<T>>
//     function arraySchema<T = Value>(value: Array<T>, validate?: SchemaValidate<T>, errorTips?: SchemaOptions<Array<T>>['errorTips']): SchemaDescriptor<Array<T>>
//     function arraySchema<T = Value>(): SchemaDescriptor<Array<T>> {
//         const opts = parseSchemaArgs([...arguments])
//         if (!isValid(opts.value)) throw new ValidateError(defaultTips)
//         return createSchemaDescriptor<Array<T>>(opts, isValid, defaultTips)
//     }
//     return arraySchema
// }

export const schemas = {
    number: createTypeSchemaBuilder<number>((val) => typeof (val) === 'number', 'must be a number'),
    string: createTypeSchemaBuilder<string>((val) => typeof (val) === 'string', 'must be a string'),
    boolean: createTypeSchemaBuilder<boolean>((val) => typeof (val) === 'boolean', 'must be a boolean'),
    date: createTypeSchemaBuilder<Date>((val) => val instanceof Date, 'must be a date'),
    bigint: createTypeSchemaBuilder<bigint>((val) => typeof (val) === 'bigint', 'must be a bigint'),
    // array: createArraySchemaBuilder((val) => Array.isArray(val), 'must be an array'),
    // object: createObjectSchemaBuilder((val) => typeof (val) === 'object', 'must be an object')
}

export const s = schemas

