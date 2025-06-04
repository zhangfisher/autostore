import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-range')
export class AutoFieldRabge extends AutoField {

    renderValue() {
        return html`              
        <sl-range 
            slot="value" 
            name="${this.name}"
            data-path = ${this.schema!.path}
            value=${this.value} 
            .placeholder=${this.getSchemaItemValue("placeholder")}
            .defaultValue=${this.getSchemaItemValue("defaultValue", this.value)}
            ?disabled=${this.getSchemaItemValue("disabled")}
            .max=${this.getSchemaItemValue("max")}
            .min=${this.getSchemaItemValue("min")}
            .step=${this.getSchemaItemValue("step")}
            .tooltip=${this.getSchemaItemValue("tooltip")}
            .tooltipFormatter=${this.getSchemaItemValue("tooltipFormatter")}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.title}</sl-range> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-range': AutoFieldRabge
    }
}
