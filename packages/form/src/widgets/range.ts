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
            .placeholder=${this.getOptionValue("placeholder")}
            .defaultValue=${this.getOptionValue("defaultValue", this.value)}
            ?disabled=${this.getOptionValue("disabled")}
            .max=${this.getOptionValue("max")}
            .min=${this.getOptionValue("min")}
            .step=${this.getOptionValue("step")}
            .tooltip=${this.getOptionValue("tooltip")}
            .tooltipFormatter=${this.getOptionValue("tooltipFormatter")}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-range> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-range': AutoFieldRabge
    }
}
