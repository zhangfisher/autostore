/**
 *
 *  手风琴折叠组件
 *
 *  使用方法:
 *
 *  <auto-collapse active="x,y" accordion>
 *      <div data-name="x" data-label="A" data-icon="xxx" >
 *          a
 *      </div>
 *      <div data-name="y" data-label="B" data-icon="xxx" >a</div>
 *      <div data-name="z" data-label="C" data-icon="xxx" >a</div>
 *  </auto-collapse>
 *
 *  属性:
 *  - active: 当前激活的面板，多个面板用逗号分隔
 *  - accordion: 设置为true时，同时只能打开一个面板
 *
 */

import { LitElement, html } from 'lit';
import styles from './styles';
import { tag } from '@/utils/tag';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';

@tag('auto-collapse')
export class AutoCollapse extends LitElement {
    static styles = [styles] as any;

    @property({ type: String, reflect: true })
    active: string = '';

    @property({ type: String, reflect: true })
    padding?: string;

    @property({ type: Boolean, reflect: true })
    accordion: boolean = false;

    @state()
    private panels: HTMLElement[] = [];

    // 存储之前的面板元素，用于比较
    private previousPanels: HTMLElement[] = [];

    // 内部使用的活动面板数组
    private _activeArray: string[] = [];

    firstUpdated() {
        // 在组件首次更新后获取面板元素
        this.updatePanels();
        // 确保slotchange事件监听器已设置
        // 这是一个额外的保障，以防在connectedCallback中设置失败
        this.setupSlotChangeListener();
    }

    connectedCallback() {
        super.connectedCallback();
        // 将字符串转换为内部数组
        this._activeArray = this.active ? this.active.split(',') : [];
        // 添加slotchange事件监听器
        this.setupSlotChangeListener();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // 移除slotchange事件监听器
        this.removeSlotChangeListener();
    }
    // 设置slotchange事件监听器
    private setupSlotChangeListener() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (slot) {
            // 使用箭头函数保持this上下文
            slot.addEventListener('slotchange', this.handleSlotChange);
        }
    }
    // 移除slotchange事件监听器
    private removeSlotChangeListener() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (slot) {
            slot.removeEventListener('slotchange', this.handleSlotChange);
        }
    }
    // 处理slotchange事件
    private handleSlotChange = (e: Event) => {
        this.updatePanels(e);
    };

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('active') && typeof this.active === 'string') {
            // 当active属性从外部更新时，同步更新内部数组
            this._activeArray = this.active ? this.active.split(',') : [];
        }
        super.updated(changedProperties);
    }

    // 更新面板列表
    private updatePanels(e?: Event) {
        // 确保组件已经连接到DOM
        if (!this.isConnected) return;
        // 获取slot元素
        const slot = (e?.target as HTMLSlotElement) || this.shadowRoot?.querySelector('slot');
        if (!slot) {
            return;
        }
        // 获取分配给slot的元素
        const elements = slot.assignedElements() as HTMLElement[];

        // 只有当有元素分配给slot时才更新面板列表
        if (elements.length > 0) {
            // 检查是否与之前的面板元素相同
            const hasChanged = this.panelsHaveChanged(elements);
            if (hasChanged) {
                // 更新之前的面板元素
                this.previousPanels = [...elements];
                // 更新当前面板列表
                this.panels = elements;
                this.requestUpdate();
            }
        } else {
            // 如果没有元素分配给slot，可能是因为组件还没有完全初始化
            // 我们可以使用setTimeout来延迟执行，等待DOM更新
            const updatedElements = slot.assignedElements() as HTMLElement[];
            if (updatedElements.length > 0) {
                // 检查是否与之前的面板元素相同
                const hasChanged = this.panelsHaveChanged(updatedElements);
                if (hasChanged) {
                    // 更新之前的面板元素
                    this.previousPanels = [...updatedElements];
                    // 更新当前面板列表
                    this.panels = updatedElements;
                    this.requestUpdate();
                }
            }
        }
    }

    // 检查面板元素是否发生变化
    private panelsHaveChanged(newPanels: HTMLElement[]): boolean {
        // 如果长度不同，肯定发生了变化
        if (this.previousPanels.length !== newPanels.length) {
            return true;
        }

        // // 比较每个面板元素
        // for (let i = 0; i < newPanels.length; i++) {
        //     // 如果面板元素不同，或者面板的属性发生了变化，则认为面板发生了变化
        //     if (
        //         this.previousPanels[i] !== newPanels[i] ||
        //         this.previousPanels[i].getAttribute('data-name') !==
        //             newPanels[i].getAttribute('data-name') ||
        //         this.previousPanels[i].getAttribute('data-label') !==
        //             newPanels[i].getAttribute('data-label') ||
        //         this.previousPanels[i].getAttribute('data-icon') !==
        //             newPanels[i].getAttribute('data-icon')
        //     ) {
        //         return true;
        //     }
        // }

        // 如果所有面板元素都相同，则没有变化
        return false;
    }

    // 切换面板的展开/折叠状态
    private togglePanel(name: string) {
        const index = this._activeArray.indexOf(name);
        if (index === -1) {
            // 如果是accordion模式，先清空所有活动面板
            if (this.accordion) {
                this._activeArray = [name];
            } else {
                this._activeArray = [...this._activeArray, name];
            }
        } else {
            const newActive = [...this._activeArray];
            newActive.splice(index, 1);
            this._activeArray = newActive;
        }
        // 更新字符串类型的active属性
        this.active = this._activeArray.join(',');

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { active: this.active },
            }),
        );
    }

    // 判断面板是否处于激活状态
    private isPanelActive(name: string): boolean {
        return this._activeArray.includes(name);
    }

    _onActionClick(name: string, e: any) {
        const clickEvent = new CustomEvent('action-click', {
            detail: {
                name: name,
            },
            composed: true,
            bubbles: true,
        });
        e.stopPropagation();
        this.dispatchEvent(clickEvent);
    }

    _renderHeaderActions(panel: HTMLElement) {
        const actions = (panel.getAttribute('data-actions') || '').split(',');
        if (actions.length > 0) {
            return repeat(actions, (item) => {
                const [icon, title] = item.split(':');
                return html`<sl-icon
                    part="action"
                    class="icon action"
                    name=${icon}
                    title=${title}
                    @click=${(e: MouseEvent) => {
                        this._onActionClick(icon, e);
                    }}
                ></sl-icon>`;
            });
        }
    }

    _renderHeader(panel: HTMLElement) {
        const name = panel.getAttribute('name') || panel.dataset.name || '';
        const label = panel.getAttribute('label') || panel.dataset.label || '';
        const icon = panel.getAttribute('icon') || panel.dataset.icon || '';
        const isActive = this.isPanelActive(name);
        return html`
            <div
                part="header"
                class="header ${classMap({ active: isActive })}"
                @click=${() => this.togglePanel(name)}
            >
                ${icon ? html`<sl-icon name="${icon}" class="icon"></sl-icon>` : ''}
                <div part="label" class="label">${label}</div>
                ${this._renderHeaderActions(panel)}
                <sl-icon name="chevron-down" class="panel-arrow"></sl-icon>
            </div>
        `;
    }
    // 渲染面板
    private renderPanels() {
        return this.panels.map((panel) => {
            const name = panel.getAttribute('data-name') || '';
            const isActive = this.isPanelActive(name);
            const style = styleMap({
                padding: this.padding,
            });
            return html`
                ${this._renderHeader(panel)}
                <div
                    part="content"
                    class="content scrollbar ${classMap({ active: isActive })}"
                    style=${style}
                >
                    ${panel}
                </div>
            `;
        });
    }

    render() {
        return html`
            ${this.renderPanels()}
            <slot @slotchange=${(e: Event) => this.updatePanels(e)} class="hidden-slot"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-collapse': AutoCollapse;
    }
}
