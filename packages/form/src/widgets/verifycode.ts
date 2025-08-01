import { state } from 'lit/decorators.js';
import { AutoFieldInput } from './input';
import type { SchemaVerifyCodeWidgetOptions } from 'autostore';
import { tag } from '@/utils/tag';

// 短信验证码

export type AutoFieldVerifyCodeOptions = SchemaVerifyCodeWidgetOptions;

@tag('auto-field-verifycode')
export class AutoFieldVerifyCode extends AutoFieldInput<AutoFieldVerifyCodeOptions> {
    static styles = [AutoFieldInput.styles];

    @state()
    countdowning: boolean = false;

    timeout: number = 60 * 1000;
    step: number = 1000;
    stepCount: number = 1000;

    // 存储当前计时器的引用，用于清除
    private currentTimer?: number;

    @state()
    template!: string;

    sendRequest() {
        if (this.countdowning) return;
        // 清除现有的计时器（如果有的话）
        if (this.currentTimer) {
            clearTimeout(this.currentTimer);
            this.currentTimer = undefined;
        }

        // 设置倒计时状态
        this.countdowning = true;

        // 调用实际的请求处理函数
        // @ts-ignore
        if (this.options.onRequest && typeof (this.options.onRequest === 'function')) {
            // @ts-ignore
            this.options.onRequest.call(this);
        }

        // 开始倒计时
        let remainingSteps = this.stepCount;

        // 更新按钮文本
        const updateButtonText = () => {
            // 计算剩余秒数
            const remainingSeconds = Math.ceil((remainingSteps * this.step) / 1000);

            // 更新按钮文本
            if (this.afterActions && this.afterActions.length > 0) {
                this.afterActions[0].label = this.template.replace('{timeout}', remainingSeconds.toString());
                this.requestUpdate();
            }

            // 减少剩余步数
            remainingSteps--;

            // 检查倒计时是否结束
            if (remainingSteps <= 0) {
                // 倒计时结束，恢复按钮文本和状态
                if (this.afterActions && this.afterActions.length > 0) {
                    this.afterActions[0].label = this.getOptionValue('sendTips', '发送验证码');
                    this.requestUpdate();
                }
                this.countdowning = false;
                this.currentTimer = undefined;
            } else {
                // 继续倒计时
                this.currentTimer = window.setTimeout(updateButtonText, this.step);
            }
        };

        // 开始倒计时
        updateButtonText();
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.afterActions) {
            this.afterActions = [];
        }
        this.afterActions!.unshift({
            id: 'send',
            label: this.getOptionValue('sendTips', '发送验证码'),
            onClick: this.sendRequest.bind(this),
        });
        const timeout = this.getOptionValue('timeout', 60 * 1000);
        this.timeout = Array.isArray(timeout) ? Number(timeout[0]) : Number(timeout);
        this.step = Array.isArray(timeout) ? Number(timeout[1]) : 1000;
        this.stepCount = this.timeout / this.step;
        this.template = this.getOptionValue('template', '{timeout}秒后重发');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-verifycode': AutoFieldVerifyCode;
    }
}
