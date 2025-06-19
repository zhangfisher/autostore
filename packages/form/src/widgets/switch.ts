import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/switch/switch.js';


@customElement('auto-field-switch')
export class AutoFieldSwitch extends AutoField {
    getFieldOptions() {
        if (!this.schema?.switch) {
            this.schema!.switch = [this.schema?.label, this.schema?.label]
        }
        return super.getFieldOptions()
    }
    renderInput() {
        return html`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            .value=${this.value} 
            ${ifDefined(this.getFieldOption("placeholder"))}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-switch> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-switch': AutoFieldSwitch
    }
}
