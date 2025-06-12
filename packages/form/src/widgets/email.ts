import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput {
    getInputType(): InputType {
        return "email"
    }
    getPrefix() {
        return html`<auto-icon name='email'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail
    }
}
