/**
 * import { t } from "autostore"
 * const store = new AutoStore({
 *      price: t.number(100,(val)=>val>0,{
 *          title:'价格',
 *      })
 * })
 * 
 * store.state.price=-1
 * 
 * store.schema['price]]
 * 
 */

import { VALUE_SCHEMA } from "../consts"



export {}


export type AutoStoreValueSchema<V=any> = {
    [VALUE_SCHEMA]:true
    validate?:(value:V)=>boolean
    title?:string
    tips?:string
    invalidTips?:string | ((err:Error)=>string )  // 无效提示
}