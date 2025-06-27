import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaSearchWidgetOptions } from "autostore"

export type AutoFieldSearchOptions = Required<SchemaSearchWidgetOptions>

@customElement('auto-field-search')
export class AutoFieldSearch extends AutoFieldInput {
    getInputType(): InputType {
        return 'search'
    }
    getInitialOptions(): Record<string, any> {
        return {
            icon: 'search',
            placeholder: 'Search'
        }

    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-search': AutoFieldSearch
    }
}
