import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-phone')
export class AutoFieldPhone extends AutoFieldInput {
    getInputType(): InputType {
        return 'phone'
    }
    getPrefix() {
        return html`<auto-icon name='phone'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-phone': AutoFieldPhone
    }
}
