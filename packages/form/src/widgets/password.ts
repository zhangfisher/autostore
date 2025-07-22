import { AutoFieldInput, type InputType } from './input';
import type { SchemaPasswordWidgetOptions } from 'autostore';

export type AutoFieldPasswordOptions = Required<SchemaPasswordWidgetOptions>;

export class AutoFieldPassword extends AutoFieldInput<AutoFieldPasswordOptions> {
    getInputType(): InputType {
        return 'password';
    }
    getInitialOptions() {
        return {
            icon: 'lock',
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-password': AutoFieldPassword;
    }
}

if (!customElements.get('auto-field-password')) {
    customElements.define('auto-field-password', AutoFieldPassword);
}
