import { Dict, isFunction } from "autostore";
import { addElementStyleOrClass, getInputElements, removeArrayItem, removeStyleOrClass } from "./utils";
import type { ReactAutoStore } from "../store";
import type { AutoFormContext } from "./Form";
import { DEFAULT_INVALUE_STYLE, FIELD_DATA_PART, FIELD_INVALID_CLASS } from './consts';
import { ValidateResult } from "./types";
import { addClass } from './utils/addClass';



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
    //    / this.updateInvalids(input.name,false)
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
        for(let fields of Object.values(this.fields)){  
            fields.forEach(field=>{
                this.validate(field.el)
            })          
        }        
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
            //this.updateInvalids(path,validResult.value)
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
                //this.updateInvalids(path,validResult.value)
                if(inputEle && inputEle.setCustomValidity && this.options.reportStyle==='default'){
                    inputEle.setCustomValidity(validResult.error || '')                
                }
                this.report(fieldEle,validResult)
            }  

        }        
        return validResult;
    }

    private getFieldName(fieldEle:HTMLElement){
        return fieldEle.getAttribute('name') 
            || fieldEle.getAttribute('data-field-name')
    }

    /**
     * 获取一个元素用来显示校验错误信息
     */
    getReportElement(fieldEle:HTMLElement,_:ValidateResult): HTMLElement | undefined | null  {        
        if(!fieldEle) return 
        const fieldName = this.getFieldName(fieldEle)        
        const reportEle = this.form.querySelector(`[data-validate-field='${fieldName}']`)
        if(reportEle){
            addClass(reportEle,FIELD_INVALID_CLASS)
        }
        return reportEle as HTMLElement | undefined | null
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
        const reportEle = this.getReportElement(fieldEle,validResult)
        const validateMessage = validResult.error || fieldEle.dataset.validateMessage || 'ERROR'
        if(reportEle && validateMessage){
            reportEle.innerHTML = validateMessage
            reportEle.style.display = "block"
        }
        addElementStyleOrClass(fieldEle,this.options.invalidStyles || DEFAULT_INVALUE_STYLE,'style')
        addElementStyleOrClass(fieldEle,this.options.invalidClasss || FIELD_INVALID_CLASS,'class')         
    } 

    private hideReport(fieldEle:HTMLElement,validResult:ValidateResult){
        removeStyleOrClass(fieldEle,this.options.invalidStyles || DEFAULT_INVALUE_STYLE,'style')
        removeStyleOrClass(fieldEle,this.options.invalidClasss || FIELD_INVALID_CLASS,'class') 
        const reportEle = this.getReportElement(fieldEle,validResult)
        if(reportEle && reportEle.classList.contains(FIELD_INVALID_CLASS)) reportEle.style.display = "none"  
    } 
    /**
     * 
     *  报告校验错误
     * 
     */
    report(fieldEle:HTMLElement,validResult:ValidateResult){
        // 自定义报告
        const reportStyle = this.options.reportStyle || 'custom'
        if(reportStyle==='default'){            
            const inputEles = getInputElements(fieldEle)
            inputEles.forEach(inputEle=>{
                inputEle.reportValidity()                
            })
        }else{
            this.toggleReport(fieldEle,validResult)            
        } 
    }
    reportAll(){
        this.form.reportValidity()
        
    }

}

