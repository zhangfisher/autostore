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
 *          help="请输入价格"                    // 提示信息
 *          visible={true}                      // 是否可见
 *          visible={computed(....)}            // 创建一个计算属性
 *          render={({visible,name,value,loading,error,onChange,validate,dirty,help})=>{ 
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
 * 
 *          render={({value,onChange,loading,timeout,.....})=>{
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

import { ComputedObject, ComputedState, Dict, ObserverBuilder } from "autostore"
import React, { useCallback, useEffect, useState } from "react"
import { ReactAutoStore } from "../store"
import {  UseFormOptions } from "./types"
import { UseStateGetter } from "../hooks/types"
import { AutoFormContext } from "./Form"
import { SignalComponentRenderArgs } from "../types"


export type AutoFieldRenderProps<State extends Dict,Value> = {
    value   : Value
    required: boolean
    validate: boolean
    visible : boolean
    readonly: boolean
    enable  : boolean
    select  : any[]
    onChange: (e:MouseEvent,updaterOrValue:Value | ((state:ComputedState<State>)=>void))=>void
} & SignalComponentRenderArgs<Value> 

export type AutoFieldProps<State extends Dict,Value> = {
    name     : string  
    required?: boolean | ObserverBuilder<boolean,State>
    validate?: boolean | ObserverBuilder<boolean,State>
    visible? : boolean | ObserverBuilder<boolean,State>
    readonly?: boolean | ObserverBuilder<boolean,State>
    enable?  : boolean | ObserverBuilder<boolean,State>
    select?  : boolean | ObserverBuilder<any[],State>
    help?    : string | ObserverBuilder<string,State>
    render   : (props:AutoFieldRenderProps<State,Value>)=>React.ReactNode
}

function buildFieldRenderProps(props:Partial<AutoFieldRenderProps<any,any>>){
    return Object.assign({
        value   : undefined,
        required: false,
        validate: true,
        visible : true,
        readonly: false,
        enable  : true,
        select  : [],
        timeout : 0,
        loading : false,
        retry   : 0,
        error   : undefined,
        dirty   : false,
        help    : undefined,
        progress: 0,    
        onChange:()=>{},
        run     :()=>{},
        cancel  :()=>{}
    },props) as AutoFieldRenderProps<any,any>
}

export type AutoField<State extends Dict> = <Value>(props:AutoFieldProps<State,Value>)=>React.ReactNode

const ComputedFieldPropNames = ['required','validate','visible','readonly','enable','select'] as const

export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>): React.MemoExoticComponent<AutoField<State>>{
    const ctx = formCtx.current!
    const options:UseFormOptions<State> = formCtx.current!.options
    const { useComputed } = store
    return React.memo<AutoField<State>>(<Value=any>(props:AutoFieldProps<State,Value>)=>{
        
        const { name } = props
        
        
        const [value] = store.useState(name as any)

        const validate  = useComputed<boolean>(props.validate,{id:`#${name.replaceAll(".","_")}.validate`})  as ComputedObject<boolean>

         const [renderProps,setRenderProps] = useState(()=>{

            return buildFieldRenderProps({
                value,
                validate: validate ? validate.val: true,
            })
        })



        


        useEffect(()=>{
            store.watch("#{name}.*",({path,value})=>{
                
            })
            validate && validate.watch(({value})=>{
                setRenderProps({...renderProps,validate:value})
            })
           
            return 
        },[])

        const render = useCallback((props:AutoFieldRenderProps<State,Value>)=>{

            const renderProps = buildFieldRenderProps(props)
            return props.render!(renderProps)
        },[])


        useEffect(()=>{
              



        },[])


       
        return <>{render(renderProps)}</>
    },()=>true)
}

        