import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"


@customElement('auto-field-time')
export class AutoFieldTime extends AutoFieldInput {
    getInputType(): InputType {
        return 'time'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-time': AutoFieldTime
    }
}
