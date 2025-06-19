import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"


@customElement('auto-field-time')
export class AutoFieldTime extends AutoFieldInput {
    getInputType(): InputType {
        return 'time'
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'time'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-time': AutoFieldTime
    }
}
