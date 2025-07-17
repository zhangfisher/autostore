import { ScrollbarController } from "@/controllers"
import { AutoField } from "@/field"
import { AutoDropdownField } from "@/field/dropdown"
import type { SlMenuItem } from "@shoelace-style/shoelace"
import type { SchemaCascaderDataItem, SchemaCascaderWidgetOptions } from "autostore"
import { css, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { repeat } from "lit/directives/repeat.js"
import { when } from "lit/directives/when.js"

export type AutoFieldCascaderOptions = Required<SchemaCascaderWidgetOptions>


@customElement('auto-field-cascader')
export class AutoFieldCascader extends AutoDropdownField<AutoFieldCascaderOptions> {
    static styles = [
        AutoField.styles,
        AutoDropdownField.styles,
        ScrollbarController.styles,
        css`
            .levels{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap:0;
                max-height: 20em;
                & > sl-menu.level{
                    flex-grow: 1;
                    flex-basis: 0;
                    padding: 0;
                    border-radius: 0;
                    padding: 0.5em;
                }
            }
            sl-menu-item::part(submenu-icon){
                display: none;
            }
            sl-menu-item.focused::part(base){
                color:var(--auto-theme-color);
            } 
            sl-menu-item.selected::part(base){
                background-color: var(--auto-workspace-color); 
            }
        `
    ] as any

    scrollbar = new ScrollbarController(this)

    @state()
    active: boolean = false

    @state()
    data: any = {}

    @state()
    level: number = 3

    @state()
    selected: any[] = []

    @state()
    focusItems: any[] = []

    scrollbars: any[] = []


    getInitialOptions() {
        const opts = Object.assign(super.getInitialOptions(), {
            idKey: 'id',
            rootKey: 'root',
            labelKey: 'label',
            maxLevel: 3,
            data: {}
        }) as AutoFieldCascaderOptions
        if (!opts.valueKey) opts.valueKey = opts.idKey
        if (!opts.idKey) opts.idKey = opts.labelKey
        return opts
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.data = this.options.childrenKey ? this._toFlatData(this.options.data as any) : this.options.data
        const delimiter = this.options.delimiter || ''
        this.selected = this._parseValues(this.value)

        console.log("this.selected=", this.selected)

        this.focusItems = Array.from({ length: this.options.maxLevel - 1 }).fill(null)
    }
    firstUpdated(): void {
        this._createScrollbars()
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this._destoryScrollbars()
    }

    _createScrollbars() {
        const menus = this.shadowRoot?.querySelectorAll('sl-menu')
        menus?.forEach((menu) => {
            this.scrollbars.push(this.scrollbar.create(menu))
        })
    }

    _destoryScrollbars() {
        this.scrollbars?.forEach((scrollbar) => {
            scrollbar.destroy()
        })
    }

    /**
     * 将具有children的嵌套对象转换为
     * key为id{}的平面结构
     */
    _toFlatData(items: Record<string, SchemaCascaderDataItem>) {
        const result: Record<string, SchemaCascaderDataItem> = {};
        const handleNode = (item: SchemaCascaderDataItem, root: boolean = false) => {
            // 使用提供的id或生成的key作为标识符
            const id = (item as any)[this.options.idKey] || root ? 'root' : undefined
            if (!id) return;
            // 添加到结果对象
            result[id] = item;

            // 如果有子节点，递归处理
            const children = (item as any)[this.options.childrenKey]
            if (children && Array.isArray(children) && children.length > 0) {
                children.forEach((item) => {
                    handleNode(item);
                });
            }
        };
        handleNode(items, true);
        return result;
    }


    _clearFocusItems(level: number) {
        for (let i = level; i <= this.options.maxLevel; i++) {
            const items = Array.from(this.shadow.querySelectorAll(`[data-level='${i}']`))
            items.forEach(item => {
                item.classList.remove('focused')
            })
        }
    }

    _onItemMouseOverr(e: any) {
        const target = e.target
        const id = target.dataset.id
        const level = Number(target.dataset.level)
        if (this.focusItems[level - 1] === id) return

        this._clearFocusItems(level)
        target.classList.add('focused')

        this.focusItems[level - 1] = id
        this.focusItems.forEach((_, index) => {
            if (index > level - 1) {
                this.focusItems[index] = null
            }
        })
        this.focusItems = [...this.focusItems]
    }

    _onSelectItem(e: any) {
        const item = (e.detail as any).item as SlMenuItem
        const path = this.focusItems.map(item => {
            return this.data[item]
        })


    }

    getInputValue() {
        return this.selected.map((item) => {
            return (item as any)[this.options.labelKey]
        }).join(this.options.delimiter)
    }

    _renderLevel(items: any[], level: number = 1) {

        return html`<sl-menu class="level" 
            @sl-select=${level === this.options.maxLevel ? this._onSelectItem.bind(this) : null}>
                ${repeat(items, (item) => {
            const isSelected: boolean = this.selected[level - 1] === item[this.options.valueKey]
            return html`
                <sl-menu-item
                 type="checkbox"
                    data-level=${level}
                    data-id=${item[this.options.idKey]}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${isSelected}
                    class="${ifDefined(isSelected ? 'selected' : undefined)}"
                >
                    ${item[this.options.labelKey]}
                    ${when(level < this.options.maxLevel, () => html`<sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`)}                    
                </sl-menu-item>`
        })}
            </sl-menu>`
    }

    _parseValues(value: any) {
        if (Array.isArray(value)) {
            return value
        } else if (value && typeof value === 'string') {
            if (this.options.delimiter && this.options.delimiter.length > 0) {
                return value.split(this.options.delimiter)
            } else {
                let items = this.data[this.options.rootKey] as any[]
                let r = value
                const values: any[] = []
                while (true) {
                    const item = items.find((item) => {
                        return r.startsWith(item[this.options.valueKey])
                    })
                    if (item) {
                        values.push(item[this.options.valueKey])
                        r = r.substring(item[this.options.valueKey].length)
                        items = this.data[item[this.options.idKey]]
                        if (!items) break
                    } else {
                        break
                    }
                }
                return values
            }
        } else {
            return []
        }
    }

    renderSelection() {
        return html`
            ${this.selected}
        `
        //     return html`<div class="selection" slot="trigger">              
        //     ${when(this.selected.length === 0 && this.options.placeholder
        //         , () => html`<span class='placeholder'>${this.options.placeholder}</span>`)}
        //     ${this._renderItems(this.selected, false)}
        //     <span class='suffix'>
        //         <sl-icon 
        //             library="system" 
        //             class="chevron ${classMap({ active: this.active })}" 
        //             name="chevron-down" 
        //             aria-hidden="true">
        //         </sl-icon>
        //     </span>  
        // </div>`
    }
    renderDropdown() {
        const root = this.data[this.options.rootKey]
        const selected = this.selected
        const focusItems = this.focusItems
        return html`<div class="levels">
                ${repeat(Array.from({ length: this.options.maxLevel }), (_, index) => {
            if (index === 0) {
                return this._renderLevel(root, index + 1)
            } else {
                const curId = focusItems[index - 1]
                const items = this.data[curId]
                if (items) {
                    return this._renderLevel(items, index + 1)
                } else {
                    return this._renderLevel([], index + 1)
                }
            }
        })}</div>`
    }



}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-cascader': AutoFieldCascader
    }
}