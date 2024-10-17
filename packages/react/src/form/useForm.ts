import { useEffect, useRef, useState } from "react";
import { Dict, getVal, PATH_DELIMITER,  } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormType } from "./types";
import { validate } from "./validate";
import { createAutoFormComponent } from "./Form";
import { EMPTY_VALUE } from "./consts";




/**
 *
 *   实现表单与store的双向绑定
 *
 *  const { state,useForm } = createStore({...})
 *  const { From,Feild,validation,dirty } = useForm({
 * 		entry,
 *      errElement: undefined | "[name={name}] ~ span" | (path,value,input)=>"[name={name}] ~ span",,
 *      errClass:"invalid",   校验错误时的类名，正确时移除
 *      errStyle:[selector,"color:red;border:1px solid red;"],
 *      用来获取表单内的所有输入控件
 *      fieldSelector:"input,textarea,select",
 *      指定类名
 *      className:string | (state)=>state.dirty ? "dirty" : "clean",
 *      style:string | (state)=>state.validate ? "validate" : "invalid",
 *      validate:(path,value,input)=>{
 *          return true/false
 *          return "错误字符串"  // 将显示在selector指向的位置
 *      },
 *      转换输入值与状态中的值
 *      fromState:(path,value,input)=>{
 *
 *      },
 *      toState:(path,value,input)=>{
 *
 *      }
 *  })
 *   <From>
 *      <input name="a" />
 *      <input name="b"
 *          data-from-state="^\d+"
 *          data-to-state="^\d+"
 *          pattern="正则表达式"
 *          data-error-tips="错误信息"
 *      />
 *      <input name="c"/>
 *      <mycomponent
 *          onChange={myform.xxx}
 *          value={myform.xxx}
 *      />
 *   </From>
 * 
 *
 *
 * @returns
 */
export function createUseForm<State extends Dict>(store: ReactAutoStore<State>):UseFormType<State> {
	return function () {
		const formCompRef = useRef<any>()
		const formRef = useRef<HTMLFormElement>(null);
		const options = arguments[0] || {}
		if(!options.ref) options.ref = formRef;
		const [valid, setValid] = useState<boolean>(true);
		const [dirty, setDirty] = useState<boolean>(false);
		const initial = useRef<boolean>(false);
		const fields = useRef<Map<string, any> | undefined>(); 
		useEffect(() => {
			const form = formRef.current;
			if (!form) return;
			const { entry = [] } = options;
			if (!initial.current && form) {
				const snap = store.getSnap({ entry });
				fields.current = new Map();
				const fieldEles = form.querySelectorAll(options.fieldSelector || 'input,textarea,select');
				let initValid:boolean	= true
				fieldEles.forEach((field: any) => {
					const name = field.name;
					if (!name) return;
					const path = [...entry, ...name.split(PATH_DELIMITER)];
					const value = getVal(snap, path, EMPTY_VALUE);
					if (value !== EMPTY_VALUE) {
						field.value = value;
					}
					fields.current!.set(path.join(PATH_DELIMITER), field);
					if(validate(path, value, field, formRef.current!, options)===false){
						initValid = false
					}
				});
				initial.current = true;
				setDirty(false);
				setValid(initValid);
			}
		}, []);
			
		const formCtx =  {
			fields,
			setDirty: () =>{if (dirty === false) setDirty(true)},
			setValid
		}

		if(!formCompRef.current){
			formCompRef.current = createAutoFormComponent<State>(store, options,formCtx)
		}

		return {
			Form:formCompRef.current, 
			valid,
			dirty
		};
	} as unknown as UseFormType<State>
}


 
