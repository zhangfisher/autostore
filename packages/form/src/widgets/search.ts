import { customElement } from "lit/decorators.js"
import { AutoFieldInput, InputType } from "./input"
@customElement('auto-field-search')
export class AutoFieldSearch extends AutoFieldInput {
    getInputType(): InputType {
        return 'search'
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'search'
        }
        return super.getFieldOptions()
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-search': AutoFieldSearch
    }
}
