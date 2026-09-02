/**
 * @autostorejs/form 示例集合主入口
 * 提供动态示例加载和导航功能
 */

import './navigation/sidebar';
import './navigation/header';
import { findExampleById } from './navigation/examples-list';

// 预加载所有示例模块
// 快速开始
import exampleSimpleForm from './examples/basic/simple-form';
import exampleValidation from './examples/basic/validation';
import exampleFieldLinkage from './examples/basic/field-linkage';
import exampleComputedFields from './examples/basic/computed-fields';

// 基础组件
import exampleWidgetText from './examples/widgets/widget-text';
import exampleWidgetNumber from './examples/widgets/widget-number';
import exampleWidgetPassword from './examples/widgets/widget-password';
import exampleWidgetEmail from './examples/widgets/widget-email';
import exampleWidgetPhone from './examples/widgets/widget-phone';
import exampleWidgetUrl from './examples/widgets/widget-url';
import exampleWidgetTextarea from './examples/widgets/widget-textarea';
import exampleWidgetDate from './examples/widgets/widget-date';
import exampleWidgetRadio from './examples/widgets/widget-radio';
import exampleWidgetCheckboxGroup from './examples/widgets/widget-checkbox-group';
import exampleWidgetSelect from './examples/widgets/widget-select';
import exampleWidgetSwitch from './examples/widgets/widget-switch';

// 高级组件
import exampleCascader from './examples/advanced/cascader';
import exampleTreeSelect from './examples/advanced/tree-select';
import exampleFormGroups from './examples/advanced/form-groups';
import exampleNetworkConfig from './examples/advanced/network-config';
import exampleDataSync from './examples/advanced/data-sync';

// 示例模块映射
const exampleModules: Record<string, any> = {
    // 快速开始
    'simple-form': exampleSimpleForm,
    'validation': exampleValidation,
    'field-linkage': exampleFieldLinkage,
    'computed-fields': exampleComputedFields,
    // 基础组件
    'widget-text': exampleWidgetText,
    'widget-number': exampleWidgetNumber,
    'widget-password': exampleWidgetPassword,
    'widget-email': exampleWidgetEmail,
    'widget-phone': exampleWidgetPhone,
    'widget-url': exampleWidgetUrl,
    'widget-textarea': exampleWidgetTextarea,
    'widget-date': exampleWidgetDate,
    'widget-radio': exampleWidgetRadio,
    'widget-checkbox-group': exampleWidgetCheckboxGroup,
    'widget-select': exampleWidgetSelect,
    'widget-switch': exampleWidgetSwitch,
    // 高级组件
    'cascader': exampleCascader,
    'tree-select': exampleTreeSelect,
    'form-groups': exampleFormGroups,
    'network-config': exampleNetworkConfig,
    'data-sync': exampleDataSync,
};

// 示例管理器
class ExampleManager {
    private currentExampleId: string | null = null;
    private loadedExamples: Set<string> = new Set();

    async loadExample(exampleId: string): Promise<boolean> {
        try {
            const exampleInfo = findExampleById(exampleId);
            if (!exampleInfo) {
                console.error(`示例不存在: ${exampleId}`);
                return false;
            }
            this.clearCurrentExample();
            this.updateHeader(exampleInfo);
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
        const oldExample = document.querySelector('[data-active-example]');
        if (oldExample) {
            oldExample.removeAttribute('data-active-example');
        }
    }

    private _renderExample(ExampleClass: any, exampleInfo: any): void {
        const container = document.querySelector('#example-content');
        if (!container) return;
        const tagName = `example-${exampleInfo.id}`;
        const customElement = customElements.get(tagName);
        if (!customElement) {
            this.showError(`示例组件未注册: ${tagName}`);
            return;
        }
        const instance = new ExampleClass();
        instance.setAttribute('data-active-example', 'true');
        container.innerHTML = '';
        container.appendChild(instance);
        console.log(`示例渲染成功: ${exampleInfo.title}`);
    }

    private updateHeader(exampleInfo: any): void {
        const header = document.querySelector('#header') as any;
        if (header && typeof header.currentExampleTitle !== 'undefined') {
            header.currentExampleTitle = String(exampleInfo.title || '');
            header.currentExampleDescription = String(exampleInfo.description || '');
        }
    }

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

const exampleManager = new ExampleManager();

const exampleSelectedHandler = (event: Event) => {
    const customEvent = event as CustomEvent<{ exampleId: string }>;
    const { exampleId } = customEvent.detail;
    if (exampleId) {
        exampleManager.loadExample(exampleId);
        const sidebar = document.querySelector('examples-sidebar') as any;
        if (sidebar) {
            sidebar.setCurrentExample(exampleId);
        }
        if (window.innerWidth <= 768) {
            const sidebarEl = document.querySelector('examples-sidebar');
            if (sidebarEl) {
                sidebarEl.classList.remove('open');
            }
        }
    }
};

document.addEventListener('example-selected', exampleSelectedHandler);

setTimeout(() => {
    const firstExample = findExampleById('simple-form');
    if (firstExample) {
        exampleManager.loadExample('simple-form');
    }
}, 100);

(window as any).exampleManager = exampleManager;

console.log('@autostorejs/form 示例集合已加载');
console.log('当前版本: 4.3.2');
console.log('使用示例管理器: exampleManager.loadExample("example-id")');
