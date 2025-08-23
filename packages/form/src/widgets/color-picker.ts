import { AutoField } from "@/field";
import { css, html } from "lit";
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js";
import type { SchemaColorPickerWidgetOptions } from "autostore";
import { tag } from "@/utils/tag";
import { repeat } from "lit/directives/repeat.js";

const defaultColors = [
	"#ffffff",
	"#f1f1f1",
	"#bfbfbf",
	"#262626",
	"#f5222d",
	"#fa541c",
	"#fa8c16",
	"#faad14",
	"#fadb14",
	"#a0d911",
	"#52c41a",
	"#13c2c2",
	"#1890ff",
	"#2f54eb",
	"#722ed1",
	"#eb2f96",
];

export type AutoFieldColorPickerOptions = Required<SchemaColorPickerWidgetOptions>;

@tag("auto-field-colorpicker")
export class AutoFieldColorPicker extends AutoField<AutoFieldColorPickerOptions> {
	static styles = [
		AutoField.styles,
		css`
            sl-color-picker::part(trigger) {
                border-radius: 4px;
            }
            .value{
                display:flex;
                gap: 0.5em;
                align-items: center;
            }
            .color {
                border: 2px solid white;
                border-radius: 4px;
                width: 1rem;
                height: 1rem;
                outline: 1px solid #aaa;
                margin-right: 0.5rem;
            }
            :host(.viewonly) {
                .value > span {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            }
            .preset-color{
                width: var(--sl-input-height-medium);
                height: var(--sl-input-height-medium);
                border-radius: 4px;
                display: inline-block;
                cursor: pointer;
                border: 3px solid #ffffff;
                box-sizing: border-box;
                box-shadow: var(--auto-shadow);
                position: relative;
                &:hover{
                    outline:1px solid var(--auto-primary-color);
                }
                &.selected{
                    outline:2px solid var(--auto-primary-color);
                    &::before{
                        display: block;
                        content: "";
                        width: 12px;
                        height: 8px;
                        transform: rotate(-45deg); 
                        border: 2px solid white;
                        box-sizing: border-box;
                        border-top: transparent;
                        border-right: transparent;
                        margin: auto; /* 修改为 auto */
                        position: absolute;
                        top: 0; /* 添加顶部定位 */
                        left: 0; /* 添加左侧定位 */
                        right: 0; /* 添加右侧定位 */
                        bottom: 0; /* 添加底部定位 */
                    }
                }
            }
        `,
	] as any;
	getInitialOptions() {
		return {
			format: "hex",
			opacity: false,
			inline: false,
			swatches: defaultColors,
		};
	}
	renderInput() {
		return html`
            ${this._renderColors()}
            <sl-color-picker
                name=${this.name}
                data-path=${this.path}
                class="auto-input"
                value=${this.value}
                .format=${this.options.format}
                ?opacity=${this.options.opacity}
                ?inline=${this.options.inline}
                ?required=${this.options.required}
                ?disabled=${!this.options.enable}
                .placeholder=${this.options.placeholder}
                .swatches=${this.options.swatches.join(";")}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
        `;
	}
	_onClickPresetColor(e: Event) {
		// @ts-expect-error
		this.input.value = (e.target as HTMLElement).dataset.color;
		this.onFieldInput();
	}
	_renderColors() {
		if (this.options.presets) {
			return html`${repeat(
				this.options.presets,
				(color) => html`<span
                data-color="${color}"
                    @click=${this._onClickPresetColor}
                    class="preset-color${this.value === color ? " selected" : ""}" style="background-color:${color};"></span>`,
			)}`;
		}
	}
	renderView() {
		return html`<span><span class="color"   style="background-color:${this.value};"></span>${this.value}</span>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-field-colorpicker": AutoFieldColorPicker;
	}
}
