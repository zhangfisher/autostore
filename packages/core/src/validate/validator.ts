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

import { VALIDATOR_SCHEMA } from "../consts"
import { ValidateError } from "../errors"
import type { AutoStore } from "../store/store"
import { getErrorTips } from "./utils"


export type AutoStoreValidate<Value=any> = (newValue:Value,oldValue:Value,path:string)=>boolean


export type ValidatorObject<Value=any> = {
    [VALIDATOR_SCHEMA]: true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    required?         : boolean
    enable?           : boolean 
    path?             : string
    behavior?         : 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    // 提供一些元数据
    title?            : string
    descripotion?     : string
    placeholder?      : string
    widget?           : string          
    errorTips?        : string | ((this:ValidatorObject<Value>,path:string,newValue:Value,oldValue:Value)=>string )
    tags?             : string[]         
} 


export type ValidatorObjectArgs<Value=any> = Pick<ValidatorObject<Value>,'required' | 'validate' | 'behavior' | 'enable' | 'errorTips' | 'placeholder' | 'tags' | 'descripotion' | 'title' | 'value' | 'widget'>


export function validator<Value=any> (initial:Value,validate?:AutoStoreValidate<Value>,optionsOrTips?:ValidatorObjectArgs | ValidatorObjectArgs['errorTips']){
    const optType = typeof(optionsOrTips)
    const opts = Object.assign({},optType==='string' || optType==='function' ? {errorTips:optionsOrTips} : optionsOrTips)
    return Object.assign({
        value             : initial,
        pass              : false,
        validate          : validate || (()=>true),
        [VALIDATOR_SCHEMA]: true        
    },opts) as ValidatorObject<Value>
}

export function createTypeValidator<Value=any>(isType:(val:any)=>boolean,defaultTips:string){
    return <T=Value>(initial:T,validate?:AutoStoreValidate<T>,optionsOrTips?:ValidatorObjectArgs<T> | ValidatorObjectArgs['errorTips'])=>{
        if(!isType(initial)) throw new ValidateError(defaultTips)
        const optType = typeof(optionsOrTips)
        const opts = Object.assign({},optType==='string' || optType==='function' ? {errorTips:optionsOrTips} : optionsOrTips) as ValidatorObjectArgs
        return validator<T>(initial,function(this:AutoStore<any>,newValue:T,oldValue:T,path:string){    
            const errorTips = getErrorTips.call(this,opts?.errorTips || this.options.validator?.errorTips, path,newValue,oldValue)
            if(!isType(newValue)) throw new ValidateError(errorTips)
            if(typeof(validate)==='function'){
                return validate(newValue,oldValue,path) 
            } 
            return true
        },opts)
    }
} 

export const validators = {
    number : createTypeValidator<number>((val)=>typeof(val)==='number','must be a number'),
    string : createTypeValidator<string>((val)=>typeof(val)==='string','must be a string'),
    boolean: createTypeValidator<boolean>((val)=>typeof(val)==='boolean','must be a boolean'),
    date   : createTypeValidator<Date>((val)=>val instanceof Date,'must be a date'),    
    bigint : createTypeValidator<bigint>((val)=>typeof(val)==='bigint','must be a bigint'),
    array  : createTypeValidator((val)=>Array.isArray(val),'must be an array'),
    object : createTypeValidator((val)=>typeof(val)==='object','must be an object'),
}

export const v = validators 