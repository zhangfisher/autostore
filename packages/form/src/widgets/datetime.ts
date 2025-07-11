import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaDateWidgetOptions } from "autostore"


export type AutoFieldDateTimeOptions = Required<SchemaDateWidgetOptions>
@customElement('auto-field-datetime')
export class AutoFieldDateTime extends AutoFieldInput<AutoFieldDateTimeOptions> {
    getInputType(): InputType {
        return 'datetime-local'
    }
    getInitialOptions() {
        return {
            icon: 'datetime'
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-datetime': AutoFieldDateTime
    }
}
