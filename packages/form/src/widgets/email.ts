import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"


@customElement('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput {
    getInputType(): InputType {
        return "email"
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail
    }
}
