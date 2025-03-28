import { useCallback, useEffect, useRef, useState } from "react";
import { AutoStore,  Dict } from "autostore";
import { ReactAutoStore } from "../store";
import { AutoFormStore, UseFormOptions, AutoFormObject } from "./types";
import { AutoForm, AutoFormContext, createAutoFormComponent } from "./Form";
import { createAutoFieldComponent,AutoField } from "./Field";
import { Validator } from "./validator";




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
/**
 * useForm 是一个用于处理表单状态的 React Hook。
 * 它接收一个 ReactAutoStore 实例和一个可选的配置对象作为参数，
 * 并返回一个包含表单状态和操作结果的对象。
 *
 * @param store - 用于管理表单状态的 ReactAutoStore 实例。
 * @param options - 可选的配置对象，用于自定义 useForm 的行为。
 * @returns 一个包含表单状态和操作结果的对象。
 */



export function useForm<State extends Dict>(store:ReactAutoStore<any> | AutoStore<any>,options?:UseFormOptions<State>):AutoFormObject<State>
export function useForm<State extends Dict>(state:State,options?:UseFormOptions<State>): AutoFormObject<State>
export function useForm<State extends Dict>(): AutoFormObject<State>{
	
	const formComponentRef = useRef<AutoForm<State>>()
	const fieldComponentRef = useRef<AutoField<State>>()
	const formRef = useRef<HTMLFormElement | null>(null);				
	const formContext = useRef<AutoFormContext<State> | null>(null)
	const storeRef = useRef<AutoFormStore<State> | null>(null)
	
	const opts:UseFormOptions<State> = arguments[1] || {}
	if(!opts.ref) opts.ref = formRef;
	
	if(!storeRef.current){
		const formStore =  (arguments[0] instanceof ReactAutoStore ? arguments[0] : new ReactAutoStore(arguments[0],arguments[1])) as AutoFormStore<State>
		formStore.resetable = true
		storeRef.current = formStore
	} 	

	const [valid, setValid] = useState<boolean>(true);
	const [dirty, setDirty] = useState<boolean>(false);
	const [submiting, setSubmiting] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);

 
	const store = storeRef.current!  
	
	const reset = useCallback(()=>{
		setDirty(false)		
		store.reset(opts.entry)		
	},[])

	const submit = useCallback(()=>{
		formRef.current?.dispatchEvent(new Event('submit'))
	},[])

	if(!formComponentRef.current){ 
		formContext.current = {
			options:opts, 
			setDirty: (val:boolean=true) => setDirty(val),
			setValid,
			setSubmiting,
			setError,
			state:store.state,
			formRef 
		}
		formComponentRef.current = createAutoFormComponent<State>(store,formContext)
		fieldComponentRef.current = createAutoFieldComponent<State>(store, formContext)
		formContext.current.validator = new Validator<State>(store,formContext.current!)		
	}

	useEffect(()=>{			
		return ()=>{
			formComponentRef.current  = undefined;
			fieldComponentRef.current = undefined;
			formContext.current       = null
			storeRef.current?.destroy()
			storeRef.current	      = null			
		}
	},[])


	return {
		...store,
		state:store.state,
		Form: formComponentRef.current,
		Field: fieldComponentRef.current!,
		valid,
		dirty,
		error,
		submiting,
		submit,
		reset,
		validator:formContext.current!.validator
	} as unknown as AutoFormObject<State>
}   