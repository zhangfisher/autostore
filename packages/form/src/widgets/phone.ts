import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaPhoneWidgetOptions } from "autostore"

export type AutoFieldPhoneOptions = Required<SchemaPhoneWidgetOptions>

@customElement('auto-field-phone')
export class AutoFieldPhone extends AutoFieldInput<AutoFieldPhoneOptions> {
    getInputType(): InputType {
        return 'tel'
    }
    getInitialOptions() {
        return {
            icon: 'phone'
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-phone': AutoFieldPhone
    }
}
