import { AutoField } from "@/field"
import { renderWidget } from "@/utils/renderWidget"
import type { SchemaCombineWidgetOptions } from "autostore"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"


export type AutoFieldCombineOptions = Required<SchemaCombineWidgetOptions>


@customElement('auto-field-combine')
export class AutoFieldCombine extends AutoField<AutoFieldCombineOptions> {
    getInitialOptions() {
        return {
            fields: []
        }
    }
    renderInput() {
        return html`
            <div class="fields">
                ${repeat(this.options.fields, (field) => {
            return html`${renderWidget(field, this)}`
        })}
            </div>
        `

    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-combine': AutoFieldCombine
    }
}
