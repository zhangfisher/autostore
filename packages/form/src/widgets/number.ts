import { tag } from '@/utils/tag';
import { AutoFieldInput } from './input';
// 类型已内联
export type AutoFieldNumberOptions = Required<any>;
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
