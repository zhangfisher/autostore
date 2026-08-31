import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldTimeOptions = Required<any>;
@tag('auto-field-time')
export class AutoFieldTime extends AutoFieldInput<any> {
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
