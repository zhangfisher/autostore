/**
 * 树形下拉选择示例
 * 演示 tree-dropdown 组件（下拉面板内嵌树形选择）的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import { orgTree } from "../../shared/mock-data";
import "../../../src";

@customElement("example-tree-dropdown")
class TreeDropdownExample extends LitElement {
    state = {
        user: {
            // 单选：默认显示末级节点名
            department: configurable("", {
                label: "所属部门",
                widget: "tree-dropdown",
                items: orgTree,
                valueKey: "label",
                placeholder: "请选择部门",
                help: "单选，选中值显示为末级节点名",
            }),
            // 多选：已选项以标签形式展示在触发器内，可逐个移除
            departments: configurable([], {
                label: "参与部门",
                widget: "tree-dropdown",
                multiple: true,
                valueKey: "label",
                items: orgTree,
                help: "多选，选中项以标签展示，点 × 移除",
            }),
            // 路径显示：showAsPath 展示完整层级路径
            pathDept: configurable("", {
                label: "路径显示",
                widget: "tree-dropdown",
                valueKey: "label",
                showAsPath: true,
                items: orgTree,
                help: "showAsPath: true，标签显示为「中心/部门」完整路径",
            }),
            // 仅叶子可选
            leafOnly: configurable([], {
                label: "叶子节点",
                widget: "tree-dropdown",
                multiple: true,
                valueKey: "label",
                onlySelectLeaf: true,
                items: orgTree,
                help: "onlySelectLeaf: true，只能选择末级节点",
            }),
            // 必填
            requiredTree: configurable("", {
                label: "必填选择",
                widget: "tree-dropdown",
                required: true,
                valueKey: "label",
                items: orgTree,
                placeholder: "请选择",
                help: "必填树形下拉选择",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">树形下拉选择</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示树形下拉选择器的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="树形下拉选择参数演示"
                    style="min-height: 600px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-tree-dropdown": TreeDropdownExample;
    }
}
export default TreeDropdownExample;
