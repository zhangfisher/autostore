import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"

@customElement('auto-field-date')
export class AutoFieldDate extends AutoFieldInput {
    getInputType(): InputType {
        return 'date'
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'date'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate
    }
}
