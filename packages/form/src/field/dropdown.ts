/**
 * 
 * 通供通用的下拉选择组件框架
 * 
 * 
 * 
 * 
 */
import { css, html } from "lit";
import { AutoField } from ".";
import { when } from "lit/directives/when.js";
import { classMap } from "lit/directives/class-map.js";
import { state } from "lit/decorators.js";

export type AutoDropdownFieldOptions = {
    dropdown?: boolean
}


export class AutoDropdownField<Options = unknown> extends AutoField<Options & AutoDropdownFieldOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-dropdown{
                width: 100%;                
            } 
            .placeholder{
                color: var(--auto-border-color);                
                flex-grow: 1; 
            }
            :host>.autofield>.value>.content{
                display: flex;
                flex-direction: row;                
                border: var(--auto-border);
                font-size: var(--auto-font-size);
                color: var(--auto-text-color);
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color); 
                overflow-y: auto;
                overflow-x: hidden;
                &>.dropdown{
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    &>sl-dropdown{
                        &::slotted(*){
                            align-items: center;
                        }
                    }
                }
                &>.actions{
                    display: flex;
                    align-items: center;
                    &>*::part(base){
                        border: 0px;
                        border-radius: 0px;
                    }
                }
                &>.actions.before{                    
                    &>*::part(base){
                        border-right: var(--auto-border);
                    }
                }
                &>.actions.after{
                    &>*::part(base){
                        border-left: var(--auto-border);
                    }
                }
            }
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                color: var(--auto-text-color); 
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                &>.select-value,&>.content{
                    flex-grow: 1; 
                    display: flex;
                    align-items: center;
                    padding: 0 0.5em;
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
                &>.icon{
                    display: flex;
                    align-items: center;
                    font-size: var(--auto-font-size);
                    padding-left: 0.5em;
                }
            } 
            .popoup-container{
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


    @state()
    active: boolean = false

    getInitialOptions() {
        return {
            dropdown: true
        }
    }
    _isEmpty() {
        return Array.isArray(this.value) ? this.value.length === 0 : this.value.trim() === ''
    }

    _renderSelection() {
        return html`<div class="selection" slot="trigger">                    
                    ${when(this.options.icon, () => html`<span class='icon'><sl-icon name="${this.options.icon!}"></sl-icon></span>`)}
                    ${when(this._isEmpty() && this.options.placeholder
            , () => html`<span class='placeholder'>${this.options.placeholder}</span>`
            , () => {
                return html`<span class="select-value">
                                ${this.renderSelection()}
                            </span>`
            }
        )}
                <span class='suffix'>
                    <sl-icon 
                        library="system" 
                        class="chevron ${classMap({ active: this.active })}" 
                        name="chevron-down" 
                        aria-hidden="true">
                    </sl-icon>
                </span>
            </div>       `
    }
    _renderContent() {
        return html`<div class="popoup-container">
            ${this.renderDropdown()}
        </div>`
    }
    renderDropdown() {

    }
    renderSelection() {

    }
    renderInput() {
        if (this.options.dropdown) {
            return html`
            <div class="content">
                ${this.renderBeforeActions(false)}
                <span class="dropdown">
                    <sl-dropdown          
                        size="${this.context.size}"
                        @sl-show="${() => { this.active = true }}"
                        @sl-after-hide="${() => { this.active = false }}"
                        sync="width"
                        distance="10"
                    >
                    ${this._renderSelection()}
                    ${this._renderContent()}
                </sl-dropdown>
            </span>
            ${this.renderAfterActions(false)}
            </div>
            `
        } else {
            return html`${this._renderContent()}`
        }
    }


}