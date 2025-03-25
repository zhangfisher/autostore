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
}


export type SchemaObjectArgs<Value=any> = Pick<SchemaObject<Value>,
    'required' 
    | 'validate' 
    | 'behavior' 
    | 'enable' 
    | 'errorTips' 
    | 'placeholder' 
    | 'tags' 
    | 'help' 
    | 'title' 
    | 'value' 
    | 'widget' 
    | 'select'
> & Record<string,any>


export function schema<Value=any> (value:Value,options?:SchemaObjectArgs ): SchemaObject<Value>
export function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,options?:SchemaObjectArgs):SchemaObject<Value>
export function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,errorTips?:SchemaObjectArgs['errorTips']):SchemaObject<Value>
export function schema<Value=any> ():SchemaObject<Value>{
    const initial = arguments[0]
    const options = Object.assign({
        validate : ()=>true,
        },isPlainObject(arguments[1]) ? arguments[1] : undefined) as SchemaObjectArgs
    if(typeof(arguments[1])==='function'){
        options.validate = arguments[1]
    }
    const arg2 = arguments[2]
    if(isPlainObject(arg2)){
        Object.assign(options,arg2)
    }else if(typeof(arguments[2])==='string' || typeof(arguments[2])==='function'){
        options.errorTips = arguments[2]
    }
    return Object.assign({
        value             : initial,
        pass              : false,
        [VALUE_SCHEMA]: true        
    },options) as SchemaObject<Value>
}


export function createTypeSchema<Value=any>(isType:(val:any)=>boolean,defaultTips:string){
    return <T=Value>(initial:T,validate?:AutoStoreValidate<T>,optionsOrTips?:SchemaObjectArgs<T> | SchemaObjectArgs['errorTips'])=>{
        if(!isType(initial)) throw new ValidateError(defaultTips)
        const optType = typeof(optionsOrTips)
        const opts = Object.assign({},optType==='string' || optType==='function' ? {errorTips:optionsOrTips} : optionsOrTips) as SchemaObjectArgs
        return schema<T>(initial,function(this:AutoStore<any>,newValue:T,oldValue:T,path:string){    
            const errorTips = getErrorTips.call(this,opts?.errorTips || this.options.valueSchema?.errorTips, path,newValue,oldValue)
            if(!isType(newValue)) throw new ValidateError(errorTips)
            if(typeof(validate)==='function'){
                return validate(newValue,oldValue,path) 
            } 
            return true
        },opts)
    }
} 

export const schemas = {
    number : createTypeSchema<number>((val)=>typeof(val)==='number','must be a number'),
    string : createTypeSchema<string>((val)=>typeof(val)==='string','must be a string'),
    boolean: createTypeSchema<boolean>((val)=>typeof(val)==='boolean','must be a boolean'),
    date   : createTypeSchema<Date>((val)=>val instanceof Date,'must be a date'),    
    bigint : createTypeSchema<bigint>((val)=>typeof(val)==='bigint','must be a bigint'),
    array  : createTypeSchema((val)=>Array.isArray(val),'must be an array'),
    object : createTypeSchema((val)=>typeof(val)==='object','must be an object'),
}

export const s = schemas 

export const configurable = schema