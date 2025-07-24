/**
 *
 * <auto-form-tabs direction="top">
 *  <auto-form group='a' icon='a' title="">
 *  <auto-form group='b' icon='a' title="">
 *  <auto-form group='c' icon='a' title="">
 *  <auto-form group='d' icon='a' title="">
 * </autoform-tabs>
 *
 *
 */

import { property } from 'lit/decorators.js';
import { css, html } from 'lit';
import { tag } from '@/utils/tag';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { AutoFormGroupBase } from './base';
import { ScrollbarController } from '@/controllers';

@tag('auto-form-tabs')
export class AutoFormTabs extends AutoFormGroupBase {
    static styles = [
        AutoFormGroupBase.styles,
        ScrollbarController.styles,
        css`
            auto-form {
                padding: 1.5em;
            }
            sl-tab-group {
                width: 100%;
                height: 100%;
            }
            sl-tab::part(base) {
                display: flex;
                align-items: center;
                font-size: calc(1.5 * var(--auto-font-size));
            }
            sl-tab sl-icon {
                &::part(svg) {
                    stroke-width: 1;
                }
            }
            sl-tab-group::part(tabs) {
                border: none;
            }
            /* 边框架 */
            sl-tab-group[placement='start']::part(nav) {
                border-right: var(--auto-border);
            }
            sl-tab-group[placement='end']::part(nav) {
                border-left: var(--auto-border);
            }
            sl-tab-group[placement='top']::part(nav) {
                border-bottom: var(--auto-border);
            }
            sl-tab-group[placement='bottom']::part(nav) {
                border-top: var(--auto-border);
            }

            sl-tab-panel::part(base) {
                padding: 0;
                height: 100%;
                position: relative;
            }

            sl-tab-panel,
            sl-tab-group[placement='start'],
            sl-tab-group[placement='end'] {
                height: 100%;
                position: relative;
            }
            sl-tab-group::part(base) {
                height: 100%;
            }
            sl-tab-group::part(body) {
                overflow: unset;
            }

            sl-tab-group[placement='top']::part(base),
            sl-tab-group[placement='bottom']::part(base) {
                display: flex;
                position: relative;
            }
            sl-tab-group[placement='top']::part(body),
            sl-tab-group[placement='bottom']::part(body) {
                flex-grow: 1;
                min-height: 0;
            }
            .label {
                font-size: var(--auto-font-size);
                padding-left: 0.5em;
            }
        `,
    ] as any;

    scrollbars = new ScrollbarController(this);

    @property({ type: String })
    direction: 'top' | 'left' | 'right' | 'bottom' = 'top';

    _getPlacement(): 'top' | 'bottom' | 'start' | 'end' {
        if (this.direction === 'left') return 'start';
        if (this.direction === 'right') return 'end';
        return this.direction;
    }
    _createScrollbars() {
        const panels = this.shadowRoot?.querySelectorAll('sl-tab-panel');
        panels?.forEach((panel) => {
            this.scrollbars.create(panel, { width: '5em' });
        });
    }

    firstUpdated() {
        setTimeout(() => {
            this._createScrollbars();
        });
    }

    renderGroups() {
        return html`
            <sl-tab-group placement="${this._getPlacement()}" @sl-tab-show="${() => this.dispatchEvent(new CustomEvent('tab-change'))}">
                ${this.groups.map(
                    (group, index) => html`
                        <sl-tab ?active=${group.active} slot="nav" title=${group.title || group.label || group.group} panel="${index}">
                            ${group.icon ? html`<sl-icon name="${group.icon}"></sl-icon>` : ''}
                            <span class="label">${group.label}</span>
                        </sl-tab>
                    `,
                )}
                ${this.groups.map((group, index) => html` <sl-tab-panel name="${index}">${group.el}</sl-tab-panel> `)}
            </sl-tab-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-tabs': AutoFormTabs;
    }
}
