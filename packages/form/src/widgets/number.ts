import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { repeat } from "lit/directives/repeat.js"
import { templateContent } from "lit/directives/template-content.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"


@customElement('auto-field-number')
export class AutoFieldNumber extends AutoField {

    renderValue() {
        const schema = Object.assign({
            min: '',
            max: '',
            step: 1,
        }, this.schema)
        return html`
            <sl-input 
                slot="value" 
                type="number"
                data-path = ${this.schema!.path}
                .value=${this.value} 
                placeholder=${this.schema!.placeholder || ''}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
                min=${schema.min}
                max=${schema.max}
                step=${schema.step}
            > </sl-input>
    `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-number': AutoFieldNumber
    }
}
