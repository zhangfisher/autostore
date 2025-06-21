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
 *  <auto-form 
 *      .store=${store}
 *      entry="指定store的entry，没有指定时使用整个store" 
 *      group=""
 *  >
 *  </auto-form>
 * 
 */

import { CSSResult, LitElement, html } from 'lit'
import { property, query, queryAssignedElements, state } from 'lit/decorators.js'
import { AsyncComputedValue, createAsyncComptuedValue, getVal, isAsyncComputedValue, setVal, Watcher, SchemaOptions, StateOperate, SchemaWidgetAction } from 'autostore';
import { consume } from '@lit/context';
import { AutoFormContext, context } from '../context';
import styles from './styles'
import { toSchemaValue } from '@/utils/toSchemaValue';
import { KnownRecord } from '@/types';
import { repeat } from 'lit/directives/repeat.js';
import { ThemeController } from '@/controllers/theme';
import { RequiredKeys } from 'flex-tools/types';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import '../components/icon'
import { HostClasses } from '@/controllers/hostClasss';

function getDefaultFieldOptions() {
    return {
        widget: 'input',
        name: '',
        path: [],
        visible: createAsyncComptuedValue(true),
        enable: createAsyncComptuedValue(true),
        required: createAsyncComptuedValue(false),
        order: createAsyncComptuedValue(0),
        advanced: createAsyncComptuedValue(false),
        actions: createAsyncComptuedValue([])
    }
}

type AsyncComputedValueRecord<T extends Record<string, any>> = {
    [K in keyof T]: AsyncComputedValue<T[K]>
}

type NormalizedFieldOptions<SCHEMA = unknown> = Omit<
    RequiredKeys<KnownRecord<SchemaOptions, AsyncComputedValue>,
        'visible' | 'enable' | 'required' | 'order' | 'advanced' | 'actions'
    >, 'widget' | 'path' | 'name'> & {
        widget: string
        path: string[]
        name: string
    } & (SCHEMA extends Record<string, any> ? AsyncComputedValueRecord<SCHEMA> : unknown)


export class AutoField<Options = unknown> extends LitElement {
    static styles = styles as CSSResult
    theme = new ThemeController(this)

    @property({ type: Object })
    schema?: SchemaOptions & Options
    classs = new HostClasses(this)
    field: NormalizedFieldOptions<Options> = getDefaultFieldOptions() as unknown as NormalizedFieldOptions<Options>

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

    @query('.value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-rande,sl-textarea,sl-rating,sl-select,sl-color-picker')
    input?: HTMLInputElement

    @consume({ context })
    @property({ attribute: false })
    public context!: AutoFormContext

    /**
     * 转换为AsyncComputedValue 
     */
    getFieldOptions(): NormalizedFieldOptions<Options> {
        return Object.entries(this.schema || {}).reduce((result: any, [key, value]) => {
            if (['value', 'path', 'widget'].includes(key)) {
                result[key] = value
            } else if (isAsyncComputedValue(value)) {
                result[key] = Object.assign({}, result[key], value)
            } else {
                result[key] = Object.assign({}, result[key], createAsyncComptuedValue(value))
            }
            return result
        }, getDefaultFieldOptions())
    }
    getPrefix() {

    }
    getSuffix() {

    }
    renderActions() {
        return html`${this.renderBeforeActions()}
                ${this.renderAfterActions()}`
    }
    _onClickAction(action: SchemaWidgetAction) {
        if (typeof (action.onClick) == 'function') {
            return (e: any) => action.onClick!.call(this, this.getInputValue(), {
                action,
                schema: this.schema!,
                event: e,
                update: (value: any) => {
                    setVal(this.context!.store!.state, this.schema!.path, value)
                }
            })
        }
    }
    renderBeforeActions() {
        if (Array.isArray(this.beforeActions) && this.beforeActions.length > 0) {
            return html`<div class="actions before" slot="prefix">
            ${repeat(this.beforeActions, (action) => {
                return this.renderActionWidget(action)
            })}</div>`
        }
    }
    renderAfterActions() {
        if (Array.isArray(this.afterActions) && this.afterActions.length > 0) {
            return html`<div class="actions after" slot="suffix">
            ${repeat(this.afterActions, (action) => {
                return this.renderActionWidget(action)
            })}</div>`
        }
    }
    renderActionWidget(action: SchemaWidgetAction) {
        if (typeof (action) !== 'object') return
        const type = action.type || 'button'
        if (type === 'dropdown') {

        } else if (type === 'button') {
            return html`
            <sl-button class='action-widget' 
                title=${ifDefined(action.tips)}
                variant=${ifDefined(action.variant)}
                size=${action.size || this.context.size} 
                @click=${this._onClickAction.call(this, action)}>
                ${when(action.icon, () => html`<sl-icon name=${action.icon!}></sl-icon>`)}
                ${action.label}
            </sl-button>
        `
        } else if (type === 'image') {
            return html`
            <sl-button title="${ifDefined(action.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this, action)}>                
                <img src="${action.url!}"/>
            </sl-button>
        `
        } else {

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
    getLabel() {
        return this.getSchema().label || this.name
    }

    getSchema() {
        return this.schema!
    }
    getFieldOption(name: string, defaultValue?: any): any {
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

    getInputValue(): any {
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
    renderHelp() {
        const helpText = this.getFieldOption('help')
        if (!helpText) return
        return html`<span class="help">
        <sl-icon name="help"></sl-icon>
        ${ifDefined(this.getFieldOption('help'))}
        </span>`
    }
    renderLabel() {
        const ctx = this.context
        const labelPos = this.field.labelPos?.value || ctx.labelPos
        if (labelPos === 'none') {
            return html``
        } else {
            const style: Record<string, any> = {}
            if (ctx.labelWidth && labelPos === 'left') {
                style.width = ctx.labelWidth
            }
            return html`<div class="label" style="${ifDefined(styleMap(style))}">
            <span class="title">${this.getLabel()}${this._renderRequiredOption()}</span>            
        </div>`
        }
    }
    renderInput() {
        return html``
    }
    renderError() {
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
    /**
     * 当schmeaOption发生变化时
     */
    _handleSchemaChange() {
        const ctx = this.context
        if (ctx && ctx.store && this.schema) {
            const pathKeys = this.schema.path.join("_$_")
            // 监听schema变化,schema什么会变化，当schema成员是一个计算函数时，会在所依赖的状态变化时重新计算而导致变化
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
    /**
     * 当状态数据发生变化时
     */
    _handleStateChange() {
        const ctx = this.context
        if (ctx && ctx.store && this.schema) {
            this._subscribers.push(ctx.store.watch(this.schema.path.join("."), (operate) => {
                // 当表单change/input时更新时设置flags=form.seq
                // 此时应不需要更新到value，否则会导致死循环
                //if (ctx.form.seq === operate.flags) return
                this.value = operate.value
            }, { operates: 'write' }))
        }
    }
    getStateValue() {
        const ctx = this.context
        return getVal(ctx.store.state, this.field.path)
    }
    connectedCallback(): void {
        super.connectedCallback()
        const ctx = this.context
        if (ctx && ctx.store && this.schema) {
            this.field = this.getFieldOptions()
            this.value = this.getStateValue()
            this._handleSchemaChange()
            this._handleStateChange()
            this.path = this.schema!.path.join(".")
            this.name = this.schema!.name || this.path
            if (this.path in ctx.store.schemas.errors) {
                this.invalidMessage = ctx.store.schemas.errors[this.path]
            }
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
    getLabelPos() {
        return this.field.labelPos?.value || this.context.labelPos
    }
    getHelpPos() {
        return this.field.helpPos?.value || this.context.helpPos
    }
    /**
     * 当输入框值改变时更新状态
     * @returns 
     */
    _updateFieldValue() {
        if (!this.schema) return
        const path = this.schema.path
        const value = this.getInputValue()
        const ctx = this.context
        try {
            const store = this.context.store
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
        const ctx = this.context
        this.classs.use(ctx.size, {
            grid: ctx.grid,
            error: !!this.invalidMessage,
            'left-label': ctx.labelPos === 'left',
            'top-label': ctx.labelPos === 'top',
            disable: this.field.enable.value === false,
            required: this.field.required.value === true,
            hidden: this.field.visible.value === false
        })
        return html`           
            <div class="autofield">
                ${this.field.divider?.value
                ? html`<sl-divider></sl-divider>` : null
            }
                ${this.renderLabel()}
                <div class="value">
                    ${this.renderInput()}
                    ${this.renderHelp()}                    
                    ${this.renderError()} 
                </div>                            
            </div>
        `
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field': AutoField
    }
}
