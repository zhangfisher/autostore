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
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

@tag('auto-form-tabs')
export class AutoFormTabs extends AutoFormGroupBase {
    static styles = [
        AutoFormGroupBase.styles,
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

            sl-tab::part(base) {
                padding: calc(0.8 * var(--auto-spacing));
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
                overflow: auto;
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
            sl-tab-group[placement='top']::part(active-tab-indicator) {
                bottom: calc(var(--track-width) - 2px);
            }
            sl-tab-group[placement='bottom']::part(active-tab-indicator) {
                top: calc(var(--track-width) - 2px);
            }
            .label {
                font-size: var(--auto-font-size);
                padding-left: 0.5em;
            }
        `,
    ] as any;

    @property({ type: String, reflect: true })
    direction: 'top' | 'left' | 'right' | 'bottom' = 'top';

    @property({ type: Boolean, reflect: true })
    hideLabel: boolean = false;

    _getPlacement(): 'top' | 'bottom' | 'start' | 'end' {
        if (this.direction === 'left') return 'start';
        if (this.direction === 'right') return 'end';
        return this.direction;
    }

    renderGroups() {
        return html`
            <sl-tab-group
                placement="${this._getPlacement()}"
                @sl-tab-show="${() => this.dispatchEvent(new CustomEvent('tab-change'))}"
            >
                ${this.forms.map((form, index) => {
                    if (form.tagName !== 'AUTO-FORM') return;
                    const info = this.getFormInfo(form, index);
                    // @ts-ignore
                    if (form.bind) form.bind(this.store);
                    form.setAttribute('border', 'none');
                    return html`
                        <sl-tab
                            ?active=${info.active}
                            slot="nav"
                            title="${ifDefined(info.title || info.label)}"
                            panel="${index}"
                        >
                            ${info.icon ? html`<sl-icon name="${info.icon}"></sl-icon>` : ''}
                            ${when(
                                !this.hideLabel && info.label,
                                () => html`<span class="label">${info.label}</span>`,
                            )}
                        </sl-tab>
                    `;
                })}
                ${this.forms.map(
                    (group, index) =>
                        html`<sl-tab-panel name="${index}" class="scrollbar"
                            >${group}</sl-tab-panel
                        >`,
                )}
            </sl-tab-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-tabs': AutoFormTabs;
    }
}
