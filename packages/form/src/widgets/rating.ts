import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-rating')
export class AutoFieldRating extends AutoField {

    renderInput() {
        return html`              
        <sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.schema!.path}
            value=${this.value} 
            .placeholder=${this.getFieldOption("placeholder")}
            .defaultValue=${this.getFieldOption("defaultValue", this.value)}
            ?disabled=${this.getFieldOption("disabled")}
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
