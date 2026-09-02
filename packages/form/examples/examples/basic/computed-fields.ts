/**
 * 计算属性示例
 * 演示自动计算字段和依赖关系
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable, computed } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-computed-fields")
class ComputedFieldsExample extends LitElement {
    state = {
        order: {
            price: configurable(100, {
                label: "单价",
                widget: "number",
                min: 0,
                step: 10,
                help: "商品单价（元）",
            }),
            quantity: configurable(1, {
                label: "数量",
                widget: "number",
                min: 1,
                help: "购买数量",
            }),
            discount: configurable(0, {
                label: "折扣",
                widget: "number",
                min: 0,
                max: 100,
                step: 5,
                help: "折扣百分比（%）",
            }),
            subtotal: computed((state) => state.order.price * state.order.quantity),
            discountAmount: computed(
                (state) => state.order.price * state.order.quantity * (state.order.discount / 100),
            ),
            total: computed(
                (state) =>
                    state.order.price * state.order.quantity -
                    state.order.price * state.order.quantity * (state.order.discount / 100),
            ),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    @query("#state-viewer")
    stateViewer?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (this.store) {
                this.store.watch(() => {
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
                    }
                });
                this._syncInitialState();
            }
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">计算属性示例</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示自动计算字段、依赖关系和实时更新
                    </p>
                    <auto-form .state="${this.state}" data-label="订单信息" data-icon="shopping-cart" style="min-height: 400px;"></auto-form>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <sl-button @click="${this._reset}" variant="neutral" size="small">重置</sl-button>
                        <sl-button @click="${this._applyDiscount}" variant="success" size="small">应用20%折扣</sl-button>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 0;">
                    <form-props-panel id="props-panel"></form-props-panel>
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                        <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                    </div>
                </div>
            </div>
        `;
    }

    private _reset() {
        if (!this.store) return;
        this.store.update((state: any) => {
            state.order.price = 100;
            state.order.quantity = 1;
            state.order.discount = 0;
        });
    }

    private _applyDiscount() {
        if (!this.store) return;
        this.store.update((state: any) => {
            state.order.discount = 20;
        });
    }

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-computed-fields": ComputedFieldsExample;
    }
}

export default ComputedFieldsExample;
