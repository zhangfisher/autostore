import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-date')
export class AutoFieldDate extends AutoField {
    renderValue() {
        return html`
            <sl-input 
                slot="value" 
                type="date"
                data-path = ${this.schema!.path}
                .value=${this.value} 
                placeholder=${this.schema!.placeholder || ''}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate
    }
}
