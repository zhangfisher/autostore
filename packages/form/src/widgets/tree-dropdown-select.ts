import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js";
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { classMap } from "lit/directives/class-map.js";
import { AutoFieldTreeSelect } from "./tree-select";

@customElement('auto-field-tree-dropdown-select')
export class AutoFieldTreeDropdownSelect extends AutoFieldTreeSelect {
    static styles = [
        AutoField.styles,
        AutoFieldTreeSelect.styles,
        css`
            sl-dropdown{
                width: 100%;                
            } 
            sl-tree{ 
                background-color: var(--sl-color-neutral-0); 
            }
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: solid var(--sl-input-border-width) var(--sl-input-border-color);
                font-size: var(--sl-input-font-size-medium);
                min-height: var(--sl-input-height-medium);
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                max-height:12rem;
                overflow-y: auto;
                overflow-x: hidden;
                &>.tags{
                    flex-grow: 1;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                sl-tag{
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                }
            } 
            sl-icon{
                transition: all 0.2s ease-in;
                &.active{
                    transform: rotate(-180deg);
                }
            }
        `] as any

    @state()
    active: boolean = false


    _onRemoveSelection(e: any) {
        console.log("remove=", e.target)
    }
    _onActionSelection(e: any) {
        console.log("remove=", e.target)
    }
    getShowItemValue(value: any, valueKey: string, showKey: string) {
        if (valueKey === showKey) return value

    }
    renderSelectedTags() {
        const values = this.selection
        return html`<span class="tags">${repeat(values, (value) => {
            return html`<sl-tag 
                    data-id="${value.id}"
                    title=${value.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    removable>${value.value}</sl-tag>`
        })}</span>`
    }
    renderSelection() {
        return html`    
            <div class="selection" slot="trigger">              
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${classMap({ active: this.active })}" 
                        @click=${this._onActionSelection.bind(this)}
                        name="chevron-down" aria-hidden="true">
                    </sl-icon>
                </span>  
            </div>`
    }
    onSelectionChange(e: CustomEvent) {
        super.onSelectionChange(e)
        this.requestUpdate()
    }

    _onShowPopup() {
        this.active = true
    }
    _onHidePopup() {
        this.active = false
    }
    renderValue() {
        return html`             
        <sl-dropdown 
            @sl-show="${this._onShowPopup.bind(this)}" 
            @sl-after-hide="${this._onHidePopup.bind(this)}" 
            sync="width"
        >
            ${this.renderSelection()}
            <div>
            ${this.renderTree()}            
            </div>
        </sl-dropdown> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-dropdown-select': AutoFieldTreeDropdownSelect
    }
}
