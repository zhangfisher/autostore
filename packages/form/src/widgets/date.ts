import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-date')
export class AutoFieldDate extends AutoFieldInput {
    getInputType(): InputType {
        return 'date'
    }
    getPrefix() {
        return html`<auto-icon name='date'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate
    }
}
