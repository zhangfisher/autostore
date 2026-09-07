/**
 * 单选按钮组件示例
 * 演示单选按钮的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

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

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">单选按钮组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示单选按钮的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="单选参数演示"> </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
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
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-radio": WidgetRadioExample;
    }
}

export default WidgetRadioExample;
