/**
 * 网址输入组件示例
 * 演示URL网址输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-url")
class WidgetUrlExample extends LitElement {
    state = {
        form: {
            // 基础用法
            website: configurable("", {
                label: "个人网站",
                widget: "url",
                placeholder: "https://example.com",
            }),
            // 必填
            requiredUrl: configurable("", {
                label: "公司官网",
                widget: "url",
                required: true,
                placeholder: "https://your-company.com",
                help: "必填，公司官方网站",
            }),
            // 自定义验证
            strictUrl: configurable("", {
                label: "HTTPS网站",
                widget: "url",
                required: true,
                placeholder: "https://example.com",
                validate: (value: any) => {
                    if (!value) return false;
                    return /^https:\/\/.+\..+$/.test(value);
                },
                errorMessage: "只支持 HTTPS 协议的网址",
            }),
            // 只读
            readonlyUrl: configurable("https://github.com", {
                label: "项目地址",
                widget: "url",
                readOnly: true,
                help: "项目仓库地址不可修改",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">网址输入组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示URL网址输入框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="网址参数演示"> </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'url'</code> 网址组件类型</div>
                        <div>自动验证 URL 格式</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证（如仅HTTPS）</div>
                        <div><code>readOnly</code> 只读模式</div>
                        <div><code>help</code> 帮助提示文本</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-url": WidgetUrlExample;
    }
}

export default WidgetUrlExample;
