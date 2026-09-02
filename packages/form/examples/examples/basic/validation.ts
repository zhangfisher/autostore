/**
 * 表单验证示例
 * 演示客户端验证和错误处理
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-validation")
class ValidationExample extends LitElement {
    userState = {
        user: {
            username: configurable("", {
                label: "用户名",
                required: true,
                minLength: 3,
                maxLength: 20,
                placeholder: "3-20个字符",
                validate: (value: any) => {
                    return value.length >= 3 && value.length <= 20;
                },
                errorMessage: "用户名长度必须在3-20个字符之间",
            }),
            email: configurable("", {
                label: "邮箱地址",
                widget: "email",
                required: true,
                placeholder: "example@domain.com",
                validate: (value: any) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                errorMessage: "请输入有效的邮箱地址",
            }),
            age: configurable(18, {
                label: "年龄",
                widget: "number",
                min: 1,
                max: 120,
                validate: (value: any) => {
                    return value >= 1 && value <= 120;
                },
                errorMessage: "年龄必须在1-120之间",
            }),
            phone: configurable("", {
                label: "手机号码",
                widget: "phone",
                required: true,
                maxLength: 11,
                validate: (value: any) => {
                    return /^1[3-9]\d{9}$/.test(value);
                },
                errorMessage: "请输入有效的手机号码（以1开头）",
            }),
            agreed: configurable(false, {
                label: "我同意服务条款和隐私政策",
                widget: "checkbox",
                required: true,
                validate: (value: any) => {
                    return value === true;
                },
                errorMessage: "必须同意服务条款才能继续",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    //@ts-ignore
    @query("#errors-container")
    errorsContainer?: any;

    @query("#state-viewer")
    stateViewer?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (this.store) {
                this.store.watch(() => {
                    this._updateErrors();
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
                    }
                });
                this._syncInitialState();
            }
            // 连接属性面板
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) {
                propsPanel.setTarget(form);
            }
        });
    }

    private _updateErrors() {
        if (this.errorsContainer && this.store) {
            const configManager = this.store.configManager;
            const errors = configManager ? configManager.errors : {};
            if (Object.keys(errors).length > 0) {
                this.errorsContainer.innerHTML = `
                    <div style="background: #fee; border-left: 4px solid #f88; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #c33;">验证错误：</h4>
                        <ul style="margin: 0.5rem 0 0 1rem; padding-left: 1.5rem;">
                            ${Object.entries(errors).map(([field, error]) =>
                                `<li><strong>${field}:</strong> ${error}</li>`
                            ).join("")}
                        </ul>
                    </div>
                `;
            } else {
                this.errorsContainer.innerHTML = "";
            }
        }
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">表单验证示例</h3>
                    <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示客户端验证、错误处理和必填字段验证
                    </p>
                    <div id="errors-container"></div>
                    <auto-form .state="${this.userState}" path="user" style="min-height: 400px;"></auto-form>
                    <!--
                        renderError: 字段内置的错误渲染方法，当验证失败时自动在字段下方显示红色错误提示
                        validAt: 控制校验时机 - 'lost-focus' 失焦时校验 | 'input' 输入时校验
                        通过属性面板可实时切换 validAt 观察效果
                    -->
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <sl-button @click="${this._validate}" variant="primary" size="small">提交验证</sl-button>
                        <sl-button @click="${this._reset}" variant="neutral" size="small">重置</sl-button>
                        <sl-button @click="${this._fillValid}" variant="success" size="small">填充有效数据</sl-button>
                    </div>

                    <div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.875rem;">
                        <h4 style="margin: 0 0 0.5rem 0;">🔍 验证说明</h4>
                        <ul style="margin: 0; padding-left: 1.5rem;">
                            <li><strong>renderError</strong>: 字段内置错误渲染，验证失败时自动在字段下方显示红色错误提示</li>
                            <li><strong>validAt</strong>: 校验时机，<code>lost-focus</code> 失焦时校验 | <code>input</code> 输入时实时校验</li>
                            <li>切换属性面板中的 <code>validAt</code> 可实时观察校验时机变化</li>
                        </ul>
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

    private _validate() {
        if (!this.store) return;
        const errors = this.store.errors;
        if (Object.keys(errors).length > 0) {
            alert("❌ 表单验证失败：\n" + Object.entries(errors).map(([field, error]) => `${field}: ${error}`).join("\n"));
        } else {
            alert("✅ 表单验证通过！");
        }
    }

    private _reset() {
        const form = this.shadowRoot?.querySelector("auto-form");
        if (form && (form as any).activeStore) {
            (form as any).activeStore.reset();
        }
    }

    private _fillValid() {
        if (!this.store) return;
        this.store.update((state: any) => {
            state.user.username = "testuser";
            state.user.email = "test@example.com";
            state.user.age = 25;
            state.user.phone = "13800138000";
            state.user.agreed = true;
        });
    }

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-validation": ValidationExample;
    }
}

export default ValidationExample;
