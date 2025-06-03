import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-checkbox')
export class AutoFieldCheckbox extends AutoField {

    renderValue() {
        return html`              
        <sl-checkbox 
            slot="value" 
            data-path = ${this.schema!.path}
            .value=${this.value} 
            placeholder=${this.schema!.placeholder || ''}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.title}</sl-checkbox> 
        `
    }
    renderLabel() {
        return html``
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox': AutoFieldCheckbox
    }
}
