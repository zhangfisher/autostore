import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { AutoFieldInput } from "./input";
import { tag } from "@/utils/tag";
/**
 * stepper 步进器 widget 的配置类型
 */
export interface AutoFieldStepperOptions {
    /**
     * 步长，默认 1（支持小数，如 0.01）
     */
    step?: number;
    /**
     * 小数精度（保留位数）
     * 未指定时自动取 step 的小数位数（step=0.01 -> 2 位），修 0.1+0.2 类浮点误差
     */
    precision?: number;
    /**
     * 单位前缀：纯展示（渲染在输入框前），state 始终存 number
     */
    prefix?: string;
    /**
     * 单位后缀：纯展示（渲染在输入框后），state 始终存 number
     */
    suffix?: string;
    /**
     * 最小值：到达时 - 按钮禁用（透传 sl-input 的 min）
     */
    min?: number | string;
    /**
     * 最大值：到达时 + 按钮禁用（透传 sl-input 的 max）
     */
    max?: number | string;
}
@tag("auto-field-stepper")
export class AutoFieldStepper extends AutoFieldInput<AutoFieldStepperOptions> {
    static styles = [
        AutoFieldInput.styles,
        css`
            /* sl-input 宽度由 width 选项控制（写宿主 inline style），默认 12em；
               显式设置 width 时输入框撑满宿主宽度 */
            sl-input {
                width: 12em;
            }
            :host([style*="width"]) sl-input {
                width: 100%;
            }
            /* 数值内容居中 + 隐藏原生 spinner（与自定义 +/- 按钮功能重复） */
            sl-input::part(input) {
                text-align: center;
                -moz-appearance: textfield;
                appearance: textfield;
            }
            sl-input::part(input)::-webkit-outer-spin-button,
            sl-input::part(input)::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            /* +/- 按钮紧凑：label 水平内边距收窄 */
            .actions sl-button.stepper-btn::part(label) {
                padding-left: 0.5em;
                padding-right: 0.5em;
            }
            .actions sl-button.stepper-btn {
                --sl-button-font-size: var(--auto-font-size);
            }
            .actions sl-button.stepper-btn sl-icon {
                font-size: var(--auto-font-size);
            }
        `,
    ] as any;
    getInputType() {
        return "number" as any;
    }
    getInitialOptions() {
        return {
            step: 1,
        };
    }
    /**
     * 单位是纯展示（state 存 number），不参与 input 的字符串拼接逻辑
     * （number 值在 startsWith/endsWith 处会直接抛错，必须绕开）
     */
    _initPrefixAndSuffix() {}
    getStep() {
        return Number(this.options.step) || 1;
    }
    /**
     * 小数精度：显式 precision 优先，否则取 step 的小数位数
     */
    getPrecision() {
        if (this.options.precision !== undefined) return this.options.precision;
        const stepStr = String(this.getStep());
        const dotIndex = stepStr.indexOf(".");
        return dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
    }
    /**
     * 按精度舍入，修 0.1+0.2 类浮点误差
     */
    _fixPrecision(value: number) {
        const p = this.getPrecision();
        return Number(value.toFixed(p));
    }
    /**
     * 步进：空值从 0 起步，clamp 到 [min,max] 后按精度舍入
     * 手动键盘输入越界不走此路径，交给 validate 校验链报错
     */
    _stepValue(direction: 1 | -1) {
        const cur = typeof this.value === "number" && !Number.isNaN(this.value) ? this.value : 0;
        const min = this.options.min !== undefined ? Number(this.options.min) : -Infinity;
        const max = this.options.max !== undefined ? Number(this.options.max) : Infinity;
        return this._fixPrecision(Math.min(Math.max(cur + direction * this.getStep(), min), max));
    }
    _onStep(direction: 1 | -1) {
        if (this.options.readOnly || !this.options.enable) return;
        const newVal = this._stepValue(direction);
        // 同步输入框显示，再走标准变更链（toState -> store.update -> 校验）
        if (this.input) {
            this.input.value = String(newVal);
        }
        this.onFieldChange();
    }
    /**
     * 边界禁用：值到达 min 时 - 禁用，到达 max 时 + 禁用
     * readOnly/enable=false 时双按钮禁用
     */
    _isStepDisabled(direction: 1 | -1) {
        if (this.options.readOnly || !this.options.enable) return true;
        const cur = typeof this.value === "number" && !Number.isNaN(this.value) ? this.value : 0;
        if (direction === 1) {
            return this.options.max !== undefined && cur >= Number(this.options.max);
        }
        return this.options.min !== undefined && cur <= Number(this.options.min);
    }
    _renderStepButton(direction: 1 | -1) {
        return html`<sl-button
            class="stepper-btn"
            size=${this.context.size}
            title=${direction === 1 ? "增加" : "减少"}
            ?disabled=${this._isStepDisabled(direction)}
            @click=${() => this._onStep(direction)}
        >
            <sl-icon name=${direction === 1 ? "plus" : "minus"}></sl-icon>
        </sl-button>`;
    }
    /**
     * -/+ 按钮在渲染时合成，不推入 beforeActions/afterActions 数组
     * （updateOptions 会用 options.actions 重建数组，注入的按钮会被清掉）
     *
     * 布局顺序由 sl-input light DOM 声明顺序决定（shoelace 槽内按声明顺序排布）：
     * - 按钮最先声明 -> prefix 槽内居首，其他前缀（icon/单位）均在 - 之后
     * + 按钮最后声明 -> suffix 槽内居末，所有后缀（单位等）均在 + 之前
     * 最终视觉：[−] [≈] 输入值 [kg] [+]
     */
    renderBeforeActions(slot?: boolean) {
        return html`<div
            class="actions before"
            part="before-actions"
            slot="${slot ? "prefix" : undefined}"
        >
            ${this._renderStepButton(-1)}
        </div>`;
    }
    renderAfterActions(slot?: boolean) {
        return html`<div
            class="actions after"
            part="after-actions"
            slot="${slot ? "suffix" : undefined}"
        >
            ${this._renderStepButton(1)}
        </div>`;
    }
    /**
     * 单位前缀：声明在 - 按钮之后（slot 内顺序）
     */
    _renderUnitPrefix() {
        return this.options.prefix ? html`<span slot="prefix">${this.options.prefix}</span>` : "";
    }
    /**
     * 单位后缀：声明在 + 按钮之前（slot 内顺序）
     */
    _renderUnitSuffix() {
        return this.options.suffix ? html`<span slot="suffix">${this.options.suffix}</span>` : "";
    }
    renderInput() {
        return html`
            <sl-input
                slot="value"
                type="${this.getInputType()}"
                .value=${this.value}
                name=${this.name}
                data-path=${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}
                size=${this.context.size}
                placeholder=${ifDefined(this.options.placeholder)}
                pattern=${ifDefined(this.options.pattern)}
                minLength=${ifDefined(this.options.minLength)}
                maxLength=${ifDefined(this.options.maxLength)}
                max=${ifDefined(this.options.max)}
                min=${ifDefined(this.options.min)}
                step=${ifDefined(this.options.step)}
                ?disabled=${!this.options.enable}
                ?readonly=${this.options.readOnly}
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onInputChange.bind(this)}
                @sl-change=${this.onInputChange.bind(this)}
                @sl-blur=${this.onInputBlur.bind(this)}
                spellcheck=${ifDefined(this.options.spellcheck)}
            >
                ${this.renderBeforeActions(true)}${this.getPrefix()}${this._renderUnitPrefix()}${this._renderUnitSuffix()}${this.getSuffix()}${this.renderAfterActions(
                    true,
                )}</sl-input
            >
        `;
    }
    renderView() {
        return html`<span>${this.options.prefix ?? ""}${this.value}${this.options.suffix ?? ""}</span>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        "auto-field-stepper": AutoFieldStepper;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        stepper: AutoFieldStepperOptions;
    }
}
