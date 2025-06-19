import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-textarea')
export class AutoFieldTextArea extends AutoField {

    renderInput() {
        return html`              
        <sl-textarea 
            slot="value"             
            name=${this.schema!.name || this.schema!.path.join('.')} 
            data-path = ${this.schema!.path}
            value=${this.value} 
            placeholder=${this.schema!.placeholder || ''}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-textarea> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-textarea': AutoFieldTextArea
    }
}
