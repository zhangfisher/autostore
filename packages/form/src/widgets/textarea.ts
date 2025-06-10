import type { AutoForm } from "@/form"
import type { SchemaObject } from "autostore"


export function renderTextarea(this: AutoForm, schema: SchemaObject) {

    return
}
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-textarea')
export class AutoFieldTextArea extends AutoField {

    renderValue() {
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
