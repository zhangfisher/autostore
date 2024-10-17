import { isFunction, PATH_DELIMITER } from "autostore";
import { UseFormOptions } from "./types";
import { addElementStyleOrClass, createDefaultErrorElement, isInputElement, removeElementStyleOrClass } from "./utils";


export type ValidateResult = {
    value: boolean
    error: string | null
}

// 对输入值进行校验
export function validate(path: string[], value: any, input: HTMLElement, form: HTMLElement,options:UseFormOptions<any>)  {

    const hasValidate =  options.validate && isFunction(options.validate)
    let validResult:ValidateResult =  {
        value:true,
        error:null
    }

    // 是否启用了校验功能
    if (hasValidate) {        
        const spath = path.join(PATH_DELIMITER);        
        // 执行校验函数
        const isvalid = options.validate!(spath, value, input);        
        if (typeof isvalid === "boolean") {
            validResult.value = isvalid
            validResult.error = input.dataset.errorTips || null
        } else if (typeof isvalid === "string") {
            validResult.value=false
            validResult.error = isvalid
        }
    }
    return validResult;
}
/**
 * 
 * 在DOM中显示切换校验结果
 * 
 * @param path 
 * @param value 
 * @param input 
 * @param form 
 * @param options 
 */
export function toggleValidateResult(spath: string,valid:ValidateResult,input: HTMLElement, form: HTMLElement,options:UseFormOptions<any>)  {
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
    if(valid.value){      // 校验成功
        removeElementStyleOrClass(input,options.errStyles,'style')
        removeElementStyleOrClass(input,options.errClasss,'class')   
        if(errEle) errEle.style.display = "none"
    }else{          // 校验出错            
        const errorTips = valid.error || input.dataset.errorTips || 'ERROR'
        if(errEle && errorTips){
            errEle.innerHTML = errorTips
            errEle.style.display = "block"
        }
        addElementStyleOrClass(input,options.errStyles,'style')
        addElementStyleOrClass(input,options.errClasss,'class')        
    }

}





