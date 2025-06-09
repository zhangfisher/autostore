import { classMap } from 'lit/directives/class-map.js';
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
import { customElement, property } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/themes/dark.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '../field'
import styles from './styles'
import { AutoStore, ComputedSchemaState, ComputedState, Dict, SchemaOptions } from 'autostore';
import { context, AutoFormContext } from '../context'
import '../widgets'
import { provide } from '@lit/context';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles

    @provide({ context })
    context: AutoFormContext = {}


    schemas?: ComputedSchemaState<SchemaOptions>[]


    @property({ type: String })
    group?: string

    // 指定字段顺序，用,分割
    @property({ type: String })
    fields?: string


    store?: AutoStore<Dict>
    seq: number = ++AutoForm.seq

    connectedCallback(): void {
        super.connectedCallback()
    }
    /**
     * 
     * 是否显示高级选项
     * 
     */
    @property({ type: Boolean, reflect: true })
    advanced?: boolean
    /**
     * 标签位置
     * 取值：
     * - none: 不显示标签
     * - top: 标签在上方
     * - left: 标签在左侧
     */
    @property({ type: String })
    labelPos: string = 'top'


    @property({ type: Boolean, reflect: true })
    dark: boolean = false

    _load() {
        const schmeaState = this.store!.schemas.store.state as Record<string, ComputedState<SchemaOptions>>
        this.schemas = Object.values(schmeaState)
            .filter((schema) => {
                if (this.group) {
                    return schema.group ? (schema.group === this.group) : true
                }
                return true
            }).sort((a, b) => {
                // @ts-ignore
                return (a.order || 0) - (b.order || 0)
            })
    }
    bind(store: AutoStore<Dict>) {
        this.store = store
        Object.assign(this.context, {
            store,
            form: this,
            labelPos: this.labelPos,
            advanced: this.advanced,
            dark: this.dark
        })
        this._load()
        this.requestUpdate()
    }

    _renderFields() {
        return html`            
                ${this.schemas!.map(schema => {
            if (!schema.widget) {
                if (schema.datatype === 'boolean') schema.widget = 'checkbox'
            }
            switch (schema.widget) {
                case 'select':
                    return html`<auto-field-select .schema=${schema}></auto-field-select>`
                case 'password':
                    return html`<auto-field-password .schema=${schema}></auto-field-password>`
                case 'switch':
                    return html`<auto-field-switch .schema=${schema}></auto-field-switch>`
                case 'qrcode':
                    return html`<auto-field-qrcode .schema=${schema}></auto-field-qrcode>`
                case 'colorpicker':
                    return html`<auto-field-colorpicker .schema=${schema}></auto-field-colorpicker>`
                case 'radio':
                    return html`<auto-field-radio .schema=${schema}></auto-field-radio>`
                case 'radio-button':
                    return html`<auto-field-radio-button .schema=${schema}></auto-field-radio-button>`
                case 'rating':
                    return html`<auto-field-rating .schema=${schema}></auto-field-rating>`
                case 'range':
                    return html`<auto-field-range .schema=${schema}></auto-field-range>`
                case 'textarea':
                    return html`<auto-field-textarea .schema=${schema}></auto-field-textarea>`
                case 'date':
                    return html`<auto-field-date .schema=${schema}></auto-field-date>`
                case 'number':
                    return html`<auto-field-number .schema=${schema}></auto-field-number>`
                case 'email':
                    return html`<auto-field-email .schema=${schema}></auto-field-email>`
                case 'tree-select':
                    return html`<auto-field-tree-select .schema=${schema}></auto-field-tree-select>`
                case 'ipaddress':
                    return html`<auto-field-ipaddress .schema=${schema}></auto-field-ipaddress>`
                case 'checkbox':
                    return html`<auto-field-checkbox .schema=${schema}></auto-field-checkbox>`
                case 'time':
                    return html`<auto-field-time .schema=${schema}></auto-field-time>`
                case 'url':
                    return html`<auto-field-url .schema=${schema}></auto-field-url>`
                default:
                    return html`<auto-field-input .schema=${schema}></auto-field-input>`
            }
        })}`
    }
    render() {
        return html`
            <div class="auto-form ${classMap({
            dark: this.dark,
            'sl-theme-dark': this.dark
        })}">
                <div class="actions header" >

                </div>
                <div class="fields">
                    ${this._renderFields()}
                </div>
                <div class="actions footer" >

                </div>
            </div>
        `
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form': AutoForm
    }
}
