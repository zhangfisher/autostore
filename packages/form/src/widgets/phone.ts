import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldPhoneOptions = Required<any>;
@tag('auto-field-phone')
export class AutoFieldPhone extends AutoFieldInput<AutoFieldPhoneOptions> {
    getInputType(): InputType {
        return 'tel';
    }
    getInitialOptions() {
        return {
            icon: 'phone',
        };
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-phone': AutoFieldPhone;
    }
}
