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
import { registerIcons } from '@/utils';

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
    // 内部使用的活动面板数组

    @state()
    private _activeArray: string[] = [];

    firstUpdated() {
        this.panels = this.getPanels();
    }

    connectedCallback() {
        super.connectedCallback();
        registerIcons();
        this._activeArray = this.active ? this.active.split(',') : [];
    }

    getPanels() {
        const slot = this.shadowRoot!.querySelector('slot');
        if (slot) {
            return slot.assignedElements({ flatten: true }) as any;
        } else {
            return [];
        }
    }
    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('active') && typeof this.active === 'string') {
            // 当active属性从外部更新时，同步更新内部数组
            this._activeArray = this.active ? this.active.split(',') : [];
        }
        super.updated(changedProperties);
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
            const name = panel.getAttribute('name') || panel.dataset.name || '';
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

    _onSlotChange() {
        const panels = this.getPanels() as HTMLElement[];
        if (panels.length > 0) {
            const names = this.panels
                .map((panel) => {
                    return panel.getAttribute('name') || panel.dataset.name;
                })
                .filter((name) => !!name);

            const newPanels = panels.filter((panel) => {
                return !names.includes(panel.getAttribute('name') || panel.dataset.name);
            });
            this.panels.push(...newPanels);
            this.requestUpdate();
        }
    }

    render() {
        return html`
            ${this.renderPanels()}
            <slot @slotchange=${this._onSlotChange.bind(this)} style="display:none;"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-collapse': AutoCollapse;
    }
}
