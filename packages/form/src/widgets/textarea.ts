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
            data-path = ${this.schema!.path.join('.')}
            value=${this.value} 
            placeholder=${this.getFieldOption('placeholder')}
            .rows=${this.getFieldOption('rows')}
            minlength=${this.getFieldOption('minLength')}
            maxlength=${this.getFieldOption('maxLength')}
            .autocorrect=${this.getFieldOption('autocorrect')}
            .autocomplete=${this.getFieldOption('autocomplete')}
            ?autofocus=${this.getFieldOption('autofocus')}
            .rows=${this.getFieldOption('rows')}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-textarea> 
        `
    }
    getInputValue() {
        return this.input!.textContent
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-textarea': AutoFieldTextArea
    }
}
