/**
 * 
 * 提交表单
 * 
 * useEffect(()=>{
 * 		const off = createSubmit()
 * 		return ()=>{
 * 			off()
 * 		}
 * },[])
 * 
 * 
 */

import { Dict, PATH_DELIMITER } from "autostore"
import { ReactAutoStore } from "../store"
import { AutoFormContext, AutoFormProps } from "./Form"
import { UseFormOptions } from "./types"



export type SubmitFormOptions = {

    
}


export function createSubmit<State extends Dict>(store: ReactAutoStore<State>,
	props:AutoFormProps<State>,
	formCtx:React.MutableRefObject<AutoFormContext<State> | null>,
	options: UseFormOptions<State>
){
	const ctx = formCtx.current! as Required<AutoFormContext<State>>
	const form = options.ref!.current!;            

	async function onSubmit(e:any){
		try{
			ctx.setSubmiting(true)
			const { entry } = ctx.options
			const formSnap = store.getSnap({
				entry:entry 
			})
			Promise.resolve(props.onSubmit?.(formSnap as any,e)).then(r=>{
				if(r===false) e.preventDefault()
			}).catch((err)=>{ 
				ctx.setError(err)
			}).finally(()=>{
				ctx.setSubmiting(false)
			})
		}catch(err){
			ctx.setError(err)
			ctx.setSubmiting(false)
		}
	}
	if(props.onSubmit){
		form.addEventListener('submit',onSubmit)	
	}	
    return {		
		off:()=>{						
			form.removeEventListener('submit',onSubmit)	
		}
	}
}