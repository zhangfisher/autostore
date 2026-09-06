import { query, state } from 'lit/decorators.js';
import { AutoFieldInput } from './input';
import { css, html } from 'lit';
import { tag } from '@/utils/tag';
import { repeat } from 'lit/directives/repeat.js';
/**
 * captcha 图片验证码 widget 的配置类型
 */
export interface AutoFieldCaptchaOptions {
    /**
     * 验证码图片地址（刷新时自动附加时间戳防缓存）
     */
    url?: string;
    /**
     * 动态生成验证码图片地址（初始显示与每次刷新时调用）
     * 适合本地生成（如 canvas/svg data URI）或每次刷新需重新获取地址的场景
     */
    onGenerate?: () => string;
    /**
     * 刷新按钮提示文字，默认 "单击刷新验证码"
     */
    tips?: string;
}
@tag('auto-field-captcha')
export class AutoFieldCaptcha extends AutoFieldInput<AutoFieldCaptchaOptions> {
    static styles = [
        AutoFieldInput.styles,
        css`
            sl-button.action-widget.image::part(label) {
                padding: 0px;
            }
            sl-button.action-widget.image img {
                display: block;
                height: 30px;
                width: auto;
                border-radius: var(--sl-border-radius-small, 4px);
            }
        `,
    ];
    @query('img')
    img?: HTMLImageElement;
    @state()
    loading: boolean = false;
    // 当前验证码图片地址：刷新即更新，由渲染合成按钮，不依赖 afterActions 存活
    // （updateOptions 会用 options.actions 重建 afterActions，注入式按钮会被清掉）
    @state()
    captchaUrl: string = '';
    getInitialOptions() {
        return {
            url: '',
            tips: '单击刷新验证码',
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.captchaUrl = this.getCaptchaUrl();
    }
    getCaptchaUrl() {
        // 动态生成优先：本地生成（canvas/svg data URI）或需每次取新地址的场景
        if (typeof this.options.onGenerate === 'function') {
            return this.options.onGenerate.call(this);
        }
        return this.getRefreshUrl();
    }
    getRefreshUrl() {
        const url = this.options.url;
        const [baseUrl, query] = url.split('?');
        // 重建查询参数，保留原有参数并添加时间戳
        const params = new URLSearchParams(query);
        // 添加时间戳参数避免浏览器缓存
        params.set('t', Date.now().toString());
        return `${baseUrl}?${params.toString()}`;
    }
    refreshCaptchaImage() {
        this.captchaUrl = this.getCaptchaUrl();
        this.loading = true;
    }
    updated() {
        // 图片加载完成后聚焦并选中输入，便于直接重新输入
        const img = this.img;
        if (!img) return;
        img.onload = () => {
            this.loading = false;
            this.input?.focus();
            this.input?.select();
        };
        img.onerror = () => {
            console.error('验证码图片加载失败');
            this.loading = false;
        };
    }
    renderAfterActions(slot?: boolean) {
        // 内置图片按钮在渲染时合成（置于用户 after actions 之前），
        // 避免 updateOptions 重建 afterActions 时被清除
        return html`<div
            class="actions after"
            part="after-actions"
            slot="${slot ? 'suffix' : undefined}"
        >
            ${this._renderImageAction({
                type: 'image',
                url: this.captchaUrl,
                tips: this.options.tips,
                onClick: this.refreshCaptchaImage.bind(this),
            })}
            ${repeat(this.afterActions, (action) => {
                return this.renderActionWidget(action);
            })}
        </div>`;
    }
    renderView() {
        return html`${this.value}`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-captcha': AutoFieldCaptcha;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        captcha: AutoFieldCaptchaOptions;
    }
}
