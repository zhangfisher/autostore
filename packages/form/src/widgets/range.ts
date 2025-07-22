import { css, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import { AutoField } from '@/field';
import type { SchemaRangeWidgetOptions } from 'autostore';

export type AutoFieldRangeOptions = Required<SchemaRangeWidgetOptions>;

export class AutoFieldRabge extends AutoField<AutoFieldRangeOptions> {
    static styles = [
        AutoField.styles,
        css`
            .scale {
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .box {
                background-color: var(--auto-bgcolor);
                border: var(--auto-border);
                padding: 0.5rem;
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
            }
            sl-range {
                --track-color-active: var(--auto-theme-color);
                box-sizing: border-box;
            }
            .value > div {
                display: flex;
                align-items: center;
                & :first-child {
                    padding: 0 1em;
                    padding-left: 0.1em;
                }
                & :last-child {
                    flex-grow: 1;
                }
            }
        `,
    ] as any;
    getInitialOptions(): Record<string, any> {
        return {
            max: 100,
            min: 0,
            step: 1,
            tooltip: 'top',
        };
    }
    renderInput() {
        return html`
            <div>
                <span>${this.toView(this.value)}</span>
                <sl-range
                    slot="value"
                    name="${this.name}"
                    data-path=${this.path}
                    value=${this.value}
                    .placeholder=${this.options.placeholder}
                    ?disabled=${!this.options.enable}
                    .max=${this.options.max}
                    .min=${this.options.min}
                    .step=${this.options.step}
                    .tooltip=${this.options.tooltip}
                    @sl-input=${this.onFieldInput.bind(this)}
                    @sl-change=${this.onFieldChange.bind(this)}
                >
                </sl-range>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-range': AutoFieldRabge;
    }
}

if (!customElements.get('auto-field-range')) {
    customElements.define('auto-field-range', AutoFieldRabge);
}
