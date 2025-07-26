import { ifDefined } from 'lit/directives/if-defined.js';
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
import '../components/collapse';
import { property } from 'lit/decorators.js';
@tag('auto-form-collapse')
export class AutoFormCollapse extends AutoFormGroupBase {
    static styles = [
        AutoFormGroupBase.styles,
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

    @property({ type: String, reflect: true })
    active: string = '';

    @property({ type: String, reflect: true })
    padding?: string;

    @property({ type: Boolean, reflect: true })
    accordion: boolean = false;

    renderGroups() {
        return html`
            <auto-collapse
                style="flex-grow:1;min-height:0"
                active=${ifDefined(this.active)}
                padding=${ifDefined(this.padding)}
                ?accordion=${this.accordion}
            >
                ${this.forms.map((form) => {
                    if (form.tagName !== 'AUTO-FORM') return;
                    // @ts-ignore
                    if (form.bind) form.bind(this.store);
                    form.setAttribute('border', 'none');
                    return form;
                })}
            </auto-collapse>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-collapse': AutoFormCollapse;
    }
}
