/**
 * 表单验证示例
 * 演示客户端验证和错误处理
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
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
                pattern: "^1[3-9]\\d{9}$",
                maxLength: 11,
                validate: (value: any) => {
                    return /^1[3-9]\\d{9}$/.test(value);
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

    connectedCallback(): void {
        super.connectedCallback();

        // 等待表单组件渲染完成，然后监听内部 store 状态变化
        this.updateComplete.then(() => {
            const form = this.shadowRoot?.querySelector("auto-form");
            if (form && (form as any).activeStore) {
                const store = (form as any).activeStore;
                store.watch(() => {
                    this._updateErrors(store);
                });
            }
        });
    }

    private _updateErrors(store: any) {
        if (this.errorsContainer) {
            const configManager = store.configManager;
            const errors = configManager ? configManager.errors : {};
            if (Object.keys(errors).length > 0) {
                this.errorsContainer.innerHTML = `
					<div style="background: #fee; border-left: 4px solid #f88; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
						<h4 style="margin: 0 0 0.5rem 0; color: #c33;">验证错误：</h4>
						<ul style="margin: 0.5rem 0 0 1rem; padding-left: 1.5rem;">
							${Object.entries(errors)
                                .map(
                                    ([field, error]) =>
                                        `<li><strong>${field}:</strong> ${error}</li>`,
                                )
                                .join("")}
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
            <div style="max-width: 700px; margin: 0 auto; padding: 1rem;">
                <h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">表单验证示例</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示客户端验证、错误处理和必填字段验证
                </p>

                <!-- 错误显示区域 -->
                <div id="errors-container"></div>

                <auto-form path="user" style="min-height: 500px;"> </auto-form>

                <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <sl-button @click="${this._validate}" variant="primary">
                        <sl-icon name="check-circle" slot="prefix"></sl-icon>
                        提交验证
                    </sl-button>
                    <sl-button @click="${this._reset}" variant="neutral">
                        <sl-icon name="refresh" slot="prefix"></sl-icon>
                        重置表单
                    </sl-button>
                    <sl-button @click="${this._fillValid}" variant="success">
                        <sl-icon name="pencil" slot="prefix"></sl-icon>
                        填充有效数据
                    </sl-button>
                </div>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">✨ 验证类型说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;"
                    >
                        <div>
                            <strong>必填验证</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>required: true</code> 标记必填字段
                            </p>
                        </div>
                        <div>
                            <strong>长度验证</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>minLength/maxLength</code> 或正则表达式
                            </p>
                        </div>
                        <div>
                            <strong>自定义验证</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>validate</code> 函数进行复杂验证
                            </p>
                        </div>
                        <div>
                            <strong>错误提示</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>errorMessage</code> 自定义错误信息
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private _validate() {
        // 获取验证错误
        const errors = this.store.errors;

        if (Object.keys(errors).length > 0) {
            alert(
                "❌ 表单验证失败：\n" +
                    Object.entries(errors)
                        .map(([field, error]) => `${field}: ${error}`)
                        .join("\n"),
            );
            console.error("验证错误:", errors);
        } else {
            alert("✅ 表单验证通过！");
            console.log("表单数据:", this.store.state);
        }
    }

    private _reset() {
        this.store.update((state) => {
            state.user.username = "";
            state.user.email = "";
            state.user.age = 18;
            state.user.phone = "";
            state.user.agreed = false;
        });
    }

    private _fillValid() {
        this.store.update((state) => {
            state.user.username = "testuser";
            state.user.email = "test@example.com";
            state.user.age = 25;
            state.user.phone = "13800138000";
            state.user.agreed = true;
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-validation": ValidationExample;
    }
}

export default ValidationExample;
