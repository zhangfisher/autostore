import { customElement, query, state } from "lit/decorators.js"
import type { SchemaCustomWidgetOptions } from "autostore"
import { AutoField } from "@/field"
import { css, html } from "lit"
import { when } from "lit/directives/when.js"
import { classMap } from "lit/directives/class-map.js"
import { live } from 'lit/directives/live.js';
import { getInputValue } from "@/utils/getInputValue"

export type AutoFieldCustomOptions = Required<SchemaCustomWidgetOptions>

@customElement('auto-field-custom')
export class AutoFieldCustom extends AutoField<AutoFieldCustomOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-dropdown{
                width: 100%;                
            } 
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: var(--auto-border);
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                min-height: var(--sl-input-height-medium);
                padding: 0px 0.5em;
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                max-height:1rem;
                overflow-y: auto;
                overflow-x: hidden;
                &>.custom-value{
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                }
                sl-tag{
                    margin-right: 0.5em;
                    margin-top: 0.rem;
                    margin-bottom: 0.2em;
                }
            } 
            .container{
                min-height: 1em;
                position: relative;
                border: var(--auto-border);
                background-color: var(--sl-input-background-color);
            }            
            sl-icon.chevron{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
        `
    ] as any


    selection: any[] = []

    getInitialOptions(): Record<string, any> {
        return {
            placeholder: '请选择',
            dropdown: false,
            inputSelectors: 'input,textarea'
        }
    }
    @state()
    active: boolean = false

    @query('.container')
    container?: any


    connectedCallback(): void {
        super.connectedCallback()
        this._onFieldInput()
    }
    _onShowPopup() {
        this.active = true
    }
    _onHidePopup() {
        this.active = false
    }
    _onFieldInput() {
        this._subscribers.push({
            off: () => {
                this.removeEventListener('input', this.onFieldInput)
                this.removeEventListener('change', this.onFieldInput)
            }
        })
        this.addEventListener('input', this.onFieldInput)
        this.addEventListener('change', this.onFieldInput)
    }
    getInputValue() {
        const inputs = Array.from(this.shadowRoot!.querySelectorAll(this.options.inputSelectors)) as HTMLInputElement[]
        const values = inputs.map((input: HTMLInputElement) => {
            return getInputValue(input)
        })
        return values
    }


    renderSelection() {
        return html`    
            <div class="selection" slot="trigger">              
                ${when(!this.value && this.options.placeholder
            , () => html`<span class='placeholder'>${this.options.placeholder}</span>`)}
                <span class="custom-value">
                ${this.options.renderSelection ?
                this.options.renderSelection(this.value, html) : this.value}
                </span>
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${classMap({ active: this.active })}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`
    }
    renderContent() {
        const values = this.value.map((v: any) => live(v))
        return html`<div class="container">
            ${this.options.renderContent(values, html)}
        </div>`
    }

    renderInput() {
        if (this.options.dropdown) {
            return html`
                <sl-dropdown          
                    size="${this.context.size}"
                    @sl-show="${this._onShowPopup.bind(this)}"
                    @sl-after-hide="${this._onHidePopup.bind(this)}"
                    sync="width"
                >
                ${this.renderSelection()}
                ${this.renderContent()}
            </sl-dropdown> 
            `
        } else {
            return html`${this.renderContent()}`
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-custom-dropdown': AutoFieldCustom
    }
}

