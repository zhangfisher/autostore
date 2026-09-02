/**
 * 简单表单示例
 * 演示基础的表单创建和绑定功能
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-simple-form")
class SimpleFormExample extends LitElement {
    userState = {
        user: {
            name: configurable("", {
                label: "用户名",
                required: true,
                placeholder: "请输入用户名",
            }),
            email: configurable("", {
                label: "邮箱",
                required: true,
                placeholder: "example@mail.com",
            }),
            age: configurable(25, {
                label: "年龄",
                widget: "number",
                min: 18,
                max: 100,
            }),
            birthday: configurable("1990-01-01", {
                label: "生日",
                widget: "date",
            }),
            gender: configurable("male", {
                label: "性别",
                widget: "radio",
                choices: ["male", "female"],
            }),
            bio: configurable("", {
                label: "个人简介",
                widget: "textarea",
                placeholder: "介绍一下自己...",
            }),
        },
    };

    @query("#state-viewer")
    stateViewer?: any;

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            const form = this.shadowRoot?.querySelector("auto-form");
            if (form && (form as any).activeStore) {
                const store = (form as any).activeStore;
                store.watch(() => {
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(store.state, null, 2);
                    }
                });
                // 初始显示状态
                if (this.stateViewer) {
                    this.stateViewer.value = JSON.stringify(store.state, null, 2);
                }
            }
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">简单表单示例</h3>
                    <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示基本的表单字段创建、必填验证和状态绑定功能
                    </p>
                    <auto-form .state="${this.userState}" path="user" style="min-height: 400px;"></auto-form>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <sl-button @click="${this._resetForm}" size="small">重置</sl-button>
                        <sl-button @click="${this._validateForm}" variant="neutral" size="small">验证</sl-button>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 0;">
                    <form-props-panel id="props-panel"></form-props-panel>
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                        <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                    </div>
                </div>
            </div>
        `;
    }

    private _resetForm() {
        const form = this.shadowRoot?.querySelector("auto-form");
        if (form && (form as any).activeStore) {
            (form as any).activeStore.reset();
        }
    }

    private _validateForm() {
        const form = this.shadowRoot?.querySelector("auto-form");
        if (form && (form as any).activeStore) {
            const store = (form as any).activeStore;
            const configManager = store.configManager;
            const errors = configManager ? configManager.errors : {};
            if (Object.keys(errors).length === 0) {
                alert("表单验证通过！");
            } else {
                alert("表单有错误：\n" + JSON.stringify(errors, null, 2));
            }
        }
    }

    private _syncInitialState() {
        const form = this.shadowRoot?.querySelector("auto-form");
        if (form && (form as any).activeStore && this.stateViewer) {
            this.stateViewer.value = JSON.stringify((form as any).activeStore.state, null, 2);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-simple-form": SimpleFormExample;
    }
}

export default SimpleFormExample;
