import { useCallback, useEffect, useRef } from "react";
import { ComputedState, Dict,  PATH_DELIMITER, pathStartsWith  } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { Validator } from './validator';
import { findAutoFields } from "./utils/findAutoFields";
import React from "react"; 
import { stateToField } from "./utils/stateToField";
import { fieldToState } from "./utils";
import { isFalse } from "./utils/isFalse";
import { getInputValue } from "./utils/getInputValue";
import { initFormFields } from "./utils/initFormFields";


export type AutoFormProps<State extends Dict>  = React.PropsWithChildren<
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>
    & {
		entry?     : string
		onValidate?: (state:State)=>boolean
		onSubmit?  : (state:ComputedState<State>)=>void
	}
>

export type AutoForm<State extends Dict> = React.FunctionComponent<AutoFormProps<State>>


export type AutoFormFieldContext = {
	path        : string
	el          : HTMLElement
	inputs      : HTMLInputElement[]
	initial?	: any					
	invalidTips?: string | null
}

export type AutoFormFieldContexts = Record<string,AutoFormFieldContext[]> 

export type AutoFormContext<State extends Dict> = {
    setDirty 	: (val?:boolean)=>void
    setValid 	: (val:boolean)=>void    
	setSubmiting: (val:boolean)=>void
	setError	: (val:any)=>void
	state       : ComputedState<State>
	options     : UseFormOptions<State>
	formRef     : React.MutableRefObject<HTMLFormElement | null>
	fields?   	: AutoFormFieldContexts
    validator?	: Validator<State> 
}

export function createAutoFormComponent<State extends Dict>(store: ReactAutoStore<State>,formCtx:React.MutableRefObject<AutoFormContext<State> | null>){
	const ctx = formCtx.current! as Required<AutoFormContext<State>>
	const options:UseFormOptions<State> = formCtx.current!.options	
    return (props:AutoFormProps<State>)=>{        		
		const initial = useRef<boolean>(false);
		
        // 仅在初始化时执行一次
        const initForm = useCallback(()=>{
            const form = options.ref!.current;            
			if (!form) return;             
            let initValid:boolean	= true
			ctx.fields = findAutoFields(form,options);       	
			ctx.validator.attach()
			// 初始化表单控件的值: 从state读取数据更新到表单控件
			initFormFields(store,ctx.fields,options)            
            // 初始化时是否进行数据校验
            if(!isFalse(options.validAtInit)){
                ctx.validator.validateAll()
            }
            initial.current = true;            
            ctx.setValid(initValid); 
			ctx.setDirty(false);
        },[])
 
		useEffect(() => {
			const form = options.ref!.current;
			if (!form) return; 
			const entryPath =    ctx.options.entry ? ctx.options.entry.split(PATH_DELIMITER) : []
            // 1. 初始化表单控件
			if (!initial.current && form) {
				initForm()
			}
			// 2. 侦听来自变更
			const watcher = store.watch(({path, value }) => {
				// 2.1 如果变更的路径不是表单的路径，则忽略
				if (!pathStartsWith(entryPath, path)) return;
				// 2.2 更新到表单的输入控件
				const spath = path.join(PATH_DELIMITER);
				if (spath in ctx.fields) {
					const fields = ctx.fields![spath]
					fields && fields.forEach(fieldInfo=>{
						if(stateToField(fieldInfo,value,ctx.options)){
							ctx.validator.validate(fieldInfo.el);
						}
					})
				}
			});
			// 3. 输入控件变更时的响应
			const onChange = (e: any) => {
				const input = e.target;
				const path = input.name;
				if (!path) {
					store.log('Input element does not have specified <name> attribute', 'warn')
					return
				}
				const newVal = getInputValue(input)
				if(ctx.validator.validate(input)?.value){
					fieldToState(store, input,path, newVal, ctx.options);
					ctx.setDirty()  
				}                                          
			};
            // 4. 侦听来自表单输入的变更
			form.addEventListener("input", onChange); 

			// 5.侦听来自表单的提交
			options.ref?.current?.addEventListener('submit', async (e) => {
				e.preventDefault();
				try{
					ctx.setSubmiting(true)
					await props.onSubmit?.(store.state)
				}catch(err){
					ctx.setError(err)
				}finally{
					ctx.setSubmiting(false)
				}
			})

			return () => {
				watcher.off();
				form.removeEventListener("input", onChange);
				initial.current=false
			};
		
		},[]);
		
		return <form {...props} 
			ref={options.ref}
		>
            {props.children}
        </form>
	} 
}



