import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
import { html } from "lit"


@customElement('auto-field-dropdown')
export class AutoFieldDropdown extends AutoFieldInput {
    render() {
        return html``
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-dropdown': AutoFieldDropdown
    }
}
