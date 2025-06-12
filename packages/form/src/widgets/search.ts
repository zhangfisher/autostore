import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-search')
export class AutoFieldSearch extends AutoFieldInput {
    getInputType(): InputType {
        return 'search'
    }
    getPrefix() {
        return html`<auto-icon name='search'  slot="prefix"></auto-icon>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-search': AutoFieldSearch
    }
}
