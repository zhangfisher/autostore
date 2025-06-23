import { customElement, query, state } from "lit/decorators.js"
import { AutoField } from "@/field"
import { css, html } from "lit"
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";


export type ListItem = {
    id: any
    value?: any
    label?: string
    icon?: string
} & Record<string, any>

export type AutoListOptions = {
    items: ListItem[]
    idKey: string
    showIcon: boolean
    valueKey: string    // 用于值
    labelKey: string    // 用于显示,默认为label 
    multiple: boolean
    maxItems: number
    minItems: number
}

@customElement('auto-field-list')
export class AutoFieldList extends AutoField<AutoListOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-menu-item[checked]{
                background-color: var(--sl-color-primary-100);
            }
            .footer{
                padding:4px  0px ;
                padding-top:8px;
                display: flex;
                flex-direction: row;
                align-items: center;                
                &>.detail{            
                    flex-grow        : 1;
                    text-align: right;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-400);
                }
            }
            sl-menu-item::part(label){
                display: flex;
                flex-direction: row;
                align-items: center;
                & :first-child{
                    flex-grow: 1;
                }
            }
            .results{                
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                padding: 4px;
                box-sizing: border-box;
                overflow-x: hidden;
                & > .item{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-radius: 4px;
                    padding: 4px;
                    border: var(--auto-border);
                    background-color: var(--sl-color-gray-50);
                    margin-bottom: 4px; 
                    &:hover{
                        background-color: var(--sl-color-gray-100);
                    }
                    &>:first-child{
                        flex-grow: 1;                        
                        white-space: nowrap; 
                        overflow: hidden;    
                        text-overflow: ellipsis;  
                    }
                }
            } 
            
        `
    ] as any
    selection: any[] = []
    idKey: string = 'id'
    valueKey: string = 'id'
    labelKey: string = 'label'
    items: ListItem[] = []

    @state()
    selectedTips: string = ''

    @query('sl-menu')
    menu?: any

    connectedCallback() {
        super.connectedCallback()
        if (this.field) {
            this.idKey = this.field.idKey.value || 'id'
            this.valueKey = this.field.valueKey.value || this.idKey
            this.labelKey = this.field.labelKey.value || 'label'
            const items = this.field.items.value
            if (items) {
                this.items = items
                this.items.forEach((item: any) => {
                    if (this.isItemSelected(item)) {
                        this.selection.push(item[this.valueKey])
                    }
                })
            }
            this.setPresetActions()
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
    _addSecectItem(newItem: any) {
        const findIndex = this.selection.findIndex(item => {
            //@ts-ignore
            return item[this.idKey] == newItem[this.idKey]
        })
        if (findIndex === -1) {
            if (this.field.multiple.value === false && this.selection.length > 0) {
                this.selection.splice(0, this.selection.length)
            }
            this.selection.push(newItem[this.valueKey])
        }
    }
    _removeSelectItem(item: any) {
        for (let i = this.selection.length - 1; i >= 0; i--) {
            const value = this.selection[i]
            if (value === item) {
                this.selection.splice(i, 1)
            }
        }
        this.onFieldChange()
        this.requestUpdate()
    }
    _onSelectItem(e: MouseEvent) {
        const item = (e.detail as any).item as any
        const id = item.dataset.id
        const itemData = this.items.find(item => String((item as any)[this.idKey]) === id)
        if (itemData) {
            if (item.checked) {
                this._addSecectItem(itemData)
            } else {
                this._removeSelectItem(itemData)
            }
            this.selectedTips = `${this.selection.length}/${this.items.length}`
            this.onFieldChange()
        }
    }
    renderList() {
        const values = Array.isArray(this.value) ? this.value : [this.value]
        const itemTemplate = this.field.itemTemplate?.value
        return html`
        <div class="items" >
            <div class="header">
                ${this.renderBeforeActions()}
            </div>
            <!-- 渲染列表项 -->
            ${this._renderWithSplitPanel(html`
                <sl-menu slot="start" class="mark-err" style=${styleMap({
            maxHeight: this.field.height?.value,
        })}
                    @sl-select=${this._onSelectItem.bind(this)}>
                    ${repeat(this.items, (item: any) => {
            const isSelected = values.includes((item as any)[this.valueKey])
            return html`<sl-menu-item 
                    type="checkbox"                
                    data-id=${String(item[this.idKey])} 
                    .checked=${isSelected}
                >                
                <auto-box no-border no-padding flex="row" grow="first" style="width:100%;">
                        ${this._getItemLabel(item, itemTemplate)}
                        </auto-box>
                </sl-menu-item>`
        })}
                </sl-menu>                            
                `)} 
            <div class="footer">

            ${this.renderAfterActions()}            
                <span class="detail">
                ${this.selection.length}/${this.items.length}
                </span>
            </div>
        </div>
        `
    }
    _renderWithSplitPanel(list: any) {
        //@ts-ignore
        if (this.field?.showResults && this.field?.showResults.value) {
            return html`<sl-split-panel position="60">
                ${list}
                ${this.renderResults()}
            </sl-split-panel>`
        } else {
            return list
        }
    }
    _getItemLabel(item: ListItem, template: string | undefined) {
        if (template) {
            return html`${unsafeHTML(template.replace(/\{(.+?)\}/g, (_: string, key: string) => {
                return item[key]
            }))}`
        } else {
            return item.label
        }

    }
    _onClickPresetAction(id: string) {
        if (id === 'all') {
            this.selection = this.items.map(item => item[this.valueKey])
        } else if (id === 'reverse') {
            this.selection = this.items.filter(item => {
                return !this.selection.includes(item[this.valueKey])
            }).map(item => item[this.valueKey])
        } else if (id === 'clear') {
            this.selection = []
        }
        this.onFieldChange()
        this.requestUpdate()
    }
    setPresetActions() {
        const presetActions = [
            { id: "all", label: '全选', size: 'small', onClick: () => this._onClickPresetAction('all') },
            { id: "reverse", label: '反选', size: 'small', onClick: () => this._onClickPresetAction('reverse') },
            { id: "clear", label: '清空', size: 'small', onClick: () => this._onClickPresetAction('clear') }
        ]
        const toggleAction = (action: any) => {
            for (let i = presetActions.length - 1; i >= 0; i--) {
                if (presetActions[i].id === action.id) {
                    const oldClick = action.onClick
                    action.onClick = () => {
                        presetActions[i].onClick()
                        if (oldClick) oldClick.call(this, this.getInputValue())
                    }
                    presetActions.splice(i, 1)
                }
            }
        }
        if (this.beforeActions && this.beforeActions.length > 0) {
            this.beforeActions.forEach(action => {
                toggleAction(action)
            })
        }
        if (this.afterActions && this.afterActions.length > 0) {
            this.afterActions.forEach(action => {
                toggleAction(action)
            })
        }
        if (presetActions.length > 0) {
            if (!this.afterActions) this.afterActions = []
            // @ts-ignore
            this.afterActions.push(...presetActions)
        }
    }
    getInputValue() {
        if (this.field.multiple.value) {
            return this.selection
        } else {
            return this.selection.length > 0 ? this.selection[0] : undefined
        }
    }
    getShowLabel(item: ListItem) {
        const labelKey = this.field.labelKey.value
        if (labelKey) {
            if (labelKey in item) {
                return (item as any)[labelKey]
            }
        } else {
            return item.label
        }

    }
    renderResults() {
        return html`<auto-box slot="end" 
            class="results mark-err" 
            no-padding 
            style="${styleMap({
            maxHeight: this.field.height?.value
        })}">
            ${repeat(this.selection, (item: any) => {
            return html`<div class="item" >
                    <span>${item}</span>
                    <sl-icon-button name="x" @click=${() => this._removeSelectItem(item)}></sl-icon-button>
                </div>`
        })}
        </auto-box>`
    }
    renderInput() {
        return html`<div class="list">   
                ${this.renderList()}       
        </div>`
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-list': AutoFieldList
    }
}
