import { customElement, state } from "lit/decorators.js"
import type { SchemaIconsWidgetOptions } from "autostore"
import { AutoField } from "@/field"
import { css, html } from "lit"
import { repeat } from "lit/directives/repeat.js"
import { when } from "lit/directives/when.js"
import { classMap } from "lit/directives/class-map.js"

const builtIns = ['help', 'error', 'email', 'search', 'lock', 'user', 'globe', 'date', 'time', 'phone', 'copy', 'remove', 'refresh', 'datetime']

export type AutoFieldIconsOptions = Required<SchemaIconsWidgetOptions>
@customElement('auto-field-icons')
export class AutoFieldIcons extends AutoField<AutoFieldIconsOptions> {
    static styles = [AutoField.styles, css`
        sl-dropdown{
            width: 100%;                
            & >.icons{
                padding: 0.5em;
                box-sizing: border-box;                
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
            }
        } 
        sl-icon::part(svg){
            stroke-width: 1;
        }
        .icons{
            display:flex;
            flex-wrap: wrap;
            gap: 0.5em;
            &>.icon{
                cursor: pointer;
                display: inline-flex;
                &:hover{
                    color: var(--auto-theme-color);
                }
                &.selected{
                    color: var(--auto-theme-color);
                }
            }            
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
                &>.icons{
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                }
            } 
    `] as any

    @state()
    active: boolean = false

    @state()
    selected: string[] = []

    icons: string[] = []

    getInitialOptions() {
        const opts = {
            icons: [],
            size: "24px",
            multiple: false,
            dropdown: false,
            builtIn: true
        }
        return opts
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.icons = Array.isArray(this.options.icons)
            ? this.options.icons
            : (this.options.icons).split(',')
        if (this.options.builtIn) {
            builtIns.forEach((icon) => {
                if (!this.icons.includes(icon)) {
                    this.icons.push(icon)
                }
            })
        }
        this.selected = Array.isArray(this.value) ? this.value : [this.value]
    }
    renderView() {
        return this.renderIcons(this.selected)
    }
    _onShowPopup() {
        this.active = true
    }
    _onHidePopup() {
        this.active = false
    }
    _isSelected(name: string) {
        if (this.options.multiple) {
            return this.selected.includes(name)
        } else {
            return this.selected[0] === name
        }
    }

    _onClickIcon(name: string) {
        if (this.options.multiple) {
            const index = this.selected.findIndex((v) => v === name)
            if (index > -1) {
                this.selected.splice(index, 1)
            } else {
                this.selected.push(name)
            }
            this.onFieldInput()
        } else {
            if (this.selected.length === 0) {
                this.selected.push(name)
            } else {
                this.selected[0] = name
            }
            this.onFieldInput()
        }
    }
    getInputValue() {
        if (this.options.multiple) {
            return this.selected
        } else {
            return this.selected[0]
        }
    }
    renderIcons(icons: string[], highlight: boolean = true) {
        return html`<div class="icons" style="font-size:${this.options.size}">
                ${repeat(icons, (name) => {
            if (name === '') return
            return html`<span 
                class="icon ${highlight && this._isSelected(name) ? 'selected' : undefined}"
                title="${name}"
                @click=${() => this._onClickIcon(name)}
            ><sl-icon name="${name}" size="${this.options.size}"></sl-icon></span>`
        })}</div>`
    }
    renderSelection() {
        return html`<div class="selection" slot="trigger">              
        ${when(this.selected.length === 0 && this.options.placeholder
            , () => html`<span class='placeholder'>${this.options.placeholder}</span>`)}
        ${this.renderIcons(this.selected, false)}
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
                ${this.renderIcons(this.icons)}
            </sl-dropdown> 
            `
        } else {
            return html`${this.renderIcons(this.icons)}`
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-icons': AutoFieldIcons
    }
}
