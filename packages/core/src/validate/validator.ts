/**
 * import { v } from "autostore"
 * 
 * const store = new AutoStore({
 *    price: v.number(100,(val)=>val>0 && val<100,{
 *        title:'价格',
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


export type AutoStoreValidate<Value=any> = (newValue:Value,oldValue:Value,path:string)=>boolean


export type ValidatorObject<Value=any> = {
    [VALIDATOR_SCHEMA]: true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    enable?           : boolean 
    path?             : string
    title?            : string
    tips?             : string
    placeholder?      : string
    widget?           : string
    errorTips?        : string
    tags?             : string[] 
    pass?             : boolean         // 当验证失败时是否继续写入，验证失败信息会更新到validators.errors中
} 


export function validator<Value=any> (initial:Value,validate?:AutoStoreValidate<Value>,options?:ValidatorObject){
    return Object.assign({
        value: initial,
        pass: true,
        [VALIDATOR_SCHEMA]:true,
        validate: validate || (()=>true)
    },options) as ValidatorObject<Value>
}

function createTypeValidator<Value=any>(isType:(val:any)=>boolean,defaultTips:string){
    return (initial:Value,validate?:AutoStoreValidate<Value>,options?:ValidatorObject<Value>)=>{
        const errorTips:string = options?.errorTips || defaultTips
        if(!isType(initial)) throw new ValidateError(errorTips)
        return validator<Value>(initial,(newValue:Value,oldValue:Value,path:string)=>{
            if(!isType(newValue)) throw new ValidateError(errorTips)
            if(typeof(validate)==='function'){
                return validate(newValue,oldValue,path) 
            } 
            return true
        },options)
    }
}

export const validators = {
    number: createTypeValidator<number>((val)=>typeof(val)==='number','must be a number'),
    string: createTypeValidator<string>((val)=>typeof(val)==='string','must be a string'),
    boolean: createTypeValidator<boolean>((val)=>typeof(val)==='boolean','must be a boolean'),
}

export const v = validators 