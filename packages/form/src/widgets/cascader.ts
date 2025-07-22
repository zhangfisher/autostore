import { ScrollbarController } from '@/controllers';
import { AutoField } from '@/field';
import { AutoDropdownField } from '@/field/dropdown';
import type { SchemaCascaderWidgetOptions } from 'autostore';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';

export type AutoFieldCascaderOptions = Required<SchemaCascaderWidgetOptions>;

@customElement('auto-field-cascader')
export class AutoFieldCascader extends AutoDropdownField<AutoFieldCascaderOptions> {
    static styles = [
        AutoField.styles,
        AutoDropdownField.styles,
        ScrollbarController.styles,
        css`
            .levels {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: 0;
                max-height: 20em;
                border: var(--auto-border);
                & > sl-menu.level {
                    flex-grow: 1;
                    flex-basis: 0;
                    padding: 0;
                    border-radius: 0;
                    padding: 0.5em;
                    border: none;
                    border-right: var(--auto-border);
                }
                & > sl-menu.level:last-child {
                    border-right: none;
                }
            }
            sl-menu-item::part(submenu-icon) {
                display: none;
            }
            sl-menu-item.focused::part(base) {
                color: var(--auto-theme-color);
            }
            sl-menu-item.selected::part(base) {
                background-color: var(--auto-workspace-color);
            }
            sl-menu-item[data-lazy='idle'] {
                sl-spinner {
                    display: none;
                }
            }
            sl-menu-item[data-lazy='loading'] {
                sl-spinner {
                    display: inline-block;
                }
                sl-icon[slot='suffix'] {
                    display: none;
                }
            }
            sl-menu-item[data-lazy='done'] {
                sl-spinner {
                    display: none;
                }
            }

            .popoup-container.dropdown > .levels {
                border: none;
            }
        `,
    ] as any;

    scrollbar = new ScrollbarController(this);

    @state()
    active: boolean = false;
    @state()
    data: any = {};
    @state()
    level: number = 3;
    @state()
    selected: any[] = [];

    @state()
    focusItems: any[] = [];

    scrollbars: any[] = [];

    getInitialOptions() {
        const opts = Object.assign(super.getInitialOptions(), {
            idKey: 'id',
            rootKey: '$root',
            labelKey: 'label',
            maxLevel: 3,
            childrenKey: 'children',
            select: {},
        }) as AutoFieldCascaderOptions;
        if (!opts.valueKey) opts.valueKey = opts.idKey;
        if (!opts.idKey) opts.idKey = opts.labelKey;
        return opts;
    }
    connectedCallback(): void {
        super.connectedCallback();
        const isChildrenFmt = typeof this.options.select === 'object' && this.options.childrenKey in this.options.select;
        // @ts-ignore
        if (isChildrenFmt) this.options.rootKey = this.options.select[this.options.idKey];
        this.data = isChildrenFmt || Array.isArray(this.options.select) ? this._normalizeData(this.options.select as any) : this.options.select;
        this.selected = this._parseValues(this.value);
        this.focusItems = Array.from({ length: this.options.maxLevel - 1 }).fill(null);
    }
    firstUpdated(): void {
        this._createScrollbars();
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._destoryScrollbars();
    }

    _createScrollbars() {
        const menus = this.shadowRoot?.querySelectorAll('sl-menu');
        menus?.forEach((menu) => {
            this.scrollbars.push(this.scrollbar.create(menu));
        });
    }

    _destoryScrollbars() {
        this.scrollbars?.forEach((scrollbar) => {
            scrollbar.destroy();
        });
    }

    /**
     * 将具有children的嵌套对象转换为
     * key为id{}的平面结构
     */
    _normalizeData(items: Record<string, any> | Record<string, any>[]) {
        const result: Record<string, any[]> = {};
        const handleNode = (item: Record<string, any>, root: boolean = false) => {
            // 使用提供的id或生成的key作为标识符
            const id = (item as any)[this.options.idKey] || (root ? '$root' : undefined);
            if (!id) return;

            // 如果有子节点，递归处理
            const children = (item as any)[this.options.childrenKey || 'children'];
            // 添加到结果对象
            if (children && Array.isArray(children) && children.length > 0) {
                result[id] = children;
                children.forEach((item) => {
                    handleNode(item);
                });
            } else {
                result[id] = [];
            }
        };

        if (Array.isArray(items)) {
            result.$root = items.reduce((r, cur) => {
                r.push(cur);
                handleNode(cur);
                return r;
            }, []);
        } else {
            handleNode(items, true);
        }
        return result;
    }

    _clearFocusItems(level: number) {
        for (let i = level; i <= this.options.maxLevel; i++) {
            const items = Array.from(this.shadow.querySelectorAll(`[data-level='${i}']`));
            items.forEach((item) => {
                item.classList.remove('focused');
            });
        }
    }

    _onSelectItem(e: any) {
        const target = e.detail.item;
        const level = Number(target.dataset.level);
        if (level !== this.options.maxLevel) return;

        const selected: any[] = [];

        const getItemValue = (cid: any, pid: any) => {
            const index = this.data[pid].findIndex((item: any) => {
                return String(item[this.options.idKey]) === String(cid);
            });
            if (index > -1) {
                return [this.data[pid][index][this.options.labelKey], this.data[pid][index][this.options.valueKey]];
            }
        };

        let pid: any = this.options.rootKey;

        for (let i = 0; i < this.focusItems.length; i++) {
            const id = this.focusItems[i];
            const val = getItemValue(id, pid);
            if (!val) return;
            selected.push([id, ...val]);
            pid = id;
        }

        this.selected = selected;
        this.onFieldChange();
    }

    _getSelectedValue(ids: any[]) {
        const values: any[] = [];
        const getItemValue = (cid: any, pid: any) => {
            const index = this.data[pid].findIndex((item: any) => {
                return String(item[this.options.idKey]) === String(cid);
            });
            if (index > -1) {
                return this.data[pid][index][this.options.valueKey];
            }
        };
        let pid: any = this.options.rootKey;
        for (let i = 0; i < ids.length; i++) {
            const id = this.focusItems[i];
            const val = getItemValue(id, pid);
            if (!val) return;
            values.push(val);
            pid = id;
        }
        return values;
    }

    getInputValue() {
        const vals = this.selected.map((v) => {
            return v[2];
        });
        if (typeof this.value === 'string') {
            return vals.join(this.options.delimiter || '');
        } else {
            return vals;
        }
    }

    async _loadItem(target: HTMLElement, id: any, level: number) {
        let hasError: any;
        if (Array.isArray(this.data[id]) && this.data[id].length > 0) {
            target.dataset.lazy = 'done';
            this.requestUpdate();
            return;
        }
        try {
            target.dataset.lazy = 'loading';
            // [] as any
            const items = await this.options.onLoad(id);
            if (Array.isArray(items)) {
                this.data[id] = items;
                items.forEach((item) => {
                    if (item.lazy === undefined && level < this.options.maxLevel) {
                        item.lazy = true;
                    }
                    this.data[item[this.options.idKey]] = [];
                });
                this.requestUpdate();
            }
        } catch (e) {
            target.dataset.lazy = 'true';
            hasError = e;
        } finally {
            if (!hasError) {
                target.dataset.lazy = 'done';
            }
        }
    }

    _onItemMouseOverr(e: any) {
        const target = e.target;
        const id = target.dataset.id;
        const level = Number(target.dataset.level);
        if (this.focusItems[level - 1] === id) return;

        this._clearFocusItems(level);
        target.classList.add('focused');

        const lazy = target.dataset.lazy;
        if (lazy === 'idle') {
            this._loadItem(target, id, level);
        }
        this.focusItems[level - 1] = id;
        this.focusItems.forEach((_, index) => {
            if (index > level - 1) {
                this.focusItems[index] = null;
            }
        });
        this.focusItems = [...this.focusItems];
    }

    _renderLevel(items: any[], level: number = 1, pid?: any) {
        if (!items) return;
        return html`<sl-menu class="level" @sl-select=${level === this.options.maxLevel ? this._onSelectItem.bind(this) : null}>
            ${repeat(items, (item) => {
                const id = item[this.options.idKey];
                const isSelected: boolean = this.selected[level - 1]?.[0] === item[this.options.idKey];
                const isLazyIdle = item.lazy || (Array.isArray(this.data[id]) && this.data[id].length === 0);
                return html` <sl-menu-item
                    type="checkbox"
                    data-level=${level}
                    data-id=${item[this.options.idKey]}
                    data-pid=${ifDefined(pid)}
                    data-lazy=${ifDefined(isLazyIdle ? 'idle' : undefined)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${isSelected}
                    class="${ifDefined(isSelected ? 'selected' : undefined)}"
                >
                    ${item[this.options.labelKey]}
                    ${when(level < this.options.maxLevel, () => {
                        return html`${when(item.lazy, () => html`<sl-spinner slot="suffix"></sl-spinner>`)}
                            <sl-icon library="system" name="chevron-right" slot="suffix"></sl-icon>`;
                    })}
                </sl-menu-item>`;
            })}
        </sl-menu>`;
    }

    _parseValues(value: any) {
        let values: any[] = [];
        const selected: any[] = [];
        if (Array.isArray(value)) {
            values = value;
        } else if (value && typeof value === 'string') {
            if (this.options.delimiter && this.options.delimiter.length > 0) {
                values = value.split(this.options.delimiter);
            } else {
                // 没有指定分割符时
                let items = this.data[this.options.rootKey] as any[];
                let r = value;
                while (true) {
                    const item = items.find((item) => {
                        return r.startsWith(item[this.options.valueKey]);
                    });
                    if (item) {
                        values.push(item[this.options.valueKey]);
                        r = r.substring(item[this.options.valueKey].length);
                        items = this.data[item[this.options.idKey]];
                        if (!items) break;
                    } else {
                        break;
                    }
                }
            }
        }
        if (values.length > 0) {
            let level = this.data[this.options.rootKey] as any[];
            for (let i = 0; i < values.length; i++) {
                const val = values[i];
                const item = level.find((item) => {
                    return item[this.options.valueKey] === val;
                });
                if (item) {
                    selected.push([item[this.options.idKey], item[this.options.labelKey], item[this.options.valueKey]]);
                    level = this.data[item[this.options.idKey]];
                    if (!level) break;
                } else {
                    break;
                }
            }
        }
        return selected;
    }

    renderSelection() {
        return html`
            ${this.selected
                .map((item) => {
                    return item[1];
                })
                .join(this.options.delimiter || '')}
        `;
    }
    renderDropdown() {
        const root = this.data[this.options.rootKey];
        const focusItems = this.focusItems;
        return html`<div class="levels">
            ${repeat(Array.from({ length: this.options.maxLevel }), (_, index) => {
                if (index === 0) {
                    return this._renderLevel(root, index + 1, this.options.rootKey);
                } else {
                    const curId = focusItems[index - 1];
                    const items = this.data[curId];
                    if (items) {
                        return this._renderLevel(items, index + 1, curId);
                    } else {
                        return this._renderLevel([], index + 1, curId);
                    }
                }
            })}
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-cascader': AutoFieldCascader;
    }
}
