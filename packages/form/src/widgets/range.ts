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
            .placeholder=${this.getReactiveOption("placeholder")}
            .defaultValue=${this.getReactiveOption("defaultValue", this.value)}
            ?disabled=${this.getReactiveOption("disabled")}
            .max=${this.getReactiveOption("max")}
            .min=${this.getReactiveOption("min")}
            .step=${this.getReactiveOption("step")}
            .tooltip=${this.getReactiveOption("tooltip")}
            .tooltipFormatter=${this.getReactiveOption("tooltipFormatter")}
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
