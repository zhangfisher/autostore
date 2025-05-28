/**
 * 
 *  通过双向绑定表单
 * 
 *  用于实现Form与AutoStore的双向绑定
 *  
 *  根据autostore的schema生成表单
 *  
 *  schema.widget用来指定字段类型
 *  
 * 
 * 
 *  - 用法：
 * 
 *  <voerka-form 
 *      .store=${store}
 *      entry="指定store的entry，没有指定时使用整个store" 
 *      group=""
 *  >
 *     
 *  </voerka-form>
 * 
 */

import { LitElement, html } from 'lit'
import { property, query, queryAssignedElements, state } from 'lit/decorators.js'
import { setVal, type SchemaObject } from 'autostore';
import { classMap } from 'lit/directives/class-map.js';
import { consume } from '@lit/context';
import { AutoFormContext, context } from '../context';
import styles from './styles'


export class AutoField extends LitElement {
    static styles = styles

    @property({ type: Object })
    schema?: SchemaObject

    @state()
    value: any = ''

    @state()
    errorTips?: string

    @consume({ context })
    @property({ attribute: false })
    public context?: AutoFormContext

    getContext() {
        if (this.context) {
            return this.context as Required<AutoFormContext>
        } else {
            return {
                dark: false,
                labelPos: 'top',
                advanced: false
            } as Required<AutoFormContext>
        }
    }

    getSchema() {

    }

    @queryAssignedElements({ slot: 'value', flatten: true })
    _field!: Array<HTMLElement>;

    @query('.value >:first-child')
    inputElement?: HTMLInputElement

    renderHelp(context: AutoFormContext) {
        return html`<span class="help"></span>`
    }
    renderLabel(context: AutoFormContext) {
        return html`<label>${this.schema?.title}</label>`
    }
    renderValue(context: AutoFormContext) {
        return html``
    }
    renderError(context: AutoFormContext) {
        return html`${this.errorTips}`
    }

    onFieldChange(e: Event) {
        console.log("onFieldChange", e)
    }

    onFieldInput(e: Event) {
        this._updateFieldValue()
    }
    _updateFieldValue() {
        if (!this.schema) return
        if (!this.inputElement) return
        const path = this.schema.path
        const value = this.inputElement?.value
        const validate = this.schema.validate
        // if (typeof (validate) === 'function') {
        //     if (validate(value, 1, '')) {

        //     }
        // }

        try {
            setVal(this.getContext().store.state, path, value)
            this.errorTips = undefined
        } catch (e: any) {
            this.errorTips = e.message
        }
    }



    render() {
        const ctx = this.getContext()
        return html`
            <div class="auto-field
                ${classMap({
            'left-label': ctx.labelPos === 'left',
            'top-label': ctx.labelPos === 'top',
            'no-label': ctx.labelPos === 'none'
        })}"         
          >
                <div class="label">
                    <span class="title">${this.renderLabel(ctx)}</span>
                    <span class="help">${this.renderHelp(ctx)}</span>
                </div>
                <div class="value">
                    ${this.renderValue(ctx)}
                </div>            
                ${this.errorTips ? html`<div class="error">${this.renderError(ctx)}</div>` : ''}    
            </div>
        `
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field': AutoField
    }
}
