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

// import '@shoelace-style/shoelace/dist/themes/dark.css'
// import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AutoStore, ComputedState, Dict, SchemaOptions } from 'autostore';
import { context, type AutoFormContext } from '../context'
import '../components'
import { provide } from '@lit/context';
import { type IconLibrary, type IconLibraryResolver, registerIconLibrary } from '@shoelace-style/shoelace/dist/components/icon/library.js';
import { ContextController } from '@/controllers/context';
import { HostClasses } from '@/controllers/hostClasss';
import '../field'
import styles from './styles'
import { presetIcons } from './icons';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles
    classs = new HostClasses(this)
    theme = new ContextController(this)

    @provide({ context })
    //@ts-ignore
    context: AutoFormContext = {}

    schemas: SchemaOptions[] = []

    /**
     * 是不显示初始错误
     * 
     * 比如
     * field.username 要求长度大于>3
     * 但是在初始化时，而默认会执行一次校验，但是由于此时没有输入任何值
     * 所以会显示错误
     * 此开关可以在让字段在初始化时不显示错误信息
     * 
     * 
     */
    @property({ type: Boolean, reflect: true })
    showInitialError: boolean = false

    @property({ type: String })
    group?: string

    // 指定字段顺序，用,分割
    @property({ type: String })
    fields?: string

    /**
     * 压缩字段之间的空白
     */
    @property({ type: Boolean, reflect: true })
    compact: boolean = false


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
     * 标签位置
     * 取值：
     * - none: 不显示标签
     * - top: 标签在上方
     * - left: 标签在左侧
     */
    @property({ type: String, reflect: true })
    labelPos: string = 'top'

    @property({ type: String, reflect: true })
    labelWidth?: string = '7em'

    /**
     * value: 显示在值下方
     * label: 显示标签后面，当labe在左边时，只显示一个帮助图标，
     */
    @property({ type: String })
    helpPos?: 'label' | 'value' = 'label'

    @property({ type: Boolean, reflect: true })
    dark: boolean = false

    /**
     * 只读模式
     */
    @property({ type: Boolean, reflect: true })
    readonly: boolean = false

    /**
     * 浏览模式
     */
    @property({ type: Boolean, reflect: true })
    viewonly: boolean = false

    /**
     * 浏览模式下，值对齐方式，默认=right
     */
    @property({ type: String, reflect: true })
    viewAlign: 'left' | 'center' | 'right' = 'right'

    /**
     * 
     * 布局
     * - auto：使用inline-block布局,或者叫流式布局
     * - col: 使用flex:col布局
     * - row: 使用flex:row布局
     * 
     */
    @property({ type: String })
    layout: 'auto' | 'row' | 'col' = 'auto'

    /**
     * 
     * 注册图标库地址 
     * 
     */
    @property({ type: String })
    iconLibrary: string = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg'
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
                return this.iconLibrary.replace('{name}', name)
            }
        })
    }
    _load() {
        const schmeaState = this.store!.schemas.store.state as Record<string, ComputedState<SchemaOptions>>
        this.schemas = Object.values(schmeaState)
            .filter((schema) => {
                if (this.group) {
                    return schema.group === this.group
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
            viewAlign: this.viewAlign,
            helpPos: this.helpPos,
            grid: this.grid,
            dark: this.dark,
            dirty: false,
            invalide: Object.keys(store.schemas.errors).length > 0,
            showInitialError: this.showInitialError
        })
        this._load()
        this.requestUpdate()
    }
    /**
     * 清除所有错误信息
     */
    clearErrors() {
        this.store!.schemas.errors = {}
        const fields = Array.from(this.shadowRoot!.querySelectorAll(".fields > *")) as HTMLElement[]
        fields.forEach(field => {
            if (field.tagName.startsWith('auto-field')) {
                (field as any).invalidMessage = undefined
            }
        })
        this.requestUpdate()
    }
    _renderWidget(options: SchemaOptions) {
        const width = options.width
        const widget = options.widget
        let widgetEle: HTMLElement
        try {
            widgetEle = document.createElement(`auto-field-${widget || 'input'}`)
        } catch {
            widgetEle = document.createElement('auto-field-input')
        }
        // @ts-ignore
        widgetEle.schema = options
        widgetEle.setAttribute('grid', String(this.grid))
        widgetEle.setAttribute('part', 'field')
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
            [`${this.layout}-layout`]: true,
            [`${this.labelPos}-label`]: true,
            [`view-${this.viewAlign}`]: true,
            compact: this.compact
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

    reset() {
        this.store?.reset()
    }
    submit(callback: (values: Record<string, string>, errors?: Record<string, string>) => void) {
        if (typeof (callback) === 'function') {
            const values = this.store?.schemas.getValues() || {}
            const errors = this.store?.schemas.errors
            callback(values, errors)
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form': AutoForm
    }
}
