/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *  
 * 
 */

import { LitElement, html } from 'lit'
import { property, query, queryAssignedElements, state } from 'lit/decorators.js'
import type { AsyncComputedValue, Watcher, SchemaOptions, StateOperate, SchemaWidgetAction } from 'autostore';
import { createAsyncComptuedValue, isAsyncComputedValue, getVal, setVal } from 'autostore';
import { consume } from '@lit/context';
import { type AutoFormContext, context } from '../context';
import styles from './styles'
import { toSchemaValue } from '@/utils/toSchemaValue';
import { repeat } from 'lit/directives/repeat.js';
import { ContextController } from '@/controllers/context';
import type { RequiredKeys } from 'flex-tools/types';
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
        visible: true,
        enable: true,
        required: false,
        order: 0,
        advanced: false,
        actions: []
    }
}

export type FieldOptions<Options = unknown> = RequiredKeys<
    Omit<SchemaOptions, 'onFail' | 'onValidate' | 'invalidMessage'>,      // 排除校验相关
    // 一些公共选项
    'visible' | 'enable' | 'required' | 'order' | 'advanced' | 'actions' | 'datatype' | 'widget' | 'name' | 'path'
> & Options



export class AutoField<Options = unknown> extends LitElement {
    static styles = styles
    theme = new ContextController(this)
    classs = new HostClasses(this)

    @property({ type: Object })
    schema?: SchemaOptions & Options

    // 根据schmea生成options
    options: FieldOptions<Options> = getDefaultFieldOptions() as unknown as FieldOptions<Options>

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

    beforeActions: SchemaWidgetAction[] = []
    afterActions: SchemaWidgetAction[] = []

    @queryAssignedElements({ slot: 'value', flatten: true })
    _field!: Array<HTMLElement>;

    _subscribers: Watcher[] = []

    @query('.value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker')
    input!: HTMLInputElement

    @consume({ context })
    @property({ attribute: false })
    public context!: AutoFormContext

    get shadow() {
        return this.shadowRoot!
    }

    /**
     * 转换为AsyncComputedValue 
     */
    getFieldOptions(): FieldOptions<Options> {
        return Object.entries(this.schema || {}).reduce((result: any, [key, value]) => {
            if (isAsyncComputedValue(value)) {
                result[key] = value.value
            } else {
                result[key] = value
            }
            return result
        }, Object.assign({}, getDefaultFieldOptions(), this.getInitialOptions()))
    }

    getPrefix() {

    }
    getSuffix() {

    }
    renderActions(slot: boolean = true) {
        return html`${this.renderBeforeActions(slot)}
                ${this.renderAfterActions(slot)}`
    }
    _onClickAction(action: SchemaWidgetAction) {
        if (action.onClick && typeof (action.onClick) === 'function') {
            return (e: any) => {
                action.onClick?.call(this, this.getInputValue(), {
                    action,
                    options: this.options as SchemaOptions,
                    event: e,
                    update: (value: any) => {
                        setVal(this.context.store.state, this.options.path, value)
                    }
                })
            }
        }
    }
    renderBeforeActions(slot?: boolean) {
        if (Array.isArray(this.beforeActions) && this.beforeActions.length > 0) {
            return html`<div class="actions before" part="before-actions" slot="${ifDefined(slot ? 'prefix' : undefined)}">
            ${repeat(this.beforeActions, (action) => {
                return this.renderActionWidget(action)
            })}</div>`
        }
    }
    renderAfterActions(slot?: boolean) {
        if (Array.isArray(this.afterActions) && this.afterActions.length > 0) {
            return html`<div class="actions after" part="after-actions"  slot="${ifDefined(slot ? 'suffix' : undefined)}">
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
                ${when(action.icon, () => html`<sl-icon name=${ifDefined(action.icon)}></sl-icon>`)}
                ${action.label}
            </sl-button>
        `
        } else if (type === 'image') {
            return html`
            <sl-button title="${ifDefined(action.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this, action)}>                
                <img src="${ifDefined(action.url)}"/>
            </sl-button>
        `
        } else {

        }
    }
    renderOption(name: string, render?: (value: any) => any) {
        const option = (this.schema as any)[name]
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
        if (this.options.toView && typeof (this.options.toView) === 'function') {
            return this.options.toView.call(this, value)
        }
        return value
    }
    toState(value: any) {
        if (this.options.toState && typeof (this.options.toState) === 'function') {
            return this.options.toState.call(this, value)
        }
        return value
    }

    toInput(value: any) {
        if (this.options.toInput && typeof (this.options.toInput) === 'function') {
            return this.options.toInput.call(this, value)
        }
        return value
    }
    getOptionValue(name: string, defaultValue?: any): any {
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

    getOption<T extends keyof typeof this.options>(name: T): AsyncComputedValue<(typeof this.options)[T]> | undefined {
        if (this.schema && name in this.schema) {
            // @ts-ignore
            const value = this.schema[name]
            if (isAsyncComputedValue(value)) {
                return value
            } else {
                return createAsyncComptuedValue(value) as AsyncComputedValue<(typeof this.options)[T]>
            }
        }


    }

    getInputValue(): any {
        if (!this.input) return ''
        const datatype = this.options.datatype || 'string'
        let value: any = this.input.value
        if (datatype === 'number') {
            value = Number(value)
        } else if (datatype === 'boolean') {
            value = Boolean(value)
        }
        return value
    }

    _renderRequiredOption() {
        return this.renderOption('required', (val) => {
            return val ? html`<span style='color:red;padding:2px;'>*</span>` : ''
        })
    }

    renderHelp() {
        const helpText = this.getOptionValue('help')
        if (!helpText) return
        return html`<span class="help">
            <sl-icon name="help"></sl-icon>
            ${ifDefined(this.getOptionValue('help'))}
        </span>`
    }
    renderLabel() {
        const ctx = this.context
        const labelPos = this.options.labelPos || ctx.labelPos
        if (labelPos === 'none') {
            return html``
        } else {
            const style: Record<string, any> = {}
            if ((ctx.labelWidth && labelPos === 'left') || ctx.viewonly) {
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
    onFieldChange() {
        this._updateFieldValue()
    }
    // @ts-ignore
    onFieldInput() {
        this._updateFieldValue()
    }
    /**
     * 当schmeaOption发生变化时
     */
    _handleSchemaChange() {
        const ctx = this.context
        if (ctx?.store && this.schema) {
            const pathKeys = this.options.path.join("_$_")
            // 监听schema变化,schema什么会变化，当schema成员是一个计算函数时，会在所依赖的状态变化时重新计算而导致变化
            this._subscribers.push(ctx.store.schemas.store.watch(`${pathKeys}.**`, (operate) => {
                const { reply, type, value, flags } = operate
                if (reply) return
                // 
                if (ctx.form.seq === flags) return
                const ops = type === 'batch' ? value : [operate]
                ops.forEach((op: StateOperate) => {
                    // const tpath = op.path.length === 2 ? [...op.path.slice(1), 'value'] : op.path.slice(1)
                    const tPath = op.path.slice(1)
                    setVal(this.schema, tPath, op.value);
                    (this.options as any)[tPath[0]] = op.value
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
        if (this.options.toView && this.options.toView) {
            try {
                viewData = this.options.toView.call(this, this.value)
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
        if (ctx?.store && this.schema) {
            this._subscribers.push(ctx.store.watch(this.options.path.join("."), (operate) => {
                // 当表单change/input时更新时设置flags=form.seq
                // 此时应不需要更新到value，否则会导致死循环
                //if (ctx.form.seq === operate.flags) return
                this.value = this.toInput(operate.value)
            }, { operates: 'write' }))
        }
    }
    getStateValue() {
        return this.toInput(getVal(this.context.store.state, this.options.path))
    }
    connectedCallback(): void {
        super.connectedCallback()
        this.updateOptions()
    }
    updateOptions() {
        const ctx = this.context
        if (ctx?.store && this.schema) {
            this.options = this.getFieldOptions()
            this.value = this.getStateValue()
            this._handleSchemaChange()
            this._handleStateChange()
            this.path = this.options.path.join(".")
            this.name = this.options.name || this.path
            if (this.path in ctx.store.schemas.errors) {
                this.invalidMessage = ctx.store.schemas.errors[this.path]
            }
            if (Array.isArray(this.options.actions)) {
                this.beforeActions = this.options.actions.filter((action) => action.position === 'before')
                this.afterActions = this.options.actions.filter((action) => action.position !== 'before')
            }
        }
    }
    getInitialOptions(): Record<string, any> {
        return {}
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this._subscribers.forEach((subscriber) => subscriber.off())
    }
    getLabelPos() {
        return this.options.labelPos || this.context.labelPos
    }
    /**
     * 
     * auto bottom, label 
     * 
     */
    getHelpPos() {
        return this.options.helpPos || this.context.helpPos
    }
    /**
     * 当输入框值改变时更新状态
     * @returns 
     */
    _updateFieldValue() {
        if (!this.schema) return
        const path = this.options.path
        const value = this.toState(this.getInputValue())
        const ctx = this.context
        ctx.dirty = true
        this.dirty = true
        try {
            const store = this.context.store
            store.update((state) => {
                const newVal = toSchemaValue(value, this.schema)
                setVal(state, path, newVal)
                this.invalidMessage = undefined
            }, {
                flags: ctx.form.seq
            })
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value }
            }))

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
            disable: this.options.enable === false,
            readonly: ctx.readonly,
            viewonly: ctx.viewonly,
            required: this.options.required === true,
            hidden: !this.options.visible,
            [`view-${ctx.viewAlign}`]: true
        })
        return html`           
            <div class="autofield">
                ${this.options.divider ? html`<sl-divider></sl-divider>` : null
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
