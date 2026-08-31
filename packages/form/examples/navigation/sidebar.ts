import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { examplesList, type ExampleItem } from './examples-list';

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

		.sidebar-header {
			padding: 1.5rem 1rem;
			border-bottom: 1px solid var(--sl-color-neutral-200);
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
		}

		.sidebar-header h2 {
			margin: 0;
			font-size: 1.25rem;
			font-weight: 600;
		}

		.sidebar-header p {
			margin: 0.5rem 0 0 0;
			font-size: 0.875rem;
			opacity: 0.9;
		}

		.search-box {
			padding: 1rem;
			border-bottom: 1px solid var(--sl-color-neutral-200);
		}

		.search-box sl-input {
			width: 100%;
		}

		.categories {
			padding: 0.5rem 0;
		}

		.category {
			margin-bottom: 0.5rem;
		}

		.category-header {
			padding: 0.75rem 1rem;
			font-weight: 600;
			color: var(--sl-color-neutral-700);
			background: var(--sl-color-neutral-50);
			border-left: 3px solid var(--sl-color-primary-500);
			cursor: pointer;
			user-select: none;
			transition: all 0.2s;
		}

		.category-header:hover {
			background: var(--sl-color-neutral-100);
		}

		.category-header .toggle-icon {
			float: right;
			transition: transform 0.2s;
		}

		.category-header.collapsed .toggle-icon {
			transform: rotate(-90deg);
		}

		.category-items {
			max-height: 500px;
			overflow: hidden;
			transition: max-height 0.3s ease-out;
		}

		.category-items.collapsed {
			max-height: 0;
		}

		.example-item {
			padding: 0.75rem 1rem 0.75rem 2rem;
			cursor: pointer;
			transition: all 0.2s;
			border-left: 2px solid transparent;
		}

		.example-item:hover {
			background: var(--sl-color-neutral-50);
			border-left-color: var(--sl-color-primary-300);
		}

		.example-item.active {
			background: var(--sl-color-primary-50);
			border-left-color: var(--sl-color-primary-500);
			font-weight: 500;
		}

		.example-item-title {
			font-size: 0.9rem;
			color: var(--sl-color-neutral-800);
			margin-bottom: 0.25rem;
		}

		.example-item-description {
			font-size: 0.75rem;
			color: var(--sl-color-neutral-600);
			line-height: 1.3;
		}

		.example-item.active .example-item-title {
			color: var(--sl-color-primary-700);
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem;
			margin-top: 0.25rem;
		}

		.tag {
			font-size: 0.65rem;
			padding: 0.125rem 0.375rem;
			border-radius: 999px;
			background: var(--sl-color-neutral-200);
			color: var(--sl-color-neutral-700);
		}

		.example-item.active .tag {
			background: var(--sl-color-primary-100);
			color: var(--sl-color-primary-700);
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

	// 状态
	private _expandedCategories = new Set<string>();
	private _currentExample: string = '';
	private _searchQuery: string = '';

	// 初始化所有分类为展开状态
	constructor() {
		super();
		examplesList.forEach(cat => this._expandedCategories.add(cat.category));
	}

	render() {
		return html`
			<div class="sidebar-header">
				<h2>@autostorejs/form</h2>
				<p>4.x 示例集合</p>
			</div>

			<div class="search-box">
				<sl-input
					placeholder="搜索示例..."
					 clearable
					value="${this._searchQuery}"
					@sl-input=${this._onSearch}
				>
					<sl-icon name="search" slot="prefix"></sl-icon>
				</sl-input>
			</div>

			<div class="categories">
				${this._renderCategories()}
			</div>
		`;
	}

	private _renderCategories() {
		const filteredCategories = examplesList.map(category => ({
			...category,
			items: category.items.filter(item =>
				this._searchQuery === '' ||
				item.title.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
				item.tags?.some(tag => tag.toLowerCase().includes(this._searchQuery.toLowerCase()))
			)
		})).filter(category => category.items.length > 0);

		return filteredCategories.map(category => html`
			<div class="category">
				<div
					class="category-header ${!this._expandedCategories.has(category.category) ? 'collapsed' : ''}"
					@click="${() => this._toggleCategory(category.category)}"
				>
					${unsafeHTML(category.category)}
					<span class="toggle-icon">▼</span>
				</div>
				<div class="category-items ${!this._expandedCategories.has(category.category) ? 'collapsed' : ''}">
					${category.items.map(item => this._renderExampleItem(item))}
				</div>
			</div>
		`);
	}

	private _renderExampleItem(item: ExampleItem) {
		const isActive = item.id === this._currentExample;
		const difficultyColor = {
			beginner: 'var(--sl-color-success-500)',
			intermediate: 'var(--sl-color-warning-500)',
			advanced: 'var(--sl-color-danger-500)'
		};

		return html`
			<div
				class="example-item ${isActive ? 'active' : ''}"
				@click="${() => this._selectExample(item.id)}"
				data-example-id="${item.id}"
			>
				<div class="example-item-title">${item.title}</div>
				<div class="example-item-description">${item.description}</div>
				${item.tags ? html`
					<div class="tags">
						${item.tags.map(tag => html`<span class="tag">${tag}</span>`)}
					</div>
				` : ''}
			</div>
		`;
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

		// 触发自定义事件通知父组件
		this.dispatchEvent(new CustomEvent('example-selected', {
			detail: { exampleId },
			bubbles: true,
			composed: true
		}));
	}

	private _onSearch(event: CustomEvent) {
		const input = event.target as HTMLInputElement;
		this._searchQuery = input.value;
		this.requestUpdate();
	}

	// 公共方法：设置当前示例
	setCurrentExample(exampleId: string) {
		this._currentExample = exampleId;
		this.requestUpdate();
	}

	// 公共方法：切换侧边栏（移动端）
	toggle() {
		this.classList.toggle('open');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'examples-sidebar': ExamplesSidebar;
	}
}