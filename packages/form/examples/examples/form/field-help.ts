/**
 * 字段帮助信息示例
 * 演示 renderHelp 功能，为字段添加帮助提示信息
 */

import { customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-field-help")
class FieldHelpExample extends LitElement {
    userState = {
        user: {
            username: configurable("", {
                label: "用户名",
                required: true,
                placeholder: "请输入用户名",
                help: "用户名长度为3-20个字符，支持字母、数字和下划线",
            }),
            email: configurable("", {
                label: "邮箱",
                required: true,
                placeholder: "example@mail.com",
                help: "请输入有效的邮箱地址 (https://example.com/help/email)",
            }),
            password: configurable("", {
                label: "密码",
                widget: "password",
                required: true,
                placeholder: "请输入密码",
                help: "密码至少8位，包含字母和数字",
            }),
            age: configurable(25, {
                label: "年龄",
                widget: "number",
                min: 18,
                max: 100,
                help: "年龄必须在18-100岁之间",
            }),
            website: configurable("", {
                label: "个人网站",
                placeholder: "https://example.com",
                help: "选填，请输入完整的URL地址 (https://example.com/help/website)",
            }),
            bio: configurable("", {
                label: "个人简介",
                widget: "textarea",
                placeholder: "介绍一下自己...",
                help: "最多500字，可包含基本格式",
            }),
        },
    };

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">字段帮助信息示例</h3>
                <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示 renderHelp 功能，为字段添加帮助提示信息
                </p>
                <auto-form
                    .state="${this.userState}"
                    path="user"
                    style="min-height: 400px;"
                ></auto-form>

                <div
                    style="margin-top: 1rem; padding: 1rem; background: #e8f4fd; border-radius: 8px; font-size: 0.875rem;"
                >
                    <h4 style="margin: 0 0 0.5rem 0;">帮助信息说明</h4>
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li><strong>纯文本帮助</strong>: 直接在 help 属性中填写帮助文字</li>
                        <li>
                            <strong>带链接帮助</strong>: 在 help 文字末尾用括号包裹 URL，如
                            <code>"说明文字 (https://example.com)"</code>
                        </li>
                        <li>
                            <strong>显示位置</strong>: labelPos=top 时显示在标签下方，labelPos=left
                            时仅显示图标
                        </li>
                        <li>鼠标悬停在帮助图标上可查看完整帮助文字</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-field-help": FieldHelpExample;
    }
}

export default FieldHelpExample;
