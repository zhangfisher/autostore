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
    /**
     * 双值选项：[选中项, 未选中项]，每项为 {label?,value} 对象或字符串（字符串时 label 即 value）
     * 配置后优先于 switchValues：勾选值取各项 value，复选框旁显示当前项 label（无 label 则不显示）
     */
    choices?: ({ label?: string; value: any } | string)[];
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
                .value="${this._getSwitchValues()[0]}"
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
    /**
     * 归一化双值语义：配置 choices 时取 [选中项.value, 未选中项.value]，
     * 否则回落 switchValues（单一取值通道，避免各处重复判断）
     */
    _getSwitchValues(): [any, any] {
        const choices = this.options.choices;
        if (Array.isArray(choices) && choices.length >= 2) {
            return [
                typeof choices[0] === 'object' ? choices[0].value : choices[0],
                typeof choices[1] === 'object' ? choices[1].value : choices[1],
            ];
        }
        return this.options.switchValues;
    }
    _isChecked() {
        return this.value === this._getSwitchValues()[0];
    }
    getInputValue() {
        return this.input.checked ? this._getSwitchValues()[0] : this._getSwitchValues()[1];
    }
    getCheckLabel() {
        if (this.options.checkLabel) {
            return this.options.checkLabel;
        }
        const choices = this.options.choices;
        if (Array.isArray(choices) && choices.length >= 2) {
            // 显示当前项 label，无 label 则不显示
            const current = choices[this._isChecked() ? 0 : 1];
            return typeof current === 'object' ? (current.label ?? '') : '';
        }
        const label = this.options.switchValues[this.value === this.options.switchValues[0] ? 0 : 1];
        return typeof label === 'boolean' ? '' : label;
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
