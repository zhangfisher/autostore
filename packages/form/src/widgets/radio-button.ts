import { AutoField } from '@/field';
import { css, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import type { SchemaRadioButtonWidgetOptions } from 'autostore';
import { tag } from '@/utils/tag';

export type AutoFieldRadioButtonOptions = Required<SchemaRadioButtonWidgetOptions>;

@tag('auto-field-radio-button')
export class AutoFieldRadioButton extends AutoField<AutoFieldRadioButtonOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-radio-group::part(form-control-input) {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.2em;
            }
            sl-radio {
                margin-right: 1em;
                padding: 0.2em;
            }
        `,
    ] as any;
    getInitialOptions() {
        return {
            valueKey: 'value',
        };
    }
    renderRadioItem(item: any) {
        const value = item[this.options.valueKey];
        return html`<sl-radio-button value="${value}" ?pill=${this.options.pill} ?disabled=${!this.options.enable}>${item.label}</sl-radio-button>`;
    }
    renderInput() {
        const items = this.getOptionValue('select', []).map((item: any, index: number) => {
            const selectItem: any = {};
            if (typeof item === 'object') {
                Object.assign(selectItem, item);
            } else {
                Object.assign(selectItem, { label: item, value: index + 1 });
            }
            return selectItem;
        });
        return html`
            <sl-radio-group name=${this.name} data-path=${this.path} value="${this.value}" @sl-input=${this.onFieldInput.bind(this)} @sl-change=${this.onFieldChange.bind(this)}>
                ${items.map((item: any) => this.renderRadioItem(item))}
            </sl-radio-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-radio-button': AutoFieldRadioButton;
    }
}
