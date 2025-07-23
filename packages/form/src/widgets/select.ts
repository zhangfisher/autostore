import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from '@/field';
import { css, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import type { SchemaSelectWidgetOptions } from 'autostore';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { vars } from '@/form/vars';
import { tag } from '@/utils/tag';

export type AutoFieldSelectOptions = Required<SchemaSelectWidgetOptions>;

@tag('auto-field-select')
export class AutoFieldSelect extends AutoField<AutoFieldSelectOptions> {
    static styles = [
        AutoField.styles,
        vars,
        css`
            .actions.before {
                position: sticky;
                top: 0;
                width: 100%;
                min-height: 1em;
                padding: 0.5em 0.5em;
                border-bottom: var(--auto-border);
                box-sizing: border-box;
                background-color: var(--auto-bgcolor);
                z-index: 9;
            }

            .actions.after {
                position: sticky;
                bottom: 0;
                width: 100%;
                min-height: 1em;
                padding: 0.5em 0.5em;
                border-top: var(--auto-border);
                box-sizing: border-box;
                background-color: var(--auto-bgcolor);
                z-index: 9;
            }
            sl-select::part(listbox) {
                padding: 0;
            }
        `,
    ] as any;
    valueKey: string = 'value';
    labelKey: string = 'label';
    getInitialOptions(): Record<string, any> {
        return {
            valueKey: 'value',
            labelKey: 'label',
            select: [],
            multiple: false,
            clearable: true,
            maxOptionsVisible: 0,
            placement: 'top',
        };
    }

    _renderItem(item: any) {
        const renderItem = this.options.renderItem;
        if (typeof renderItem === 'string') {
            return html`${unsafeHTML(
                renderItem.replace(/\{(.+?)\}/g, (_: string, key: string) => {
                    return item[key];
                }),
            )}`;
        } else if (typeof renderItem === 'function') {
            return html`${unsafeHTML(renderItem(item))}`;
        } else {
            return item.label || item.value;
        }
    }
    renderInput() {
        const items = this.options.select.map((item: any) => {
            const selectItem: any = {};
            if (typeof item === 'object') {
                Object.assign(selectItem, item);
            } else {
                if (typeof item === 'string' && item.startsWith('-')) {
                    Object.assign(selectItem, { type: 'divider' });
                } else {
                    Object.assign(selectItem, { label: item });
                }
            }
            return selectItem;
        });
        return html`
            <sl-select
                name="${this.name}"
                data-path="${this.path}"
                value="${this.getValue()}"
                ?multiple=${this.options.multiple}
                ?disabled=${!this.options.enable}
                ?clearable=${this.options.clearable}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?required=${this.options.required}
                placeholder="${ifDefined(this.options.placeholder)}"
                .maxOptionsVisible=${this.options.maxOptionsVisible}
                help-text="${ifDefined(this.options.help)}"
                .placement=${this.options.placement}
                @sl-input=${this.onFieldInput.bind(this)}
            >
                ${this.renderBeforeActions()}
                ${items.map((item: any) => {
                    if (item.type === 'divider') return html`<sl-divider></sl-divider>`;
                    return html`<sl-option value="${item[this.valueKey] || item.label}" ?disabled=${!this.options.enable}>
                        <auto-flex class="item" gap="1em" align="center" grow="sl-icon + *,:first-child:not(sl-icon)" style="text-align:left;">
                            ${when(item.icon, () => {
                                return html`<sl-icon name="${item.icon}"></sl-icon>`;
                            })}
                            ${this._renderItem(item)}
                        </auto-flex>
                    </sl-option>`;
                })}
                ${this.renderAfterActions()}
            </sl-select>
        `;
    }

    getValue() {
        return this.options.multiple ? this.value.join(' ') : this.value;
    }
    getInputValue() {
        if (this.options.multiple) {
            return Array.isArray(this.input.value) ? this.input.value : this.input.value.split(' ');
        } else {
            return this.input.value;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-select': AutoFieldSelect;
    }
}
 