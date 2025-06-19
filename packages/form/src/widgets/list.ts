import { customElement } from "lit/decorators.js"
import { AutoField } from "@/field"
import { css, html } from "lit"

import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { repeat } from "lit/directives/repeat.js";
import { ifDefined } from "lit/directives/if-defined.js";

export type ListItem = {
    id: any
    value?: any
    label?: string
    icon?: string
}

export type AutoListOptions = {
    items: ListItem[]
    idKey: string
    showIcon: boolean
    valueKey: string    // 用于值
    labelKey: string    // 用于显示,默认为label 
    multiple: boolean
    maxItems: number
    minItems: number
}
export type SelectedListItem = {
    id: any
    value: any
    label: any
}

@customElement('auto-field-list')
export class AutoFieldList extends AutoField<AutoListOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-menu-item[checked]{
                background-color: var(--sl-color-primary-100);
            }
        `
    ]
    selection: SelectedListItem[] = []
    idKey: string = 'id'
    valueKey: string = 'id'
    labelKey: string = 'label'
    items: ListItem[] = []
    connectedCallback() {
        super.connectedCallback()
        if (this.field) {
            this.idKey = this.field.idKey.value || 'id'
            this.valueKey = this.field.valueKey.value || this.idKey
            this.labelKey = this.field.labelKey.value || 'label'
            const items = this.field.items.value
            if (items) {
                this.items = items
                this.items.forEach((item: any) => {
                    if (this.isItemSelected(item)) {
                        item.selected = true
                        this.selection.push({
                            id: item[this.idKey],
                            value: item[this.valueKey],
                            label: item.label
                        })
                    }
                })
            }
        }
    }
    isItemSelected(item: any) {
        if (this.value === undefined) return false
        if (this.schema!.multiple === false) {
            return this.value === item[this.valueKey]
        } else {
            return this.value.includes(item[this.valueKey])
        }
    }
    renderList() {
        const values = Array.isArray(this.value) ? this.value : [this.value]
        return html`
        <div class="items">
            <div class="actions before">
                    ${this.renderBeforeActions()}
                </div>    
            <sl-menu>
                ${repeat(this.items, (item: any) => {
            const isSelected = values.includes((item as any)[this.valueKey])
            return html`<sl-menu-item 
                type="checkbox"                
                data-id=${String(item[this.idKey])}
                data-value=${String(item[this.valueKey])}
                .checked=${isSelected}
            >                
                        ${item.label}
                    </sl-menu-item>`
        })}
            </sl-menu>
            <div class="actions after">
                ${this.renderAfterActions()}
            </div>
        </div>
        `
    }
    getInputValue() {
        if (this.field.multiple.value) {
            return this.selection.map(item => item.value)
        } else {
            return this.selection.length > 0 ? this.selection[0].value : undefined
        }
    }
    getShowLabel(item: ListItem) {
        const labelKey = this.field.labelKey.value
        if (labelKey) {
            if (labelKey in item) {
                return (item as any)[labelKey]
            }
        } else {
            return item.label
        }

    }
    renderResults() {
        return html``
    }
    renderInput() {
        return html`<div class="list">
            ${this.renderList()}
            ${this.renderResults()}            
        </div>`
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-list': AutoFieldList
    }
}
