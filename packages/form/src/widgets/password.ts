import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
import type { SchemaPasswordWidgetOptions } from 'autostore';

export type AutoFieldPasswordOptions = Required<SchemaPasswordWidgetOptions>;

@tag('auto-field-password')
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
