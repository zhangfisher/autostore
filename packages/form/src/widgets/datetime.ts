import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldDateTimeOptions = Required<any>;
@tag('auto-field-datetime')
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
