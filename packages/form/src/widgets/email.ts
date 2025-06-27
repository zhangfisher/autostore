import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaEmailWidgetOptions } from "autostore"

export type AutoFieldEmailOptions = Required<SchemaEmailWidgetOptions>

@customElement('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput<AutoFieldEmailOptions> {
    getInputType(): InputType {
        return "email"
    }
    getInitialOptions() {
        return {
            icon: 'email'
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail
    }
}
