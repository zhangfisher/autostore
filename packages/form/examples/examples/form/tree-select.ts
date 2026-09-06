/**
 * 树形选择示例
 * 演示树形选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import { orgTree } from "../../shared/mock-data";
import "../../../src";

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

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">树形选择器</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示树形选择器的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="树形选择参数演示"
                    style="min-height: 600px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-tree-select": TreeSelectExample;
    }
}
export default TreeSelectExample;
