import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-url')
export class AutoFieldUrl extends AutoFieldInput {
    getInputType(): InputType {
        return 'url'
    }
    getPrefix() {
        return html`<auto-icon name='globe'  slot="prefix"></auto-icon>`
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-url': AutoFieldUrl
    }
}
