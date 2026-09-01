/**
 * 简单表单示例
 * 演示基础的表单创建和绑定功能
 *
 * 功能说明：
 * - 基础字段：文本、数字、日期等
 * - 必填字段验证
 * - 实时状态预览
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-simple-form")
class SimpleFormExample extends LitElement {
    // 定义状态（推荐的新方式）
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

        // 监听表单组件的内部 store 状态变化
        this.updateComplete.then(() => {
            const form = this.shadowRoot?.querySelector("auto-form");
            if (form && (form as any).activeStore) {
                const store = (form as any).activeStore;
                store.watch(() => {
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(store.state, null, 2);
                    }
                });
            }
        });
    }

    render() {
        return html`
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="margin-bottom: 2rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">简单表单示例</h3>
                    <p style="margin: 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示基本的表单字段创建、必填验证和状态绑定功能
                    </p>
                </div>

                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;"
                >
                    <!-- 表单区域 -->
                    <div>
                        <auto-form
                            .state="${this.userState}"
                            path="user"
                            style="min-height: 400px;"
                        >
                        </auto-form>

                        <!-- 操作按钮 -->
                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <sl-button @click="${this._resetForm}">重置</sl-button>
                            <sl-button @click="${this._validateForm}" variant="neutral"
                                >验证</sl-button
                            >
                        </div>
                    </div>

                    <!-- 状态预览 -->
                    <div
                        style="background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1rem;"
                    >
                        <h4 style="margin: 0 0 1rem 0; color: #fff;">实时状态</h4>
                        <textarea
                            id="state-viewer"
                            readonly
                            style="width: 100%; min-height: 300px; background: #0f172a; color: #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: vertical;"
                        ></textarea>
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
}

declare global {
    interface HTMLElementTagNameMap {
        "example-simple-form": SimpleFormExample;
    }
}

export default SimpleFormExample;
