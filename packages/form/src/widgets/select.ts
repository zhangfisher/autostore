import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';


@customElement('auto-field-select')
export class AutoFieldSelect extends AutoField {
    renderInput() {
        const items = this.getFieldOption('select', []).map((item: any) => {
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
            ?multiple=${this.getFieldOption('multiple')}
            ?disabled=${this.getFieldOption('disabled')}
            ?clearable=${this.getFieldOption('clearable', true)}  
            ?filled=${this.getFieldOption('filled')}  
            ?pill=${this.getFieldOption('pill')}  
            ?required=${this.getFieldOption('required')}  
            .placeholder=${this.getFieldOption('placeholder')}  
            .helpText=${this.getFieldOption('help')}  
            .defaultValue=${this.getFieldOption('defaultValue', this.value)}  
            .placement=${this.getFieldOption('placement')}  
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
            ${items.map((item: any) => {
            if (item.type === 'divider') return html`<sl-divider></sl-divider>`
            return html`<sl-option 
                    value="${item.value || item.label}"
                    ${ifDefined(this.getFieldOption('disabled'))}
                >${item.label}</sl-option>`
        })}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-select': AutoFieldSelect
    }
}
