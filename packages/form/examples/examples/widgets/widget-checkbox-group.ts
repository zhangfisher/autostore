/**
 * 复选框组组件示例
 * 演示复选框组的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-checkbox-group")
class WidgetCheckboxGroupExample extends LitElement {
    state = {
        form: {
            // 基础用法
            hobbies: configurable([], {
                label: "兴趣爱好",
                widget: "checkbox-group",
                choices: ["阅读", "音乐", "运动", "旅行", "摄影"],
            }),
            // 对象数组 + 图标
            themes: configurable(["light"], {
                label: "主题偏好",
                widget: "checkbox-group",
                choices: [
                    { label: "浅色", value: "light", icon: "sun" },
                    { label: "深色", value: "dark", icon: "moon" },
                    { label: "自动", value: "auto", icon: "monitor" },
                ],
            }),
            // 卡片样式 + 自定义宽度
            features: configurable([], {
                label: "启用功能",
                widget: "checkbox-group",
                card: true,
                itemWidth: "33.33%",
                choices: [
                    { label: "通知提醒", value: "notification" },
                    { label: "自动保存", value: "autosave" },
                    { label: "深色模式", value: "darkmode" },
                    { label: "夜间模式", value: "nightmode" },
                    { label: "实验功能", value: "experimental" },
                    { label: "数据分析", value: "analytics" },
                ],
            }),
            // 必填 + 验证
            skills: configurable([], {
                label: "技术栈",
                widget: "checkbox-group",
                required: true,
                choices: [
                    { label: "JavaScript", value: "js" },
                    { label: "TypeScript", value: "ts" },
                    { label: "Vue.js", value: "vue" },
                    { label: "React", value: "react" },
                    { label: "Node.js", value: "nodejs" },
                ],
                validate: (value: any) => value.length > 0,
                errorMessage: "请至少选择一项技术栈",
                help: "必填，至少选择一项",
            }),
            // TCP标志位（位运算示例）
            tcpFlags: configurable(3, {
                label: "TCP标志位",
                widget: "checkbox-group",
                choices: [
                    { label: "URG", value: 1 },
                    { label: "ACK", value: 2 },
                    { label: "PSH", value: 4 },
                    { label: "RST", value: 8 },
                    { label: "SYN", value: 16 },
                    { label: "FIN", value: 32 },
                ],
                toInput: (value: any) => {
                    const vals: number[] = [];
                    if ((value & 1) > 0) vals.push(1);
                    if ((value & 2) > 0) vals.push(2);
                    if ((value & 4) > 0) vals.push(4);
                    if ((value & 8) > 0) vals.push(8);
                    if ((value & 16) > 0) vals.push(16);
                    if ((value & 32) > 0) vals.push(32);
                    return vals;
                },
                toState: (vals: any[]) => {
                    let value = 0;
                    for (const v of vals) value += v;
                    return value;
                },
                help: "演示 toState/toInput 数据转换",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">复选框组组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示复选框组的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="复选框参数演示" style="min-height: 600px;">
                </auto-form>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                        <div><code>widget: 'checkbox-group'</code> 复选框组类型</div>
                        <div><code>choices</code> 选项数组（字符串或对象）</div>
                        <div><code>card</code> 卡片样式展示</div>
                        <div><code>itemWidth</code> 选项宽度</div>
                        <div><code>icon</code> 选项图标（对象格式）</div>
                        <div><code>toState / toInput</code> 数据转换</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证</div>
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
        "example-widget-checkbox-group": WidgetCheckboxGroupExample;
    }
}

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-widget-checkbox-group": WidgetCheckboxGroupExample; } }
export default WidgetCheckboxGroupExample;
