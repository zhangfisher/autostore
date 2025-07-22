import { query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import type { SchemaCaptchaWidgetOptions } from 'autostore';

export type AutoFieldCaptchaOptions = Required<SchemaCaptchaWidgetOptions>;

export class AutoFormTabs extends LitElement {
    static styles = css``;
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-tabs': AutoFormTabs;
    }
}
if (!customElements.get('auto-form-tabs')) {
    customElements.define('auto-form-tabs', AutoFormTabs);
}
