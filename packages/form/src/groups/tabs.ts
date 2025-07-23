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

@tag('auto-form-tabs')
export class AutoFormTabs extends AutoFormGroupBase {
    static styles = [
        AutoFormGroupBase.styles,
        css`
            sl-tab-group {
                width: 100%;
            }
            sl-tab-panel {
                padding: 1rem;
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
            sl-tab-group[placement='start']::part(nav) {
                border-right: var(--auto-border);
            }
            sl-tab-group[placement='start']::part(tabs) {
                border: none;
            }
            sl-tab-group[placement='end']::part(nav) {
                border-left: var(--auto-border);
            }
            sl-tab-group[placement='end']::part(tabs) {
                border: none;
            }
        `,
    ] as any;

    @property({ type: String })
    direction: 'top' | 'left' | 'right' | 'bottom' = 'top';

    _getPlacement(): 'top' | 'bottom' | 'start' | 'end' {
        if (this.direction === 'left') return 'start';
        if (this.direction === 'right') return 'end';
        return this.direction;
    }

    renderGroups() {
        return html`
            <sl-tab-group placement="${this._getPlacement()}" @sl-tab-show="${() => this.dispatchEvent(new CustomEvent('tab-change'))}">
                ${this.groups.map(
                    (group, index) => html`
                        <sl-tab ?active=${group.active} slot="nav" title=${group.title || group.label || group.group} panel="${index}">
                            ${group.icon ? html`<sl-icon name="${group.icon}"></sl-icon>` : ''} ${group.label}
                        </sl-tab>
                    `,
                )}
                ${this.groups.map((group, index) => html` <sl-tab-panel name="${index}"> ${group.el} </sl-tab-panel> `)}
            </sl-tab-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-tabs': AutoFormTabs;
    }
}
