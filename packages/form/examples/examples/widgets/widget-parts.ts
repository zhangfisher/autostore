/**
 * Parts 分段输入组件示例
 * 演示分段输入框的各种参数配置，如验证码、IP地址等
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-parts")
class WidgetPartsExample extends LitElement {
    state = {
        form: {
            // 4位验证码
            code4: configurable("1234", {
                label: "4位验证码",
                widget: "parts",
                template: "0000",
                help: "4位数字验证码",
            }),
            // 6位验证码
            code6: configurable("123456", {
                label: "6位验证码",
                widget: "parts",
                template: "000000",
                help: "6位数字验证码",
            }),
            // IP地址
            ip: configurable("192.168.0.1", {
                label: "IP地址",
                widget: "parts",
                template: "000.000.000.000",
                delimiter: ".",
                chars: "[0-9]",
                help: "IPv4地址输入",
            }),
            // 带分隔符的验证码
            codeWithSeparator: configurable("12-34-56", {
                label: "带分隔符的验证码",
                widget: "parts",
                template: "00-00-00",
                delimiter: "-",
                help: "使用横线分隔的验证码",
            }),
            // 字母验证码
            alphaCode: configurable("AB12", {
                label: "字母数字混合",
                widget: "parts",
                template: "AA00",
                caseType: "upper",
                help: "支持字母和数字混合",
            }),
            // 电话号码分段
            phone: configurable("13812345678", {
                label: "电话号码",
                widget: "parts",
                template: "000-0000-0000",
                delimiter: "-",
                chars: "[0-9]",
                help: "手机号码分段输入",
            }),
            // 纯数字输入
            numberCode: configurable("1234", {
                label: "纯数字输入",
                widget: "parts",
                template: "0000",
                chars: "[0-9]",
                help: "仅允许输入数字",
            }),
            // 自定义分隔符
            customDelimiter: configurable("A:B:C:D", {
                label: "自定义分隔符",
                widget: "parts",
                template: "A0:B0:C0:D0",
                delimiter: ":",
                help: "使用冒号作为分隔符",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                    Parts 分段输入组件
                </h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示分段输入框的各种参数配置，适用于验证码、IP地址、电话号码等场景
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="分段输入参数演示"
                    style="min-height: 600px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-parts": WidgetPartsExample;
    }
}

export default WidgetPartsExample;
