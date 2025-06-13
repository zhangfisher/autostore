/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { CSSResult, LitElement, html } from 'lit'
import { property, query, queryAssignedElements, state } from 'lit/decorators.js'
import { AsyncComputedValue, createAsyncComptuedValue, getVal, isAsyncComputedValue, setVal, Watcher, SchemaOptions, StateOperate, SchemaWidgetAction } from 'autostore';
import { classMap } from 'lit/directives/class-map.js';
import { consume } from '@lit/context';
import { AutoFormContext, context } from '../context';
import styles from './styles'
import { toSchemaValue } from '@/utils/toSchemaValue';
import { KnownRecord } from '@/types';
import '../components/icon'
import { repeat } from 'lit/directives/repeat.js';
import { ThemeController } from '@/controllers/theme';


export class AutoField extends LitElement {
    static styles = styles as CSSResult
    theme = new ThemeController(this)

    @property({ type: Object })
    schema?: SchemaOptions

    field: KnownRecord<SchemaOptions, AsyncComputedValue> = {}

    @state()
    value: any = ''

    name: string = ''
    path: string = ''

    @state()
    invalidMessage?: string

    @state()
    labelPos: string = 'top'

    beforeActions?: SchemaWidgetAction[]
    afterActions?: SchemaWidgetAction[]


    @queryAssignedElements({ slot: 'value', flatten: true })
    _field!: Array<HTMLElement>;

    _subscribers: Watcher[] = []

    @query('.value >:first-child')
    input?: HTMLInputElement
    @consume({ context })
    @property({ attribute: false })
    public context?: AutoFormContext

    /**
     * 
     * @param options 
     */
    _normalizeSchema(options: SchemaOptions) {
        this.field = Object.entries(options).reduce<Record<string, AsyncComputedValue>>((result, [key, value]) => {
            if (['value', 'path', 'widget'].includes(key)) {
                result[key] = value
            } else if (isAsyncComputedValue(value)) {
                result[key] = value
            } else {
                result[key] = createAsyncComptuedValue(value)
            }
            return result
        }, {})
    }
    getPrefix() {

    }
    getSuffix() {

    }
    renderActions() {
        const actions = this.schema?.actions
        if (Array.isArray(actions)) {
            const onClick = (action: SchemaWidgetAction) => (e: any) => action.onClick(this.getValue(), {
                action,
                schema: this.schema!,
                event: e,
                update: (value: any) => {
                    setVal(this.context!.store!.state, this.schema!.path, value)
                }
            })
            return html`<div class="actions before" slot="prefix">
            ${repeat(this.beforeActions || [], (action) => {
                return html`
                        <sl-button @click=${onClick(action)}>${action.label}</sl-button>
                    `
            })}</div>
            <div class="actions after" slot="suffix"> 
            ${repeat(this.afterActions || [], (action) => {
                return html`
                    <sl-button @click=${onClick(action)}>${action.label}</sl-button>            
                    `
            })}</div>`
        }
    }
    _renderSchemaOption(name: string, render?: (value: any) => any) {
        const option = (this.field as any)[name]
        if (!option) return
        if (option.loading) {
            return html`<sl-spinner></sl-spinner>`
        } else {
            return html`${render ? render(option.value) : option.value}</div>`
        }
    }

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

    getLabel() {
        return this.getSchema().label || this.name
    }

    getSchema() {
        return this.schema!
    }
    getOptionValue(name: string, defaultValue?: any) {
        if (this.schema && name in this.schema) {
            // @ts-ignore
            const value = this.schema[name]
            if (value === undefined) {
                return defaultValue
            } else if (isAsyncComputedValue(value)) {
                return value.value
            } else {
                return value
            }
        } else {
            return defaultValue
        }
    }

    getValue(): any {
        if (!this.input) return ''
        const datatype = this.schema?.datatype || 'string'
        const value = this.input.checked ?? this.input.value
        if (datatype === 'number') return Number(value)
        if (datatype === 'boolean') return Boolean(value)
        return value
    }


    _renderRequiredOption() {
        return this._renderSchemaOption('required', (val) => {
            return val ? html`<span style='color:red;padding:2px;'>*</span>` : ''
        })
    }
    renderHelp(ctx: AutoFormContext) {
        return html`<span class="help"></span>`
    }
    renderLabel(ctx: AutoFormContext) {
        if (this.labelPos === 'none') {
            return html``
        } else {
            return html`<div class="label">
            <span class="title">${this.getLabel()}${this._renderRequiredOption()}:</span>
            <span class="help">${this.renderHelp(ctx)}</span>
        </div>`
        }
    }
    renderValue(ctx: AutoFormContext) {
        return html``
    }
    renderError(ctx: AutoFormContext) {
        return this.invalidMessage ? html`<div class="error">
            ${this.invalidMessage}
        </div>` : html``
    }
    onFieldChange(e?: Event) {
        this._updateFieldValue()
    }

    onFieldInput(e: Event) {
        this._updateFieldValue()
    }
    _handleSchemaChange() {
        const ctx = this.getContext()
        if (ctx && ctx.store && this.schema) {
            const pathKeys = this.schema.path.join("_$_")
            // 监听schema变化,schema什么会变化，当schema成员是一个计算函数时，会在所依赖的状态变化时重新计算而导致变化
            // 
            this._subscribers.push(ctx.store.schemas.store.watch(pathKeys + ".**", (operate) => {
                const { reply, type, value, flags } = operate
                if (reply) return
                // 
                if (ctx.form.seq === flags) return
                const ops = type === 'batch' ? value : [operate]
                ops.forEach((op: StateOperate) => {
                    const tpath = op.path.length === 2 ? [...op.path.slice(1), 'value'] : op.path.slice(1)
                    setVal(this.field, tpath, op.value)
                })
                // 重新渲染
                this.requestUpdate()
            }, {
                operates: 'write'
            }))
        }
    }

    _handleStateChange() {
        const ctx = this.getContext()
        if (ctx && ctx.store && this.schema) {
            this._subscribers.push(ctx.store.watch(this.schema.path.join("."), (operate) => {
                // 当表单change/input时更新时设置flags=form.seq
                // 此时应不需要更新到value，否则会导致死循环
                if (ctx.form.seq === operate.flags) return
                this.value = operate.value
            }, { operates: 'write' }))
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        const ctx = this.getContext()
        if (ctx && ctx.store && this.schema) {
            this._normalizeSchema(this.schema)
            this._handleSchemaChange()
            this._handleStateChange()
            this.value = getVal(ctx.store.state, this.schema.path, this.schema.value)
            this.path = this.schema!.path.join(".")
            this.name = this.schema!.name || this.path
            if (Array.isArray(this.schema!.actions)) {
                this.beforeActions = this.schema!.actions.filter((action) => action.position === 'before')
                this.afterActions = this.schema!.actions.filter((action) => action.position !== 'before')
            }
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        this._subscribers.forEach((subscriber) => subscriber.off())
    }

    /**
     * 当输入框值改变时更新状态
     * @returns 
     */
    _updateFieldValue() {
        if (!this.schema) return
        const path = this.schema.path
        const value = this.getValue()
        const ctx = this.getContext()
        try {
            const store = this.getContext().store
            store.update((state) => {
                setVal(state, path, toSchemaValue(value, this.schema!))
                this.invalidMessage = undefined
            }, {
                flags: ctx.form.seq
            })

        } catch (e: any) {
            this.invalidMessage = e.message
        }
    }



    render() {
        const ctx = this.getContext()
        return html`
            <div class="auto-field
                ${classMap({
            'left-label': ctx.labelPos === 'left',
            'top-label': ctx.labelPos === 'top',
            'no-label': ctx.labelPos === 'none',
            error: !!this.invalidMessage,
            disable: this.field.enable?.value === false,
            required: this.field.required?.value === true,
            hidden: this.field.visible?.value === false
        })}"
          >
            ${this.renderLabel(ctx)}
            <div class="value">
                ${this.renderValue(ctx)}
            </div>            
            ${this.renderError(ctx)}
        </div>
        `
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field': AutoField
    }
}
