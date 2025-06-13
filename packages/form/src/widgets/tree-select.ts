import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { SlTreeItem } from '@shoelace-style/shoelace';


type TreeNode = {
    id?: string | number
    label?: string
    icon?: string
    value?: string
    selected?: boolean
    expanded?: boolean
    children?: TreeNode[]
}

type TreeNodes = TreeNode[] | TreeNode


@customElement('auto-field-tree-select')
export class AutoFieldTreeSelect extends AutoField {
    static styles = [
        AutoField.styles,
        css`
        sl-tree{
            padding: 0.2em;
            border: 1px solid var(--sl-color-gray-200);
        }
    `] as any
    nodes: TreeNodes = {}
    selection: any[] = []

    connectedCallback() {
        super.connectedCallback()
        const items = this.schema?.items
        if (items) {
            this.nodes = items
            const values = this.schema?.value || []
            this._forEachTree((item: TreeNode, _, level) => {
                if (level < 1 && item.expanded === undefined) {
                    item.expanded = true
                }
                if (values.includes(item.value)) {
                    item.selected = true
                }
            })
        }
    }

    /**
     * 遍历树并对每一个节点进行回调
     * @param callback 
     */
    _forEachTree(callback: (item: TreeNode, parent: TreeNode | undefined, level: number) => void) {
        const forEachItem = (item: TreeNode, parent: TreeNode | undefined, level: number) => {
            callback(item, parent, level)
            if (item.children) {
                const nextLevel = level + 1
                item.children.forEach((child) => {
                    forEachItem(child, item, nextLevel)
                })
            }
        }
        const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes]
        nodes.forEach((item) => {
            forEachItem(item, undefined, 0)
        })
    }
    _renderNode(item: TreeNode, values: any): any {
        const valueKey = this.schema?.valueKey || 'id'
        const isSelected = values.includes((item as any)[valueKey])
        return html`<sl-tree-item 
            data-id=${String((item as any)[valueKey])}
            ?selected=${isSelected}
            ?expanded=${item.expanded}
        >${item.label}        
        ${Array.isArray(item.children) ? html`${item.children.map((child) => {
            return this._renderNode(child, values)
        })}` : ''}</sl-tree-item>`
    }
    _renderNodes(nodes: TreeNodes): any {
        const values = Array.isArray(this.value) ? this.value : [this.value]
        if (Array.isArray(nodes)) {
            return nodes.map(node => {
                return this._renderNode(node as TreeNode, values)
            })
        } else {
            return this._renderNode(nodes as TreeNode, values)
        }
    }
    _onSelectionChange(e: CustomEvent) {
        const selection = Array.from(e.detail.selection) as SlTreeItem[]
        if (selection) {
            this.selection = selection.map((item) => {
                return item.dataset.id
            })
            this.onFieldChange()
        }

    }
    getValue() {
        return this.selection
    }

    renderValue() {
        return html`              
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            selection = "${this.getOptionValue("multiple", true) ? 'multiple' : 'single'}"
            @sl-selection-change=${this._onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-select': AutoFieldTreeSelect
    }
}
