import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
import { html } from "lit"


@customElement('auto-field-stepper')
export class AutoFieldStepper extends AutoFieldInput {
    render() {
        return html``
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-stepper': AutoFieldStepper
    }
}
