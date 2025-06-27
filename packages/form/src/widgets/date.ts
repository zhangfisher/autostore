import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaDateWidgetOptions } from "autostore"


export type AutoFieldDateOptions = Required<SchemaDateWidgetOptions>
@customElement('auto-field-date')
export class AutoFieldDate extends AutoFieldInput<AutoFieldDateOptions> {
    getInputType(): InputType {
        return 'date'
    }
    getInitialOptions() {
        return {
            icon: 'date'
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate
    }
}
