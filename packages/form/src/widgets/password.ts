import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType, type AutoFieldInputOptions } from './input';
/**
 * password 无自有配置键，配置词汇与泛型输入框一致（继承 input，inputType 固定 password）
 * password 是 core 已收录键（AutoWidgetPassword，含 camelCase 长度限制），按 ADR-0004 重叠键规则不重复 declare
 */
export type AutoFieldPasswordOptions = AutoFieldInputOptions;
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
