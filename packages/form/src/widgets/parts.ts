import { AutoField } from "@/field"
import { customElement } from "lit/decorators.js"

@customElement('auto-field-parts')
export class AutoFieldParts extends AutoField {

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-parts': AutoFieldParts
    }
}
