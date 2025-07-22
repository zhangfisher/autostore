import { AutoFieldInput, type InputType } from './input';
import type { SchemaPhoneWidgetOptions } from 'autostore';

export type AutoFieldPhoneOptions = Required<SchemaPhoneWidgetOptions>;

export class AutoFieldPhone extends AutoFieldInput<AutoFieldPhoneOptions> {
    getInputType(): InputType {
        return 'tel';
    }
    getInitialOptions() {
        return {
            icon: 'phone',
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-phone': AutoFieldPhone;
    }
}

if (!customElements.get('auto-field-phone')) {
    customElements.define('auto-field-phone', AutoFieldPhone);
}
