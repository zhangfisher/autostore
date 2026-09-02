/**
 * 表单分组示例
 * 演示标签页分组和折叠面板功能
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

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

    groupMode: "tabs" | "collapse" = "tabs";

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

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
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
                    }
                });
                this._syncInitialState();
            }
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">表单分组示例</h3>
                    <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示使用group属性进行字段分组，支持标签页和折叠面板两种分组方式
                    </p>

                    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
                        <sl-button @click="${this._switchMode}" size="small" variant="${this.groupMode === 'tabs' ? 'primary' : 'neutral'}">标签页分组</sl-button>
                        <sl-button @click="${this._switchModeCollapse}" size="small" variant="${this.groupMode === 'collapse' ? 'primary' : 'neutral'}">折叠面板分组</sl-button>
                    </div>

                    <auto-form
                        .state="${this.state}"
                        data-group-mode="${this.groupMode}"
                        data-label="用户信息"
                        data-icon="user"
                        style="min-height: 400px;"
                    ></auto-form>

                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <sl-button @click="${this._reset}" variant="neutral" size="small">重置</sl-button>
                        <sl-button @click="${this._submit}" variant="primary" size="small">提交</sl-button>
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

    private _switchMode() {
        this.groupMode = "tabs";
        this.requestUpdate();
    }

    private _switchModeCollapse() {
        this.groupMode = "collapse";
        this.requestUpdate();
    }

    private _reset() {
        if (!this.store) return;
        this.store.update((state: any) => {
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
        if (!this.store) return;
        alert("表单提交成功！\n" + JSON.stringify(this.store.state, null, 2));
    }

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-form-groups": FormGroupsExample;
    }
}

export default FormGroupsExample;
