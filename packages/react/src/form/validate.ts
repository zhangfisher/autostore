import { Dict, isFunction } from "autostore";
import { getInputElements, removeArrayItem, removeClass } from "./utils";
import type { ReactAutoStore } from "../store";
import type { AutoFormContext } from "./Form";
import { FIELD_DATA_PART, FIELD_INVALID_CLASS } from './consts';
import { ValidateResult } from "./types";
import { addClass } from './utils/addClass';



export class Validator<State extends Dict>{
    private _onInvalid
    private _invalids:string[] = []                   // 保存无效字段名称列表 
    constructor(public store: ReactAutoStore<State>,public formCtx:AutoFormContext<State>){
        this._onInvalid = this.onInvalid.bind(this)
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
        //this.updateInvalids(input.name,false)
    }   


    setValid(value:boolean){    
        this.formCtx.setValid(value)
    }

    updateInvalids(path:string,value:boolean){
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
        const path= this.getFieldName(fieldEle)
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
                validResult.value = true
                validResult.error = null
            }
            this.updateInvalids(path,validResult.value)
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
                this.updateInvalids(path,validResult.value)
                if(inputEle && inputEle.setCustomValidity && this.options.customReport){
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
     * 获取指定字段的相关元素
     * - 字段根元素
     * - 内部所有input元素
     */
    private getFieldRelElements(fieldEle:HTMLElement){
        const name = this.getFieldName(fieldEle)
        if(!name) return []
        const els:any[]=[]
        this.fields[name] && this.fields[name].forEach(field=>{
            els.push(field.el)
            els.push(...field.inputs)
        })
        return els
    }


    /**
     * 获取一个元素用来显示校验错误信息
     */
    getReportElements(fieldEle:HTMLElement,_:ValidateResult): HTMLElement[]  {        
        if(!fieldEle) return []
        const fieldName = this.getFieldName(fieldEle)        
        const reportEles = this.form.querySelectorAll(`[data-validate-field='${fieldName}']`)
        if(reportEles){
            reportEles.forEach(reportEle=>{
                addClass(reportEle,FIELD_INVALID_CLASS)
            })
        }
        return reportEles as unknown  as HTMLElement[]
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
        // 1. 将错误信息显示在指定元素上
        const reportEles = this.getReportElements(fieldEle,validResult)
        const validateMessage = validResult.error || fieldEle.dataset.invalidTips || 'ERROR'
        if(reportEles && validateMessage){
            reportEles.forEach(reportEle=>{
                reportEle.innerHTML = validateMessage
                reportEle.style.display = "block"
                addClass(reportEle,FIELD_INVALID_CLASS)
            })
        }
        // 2. 为字段元素添加错误类和样式
        const relEles = this.getFieldRelElements(fieldEle)
        relEles.forEach(el=>{
            addClass(el,FIELD_INVALID_CLASS)
        })
    } 

    private hideReport(fieldEle:HTMLElement,validResult:ValidateResult){
        // 1. 隐藏错误信息
        const reportEles = this.getReportElements(fieldEle,validResult)
        if(reportEles){
            reportEles.forEach(reportEle=>{
                if(reportEle.classList.contains(FIELD_INVALID_CLASS)) reportEle.style.display = "none"  
                removeClass(reportEle,FIELD_INVALID_CLASS)
            })
        } 
        // 2. 移除错误类和样式
        const relEles = this.getFieldRelElements(fieldEle)
        relEles.forEach(el=>{
            removeClass(el,FIELD_INVALID_CLASS)
        })
    } 
    /**
     * 
     *  报告校验错误
     * 
     */
    report(fieldEle:HTMLElement,validResult:ValidateResult){
        const isCustomReport = this.options.customReport !== false  // 自定义报告
        if(isCustomReport){
            this.toggleReport(fieldEle,validResult)            
        } else{            
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

