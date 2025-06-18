import { customElement } from "lit/decorators.js"
import { AutoField } from "@/field"

@customElement('auto-field-list-select')
export class AutoFieldListSelect extends AutoField {
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-list-select': AutoFieldListSelect
    }
}
