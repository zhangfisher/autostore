import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-calendar')
export class AutoFieldCalendar extends AutoFieldInput {
    getInputType(): InputType {
        return 'time'
    }
    getPrefix() {
        return html`<auto-icon name='time'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-calendar': AutoFieldCalendar
    }
}
