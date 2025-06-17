import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { SlTreeItem } from '@shoelace-style/shoelace';
import { initFieldOptions } from "@/utils/initFieldOptions";


export type TreeNode = {
    id?: string | number
    label?: string
    icon?: string
    value?: string
    selected?: boolean
    expanded?: boolean
    children?: TreeNode[]
}

export type TreeNodes = TreeNode[] | TreeNode

export type TreeSelectedItem = {
    id: any
    value: any
    path: any
}

export type AutoTreeSelectOptions = {
    items: TreeNodes
    idKey: string
    valueKey: string    // 用于值
    labelKey: string    // 用于显示,默认为label 
    multiple: boolean
    maxItems: number
    minItems: number
    onlySelectLeaf: boolean             //只选择叶子节点    
    // 是否在选择项显示为路径, =true，则使用labelKey组成路径
    showAsPath: boolean
    onSelectionChange: (selection: TreeSelectedItem[]) => void
}

@customElement('auto-field-tree-select')
export class AutoFieldTreeSelect extends AutoField<AutoTreeSelectOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-color-gray-200);
            }
    `] as any
    nodes: TreeNodes = {}
    selection: TreeSelectedItem[] = []
    idKey: string = 'id'
    valueKey: string = 'id'
    labelKey: string = 'label'

    connectedCallback() {
        super.connectedCallback()
        if (this.field) {
            this.idKey = this.field.idKey.value || 'id'
            this.valueKey = this.field.valueKey.value || this.idKey
            this.labelKey = this.field.labelKey.value || 'label'
            const items = this.field.items.value
            if (items) {
                this.nodes = items
                this._forEachTree((item: any, _, level, path) => {
                    if (level < 1 && item.expanded === undefined) {
                        item.expanded = true
                    }
                    if (this.isItemSelected(item)) {
                        item.selected = true
                        this.selection.push({
                            id: item[this.idKey],
                            value: item[this.valueKey],
                            path: path.join('/')
                        })
                    }
                })
            }
        }
    }

    isItemSelected(item: any) {
        if (this.value === undefined) return false
        if (this.schema!.multiple === false) {
            return this.value === item[this.valueKey]
        } else {
            return this.value.includes(item[this.valueKey])
        }
    }

    getInitialValue() {
        const initial = super.getInitialValue()
        if (this.schema!.multiple) {
            return Array.isArray(initial) ? initial : [initial]
        } else {
            return initial
        }
    }

    /**
     * 遍历树并对每一个节点进行回调
     * @param callback 
     */
    _forEachTree(callback: (item: TreeNode, parent: TreeNode | undefined, level: number, path: string[]) => void) {
        const forEachItem = (item: TreeNode, parent: TreeNode | undefined, level: number, path: string[]) => {
            const curPath = [...path, (item as any)[this.labelKey]]
            callback(item, parent, level, curPath)
            if (item.children) {
                const nextLevel = level + 1
                item.children.forEach((child) => {
                    forEachItem(child, item, nextLevel, [...curPath])
                })
            }
        }
        const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes]
        nodes.forEach((item) => {
            forEachItem(item, undefined, 0, [])
        })
    }
    _renderNode(item: TreeNode & Record<string, any>, values: any, parentPath: string[]): any {
        const isSelected = values.includes((item as any)[this.valueKey])
        const curPath = [...parentPath, (item as any)[this.labelKey]]
        return html`<sl-tree-item 
            data-id=${String(item[this.idKey])}
            data-value=${String(item[this.valueKey])}
            data-path=${curPath.join('/')}
            ?selected=${isSelected}
            ?expanded=${item.expanded}
        >${item.label}        
        ${Array.isArray(item.children) ? html`${item.children.map((child) => {
            return this._renderNode(child, values, curPath)
        })}` : ''}</sl-tree-item>`
    }
    _renderNodes(nodes: TreeNodes): any {
        const values = Array.isArray(this.value) ? this.value : [this.value]
        if (Array.isArray(nodes)) {
            return nodes.map(node => {
                return this._renderNode(node as TreeNode, values, [])
            })
        } else {
            return this._renderNode(nodes as TreeNode, values, [])
        }
    }

    getFieldOptions() {
        const options = super.getFieldOptions()
        initFieldOptions(options, {
            multiple: false,
            idKey: 'id',
            valueKey: 'label',
            labelKey: 'label',
            showAsPath: true,
            onlySelectLeaf: false
        })
        return options
    }

    onSelectionChange(e: CustomEvent) {
        const selection = Array.from(e.detail.selection) as SlTreeItem[]
        if (selection) {
            this.selection = selection.map((item) => {
                return {
                    id: item.dataset.id,
                    value: item.dataset.value,
                    path: item.dataset.path
                }
            })
            if (this.schema && typeof (this.schema.onSelectionChange) === 'function') {
                this.schema.onSelectionChange(this.selection)
            }
            this.onFieldChange()
        }

    }
    getValue() {
        return this.selection.map(item => item.value)
    }

    renderTree() {
        return html`
        <sl-tree 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}   
            selection = "${this.field.onlySelectLeaf.value ? 'leaf' : (this.field.multiple.value ? 'multiple' : 'single')}"
            @sl-selection-change=${this.onSelectionChange.bind(this)}
        >${this._renderNodes(this.nodes)}</sl-tree> 
        `
    }

    renderValue() {
        return html`              
            ${this.renderTree()}
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-select': AutoFieldTreeSelect
    }
}
