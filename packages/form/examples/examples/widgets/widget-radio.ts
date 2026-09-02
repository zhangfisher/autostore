/**
 * 单选按钮组件示例
 * 演示单选按钮的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-radio")
class WidgetRadioExample extends LitElement {
    state = {
        form: {
            // 基础用法
            gender: configurable("male", {
                label: "性别",
                widget: "radio",
                choices: ["male", "female"],
            }),
            // 对象数组 + 卡片样式
            layout: configurable("经典式", {
                label: "页面布局",
                widget: "radio",
                card: true,
                itemWidth: "33.33%",
                choices: [
                    { label: "简约风", tips: "极简设计" },
                    { label: "经典式", tips: "传统布局" },
                    { label: "卡片集", tips: "模块化卡片" },
                ],
            }),
            // 必填
            level: configurable("", {
                label: "经验等级",
                widget: "radio",
                required: true,
                choices: ["初级", "中级", "高级", "专家"],
                help: "必填，请选择经验等级",
            }),
            // 自定义验证
            importance: configurable("", {
                label: "重要程度",
                widget: "radio",
                required: true,
                choices: ["低", "中", "高", "紧急"],
                validate: (value: any) => value !== "",
                errorMessage: "请选择重要程度",
            }),
            // 只读
            readonlyRadio: configurable("选项B", {
                label: "只读单选",
                widget: "radio",
                choices: ["选项A", "选项B", "选项C"],
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">单选按钮组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示单选按钮的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="单选参数演示" style="min-height: 500px;">
                </auto-form>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                        <div><code>widget: 'radio'</code> 单选组件类型</div>
                        <div><code>choices</code> 选项数组（字符串或对象）</div>
                        <div><code>card</code> 卡片样式展示</div>
                        <div><code>itemWidth</code> 选项宽度</div>
                        <div><code>tips</code> 选项描述（对象格式）</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证</div>
                        <div><code>readOnly</code> 只读模式</div>
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
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-radio": WidgetRadioExample;
    }
}

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-widget-radio": WidgetRadioExample; } }
export default WidgetRadioExample;
