/**
 *  创建表单字段
 * 
 *  当默认的表单字段不能满足要求，可以使用Field组件创建自定义的表单字段
 * 
 * 
 * 
 * const { state } = useStore() 
 * const { Form,Field } = useForm()
 * 
 * 
 * <Form>
 *      <Field<typeof state.order.price>        // 泛型参数指定字段的类型
 *          name="order.price"                  // 指定要绑定到状态的哪里
 *          validate={(value)=>boolean}         // 这是一个计算属性，可以是同步或异步的
 *          validate={async (value)=>boolean}   // 这是一个计算属性，可以是同步或异步的
 *          validate={computed(....)}           // 创建一个计算属性
 *          
 *          requ    
 * 
 *          render={({name,value,error,onChange})=>{ 
 *              return <input name={name} onChange={onChange}/>
 *          })
 *      >
 * 
 * </Form>
 * validate是一个计算属性，当value变化时会自动执行，返回值为true表示校验通过，false表示校验失败
 * 计算属性的数据会传递给render 
 *          render={({name,value,timeout,loading,retry,validate,....})=>{ 
 *              return <input name={name} onChange={onChange}/>
 *          })
 * 
 * 
 * 
 * 
 * @example
 * 
 * 
 * <Form>
 *      <Field
 *          name={(state)=>state.price+state.count}
 *          render={({value,onChange,loading,timeout})=>{
 *               当price或count变化时，会自动更新
 *              return <span onClick={
 *                  (e)=>{
 *                      onChange(e,state=>{
 *                          
 *                      }) // 更新状态
 *                  }
 *              }>{price} + {count}</span>
 *          })
 *      >
 * 
 * </Form>
 * 
 */

import { ComputedState, Dict, ObserverBuilder } from "autostore"
import React, { useEffect, useRef } from "react"
import { ReactAutoStore } from "../store"
import {  UseFormOptions } from "./types"
import { UseStateGetter } from "../hooks/types"
import { AutoFormContext } from "./Form"
import { isInputElement } from "./utils"

export type AutoFieldRenderProps<State extends Dict,Value> = {
    value   : Value
    required: boolean
    validate: boolean
    visible : boolean
    readonly: boolean
    enable  : boolean
    select  : any[]
    onChange: (e:MouseEvent,updaterOrValue:Value | ((state:ComputedState<State>)=>void))=>void

}
export type AutoFieldProps<State extends Dict,Value> = {
    name     : string | UseStateGetter<Value,State>
    required?: ObserverBuilder<boolean,State>
    validate?: ObserverBuilder<boolean,State>
    visible? : ObserverBuilder<boolean,State>
    readonly?: ObserverBuilder<boolean,State>
    enable?  : ObserverBuilder<boolean,State>
    select?  : ObserverBuilder<any[],State>
    render   : (props:AutoFieldRenderProps<State,Value>)=>React.ReactNode
}

export type AutoField<State extends Dict> = <Value>(props:AutoFieldProps<State,Value>)=>React.ReactNode

export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>): React.MemoExoticComponent<AutoField<State>>{
    const ctx = formCtx.current!
    const options:UseFormOptions<State> = formCtx.current!.options

    return React.memo<AutoField<State>>(<Value=any>(props:AutoFieldProps<State,Value>)=>{
        const { render,name } = props
        const ref = useRef<HTMLDivElement>(null)
        const [ value ] = store.useState(props.name as any,true)

        useEffect(()=>{
            

        },[])

        const renderProps = {    
            value,        
            onChange:(e,updater)=>{
                const inputEle = e.target as HTMLElement
                if(typeof(updater)==='function'){
                    store.batchUpdate((state)=>{
                        (updater as any)(state)
                    })
                }else if(typeof(name)==='string'){
                    // 因为不是输入元素，所以需要手动触发input事件，以便Form组件可以侦听到进行处理
                    if(isInputElement(inputEle)){

                    }else{                   
                        const inputEv = new CustomEvent('input', {
                            detail: { value: updater }
                        }); 
                        inputEle.dispatchEvent(inputEv)
                    }
                }                
            }
        } as AutoFieldRenderProps<State,Value>
        return <>{render(renderProps)}</>
    },()=>true)
}

        