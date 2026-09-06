/**
 * 多行文本组件示例
 * 演示多行文本输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-textarea")
class WidgetTextareaExample extends LitElement {
    state = {
        form: {
            // 基础用法
            bio: configurable("", {
                label: "个人简介",
                widget: "textarea",
                placeholder: "介绍一下自己...",
            }),
            // 自定义行数
            address: configurable("", {
                label: "详细地址",
                widget: "textarea",
                rows: 3,
                placeholder: "请输入详细地址",
                help: "3行高度",
            }),
            // 必填 + 最大长度
            description: configurable("", {
                label: "项目描述",
                widget: "textarea",
                required: true,
                rows: 4,
                maxLength: 500,
                placeholder: "请描述项目详情",
                help: "必填，最多500个字符",
            }),
            // 自定义验证
            remark: configurable("", {
                label: "备注信息",
                widget: "textarea",
                rows: 6,
                placeholder: "请输入备注...",
                validate: (value: any) => {
                    if (!value) return true; // 非必填
                    return value.length >= 10;
                },
                errorMessage: "备注内容至少10个字符",
            }),
            // 只读
            readonlyContent: configurable("这是一段不可编辑的预设内容。", {
                label: "系统公告",
                widget: "textarea",
                rows: 3,
                readOnly: true,
                help: "只读模式，不可编辑",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">多行文本组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示多行文本输入框的各种参数配置
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="多行文本参数演示"
                    style="min-height: 500px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'textarea'</code> 多行文本类型</div>
                        <div><code>rows</code> 显示行数</div>
                        <div><code>maxLength</code> 最大字符数</div>
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
        "example-widget-textarea": WidgetTextareaExample;
    }
}

export default WidgetTextareaExample;
