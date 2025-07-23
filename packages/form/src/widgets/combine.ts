import { AutoDropdownField, type AutoDropdownFieldOptions } from '@/field/dropdown';
import { renderWidget } from '@/utils/renderWidget';
import { tag } from '@/utils/tag';
import type { SchemaCombineWidgetOptions } from 'autostore';
import { css, html, nothing, render } from 'lit';
import { query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

export type AutoFieldCombineOptions = Required<SchemaCombineWidgetOptions>;

@tag('auto-field-combine')
export class AutoFieldCombine extends AutoDropdownField<AutoFieldCombineOptions & AutoDropdownFieldOptions> {
    static styles = [
        AutoDropdownField.styles,
        css`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `,
    ] as any;

    @query('.selection>.select-value')
    selection: any;

    getInitialOptions() {
        return Object.assign({}, super.getInitialOptions(), {
            children: [],
        });
    }
    connectedCallback(): void {
        super.connectedCallback();
        this._onChildrenChange();
    }
    disconnectedCallback(): void {
        this.shadow.removeEventListener('change', this._handleChildrenChange);
        this.shadow.removeEventListener('input', this._handleChildrenChange);
    }
    // 使用箭头函数绑定 this
    private _handleChildrenChange = () => {
        this.onFieldChange();
        this._updateSelection();
    };

    _isFirst: boolean = true;

    _updateSelection() {
        if (!this.selection) return;
        setTimeout(() => {
            const values = this.toState(this.getInputValue());
            const selection = super.renderSelection(values);
            if (this._isFirst) {
                // this.selection.innerHTML = ''
                render(nothing, this.selection);
                this._isFirst = false;
            }
            render(nothing, this.selection, { isConnected: true });
            render(selection, this.selection, { isConnected: true });
        });
    }
    _onChildrenChange() {
        if (this.options.children.length > 0) {
            this.shadow.addEventListener('change', this._handleChildrenChange);
            this.shadow.addEventListener('input', this._handleChildrenChange);
        }
    }
    renderSelection() {
        setTimeout(() => this._updateSelection());
        return html``;
    }

    getInputValue() {
        const children = Array.from(this.shadowRoot?.querySelectorAll('.children > *') || []);
        const values: any = [];
        children.forEach((child: any) => {
            if (child.tagName.startsWith('AUTO-FIELD-')) {
                let val = child.getInputValue();
                if (val === '') val = child.value;
                values.push(val);
            }
        });
        return values;
    }

    renderDropdown() {
        return html`
            <div class="children">
                ${repeat(this.options.children, (field) => {
                    return html`${renderWidget(field, {
                        parent: this,
                        attrs: {
                            noreactive: true,
                            compact: true,
                        },
                    })}`;
                })}
            </div>
        `;
    }
    /**
     * 不响应状态变化
     * combine字段只是一个容器，内部widget才需要响应状态变化
     *
     * 为什么不响应变化？
     *
     * 因为当children更新时，如果不阻止状态变化，会导致combine重新渲染
     * combine重新渲染会导致children也重新渲染，这会导致children失去焦点
     * 这样如果children中包括input就会因为失去焦点而无法进行连续输入
     *
     *
     */
    _handleStateChange() {}
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-combine': AutoFieldCombine;
    }
}
