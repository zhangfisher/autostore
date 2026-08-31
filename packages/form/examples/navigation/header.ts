import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('examples-header')
export class ExamplesHeader extends LitElement {
	static styles = css`
		:host {
			display: block;
			background: var(--sl-color-neutral-0);
			border-bottom: 1px solid var(--sl-color-neutral-200);
			padding: 1rem 1.5rem;
			font-family: system-ui, -apple-system, sans-serif;
		}

		.header-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			max-width: 1200px;
			margin: 0 auto;
		}

		.header-left {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.menu-button {
			display: none;
			background: none;
			border: none;
			cursor: pointer;
			padding: 0.5rem;
			border-radius: 4px;
		}

		.menu-button:hover {
			background: var(--sl-color-neutral-100);
		}

		.title-group h1 {
			margin: 0;
			font-size: 1.5rem;
			font-weight: 600;
			color: var(--sl-color-neutral-800);
		}

		.title-group p {
			margin: 0.25rem 0 0 0;
			font-size: 0.875rem;
			color: var(--sl-color-neutral-600);
		}

		.header-right {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.actions {
			display: flex;
			gap: 0.5rem;
		}

		@media (max-width: 768px) {
			.menu-button {
				display: block;
			}

			.title-group h1 {
				font-size: 1.25rem;
			}

			.header-right {
				gap: 0.5rem;
			}

			.actions sl-button {
				padding: 0.5rem;
			}

			.actions sl-button::part(base) {
				font-size: 0.75rem;
			}
		}
	`;

	@property({ type: String })
	currentExampleTitle: string = '示例选择';

	@property({ type: String })
	currentExampleDescription: string = '请从左侧选择一个示例开始';

	toggleSidebar() {
		const sidebar = document.querySelector('examples-sidebar');
		if (sidebar) {
			sidebar.toggle();
		}
	}

	render() {
		return html`
			<div class="header-content">
				<div class="header-left">
					<button class="menu-button" @click="${this.toggleSidebar}" aria-label="Toggle menu">
						<sl-icon name="list"></sl-icon>
					</button>
					<div class="title-group">
						<h1>${this.currentExampleTitle}</h1>
						<p>${this.currentExampleDescription}</p>
					</div>
				</div>

				<div class="header-right">
					<div class="actions">
						<sl-button variant="text" size="small" href="https://github.com/zhangfisher/autostore" target="_blank">
							<sl-icon name="github" slot="prefix"></sl-icon>
							GitHub
						</sl-button>
						<sl-button variant="text" size="small" href="https://autostorejs.github.io/" target="_blank">
							<sl-icon name="book" slot="prefix"></sl-icon>
							文档
						</sl-button>
					</div>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'examples-header': ExamplesHeader;
	}
}