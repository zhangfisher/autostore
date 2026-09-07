/**
 * 文本输入组件示例
 * 演示文本输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

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

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">文本输入组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示文本输入框的各种参数配置
                </p>
                <auto-form .state="${this.state}" data-label="文本输入参数演示"></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-text": WidgetTextExample;
    }
}

export default WidgetTextExample;
