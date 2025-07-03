import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, query, state } from "lit/decorators.js"
import type { SchemaCustomWidgetOptions } from "autostore"
import { AutoField } from "@/field"
import { css, html } from "lit"
import { when } from "lit/directives/when.js"
import { classMap } from "lit/directives/class-map.js"

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
                    padding-left: 0.5em;
                    padding-right: 0.5em;
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
            dropdown: false
        }
    }
    @state()
    active: boolean = false

    @query('.container')
    container?: any


    content: HTMLElement | null = null

    customValue: any

    connectedCallback(): void {
        super.connectedCallback()
        this.content = this.ownerDocument.querySelector(this.options.content)
        this.customValue = this.value
        this._onCustomInput()
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        if (this.content) {
            this.content.style.display = 'none'
            this.ownerDocument.body.appendChild(this.content)
        }
    }

    _onShowPopup() {
        if (this.content) {
            this.container?.appendChild(this.content);
            this.content.style.display = 'block'
        }
        this.active = true
    }
    _onHidePopup() {
        this.active = false
    }
    /**
     * 
     */
    _onCustomInput() {
        this.content?.addEventListener('auto-input', (e: Event) => {
            // @ts-ignore
            this.customValue = e.detail.value
            this.onFieldInput()
        })
    }

    firstUpdated() {
        if (this.content && !this.options.dropdown) {
            const valueEle = this.shadow.querySelector('.value')
            if (valueEle) {
                valueEle.appendChild(this.content);
            }
            this.content.style.display = 'block'
        }
    }

    getInputValue() {
        return this.customValue
    }

    renderCustomValue() {
        return html`<span class="custom-value">${unsafeHTML(this.options.toRender ? this.options.toRender(this.customValue) : this.customValue)}</span>`
    }
    renderSelection() {
        return html`    
            <div class="selection" slot="trigger">              
                ${when(!this.customValue && this.options.placeholder
            , () => html`<span class='placeholder'>${this.options.placeholder}</span>`)}
                ${this.renderCustomValue()}
                <span class='suffix'>
                    <sl-icon library="system" 
                        class="chevron ${classMap({ active: this.active })}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`
    }
    renderCustom() {
        return html`<div class="container"></div>`
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
                ${this.renderCustom()}      
            </sl-dropdown> 
            `
        } else {
            return html``
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-custom-dropdown': AutoFieldCustom
    }
}
