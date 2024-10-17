import { useCallback, useEffect, useRef } from "react";
import { Dict, getVal,  PATH_DELIMITER, pathStartsWith, setVal } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { validate } from "./validate";
import { EMPTY_VALUE } from "./consts";


export type AutoFromProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>,HTMLFormElement>
    & { }
>

export type AutoForm<State extends Dict> = React.FC<AutoFromProps>


export function createAutoFormComponent<State extends Dict>(store: ReactAutoStore<State>,options:UseFormOptions<State>): AutoForm<State>{
    return ((props:AutoFromProps)=>{

		const initial = useRef<boolean>(false);
		const fields = useRef<Map<string, any>>(); 

		useEffect(() => {
			const form = options.ref!.current;
			if (!form) return;
            const { entry = []} = options
			// 1. 进行初始化
			if (!initial.current && form) {
				const snap = store.getSnap({ entry });
				fields.current = new Map();
				const fieldEles = form.querySelectorAll(options.fieldSelector!);
				fieldEles.forEach((field: any) => {
					const name = field.name;
					if (!name) return;
					const path = [...entry, ...name.split(PATH_DELIMITER)];
					const value = getVal(snap, path, EMPTY_VALUE);
					if (value !== EMPTY_VALUE) {
						field.value = value;
					}
					fields.current!.set(path.join(PATH_DELIMITER), field);
					validate(path, value, field,options.ref!.current!,options);
				});
				initial.current = true;
			}
			// 2. 侦听来自变更
			const watcher = store.watch(({ path, value }) => {
				// 2.1 如果变更的路径不是表单的路径，则忽略
				if (!pathStartsWith(entry, path)) return;
				// 2.2 更新到表单的输入控件
				const spath = path.join(PATH_DELIMITER);
				if (fields.current!.has(spath)) {
					const oldValue = fields.current!.get(spath).value;
					if (oldValue !== value) {
						fields.current!.get(spath).value = value;
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
				const valid = validate(path, newVal, input,options.ref!.current!,options);
				if (valid.value) {
					store.update(
						(state) => {
							setVal(state, path, newVal);
						},
						{ peep: true }
					);
				}
			};
			// 3. 侦听来自表单输入的变更
			form.addEventListener("input", onChange);
			return () => {
				watcher.off();
				form.removeEventListener("input", onChange);
			};
		});

		return <form {...props}
            ref={options.ref}
        >
            {props.children}
        </form>
	}) 
}



