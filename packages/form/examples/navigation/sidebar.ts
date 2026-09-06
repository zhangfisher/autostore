import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { examplesList, type ExampleCategory, type ExampleItem, type ExampleSubCategory } from './examples-list';

@customElement('examples-sidebar')
export class ExamplesSidebar extends LitElement {
	static styles = css`
		:host {
			display: block;
			width: 280px;
			height: 100%;
			background: var(--sl-color-neutral-0);
			border-right: 1px solid var(--sl-color-neutral-200);
			overflow-y: auto;
			font-family: system-ui, -apple-system, sans-serif;
		}

		/* 细滚动条，避免打断树形视觉 */
		:host::-webkit-scrollbar {
			width: 6px;
		}
		:host::-webkit-scrollbar-thumb {
			background: var(--sl-color-neutral-200);
			border-radius: 3px;
		}
		:host::-webkit-scrollbar-thumb:hover {
			background: var(--sl-color-neutral-300);
		}

		.sidebar-header {
			padding: 1.25rem 1rem;
			border-bottom: 1px solid var(--sl-color-neutral-200);
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
		}

		.sidebar-header h2 {
			margin: 0;
			font-size: 1.1rem;
			font-weight: 600;
		}

		.sidebar-header p {
			margin: 0.25rem 0 0 0;
			font-size: 0.75rem;
			opacity: 0.9;
		}

		/* 树容器：--node-x 是引导线与节点圆点的横坐标，
		   与分类头箭头图标中心对齐（padding-left + 图标半宽） */
		.tree {
			--node-x: 1.0625rem;
			padding: 0.5rem 0 1rem;
		}

		.tree-category {
			margin: 0;
		}

		.tree-category + .tree-category {
			margin-top: 0.75rem;
		}

		/* 分类头：粘性定位，长列表滚动时保持可见 */
		.tree-category-header {
			position: sticky;
			top: 0;
			z-index: 2;
			display: flex;
			align-items: center;
			padding: 0.5rem 0.625rem;
			font-size: 0.75rem;
			font-weight: 600;
			color: var(--sl-color-neutral-500);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			cursor: pointer;
			user-select: none;
			background: var(--sl-color-neutral-0);
			border-radius: 6px;
			transition: color 0.15s, background 0.15s;
		}

		.tree-category-header:hover {
			color: var(--sl-color-neutral-900);
			background: var(--sl-color-neutral-50);
		}

		.tree-category-icon {
			display: inline-flex;
			width: 0.875rem;
			height: 0.875rem;
			margin-right: 0.375rem;
			color: var(--sl-color-neutral-400);
			flex-shrink: 0;
			/* 展开时箭头旋转朝下，收起时恢复朝右 */
			transform: rotate(90deg);
			transition: transform 0.2s ease;
		}

		.tree-category-header.collapsed .tree-category-icon {
			transform: rotate(0deg);
		}

		/* 分类条目计数徽标 */
		.tree-category-count {
			margin-left: auto;
			font-size: 0.65rem;
			font-weight: 500;
			line-height: 1;
			padding: 0.2rem 0.45rem;
			border-radius: 999px;
			background: var(--sl-color-neutral-100);
			color: var(--sl-color-neutral-500);
		}

		/* 展开收起：grid-template-rows 0fr/1fr 过渡，双向平滑（max-height: auto 不可过渡） */
		.tree-category-items {
			display: grid;
			grid-template-rows: 1fr;
			transition: grid-template-rows 0.25s ease-out;
		}

		.tree-category-items.collapsed {
			grid-template-rows: 0fr;
		}

		.tree-category-items-inner {
			overflow: hidden;
			min-height: 0;
		}

		/* 子分类头：层级低于分类头，缩进对齐条目引导线 */
		.tree-subcategory-header {
			display: flex;
			align-items: center;
			padding: 0.3rem 0.5rem 0.15rem calc(var(--node-x) + 0.5rem);
			font-size: 0.7rem;
			font-weight: 600;
			color: var(--sl-color-neutral-400);
			cursor: pointer;
			user-select: none;
			transition: color 0.15s;
		}

		.tree-subcategory-header:hover {
			color: var(--sl-color-neutral-700);
		}

		/* 子分类容器：--node-x 与分类层错开，形成两级引导线 */
		.tree-subcategory {
			--node-x: 1.75rem;
		}

		.tree-subcategory + .tree-subcategory {
			margin-top: 0.4rem;
		}

		.tree-subcategory-items {
			display: grid;
			grid-template-rows: 1fr;
			transition: grid-template-rows 0.2s ease-out;
		}

		.tree-subcategory-items.collapsed {
			grid-template-rows: 0fr;
		}

		.tree-subcategory-items-inner {
			overflow: hidden;
			min-height: 0;
		}

		.tree-item {
			position: relative;
			display: flex;
			align-items: center;
			padding: 0.375rem 0.75rem 0.375rem calc(var(--node-x) + 0.75rem);
			font-size: 0.85rem;
			color: var(--sl-color-neutral-600);
			cursor: pointer;
			transition: background 0.15s, color 0.15s;
		}

		/* 竖向引导线：每行绘制自身上半段，连续行自动拼接成整条线，
		   末行止于行中点，无需 last-child 特判 */
		.tree-item::after {
			content: '';
			position: absolute;
			left: var(--node-x);
			top: 0;
			bottom: 50%;
			width: 1px;
			background: var(--sl-color-neutral-200);
			transition: background 0.15s;
		}

		/* 节点圆点：白色描边断开引导线，中心骑在线上 */
		.tree-item::before {
			content: '';
			position: absolute;
			left: calc(var(--node-x) - 0.21875rem);
			top: 50%;
			width: 0.4375rem;
			height: 0.4375rem;
			box-sizing: border-box;
			border-radius: 50%;
			background: var(--sl-color-neutral-300);
			border: 1px solid var(--sl-color-neutral-0);
			transform: translateY(-50%);
			transition: background 0.15s, box-shadow 0.15s;
		}

		.tree-item:hover {
			background: var(--sl-color-neutral-50);
			color: var(--sl-color-neutral-900);
		}

		.tree-item:hover::before {
			background: var(--sl-color-primary-500);
		}

		.tree-item.active {
			background: var(--sl-color-primary-50);
			color: var(--sl-color-primary-700);
			font-weight: 500;
			/* 左缘主色指示条 */
			box-shadow: inset 2px 0 0 var(--sl-color-primary-500);
		}

		.tree-item.active::before {
			background: var(--sl-color-primary-500);
			box-shadow: 0 0 0 3px var(--sl-color-primary-100);
		}

		/* 激活项所在的引导线段同步染主色 */
		.tree-item.active::after {
			background: var(--sl-color-primary-200);
		}

		.tree-item-content {
			flex: 1;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* 悬停提示：fixed 定位脱离折叠容器的 overflow 裁剪，
		   位置由 _showTooltip 按行位置计算，右侧放不下时翻到左侧 */
		.tree-item-tooltip {
			display: none;
			position: fixed;
			transform: translateY(-50%);
			padding: 0.5rem 0.75rem;
			background: var(--sl-color-neutral-800);
			color: white;
			font-size: 0.75rem;
			line-height: 1.4;
			border-radius: 6px;
			white-space: normal;
			width: 200px;
			z-index: 2000;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
			pointer-events: none;
		}

		.tree-item-tooltip.visible {
			display: block;
		}

		.tree-item-tooltip::before {
			content: '';
			position: absolute;
			left: -4px;
			top: 50%;
			transform: translateY(-50%);
			border: 4px solid transparent;
			border-right-color: var(--sl-color-neutral-800);
		}

		.tree-item-tooltip.on-left::before {
			left: auto;
			right: -4px;
			border-right-color: transparent;
			border-left-color: var(--sl-color-neutral-800);
		}

		@media (max-width: 768px) {
			:host {
				width: 100%;
				position: fixed;
				left: -280px;
				transition: left 0.3s;
				z-index: 1000;
			}

			:host.open {
				left: 0;
			}
		}
	`;

	private _expandedCategories = new Set<string>();
	private _currentExample: string = '';

	constructor() {
		super();
		// 默认展开所有分类与子分类
		examplesList.forEach(cat => {
			this._expandedCategories.add(cat.category);
			cat.subcategories?.forEach(sub => this._expandedCategories.add(`${cat.category}/${sub.subcategory}`));
		});
	}

	render() {
		return html`
			<div class="sidebar-header">
				<h2>@autostorejs/form</h2>
				<p>4.x 示例集合</p>
			</div>

			<div class="tree">
				${this._renderCategories()}
			</div>
		`;
	}

	private _renderCategories() {
		return examplesList.map(category => html`
			<div class="tree-category">
				<div
					class="tree-category-header ${!this._expandedCategories.has(category.category) ? 'collapsed' : ''}"
					@click="${() => this._toggleCategory(category.category)}"
				>
					<svg class="tree-category-icon" viewBox="0 0 16 16" fill="currentColor">
						<path d="M6.427 4.427l3.396 3.396a.25.25 0 010 .354l-3.396 3.396A.25.25 0 016 11.396V4.604a.25.25 0 01.427-.177z"/>
					</svg>
					${unsafeHTML(category.category)}
					<span class="tree-category-count">${this._countCategoryItems(category)}</span>
				</div>
				<div class="tree-category-items ${!this._expandedCategories.has(category.category) ? 'collapsed' : ''}">
					<div class="tree-category-items-inner">
						${category.items?.map(item => this._renderItem(item))}
						${category.subcategories?.map(sub => this._renderSubcategory(category.category, sub))}
					</div>
				</div>
			</div>
		`);
	}

	/** 分类条目总数：直接条目 + 各子分类条目之和 */
	private _countCategoryItems(category: ExampleCategory): number {
		return (category.items?.length ?? 0)
			+ (category.subcategories ?? []).reduce((sum, sub) => sum + sub.items.length, 0);
	}

	private _renderSubcategory(categoryName: string, sub: ExampleSubCategory) {
		const key = `${categoryName}/${sub.subcategory}`;
		const expanded = this._expandedCategories.has(key);

		return html`
			<div class="tree-subcategory">
				<div
					class="tree-subcategory-header"
					@click="${() => this._toggleCategory(key)}"
				>
					${sub.subcategory}
					<span class="tree-category-count">${sub.items.length}</span>
				</div>
				<div class="tree-subcategory-items ${expanded ? '' : 'collapsed'}">
					<div class="tree-subcategory-items-inner">
						${sub.items.map(item => this._renderItem(item))}
					</div>
				</div>
			</div>
		`;
	}

	private _renderItem(item: ExampleItem) {
		const isActive = item.id === this._currentExample;

		return html`
			<div
				class="tree-item ${isActive ? 'active' : ''}"
				@click="${() => this._selectExample(item.id)}"
				@mouseenter="${(e: MouseEvent) => this._showTooltip(e)}"
				@mouseleave="${() => this._hideTooltip()}"
				data-example-id="${item.id}"
			>
				<div class="tree-item-content">${item.title}</div>
				<div class="tree-item-tooltip">${item.description}</div>
			</div>
		`;
	}

	/** 悬停提示：按行位置计算 fixed 坐标，右侧放不下时翻到左侧（覆盖窄屏场景） */
	private _showTooltip(e: MouseEvent) {
		const item = e.currentTarget as HTMLElement;
		const tip = item.querySelector('.tree-item-tooltip') as HTMLElement | null;
		if (!tip) return;
		const rect = item.getBoundingClientRect();
		const TOOLTIP_W = 200;
		const GAP = 8;
		const onLeft = rect.right + GAP + TOOLTIP_W > window.innerWidth;
		tip.classList.toggle('on-left', onLeft);
		tip.style.left = onLeft
			? `${rect.left - GAP - TOOLTIP_W}px`
			: `${rect.right + GAP}px`;
		tip.style.top = `${rect.top + rect.height / 2}px`;
		tip.classList.add('visible');
	}

	private _hideTooltip() {
		const tip = this.renderRoot.querySelector('.tree-item-tooltip.visible') as HTMLElement | null;
		tip?.classList.remove('visible');
	}

	private _toggleCategory(category: string) {
		if (this._expandedCategories.has(category)) {
			this._expandedCategories.delete(category);
		} else {
			this._expandedCategories.add(category);
		}
		this.requestUpdate();
	}

	private _selectExample(exampleId: string) {
		this._currentExample = exampleId;
		this.requestUpdate();

		this.dispatchEvent(new CustomEvent('example-selected', {
			detail: { exampleId },
			bubbles: true,
			composed: true
		}));
	}

	setCurrentExample(exampleId: string) {
		this._currentExample = exampleId;
		this.requestUpdate();
	}

	toggle() {
		this.classList.toggle('open');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'examples-sidebar': ExamplesSidebar;
	}
}
