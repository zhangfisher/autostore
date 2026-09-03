/**
 * 文本输入组件示例
 * 演示文本输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-text")
class WidgetTextExample extends LitElement {
    state = {
        form: {
            name: configurable("", { label: "用户名", placeholder: "请输入用户名" }),
            requiredName: configurable("", {
                label: "真实姓名",
                required: true,
                placeholder: "请输入真实姓名",
                maxLength: 20,
                help: "必填，最多20个字符",
            }),
            code: configurable("", {
                label: "验证码",
                required: true,
                placeholder: "请输入6位数字验证码",
                validate: (v: any) => /^\d{6}$/.test(v),
                errorMessage: "验证码必须是6位数字",
            }),
            readonlyField: configurable("不可编辑的内容", {
                label: "只读字段",
                readOnly: true,
                help: "此字段不可编辑",
            }),
            prefixField: configurable("", {
                label: "用户名",
                placeholder: "请输入",
                prefix: "@",
                help: "输入时自动添加 @ 前缀",
            }),
            shortField: configurable("", {
                label: "短文本",
                placeholder: "最多10个字符",
                maxLength: 10,
                help: "限制最大输入长度",
            }),
        },
    };

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
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">文本输入组件</h3>
                    <p
                        style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示文本输入框的各种参数配置
                    </p>
                    <auto-form
                        .state="${this.state}"
                        data-label="文本输入参数演示"
                        style="min-height: 400px;"
                    ></auto-form>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 0;">
                    <form-props-panel id="props-panel"></form-props-panel>
                    <div
                        style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;"
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
        "example-widget-text": WidgetTextExample;
    }
}

export default WidgetTextExample;
