import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-rating')
export class AutoFieldRating extends AutoField {

    renderValue() {
        return html`              
        <sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.schema!.path}
            value=${this.value} 
            .placeholder=${this.getOptionValue("placeholder")}
            .defaultValue=${this.getOptionValue("defaultValue", this.value)}
            ?disabled=${this.getOptionValue("disabled")}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > </sl-rating> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-rating': AutoFieldRating
    }
}
