/**
 *
 *
 *
 *  {
 *
 *      label:'',
 *      fields:[
 *          {label:"姓名",name:"name",widget:"checkbox"},
 *          {label:"姓名",name:"name",widget:"input",width:'1'},
 *          {label:"姓名",name:"name",widget:"number"},
 *      ],
 *
 *
 *
 *  }
 *
 *
 */

import { AutoDropdownField } from '@/field/dropdown';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

export type AutoFieldTableOptions = {
    fields: any[];
};

@customElement('auto-field-table')
export class AutoFieldCustom extends AutoDropdownField<AutoFieldTableOptions> {
    static styles = [AutoDropdownField.styles] as any;

    selection: any[] = [];

    getInitialOptions() {
        return Object.assign({}, super.getInitialOptions(), {
            dropdown: false,
            fields: [],
        });
    }

    getInputValue() {}
    _renderHeader() {
        return html`
            <thead>
                ${repeat(this.options.fields, (field) => {
                    return html`<th
                        style=${styleMap({
                            width: field.width,
                        })}
                    >
                        ${field.label}
                    </th>`;
                })}
            </thead>
        `;
    }
    _renderRow(row: Record<string, any>) {
        return html` ${repeat(this.options.fields, (field) => {
            return html`<td>${row[field.name]}</td>`;
        })}`;
    }
    _renderRows() {
        const rows = this.value as Record<string, any>[];
        return html`
            <tbody>
                ${repeat(rows, (row) => {
                    return html`<tr>
                        ${this._renderRow(row)}
                    </tr>`;
                })}
            </tbody>
        `;
    }
    renderDropdown() {
        return html`<table class="table">
            ${this._renderHeader()} ${this._renderRows()}
        </table>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-table': AutoFieldCustom;
    }
}
