/**
 * 评分组件示例
 * 演示评分组件的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-rating")
class WidgetRatingExample extends LitElement {
    state = {
        form: {
            // 基础评分
            score: configurable(3, {
                label: "评分",
                widget: "rating",
                max: 5,
            }),
            // 支持半星
            precisionScore: configurable(3.5, {
                label: "精确评分",
                widget: "rating",
                max: 5,
                precision: 0.5,
                help: "支持半星评分",
            }),
            // 10星评分
            tenStars: configurable(7, {
                label: "10星评分",
                widget: "rating",
                max: 10,
                help: "最高10星",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">评分组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示评分组件的各种参数配置
                </p>
                <auto-form .state="${this.state}" data-label="评分演示"></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-rating": WidgetRatingExample;
    }
}

export default WidgetRatingExample;
