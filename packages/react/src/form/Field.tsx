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

import { ComputedObject,  Dict, ObserverBuilder, ObserverScopeRef, PATH_DELIMITER } from "autostore"
import React, {  useEffect, useState } from "react"
import { ReactAutoStore } from "../store"
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
    help    : string
    label   : string
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
} & SignalComponentRenderArgs<Value> 

export type AutoFieldProps<State extends Dict,Value> = {
    name     : string  
    label?   : string | ObserverBuilder<string,State>
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
        label   : '',
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
        help    : '',
        progress: 0,    
        onChange:()=>{},
        run     :()=>{},
        cancel  :()=>{}
    },props) as AutoFieldRenderProps<any,any>
}

export type AutoField<State extends Dict> = <Value=any>(props:AutoFieldProps<State,Value>)=>React.ReactNode

const ComputedFieldPropNames = ['required','validate','visible','readonly','enable','select'] as const

export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>): React.MemoExoticComponent<AutoField<State>>{
    const { useComputed } = store
    return React.memo(<Value=any>(props:AutoFieldProps<State,Value>)=>{
        
        const { name } = props
        const prefix = `#${name}.`
        
        const [value] = store.useState(name as any)

        const validate  = useComputed<boolean>(props.validate,{id:`${prefix}validate`,
            depends:[name],                          // 依赖name指向的值   
            scope:ObserverScopeRef.FirstDepend       // 作为第一个参数传入validate
        })  as ComputedObject<boolean>

        const required  = useComputed<boolean>(props.required,{id:`${prefix}required`}) as ComputedObject<boolean> | undefined
        const visible   = useComputed<boolean>(props.visible,{id:`${prefix}visible`})   as ComputedObject<boolean> | undefined
        const readonly  = useComputed<boolean>(props.readonly,{id:`${prefix}readonly`}) as ComputedObject<boolean> | undefined
        const enable    = useComputed<boolean>(props.enable,{id:`${prefix}enable`})     as ComputedObject<boolean> | undefined
        const select    = useComputed<any[]>(props.select,{id:`${prefix}select`})       as ComputedObject<any[]> | undefined
        const help      = useComputed<string>(props.help,{id:`${prefix}help`})          as ComputedObject<string> | undefined
        const label     = useComputed<string>(props.label,{id:`${prefix}label`})        as ComputedObject<string> | undefined

        const computedPropObjs = {
            validate,
            required,
            visible,
            readonly,
            enable,
            select,
            help,
            label
        } as Dict<ComputedObject<any> | undefined>

        const [renderProps,setRenderProps] = useState(()=>{

            return buildFieldRenderProps({
                value,
                validate: validate ? validate.val: true,
                required: required ? required.val: false,
                visible : visible ? visible.val: true,
                readonly: readonly ? readonly.val: false,
                enable  : enable ? enable.val: true,
                select  : select ? select.val: [],
                help    : help ? help.val: '',
                label   : label ? label.val: '',
            })
        }) 

        useEffect(()=>{
            // 侦听所有字段计算属性的变化，当变化时，重新渲染字段
            const watcher = store.watch(`#${name}.*`,({path,value})=>{
                const name = path.join(PATH_DELIMITER)
                if(name.startsWith(prefix)){
                    const [propKey] = name.substring(prefix.length).split(PATH_DELIMITER)
                    const propObj = computedPropObjs[propKey ]
                    if(propObj){
                        if(propObj.async && path[path.length-1] === 'value'){
                            setRenderProps({...renderProps,[propKey]: value.value})
                        }else{
                            setRenderProps({...renderProps,[propKey]:value})
                        }                        
                    }
                }
            },{operates:'write'})            
            return ()=>watcher.off()
        },[])
 


       
        return <>{props.render(renderProps)}</>
    },()=>true)
}

        