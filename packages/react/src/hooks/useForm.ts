import { useEffect, useRef, useState } from "react"
import {  Dict, getVal, isFunction, PATH_DELIMITER, pathStartsWith, setVal } from "autostore" 
import type { ReactAutoStore } from "../store"
import { UseFormOptions } from "./types"
 
const EMPTY_VALUE= Symbol("empty")


function insertInputStyle(input:any,style:string | undefined){
    if(!style) return 
    let inputStyle = (input.getAttribute('style') || '').trim()      
    if(!inputStyle.includes(style)){   
        if(inputStyle.endsWith(';')) inputStyle+=';'
        if(style.endsWith(';')) style = style+=';'
        input.setAttribute('style',inputStyle+style) 
    }
}

function removeInputStyle(input:any,style:string | undefined){
    if(!style) return 
    let inputStyle = (input.getAttribute('style') || '').trim()      
    if(inputStyle.endsWith(';')) inputStyle+=';'
    if(style.endsWith(';')) style = style+=';'
    input.setAttribute('style',inputStyle.replace(style,'')) 
}


/**
 *  
 *   实现表单与store的双向绑定
 * 
 *   const { state,useForm } = createStore({...})
 *  const bindedForm = useForm()
 *   <form {...bindedForm...}>
 *      <input name="a"/>
 *      <input name="b"/>
 *      <input name="c"/>
 *   </form>
 * 
 *   bindings.reset()  // 重置表单 
 *   
 * 
 * @returns 
 */
export function createUseForm<State extends Dict>(store:ReactAutoStore<State>){
    return function(){        
        const args = arguments
        const entry = args.length > 0 ? 
                        (  typeof(args[0])==='string' ? args[0].split(PATH_DELIMITER) 
                            : (Array.isArray(args[0]) ? args[0] : [])
                        ) : []
        const options = Object.assign({
            debounce:0
        },args.length ===1 ? 
            (typeof(args[0])==='object' ? args[0] : null) 
            : (args.length >=2 ? (typeof(args[1])==='object' ? args[1] : null)  : null)
        ) as UseFormOptions

                        
        const initial = useRef<boolean>(false)
        const inputs = useRef<Map<string,any>>()
        const formRef = useRef<HTMLFormElement>(null)
        
        useEffect(()=>{
            const form = formRef.current
            if(!form) return
            // 1. 进行初始化
            if(!initial.current && form){
                const snap = store.getSnap({entry})
                inputs.current = new Map()
                const inputEles = form.querySelectorAll('input,textarea,select')  
                inputEles.forEach((input:any)=>{
                    const name = input.name
                    if(!name) return
                    const path = [...entry,...name.split(PATH_DELIMITER)]
                    const value = getVal(snap,path,EMPTY_VALUE)
                    if(value!==EMPTY_VALUE){
                        input.value = value
                    }
                    inputs.current!.set(path.join(PATH_DELIMITER),input)
                })
                initial.current = true
            }            
            // 2. 侦听来自变更
            const watcher = store.watch(({path,value})=>{
                // 2.1 如果变更的路径不是表单的路径，则忽略
                if(!pathStartsWith(entry,path)) return     
                // 2.2 更新到表单的输入控件
                const spath = path.join(PATH_DELIMITER)
                if(inputs.current!.has(spath)){
                    const oldValue = inputs.current!.get(spath).value
                    if(oldValue!==value){
                        inputs.current!.get(spath).value = value
                    }
                }                
            })

            // 输入控件变更时的响应
            const onChange = (e:any)=>{
                const input = e.target
                const name = input.name
                if(!name) return
                const path = [...entry,...name.split(PATH_DELIMITER)]
                const newVal = input.type === 'checkbox' ? input.checked : input.value   
                
                const valid = { result:true,style:"color:red;border:1px solid red;" } as { result:boolean,tips?:string,style?:string }
                const hasValidate = options.validate && isFunction(options.validate)
                if(hasValidate){
                    const v = options.validate!(path.join(PATH_DELIMITER),newVal,input)
                    if(typeof(v)==='boolean'){
                        valid.result = v
                    }else if(typeof(v)==='object'){
                        Object.assign(valid,v)
                    }
                }   
                if(valid.result){ 
                    store.update((state)=>{
                        setVal(state,path,newVal)
                    },{peep:true})   
                    if(hasValidate) removeInputStyle(input,valid.style)
                }else if(typeof(options.validate)==='function'){                        
                    if(hasValidate) insertInputStyle(input,valid.style)
                }                
            }
            // 3. 侦听来自表单输入的变更
            form.addEventListener('input',onChange)
            return ()=>{
                watcher.off() 
                form.removeEventListener('input',onChange)
            }            
        },[entry])

        return {
            ref: formRef 
        }    
    }  
} 