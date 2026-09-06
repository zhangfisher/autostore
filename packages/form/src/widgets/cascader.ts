import { AutoField } from "@/field";
import { AutoDropdownField } from "@/field/dropdown";
import { tag } from "@/utils/tag";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
/**
 * cascader 级联选择 widget 的配置类型
 */
export interface AutoFieldCascaderOptions {
	/**
	 * 候选项：树形数据（childrenKey 嵌套）、平铺数据（idKey+rootKey 关联）或其异步提供者
	 */
	choices?:
		| Record<string, any>[]
		| Record<string, any>
		| (() => Record<string, any>[] | Promise<Record<string, any>[]>);
	/**
	 * 节点 id 字段名，默认 "id"
	 */
	idKey?: string;
	/**
	 * 平铺数据中根节点标识值，默认 "$root"
	 */
	rootKey?: string;
	/**
	 * 节点标签字段名，默认 "label"
	 */
	labelKey?: string;
	/**
	 * 节点取值字段名（默认取 idKey）
	 */
	valueKey?: string;
	/**
	 * 子节点字段名，默认 "children"
	 */
	childrenKey?: string;
	/**
	 * 最大级联层级，默认 3
	 */
	maxLevel?: number;
	/**
	 * 值中各级的连接符
	 */
	delimiter?: string;
	/**
	 * 异步加载子节点：入参为当前节点，返回子节点数组
	 */
	onLoad?: (node: any) => Record<string, any>[] | Promise<Record<string, any>[]>;
}
@tag("auto-field-cascader")
export class AutoFieldCascader extends AutoDropdownField<AutoFieldCascaderOptions> {
	static styles = [
		AutoField.styles,
		AutoDropdownField.styles,
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
                background-color: var(--auto-bgcolor);
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
            .popoup-container.dropdown {
                                
            }
            .popoup-container.dropdown > .levels {
                border: none;
            }
        `,
	] as any;
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
	getInitialOptions(): any {
		return Object.assign(super.getInitialOptions(), {
			idKey: "id",
			rootKey: "$root",
			labelKey: "label",
			maxLevel: 3,
			childrenKey: "children",
			choices: {},
		});
	}
	getFieldOptions(): any {
		const opts = super.getFieldOptions();
		// valueKey 默认跟随 idKey：兜底必须在 schema 合并之后执行，
		// 放在 getInitialOptions 里时永远读到默认值 "id"，自定义 idKey 不生效
		if (!opts.valueKey) opts.valueKey = opts.idKey;
		if (!opts.idKey) opts.idKey = opts.labelKey;
		return opts;
	}
	/**
	 * 将 children 嵌套节点（含 onLoad 返回的子树）递归注册进平铺索引 data
	 */
	_registerChildren(items: Record<string, any>[], level: number) {
		items.forEach((item) => {
			const children = (item as any)[this.options.childrenKey || "children"];
			if (Array.isArray(children) && children.length > 0 && level < this.options.maxLevel) {
				this._registerChildren(children, level + 1);
			}
		});
		this._normalizeLevel(items, level);
	}
	/**
	 * 将单层节点写入平铺索引：有子节点登记父->子映射，无子节点占位空数组
	 */
	_normalizeLevel(items: Record<string, any>[], level: number) {
		items.forEach((item) => {
			const id = (item as any)[this.options.idKey];
			if (id === undefined || id === null) return;
			const children = (item as any)[this.options.childrenKey || "children"];
			if (Array.isArray(children) && children.length > 0 && level < this.options.maxLevel) {
				this.data[id] = children;
			} else {
				this.data[id] = [];
			}
		});
	}
	connectedCallback(): void {
		super.connectedCallback();
		this._initChoices();
		this.selected = this._parseValues(this.value);
		this.focusItems = Array.from({ length: this.options.maxLevel - 1 }).fill(null);
	}
	/**
	 * 初始化候选数据：
	 * - 数组/children 嵌套对象：异步提供者返回结果前先置空，返回后规范化
	 * - 平铺对象（idKey+rootKey 关联）：直接作为平铺索引使用
	 */
	private _initChoices() {
		const choices = this.options.choices;
		if (typeof choices === "function") {
			// 异步提供者：调用并等待结果落地后规范化
			this._applyAsyncChoices(choices());
			return;
		}
		if (choices && typeof (choices as any).then === "function") {
			// 联动求值已把函数提供者消费成 Promise，同样等待落地
			this._applyAsyncChoices(choices as Promise<Record<string, any>[]>);
			return;
		}
		const isChildrenFmt =
			typeof choices === "object" && choices !== null && this.options.childrenKey in choices;
		// @ts-ignore
		if (isChildrenFmt) this.options.rootKey = (choices as any)[this.options.idKey];
		this.data = isChildrenFmt || Array.isArray(choices) ? this._normalizeData(choices as any) : {};
	}
	/**
	 * 等待异步 choices 结果落地后规范化为平铺索引
	 */
	private _applyAsyncChoices(result: Record<string, any>[] | Promise<Record<string, any>[]>) {
		this.data = {};
		if (result && typeof (result as any).then === "function") {
			(result as Promise<Record<string, any>[]>).then((items) => {
				if (Array.isArray(items) && items.length > 0) {
					this.data = this._normalizeData(items);
					this._markRootLazy();
					this.requestUpdate();
				}
			});
		} else if (Array.isArray(result)) {
			this.data = this._normalizeData(result);
			this._markRootLazy();
		}
	}
	/**
	 * 异步模式下首级节点标记 idle：hover 时经 onLoad 按需加载子级。
	 * 仅标记无 children 的节点，带子树的由 _registerChildren 递归处理
	 */
	private _markRootLazy() {
		if (typeof this.options.onLoad !== "function") return;
		(this.data[this.options.rootKey] || []).forEach((item: any) => {
			if (item.lazy === undefined && !this._hasRegisteredChildren(item)) {
				item.lazy = "idle";
			}
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
			const id = (item as any)[this.options.idKey] || (root ? "$root" : undefined);
			if (!id) return;
			// 如果有子节点，递归处理
			const children = (item as any)[this.options.childrenKey || "children"];
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
				item.classList.remove("focused");
			});
		}
	}
	_onSelectItem(e: any) {
		const target = e.detail.item;
		const level = Number(target.dataset.level);
		if (level !== this.options.maxLevel) return;
		// 完整路径 = focusItems（1..maxLevel-1 级的 hover 路径）+ 被点击的叶子
		// focusItems 长度为 maxLevel-1，不含叶子本身，须补上否则末级丢失
		const path = [...this.focusItems.slice(0, level - 1), target.dataset.id];
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
		for (let i = 0; i < path.length; i++) {
			const id = path[i];
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
			const id = ids[i];
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
		if (typeof this.value === "string") {
			return vals.join(this.options.delimiter || "");
		} else {
			return vals;
		}
	}
	async _loadItem(id: any, level: number) {
		const item = this._findItemById(id);
		if (!item) return;
		if (Array.isArray(this.data[id]) && this.data[id].length > 0) {
			item.lazy = "done";
			this.requestUpdate();
			return;
		}
		// 未提供 onLoad 时无法加载子节点：立即结束 idle 状态，
		// 否则 await undefined 抛 TypeError 且节点永远停在 loading
		if (typeof this.options.onLoad !== "function") {
			item.lazy = "done";
			this.requestUpdate();
			return;
		}
		item.lazy = "loading";
		this.requestUpdate();
		try {
			const items = await this.options.onLoad(id);
			if (Array.isArray(items)) {
				this.data[id] = items;
				// onLoad 可能返回带 children 的子树（一次性多级），
				// 递归注册全部层级；叶子节点标记 lazy 供下一级按需加载
				this._registerChildren(items, level);
				items.forEach((child) => {
					if (
						child.lazy === undefined &&
						level < this.options.maxLevel - 1 &&
						!this._hasRegisteredChildren(child)
					) {
						child.lazy = "idle";
					}
				});
			}
			item.lazy = "done";
		} catch (e) {
			// 加载失败回 idle 允许重试
			item.lazy = "idle";
		} finally {
			this.requestUpdate();
		}
	}
	/** 按节点 id 在平铺索引中查找原始 item 对象（lazy 状态宿主） */
	_findItemById(id: any) {
		for (const items of Object.values(this.data) as any[][]) {
			const found = items?.find(
				(item) => String(item[this.options.idKey]) === String(id),
			);
			if (found) return found;
		}
		return undefined;
	}
	/** 节点是否已带（已注册的）children——带子树的节点不再标记 lazy */
	_hasRegisteredChildren(item: Record<string, any>): boolean {
		const children = (item as any)[this.options.childrenKey || "children"];
		return Array.isArray(children) && children.length > 0;
	}
	_onItemMouseOverr(e: any) {
		const target = e.target;
		const id = target.dataset.id;
		const level = Number(target.dataset.level);
		if (this.focusItems[level - 1] === id) return;
		this._clearFocusItems(level);
		target.classList.add("focused");
		const item = this._findItemById(id);
		// lazy 状态收在 item 对象上，idle 表示待按需加载子节点
		if (item?.lazy === "idle") {
			this._loadItem(id, level);
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
				const isSelected: boolean = this.selected[level - 1]?.[0] === item[this.options.idKey];
				// data-lazy 完全由 item.lazy 状态渲染（idle/loading/done），
				// 不再手动改 DOM attribute——会被 Lit 重渲染覆盖导致 spinner 规则失配
				return html` <sl-menu-item
                    type="checkbox"
                    data-level=${level}
                    data-id=${item[this.options.idKey]}
                    data-pid=${ifDefined(pid)}
                    data-lazy=${ifDefined(item.lazy || undefined)}
                    @mouseover=${this._onItemMouseOverr.bind(this)}
                    ?checked=${isSelected}
                    class="${ifDefined(isSelected ? "selected" : undefined)}"
                >
                    ${item[this.options.labelKey]}
                    ${when(level < this.options.maxLevel, () => {
						return html`${when(item.lazy === "loading", () => html`<sl-spinner slot="suffix"></sl-spinner>`)}
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
		} else if (value && typeof value === "string") {
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
				.join(this.options.delimiter || "")}
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
		"auto-field-cascader": AutoFieldCascader;
	}
}
declare module "autostore" {
	interface AutoStoreWidgets {
		cascader: AutoFieldCascaderOptions;
	}
}
