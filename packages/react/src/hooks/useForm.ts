import { useCallback, useEffect, useRef } from "react"
import {  Dict, getVal, isFunction, PATH_DELIMITER, pathStartsWith, setVal } from "autostore" 
import type { ReactAutoStore } from "../store"
import { UseFormOptions, UseFormValidateResult } from "./types"
 
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
        const options:UseFormOptions = Object.assign({
            debounce:0
        },args.length ===1 ? 
            (typeof(args[0])==='object' ? args[0] : null) 
            : (args.length >=2 ? (typeof(args[1])==='object' ? args[1] : null)  : null)
        ) 

                        
        const initial = useRef<boolean>(false)
        const inputs = useRef<Map<string,any>>()
        const formRef = useRef<HTMLFormElement>(null)
        // 对输入值进行校验
        const onValidate = useCallback((path:string[],value:any,input:HTMLElement)=>{
            const hasValidate = options.validate && isFunction(options.validate)            
            const valid = { value:true,style:"color:red;border:1px solid red;" } as UseFormValidateResult
            
            if(hasValidate){
                const spath = path.join(PATH_DELIMITER)
                const v = options.validate!(spath,value,input)
                if(typeof(v)==='boolean'){
                    valid.value = v
                }else if(typeof(v)==='object'){
                    Object.assign(valid,v)
                }
                const inputStyle = isFunction(valid.style) ? valid.style(spath,value,input): valid.style
                if(typeof(inputStyle)==='string'){
                    if(valid.value){ 
                        removeInputStyle(input,inputStyle)
                    }else{
                        insertInputStyle(input,inputStyle)
                    }  
                }
                const validateMessage = input.dataset.validateMessage
                // 获取错误信息的元素,如果没有则创建一个
                const getMessageElement=():HTMLElement | undefined=>{
                    if(!validateMessage) return
                    const msgEl = valid.message && typeof(valid.message)==='function' ?
                            valid.message(spath,validateMessage,input)  : input.nextSibling     
                    if(msgEl && msgEl.nodeType===1){
                        return  msgEl as HTMLElement
                    }else{
                        const span = document.createElement('span')
                        span.style.color = 'red'
                        span.classList.add('invalid') 
                        if (input.nextSibling) {
                            input.parentNode?.insertBefore(span, input.nextSibling);
                        } else {
                            input.parentNode?.appendChild(span);
                        }
                        return span
                    }                    
                }
                const msgElement = getMessageElement()
                // 当校验失败时呈现错误信息现
                if(valid.value){        
                    if(msgElement) msgElement.style.display='none'
                }else{
                    if(validateMessage && msgElement){
                        msgElement.style.display='block'
                        msgElement.innerHTML = validateMessage 
                    }
                }
            }
            return valid
        },[])

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
                    onValidate(path,value,input)
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
                const valid = onValidate(path,newVal,input)                
                if(valid.value){ 
                    store.update((state)=>{
                        setVal(state,path,newVal)
                    },{peep:true})                   
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