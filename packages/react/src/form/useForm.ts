import { useCallback, useEffect, useRef } from "react";
import { Dict, getVal, isFunction, PATH_DELIMITER, pathStartsWith, setVal } from "autostore";
import type { ReactAutoStore } from "../store";
import { UseFormOptions } from "./types";
import { addClass, getInputElement, insertInputStyle, isInputElement, removeInputStyle } from "./utils";

const EMPTY_VALUE = Symbol("empty");



// 对输入值进行校验
function validate(path: string[], value: any, input: HTMLElement, form: HTMLElement,options:UseFormOptions<any>)  {

    // 是否开启校验: 提供validate函数时才启用校验
    const hasValidate = options.validate && isFunction(options.validate);

    const validResult = {
        value: true,                        
        style: "color:red;border:1px solid red;",
    };

    // 是否启用了校验功能
    if (hasValidate) {
        let errTips: string | undefined = input.dataset.errorTips;
        const spath = path.join(PATH_DELIMITER);
        // 执行校验函数
        const result = options.validate!(spath, value, input);        
        if (typeof result === "boolean") {
            validResult.value = result;
        } else if (typeof result === "string") {
            validResult.value = false
            errTips = result;
        }


        // 获取错误信息的元素,如果没有则创建默认<span class='error-tips"></span>
        const getErrorElement = (): HTMLElement | undefined => {        
            const isInputEle = isInputElement(input)    
            let errElement: any = options.errElement && typeof options.errElement === "string"
                ? form.querySelector(options.errElement.replace(/\{\s*name\s*\}/, spath))
                : (
                    isInputEle ? input.nextSibling : input.querySelector(".error-tips")
                );
            // 如果没有提供错误信息的元素，则创建一个
            if(!errElement || errElement.nodeType !== 1){
                // 创建一个span元素作为默认的错误信息容器
                errElement = document.createElement("span");
                errElement.style.color = "red";
                errElement.classList.add("error-tips");
                if(isInputEle){
                    if (input.nextSibling) {
                        input.parentNode?.insertBefore(errElement, input.nextSibling);
                    } else {
                        input.parentNode?.appendChild(errElement);
                    }
                }else{
                    input.appendChild(errElement);
                }                
            }
            return errElement
        };


        if(validResult.value){      // 校验成功



        }else{          // 校验出错
            // 在input元素上添加样式
            if(options.errStyle){
                const [selector,style] = Array.isArray(options.errStyle) ? options.errStyle : [null,options.errStyle]
                const ele = selector ? input.querySelector(selector) : input
                insertInputStyle(ele,style)
            }
            // 添加类
            if(options.errClasss){
                const errClasss = options.errClasss
                if(typeof(errClasss)==='object'){
                    Object.entries(errClasss).forEach(([selector,cls])=>{
                        const el = selector ? input.querySelector(selector) : input
                        addClass(el,cls)
                    })
                }else if(typeof(errClasss)==='string'){
                    addClass(input,errClasss)   
                }
                input.classList.remove
            }

        }
        
    }
    return validResult;
}

/**
 *
 *   实现表单与store的双向绑定
 *
 *   const { state,useForm } = createStore({...})
 *  const myform = useForm({
 *      errElement: undefined | "[name={name}] ~ span" | (path,value,input)=>"[name={name}] ~ span",,
 *      errClass:"invalid",   校验错误时的类名，正确时移除
 *      errStyle:[selector,"color:red;border:1px solid red;"],
 *      用来获取表单内的所有输入控件
 *      findInputs:"input,textarea,select",
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
 *   <form {...myform}>
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
 *   </form>
 *
 *   bindings.reset()  // 重置表单
 *
 *
 * @returns
 */
export function createUseForm<State extends Dict>(store: ReactAutoStore<State>) {
	return function () {
		const args = arguments;
		const entry =
			args.length > 0
				? typeof args[0] === "string"
					? args[0].split(PATH_DELIMITER)
					: Array.isArray(args[0])
					? args[0]
					: []
				: [];
		const options: UseFormOptions<State> = Object.assign(
			{
				debounce: 0,
			},
			args.length === 1
				? typeof args[0] === "object"
					? args[0]
					: null
				: args.length >= 2
				? typeof args[1] === "object"
					? args[1]
					: null
				: null
		);

		const initial = useRef<boolean>(false);
		const inputs = useRef<Map<string, any>>();
		const formRef = useRef<HTMLFormElement>(null);

		// 对输入值进行校验
		const onValidate = useCallback((path: string[], value: any, input: HTMLElement) => {
			// 是否开启校验: 提供validate函数时才启用校验
			const hasValidate = options.validate && isFunction(options.validate);

			const valid = {
				value: true,                        
				style: "color:red;border:1px solid red;",
			};

			// 是否启用了校验功能
			if (hasValidate) {
				let errTips: string | undefined = input.dataset.errorTips;
				const spath = path.join(PATH_DELIMITER);
				const result = options.validate!(spath, value, input);
				if (typeof result === "boolean") {
					valid.value = result;
				} else if (typeof result === "string") {
                    valid.value = false
					errTips = result;
				}

				const inputStyle = isFunction(valid.style)
					? valid.style(spath, value, input)
					: valid.style;
				if (typeof inputStyle === "string") {
					if (valid.value) {
						removeInputStyle(input, inputStyle);
					} else {
						insertInputStyle(input, inputStyle);
					}
				}
				// 校验失败时的错误信息
				let validateMessage = input.dataset.validateMessage;

				// 获取错误信息的元素,如果没有则创建一个
				const getErrorElement = (): HTMLElement | undefined => {

					let msgContainer  

					if (typeof valid.message === "string") {
						msgContainer = input.nextSibling;
					}

					if (msgContainer && msgContainer.nodeType === 1) {
						return msgContainer as HTMLElement;
					} else {
						// 创建一个span元素作为默认的错误信息容器
						const span = document.createElement("span");
						span.style.color = "red";
						span.classList.add("invalid");
						if (input.nextSibling) {
							input.parentNode?.insertBefore(span, input.nextSibling);
						} else {
							input.parentNode?.appendChild(span);
						}
						return span;
					}
				};


				const msgContainer = getErrorElement();
				// 当校验失败时呈现错误信息现
				if (valid.value) {
					if (msgContainer) msgContainer.style.display = "none";
				} else {
					if (validateMessage && msgContainer) {
						msgContainer.style.display = "block";
						msgContainer.innerHTML = validateMessage;
					}
				}
			}
			return valid;
		}, []);

		useEffect(() => {
			const form = formRef.current;
			if (!form) return;
			// 1. 进行初始化
			if (!initial.current && form) {
				const snap = store.getSnap({ entry });
				inputs.current = new Map();
				const inputEles = form.querySelectorAll("input,textarea,select");
				inputEles.forEach((input: any) => {
					const name = input.name;
					if (!name) return;
					const path = [...entry, ...name.split(PATH_DELIMITER)];
					const value = getVal(snap, path, EMPTY_VALUE);
					if (value !== EMPTY_VALUE) {
						input.value = value;
					}
					inputs.current!.set(path.join(PATH_DELIMITER), input);
					onValidate(path, value, input);
				});
				initial.current = true;
			}
			// 2. 侦听来自变更
			const watcher = store.watch(({ path, value }) => {
				// 2.1 如果变更的路径不是表单的路径，则忽略
				if (!pathStartsWith(entry, path)) return;
				// 2.2 更新到表单的输入控件
				const spath = path.join(PATH_DELIMITER);
				if (inputs.current!.has(spath)) {
					const oldValue = inputs.current!.get(spath).value;
					if (oldValue !== value) {
						inputs.current!.get(spath).value = value;
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
				const valid = onValidate(path, newVal, input);
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
		}, [entry]);

		return {
			ref: formRef,
		};
	};
}



