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
import { SchemaBuilder, SchemaObject, SchemaObjectArgs, SchemaObjectValidate } from './types';
import { getErrorTips } from "./utils"



function getSchemaOptions(args:any[]){
    const options =Object.assign({},( args.length>=2 && isPlainObject(args[args.length-1]) 
                        ? args[args.length-1] : undefined
                    )) as SchemaObjectArgs    
    options.value = args[0]

    if(args.length >=2 && typeof(args[1]) === 'function'){
        options.validate = args[1] 
    }
    if(args.length >=3 && ['string','function'].includes(typeof(args[2]))){
        options.errorTips = args[2] 
    }    
    return options
}


export const schema =  function() {
    const options = getSchemaOptions([...arguments])
    return Object.assign({
        pass          : false,
        validate      : () => true,
        [VALUE_SCHEMA]: true
    }, options)
} as unknown as SchemaBuilder


function createSchemaObject<T>(options:any,isValid:(val:any)=>boolean){
    return schema<T>(options.value,function (this: AutoStore<any>, newValue: T, oldValue: T, path: string){
        const errorTips = getErrorTips.call(this, options.errorTips || this.options.valueSchema?.errorTips, path, newValue, oldValue)
        if (!isValid(newValue)) throw new ValidateError(errorTips)
        if (typeof (options.validate) === 'function') {
            return options.validate(newValue, oldValue, path)
        }
        return true
    }, options) as SchemaObject<T>
}

export function createTypeSchemaBuilder<Value=any>(isValid:(val:any)=>boolean,defaultTips:string){
    return function typeSchema<T>():SchemaObject<T>{
        const options = getSchemaOptions([...arguments])
        if(!isValid(options.value)) throw new ValidateError(defaultTips)    
        return createSchemaObject(options,isValid) 
    } as SchemaBuilder<Value>
} 
 
export function createObjectSchemaBuilder<Value=any>(isValid:(val:any)=>boolean,defaultTips:string){
    function objectSchema<T=Value>(value:T,options?:SchemaObjectArgs<T> ):SchemaObject<T>
    function objectSchema<T=Value>(value:T,validate?:SchemaObjectValidate,options?:SchemaObjectArgs<T> ):SchemaObject<T>
    function objectSchema<T=Value>(value:T,validate?:SchemaObjectValidate,errorTips?:SchemaObjectArgs<T>['errorTips'] ):SchemaObject<T>
    function objectSchema<T=Value>():SchemaObject<T>{
        const opts = getSchemaOptions([...arguments])
        if(!isValid(opts.value)) throw new ValidateError(defaultTips)     
        return createSchemaObject<T>(opts, isValid)
    } 
    return objectSchema
} 
export function createArraySchemaBuilder<Value=any>(isValid:(val:any)=>boolean,defaultTips:string){
    function arraySchema<T=Value>(value:Array<T>,options?:SchemaObjectArgs<Array<T>> ):SchemaObject<Array<T>>
    function arraySchema<T=Value>(value:Array<T>,validate?:SchemaObjectValidate,options?:SchemaObjectArgs<Array<T>> ):SchemaObject<Array<T>>
    function arraySchema<T=Value>(value:Array<T>,validate?:SchemaObjectValidate,errorTips?:SchemaObjectArgs<Array<T>>['errorTips'] ):SchemaObject<Array<T>>
    function arraySchema<T=Value>():SchemaObject<Array<T>>{
        const opts = getSchemaOptions([...arguments])
        if(!isValid(opts.value)) throw new ValidateError(defaultTips)     
        return createSchemaObject<Array<T>>(opts, isValid)
    } 
    return arraySchema
} 

export const schemas = {
    number : createTypeSchemaBuilder<number>((val)=>typeof(val)==='number','must be a number'),
    string : createTypeSchemaBuilder<string>((val)=>typeof(val)==='string','must be a string'),
    boolean: createTypeSchemaBuilder<boolean>((val)=>typeof(val)==='boolean','must be a boolean'),
    date   : createTypeSchemaBuilder<Date>((val)=>val instanceof Date,'must be a date'),    
    bigint : createTypeSchemaBuilder<bigint>((val)=>typeof(val)==='bigint','must be a bigint'),
    array  : createArraySchemaBuilder((val)=>Array.isArray(val),'must be an array'),
    object : createObjectSchemaBuilder((val)=>typeof(val)==='object','must be an object') 
}

export const s = schemas
export const configurable = schema

