import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
import type { SchemaTimeWidgetOptions } from 'autostore';

export type AutoFieldTimeOptions = Required<SchemaTimeWidgetOptions>;

@tag('auto-field-time')
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
