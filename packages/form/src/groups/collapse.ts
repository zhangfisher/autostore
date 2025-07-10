import { customElement, query, state } from "lit/decorators.js"
import { css, html, LitElement } from "lit"
import type { SchemaCaptchaWidgetOptions } from "autostore"

export type AutoFieldCaptchaOptions = Required<SchemaCaptchaWidgetOptions>

@customElement('auto-form-collapse')
export class AutoFormCollapse extends LitElement {
    static styles = css``
}



declare global {
    interface HTMLElementTagNameMap {
        'auto-field-collapse': AutoFormCollapse
    }
}
