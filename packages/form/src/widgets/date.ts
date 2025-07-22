import { AutoFieldInput, type InputType } from './input';
import type { SchemaDateWidgetOptions } from 'autostore';

export type AutoFieldDateOptions = Required<SchemaDateWidgetOptions>;
export class AutoFieldDate extends AutoFieldInput<AutoFieldDateOptions> {
    getInputType(): InputType {
        return 'date';
    }
    getInitialOptions() {
        return {
            icon: 'date',
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date': AutoFieldDate;
    }
}

if (!customElements.get('auto-field-date')) {
    customElements.define('auto-field-date', AutoFieldDate);
}
