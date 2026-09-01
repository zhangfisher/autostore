import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from '@/field';
import { css, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import { tag } from '@/utils/tag';
/**
 * switch widget 的配置类型（开关语义与 checkbox 同构）
 */
export interface AutoFieldSwitchOptions {
    /**
     * 双值开关语义：[选中值, 未选中值]，默认 [true,false]
     */
    switchValues?: [any, any];
    /**
     * 开关旁的说明文字（缺省时取 switchValues 中非布尔值的一项）
     */
    checkLabel?: string;
}
@tag('auto-field-switch')
export class AutoFieldSwitch extends AutoField<AutoFieldSwitchOptions> {
    static styles = [
        AutoField.styles,
        css`
            sl-switch.viewonly {
                user-select: none;
                pointer-events: none;
            }
        `,
    ] as any;
    renderInput() {
        return html`
            <sl-switch
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value="${this.options.switchValues[0]}"
                .checked=${this._isChecked()}
                ?disabled=${!this.options.enable}
                size="${ifDefined(this.context.size)}"
                placeholder="${ifDefined(this.options.placeholder)}"
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
                ${this.getCheckLabel()}</sl-switch
            >
        `;
    }
    getCheckLabel() {
        if (this.options.checkLabel) {
            return this.options.checkLabel;
        } else {
            const label = this.options.switchValues[this.value === this.options.switchValues[0] ? 0 : 1];
            return typeof label === 'boolean' ? '' : label;
        }
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
    renderView() {
        return html` <sl-switch class="viewonly" ?checked=${this._isChecked()}>${this.getCheckLabel()}</sl-switch> `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-switch': AutoFieldSwitch;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        switch: AutoFieldSwitchOptions;
    }
}
