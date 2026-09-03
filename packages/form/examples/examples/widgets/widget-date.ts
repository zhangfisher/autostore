/**
 * 日期选择组件示例
 * 演示日期选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-date")
class WidgetDateExample extends LitElement {
    state = {
        form: {
            // 基础用法
            birthday: configurable("", {
                label: "出生日期",
                widget: "date",
                placeholder: "请选择日期",
            }),
            // 默认值
            startDate: configurable("2024-01-01", {
                label: "开始日期",
                widget: "date",
                help: "默认值: 2024-01-01",
            }),
            // 必填
            requiredDate: configurable("", {
                label: "截止日期",
                widget: "date",
                required: true,
                placeholder: "请选择截止日期",
                help: "必填，项目截止日期",
            }),
            // 自定义验证
            futureDate: configurable("", {
                label: "预约日期",
                widget: "date",
                required: true,
                placeholder: "请选择未来日期",
                validate: (value: any) => {
                    if (!value) return false;
                    return new Date(value) > new Date();
                },
                errorMessage: "预约日期必须是未来的日期",
            }),
            // 只读
            readonlyDate: configurable("2024-06-15", {
                label: "创建日期",
                widget: "date",
                readOnly: true,
                help: "系统自动设置，不可修改",
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
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">日期选择组件</h3>
                    <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                        演示日期选择器的各种参数配置
                    </p>

                    <auto-form
                        .state="${this.state}"
                        data-label="日期参数演示"
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
                            <div><code>widget: 'date'</code> 日期组件类型</div>
                            <div>日期格式: <code>YYYY-MM-DD</code></div>
                            <div><code>required</code> 必填标记</div>
                            <div><code>validate</code> 自定义验证（如未来日期）</div>
                            <div><code>readOnly</code> 只读模式</div>
                            <div><code>help</code> 帮助提示文本</div>
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
        "example-widget-date": WidgetDateExample;
    }
}

export default WidgetDateExample;
