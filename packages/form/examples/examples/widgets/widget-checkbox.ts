/**
 * 单个复选框组件示例
 * 演示单个复选框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-checkbox")
class WidgetCheckboxExample extends LitElement {
    state = {
        form: {
            // 基础复选框
            agree: configurable(false, {
                label: "同意协议",
                widget: "checkbox",
                help: "请勾选同意用户协议",
            }),
            // 默认选中
            newsletter: configurable(true, {
                label: "订阅新闻",
                widget: "checkbox",
                help: "默认选中",
            }),
            // 必填
            requiredCheck: configurable(false, {
                label: "确认信息",
                widget: "checkbox",
                required: true,
                help: "必填项，必须勾选",
            }),
            // choices 双值选项：勾选时取各项 value，复选框旁显示当前项 label
            saveMode: configurable("cloud", {
                label: "保存方式",
                widget: "checkbox",
                choices: [
                    { label: "云端保存", value: "cloud" },
                    { label: "本地保存", value: "local" },
                ],
                help: "choices 模式，值在 cloud/local 间切换",
            }),
            // choices 无 label：仅切换值，复选框旁不显示文字
            autoSync: configurable(1, {
                label: "自动同步",
                widget: "checkbox",
                choices: [{ value: 1 }, { value: 0 }],
                help: "choices 项无 label，复选框旁不显示文字",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div >
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                        单个复选框组件
                    </h3>
                    <p
                        style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示单个复选框的各种参数配置
                    </p>
                    <auto-form
                        .state="${this.state}"
                        data-label="复选框演示"
                        style="min-height: 400px;"
                    ></auto-form>

                    <div
                        style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                    >
                        <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                        <div
                            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                        >
                            <div><code>widget: 'checkbox'</code> 复选框类型</div>
                            <div>值类型: <code>boolean</code>（true/false）</div>
                            <div><code>choices</code> 双值选项（优先于 switchValues）</div>
                            <div><code>choices</code> 项 <code>label</code> 缺省时不显示</div>
                            <div><code>required</code> 必填标记（需勾选）</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-checkbox": WidgetCheckboxExample;
    }
}

export default WidgetCheckboxExample;
