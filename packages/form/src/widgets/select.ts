import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-select')
export class AutoFieldSelect extends AutoField {
    renderValue() {
        const items = this.getReactiveOption('select', []).map((item: any, index: number) => {
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
            ?multiple=${this.getReactiveOption('multiple')}
            ?disabled=${this.getReactiveOption('disabled')}
            ?clearable=${this.getReactiveOption('clearable', true)}  
            ?filled=${this.getReactiveOption('filled')}  
            ?pill=${this.getReactiveOption('pill')}  
            ?required=${this.getReactiveOption('required')}  
            .placeholder=${this.getReactiveOption('placeholder')}  
            .helpText=${this.getReactiveOption('help')}  
            .defaultValue=${this.getReactiveOption('defaultValue', this.value)}  
            .placement=${this.getReactiveOption('placement')}  
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
            ${items.map((item: any) => {
            if (item.type === 'divider') return html`<sl-divider></sl-divider>`
            return html`<sl-option 
                    value="${item.value || item.label}"
                    ${ifDefined(this.getReactiveOption('disabled'))}
                >${item.label}</sl-option>`
        })}
        ${this.getPrefix()}${this.getSuffix()}${this.renderActions()}
        </sl-select> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-select': AutoFieldSelect
    }
}
