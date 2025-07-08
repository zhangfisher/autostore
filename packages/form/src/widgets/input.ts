import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import type { SchemaInputWidgetOptions, SchemaWidgetAction, SchemaWidgetSelectItem } from 'autostore';

export type InputType = "number" | "date" | "time" | "url" | "password" | "email" | "search" | "text" | "datetime-local" | "tel"

export type AutoFieldInputOptions = Required<SchemaInputWidgetOptions>

@customElement('auto-field-input')
export class AutoFieldInput<Options = AutoFieldInputOptions> extends AutoField<AutoFieldInputOptions & Options> {
    static styles = [
        AutoField.styles,
        css`
            .actions{
                margin-right:0px;
                display:flex;
                flex-direction:row;
                align-items:center; 
            }
            .actions > sl-button{
                margin:0px;            
            }
            
            .actions.before{
                margin-left: 0px;
            }
            .actions.before  sl-button::part(base){
                border-left:none;
                border-radius: 0px;
            } 
            .actions.after  sl-button::part(base){
                border-right:none;
                border-radius: 0px;
            } 
    `] as any

    connectedCallback(): void {
        super.connectedCallback()
        this._initPrefixAndSuffix()
    }
    getInputType(): InputType {
        return this.options.inputType || "input"
    }

    getInitialOptions(): Record<string, any> {
        return {
            inputType: 'input'
        }
    }
    getPrefix() {
        if (this.options.icon) {
            return html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`
        }
    }
    renderDropdown() {

    }

    // 输入前后缀
    _prefix: string = ''
    _suffix: string = ''
    /**
     * 当数据类型是字符串时，且提供
     *  options.prefix
     *  options.suffix
     * 时在值前后自动添加前后缀
     */
    _initPrefixAndSuffix() {
        const getLabels = (p: any[]) => {
            return p.map(v => {
                return typeof (v) === 'string' ? v : v.value || v.label
            })
        }

        const add = (actions: SchemaWidgetAction[], affixs: (string | SchemaWidgetAction)[], before: boolean = true) => {
            if (Array.isArray(affixs) && affixs.length > 0) {
                const labels = getLabels(affixs)
                let selIndex: number = -1
                labels.some((p, index: number) => {
                    if ((before && this.value.startsWith(p)) || (!before && this.value.endsWith(p))) {
                        if (before) {
                            this._prefix = p
                            this.value = this.value.substring(p.length)
                        } else {
                            this._suffix = p
                            this.value = this.value.substring(0, this.value.length - p.length)
                        }
                        selIndex = index
                        return true
                    }
                })

                // 提供默认                

                //@ts-ignore
                const actionLabel = selIndex === -1 ? '?' : (typeof (affixs[selIndex]) === 'string' ? affixs[selIndex] : affixs[selIndex].label)

                const action = {
                    type: affixs.length === 1 ? 'button' : 'dropdown',
                    label: actionLabel,
                    caret: !before
                } as SchemaWidgetSelectItem

                if (action.type === 'dropdown') {
                    action.items = affixs.map(affix => {
                        if (affix === '-') return affix
                        affix = typeof (affix) === 'string' ? { label: affix } : affix
                        affix.onClick = () => {
                            if (before) {
                                this._prefix = affix.value ?? affix.label
                            } else {
                                this._suffix = affix.value ?? affix.label
                            }
                            this.onFieldChange()
                        }
                        return affix
                    })
                } else { // 仅有一个选项时显示按钮
                    if (typeof (affixs[0]) === 'string') {
                        action.label = affixs[0]
                    } else {
                        Object.assign(action, affixs[0])
                    }
                }
                action.syncMenu = true
                action.pos = before ? 'before' : 'after'

                if (before) {
                    actions.splice(0, 0, action)
                } else {
                    actions.push(action)
                }
            }
        }
        if (this.options.prefix) {
            add(this.beforeActions, this.options.prefix)
        }
        if (this.options.suffix) {
            add(this.afterActions, this.options.suffix, false)
        }
    }

    onInputChange(e: Event) {
        const event = e.type
        if (this.context.validAt === 'input' && event.includes('input')) {
            this.onFieldInput()
        } else if (event.includes('change')) {
            this.onFieldChange()
        }
    }

    renderInput() {
        return html`
            <sl-input 
                slot="value" 
                type="${this.getInputType()}"
                .value=${this.value} 
                name=${this.name} 
                data-path = ${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}                
                size=${this.context.size} 
                placeholder=${ifDefined(this.options.placeholder)}
                pattern=${ifDefined(this.options.pattern)}
                minLength=${ifDefined(this.options.minLength)}
                maxLength=${ifDefined(this.options.maxLength)}
                ?disabled=${!this.options.enable}                
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                spellcheck=${ifDefined(this.options.spellcheck)}
            >
            ${this.renderActions()}${this.getPrefix()}${this.getSuffix()}</sl-input>
        `
    }

    toState(value: any) {
        let val = super.toState(value)
        if (typeof (val) === 'string') {
            if (this._prefix) {
                val = this._prefix + val
            }
            if (this._suffix) {
                val = val + this._suffix
            }
        }
        return val
    }
    toInput(value: any) {
        let val = super.toInput(value)
        if (typeof (val) === 'string') {
            if (this._prefix && val.startsWith(this._prefix)) {
                val = val.substring(this._prefix.length)
            }
            if (this._suffix && val.endsWith(this._suffix)) {
                val = val.substring(0, val.length - this._suffix.length)
            }
        }
        return val
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}
