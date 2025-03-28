import { Dict, isFunction } from "autostore"
import { getInputElements, removeArrayItem, removeClass } from "./utils"
import type { VueAutoStore } from "../store"
import type { AutoFormContext } from "./Form"
import { FIELD_DATA_PART, FIELD_INVALID_CLASS } from './consts'
import { ValidateResult } from "./types"
import { addClass } from './utils/addClass'
import { ref, Ref } from 'vue'

export class Validator<State extends Dict> {
    private _onInvalid: (e: Event) => void
    private _invalids: string[] = []                   // 保存无效字段名称列表 
    private _value: Ref<boolean> = ref(true)

    constructor(
        public store: VueAutoStore<State>,
        public formCtx: AutoFormContext<State>
    ) {
        this._onInvalid = this.onInvalid.bind(this)
    }

    get form() { return this.formCtx.formRef.value! }
    get options() { return this.formCtx.options }
    get value() { return this._value.value }
    set value(value: boolean) { this._value.value = value }
    get fields() { return this.formCtx.fields! }

    attach() {
        this.form.addEventListener('invalid', this._onInvalid, true)
    }

    detach() {
        this.form.removeEventListener('invalid', this._onInvalid, true)
        this._invalids = []
    }

    /**
     * 当元素校验无效时调用
     */
    private onInvalid(e: Event) {
        // const input = e.target as HTMLInputElement
        // this.updateInvalids(input.name, false)
    }

    setValid(value: boolean) {
        this.formCtx.setValid(value)
    }

    /**
     * 更新表单字段的无效状态
     */
    updateInvalids(path: string, value: boolean) {
        if (this.value === value) return
        if (value) {
            removeArrayItem(this._invalids, path)
        } else {
            if (!this._invalids.includes(path)) this._invalids.push(path)
        }
        this.value = this._invalids.length === 0
        this.setValid(this.value)
    }

    /**
     * 对所有字段执行校验
     */
    validateAll() {
        for (let fields of Object.values(this.fields)) {
            fields.forEach(field => {
                this.validate(field.el)
            })
        }
    }

    /**
     * 对表单字段进行验证
     */
    validate(fieldEle: HTMLElement): ValidateResult | undefined {
        const validateFn = this.options.validate
        const hasCustomValidate = validateFn && isFunction(validateFn)
        const path = this.getFieldName(fieldEle)
        if (!path) return

        const validResult: ValidateResult = {
            path,
            value: true,
            error: null
        }

        // 1. 执行标准HTML5验证
        const inputEles = getInputElements(fieldEle)
        for (let inputEle of inputEles) {
            if (inputEle && inputEle.checkValidity && !inputEle.checkValidity()) {
                validResult.value = false
                validResult.error = inputEle.validationMessage
            } else {
                validResult.value = true
                validResult.error = null
            }
            this.updateInvalids(path, validResult.value)
            this.report(fieldEle, validResult)
        }

        // 2. 执行自定义验证
        if (hasCustomValidate) {
            const inputEles = getInputElements(fieldEle)
            for (let inputEle of inputEles) {
                const value = inputEle.value
                const part = inputEle.getAttribute(FIELD_DATA_PART)
                const isValid = validateFn!(path!, value, part, fieldEle)

                if (typeof isValid === "boolean") {
                    validResult.value = isValid
                    validResult.error = fieldEle.dataset.errorTips || 'ERROR'
                } else if (typeof isValid === "string") {
                    validResult.value = false
                    validResult.error = isValid
                }

                this.updateInvalids(path, validResult.value)
                if (inputEle && inputEle.setCustomValidity && this.options.customReport) {
                    inputEle.setCustomValidity(validResult.error || '')
                }
                this.report(fieldEle, validResult)
            }
        }

        return validResult
    }

    private getFieldName(fieldEle: HTMLElement) {
        return fieldEle.getAttribute('name') || fieldEle.getAttribute('data-field-name')
    }

    private getFieldRelElements(fieldEle: HTMLElement) {
        const name = this.getFieldName(fieldEle)
        if (!name) return []
        const els: any[] = []
        this.fields[name] && this.fields[name].forEach(field => {
            els.push(field.el)
            els.push(...field.inputs)
        })
        return els
    }

    getReportElements(fieldEle: HTMLElement, _: ValidateResult): HTMLElement[] {
        if (!fieldEle) return []
        const fieldName = this.getFieldName(fieldEle)
        const reportEles = this.form.querySelectorAll(`[data-validate-field='${fieldName}']`)
        if (reportEles) {
            reportEles.forEach(reportEle => {
                addClass(reportEle, FIELD_INVALID_CLASS)
            })
        }
        return Array.from(reportEles) as HTMLElement[]
    }

    toggleReport(fieldEle: HTMLElement, validResult: ValidateResult) {
        if (validResult.value) {
            this.hideReport(fieldEle, validResult)
        } else {
            this.showReport(fieldEle, validResult)
        }
    }

    private showReport(fieldEle: HTMLElement, validResult: ValidateResult) {
        // 显示错误信息
        const reportEles = this.getReportElements(fieldEle, validResult)
        const validateMessage = validResult.error || fieldEle.dataset.invalidTips || 'ERROR'
        if (reportEles && validateMessage) {
            reportEles.forEach(reportEle => {
                reportEle.innerHTML = validateMessage
                reportEle.style.display = "block"
                addClass(reportEle, FIELD_INVALID_CLASS)
            })
        }

        // 添加错误样式
        const relEles = this.getFieldRelElements(fieldEle)
        relEles.forEach(el => {
            addClass(el, FIELD_INVALID_CLASS)
        })
    }

    private hideReport(fieldEle: HTMLElement, validResult: ValidateResult) {
        // 隐藏错误信息
        const reportEles = this.getReportElements(fieldEle, validResult)
        if (reportEles) {
            reportEles.forEach(reportEle => {
                if (reportEle.classList.contains(FIELD_INVALID_CLASS)) {
                    reportEle.style.display = "none"
                }
                removeClass(reportEle, FIELD_INVALID_CLASS)
            })
        }

        // 移除错误样式
        const relEles = this.getFieldRelElements(fieldEle)
        relEles.forEach(el => {
            removeClass(el, FIELD_INVALID_CLASS)
        })
    }

    /**
     * 报告校验错误
     */
    report(fieldEle: HTMLElement, validResult: ValidateResult) {
        const isCustomReport = this.options.customReport !== false
        if (isCustomReport) {
            this.toggleReport(fieldEle, validResult)
        } else {
            const inputEles = getInputElements(fieldEle)
            inputEles.forEach(inputEle => {
                inputEle.reportValidity()
            })
        }
    }

    reportAll() {
        this.form.reportValidity()
    }
}