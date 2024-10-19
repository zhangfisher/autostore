import { Dict, getVal, isFunction, PATH_DELIMITER } from "autostore";
import { UseFormOptions } from "./types";
import { addElementStyleOrClass, createDefaultErrorElement, getInputElements, isInputElement, removeElementStyleOrClass } from "./utils";
import type { ReactAutoStore } from "../store";
import type { AutoFormFieldInfos } from "./Form";


export class Validator<State extends Dict>{
    private _onInvalid
    private _onFormValid:(valid:boolean)=>void      // 更新表单的有效状态
    private _invalids:string[] = []                   // 保存无效字段名称列表 
    constructor(onFormValid:(valid:boolean)=>void,public store: ReactAutoStore<State>,public form:HTMLFormElement,public fields: AutoFormFieldInfos,public options:UseFormOptions<any>){
        this._onInvalid = this.onInvalid.bind(this)
        this._onFormValid = onFormValid
        this.attach()
    }
    getEntry(){
        return getVal(this.store.state,this.options.entry || [])
    }
    attach(){
        this.form.addEventListener('invalid',this._onInvalid,true)
    }
    detach(){
        this.form.removeEventListener('invalid',this._onInvalid,true)
        this._invalids = []
    }
    
    onInvalid(e:any){
        alert("invalid")
    }

    private updateInvalids(path:string,value:boolean){
        if(value){
            removeArrayItem(invalids.current,path)
        }else{
            if(!invalids.current.includes(path)) invalids.current.push(path)
        }
        ctx.setValid(invalids.current.length===0)
    }
    /**
     * 对所有字段执行校验
     */
    validateAll(){
        let isValid = this.form.checkValidity()
        if(!isValid) this.reportAll()    
        const { entry = [] } = this.options
        for(let field of this.fields){
            
            this.validate
        }
        
    }

    /**
     * 对单个字段执行校验，返回校验结果{value:boolean,error:string | null}
     * 
     */
    validate(path:string,value:any,fieldEle: HTMLElement){
        const validateFn = this.options.validate
        const hasCustomValidate =  validateFn && isFunction(validateFn)

        const validResult:ValidateResult =  {
            value:true,
            error:null
        }
    
        // 1. 执行表单控件的标准校验，即input控件上的max,min,pattern等
        const inputEle = getInputElements(fieldEle)
        if(inputEle && inputEle.checkValidity && !inputEle.checkValidity()){
            validResult.value = false
            validResult.error = inputEle.validationMessage
            return  
        }

        // 2. 是否启用了自定义校验功能
        if (hasCustomValidate) {        
            // 执行校验函数
            const isvalid = validateFn!(path, value, fieldEle);        
            if (typeof isvalid === "boolean") {
                validResult.value = isvalid
                validResult.error = fieldEle.dataset.errorTips || 'ERROR'
            } else if (typeof isvalid === "string") {
                validResult.value=false
                validResult.error = isvalid                
            }
            const inputEle = getInputElements(fieldEle)
            if(inputEle && inputEle.setCustomValidity ){
                inputEle.setCustomValidity(validResult.error || '')                
            }
        }
        if(inputEle){
            if(validResult.value){
                inputEle.setCustomValidity('')
            }else{
                inputEle.reportValidity()
            }
        }        
        return validResult;
    }


    /**
     * 获取一个元素用来显示校验错误信息
     */
    getErrorElement(path:string,fieldEle:any): HTMLElement | undefined  {        
        if(!fieldEle) return 
        const isInputEle = isInputElement(fieldEle)    
        const isCustomErr = this.options.invalidElement && typeof this.options.invalidElement === "string"
        let errElement: any = isCustomErr 
            ? this.form.querySelector(this.options.invalidElement!.replace(/\{\s*name\s*\}/, path))
                : (
                    isInputEle ? fieldEle.nextSibling : fieldEle.querySelector(".error")
                );
        // 如果没有提供错误信息的元素，则创建一个
        if(!errElement || errElement.nodeType !== 1){ 
            errElement = createDefaultErrorElement(fieldEle)
        }
        return errElement
    };
    /**
     * 显示错误元素
     * 
     * 当校验错误时调用，用来在输入控件周围显示一个元素，用来显示错误信息
     * 
     */
    showError(path:string,error:any,fieldEle:any){
        const errEle = this.getErrorElement(path,fieldEle)
        const errorTips = error || fieldEle.dataset.errorTips || 'ERROR'
        if(errEle && errorTips){
            errEle.innerHTML = errorTips
            errEle.style.display = "block"
        }
        addElementStyleOrClass(fieldEle,this.options.invalidStyles,'style')
        addElementStyleOrClass(fieldEle,this.options.invalidClasss,'class')     
    } 
    hideError(path:string,fieldEle:any){
        removeElementStyleOrClass(fieldEle,this.options.invalidStyles,'style')
        removeElementStyleOrClass(fieldEle,this.options.invalidClasss,'class') 
        const errEle = this.getErrorElement(path,fieldEle)
        if(errEle) errEle.style.display = "none"  
    } 
    /**
     *  报告错误
     */
    report(fieldEle:any){
        const inputEle = getInputElements(fieldEle)
        if(inputEle){
            inputEle.reportValidity()
        }
    }
    reportAll(){
        this.form.reportValidity()
    }


}


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
        const isCustomErr = options.invalidElement && typeof options.invalidElement === "string"
        let errElement: any = isCustomErr 
            ? form.querySelector(options.invalidElement!.replace(/\{\s*name\s*\}/, spath))
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
        removeElementStyleOrClass(input,options.invalidStyles,'style')
        removeElementStyleOrClass(input,options.invalidClasss,'class')   
        if(errEle) errEle.style.display = "none"
    }else{          // 校验出错            
        const errorTips = valid.error || input.dataset.errorTips || 'ERROR'
        if(errEle && errorTips){
            errEle.innerHTML = errorTips
            errEle.style.display = "block"
        }
        addElementStyleOrClass(input,options.invalidStyles,'style')
        addElementStyleOrClass(input,options.invalidClasss,'class')        
    }

}





