import { AutoFieldInput, type InputType } from './input';
import type { SchemaTimeWidgetOptions } from 'autostore';

export type AutoFieldTimeOptions = Required<SchemaTimeWidgetOptions>;

export class AutoFieldTime extends AutoFieldInput<SchemaTimeWidgetOptions> {
    getInputType(): InputType {
        return 'time';
    }
    getInitialOptions() {
        return {
            icon: 'time',
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-time': AutoFieldTime;
    }
}

if (!customElements.get('auto-field-time')) {
    customElements.define('auto-field-time', AutoFieldTime);
}
