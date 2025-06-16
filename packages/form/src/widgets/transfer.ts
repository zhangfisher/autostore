import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { AutoField } from "@/field"


@customElement('auto-field-transfer')
export class AutoFieldTransfer extends AutoField {
    render() {
        return html``
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-transfer': AutoFieldTransfer
    }
}
