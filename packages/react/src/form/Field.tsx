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

import { ComputedBuilder,  ComputedObject,  ComputedState,  Dict, ObserverBuilder, PATH_DELIMITER, PickComputedResult, setVal, Watcher } from "autostore"
import React, {  useCallback, useEffect, useRef, useState } from "react"
import { ReactAutoStore } from "../store"
import { AutoFormContext } from "./Form"
import { SignalComponentRenderArgs } from "../types"
import { pickValue } from "./utils/pickValue"
import { getInputValueFromEvent } from "../utils" 


export type ComputedBooleanProp<Scope> =  ComputedBuilder<boolean,Scope>  
export type ComputedStringProp<State extends Dict,Scope  = ComputedState<State>> = string |  ObserverBuilder<string,Scope>  
export type ComputedNumberProp<State extends Dict,Scope  = ComputedState<State>> = number |  ObserverBuilder<number,Scope>  
export type ComputedArrayProp<State extends Dict,Scope   = ComputedState<State>> = Array<any> |  ObserverBuilder<Array<any>,Scope>  

export interface AutoFieldRenderProps<
    Value, 
    Validate,    
    Required2,
    Visible,
    Enable, 
    Label,   
    Help,
    Readonly,
    Select
> extends SignalComponentRenderArgs<Value> {
    name    : string 
    validate: PickComputedResult<Validate>
    required: PickComputedResult<Required2> 
    visible : PickComputedResult<Visible> 
    readonly: PickComputedResult<Readonly> 
    enable  : PickComputedResult<Enable> 
    select  : PickComputedResult<Select> 
    help    : PickComputedResult<Help> 
    label   : PickComputedResult<Label>
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
}  

export interface AutoFieldProps<
    Value, 
    Validate,    
    Required2,
    Visible,
    Enable, 
    Label,   
    Help,
    Readonly,
    Select
> {
    name      : string  
    validate? : Validate 
    required? : Required2
    visible?  : Visible
    readonly? : Readonly
    enable?   : Enable
    select?   : Select
    help?     : Help
    label?    : Label
    render    : (props:AutoFieldRenderProps<Value,Validate,Required2,Visible,Enable,Label,Help,Readonly,Select>)=>React.ReactNode
}  

export type AutoField<State extends Dict> = <
    Value = any, 
    Validate extends ComputedBooleanProp<State> = ComputedBooleanProp<State>,      
    Required2 extends ComputedBooleanProp<State> = ComputedBooleanProp<State>,
    Visible extends ComputedBooleanProp<State>  = ComputedBooleanProp<State>,
    Enable extends ComputedBooleanProp<State>   = ComputedBooleanProp<State>, 
    Label extends ComputedStringProp<State>     = ComputedStringProp<State>,   
    Help extends ComputedStringProp<State>      = ComputedStringProp<State>,
    Readonly extends ComputedBooleanProp<State> = ComputedBooleanProp<State>,
    Select extends ComputedArrayProp<State>     = ComputedArrayProp<State>
>(
    props: AutoFieldProps<Value,Validate,Required2,Visible,Enable,Label,Help,Readonly,Select>
)=>React.ReactNode

 


function buildFieldRenderProps(props:any){
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
        help    : '',
        progress: 0,    
        onChange:()=>{},
        run     :()=>{},
        cancel  :()=>{}
    },props)  
}


export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>):AutoField<State>{
    const { useComputed } = store
    return (props)=>{        
        const { name } = props
        const prefix = `${name}.`        
        const value = store.useAsyncState(name as any)
        const validate  = useComputed<boolean>(props.validate,{id:`${prefix}validate`,
            depends:[name],                          // 依赖<name>
            scope:name,        
            initial:true,
            throwError:false
        })  as ComputedObject<boolean>
        const required  = useComputed<boolean>(props.required,{id:`${prefix}required`,initial:false,throwError:false})  as ComputedObject<boolean> | undefined
        const visible   = useComputed<boolean>(props.visible,{id:`${prefix}visible`,initial:true,throwError:false})     as ComputedObject<boolean> | undefined
        const readonly  = useComputed<boolean>(props.readonly,{id:`${prefix}readonly`,initial:false,throwError:false})  as ComputedObject<boolean> | undefined
        const enable    = useComputed<boolean>(props.enable,{id:`${prefix}enable`,initial:true,throwError:false})       as ComputedObject<boolean> | undefined
        const select    = useComputed<any[]>(props.select,{id:`${prefix}select`,initial:[],throwError:false})           as ComputedObject<any[]> | undefined
        const help      = useComputed<string>(props.help,{id:`${prefix}help`,initial:'',throwError:false})              as ComputedObject<string> | undefined
        const label     = useComputed<string>(props.label,{id:`${prefix}label`,initial:'',throwError:false})            as ComputedObject<string> | undefined

        const fieldPropObjs = {
            validate,
            required,
            visible,
            readonly,
            enable,
            select,
            help,
            label
        } as Dict<ComputedObject<any> | undefined>

        const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
            let inputValue = getInputValueFromEvent(e)            
            if(name){
                store.update(state => setVal(state, name.split(PATH_DELIMITER), inputValue));
            }            
            e.stopPropagation()
        },[name])
        
        const [ _,setRefresh ] = useState(0)

        const renderProps = useRef<any>()
        if(!renderProps.current){
            renderProps.current=buildFieldRenderProps({
                name,
                validate: validate ? validate.val: pickValue<boolean>(props.validate as any,true),
                required: required ? required.val: pickValue<boolean>(props.required as any,false),
                visible : visible ? visible.val: pickValue<boolean>(props.visible as any,true),
                readonly: readonly ? readonly.val: pickValue<boolean>(props.readonly as any,false),
                enable  : enable ? enable.val:  pickValue<boolean>(props.enable as any,true),
                select  : select ? select.val: pickValue<any[]>(props.select as any,[]),
                help    : help ? help.val: pickValue<string>(props.help as any,''),
                label   : label ? label.val: pickValue<string>(props.label as any,''),
                ...value, 
                error: validate?.error?.message ?? '',
                onChange
            })   
        }  

        const getFieldPropObj = useCallback((path:string[]):[string | undefined,ComputedObject<any> | undefined]=>{
            const spath = path.join(PATH_DELIMITER)
            if(spath.startsWith("#"+prefix)){
                const [propKey] = spath.substring(("#"+prefix).length).split(PATH_DELIMITER)
                return  [propKey,fieldPropObjs[propKey]]
            }
            return [undefined,undefined]
        },[]) 

        useEffect(()=>{
            const watchers:Watcher[] =[]
            let count:number = 0
            watchers.push(store.on("computed:error",({path,error})=>{
                const [propKey,propObj] = getFieldPropObj(path)
                if(propObj && propKey){   
                    Object.assign(renderProps.current!,{error:error.message})      
                    setRefresh(++count)
                }
            }))
            watchers.push(store.watch(name,({value})=>{
                Object.assign(renderProps.current!,{value})
                setRefresh(++count)
            }))
            // 侦听所有字段计算属性的变化，当变化时，重新渲染字段
            watchers.push(store.watch(`#${name}.*`,({path,value})=>{
                const [propKey,propObj] = getFieldPropObj(path)
                if(propObj && propKey){
                    const updated:Dict  = {}
                    if(propObj.async && path[path.length-1] === 'value'){
                        Object.assign({[propKey]: value.value})
                    }else{
                        Object.assign({[propKey]:value})
                    }       
                    if(propKey === 'validate' && value === true){
                        updated.error = null
                    }
                    Object.assign(renderProps.current!,updated)
                    setRefresh(++count)                    
                }
            }))  
            return ()=>watchers.forEach(w=>w.off())
        },[])

        return <>{props.render(renderProps.current as any)}</> 
    
    }
}



