/**
 * 树形选择示例
 * 演示树形选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import { orgTree } from "../../shared/mock-data";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-tree-select")
class TreeSelectExample extends LitElement {
    state = {
        user: {
            // 单选
            department: configurable("", {
                label: "所属部门",
                widget: "tree-select",
                items: orgTree,
                valueKey: "label",
                placeholder: "请选择部门",
                help: "单选树形选择",
            }),
            // 多选
            departments: configurable([], {
                label: "参与部门",
                widget: "tree-select",
                multiple: true,
                valueKey: "label",
                items: orgTree,
                help: "多选，可选择多个部门",
            }),
            // 仅选择叶子节点
            leafOnly: configurable([], {
                label: "叶子节点",
                widget: "tree-select",
                multiple: true,
                valueKey: "label",
                onlySelectLeaf: true,
                items: orgTree,
                help: "onlySelectLeaf: true，只能选择末级节点",
            }),
            // 必填
            requiredTree: configurable("", {
                label: "必填选择",
                widget: "tree-select",
                required: true,
                valueKey: "label",
                items: orgTree,
                placeholder: "请选择",
                help: "必填树形选择",
            }),
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
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">树形选择器</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示树形选择器的各种参数配置
                    </p>
                    <auto-form .state="${this.state}" data-label="树形选择参数演示" style="min-height: 600px;"></auto-form>
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

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-tree-select": TreeSelectExample; } }
export default TreeSelectExample;
