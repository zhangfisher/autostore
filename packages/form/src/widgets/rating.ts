import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import type { SchemaRatingWidgetOptions } from "autostore";

export type AutoFieldRatingOptions = Required<SchemaRatingWidgetOptions>

@customElement('auto-field-rating')
export class AutoFieldRating extends AutoField<AutoFieldRatingOptions> {
    renderInput() {
        return html`              
        <sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value} 
            .placeholder=${this.options.placeholder}
            ?disabled=${!this.options.enable}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > </sl-rating> 
        `
    }
    renderView() {
        return html`<sl-rating 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value=${this.value}  
            readonly
        > </sl-rating> `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-rating': AutoFieldRating
    }
}
