import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"

@customElement('auto-field-number')
export class AutoFieldNumber extends AutoFieldInput {
    getInputType() {
        return 'number' as any
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-number': AutoFieldNumber
    }
}
