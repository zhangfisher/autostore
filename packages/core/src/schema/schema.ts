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
import { ValidateError } from "../errors"
import type { AutoStore } from "../store/store"
import { isPlainObject } from "../utils"
import { getErrorTips } from "./utils"


export type AutoStoreValidate<Value=any> = (newValue:Value,oldValue:Value,path:string)=>boolean

export type SchemaObject<Value=any> = {
    [VALUE_SCHEMA]    : true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    behavior?         : 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    required?         : boolean
    enable?           : boolean 
    path?             : string
    // 提供一些元数据
    title?            : string
    help?             : string
    placeholder?      : string
    select?           : string[] | number[] | boolean[] | ({
        label?        : string
        value         : Value
        default?      : boolean
        icon?         : string
    })[]
    widget?           : string          
    errorTips?        : string | ((this:SchemaObject<Value>,path:string,newValue:Value,oldValue:Value)=>string )
    tags?             : string[]        
    group?            : string
    advanced?        : boolean 
}


export type SchemaObjectArgs<Value=any> = Pick<SchemaObject<Value>,
    'value'
    | 'required' 
    | 'validate' 
    | 'behavior' 
    | 'enable' 
    | 'errorTips' 
    | 'placeholder' 
    | 'tags' 
    | 'help' 
    | 'title' 
    | 'widget' 
    | 'select'
    | 'group'
    | 'advanced'
> & Record<string,any>


function getSchemaOptions(args:any[]){
    const options = Object.assign({ },(
        args.length === 1 && isPlainObject(args[0])) ? args[0] : 
            (args.length>=2 && isPlainObject(args[args.length-1]) ? args[args.length-1] : undefined)
        ) as SchemaObjectArgs
    options.value = args.length >=2 ? args[0] : undefined
    if(args.length >=2 && typeof(args[1]) === 'function'){
        options.validate = args[1] 
    }
    if(args.length >=3 && ['string','function'].includes(typeof(args[2]))){
        options.errorTips = args[2] 
    }    
    return options
}

export interface SchemaBuilder<Value=any>{
    <T=Value>(options:SchemaObjectArgs ): SchemaObject<T>
    <T=Value>(value:T,options:SchemaObjectArgs ): SchemaObject<T>
    <T=Value>(value:T,validate:AutoStoreValidate<T>,options?:SchemaObjectArgs):SchemaObject<T>
    <T=Value>(value:T,validate:AutoStoreValidate<T>,errorTips?:SchemaObjectArgs['errorTips']):SchemaObject<T>
}

export const schema =  function() {
    const options = getSchemaOptions([...arguments])
    return Object.assign({
        pass          : false,
        validate      : () => true,
        [VALUE_SCHEMA]: true
    }, options)
} as unknown as SchemaBuilder

export function createTypeSchemaBuilder<Value=any>(isType:(val:any)=>boolean,defaultTips:string){
    return function typeSchema():SchemaObject<Value>{
        const options = getSchemaOptions([...arguments])
        if(!isType(options.value)) throw new ValidateError(defaultTips)        
        return schema<Value>(options.value,function (this: AutoStore<any>, newValue: Value, oldValue: Value, path: string){
            const errorTips = getErrorTips.call(this, options.errorTips || this.options.valueSchema?.errorTips, path, newValue, oldValue)
            if (!isType(newValue)) throw new ValidateError(errorTips)
            if (typeof (options.validate) === 'function') {
                return options.validate(newValue, oldValue, path)
            }
            return true
        }, options) as SchemaObject<Value>
    } as SchemaBuilder
} 

export const schemas = {
    number : createTypeSchemaBuilder<number>((val)=>typeof(val)==='number','must be a number'),
    string : createTypeSchemaBuilder<string>((val)=>typeof(val)==='string','must be a string'),
    boolean: createTypeSchemaBuilder<boolean>((val)=>typeof(val)==='boolean','must be a boolean'),
    date   : createTypeSchemaBuilder<Date>((val)=>val instanceof Date,'must be a date'),    
    bigint : createTypeSchemaBuilder<bigint>((val)=>typeof(val)==='bigint','must be a bigint'),
    array  : createTypeSchemaBuilder<Array<any>>((val)=>Array.isArray(val),'must be an array'),
    object : createTypeSchemaBuilder<Record<string,any>>((val)=>typeof(val)==='object','must be an object')
}

export const s = schemas
export const configurable = schema
 