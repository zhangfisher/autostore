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
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '../field'
import styles from './styles'
import { AutoStore, Dict, SchemaObject } from 'autostore';
import { context, AutoFormContext } from '../context'
import * as widgets from '../widgets'
import { provide } from '@lit/context';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles

    @provide({ context })
    context: AutoFormContext = {}


    schemas?: SchemaObject[] = []


    @property({ type: String })
    group?: string

    // 指定字段顺序，用,分割
    @property({ type: String })
    fields?: string


    store?: AutoStore<Dict>
    seq: number = ++AutoForm.seq

    connectedCallback(): void {
        super.connectedCallback()
        this._load()
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
        this.schemas = Array.from(this.store?.schemas.values() ?? []).filter(schema => {
            if (this.group) {
                return schema.group ? (schema.group === this.group) : true
            }
            return true
        }).sort((a, b) => {
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
            switch (schema.widget) {
                case 'textarea':
                    return widgets.renderTextarea.call(this, schema)
                case 'select':
                    return widgets.renderSelect.call(this, schema)
                case 'switch':
                    return widgets.renderSwitch.call(this, schema)
                case 'qrcode':
                    return widgets.renderQRCode.call(this, schema)
                case 'colorpicker':
                    return widgets.renderColorPicker.call(this, schema)
                case 'radio':
                    return widgets.renderRadio.call(this, schema)
                case 'radiobutton':
                    return widgets.renderRadioButton.call(this, schema)
                case 'rating':
                    return widgets.renderRating.call(this, schema)
                case 'range':
                    return widgets.renderRange.call(this, schema)
                case 'checkbox':
                    return widgets.renderCheckbox.call(this, schema)
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
