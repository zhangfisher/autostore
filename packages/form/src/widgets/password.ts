import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
import { html } from "lit"

@customElement('auto-field-password')
export class AutoFieldPassword extends AutoFieldInput {

    getInputType() {
        return 'password' as any
    }
    getPrefix() {
        return html`<auto-icon name='lock'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-password': AutoFieldPassword
    }
}
