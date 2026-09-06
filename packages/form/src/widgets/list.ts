import { query, state } from "lit/decorators.js";
import { AutoField } from "@/field";
import { AutoDropdownField } from "@/field/dropdown";
import { css, html } from "lit";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
// menu-item 内部仅复用 SlIcon 类不注册 sl-icon 元素，候选项前缀图标渲染在本组件
// shadow 树中，须显式注册
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/tag/tag.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { when } from "lit/directives/when.js";
import { tag } from "@/utils/tag";
import { classMap } from "lit/directives/class-map.js";
import { AsyncOptionState } from "@/controllers/asyncState";
export type ListItem = {
	id: any;
	value?: any;
	label?: string;
	icon?: string;
} & Record<string, any>;
/**
 * list 列表选择 widget 的配置类型
 * （maxItems/minItems/itemTemplate 是死配置——声明未读，不上类型，ADR-0004）
 */
export interface AutoFieldListOptions {
	/**
	 * 候选项（或其异步提供者）
	 */
	choices?: ListItem[] | (() => ListItem[] | Promise<ListItem[]>);
	/**
	 * 候选项取值字段名，默认 "value"
	 */
	valueKey?: string;
	/**
	 * 候选项标签字段名，默认 "label"
	 */
	labelKey?: string;
	/**
	 * 是否多选，默认 false
	 */
	multiple?: boolean;
	/**
	 * 是否以下拉面板渲染（false 时平铺直接渲染），默认 false
	 */
	dropdown?: boolean;
	/**
	 * 下拉模式下触发器中最多直接显示的已选标签数，超出折叠为 +N（默认 3）
	 */
	maxTagCount?: number;
	/**
	 * 候选项渲染定制：字符串模板（{key} 插值）或函数
	 */
	renderItem?: string | ((item: any) => any);
}
@tag("auto-field-list")
export class AutoFieldList extends AutoDropdownField<AutoFieldListOptions> {
	static styles = [
		AutoField.styles,
		AutoDropdownField.styles,
		css`
            sl-menu-item[checked] {
                background-color: color-mix(in srgb, var(--auto-theme-color) 10%, transparent);
            }
            .header {
                padding: 0.5em;
                padding-bottom: 0.5em;
            }
            .footer {
                padding: 0.5em;
                padding-top: 0.5em;
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
            sl-menu-item::part(label) {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: var(--auto-font-size);
                & :first-child {
                    flex-grow: 1;
                }
            }
            /* dropdown 面板内的 menu 去自身边框与圆角——面板外框由基类
               .popoup-container.dropdown 单一提供，menu 直角铺满容器，
               底部圆角才不会被 menu 背景盖住 */
            .popoup-container sl-menu {
                border: 0px;
                border-radius: 0px;
                background-color: transparent;
            }
            /* ============ 列表滚动条：低调 8px，hover 容器时才显示 ============ */
            /* Firefox */
            sl-menu {
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                transition: scrollbar-color 0.3s ease;
            }
            sl-menu:hover {
                scrollbar-color: var(--sl-color-neutral-300, #cbd5e1) transparent;
            }
            /* WebKit（Chrome/Safari/Edge） */
            sl-menu::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            sl-menu::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 4px;
                transition: background-color 0.3s ease;
            }
            sl-menu:hover::-webkit-scrollbar-thumb {
                background-color: var(--sl-color-neutral-300, #cbd5e1);
            }
            sl-menu:hover::-webkit-scrollbar-thumb:hover {
                background-color: var(--sl-color-neutral-400, #94a3b8);
            }
            /* ============ 下拉触发器 tags（与 tree-dropdown 同款展示） ============
               dropdown 模式走 .content 包裹（自带边框+padding），sl-dropdown 直接
               挂 .content 下；.selection 单行高度、无边框。溢出不可滚——tag 数量
               交由 maxTagCount 折叠控制（触发器内滚动交互差），隐藏溢出即可 */
            .content > sl-dropdown .selection {
                height: auto;
                min-height: var(--auto-line-height);
                max-height: 12rem;
                overflow: hidden;
                & > .select-value {
                    display: block;
                    & > .tags {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                }
                sl-tag {
                    margin-right: 0.5rem;
                    margin-top: 0.1rem;
                    margin-bottom: 0.1rem;
                }
            }
            sl-icon.chevron {
                transition: all 0.2s ease-in;
                &.active {
                    transform: rotate(-180deg);
                }
            }
        `,
	] as any;
	selection: any[] = [];
	valueKey: string = "value";
	labelKey: string = "label";
	items = new AsyncOptionState<any[]>(this, "choices", (items) => {
		// choices 可能短暂处于非数组形态（异步中转/选项重建），与 select 一律先验数组再消费
		if (!items || !Array.isArray(items)) return [];
		// 由状态值重建选中集合：只收状态中实际存在的值，保证与 this.value 一致。
		// hostUpdate 每次 host 更新都会触发 load（联动刷新机制），此处必须幂等——
		// 结果与当前 selection 相同时保留原引用，否则每次 load 生成新数组引发
		// 重渲染 → hostUpdate → load 的死循环（页面卡死）
		const next = valuesOf(this.value).filter((value) =>
			items.some((item: any) => item[this.options.valueKey] === value),
		);
		const same =
			next.length === this.selection.length &&
			next.every((v, i) => v === this.selection[i]);
		if (!same) {
			this.selection = next;
		}
		return items;
	});
	/**
	 * 渲染路径安全读取候选项：AsyncOptionState 初次 load 完成前 _value 为 undefined，
	 * 直接交给 repeat/迭代会抛 "items is not iterable"
	 */
	get loadedItems(): any[] {
		return this.items.value || [];
	}
	@state()
	selectedTips: string = "";
	@query("sl-menu")
	menu?: any;
	getInitialOptions() {
		return {
			valueKey: "value",
			labelKey: "label",
			multiple: false,
			maxItems: 0,
			minItems: 0,
			dropdown: false,
			maxTagCount: 3,
			itemTemplate: undefined,
			choices: [],
		};
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.options) {
			this.setPresetActions();
		}
		this.style.height = "auto";
	}
	/**
	 * options 会在 schema 迟到提交时被 updateOptions 整体重建，预设按钮须在重建后重新挂载
	 */
	updateOptions() {
		super.updateOptions();
		this.setPresetActions();
	}
	isItemSelected(item: any) {
		if (this.value === undefined) return false;
		if (this.options.multiple === false) {
			return this.value === item[this.options.valueKey];
		} else {
			return this.value.includes(item[this.options.valueKey]);
		}
	}
	_addSecectItem(newItem: any) {
		const value = newItem[this.options.valueKey];
		if (!this.selection.includes(value)) {
			if (this.options.multiple === false && this.selection.length > 0) {
				this.selection.splice(0, this.selection.length);
			}
			this.selection.push(value);
		}
	}
	_removeSelectItem(value: any) {
		const index = this.selection.findIndex((item) => item === value);
		if (index > -1) {
			this.selection.splice(index, 1);
		}
		this.onFieldChange();
		this.requestUpdate();
	}
	_onSelectItem(e: MouseEvent) {
		const item = (e.detail as any).item as any;
		const index = item.dataset.index;
		const itemData = this.loadedItems[index];
		if (itemData) {
			if (item.checked) {
				this._addSecectItem(itemData);
			} else {
				this._removeSelectItem(itemData[this.options.valueKey]);
			}
			this.selectedTips = `${this.selection.length}/${this.loadedItems.length}`;
			this.onFieldChange();
		}
	}
	_renderItem(item: ListItem) {
		const renderItem = this.options.renderItem;
		if (typeof renderItem === "string") {
			return html`${unsafeHTML(
				renderItem.replace(/\{(.+?)\}/g, (_: string, key: string) => {
					return item[key];
				}),
			)}`;
		} else if (typeof renderItem === "function") {
			return html`${unsafeHTML(renderItem(item))}`;
		} else {
			return item.label;
		}
	}
	_onClickPresetAction(id: string) {
		if (id === "all") {
			this.selection = this.loadedItems.map((item) => item[this.options.valueKey]);
		} else if (id === "reverse") {
			this.selection = this.loadedItems
				.filter((item) => {
					return !this.selection.includes(item[this.options.valueKey]);
				})
				.map((item) => item[this.options.valueKey]);
		} else if (id === "clear") {
			this.selection = [];
		}
		this.onFieldChange();
		this.requestUpdate();
	}
	setPresetActions() {
		const presetActions: any[] = [];
		if (this.options.multiple) {
			presetActions.push(
				...[
					{ id: "all", label: "全选", onClick: () => this._onClickPresetAction("all") },
					{ id: "reverse", label: "反选", onClick: () => this._onClickPresetAction("reverse") },
					{ id: "clear", label: "清空", onClick: () => this._onClickPresetAction("clear") },
				],
			);
		}
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
			return [...this.selection];
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
	_renderList() {
		const values = valuesOf(this.value);
		return html` <sl-menu
            class="mark-err ${classMap({
				multiple: this.options.multiple,
			})}"
            style=${styleMap({ maxHeight: this.options.height })}
            @sl-select=${this._onSelectItem.bind(this)}
        >
            ${repeat(this.loadedItems, (item: any, index: number) => {
				const isSelected = values.includes((item as any)[this.options.valueKey]);
				return html`<sl-menu-item type="checkbox"
                    data-index=${String(index)} .checked=${isSelected}>
                    ${when(item.icon, () => {
						return html`<sl-icon slot="prefix" name="${item.icon}"></sl-icon>`;
					})}
                    <auto-flex no-border no-padding flex="row" style="width:100%;"> ${this._renderItem(item)} </auto-flex>
                </sl-menu-item>`;
			})}
        </sl-menu>`;
	}
	_renderHeader() {
		return html`${when(this.beforeActions.length > 0, () => html`<div class="header">${this.renderBeforeActions()}</div>`)}
        `;
	}
	_renderFooter() {
		if (!this.options.multiple && this.afterActions.length === 0) return;
		return html`<div class="footer">
            ${this.renderAfterActions()}
            <span class="detail"> ${this.selection.length}/${this.loadedItems.length} </span>
        </div>`;
	}
	/**
	 * 下拉触发器内容（骨架由基类 _renderSelection 提供：icon/placeholder/chevron）：
	 * 多选与 tree-dropdown 同款——tags 容器内 removable tag（sl-remove 直接移除、
	 * 点击阻止冒泡，超 maxTagCount 折叠 +N），单选显示标签文本
	 */
	renderSelection() {
		const labelKey = this.options.labelKey || "label";
		const maxTags = this.options.maxTagCount;
		const getLabel = (value: any) => {
			const item = this.loadedItems.find(
				(item: any) => item[this.options.valueKey] === value,
			);
			return item ? item[labelKey] : value;
		};
		if (this.options.multiple) {
			return html`<span class="tags">
                ${this.selection
					.slice(0, maxTags)
					.map(
						(value) =>
							html`<sl-tag
                                data-id="${value}"
                                removable
                                @sl-remove=${this._onRemoveTag.bind(this)}
                                @click=${(e: any) => e.stopPropagation()}
                                >${getLabel(value)}</sl-tag
                            >`,
					)}
                ${when(
					this.selection.length > maxTags,
					() =>
						html`<sl-tag>+${this.selection.length - maxTags}</sl-tag>`,
				)}
            </span>`;
		}
		return html`${getLabel(this.selection[0])}`;
	}
	/**
	 * 触发器 tag 上的移除（与 tree-dropdown 的 _onRemoveSelection 同款）：
	 * 从 selection 移除后写回状态并刷新
	 */
	_onRemoveTag(e: any) {
		this._removeSelectItem(e.target.dataset.id);
		e.stopPropagation();
	}
	/**
	 * 下拉面板内容：头部操作 + 列表 + 底部统计
	 */
	renderDropdown() {
		return html`${when(
			this.items.loading,
			() => {
				return html`<auto-loading></auto-loading>`;
			},
			() => {
				return html`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`;
			},
		)}`;
	}
	renderInput() {
		if (this.options.dropdown) {
			// dropdown 模式下触发器行只放 sl-dropdown 本身：基类 renderInput 会把
			// 字段级 actions 渲染在触发器两侧，预设的全选/反选/清空不应挤进来，
			// 它们只保留在下拉面板 footer（_renderFooter）
			return html`<div class="content">
                <sl-dropdown
                    size="${this.context.size}"
                    @sl-show=${() => {
						this.active = true;
					}}
                    @sl-after-hide=${() => {
						this.active = false;
					}}
                    sync="width"
                    distance="12"
                    .containingElement="${this}"
                >
                    ${this._renderSelection()} ${this._renderContent()}
                </sl-dropdown>
            </div>`;
		}
		// 平铺直渲染：loading + 头部操作 + 列表 + 底部统计
		return html`${when(
			this.items.loading,
			() => {
				return html`<auto-loading></auto-loading>`;
			},
			() => {
				return html`${this._renderHeader()} ${this._renderList()} ${this._renderFooter()}`;
			},
		)}`;
	}
}
/**
 * 状态值统一转数组（多选取数组本身，单选包一层），空值安全
 */
function valuesOf(value: any): any[] {
	if (value === undefined || value === null || value === "") return [];
	return Array.isArray(value) ? value : [value];
}
declare global {
	interface HTMLElementTagNameMap {
		"auto-field-list": AutoFieldList;
	}
}
declare module "autostore" {
	interface AutoStoreWidgets {
		list: AutoFieldListOptions;
	}
}
