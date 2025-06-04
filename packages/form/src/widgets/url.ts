import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"


@customElement('auto-field-url')
export class AutoFieldUrl extends AutoFieldInput {
    getInputType(): InputType {
        return 'url'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-url': AutoFieldUrl
    }
}
