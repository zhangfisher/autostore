import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldDateOptions = Required<any>;
@tag('auto-field-date')
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
