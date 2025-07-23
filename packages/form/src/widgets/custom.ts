import { query } from 'lit/decorators.js';
import type { SchemaCustomWidgetOptions } from 'autostore';
import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import { getInputValue } from '@/utils/getInputValue';
import { AutoDropdownField } from '@/field/dropdown';
import { tag } from '@/utils/tag';

export type AutoFieldCustomOptions = Required<SchemaCustomWidgetOptions>;

@tag('auto-field-custom')
export class AutoFieldCustom extends AutoDropdownField<AutoFieldCustomOptions> {
    static styles = [AutoDropdownField.styles] as any;

    selection: any[] = [];

    @query('.container')
    container?: any;

    getInitialOptions() {
        return Object.assign({}, super.getInitialOptions(), {
            placeholder: '请选择',
            dropdown: true,
            inputSelectors: 'input,textarea',
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this._onFieldInput();
    }
    _onFieldInput() {
        this._subscribers.push({
            off: () => {
                this.removeEventListener('input', this.onFieldInput);
                this.removeEventListener('change', this.onFieldInput);
            },
        });
        this.addEventListener('input', this.onFieldInput);
        this.addEventListener('change', this.onFieldInput);
    }
    getInputValue() {
        const inputs = Array.from(this.shadowRoot!.querySelectorAll(this.options.inputSelectors)) as HTMLInputElement[];
        const values = inputs.map((input: HTMLInputElement) => {
            return getInputValue(input);
        });
        return values;
    }
    renderDropdown() {
        const values = this.value.map((v: any) => live(v));
        return html`<div class="container">${this.options.renderContent(values, html)}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-custom': AutoFieldCustom;
    }
}
