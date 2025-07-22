import { AutoFieldInput, type InputType } from './input';
import type { SchemaDateWidgetOptions } from 'autostore';

export type AutoFieldDateTimeOptions = Required<SchemaDateWidgetOptions>;
export class AutoFieldDateTime extends AutoFieldInput<AutoFieldDateTimeOptions> {
    getInputType(): InputType {
        return 'datetime-local';
    }
    getInitialOptions() {
        return {
            icon: 'datetime',
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-datetime': AutoFieldDateTime;
    }
}

if (!customElements.get('auto-field-datetime')) {
    customElements.define('auto-field-datetime', AutoFieldDateTime);
}
