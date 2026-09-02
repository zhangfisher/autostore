/**
 * 数字输入组件示例
 * 演示数字输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-number")
class WidgetNumberExample extends LitElement {
    state = {
        form: {
            // 基础用法
            basicNum: configurable(0, {
                label: "基础数字",
                widget: "number",
            }),
            // 范围限制
            age: configurable(25, {
                label: "年龄",
                widget: "number",
                min: 1,
                max: 120,
                help: "范围: 1-120",
            }),
            // 步长设置
            score: configurable(80, {
                label: "评分",
                widget: "number",
                min: 0,
                max: 100,
                step: 5,
                help: "步长: 5",
            }),
            // 小数精度
            price: configurable(9.99, {
                label: "价格",
                widget: "number",
                min: 0,
                step: 0.01,
                help: "支持小数，步长0.01",
            }),
            // 必填 + 验证
            quantity: configurable(1, {
                label: "数量",
                widget: "number",
                required: true,
                min: 1,
                max: 999,
                validate: (value: any) => value >= 1 && value <= 999,
                errorMessage: "数量必须在1-999之间",
            }),
            // 只读
            readonlyNum: configurable(42, {
                label: "只读数字",
                widget: "number",
                readOnly: true,
                help: "此字段不可编辑",
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
            this.store?.watch(() => { if (this.stateViewer) this.stateViewer.value = JSON.stringify(this.store.state, null, 2); }); this._syncInitialState();
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">数字输入组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示数字输入框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="数字输入参数演示" style="min-height: 400px;">
                </auto-form>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                        <div><code>widget: 'number'</code> 数字组件类型</div>
                        <div><code>min / max</code> 数值范围限制</div>
                        <div><code>step</code> 步长（ +/- 递增量）</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证函数</div>
                        <div><code>readOnly</code> 只读模式</div>
                    </div>
                </div>
            </div>
                <div style="background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                    <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-number": WidgetNumberExample;
    }
}

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-widget-number": WidgetNumberExample; } }
export default WidgetNumberExample;
