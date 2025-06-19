import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
@customElement('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput {
    getInputType(): InputType {
        return "email"
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'email'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail
    }
}
