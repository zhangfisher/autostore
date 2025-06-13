import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement, query, state } from "lit/decorators.js"
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace';
import { when } from "lit/directives/when.js";
import { repeat } from "lit/directives/repeat.js";
import '@shoelace-style/shoelace/dist/components/tag/tag.js';


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


@customElement('auto-field-tree-dropdown-select')
export class AutoFieldTreeDropdownSelect extends AutoField {
    static styles = [
        AutoField.styles,
        css`
            sl-tree{
                padding: 0.2em;
                border: 1px solid var(--sl-color-gray-200);
                background-color: var(--sl-color-neutral-0);
            }
            sl-popup::part(popup){
                z-index: 9;     
                max-height: 500px;
                overflow-y: auto;
            }
            .selection{
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                border: solid var(--sl-input-border-width) var(--sl-input-border-color);
                font-size: var(--sl-input-font-size-medium);
                height: var(--sl-input-height-medium);
                border-radius: var(--sl-input-border-radius-medium);    
                letter-spacing: var(--sl-input-letter-spacing);
                background-color: var(--sl-input-background-color);
                &>.tags{
                    flex-grow: 1;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                &>.suffix{
                    cursor: pointer;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
            }
        `] as any
    nodes: TreeNodes = {}
    selection: any[] = []

    @state()
    active: boolean = false

    @query('sl-tree')
    tree?: SlTree

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
    _renderNode(item: TreeNode): any {
        return html`<sl-tree-item 
            data-id=${String(item.id || item.label)}
            ?selected=${item.selected}
            ?expanded=${item.expanded}
        >${item.label}
        ${Array.isArray(item.children) ? html`${item.children.map((child) => {
            return this._renderNode(child)
        })}` : ''}</sl-tree-item>`
    }
    _renderNodes(nodes: TreeNodes): any {
        if (Array.isArray(nodes)) {
            return nodes.map(node => {
                return this._renderNode(node as TreeNode)
            })
        } else {
            return this._renderNode(nodes as TreeNode)
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
    renderDropdown() {
        return html`
      `
    }
    renderSelection() {
        const values = this.getValue()
        return html`    
            <div class="selection">              
                <span class="prefix"></span>  
                <span class="tags">${repeat(values, (value) => {
            return html`<sl-tag removable>${value}</sl-tag>`
        })}</span>                
            <span class='suffix'>
            <sl-icon library="system" name="chevron-down" aria-hidden="true"></sl-icon>
            </span>  
            </div>
        `
    }
    renderValue() {
        return html`     
          <div class="tree-dropdown" slot="suffix">
            <sl-popup placement="bottom"  sync="width" active>
                <span slot="anchor">                    
                    ${this.renderSelection()}
                </span>
                ${when(this.active, () => html`<div class="box"> 
                    <sl-tree                         
                        name="${this.name}"
                        data-path = ${this.path}   
                        selection = "${this.getOptionValue("selection", 'single')}"
                        @sl-selection-change=${this._onSelectionChange.bind(this)}
                    >${this._renderNodes(this.nodes)}</sl-tree>                     
                </div>`)}                
            </sl-popup>                    
        </div>      
        
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-dropdown-select': AutoFieldTreeDropdownSelect
    }
}
