import { state } from 'lit/decorators.js';
import { AutoFieldInput } from './input';
import { html } from 'lit';
import { tag } from '@/utils/tag';
import { repeat } from 'lit/directives/repeat.js';
/**
 * verifycode 短信验证码 widget 的配置类型
 */
export interface AutoFieldVerifyCodeOptions {
    /**
     * 发送验证码请求（点击发送按钮时调用）
     */
    onRequest?: () => void;
    /**
     * 发送按钮文字，默认 "发送验证码"
     */
    sendTips?: string;
    /**
     * 倒计时时长与步进：毫秒数或 [时长, 步进]，默认 60000
     */
    timeout?: number | [number, number];
    /**
     * 倒计时按钮文字模板（{timeout} 为剩余秒数占位），默认 "{timeout}秒后重发"
     */
    template?: string;
}
@tag('auto-field-verifycode')
export class AutoFieldVerifyCode extends AutoFieldInput<AutoFieldVerifyCodeOptions> {
    static styles = [AutoFieldInput.styles];
    @state()
    countdowning: boolean = false;
    timeout: number = 60 * 1000;
    step: number = 1000;
    stepCount: number = 1000;
    // 倒计时按钮当前显示文字：null 表示未在倒计时（显示 sendTips）
    @state()
    countdownLabel: string | null = null;
    // 存储当前计时器的引用，用于清除
    private currentTimer?: number;
    connectedCallback() {
        super.connectedCallback();
        const timeout = this.getOptionValue('timeout', 60 * 1000);
        this.timeout = Array.isArray(timeout) ? Number(timeout[0]) : Number(timeout);
        this.step = Array.isArray(timeout) ? Number(timeout[1]) : 1000;
        this.stepCount = this.timeout / this.step;
    }
    getSendLabel() {
        // 倒计时中显示模板文案，否则显示发送按钮文字
        if (this.countdownLabel !== null) return this.countdownLabel;
        return this.getOptionValue('sendTips', '发送验证码');
    }
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
        if (typeof this.options.onRequest === 'function') {
            this.options.onRequest.call(this);
        }
        // 倒计时文案模板
        const template = this.getOptionValue('template', '{timeout}秒后重发');
        // 开始倒计时
        let remainingSteps = this.stepCount;
        const updateButtonText = () => {
            // 计算剩余秒数并更新按钮文本（countdownLabel 是 @state，自动触发重渲染）
            const remainingSeconds = Math.ceil((remainingSteps * this.step) / 1000);
            this.countdownLabel = template.replace('{timeout}', remainingSeconds.toString());
            // 减少剩余步数
            remainingSteps--;
            // 检查倒计时是否结束
            if (remainingSteps <= 0) {
                // 倒计时结束，恢复按钮文本和状态
                this.countdownLabel = null;
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
    renderAfterActions(slot?: boolean) {
        // 内置发送按钮在渲染时合成（置于用户 after actions 之前），
        // 避免 updateOptions 重建 afterActions 时被清除
        return html`<div
            class="actions after"
            part="after-actions"
            slot="${slot ? 'suffix' : undefined}"
        >
            ${this._renderButtonAction({
                label: this.getSendLabel(),
                variant: this.countdowning ? undefined : 'primary',
                onClick: this.sendRequest.bind(this),
            })}
            ${repeat(this.afterActions, (action) => {
                return this.renderActionWidget(action);
            })}
        </div>`;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // 组件卸载时清除计时器，防止泄漏与对已卸载组件的更新
        if (this.currentTimer) {
            clearTimeout(this.currentTimer);
            this.currentTimer = undefined;
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-verifycode': AutoFieldVerifyCode;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        verifycode: AutoFieldVerifyCodeOptions;
    }
}
