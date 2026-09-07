/**
 * 搜索输入组件示例
 * 演示搜索框的各种参数配置（继承 input，默认带搜索图标）
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-search")
class WidgetSearchExample extends LitElement {
    state = {
        form: {
            // 基础用法：默认带搜索图标和 Search 占位符
            keyword: configurable("", {
                label: "关键字",
                widget: "search",
            }),
            // 自定义占位符 + 可清空
            product: configurable("", {
                label: "搜索商品",
                widget: "search",
                placeholder: "输入商品名称或编码",
                clearable: true,
                help: "输入后可一键清空",
            }),
            // 必填 + 最小长度验证
            requiredKeyword: configurable("", {
                label: "搜索词",
                widget: "search",
                required: true,
                minLength: 2,
                placeholder: "至少输入 2 个字符",
                help: "必填，且不少于 2 个字符",
            }),
            // 自定义验证函数
            orderNo: configurable("", {
                label: "订单搜索",
                widget: "search",
                required: true,
                validate: (value: any) => /^ORD-\d{6}$/.test(value),
                errorMessage: "订单号格式为 ORD-xxxxxx",
            }),
            // 只读
            readonlyKeyword: configurable("初始化完成", {
                label: "只读搜索",
                widget: "search",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">搜索输入组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示搜索框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="搜索参数演示"> </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'search'</code> 搜索组件类型</div>
                        <div>默认自带 <code>icon: 'search'</code> 前缀图标</div>
                        <div><code>placeholder</code> 占位提示文本（默认 Search）</div>
                        <div><code>clearable</code> 是否可清空</div>
                        <div><code>required</code> / <code>minLength</code> 必填与长度验证</div>
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
        "example-widget-search": WidgetSearchExample;
    }
}

export default WidgetSearchExample;
