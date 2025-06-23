import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"


@customElement('auto-field-calendar')
export class AutoFieldCalendar extends AutoFieldInput {
    getInputType(): InputType {
        return 'time'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-calendar': AutoFieldCalendar
    }
}
