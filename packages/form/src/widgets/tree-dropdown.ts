import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement, query, state } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js";
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { classMap } from "lit/directives/class-map.js";
import { AutoFieldTreeSelect, TreeSelectedItem } from "./tree-select";
import { when } from "lit/directives/when.js";

@customElement('auto-field-tree-dropdown')
export class AutoFieldTreeDropdown extends AutoFieldTreeSelect {
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
            .placeholder{
                padding-left: 0.5rem;
                color: var(--sl-input-placeholder-color);
            }
        `] as any

    @state()
    active: boolean = false

    @query('sl-tree')
    tree!: HTMLElement

    _onRemoveSelection(e: any) {
        const id = e.target.dataset.id
        for (let i = 0; i < this.selection.length; i++) {
            if (String(this.selection[i].id) === id) {
                this.selection.splice(i, 1)
                this.onFieldChange()
                this.requestUpdate()
                break
            }
        }
        e.stopPropagation();
    }
    getShowItemValue(value: any, valueKey: string, showKey: string) {
        if (valueKey === showKey) return value

    }
    getSelectedTagValue(value: TreeSelectedItem) {
        const showAsPath = this.field.showAsPath.value
        if (showAsPath) {
            return html`${value.path}`
        } else {
            const paths = value.path.split("/")
            return paths[paths.length - 1]
        }
    }
    renderSelectedTags() {
        const items = this.selection
        return html`<span class="tags">${repeat(items, (item) => {
            return html`<sl-tag 
                    data-id="${item.id}" 
                    title=${item.path}
                    @sl-remove=${this._onRemoveSelection.bind(this)}
                    @click=${(e: any) => e.stopPropagation()}
                    removable
                    >${this.getSelectedTagValue(item)}</sl-tag>`
        })}</span>`
    }
    renderSelection() {
        return html`    
            <div class="selection" slot="trigger">              
                ${when(this.selection.length === 0 && this.field.placeholder
            , () => html`<span class='placeholder'>${this.field.placeholder!.value}</span>`)}
                ${this.renderSelectedTags()}
                <span class='suffix'>
                    <sl-icon library="system" class="chevron ${classMap({ active: this.active })}" 
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
    renderInput() {
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
        'auto-field-tree-dropdown': AutoFieldTreeDropdown
    }
}
