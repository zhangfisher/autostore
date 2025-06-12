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
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';

import '../field'
import styles from './styles'
import { AutoStore, ComputedSchemaState, ComputedState, Dict, SchemaOptions } from 'autostore';
import { context, AutoFormContext } from '../context'
import '../widgets'
import { provide } from '@lit/context';
import { registerIconLibrary } from '@shoelace-style/shoelace';
import { IconLibrary, IconLibraryResolver } from '@shoelace-style/shoelace/dist/components/icon/library.js';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles

    @provide({ context })
    context: AutoFormContext = {}


    schemas: ComputedSchemaState<SchemaOptions>[] = []


    @property({ type: String })
    group?: string

    // 指定字段顺序，用,分割
    @property({ type: String })
    fields?: string


    store?: AutoStore<Dict>
    seq: number = ++AutoForm.seq

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


    @property({ type: String })
    layout: 'auto' | 'row' | 'col' = 'auto'

    /**
     * 
     * 注册图标库地址
     * 
     * iconset="https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${name}.svg"
     * 
     */
    @property({ type: String })
    iconLibrary: string = 'https://unpkg.com/lucide-static@latest/icons/${name}.svg'

    /**
     * 注册图标库
     * 
     * registerIcons((name=?{})>)
     * 
     * 
     */
    registerIcons(resolver: IconLibraryResolver, options?: Omit<IconLibrary, 'name' | 'resolver'>) {
        registerIconLibrary('default', {
            resolver,
            ...options || {}
        })
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.registerIcons((name) => {
            return this.iconLibrary.replace('${name}', name)
        })
    }

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
    _renderWidget(schema: SchemaOptions) {
        const width = schema.width
        const widget = schema.widget
        let widgetEle
        try {
            widgetEle = document.createElement(`auto-field-${widget || 'input'}`)
        } catch {
            widgetEle = document.createElement('auto-field-input')
        }
        // @ts-ignore
        widgetEle.schema = schema
        // @ts-ignore
        if (width) widgetEle.style.width = width
        return widgetEle
    }
    _renderFields() {
        return html`            
                ${this.schemas!.map(schema => {
            return html`${this._renderWidget(schema)}`
        })}`
    }
    render() {
        return html`
            <div class="auto-form ${classMap({
            dark: this.dark,
            'sl-theme-dark': this.dark,
            'row-layout': this.layout === 'row',
            'col-layout': this.layout === 'col',
            'auto-layout': this.layout === 'auto'
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
