/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *  
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
import { HostClasses } from '@/controllers/hostClasss';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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

    @state()
    dirty: boolean = false

    beforeActions?: SchemaWidgetAction[]
    afterActions?: SchemaWidgetAction[]


    @queryAssignedElements({ slot: 'value', flatten: true })
    _field!: Array<HTMLElement>;

    _subscribers: Watcher[] = []

    @query('.value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker')
    input!: HTMLInputElement

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
    toView(value: any) {
        if (this.field.toView && typeof (this.field.toView.value) === 'function') {
            return this.field.toView.value.call(this, value)
        }
        return value
    }
    toState(value: any) {
        if (this.field.toState && typeof (this.field.toState.value) === 'function') {
            return this.field.toState.value.call(this, value)
        }
        return value
    }

    toInput(value: any) {
        if (this.field.toInput && typeof (this.field.toInput.value) === 'function') {
            return this.field.toInput.value.call(this, value)
        }
        return value
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
        let value: any = this.input.value
        if (datatype === 'number') {
            value = Number(value)
        } else if (datatype === 'boolean') {
            value = Boolean(value)
        }
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
    isShowError() {
        if (this.context.showInitialError) {
            return !!this.invalidMessage
        } else { // 不显示
            return this.dirty ? !!this.invalidMessage
                : false
        }
    }
    renderError() {
        return this.isShowError() ? html`<div class="error">
            ${this.invalidMessage}
        </div>` : html``
    }
    // @ts-ignore
    onFieldChange(e?: Event) {
        this._updateFieldValue()
    }
    // @ts-ignore
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
    renderView() {
        let viewData = this.value
        if (this.field.toView && this.field.toView.value) {
            try {
                viewData = this.field.toView.value.call(this, this.value)
            } catch (e: any) {
                console.error(`Error while toView<${this.path}>: ${e.message}`)
            }
        }
        return html`${unsafeHTML(String(viewData))}`
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
                this.value = this.toInput(operate.value)
            }, { operates: 'write' }))
        }
    }
    getStateValue() {
        return this.toInput(getVal(this.context.store.state, this.field.path))
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
    /**
     * 
     * auto bottom, label 
     * 
     */
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
        ctx.dirty = true
        this.dirty = true
        try {
            const store = this.context.store
            store.update((state) => {
                const newVal = this.toState(toSchemaValue(value, this.schema!))
                setVal(state, path, newVal)
                this.invalidMessage = undefined
            }, {
                flags: ctx.form.seq
            })

        } catch (e: any) {
            this.invalidMessage = e.message
        }
    }
    renderValue() {
        return html`
            ${this.renderInput()}
            ${this.renderHelp()}                    
            ${this.renderError()} 
        `
    }
    render() {
        const ctx = this.context
        this.classs.use(ctx.size, {
            grid: ctx.grid,
            error: this.isShowError(),
            'left-label': ctx.labelPos === 'left' || ctx.viewonly,
            'top-label': ctx.labelPos === 'top' && !ctx.viewonly,
            disable: this.field.enable.value === false,
            viewonly: ctx.viewonly,
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
                    ${when(ctx.viewonly,
                () => this.renderView(),
                () => this.renderValue()
            )}
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
