/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *  
 * 
 */

import { LitElement, html } from 'lit'
import { property, query, queryAssignedElements, state } from 'lit/decorators.js'
import type { AsyncComputedValue, Watcher, SchemaOptions, StateOperate, SchemaWidgetAction } from 'autostore';
import { createAsyncComptuedValue, isAsyncComputedValue, getVal, setVal, toggleWrapper } from '@/utils';
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
import { applyCustomStyles } from '@/utils/applyCustomStyles';
import { applyClass } from '@/utils/applyClass';

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
    // 父字段，当嵌套时         
    parent?: AutoField

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

    /**
     * 是否启用响应式
     * 默认情况下，当字段更新时会自动更新state,并且在state变化时也会同步更新value
     * 
     * =false时则不会监听状态变更
     */
    @property({ type: Boolean, reflect: true })
    noreactive?: boolean = false

    @property({ type: Boolean, reflect: true })
    compact?: boolean

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
    _onClickAction(action: SchemaWidgetAction, callback?: (e: any) => void) {
        return (e: any) => {
            if (typeof (callback) === 'function') {
                callback(e)
            }
            if (action.onClick && typeof (action.onClick) === 'function') {
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
    _renderDropdownAction(action: SchemaWidgetAction) {
        return html`
        <sl-dropdown class='action-widget'  hoist
            title=${ifDefined(action.tips)}
            placement=${action.pos === 'before' ? 'bottom-start' : 'bottom-end'}
        >
            <sl-button slot="trigger" ?caret=${action.caret}>
                ${when(action.icon, () => html`<sl-icon name=${ifDefined(action.icon)}></sl-icon>`)}
                ${action.label}
            </sl-button>
            <sl-menu>   
                ${repeat(action.items || [], (item) => {
            if (item === '-') {
                return html`<sl-divider></sl-divider>`
            }
            if (typeof (item) === 'string') item = { label: item }
            return html`<sl-menu-item  @click=${this._onClickAction.call(this, item, () => {
                if (action.syncMenu) {
                    action.label = item.label
                    action.icon = item.icon
                    action.tips = item.tips
                    this.requestUpdate()
                }
            })}>
                    ${when(item.icon, () => html`<sl-icon name=${ifDefined(item.icon)} slot="prefix"></sl-icon>`)}
                ${item.label}</sl-menu-item>`
        })}
            </sl-menu>
        </sl-dropdown>
        `
    }
    _renderButtonAction(action: SchemaWidgetAction) {
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
    }
    _renderImageAction(action: SchemaWidgetAction) {
        return html`
        <sl-button title="${ifDefined(action.tips)}" variant='text' class='action-widget image' @click=${this._onClickAction.call(this, action)}>                
            <img src="${ifDefined(action.url)}"/>
        </sl-button>
    `
    }
    renderActionWidget(action: SchemaWidgetAction) {
        if (typeof (action) !== 'object') return
        const type = action.type || 'button'
        if (type === 'dropdown') {
            return this._renderDropdownAction(action)
        } else if (type === 'button') {
            return this._renderButtonAction(action)
        } else if (type === 'image') {
            return this._renderImageAction(action)
        } else {

        }
    }
    renderOption(name: string, render?: (value: any) => any) {
        const option = (this.schema as any)[name]
        if (!option) return
        if (option.loading) {
            return html`<sl-spinner></sl-spinner>`
        } else {
            return html`${render ? render(this.options.required) : this.options.required}</div>`
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
        let value: any = this.input.value
        if (typeof (this.options.toState) !== 'function') {
            const datatype = this.options.datatype || 'string'
            if (datatype === 'number') {
                value = Number(value)
            } else if (datatype === 'boolean') {
                value = Boolean(value)
            }
        }
        return value
    }

    _renderRequiredOption() {
        return this.renderOption('required', (val) => {
            return val ? html`<span style='color:red;'>*</span>` : ''
        })
    }

    renderHelp(onlyIcon: boolean = false) {
        const helpText = this.options.help
        if (!helpText) return
        const urlMatches = helpText.match(/\(([^)]+)\)[^)]*$/)
        const url = urlMatches ? urlMatches[1] : null
        const help = url ? helpText.replace(`(${url})`, '') : helpText

        return html`<span class="help" part="field-help" title="${ifDefined(onlyIcon ? help : undefined)}">
            ${toggleWrapper(!!url,
            html`
                <sl-icon name="help"></sl-icon>
                ${when(!onlyIcon, () => html`${help}`)}
            `, (content: any) => html`<a target="_blank" href="${url!}">${content}</a>`
        )} 
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
            return html`<div class="label" part="field-label" style="${ifDefined(styleMap(style))}">
            <span class="title">
                ${this.getLabel()}
                ${when(labelPos === 'left' || ctx.viewonly, () => this.renderHelp(true))}
                ${this._renderRequiredOption()}
            </span>     
            ${when(labelPos === 'top' && !ctx.viewonly, () => this.renderHelp())}
        </div>`
        }
    }
    renderInput() {
        return html``
    }
    isShowError() {
        if (this.context.validAtInit) {
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
            const pathKeys = this.getPath().join("_$_")
            // 监听schema变化,schema什么会变化，当schema成员是一个计算函数时，会在所依赖的状态变化时重新计算而导致变化
            this._subscribers.push(ctx.store.schemas.store.watch(`${pathKeys}.**`, (operate) => {
                const { reply, type, value, flags } = operate
                if (reply) return
                // 
                if (ctx.form.seq === flags) return
                const ops = type === 'batch' ? value : [operate]
                ops.forEach((op: StateOperate) => {
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
            this._subscribers.push(ctx.store.watch(this.getPath().join("."), (operate) => {
                // 当表单change/input时更新时设置flags=form.seq
                // 此时应不需要更新到value，否则会导致死循环
                //if (ctx.form.seq === operate.flags) return
                this.value = this.toInput(operate.value)
            }, { operates: 'write' }))
        }
    }
    getStateValue() {
        return this.toInput(getVal(this.context.store.state, this.getPath()))
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
            this.path = this.getPath().join(".")
            this.name = this.options.name || this.path
            if (this.path in ctx.store.schemas.errors) {
                this.invalidMessage = ctx.store.schemas.errors[this.path]
            }
            if (Array.isArray(this.options.actions)) {
                this.beforeActions = this.options.actions.filter((action) => action.pos === 'before')
                this.afterActions = this.options.actions.filter((action) => action.pos !== 'before')
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
     * 当字段更新时，同步更新表单的类或样
     */
    _updateFormClasss() {
        if (!this.context.form) return
        applyClass(this.context.form, 'dirty', this.dirty)
        applyClass(this.context.form, 'invalid', !!this.invalidMessage)
    }
    /**
     * 当输入框值改变时更新状态
     * @returns 
     */
    _updateFieldValue() {
        if (!this.schema) return
        const path = this.getPath()
        const value = this.toState(this.getInputValue())
        const ctx = this.context
        ctx.dirty = true
        this.dirty = true
        try {
            const store = this.context.store
            if (!this.noreactive) {
                store.update((state) => {
                    const newVal = toSchemaValue(value, this.schema)
                    setVal(state, path, newVal)
                    this.invalidMessage = undefined
                }, {
                    flags: ctx.form.seq
                })
            }
            this.dispatchEvent(new CustomEvent('field-change', {
                detail: {
                    value,
                    options: this.options
                },
                composed: true,
                bubbles: true
            }))
        } catch (e: any) {
            this.invalidMessage = e.message
        } finally {
            this._updateFormClasss()
        }
    }
    renderValue() {
        return html`
            ${this.renderInput()}
            ${when(this.context.viewonly, () => this.renderHelp())}         
            ${this.renderError()} 
        `
    }
    getPath(): string[] {
        return (this.options.path && this.options.path.length === 0)
            ? this.parent?.getPath() as string[]
            : this.options.path
    }
    updated() {
        if (this.options.styles) {
            applyCustomStyles(this.shadow as unknown as HTMLElement, this.options.styles)
        }
    }
    render() {
        const ctx = this.context
        const labelPos = this.options.labelPos ? this.options.labelPos : ctx.labelPos
        this.classs.use(ctx.size, {
            [`${ctx.border}-border`]: true,
            error: this.isShowError(),
            'left-label': labelPos === 'left' || ctx.viewonly,
            'top-label': labelPos === 'top' && !ctx.viewonly,
            disable: this.options.enable === false,
            readonly: ctx.readonly,
            viewonly: ctx.viewonly,
            compact: this.compact === undefined ? ctx.compact : this.compact,
            required: this.options.required === true,
            hidden: !this.options.visible,
            [`view-${ctx.viewAlign}`]: true,
            [`${ctx.layout}-layout`]: true
        })
        return html`           
            <div class="autofield">
                ${this.options.divider ? html`<sl-divider></sl-divider>` : null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
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
