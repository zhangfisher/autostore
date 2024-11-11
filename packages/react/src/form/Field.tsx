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

import { ComputedObject,  ComputedState,  Dict,ComputedGetter ,PATH_DELIMITER, setVal, Watcher,ComputedOptions, computed, AsyncComputedGetter, AsyncComputedValue, IComputedGetter, IAsyncComputedGetter, ComputedBuilder, ObjectKeyPaths, SyncComputedDescriptorBuilder, AsyncComputedDescriptorBuilder, WatchDescriptorBuilder, GetTypeByPath, createAsyncComptuedValue } from "autostore"
import React, {  useCallback, useEffect, useRef, useState } from "react"
import { ReactAutoStore } from "../store"
import { AutoFormContext } from "./Form"
import { SignalComponentRenderArgs } from "../types"
import { pickValue } from "./utils/pickValue"
import { getInputValueFromEvent } from "../utils" 
import { Get } from "type-fest"


export type ComputedBooleanProp<State extends Dict,Scope  = ComputedState<State>> = boolean | ComputedBuilder<boolean,Scope>  
export type ComputedStringProp<State extends Dict,Scope  = ComputedState<State>> = string | ComputedBuilder<string,Scope>  
export type ComputedNumberProp<State extends Dict,Scope  = ComputedState<State>> = number |  ComputedBuilder<number,Scope>  
export type ComputedArrayProp<State extends Dict,Scope   = ComputedState<State>> = Array<any> |  ComputedBuilder<Array<any>,Scope>  

export type AutoFieldRenderBindProps<
    NAME,   
    VALUE, 
> = {
    name        : NAME 
    onChange    : (e:React.ChangeEvent<HTMLInputElement>)=>void
    value       : SignalComponentRenderArgs<VALUE>['value']
    placeHolder : string
}

export interface AutoFieldRenderProps<
    NAME,   
    VALUE, 
> extends SignalComponentRenderArgs<VALUE> {
    name       : NAME 
    validate   : AsyncComputedValue<boolean>
    required   : AsyncComputedValue<boolean>
    visible    : AsyncComputedValue<boolean> 
    enable     : AsyncComputedValue<boolean>
    readonly   : AsyncComputedValue<boolean> 
    label      : AsyncComputedValue<string>
    help       : AsyncComputedValue<string>
    placeHolder: AsyncComputedValue<string>
    select     : AsyncComputedValue<any[]>
    onChange   : (e:React.ChangeEvent<HTMLInputElement>)=>void
    bind       : AutoFieldRenderBindProps<NAME,VALUE>
}   

export interface AutoFieldProps<
    State extends Dict,
    NAME ,
    VALUE,
    VALIDATE
> {
    name        : NAME  
    validate?   : VALIDATE
    required?   : ComputedBooleanProp<State>
    visible?    : ComputedBooleanProp<State>
    readonly?   : ComputedBooleanProp<State>
    enable?     : ComputedBooleanProp<State>
    help?       : ComputedStringProp<State>
    label?      : ComputedStringProp<State>
    placeHolder?: ComputedStringProp<State>
    select?     : ComputedArrayProp<State>
    render      : (props:AutoFieldRenderProps<NAME,VALUE>)=>React.ReactNode
}  

export interface AutoField<State extends Dict>  {    
    < 
        NAME extends ObjectKeyPaths<ComputedState<State>>             = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends GetTypeByPath<ComputedState<State>,NAME>        = Get<ComputedState<State>,NAME>,
        VALIDATE extends SyncComputedDescriptorBuilder<boolean,VALUE> = SyncComputedDescriptorBuilder<boolean,VALUE>
    >(props:AutoFieldProps<State,NAME,VALUE,VALIDATE>):React.ReactNode
    < 
        NAME extends ObjectKeyPaths<ComputedState<State>>              = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>,NAME>                   = Get<ComputedState<State>,NAME>,
        VALIDATE extends AsyncComputedDescriptorBuilder<boolean,VALUE> = AsyncComputedDescriptorBuilder<boolean,VALUE>
    >(props:AutoFieldProps<State,NAME,VALUE,VALIDATE>):React.ReactNode
    < 
        NAME extends ObjectKeyPaths<ComputedState<State>> = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>,NAME>      = Get<ComputedState<State>,NAME>,
        VALIDATE extends  ComputedGetter<boolean,VALUE>   = ComputedGetter<boolean,VALUE> 
    >(props:AutoFieldProps<State,NAME,VALUE,VALIDATE>):React.ReactNode
    < 
        NAME extends ObjectKeyPaths<ComputedState<State>>   = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>,NAME>        = Get<ComputedState<State>,NAME>,
        VALIDATE extends AsyncComputedGetter<boolean,VALUE> = AsyncComputedGetter<boolean,VALUE>
    >(props:AutoFieldProps<State,NAME,VALUE,VALIDATE>):React.ReactNode
    < 
        NAME extends ObjectKeyPaths<ComputedState<State>>   = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>,NAME>        = Get<ComputedState<State>,NAME>,
        VALIDATE extends WatchDescriptorBuilder<boolean> = WatchDescriptorBuilder<boolean>
>(props:AutoFieldProps<State,NAME,VALUE,VALIDATE>):React.ReactNode
}
    
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

 
export function prop(getter:ComputedGetter<any> | AsyncComputedGetter<any>,options?:ComputedOptions<any>):ComputedGetter<any>{
    return computed(getter as any,options) as ComputedGetter<any>
}

export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>):AutoField<State>{
    const { useComputed } = store
       
    return (props:any)=>{        
        const { name } = props
        const prefix = `${name}.`        
        const value = store.useAsyncState(name as any)
        const validate  = useComputed<boolean>(props.validate,{id:`${prefix}validate`,
            depends:[name],                          // 依赖<name>
            scope:name,        
            initial:true,
            throwError:false,
            onError:()=>false,      //出错时返回false
        })  as ComputedObject<boolean>
        const required    = useComputed<boolean>(props.required,{id:`${prefix}required`,initial:false,throwError:false})   as ComputedObject<boolean> | undefined
        const visible     = useComputed<boolean>(props.visible,{id:`${prefix}visible`,initial:true,throwError:false})      as ComputedObject<boolean> | undefined
        const readonly    = useComputed<boolean>(props.readonly,{id:`${prefix}readonly`,initial:false,throwError:false})   as ComputedObject<boolean> | undefined
        const enable      = useComputed<boolean>(props.enable,{id:`${prefix}enable`,initial:true,throwError:false})        as ComputedObject<boolean> | undefined
        const select      = useComputed<any[]>(props.select,{id:`${prefix}select`,initial:[],throwError:false})            as ComputedObject<any[]> | undefined
        const help        = useComputed<string>(props.help,{id:`${prefix}help`,initial:'',throwError:false})               as ComputedObject<string> | undefined
        const label       = useComputed<string>(props.label,{id:`${prefix}label`,initial:'',throwError:false})             as ComputedObject<string> | undefined
        const placeHolder = useComputed<string>(props.placeHolder,{id:`${prefix}placeHolder`,initial:'',throwError:false}) as ComputedObject<string> | undefined
        
        const fieldPropObjs = {
            validate,
            required,
            visible,
            readonly,
            enable,
            select,
            help,
            label,
            placeHolder
        } as Dict<ComputedObject<any> | undefined>

        const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
            let inputValue = getInputValueFromEvent(e)            
            if(name){
                store.update(state => setVal(state, name.split(PATH_DELIMITER), inputValue));
            }            
            formCtx.current?.setDirty(true)
            e.stopPropagation()
        },[name])
        
        const [ _,setRefresh ] = useState(0)

        const renderProps = useRef<any>()
        if(!renderProps.current){
            const bind = {
                name,onChange,
                value:value.value,
                placeHolder: placeHolder ? placeHolder.val: pickValue<string>(props.placeHolder as any,'')
            }
            renderProps.current=buildFieldRenderProps({
                name,
                validate   : createAsyncComptuedValue(validate ? validate.value : false),     
                required   : createAsyncComptuedValue(required ? required.value : false),                
                visible    : createAsyncComptuedValue(visible ? visible.value : true),                     
                readonly   : createAsyncComptuedValue(readonly ? readonly.value : false),     
                enable     : createAsyncComptuedValue(enable ? enable.value : true),     
                select     : createAsyncComptuedValue(select ? select.value : undefined),     
                help       : createAsyncComptuedValue(help ? help.value : undefined),     
                label      : createAsyncComptuedValue(label ? label.value : undefined),     
                placeHolder: createAsyncComptuedValue(placeHolder ? placeHolder.value : undefined),     
                error      : validate?.error?.message ?? '',
                onChange,
                bind                
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
            watchers.push(store.watch(name,({value}:any)=>{
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


