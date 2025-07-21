import { customElement } from "lit/decorators.js"
import type { SchemaNumberWidgetOptions } from "autostore"
import { AutoField } from "@/field"
import { css } from "lit"



export type AutoFieldMarkdownOptions = Required<SchemaNumberWidgetOptions>

@customElement('auto-field-markdown')
export class AutoFieldMarkdown extends AutoField<AutoFieldNumberOptions> {
    static styles = [
        AutoField.styles,
        css``
    ]
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-markdown': AutoFieldMarkdown
    }
}
