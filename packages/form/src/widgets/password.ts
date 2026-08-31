import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldPasswordOptions = Required<any>;
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
