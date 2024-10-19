import { useCallback, useEffect, useRef } from "react";
import { Dict, getVal,  PATH_DELIMITER, pathStartsWith, setVal } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { toggleValidateResult, validate, Validator } from './validate';
import { getInputElements, findAutoFields, removeArrayItem } from "./utils";
import React from "react";
import { EMPTY_VALUE } from "./consts";


export type AutoFromProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>
    & { }
>

export type AutoForm<State extends Dict> = React.FC<AutoFromProps>


export type AutoFormFieldInfo = {
	name:string
	el:HTMLElement
	inputs:HTMLInputElement[]
	initial?:any					
	invalidTips?:string | null
}
export type AutoFormFieldInfos = Record<string,AutoFormFieldInfo>

export type AutoFormContext<State extends Dict> = {
    setDirty:()=>void
    setValid:(val:boolean)=>void
    fields: React.MutableRefObject<AutoFormFieldInfos>
    validator: React.MutableRefObject<Validator<State> | undefined>
}

export function createAutoFormComponent<State extends Dict>(store: ReactAutoStore<State>,options:UseFormOptions<State>,ctx:React.RefObject<AutoFormContext<State> | null>): React.MemoExoticComponent<AutoForm<State>>{
    return React.memo<AutoForm<State>>((props:AutoFromProps)=>{
        
		const initial = useRef<boolean>(false);
        const invalids = useRef<string[]>([]);

		const updateInvalids = useCallback((path:string,value:boolean)=>{
			if(value){
				removeArrayItem(invalids.current,path)
			}else{
				if(!invalids.current.includes(path)) invalids.current.push(path)
			}
            ctx.setValid(invalids.current.length===0)
		},[])
        // 仅在初始化时执行一次
        const initForm = useCallback(()=>{
            const form = options.ref!.current;
            const { entry = [] } = options;
			if (!form) return;             
            let initValid:boolean	= true
			const snap = store.getSnap({ entry });
            ctx.fields.current = new Map();
            const fields = findAutoFields(form,options.fieldSelector || 'input,textarea,select');            
			ctx.validator.current = new Validator(ctx.setValid,store,form,fields,options)
            // 初始化表单控件的值: 从state读取数据更新到表单控件
            Object.entries(fields).forEach(([name,field]) => {
                const path = [...entry, ...name.split(PATH_DELIMITER)];
				// 如果指定的路径不存在，则返回的是空值
                const value = getVal(snap, path, EMPTY_VALUE);
                if (value === EMPTY_VALUE) {

				}else{
                    field.initial = value
					// 由于表单组件可能不是标准的input控件，此时需要获取内部的控件 data-field-part="1"
					const inputEls = getInputElements(field.el)
					
					if(inputEl) inputEl.value = value

                }                
            });
            // 初始化时是否进行数据校验
            if(options.validAtInit){
                ctx.validator.current.validateAll()
            }
            initial.current = true;
            ctx.setDirty();
            ctx.setValid(initValid); 
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
				if (ctx.fields.current!.has(spath)) {
					const oldValue = ctx.fields.current!.get(spath).value;
                    //  注意：这里需要比对一个输入控件的值，如果不相同才进行更新，否则会导致死循环
					if (oldValue !== value) {                        
                        // 更新到表单字段中	
						ctx.fields.current!.get(spath).value = value;	
						// 执行校验
                        const fieldEle = ctx.fields.current!.get(spath)
						const validateResult = validate(path, value, fieldEle,options.ref!.current!,options);
						updateInvalids(spath,validateResult.value)
						toggleValidateResult(spath,validateResult,fieldEle,options.ref!.current!,options);						
					}
				}
			});
			// 3. 输入控件变更时的响应
			const onChange = (e: any) => {
				const input = e.target;
				const name = input.name;
				if (!name) return;
				const path = [...entry, ...name.split(PATH_DELIMITER)];
				const newVal = input.type === "checkbox" ? input.checked : input.value;
                // 当用户输入时进行比对，如果正确则更新
				const validateResult = validate(path, newVal, input,options.ref!.current!,options);                
				if (validateResult.value) {
					store.update((state) => { setVal(state, path, newVal); },{ peep: true });
                }                         
                const fieldEle = ctx.fields.current!.get(name)
				updateInvalids(name,validateResult.value)
				toggleValidateResult(name,validateResult,fieldEle,options.ref!.current!,options);	
                ctx.setDirty()            
			};
            // 3. 侦听来自表单输入的变更
			form.addEventListener("input", onChange); 
			return () => {
				watcher.off();
				form.removeEventListener("input", onChange);

				
			};
		},[]);
        const Children = React.memo(()=><>{props.children}</>,()=>true)
		return <form {...props} ref={options.ref}>
            <Children/>
        </form>
	},()=>true)
}



