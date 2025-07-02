import { customElement, query, state } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
import { css, html } from "lit"
import type { SchemaCaptchaWidgetOptions } from "autostore"

export type AutoFieldCaptchaOptions = Required<SchemaCaptchaWidgetOptions>

@customElement('auto-field-captcha')
export class AutoFieldCaptcha extends AutoFieldInput<AutoFieldCaptchaOptions> {
    static styles = [
        AutoFieldInput.styles,
        css`
            sl-button.action-widget.image::part(label){
                padding: 0px;
            }
        `
    ]
    @query('img')
    img?: HTMLImageElement

    @state()
    loading: boolean = false

    getInitialOptions() {
        return {
            url: '',
            tips: '单击刷新验证码'
        }
    }
    getRefreshUrl() {
        const url = this.options.url
        const [baseUrl, query] = url.split('?');
        // 重建查询参数，保留原有参数并添加时间戳
        const params = new URLSearchParams(query);
        // 添加时间戳参数避免浏览器缓存 
        params.set('t', Date.now().toString());
        return `${baseUrl}?${params.toString()}`;
    }
    refreshCaptchaImage() {
        if (!this.img) return;
        this.img.src = this.getRefreshUrl()
        this.img.onerror = () => {
            console.error('验证码图片加载失败');
            this.loading = false;
            this.input?.focus();
            this.input?.select();
        };
        this.img.onload = () => {
            this.loading = false;
            this.input?.focus();
            this.input?.select();
        };
        this.loading = true;
    }
    connectedCallback() {
        super.connectedCallback()
        this.afterActions.unshift({
            type: 'image',
            url: this.options.url,
            tips: this.options.tips,
            onClick: this.refreshCaptchaImage.bind(this)
        })

    }
    renderView() {
        return html`${this.value}`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-captcha': AutoFieldCaptcha
    }
}
