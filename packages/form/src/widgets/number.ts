import { tag } from '@/utils/tag';
import { AutoFieldInput } from './input';
import type { SchemaNumberWidgetOptions } from 'autostore';

export type AutoFieldNumberOptions = Required<SchemaNumberWidgetOptions>;

@tag('auto-field-number')
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
