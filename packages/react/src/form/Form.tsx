import { useCallback, useEffect, useRef } from "react";
import { Dict, getVal,  PATH_DELIMITER, pathStartsWith, setVal } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { validate } from "./validate";
import { removeItem } from "./utils";
import React from "react";


export type AutoFromProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>
    & { }
>

export type AutoForm<State extends Dict> = React.FC<AutoFromProps>


type FormCtx = {
    setDirty:()=>void
    setValid:(val:boolean)=>void
    fields: React.MutableRefObject<Map<string, any> | undefined>
}

export function createAutoFormComponent<State extends Dict>(store: ReactAutoStore<State>,options:UseFormOptions<State>,ctx:FormCtx): React.MemoExoticComponent<AutoForm<State>>{
    return React.memo<AutoForm<State>>((props:AutoFromProps)=>{
		const invalids = useRef<string[]>([]);
		useEffect(() => {
			const form = options.ref!.current;
			if (!form) return; 
            const { entry = []} = options
			// 2. 侦听来自变更
			const watcher = store.watch(({ path, value }) => {
				// 2.1 如果变更的路径不是表单的路径，则忽略
				if (!pathStartsWith(entry, path)) return;
				// 2.2 更新到表单的输入控件
				const spath = path.join(PATH_DELIMITER);
				if (ctx.fields.current!.has(spath)) {
					const oldValue = ctx.fields.current!.get(spath).value;
					if (oldValue !== value) {
                        // 更新到表单字段中
						ctx.fields.current!.get(spath).value = value;
					}
				}
			});
			// 输入控件变更时的响应
			const onChange = (e: any) => {
				const input = e.target;
				const name = input.name;
				if (!name) return;
				const path = [...entry, ...name.split(PATH_DELIMITER)];
				const newVal = input.type === "checkbox" ? input.checked : input.value;
				const isValid = validate(path, newVal, input,options.ref!.current!,options);                
				if (isValid) {
					store.update(
						(state) => {
							setVal(state, path, newVal);
						},
						{ peep: true }
					);
                    removeItem(invalids.current,name)
				}else{                    
                    if(!invalids.current.includes(name)) invalids.current.push(name)
                }         
                ctx.setValid(invalids.current.length===0)    
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



