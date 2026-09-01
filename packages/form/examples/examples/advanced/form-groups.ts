/**
 * 表单分组示例
 * 演示标签页分组和折叠面板功能
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { AutoStore, configurable } from "autostore";
import "../../../src";

@customElement("example-form-groups")
class FormGroupsExample extends LitElement {
    state = {
        user: {
            // 基础信息组
            name: configurable("", {
                label: "姓名",
                group: "basic",
                required: true,
            }),
            email: configurable("", {
                label: "邮箱",
                widget: "email",
                group: "basic",
            }),
            phone: configurable("", {
                label: "电话",
                widget: "phone",
                group: "basic",
            }),

            // 工作信息组
            company: configurable("", {
                label: "公司名称",
                group: "work",
                placeholder: "请输入公司名称",
            }),
            position: configurable("", {
                label: "职位",
                group: "work",
                widget: "select",
                choices: ["开发工程师", "产品经理", "设计师", "测试工程师"],
            }),
            workYears: configurable(1, {
                label: "工作年限",
                group: "work",
                widget: "number",
                min: 0,
                max: 40,
            }),

            // 技能信息组
            skills: configurable([], {
                label: "技能栈",
                group: "skills",
                widget: "checkbox-group",
                choices: [
                    { label: "JavaScript", value: "js" },
                    { label: "TypeScript", value: "ts" },
                    { label: "Vue.js", value: "vue" },
                    { label: "React", value: "react" },
                    { label: "Node.js", value: "nodejs" },
                ],
                itemWidth: "33.33%",
            }),
            experience: configurable("中级", {
                label: "经验水平",
                group: "skills",
                widget: "radio",
                choices: ["初级", "中级", "高级", "专家"],
            }),

            // 其他设置组
            notification: configurable(true, {
                label: "接收通知",
                group: "settings",
                widget: "switch",
            }),
            theme: configurable("light", {
                label: "主题偏好",
                group: "settings",
                widget: "radio",
                choices: [
                    { label: "浅色", value: "light" },
                    { label: "深色", value: "dark" },
                    { label: "自动", value: "auto" },
                ],
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    /**
     * 内部 store（由 <auto-form> 创建，经 activeStore 代理访问）
     */
    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateComplete.then(() => {
            this.store?.watch(() => {
                console.log("分组表单状态:", this.store.state);
            });
        });
    }

    render() {
        return html`
            <div style="max-width: 900px; margin: 0 auto; padding: 1rem;">
                <h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">表单分组示例</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示使用group属性进行字段分组，支持标签页和折叠面板两种分组方式
                </p>

                <!-- 标签页分组 -->
                <div style="margin-bottom: 2rem;">
                    <h4 style="margin: 0 0 1rem 0;">标签页分组（Tab Groups）</h4>
                    <auto-form
                        .state="${this.state}"
                        data-group-mode="tabs"
                        data-label="用户信息"
                        data-icon="user"
                        style="min-height: 400px;"
                    >
                    </auto-form>
                </div>

                <!-- 折叠面板分组 -->
                <div style="margin-bottom: 2rem;">
                    <h4 style="margin: 0 0 1rem 0;">折叠面板分组（Collapse Groups）</h4>
                    <auto-form
                        .state="${this.state}"
                        data-group-mode="collapse"
                        data-label="用户信息"
                        data-icon="user"
                        style="min-height: 400px;"
                    >
                    </auto-form>
                </div>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 分组说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;"
                    >
                        <div>
                            <strong>基础信息</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                姓名、邮箱、电话等基本用户信息
                            </p>
                        </div>
                        <div>
                            <strong>工作信息</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                公司、职位、工作年限等职业相关信息
                            </p>
                        </div>
                        <div>
                            <strong>技能信息</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                技术栈选择和经验水平等技能相关内容
                            </p>
                        </div>
                        <div>
                            <strong>其他设置</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                通知设置、主题偏好等其他配置项
                            </p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <sl-button @click="${this._reset}" variant="neutral">
                        <sl-icon name="refresh" slot="prefix"></sl-icon>
                        重置表单
                    </sl-button>
                    <sl-button @click="${this._submit}" variant="primary">
                        <sl-icon name="check-circle" slot="prefix"></sl-icon>
                        提交表单
                    </sl-button>
                </div>
            </div>
        `;
    }

    private _reset() {
        this.store.update((state) => {
            state.user.name = "";
            state.user.email = "";
            state.user.phone = "";
            state.user.company = "";
            state.user.position = "";
            state.user.workYears = 1;
            state.user.skills = [];
            state.user.experience = "中级";
            state.user.notification = true;
            state.user.theme = "light";
        });
    }

    private _submit() {
        console.log("提交的表单数据:", this.store.state);
        alert("表单提交成功！\n" + JSON.stringify(this.store.state, null, 2));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-form-groups": FormGroupsExample;
    }
}

export default FormGroupsExample;
