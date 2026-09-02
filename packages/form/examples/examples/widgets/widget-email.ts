/**
 * 邮箱输入组件示例
 * 演示邮箱输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-email")
class WidgetEmailExample extends LitElement {
    state = {
        form: {
            // 基础用法
            email: configurable("", {
                label: "邮箱地址",
                widget: "email",
                placeholder: "example@domain.com",
            }),
            // 必填 + 验证
            requiredEmail: configurable("", {
                label: "工作邮箱",
                widget: "email",
                required: true,
                placeholder: "your.name@company.com",
                help: "必填，用于接收通知",
            }),
            // 自定义验证函数
            strictEmail: configurable("", {
                label: "企业邮箱",
                widget: "email",
                required: true,
                placeholder: "user@company.com",
                validate: (value: any) => {
                    if (!value) return false;
                    // 只允许企业邮箱
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.endsWith("@gmail.com");
                },
                errorMessage: "请输入有效的企业邮箱（不支持gmail）",
            }),
            // 只读
            readonlyEmail: configurable("admin@example.com", {
                label: "系统邮箱",
                widget: "email",
                readOnly: true,
                help: "系统邮箱不可修改",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    @query("#state-viewer")
    stateViewer?: any;

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            this.store?.watch(() => { if (this.stateViewer) this.stateViewer.value = JSON.stringify(this.store.state, null, 2); }); this._syncInitialState();
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">邮箱输入组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示邮箱输入框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="邮箱参数演示" style="min-height: 400px;">
                </auto-form>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                        <div><code>widget: 'email'</code> 邮箱组件类型</div>
                        <div>自动验证 <code>@</code> 和域名格式</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证（如企业邮箱规则）</div>
                        <div><code>readOnly</code> 只读模式</div>
                        <div><code>help</code> 帮助提示文本</div>
                    </div>
                </div>
            </div>
                <div style="background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                    <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-email": WidgetEmailExample;
    }
}

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-widget-email": WidgetEmailExample; } }
export default WidgetEmailExample;
