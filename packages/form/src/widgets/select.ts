import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import type { SchemaSelectWidgetOptions } from 'autostore';

export type AutoFieldSelectOptions = Required<SchemaSelectWidgetOptions>

@customElement('auto-field-select')
export class AutoFieldSelect extends AutoField<AutoFieldSelectOptions> {
    valueKey: string = 'value'
    labelKey: string = 'label'
    getInitialOptions(): Record<string, any> {
        return {
            valueKey: 'value',
            labelKey: 'label',
            select: [],
            multiple: false,
            clearable: true,
            maxOptionsVisible: 0,
            placement: 'top'
        }
    }
    renderInput() {
        const items = this.options.select.map((item: any) => {
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
            value="${this.getValue()}"           
            ?multiple=${this.options.multiple}
            ?disabled=${!this.options.enable}
            ?clearable=${this.options.clearable}  
            ?filled=${this.options.filled}  
            ?pill=${this.options.pill}  
            ?required=${this.options.required}  
            placeholder="${ifDefined(this.options.placeholder)}" 
            .maxOptionsVisible=${this.options.maxOptionsVisible}  
            help-text="${ifDefined(this.options.help)}"  
            .placement=${this.options.placement}  
            @sl-input=${this.onFieldInput.bind(this)}
         >
            ${items.map((item: any) => {
            if (item.type === 'divider') return html`<sl-divider></sl-divider>`
            return html`<sl-option 
                    value="${item[this.valueKey] || item.label}"
                    ?disabled=${!this.options.enable}
                >${item[this.labelKey]}</sl-option>`
        })}
        ${this.renderBeforeActions()}
        ${this.renderAfterActions()}
        </sl-select> 
        `
    }

    getValue() {
        return this.options.multiple ? this.value.join(' ') : this.value
    }
    getInputValue() {
        if (this.options.multiple) {
            return Array.isArray(this.input.value) ? this.input.value : this.input.value.split(' ')
        } else {
            return this.input.value
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-select': AutoFieldSelect
    }
}
