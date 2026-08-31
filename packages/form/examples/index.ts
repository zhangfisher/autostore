/**
 * @autostorejs/form 示例集合主入口
 * 提供动态示例加载和导航功能
 */

import './navigation/sidebar';
import './navigation/header';
import { findExampleById } from './navigation/examples-list';

// 预加载所有示例模块，解决动态导入分析问题
import exampleNetworkConfig from './examples/advanced/network-config';
import exampleSimpleForm from './examples/basic/simple-form';
import exampleValidation from './examples/basic/validation';
import exampleComputedFields from './examples/basic/computed-fields';
import exampleInputWidgets from './examples/widgets/input-widgets';
import exampleSelectionWidgets from './examples/widgets/selection-widgets';
import exampleCascaderTree from './examples/advanced/cascader-tree';
import exampleFormGroups from './examples/advanced/form-groups';
import exampleDataSync from './examples/advanced/data-sync';

// 示例模块映射
const exampleModules: Record<string, any> = {
	'network-config': exampleNetworkConfig,
	'simple-form': exampleSimpleForm,
	'validation': exampleValidation,
	'computed-fields': exampleComputedFields,
	'input-widgets': exampleInputWidgets,
	'selection-widgets': exampleSelectionWidgets,
	'cascader-tree': exampleCascaderTree,
	'form-groups': exampleFormGroups,
	'data-sync': exampleDataSync,
};

// 示例管理器
class ExampleManager {
	private currentExampleId: string | null = null;
	private loadedExamples: Set<string> = new Set();

	/**
	 * 加载指定示例
	 */
	async loadExample(exampleId: string): Promise<boolean> {
		try {
			const exampleInfo = findExampleById(exampleId);
			if (!exampleInfo) {
				console.error(`示例不存在: ${exampleId}`);
				return false;
			}

			// 清除当前示例
			this.clearCurrentExample();

			// 更新UI
			this.updateHeader(exampleInfo);
			this.updateDescription(exampleInfo);

			// 使用预加载的示例模块
			if (exampleModules[exampleId]) {
				this._renderExample(exampleModules[exampleId], exampleInfo);
				this.currentExampleId = exampleId;
				this.loadedExamples.add(exampleId);
				return true;
			} else {
				this.showError(`示例模块不存在: ${exampleId}`);
				return false;
			}
		} catch (error) {
			console.error('加载示例时发生错误:', error);
			this.showError('加载示例时发生错误');
			return false;
		}
	}

	/**
	 * 清除当前示例
	 */
	private clearCurrentExample(): void {
		const container = document.querySelector('#example-content');
		if (container) {
			container.innerHTML = `
				<div class="loading-state">
					<sl-spinner></sl-spinner>
					<span style="margin-left: 1rem;">加载中...</span>
				</div>
			`;
		}

		// 清理自定义元素（如果需要）
		const oldExample = document.querySelector('[data-active-example]');
		if (oldExample) {
			oldExample.removeAttribute('data-active-example');
		}
	}

	/**
	 * 渲染示例组件
	 */
	private _renderExample(ExampleClass: any, exampleInfo: any): void {
		const container = document.querySelector('#example-content');
		if (!container) return;

		// 创建示例组件实例
		// 使用 exampleId 构造标签名，而不是使用类名
		const tagName = `example-${exampleInfo.id}`;
		const customElement = customElements.get(tagName);

		if (!customElement) {
			this.showError(`示例组件未注册: ${tagName}`);
			return;
		}

		// 创建实例
		const instance = new ExampleClass();
		instance.setAttribute('data-active-example', 'true');

		// 清空容器并添加实例
		container.innerHTML = '';
		container.appendChild(instance);

		console.log(`示例渲染成功: ${exampleInfo.title}`);
	}

	/**
	 * 更新头部信息
	 */
	private updateHeader(exampleInfo: any): void {
		const header = document.querySelector('#header') as any;
		if (header && typeof header.currentExampleTitle !== 'undefined') {
			header.currentExampleTitle = String(exampleInfo.title || '');
			header.currentExampleDescription = String(exampleInfo.description || '');
		}
	}

	/**
	 * 更新描述区域
	 */
	private updateDescription(exampleInfo: any): void {
		const descriptionEl = document.querySelector('#example-description');
		if (descriptionEl && exampleInfo) {
			const title = String(exampleInfo.title || '');
			const description = String(exampleInfo.description || '');
			const tags = Array.isArray(exampleInfo.tags) ? exampleInfo.tags : [];
			const difficulty = exampleInfo.difficulty;

			descriptionEl.innerHTML = `
				<h2>${title}</h2>
				<p>${description}</p>
				${tags.length > 0 ? `
					<div style="margin-top: 1rem;">
						${tags.map((tag: string) =>
							`<sl-tag variant="primary">${String(tag)}</sl-tag>`
						).join(' ')}
					</div>
				` : ''}
				${difficulty ? `
					<div style="margin-top: 1rem;">
						<sl-tag variant="${this.getDifficultyVariant(difficulty)}">
							难度: ${this.getDifficultyText(difficulty)}
						</sl-tag>
					</div>
				` : ''}
			`;
		}
	}

	private getDifficultyVariant(difficulty: string): string {
		switch (difficulty) {
			case 'beginner': return 'success';
			case 'intermediate': return 'warning';
			case 'advanced': return 'danger';
			default: return 'neutral';
		}
	}

	private getDifficultyText(difficulty: string): string {
		switch (difficulty) {
			case 'beginner': return '初级';
			case 'intermediate': return '中级';
			case 'advanced': return '高级';
			default: return difficulty;
		}
	}

	/**
	 * 显示错误信息
	 */
	private showError(message: string): void {
		const container = document.querySelector('#example-content');
		if (container) {
			container.innerHTML = `
				<div class="loading-state" style="color: var(--sl-color-danger-500);">
					<sl-icon name="exclamation-triangle" style="font-size: 2rem;"></sl-icon>
					<div style="margin-top: 1rem;">${message}</div>
					<div style="margin-top: 1rem;">
						<sl-button variant="primary" onclick="location.reload()">重新加载</sl-button>
					</div>
				</div>
			`;
		}
	}
}

// 初始化示例管理器
const exampleManager = new ExampleManager();

// 监听侧边栏的示例选择事件
const exampleSelectedHandler = (event: Event) => {
	const customEvent = event as CustomEvent<{ exampleId: string }>;
	const { exampleId } = customEvent.detail;
	if (exampleId) {
		exampleManager.loadExample(exampleId);

		// 更新侧边栏选中状态
		const sidebar = document.querySelector('examples-sidebar') as any;
		if (sidebar) {
			sidebar.setCurrentExample(exampleId);
		}

		// 移动端：选择后关闭侧边栏
		if (window.innerWidth <= 768) {
			const sidebarEl = document.querySelector('examples-sidebar');
			if (sidebarEl) {
				sidebarEl.classList.remove('open');
			}
		}
	}
};

document.addEventListener('example-selected', exampleSelectedHandler);

// 默认加载第一个示例
setTimeout(() => {
	const firstExample = findExampleById('network-config');
	if (firstExample) {
		exampleManager.loadExample('network-config');
	}
}, 100);

// 导出示例管理器供全局使用
(window as any).exampleManager = exampleManager;

console.log('@autostorejs/form 示例集合已加载');
console.log('当前版本: 4.3.2');
console.log('使用示例管理器: exampleManager.loadExample("example-id")');