import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { AutoField } from '@/field';
import { css, html } from 'lit';
import type { SchemaTextareaWidgetOptions } from 'autostore';

export type AutoFieldTextAreaOptions = Required<SchemaTextareaWidgetOptions>;

export class AutoFieldTextArea extends AutoField<AutoFieldTextAreaOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-textarea::part(textarea) {
                font-size: var(--auto-font-size);
            }
        `,
    ] as any;
    renderInput() {
        return html`
            <sl-textarea
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                placeholder="${ifDefined(this.options.placeholder)}"
                .minlength=${this.options.minLength}
                .maxlength=${this.options.maxLength}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                ?disabled=${!this.options.enable}
                .rows=${this.options.rows}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.value}</sl-textarea
            >
        `;
    }
    getInitialOptions(): Record<string, any> {
        return {
            rows: 3,
        };
    }
    getInputValue() {
        return this.input.value;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-textarea': AutoFieldTextArea;
    }
}

if (!customElements.get('auto-field-textarea')) {
    customElements.define('auto-field-textarea', AutoFieldTextArea);
}
