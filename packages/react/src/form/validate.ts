import { Dict, isFunction } from "autostore";
import { addElementStyleOrClass, createDefaultReportElement, getInputElements, isInputElement, removeArrayItem, removeStyleOrClass } from "./utils";
import type { ReactAutoStore } from "../store";
import type { AutoFormContext } from "./Form";
import { FIELD_DATA_PART, FIELD_INVALID_CLASS } from './consts';

export type ValidateResult = {
    path : string
    value: boolean
    error: string | null | undefined
}
  

export class Validator<State extends Dict>{
    private _onInvalid
    private _invalids:string[] = []                   // 保存无效字段名称列表 
    constructor(public store: ReactAutoStore<State>,public formCtx:AutoFormContext<State>){
        this._onInvalid = this.onInvalid.bind(this)
        this.attach()
    } 
    get form(){return this.formCtx.formRef.current!}
    get options(){return this.formCtx.options}
    get fields(){ return this.formCtx.fields!}
    attach(){
        this.form.addEventListener('invalid',this._onInvalid,true)
    }
    detach(){
        this.form.removeEventListener('invalid',this._onInvalid,true)
        this._invalids = []
    }
    /**
     * 当元素校验无效时调用
     */
    onInvalid(e:any){
        const input = e.target
        console.log("form invalid:",input.getAttribute('name'))
    }
    setValid(value:boolean){    
        this.formCtx.setValid(value)
    }

    private updateInvalids(path:string,value:boolean){
        if(value){
            removeArrayItem(this._invalids,path)
        }else{
            if(!this._invalids.includes(path)) this._invalids.push(path)
        }
        this.setValid(this._invalids.length===0)
    }
    /**
     * 对所有字段执行校验
     */
    validateAll(){
        for(let fieldCtx of Object.values(this.fields)){            
            this.validate(fieldCtx.el)
        }        
    }

    /**
     * 标准input的没有修改前调用checkValidity会返回true
     * <input minlength="2" value="1/>
     * 
     * 此时调用checkValidity会返回true，只有当用户修改后再调用才会在无效时返回false
     * 也就是说checkValidity在初始化调用时是无效的
     * 
     * 
     * 
     */
    private checkValidity(inputEle:HTMLInputElement){
        const isValid = inputEle && inputEle.checkValidity && !inputEle.checkValidity()
        
    }

    /**
     * 对单个字段执行校验，返回校验结果{value:boolean,error:string | null}
     * 
     * 本方法在
     * 
     */
    validate(fieldEle: HTMLElement){
        const validateFn = this.options.validate
        const hasCustomValidate =  validateFn && isFunction(validateFn)
        const path= fieldEle.getAttribute('name') 
        if(!path) return 
        const validResult:ValidateResult =  {
            path,
            value:true,
            error:null
        }    
        // 1. 首先执行表单控件的标准校验，即input控件上的max,min,pattern等
        const inputEles = getInputElements(fieldEle)
        for(let inputEle of inputEles){
            if(inputEle && inputEle.checkValidity && !inputEle.checkValidity()){
                validResult.value = false
                validResult.error = inputEle.validationMessage                 
            }else{
                validResult.value=true
                validResult.error=null
            }
            this.report(fieldEle,validResult)
        }
        // 2. 是否启用了自定义校验功能，即调用options.validate方法来进行校验
        if (hasCustomValidate) {        
            const inputEles = getInputElements(fieldEle)
            for(let inputEle of inputEles){
                const value = inputEle.value
                const part = inputEle.getAttribute(FIELD_DATA_PART)
                // 执行校验函数
                const isValid = validateFn!(path!,value,part,fieldEle);        
                if (typeof isValid === "boolean") {
                    validResult.value = isValid
                    validResult.error = fieldEle.dataset.errorTips || 'ERROR'
                } else if (typeof isValid === "string") {
                    validResult.value=false
                    validResult.error = isValid                
                }
                if(inputEle && inputEle.setCustomValidity ){
                    inputEle.setCustomValidity(validResult.error || '')                
                }
                this.report(fieldEle,validResult)
            }  
        }        
        return validResult;
    }


    /**
     * 获取一个元素用来显示校验错误信息
     */
    getReportElement(path:string,fieldEle:any): HTMLElement | undefined  {        
        if(!fieldEle) return 
        const isInputEle = isInputElement(fieldEle)    
        const reportElement = this.options.reportElement
        const isCustomErr = reportElement && typeof reportElement === "string"
        let errElement: any = isCustomErr 
            ? this.form.querySelector(reportElement!.replace(/\{\s*name\s*\}/, path))
                : (
                    isInputEle ? fieldEle.nextSibling : fieldEle.querySelector(FIELD_INVALID_CLASS)
                );
        // 如果没有提供错误信息的元素，则创建一个
        if(!errElement || errElement.nodeType !== 1){ 
            errElement = createDefaultReportElement(fieldEle)
        }
        return errElement
    };
    toggleReport(fieldEle:HTMLElement,validResult:ValidateResult){
        if(validResult.value){
            this.hideReport(fieldEle,validResult)
        }else{
            this.showReport(fieldEle,validResult)
        }
    }
    /**
     * 显示错误元素
     * 
     * 当校验错误时调用，用来在输入控件周围显示一个元素，用来显示错误信息
     * 
     */
    private showReport(fieldEle:HTMLElement,validResult:ValidateResult){
        const errEle = this.getReportElement(validResult.path,fieldEle)
        const validateMessage = validResult.error || fieldEle.dataset.validateMessage || 'ERROR'
        if(errEle && validateMessage){
            errEle.innerHTML = validateMessage
            errEle.style.display = "block"
        }
        addElementStyleOrClass(fieldEle,this.options.invalidStyles,'style')
        addElementStyleOrClass(fieldEle,this.options.invalidClasss,'class')     
    } 

    private hideReport(fieldEle:HTMLElement,validResult:ValidateResult){
        removeStyleOrClass(fieldEle,this.options.invalidStyles,'style')
        removeStyleOrClass(fieldEle,this.options.invalidClasss,'class') 
        const errEle = this.getReportElement(validResult.path,fieldEle)
        if(errEle && errEle.classList.contains(FIELD_INVALID_CLASS)) errEle.style.display = "none"  
    } 
    /**
     *  报告错误
     */
    report(fieldEle:HTMLElement,validResult:ValidateResult){
        // 自定义报告
        const reportStyle = this.options.reportStyle || 'custom'
        if(reportStyle==='custom'){ // 将错误信息写入到指定的错误元素中            
            const report = this.options.reportElement
            if(typeof(report)==='function'){
                report(validResult,fieldEle)
            }else{    // 使用选择器来获取错误输出元素
                this.toggleReport(fieldEle,validResult)
            }     
        }else{ // 浏览器标准html5校验方式
            const inputEles = getInputElements(fieldEle)
            inputEles.forEach(inputEle=>{
                inputEle.reportValidity()                
            })
        }

        
    }
    reportAll(){
        this.form.reportValidity()
    }

}

