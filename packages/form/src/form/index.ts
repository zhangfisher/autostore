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
import { pathStartsWith, type AutoStore, type ComputedState, type Dict, type SchemaOptions } from 'autostore';
import { context, type AutoFormContext } from '../context'
import '../components'
import { provide } from '@lit/context';
import { type IconLibrary, type IconLibraryResolver, registerIconLibrary } from '@shoelace-style/shoelace/dist/components/icon/library.js';
import { ContextController } from '@/controllers/context';
import { HostClasses } from '@/controllers/hostClasss';
import '../field'
import styles from './styles'
import { presetIcons } from './icons';
import { renderWidget } from '@/utils/renderWidget';
import { applyClass } from '@/utils/applyClass';

@customElement('auto-form')
export class AutoForm extends LitElement {
    static seq: number = 0
    static styles = styles
    classs = new HostClasses(this)
    theme = new ContextController(this)
    seq: number = ++AutoForm.seq

    @provide({ context })

    //@ts-ignore
    context: AutoFormContext = {}
    schemas: SchemaOptions[] = []
    store?: AutoStore<Dict>

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
    validAtInit: boolean = false

    @property({ type: String, reflect: true })
    group?: string

    /**
     * 指定一个路径，用于过滤状态路径
     * 
     * 只有指定路径下的schema才会被渲染显示。
     * 
     * 如：
     * <auto-form path="user.order,profile.add"></autoform>
     * 
     * 多个路径使用,分割
     *  
     */
    @property({ type: String, reflect: true })
    path?: string

    /**
     * 压缩字段之间的空白
     */
    @property({ type: Boolean, reflect: true })
    compact: boolean = false

    /** 
     * 是否显示高级选项 
     */
    @property({ type: Boolean, reflect: true })
    advanced?: boolean

    /**
     * 确定字段校验时机
     * 
     * - input:  输入时进行校验
     * - lost-focus: 失去焦点时进行校验
     */
    @property({ type: String, reflect: true })
    validAt: 'input' | 'lost-focus' = 'lost-focus'
    /**
     * 显示网格线
     * border:  none | outline | grid
     */
    @property({ type: String, reflect: true })
    border: 'none' | 'outline' | 'grid' = 'grid'
    /**
     * 显示网络
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
     * 布局
     * - auto：使用inline-block布局,或者叫流式布局
     * - col: 使用flex:col布局
     * - row: 使用flex:row布局 
     */
    @property({ type: String, reflect: true })
    layout: 'auto' | 'row' | 'col' = 'auto'

    _loading: boolean = false

    get dirty() {
        return this.context.dirty
    }

    get invalid() {
        return this.context.invalid
    }

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
    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value)
        if (['group', 'sort', 'advanced', 'path'].includes(name)) {
            setTimeout(() => this._load())
        }
    }
    _initialContext() {
        Object.assign(this.context, {
            store: this.store,
            form: this,
            labelPos: this.labelPos,
            labelWidth: this.labelWidth,
            viewAlign: this.viewAlign,
            border: this.border,
            group: this.group,
            advanced: this.advanced,
            dark: this.dark,
            dirty: false,
            invalid: this._isValid(),
            validAtInit: this.validAtInit
        })
    }

    _isValid() {
        if (this.path) {
            const errors: Record<string, string> = this.store!.schemas.errors || {}
            return Object.keys(errors).some((key) => {
                return pathStartsWith(this.path!.split('.'), key.split('.'))
            })
        } else {
            return Object.keys(this.store!.schemas.errors).length > 0
        }
    }

    _load(update: boolean = true) {
        if (!this.store) return
        if (this._loading) return
        try {
            this._initialContext()
            const fields = this.path
                ? this.store!.schemas.find(this.path)
                : Object.values(this.store!.schemas.store.state) as ComputedState<SchemaOptions>[]

            const isGroupMatched = (schema: SchemaOptions) => {
                if (!this.group) return true
                if (['', '*'].includes(this.group)) {
                    return true
                }
                const fieldGroups = (schema.group || '').split(',')
                const groups = this.group.split(',')
                return fieldGroups.some((name) => {
                    return groups.includes(name)
                })
            }
            this.schemas = Object.values(fields)
                .filter((schema) => {
                    if (!isGroupMatched(schema)) return false
                    if (this.advanced === false && schema.advanced) return false
                    return true
                })
                .sort((a: any, b: any) => {
                    return (a.order || 0) - (b.order || 0)
                })
            if (update) this.requestUpdate()
        } finally {
            this._loading = false
        }
    }

    bind(store: AutoStore<Dict>) {
        this.store = store
        this._load()
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
    _renderFields() {
        return html`            
                ${this.schemas!.map(schema => {
            return html`${renderWidget(schema)}`
        })}`
    }
    render() {
        this.classs.use(this.size, {
            dark: this.context.dark,
            [`${this.labelPos}-label`]: true,
            [`view-${this.viewAlign}`]: true,
            compact: this.compact,
            dirty: this.context.dirty,
            invalid: this.invalid
        })
        return html`            
            <div class="actions header"></div>
            <div class="fields">
                ${this._renderFields()}
            </div>
            <div class="actions footer"></div>
        `
    }

    reset() {
        this.store?.reset()
        this._initialContext()
        applyClass(this, 'dirty', false)
        applyClass(this, 'invalid', false)
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
