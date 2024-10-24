import { useCallback, useEffect, useRef } from "react";
import { ComputedState, Dict, getVal,  PATH_DELIMITER, pathStartsWith  } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { Validator } from './validate';
import { findAutoFields } from "./utils/findAutoFields";
import React from "react";
import { EMPTY_VALUE } from "./consts"; 
import { isEmpty } from "../utils/isEmpty"; 
import { fromStateToField } from "./utils/fromStateToField";
import { fromFieldToState } from "./utils";
import { isFalse } from "./utils/isFalse";
import { getInputValue } from "./utils/getInputValue";


export type AutoFormProps<State extends Dict>  = React.PropsWithChildren<
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>
    & {
		onValidate?:(state:State)=>boolean
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
			const { entry = [] } = options;
			const snap = store.getSnap({ entry });
            ctx.fields = findAutoFields(form,options.findFields);            
			if(isEmpty(ctx.fields)){
				store.log('No fields found in the autoform', 'warn')
			}			
			ctx.validator = new Validator(store,ctx)
			
            // 初始化表单控件的值: 从state读取数据更新到表单控件
            Object.entries(ctx.fields).forEach(([name,fields]) => {
                const path = [...entry, ...name.split(PATH_DELIMITER)];				
                const value = getVal(snap, path, EMPTY_VALUE);// 如果指定的路径不存在，则返回的是空值
                if (value !== EMPTY_VALUE) {
					fields.forEach(field=>{
                    	field.initial = value
						fromStateToField(field,value,options,true)
					})
                }                
            });
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
			const { entry = [] } = options;
            // 1. 初始化表单控件
			if (!initial.current && form) {
				initForm()
			}
			// 2. 侦听来自变更
			const watcher = store.watch(({ path, value }) => {
				// 2.1 如果变更的路径不是表单的路径，则忽略
				if (!pathStartsWith(entry, path)) return;
				// 2.2 更新到表单的输入控件
				const spath = path.join(PATH_DELIMITER);
				if (spath in ctx.fields) {
					const fields = ctx.fields![spath]
					fields && fields.forEach(fieldInfo=>{
						if(fromStateToField(fieldInfo,value,ctx.options)){
							ctx.validator.validate(fieldInfo.el);
						}
					})
				}
			});
			// 3. 输入控件变更时的响应
			const onChange = (e: any) => {
				const input = e.target;
				const path = input.name;
				if (!path) return;
				const newVal = getInputValue(input)
				if(ctx.validator.validate(input)?.value){
					fromFieldToState(store, input,path, newVal, ctx.options);
					ctx.setDirty()  
				}                                          
			};
            // 3. 侦听来自表单输入的变更
			form.addEventListener("input", onChange); 
			return () => {
				watcher.off();
				form.removeEventListener("input", onChange);
				initial.current=false
			};
		},[]);
		return <form {...props} ref={options.ref}>
            {props.children}
        </form>
	} 
}



