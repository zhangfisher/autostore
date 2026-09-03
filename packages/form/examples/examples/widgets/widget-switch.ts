/**
 * 开关组件示例
 * 演示开关切换组件的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-switch")
class WidgetSwitchExample extends LitElement {
    state = {
        form: {
            // 基础用法
            enableFeature: configurable(false, {
                label: "启用功能",
                widget: "switch",
            }),
            // 默认开启
            darkMode: configurable(true, {
                label: "深色模式",
                widget: "switch",
                help: "默认开启",
            }),
            // 必填
            agreeTerms: configurable(false, {
                label: "同意服务条款",
                widget: "switch",
                required: true,
                validate: (value: any) => value === true,
                errorMessage: "必须同意服务条款",
                help: "必填，需开启才能提交",
            }),
            // 联动控制（配合其他字段）
            dhcp: configurable(false, {
                label: "自动获取IP",
                widget: "switch",
                help: "开启后禁用IP/网关输入",
            }),
            // 只读
            readonlySwitch: configurable(true, {
                label: "系统通知",
                widget: "switch",
                readOnly: true,
                help: "只读模式，不可修改",
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
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">开关组件</h3>
                    <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                        演示开关切换组件的各种参数配置
                    </p>

                    <auto-form
                        .state="${this.state}"
                        data-label="开关参数演示"
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
                            <div><code>widget: 'switch'</code> 开关组件类型</div>
                            <div>值类型: <code>boolean</code>（true/false）</div>
                            <div><code>required</code> 必填标记（需为true）</div>
                            <div><code>validate</code> 自定义验证</div>
                            <div><code>readOnly</code> 只读模式</div>
                            <div>常用于联动控制其他字段</div>
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
        "example-widget-switch": WidgetSwitchExample;
    }
}

export default WidgetSwitchExample;
