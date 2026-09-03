/**
 * 密码输入组件示例
 * 演示密码输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-password")
class WidgetPasswordExample extends LitElement {
    state = {
        form: {
            // 基础用法
            simplePwd: configurable("", {
                label: "简单密码",
                widget: "password",
                placeholder: "请输入密码",
            }),
            // 必填 + 长度限制
            password: configurable("", {
                label: "登录密码",
                widget: "password",
                required: true,
                placeholder: "6-20个字符",
                minLength: 6,
                maxLength: 20,
                help: "必填，6-20个字符",
            }),
            // 带验证函数
            strongPwd: configurable("", {
                label: "强密码",
                widget: "password",
                required: true,
                placeholder: "包含大小写字母和数字",
                validate: (value: any) => {
                    if (!value) return false;
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
                },
                errorMessage: "密码必须包含大小写字母和数字",
            }),
            // 确认密码
            confirmPassword: configurable("", {
                label: "确认密码",
                widget: "password",
                required: true,
                placeholder: "请再次输入密码",
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
            this.store?.watch(() => {
                if (this.stateViewer)
                    this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
            });
            this._syncInitialState();
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">密码输入组件</h3>
                    <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                        演示密码输入框的各种参数配置
                    </p>

                    <auto-form
                        .state="${this.state}"
                        data-label="密码参数演示"
                        style="min-height: 400px;"
                    >
                    </auto-form>

                    <div
                        style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                    >
                        <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                        <div
                            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                        >
                            <div><code>widget: 'password'</code> 密码组件类型</div>
                            <div><code>minLength / maxLength</code> 长度限制</div>
                            <div><code>required</code> 必填标记</div>
                            <div><code>validate</code> 自定义验证（如强密码规则）</div>
                            <div><code>errorMessage</code> 自定义错误信息</div>
                            <div>默认隐藏输入内容，可点击图标切换</div>
                        </div>
                    </div>
                </div>
                <div
                    style="background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column;"
                >
                    <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">
                        📋 实时状态
                    </h4>
                    <textarea
                        id="state-viewer"
                        readonly
                        style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"
                    ></textarea>
                </div>
            </div>
        `;
    }
    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        "example-widget-password": WidgetPasswordExample;
    }
}

export default WidgetPasswordExample;
