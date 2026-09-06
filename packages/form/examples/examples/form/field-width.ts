/**
 * 字段宽度示例
 * 演示通过 width 配置在一行中展示多个字段，而非默认的一行一个
 *
 * 机制：width 写到字段宿主元素 inline style，覆盖表单 .fields > *
 * 的 width:100%；layout='auto'（默认流式布局）下同行字段按声明顺序排列
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-field-width")
class FieldWidthExample extends LitElement {
    state = {
        form: {
            // ---- 一行三列：每字段 33.33% ----
            province: configurable("", {
                label: "省份",
                widget: "select",
                width: "33.33%",
                choices: ["福建省", "广东省", "浙江省"],
            }),
            city: configurable("", {
                label: "城市",
                widget: "select",
                width: "33.33%",
                choices: ["福州市", "泉州市", "深圳市"],
            }),
            district: configurable("", {
                label: "区县",
                widget: "select",
                width: "33.33%",
                choices: ["鼓楼区", "丰泽区", "南山区"],
            }),
            // ---- 一行两列：每字段 50% ----
            firstName: configurable("", {
                label: "名",
                width: "50%",
                placeholder: "如：三",
            }),
            lastName: configurable("", {
                label: "姓",
                width: "50%",
                placeholder: "如：张",
            }),
            // ---- 混合列宽：25% + 75% 拼满一行 ----
            age: configurable(25, {
                label: "年龄",
                widget: "number",
                width: "25%",
                min: 0,
                max: 120,
            }),
            bio: configurable("", {
                label: "简介",
                width: "75%",
                placeholder: "占 3/4 宽度",
            }),
            // ---- 不设置 width：默认独占一行 ----
            email: configurable("", {
                label: "邮箱",
                widget: "email",
                placeholder: "默认独占一行",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">字段宽度布局</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    通过 <code>width</code> 配置控制字段宽度，一行可展示多个字段
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="字段宽度参数演示"
                    style="min-height: 400px;"
                ></auto-form>
                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>width: '33.33%'</code> 一行三列</div>
                        <div><code>width: '50%'</code> 一行两列</div>
                        <div><code>width: '25%' + '75%'</code> 混合列宽</div>
                        <div>不设置 <code>width</code> 默认独占一行</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-field-width": FieldWidthExample;
    }
}
export default FieldWidthExample;
