import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-switch')
export class AutoFieldSwitch extends AutoField {

    renderValue() {
        return html`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            .value=${this.value} 
            ${ifDefined(this.getOptionValue("placeholder"))}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-switch> 
        `
    }
    renderLabel() {
        return html``
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-switch': AutoFieldSwitch
    }
}
