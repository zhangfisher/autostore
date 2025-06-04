import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-select')
export class AutoFieldSelect extends AutoField {
    renderValue() {
        const items = this.getSchemaItemValue('select', []).map((item: any, index: number) => {
            const selectItem: any = {}
            if (typeof (item) === 'object') {
                Object.assign(selectItem, item)
            } else {
                if (typeof (item) === 'string' && item.startsWith('-')) {
                    Object.assign(selectItem, ({ type: 'divider' }))
                } else {
                    Object.assign(selectItem, ({ label: item }))
                }
            }
            return selectItem
        })
        return html`              
        <sl-select
            name="${this.name}"
            data-path="${this.path}"
            value="${this.value}"           
            ?multiple=${this.getSchemaItemValue('multiple')}
            ?disabled=${this.getSchemaItemValue('disabled')}
            ?clearable=${this.getSchemaItemValue('clearable', true)}  
            ?filled=${this.getSchemaItemValue('filled')}  
            ?pill=${this.getSchemaItemValue('pill')}  
            ?required=${this.getSchemaItemValue('required')}  
            .placeholder=${this.getSchemaItemValue('placeholder')}  
            .helpText=${this.getSchemaItemValue('help')}  
            .defaultValue=${this.getSchemaItemValue('defaultValue', this.value)}  
            .placement=${this.getSchemaItemValue('placement')}  
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
            ${items.map((item: any) => {
            if (item.type === 'divider') return html`<sl-divider></sl-divider>`
            return html`<sl-option 
                    value="${item.value || item.label}"
                    ${ifDefined(this.getSchemaItemValue('disabled'))}
                >${item.label}</sl-option>`
        })}
        </sl-select> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-select': AutoFieldSelect
    }
}
