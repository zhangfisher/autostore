import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';


@customElement('auto-field-checkbox')
export class AutoFieldCheckbox extends AutoField {

    renderInput() {
        return html`              
        <sl-checkbox 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}            
            class="auto-input"
            .value="${this.value}" 
            .checked=${this.value} 
            placeholder="${ifDefined(this.getFieldOption("placeholder"))}"
            helpText="${ifDefined(this.getFieldOption("help"))}"
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.checkLabel || this.schema!.label}</sl-checkbox> 
        `
    }
    getlabel() {
        return html``
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox': AutoFieldCheckbox
    }
}
