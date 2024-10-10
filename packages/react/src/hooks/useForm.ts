import { useEffect, useRef } from "react"
import {  Dict, getVal, PATH_DELIMITER, pathStartsWith, setVal } from "autostore" 
import type { ReactAutoStore } from "../store"
import type { UseFormOptions } from "./types"

const EMPTY_VALUE= Symbol("empty")
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
    return ()=>{        
        const args = arguments
        const entry = args.length > 0 ? 
                        (   typeof(args[0])==='string' ? args[0].split(PATH_DELIMITER) 
                            : (Array.isArray(args[0]) ? args[0] : [])
                        ) : []
        const options = args.length > 1 ? args[1] : {} as UseFormOptions
                        
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
                    const path = [...entry,name.split(PATH_DELIMITER)]
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
            const onChange = (e:any)=>{
                const input = e.target
                const name = input.name
                if(!name) return
                const path = [...entry,name.split(PATH_DELIMITER)]
                // 3.1 更新到store
                store.update((state)=>{
                    setVal(state,path,input.value)
                },{peep:true})
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
