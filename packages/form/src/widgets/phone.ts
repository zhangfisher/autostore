import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType, type AutoFieldInputOptions } from './input';
/**
 * phone 无自有配置键，配置词汇与泛型输入框一致（继承 input，inputType 固定 tel）
 */
export type AutoFieldPhoneOptions = AutoFieldInputOptions;
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
/**
 * 向 core 的 Widget 键表合并 phone 键（ADR-0004 模块扩展）
 * core 收录的是 HTML 词汇 tel，form 组件键名是 phone，键名不互相对齐是 ADR-0004 接受的现状
 */
declare module "autostore" {
    interface AutoStoreWidgets {
        phone: AutoFieldPhoneOptions;
    }
}
