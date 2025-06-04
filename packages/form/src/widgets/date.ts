import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { InputType } from "./input"


@customElement('auto-field-date')
export class AutoFieldDate extends AutoField {
    getInputType(): InputType {
        return 'date'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate
    }
}
