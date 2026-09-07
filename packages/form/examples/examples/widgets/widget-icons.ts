/**
 * 图标选择组件示例
 * 演示图标选择器的单选/多选及参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-icons")
class WidgetIconsExample extends LitElement {
    state = {
        form: {
            /* ============ 单选 ============ */
            // 单选：收缩为一个图标 + 下拉箭头，点选后自动收起
            icon: configurable("home", {
                label: "单选图标",
                widget: "icons",
                help: "单选，宽度收缩为一个图标 + 下拉",
            }),
            // 单选 + 自定义候选集
            customIcon: configurable("lock", {
                label: "自定义候选",
                widget: "icons",
                icons: "lock,user,globe,search",
                builtIn: false,
                help: "icons 指定候选，builtIn: false 不附加内置图标",
            }),
            // 单选 + 自定义尺寸
            largeIcon: configurable("star", {
                label: "大图标",
                widget: "icons",
                size: "32px",
                help: "size: 32px 调整图标渲染尺寸",
            }),
            /* ============ 多选 ============ */
            // 多选：满宽平铺展示
            multiIcons: configurable(["heart", "star"], {
                label: "多选图标",
                widget: "icons",
                multiple: true,
                help: "多选，组件满宽平铺展示",
            }),
            // 多选 + 下拉面板
            dropdownIcons: configurable(["globe", "date"], {
                label: "多选下拉",
                widget: "icons",
                multiple: true,
                dropdown: true,
                help: "multiple + dropdown：满宽触发器 + 下拉面板多选",
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
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">图标选择组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    单选收缩为一个图标 + 下拉箭头；多选满宽展示
                </p>

                <auto-form .state="${this.state}" data-label="图标选择演示"> </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>multiple: true</code> 多选，组件满宽</div>
                        <div>默认单选：收缩为一个图标 + 下拉</div>
                        <div><code>icons</code> 候选图标（数组或逗号分隔字符串）</div>
                        <div><code>builtIn: false</code> 不附加内置图标集</div>
                        <div><code>size</code> 图标渲染尺寸，默认 24px</div>
                        <div><code>dropdown: true</code> 以下拉面板展示</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-icons": WidgetIconsExample;
    }
}

export default WidgetIconsExample;
