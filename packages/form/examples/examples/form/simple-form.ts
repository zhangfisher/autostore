/**
 * 简单表单示例
 * 演示基础的表单创建和绑定功能
 */

import { customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

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
                errorMessage: "邮箱不能为空",
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

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">简单表单示例</h3>
                <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示基本的表单字段创建、必填验证和状态绑定功能
                </p>
                <auto-form
                    .state="${this.userState}"
                    path="user"
                    style="min-height: 400px;"
                ></auto-form>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <sl-button @click="${this._resetForm}" size="small">重置</sl-button>
                    <sl-button @click="${this._validateForm}" variant="neutral" size="small"
                        >验证</sl-button
                    >
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

            // 手动触发所有字段的验证
            if (configManager && store.options.validators) {
                // 遍历所有注册的验证器，触发验证
                Object.keys(store.options.validators).forEach((path) => {
                    const validator = store.options.validators[path];
                    if (validator) {
                        // 获取当前值
                        const pathParts = path.split(".");
                        let currentValue = store.state;
                        for (const part of pathParts) {
                            currentValue = currentValue?.[part];
                        }

                        // 触发验证
                        try {
                            validator.call(store, currentValue, currentValue, pathParts);
                        } catch (e) {
                            // 验证失败，错误会被记录到 configManager.errors
                        }
                    }
                });
            }

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
