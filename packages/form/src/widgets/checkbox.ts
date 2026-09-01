import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import { AutoField } from '@/field';
import { tag } from '@/utils/tag';
/**
 * checkbox widget 的配置类型（core 的 AutoWidgetCheckbox 已声明 switchValues，
 * 此接口保持同构以供 AutoField 泛型与 declare 复用）
 */
export interface AutoFieldCheckboxOptions {
    /**
     * 双值开关语义：[选中值, 未选中值]，默认 [true,false]
     */
    switchValues?: [any, any];
    /**
     * 复选框旁的说明文字
     */
    checkLabel?: string;
}
@tag('auto-field-checkbox')
export class AutoFieldCheckbox extends AutoField<AutoFieldCheckboxOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-checkbox.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `,
    ] as any;
    renderInput() {
        return html`
            <sl-checkbox
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                class="auto-input"
                ?disabled=${!this.options.enable}
                .value="${this.options.switchValues[0]}"
                .checked=${this._isChecked()}
                placeholder="${ifDefined(this.options.placeholder)}"
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-checkbox
            >
        `;
    }
    getInitialOptions() {
        return {
            switchValues: [true, false],
        };
    }
    _isChecked() {
        if (typeof this.value === 'boolean') {
            return this.options.switchValues[this.value ? 0 : 1];
        } else {
            return this.value === this.options.switchValues[0];
        }
    }
    getInputValue() {
        return this.input.checked ? this.options.switchValues[0] : this.options.switchValues[1];
    }
    getCheckLabel() {
        if (this.options.checkLabel) {
            return this.options.checkLabel;
        } else {
            const label = this.options.switchValues[this.value === this.options.switchValues[0] ? 0 : 1];
            return typeof label === 'boolean' ? '' : label;
        }
    }
    renderView() {
        return html` <sl-checkbox class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-checkbox> `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox': AutoFieldCheckbox;
    }
}
// checkbox 是 core 已收录的键（AutoWidgetCheckbox 含 switchValues），按 ADR-0004 重叠键规则：
// form 不重复 declare，专有字段已在 core 的 widget-types.ts 声明
