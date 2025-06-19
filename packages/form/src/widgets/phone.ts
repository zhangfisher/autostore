import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
@customElement('auto-field-phone')
export class AutoFieldPhone extends AutoFieldInput {
    getInputType(): InputType {
        return 'phone'
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'phone'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-phone': AutoFieldPhone
    }
}
