import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-dropdown-selector')
export class AutoFieldDropdownSelector extends AutoFieldInput {
    render() {
        return html``
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-dropdown-selector': AutoFieldDropdownSelector
    }
}
