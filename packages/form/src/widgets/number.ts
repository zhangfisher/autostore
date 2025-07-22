import { AutoFieldInput } from './input';
import type { SchemaNumberWidgetOptions } from 'autostore';

export type AutoFieldNumberOptions = Required<SchemaNumberWidgetOptions>;

export class AutoFieldNumber extends AutoFieldInput<AutoFieldNumberOptions> {
    getInputType() {
        return 'number' as any;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-number': AutoFieldNumber;
    }
}

if (!customElements.get('auto-field-number')) {
    customElements.define('auto-field-number', AutoFieldNumber);
}
