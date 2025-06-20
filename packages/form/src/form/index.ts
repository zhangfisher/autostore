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

import '@shoelace-style/shoelace/dist/themes/dark.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { AutoStore, ComputedSchemaState, ComputedState, Dict, SchemaOptions } from 'autostore';
import { context, AutoFormContext } from '../context'
import '../components/box'
import '../widgets'
import { provide } from '@lit/context';
import { registerIconLibrary } from '@shoelace-style/shoelace';
import { IconLibrary, IconLibraryResolver } from '@shoelace-style/shoelace/dist/components/icon/library.js';
import { ThemeController } from '@/controllers/theme';
import { HostClasses } from '@/controllers/hostClasss';
import '../field'
import styles from './styles'
import { presetIcons } from './icons';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles
    classs = new HostClasses(this)
    theme = new ThemeController(this)

    @provide({ context })
    //@ts-ignore
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
    advanced: boolean = true

    /**
     * 
     * 显示网络
     * 
     */
    @property({ type: Boolean, reflect: true })
    grid: boolean = true

    /**
     * 
     * 显示网络
     * 
     */
    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium'

    /**
     * 
     * 显示模式
     * 
     * - default : 默认编辑修改模式
     * - readonly: 只读模式
     * - view: 视图模式，只显示数据，不渲染输入组件，使用renderView
     * 
     *  toView
     *  toInput
     *  toState
     * 
     */
    @property({ type: String, reflect: true })
    mode: 'default' | 'view' | 'readonly' = 'default'

    /**
     * 标签位置
     * 取值：
     * - none: 不显示标签
     * - top: 标签在上方
     * - left: 标签在左侧
     */
    @property({ type: String, reflect: true })
    labelPos: string = 'top'

    @property({ type: String, reflect: true })
    labelWidth?: string = '5rem'

    @property({ type: Boolean, reflect: true })
    dark: boolean = false


    @property({ type: String })
    layout: 'auto' | 'row' | 'col' = 'auto'

    /**
     * 
     * 注册图标库地址
     * 
      
     * 
     */
    @property({ type: String })
    iconLibrary: string = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${name}.svg'


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
            if (name in presetIcons) {
                return `data:image/svg+xml,${encodeURIComponent((presetIcons as any)[name])}`;
            } else {
                return this.iconLibrary.replace('${name}', name)
            }
        })
    }


    _load() {
        const schmeaState = this.store!.schemas.store.state as Record<string, ComputedState<SchemaOptions>>
        this.schemas = Object.values(schmeaState)
            .filter((schema) => {
                if (this.group) {
                    return schema.group ? (schema.group === this.group) : true
                }
                if (this.advanced === false && schema.advanced === true) return true
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
            labelWidth: this.labelWidth,
            grid: this.grid,
            dark: this.dark
        })
        this._load()
        this.requestUpdate()
    }
    _renderWidget(schema: SchemaOptions) {
        const width = schema.width
        const widget = schema.widget
        let widgetEle: HTMLElement
        try {
            widgetEle = document.createElement(`auto-field-${widget || 'input'}`)
        } catch {
            widgetEle = document.createElement('auto-field-input')
        }
        // @ts-ignore
        widgetEle.schema = schema
        widgetEle.setAttribute('grid', String(this.grid))
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
        this.classs.use(this.size, {
            'dark': this.context.dark,
            'grid': this.grid,
            'row-layout': this.layout === 'row',
            'col-layout': this.layout === 'col',
            'auto-layout': this.layout === 'auto',
            'left-label': this.labelPos === 'left',
            'top-label': this.labelPos === 'top',
        })
        return html`
            
            <div class="actions header" > 
            </div>
            <div class="fields">
                    ${this._renderFields()}
            </div>
            <div class="actions footer" >

            </div>
        `
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form': AutoForm
    }
}
