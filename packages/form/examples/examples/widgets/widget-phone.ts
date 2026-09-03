/**
 * 电话输入组件示例
 * 演示电话号码输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-phone")
class WidgetPhoneExample extends LitElement {
    state = {
        form: {
            // 基础用法
            phone: configurable("", {
                label: "手机号码",
                widget: "phone",
                placeholder: "13800138000",
            }),
            // 必填 + 最大长度
            requiredPhone: configurable("", {
                label: "联系电话",
                widget: "phone",
                required: true,
                maxLength: 11,
                placeholder: "请输入11位手机号",
                help: "必填，11位手机号码",
            }),
            // 带验证函数
            strictPhone: configurable("", {
                label: "验证手机号",
                widget: "phone",
                required: true,
                placeholder: "以1开头的11位号码",
                validate: (value: any) => /^1[3-9]\d{9}$/.test(value),
                errorMessage: "请输入有效的手机号码（以1开头）",
            }),
            // 只读
            readonlyPhone: configurable("13800138000", {
                label: "绑定手机",
                widget: "phone",
                readOnly: true,
                help: "已绑定的手机号不可修改",
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
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">电话输入组件</h3>
                    <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                        演示电话号码输入框的各种参数配置
                    </p>

                    <auto-form
                        .state="${this.state}"
                        data-label="电话参数演示"
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
                            <div><code>widget: 'phone'</code> 电话组件类型</div>
                            <div><code>maxLength</code> 最大输入长度</div>
                            <div><code>required</code> 必填标记</div>
                            <div><code>validate</code> 自定义验证（如手机号规则）</div>
                            <div><code>errorMessage</code> 自定义错误信息</div>
                            <div><code>readOnly</code> 只读模式</div>
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
        "example-widget-phone": WidgetPhoneExample;
    }
}

export default WidgetPhoneExample;
