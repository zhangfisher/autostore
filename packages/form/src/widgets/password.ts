import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
@customElement('auto-field-password')
export class AutoFieldPassword extends AutoFieldInput {

    getInputType() {
        return 'password' as any
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'lock'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-password': AutoFieldPassword
    }
}
