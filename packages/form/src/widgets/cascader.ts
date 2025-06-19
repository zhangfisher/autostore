import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
import { html } from "lit"


@customElement('auto-field-cascader')
export class AutoFieldCascader extends AutoFieldInput {
    getInputType(): InputType {
        return 'time'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-cascader': AutoFieldCascader
    }
}
