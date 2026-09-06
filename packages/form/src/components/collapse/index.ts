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

/** 动画时长（毫秒），展开/收起共用 */
const DURATION = 180;

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

    // 每个面板内容区的高位动画状态：展开前测量到的真实内容高度
    private _contentHeights: Map<string, number> = new Map();
    // 进行中的动画结束清理器（按面板名索引）
    private _animCleanups: Map<string, () => void> = new Map();

    firstUpdated() {
        this.panels = this.getPanels();
    }

    connectedCallback() {
        super.connectedCallback();
        registerIcons();
        this._activeArray = this.active ? this.active.split(',') : [];
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._animCleanups.forEach((cleanup) => cleanup());
        this._animCleanups.clear();
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

    /** 取面板内容区元素 */
    private _getContentEl(name: string): HTMLElement | null {
        return this.shadowRoot!.querySelector(`.content[data-name="${name}"]`);
    }

    /**
     * 测量面板内容的自然高度。
     * 内容区在隐藏态（height:0 + overflow:hidden）下无法测出真实高度，
     * 临时放开限制量取 scrollHeight 后还原。
     */
    private _measureContent(el: HTMLElement): number {
        const prev = el.style.height;
        const prevOverflow = el.style.overflow;
        const prevMaxHeight = el.style.maxHeight;
        const prevTransition = el.style.transition;
        el.style.transition = 'none';
        el.style.height = 'auto';
        el.style.maxHeight = 'none';
        el.style.overflow = 'hidden';
        const h = el.scrollHeight;
        el.style.height = prev;
        el.style.maxHeight = prevMaxHeight;
        el.style.overflow = prevOverflow;
        el.style.transition = prevTransition;
        return h;
    }

    /**
     * 用测量到的真实高度驱动 height 过渡。
     *
     * 旧实现以 max-height: 0 ↔ 2000px 过渡模拟展开：2000px 远大于实际内容高，
     * 过渡时长按 2000px 全程分配，实际可见变化集中在开头几帧（展开约 5% 时长
     * 就到位，其后空等），收起方向则几乎全程不可见；手风琴模式下新旧面板
     * 切换表现为"瞬间弹开/瞬间消失"。改为对真实 height 过渡，时长恒定。
     */
    private _animatePanel(name: string, opening: boolean) {
        const el = this._getContentEl(name);
        if (!el) return;
        // 取消该面板进行中的动画
        this._animCleanups.get(name)?.();
        this._animCleanups.delete(name);

        const target = this._contentHeights.get(name) ?? el.scrollHeight;

        if (opening) {
            // 展开：先定格在 0（无过渡），下一帧以固定时长过渡到目标高度
            el.style.transition = 'none';
            el.style.height = '0px';
            // 强制 reflow 使起始值生效
            void el.offsetHeight;
            el.style.transition = `height ${DURATION}ms ease-out, padding ${DURATION}ms ease-out`;
            el.style.height = `${target}px`;
        } else {
            // 收起：从当前实际高度过渡到 0
            const current = el.getBoundingClientRect().height;
            el.style.transition = 'none';
            el.style.height = `${current}px`;
            void el.offsetHeight;
            el.style.transition = `height ${DURATION}ms ease-in, padding ${DURATION}ms ease-in`;
            el.style.height = '0px';
        }

        const onEnd = (e: TransitionEvent) => {
            if (e.propertyName !== 'height') return;
            cleanup();
            if (opening) {
                // 展开完成后释放为 auto：内容后续增减不再被固定高度截断
                el.style.transition = 'none';
                el.style.height = 'auto';
            }
        };
        const cleanup = () => {
            el.removeEventListener('transitionend', onEnd);
            this._animCleanups.delete(name);
        };
        el.addEventListener('transitionend', onEnd);
        this._animCleanups.set(name, cleanup);
    }

    // 切换面板的展开/折叠状态
    private togglePanel(name: string) {
        const index = this._activeArray.indexOf(name);
        if (index === -1) {
            // 如果是accordion模式，先清空所有活动面板
            if (this.accordion) {
                // 手风琴：收起其它已展开面板，展开目标面板
                const closing = this._activeArray.filter((n) => n !== name);
                this._activeArray = [name];
                this._runAnimations(name, true, closing);
            } else {
                this._activeArray = [...this._activeArray, name];
                this._runAnimations(name, true, []);
            }
        } else {
            const newActive = [...this._activeArray];
            newActive.splice(index, 1);
            this._activeArray = newActive;
            this._runAnimations(name, false, []);
        }
        // 更新字符串类型的active属性
        this.active = this._activeArray.join(',');

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { active: this.active },
            }),
        );
    }

    /** 统一驱动本轮涉及的展开/收起动画 */
    private _runAnimations(opening: string, open: boolean, closing: string[]) {
        // 展开前先测量目标内容高度
        const el = this._getContentEl(opening);
        if (el) this._contentHeights.set(opening, this._measureContent(el));
        this._animatePanel(opening, open);
        closing.forEach((n) => this._animatePanel(n, false));
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
                    data-name="${name}"
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
