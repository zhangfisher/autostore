import { query, state } from 'lit/decorators.js';
import { AutoField } from '@/field';
import { css, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { SchemaListWidgetOptions, SchemaWidgetSelectItem } from 'autostore';
import { when } from 'lit/directives/when.js';
import { ScrollbarController } from '@/controllers/scrollbar';
import { tag } from '@/utils/tag';

export type ListItem = {
    id: any;
    value?: any;
    label?: string;
    icon?: string;
} & Record<string, any>;

export type AutoListOptions = {
    items: ListItem[];
    idKey: string;
    showIcon: boolean;
    valueKey: string; // 用于值
    labelKey: string; // 用于显示,默认为label
    multiple: boolean;
};
export type AutoFieldListOptions = Required<SchemaListWidgetOptions>;

@tag('auto-field-list')
export class AutoFieldList extends AutoField<AutoFieldListOptions> {
    static styles = [
        AutoField.styles,
        ScrollbarController.styles,
        css`
            sl-menu-item[checked] {
                background-color: var(--sl-color-primary-100);
            }
            .header {
                padding: 4px 0px;
                padding-bottom: 8px;
            }
            .footer {
                padding: 4px 0px;
                padding-top: 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
                & > .detail {
                    flex-grow: 1;
                    text-align: right;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-400);
                    padding: 0px 1em;
                }
            }
            sl-menu {
                border: 0px;
            }
            sl-menu-item::part(label) {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                & :first-child {
                    flex-grow: 1;
                }
            }
            sl-split-panel {
                border: var(--auto-border);
            }
            .results > .ss-wrapper > .ss-content {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                padding: 4px;
                box-sizing: border-box;
                overflow-x: hidden;
                font-size: var(--auto-font-size);
                & > .item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-radius: 4px;
                    padding: 4px;
                    border: var(--auto-border);
                    background-color: var(--sl-color-gray-50);
                    margin-bottom: 4px;
                    box-shadow: 1px 1px 1px var(--sl-color-gray-200);
                    &:hover {
                        background-color: var(--sl-color-gray-100);
                    }
                    & > :first-child {
                        flex-grow: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        `,
    ] as any;
    selection: any[] = [];
    valueKey: string = 'id';
    labelKey: string = 'label';
    items: SchemaWidgetSelectItem[] = [];
    scrollbar = new ScrollbarController(this);
    scrollbars: any[] = [];

    @state()
    selectedTips: string = '';

    @query('sl-menu')
    menu?: any;

    getInitialOptions() {
        return {
            valueKey: 'value',
            labelKey: 'label',
            multiple: false,
            maxItems: 0,
            minItems: 0,
            showResults: false,
            itemTemplate: undefined,
            select: [],
        };
    }
    _createScrollbars() {
        const menus = this.shadowRoot?.querySelectorAll('sl-menu,.results');
        menus?.forEach((menu) => {
            this.scrollbars.push(this.scrollbar.create(menu, { width: '5px' }));
        });
    }

    _destoryScrollbars() {
        this.scrollbars?.forEach((scrollbar) => {
            scrollbar.destroy();
        });
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.options) {
            this.valueKey = this.options.valueKey;
            this.labelKey = this.options.labelKey;
            const items = this.options.select;
            if (items) {
                this.items = items;
                this.items.forEach((item: any) => {
                    if (this.isItemSelected(item)) {
                        this.selection.push(item[this.valueKey]);
                    }
                });
            }
            this.setPresetActions();
        }
        this.style.height = 'auto';
    }

    firstUpdated(): void {
        this._createScrollbars();
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._destoryScrollbars();
    }
    isItemSelected(item: any) {
        if (this.value === undefined) return false;
        if (this.options.multiple === false) {
            return this.value === item[this.valueKey];
        } else {
            return this.value.includes(item[this.valueKey]);
        }
    }
    _addSecectItem(newItem: any) {
        const findIndex = this.selection.findIndex((item) => {
            //@ts-ignore
            return item[this.valueKey] === newItem[this.valueKey];
        });
        if (findIndex === -1) {
            if (this.options.multiple === false && this.selection.length > 0) {
                this.selection.splice(0, this.selection.length);
            }
            this.selection.push(newItem[this.valueKey]);
        }
    }
    _removeSelectItem(item: any) {
        for (let i = this.selection.length - 1; i >= 0; i--) {
            const value = this.selection[i];
            if (value === item) {
                this.selection.splice(i, 1);
            }
        }
        this.onFieldChange();
        this.requestUpdate();
    }
    _onSelectItem(e: MouseEvent) {
        const item = (e.detail as any).item as any;
        const index = item.dataset.index;
        const itemData = this.items[index];
        if (itemData) {
            if (item.checked) {
                this._addSecectItem(itemData);
            } else {
                this._removeSelectItem(itemData[this.valueKey]);
            }
            this.selectedTips = `${this.selection.length}/${this.items.length}`;
            this.onFieldChange();
        }
    }
    _renderWithSplitPanel(list: any) {
        if (this.options.showResults) {
            return html`<sl-split-panel position="60"> ${list} ${this.renderResults()} </sl-split-panel>`;
        } else {
            return list;
        }
    }
    _renderItem(item: ListItem) {
        const renderItem = this.options.renderItem;
        if (typeof renderItem === 'string') {
            return html`${unsafeHTML(
                renderItem.replace(/\{(.+?)\}/g, (_: string, key: string) => {
                    return item[key];
                }),
            )}`;
        } else if (typeof renderItem === 'function') {
            return html`${unsafeHTML(renderItem(item))}`;
        } else {
            return item.label;
        }
    }
    _onClickPresetAction(id: string) {
        if (id === 'all') {
            this.selection = this.items.map((item) => item[this.valueKey]);
        } else if (id === 'reverse') {
            this.selection = this.items
                .filter((item) => {
                    return !this.selection.includes(item[this.valueKey]);
                })
                .map((item) => item[this.valueKey]);
        } else if (id === 'clear') {
            this.selection = [];
        }
        this.onFieldChange();
        this.requestUpdate();
    }
    setPresetActions() {
        const presetActions = [
            { id: 'all', label: '全选', onClick: () => this._onClickPresetAction('all') },
            { id: 'reverse', label: '反选', onClick: () => this._onClickPresetAction('reverse') },
            { id: 'clear', label: '清空', onClick: () => this._onClickPresetAction('clear') },
        ];
        const toggleAction = (action: any) => {
            for (let i = presetActions.length - 1; i >= 0; i--) {
                if (presetActions[i].id === action.id) {
                    const oldClick = action.onClick;
                    action.onClick = () => {
                        presetActions[i].onClick();
                        if (oldClick) oldClick.call(this, this.getInputValue());
                    };
                    presetActions.splice(i, 1);
                }
            }
        };
        if (this.beforeActions && this.beforeActions.length > 0) {
            this.beforeActions.forEach((action) => {
                toggleAction(action);
            });
        }
        if (this.afterActions && this.afterActions.length > 0) {
            this.afterActions.forEach((action) => {
                toggleAction(action);
            });
        }
        if (presetActions.length > 0) {
            if (!this.afterActions) this.beforeActions = [];
            // @ts-ignore
            this.afterActions.splice(0, 0, ...presetActions);
        }
    }
    getInputValue() {
        if (this.options.multiple) {
            return this.selection;
        } else {
            return this.selection.length > 0 ? this.selection[0] : undefined;
        }
    }
    getShowLabel(item: ListItem) {
        const labelKey = this.options.labelKey;
        if (labelKey) {
            if (labelKey in item) {
                return (item as any)[labelKey];
            }
        } else {
            return item.label;
        }
    }

    renderResults() {
        return html`<div
            slot="end"
            class="results mark-err"
            no-padding
            style="${styleMap({
                maxHeight: this.options.height,
            })}"
        >
            ${repeat(this.selection, (item: any) => {
                return html`<div class="item">
                    <span>${item}</span>
                    <sl-icon-button name="x" @click=${() => this._removeSelectItem(item)}></sl-icon-button>
                </div>`;
            })}
        </div>`;
    }
    _renderList() {
        const values = Array.isArray(this.value) ? this.value : [this.value];
        return html`${this._renderWithSplitPanel(html` <sl-menu
            slot="start"
            class="mark-err"
            style=${styleMap({ maxHeight: this.options.height })}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${repeat(this.items, (item: any, index: number) => {
                const isSelected = values.includes((item as any)[this.valueKey]);
                return html`<sl-menu-item type="checkbox" data-index=${String(index)} .checked=${isSelected}>
                    ${when(item.icon, () => {
                        return html`<sl-icon slot="prefix" name="${item.icon}"></sl-icon>`;
                    })}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(item)} </auto-flex>
                </sl-menu-item>`;
            })}
        </sl-menu>`)} `;
    }
    _renderHeader() {
        return html`${when(this.beforeActions.length > 0, () => html`<div class="header">${this.renderBeforeActions()}</div>`)}`;
    }
    _renderFooter() {
        return html`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.items.length} </span>
        </div>`;
    }
    renderInput() {
        return html` ${this._renderHeader()} ${this._renderList()} ${this._renderFooter()} `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-list': AutoFieldList;
    }
}
