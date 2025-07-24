/**
 *
 * <auto-form-collapse active="a,b" >
 *  <auto-form group='a' icon='a' title="">
 *  <auto-form group='b' icon='a' title="">
 *  <auto-form group='c' icon='a' title="">
 *  <auto-form group='d' icon='a' title="">
 * </autoform-tabs>
 *
 *
 */

import { css, html } from 'lit';
import { tag } from '@/utils/tag';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { AutoFormGroupBase } from './base';
import { ScrollbarController } from '@/controllers';

@tag('auto-form-collapse')
export class AutoFormCollapse extends AutoFormGroupBase {
    static styles = [
        AutoFormGroupBase.styles,
        ScrollbarController.styles,
        css`
            auto-form {
                padding: 1.5em;
            }
            sl-details {
                display: flex;
                flex-direction: column;
                min-height: 2em;
            }
            sl-details::part(base) {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            sl-details::part(summary) {
                display: flex;
                align-items: center;
                font-size: calc(1.5 * var(--auto-font-size));
            }
            sl-details::part(content) {
                flex-grow: 1;
            }
            sl-icon {
                &::part(svg) {
                    font-size: calc(1.5 * var(--auto-font-size));
                    stroke-width: 1;
                }
            }
            sl-details::part(header) {
                padding: var(--auto-spacing);
            }
            sl-details:not([open]) {
                flex-shrink: 0;
            }
            sl-details[open]::part(content) {
                border-top: var(--auto-border);
                padding: 0;
            }
            .header {
                display: flex;
                align-items: center;
                gap: 0.5em;
                .label {
                    font-size: var(--auto-font-size);
                }
            }
            :host {
                display: flex;
                flex-direction: column;
            }
        `,
    ] as any;

    scrollbars = new ScrollbarController(this);

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
            ${this.groups.map(
                (group) => html`
                    <sl-details ?open=${group.active}>
                        <div class="header" slot="summary">${group.icon ? html`<sl-icon name="${group.icon}"></sl-icon>` : ''} <span class="label">${group.label}</span></div>
                        ${group.el}
                    </sl-details>
                `,
            )}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-collapse': AutoFormCollapse;
    }
}
