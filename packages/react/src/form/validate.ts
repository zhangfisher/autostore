import { isFunction, PATH_DELIMITER } from "autostore";
import { UseFormOptions } from "./types";
import { addElementStyleOrClass, createDefaultErrorElement, isInputElement, removeElementStyleOrClass } from "./utils";

// 对输入值进行校验
export function validate(path: string[], value: any, input: HTMLElement, form: HTMLElement,options:UseFormOptions<any>)  {

    // 是否开启校验: 提供validate函数时才启用校验
    
    let errTips: string | undefined = input.dataset.errorTips;
    const hasValidate = errTips || (options.validate && isFunction(options.validate))

    let isValid =  true

    // 是否启用了校验功能
    if (hasValidate) {        
        const spath = path.join(PATH_DELIMITER);
        // 执行校验函数
        const result = options.validate!(spath, value, input);        
        if (typeof result === "boolean") {
            isValid = result;

        } else if (typeof result === "string") {
            isValid = false
            errTips = result;
        }
        // 获取错误信息的元素,如果没有则创建默认<span class='error-tips"></span>
        const getErrorElement = (): HTMLElement | undefined => {        
            const isInputEle = isInputElement(input)    
            const isCustomErr = options.errElement && typeof options.errElement === "string"
            let errElement: any = isCustomErr 
                ? form.querySelector(options.errElement!.replace(/\{\s*name\s*\}/, spath))
                    : (
                        isInputEle ? input.nextSibling : input.querySelector(".error")
                    );
            // 如果没有提供错误信息的元素，则创建一个
            if(!errElement || errElement.nodeType !== 1){ 
                errElement = createDefaultErrorElement(input)
            }
            return errElement
        };

        const errEle = getErrorElement()
        if(isValid){      // 校验成功
            removeElementStyleOrClass(input,options.errStyles,'style')
            removeElementStyleOrClass(input,options.errClasss,'class')   
            if(errEle) errEle.style.display = "none"
        }else{          // 校验出错            
            if(errEle && errTips){
                errEle.innerHTML = errTips
                errEle.style.display = "block"
            }
            addElementStyleOrClass(input,options.errStyles,'style')
            addElementStyleOrClass(input,options.errClasss,'class')        
        }
        
    }
    return isValid;
}
