import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-range')
export class AutoFieldRabge extends AutoField {

    renderInput() {
        return html`              
        <sl-range 
            slot="value" 
            name="${this.name}"
            data-path = ${this.schema!.path}
            value=${this.value} 
            .placeholder=${this.getFieldOption("placeholder")}
            .defaultValue=${this.getFieldOption("defaultValue", this.value)}
            ?disabled=${this.getFieldOption("disabled")}
            .max=${this.getFieldOption("max")}
            .min=${this.getFieldOption("min")}
            .step=${this.getFieldOption("step")}
            .tooltip=${this.getFieldOption("tooltip")}
            .tooltipFormatter=${this.getFieldOption("tooltipFormatter")}
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
