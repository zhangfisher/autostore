import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';
// 类型已内联
export type AutoFieldEmailOptions = Required<any>;
@tag('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput<AutoFieldEmailOptions> {
    getInputType(): InputType {
        return 'email';
    }
    getInitialOptions() {
        return {
            icon: 'email',
        };
    }

    // 在新架构中，验证器应该通过 configurable 的 options.validate 来定义
    // 这里移除旧的 schemas API 调用，改为在 schema 定义时指定验证器
    connectedCallback(): void {
        super.connectedCallback();

        // 如果需要动态添加验证器，应该通过 configManager 来实现
        // 但建议在定义 schema 时就指定验证器：
        // email: configurable('', {
        //     title: '邮箱',
        //     widget: 'email',
        //     validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        //     message: '无效的电子邮件地址'
        // })
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail;
    }
}