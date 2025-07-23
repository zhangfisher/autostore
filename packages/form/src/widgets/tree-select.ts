import { AutoField } from '@/field';
import { css, html } from 'lit';
import type { SlTreeItem } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';

import type { SchemaTreeSelectWidgetOptions } from 'autostore';
import { when } from 'lit/directives/when.js';
import { tag } from '@/utils/tag';

export type AutoFieldTreeSelectOptions = Required<SchemaTreeSelectWidgetOptions>;

export type TreeNode = {
    id?: string | number;
    label?: string;
    icon?: string;
    value?: string;
    selected?: boolean;
    expanded?: boolean;
    children?: TreeNode[];
};

export type TreeNodes = TreeNode[] | TreeNode;

export type TreeSelectedItem = {
    id: any;
    value: any;
    path: any;
};

export type AutoTreeSelectOptions = {
    items: TreeNodes;
    idKey: string;
    valueKey: string; // 用于值
    labelKey: string; // 用于显示,默认为label
    multiple: boolean;
    onlySelectLeaf: boolean; //只选择叶子节点
    // 是否在选择项显示为路径, =true，则使用labelKey组成路径
    showAsPath: boolean;
    onSelectionChange: (selection: TreeSelectedItem[]) => void;
};

@tag('auto-field-tree-select')
export class AutoFieldTreeSelect<Options = unknown> extends AutoField<AutoFieldTreeSelectOptions & Options> {
    static styles = [
        AutoField.styles,
        css`
            sl-tree {
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                font-size: var(--auto-font-size);
            }
        `,
    ] as any;
    nodes: TreeNodes = {};
    selection: TreeSelectedItem[] = [];
    idKey: string = 'id';
    valueKey: string = 'id';
    labelKey: string = 'label';

    getInitialOptions(): Record<string, any> {
        return {
            items: [],
            idKey: 'id',
            valueKey: 'id',
            labelKey: 'label',
            multiple: false,
            maxItems: 0,
            minItems: 0,
            onlySelectLeaf: false,
            showAsPath: false,
            onSelectionChange: () => {},
        };
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.options) {
            this.idKey = this.options.idKey;
            this.valueKey = this.options.valueKey;
            this.labelKey = this.options.labelKey;
            const items = this.options.items;
            if (items) {
                this.nodes = items;
                this._forEachTree((item: any, _, level, path) => {
                    if (level < 1 && item.expanded === undefined) {
                        item.expanded = true;
                    }
                    if (this.isItemSelected(item)) {
                        item.selected = true;
                        this.selection.push({
                            id: item[this.idKey],
                            value: item[this.valueKey],
                            path: path.join('/'),
                        });
                    }
                });
            }
        }
    }

    isItemSelected(item: any) {
        if (this.value === undefined) return false;
        if (this.options.multiple === false) {
            return this.value === item[this.valueKey];
        } else {
            return this.value.includes(item[this.valueKey]);
        }
    }

    getStateValue() {
        const initial = super.getStateValue();
        if (this.options.multiple) {
            return Array.isArray(initial) ? initial : [initial];
        } else {
            return initial;
        }
    }

    /**
     * 遍历树并对每一个节点进行回调
     * @param callback
     */
    _forEachTree(callback: (item: TreeNode, parent: TreeNode | undefined, level: number, path: string[]) => void) {
        const forEachItem = (item: TreeNode, parent: TreeNode | undefined, level: number, path: string[]) => {
            const curPath = [...path, (item as any)[this.labelKey]];
            callback(item, parent, level, curPath);
            if (item.children) {
                const nextLevel = level + 1;
                item.children.forEach((child) => {
                    forEachItem(child, item, nextLevel, [...curPath]);
                });
            }
        };
        const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes];
        nodes.forEach((item) => {
            forEachItem(item, undefined, 0, []);
        });
    }
    onSelectionChange(e: CustomEvent) {
        const selection = Array.from(e.detail.selection) as SlTreeItem[];
        if (selection) {
            this.selection = selection.map((item) => {
                return {
                    id: item.dataset.id,
                    value: item.dataset.value,
                    path: item.dataset.path,
                };
            });
            if (this.options && typeof this.options.onSelectionChange === 'function') {
                this.options.onSelectionChange(this.selection);
            }
            this.onFieldChange();
        }
    }
    getInputValue() {
        if (this.options.multiple) {
            return this.selection.map((item) => item.value);
        } else {
            return this.selection.length > 0 ? this.selection[0].value : undefined;
        }
    }

    _renderNode(item: TreeNode & Record<string, any>, values: any, parentPath: string[]): any {
        const isSelected = values.includes((item as any)[this.valueKey]);
        const curPath = [...parentPath, (item as any)[this.labelKey]];
        return html`<sl-tree-item
            data-id=${String(item[this.idKey])}
            data-value=${String(item[this.valueKey])}
            data-path=${curPath.join('/')}
            ?selected=${isSelected}
            ?expanded=${item.expanded}
        >
            ${when(item.icon, () => html`<sl-icon name="${item.icon!}"></sl-icon>`)} ${item.label}
            ${Array.isArray(item.children)
                ? html`${item.children.map((child) => {
                      return this._renderNode(child, values, curPath);
                  })}`
                : ''}</sl-tree-item
        >`;
    }
    _renderNodes(nodes: TreeNodes): any {
        const values = Array.isArray(this.value) ? this.value : [this.value];
        if (Array.isArray(nodes)) {
            return nodes.map((node) => {
                return this._renderNode(node as TreeNode, values, []);
            });
        } else {
            return this._renderNode(nodes as TreeNode, values, []);
        }
    }
    renderTree() {
        return html`
            <sl-tree
                name="${this.name}"
                data-path=${this.path}
                size=${this.context.size}
                selection="${this.options.onlySelectLeaf ? 'leaf' : this.options.multiple ? 'multiple' : 'single'}"
                @sl-selection-change=${this.onSelectionChange.bind(this)}
                >${this._renderNodes(this.nodes)}</sl-tree
            >
        `;
    }

    renderInput() {
        return html` ${this.renderTree()} `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-select': AutoFieldTreeSelect;
    }
}
