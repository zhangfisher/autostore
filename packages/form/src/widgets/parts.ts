import { css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { AutoField } from "@/field";
import type { SchemaPartsWidgetOptions } from "autostore";
import { tag } from "@/utils/tag";

export type AutoFieldPartsOptions = Required<SchemaPartsWidgetOptions>;

@tag("auto-field-parts")
export class AutoFieldParts extends AutoField<AutoFieldPartsOptions> {
	static styles = [
		AutoField.styles,
		css`
            :host > .autofield {
                & > .value {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
            }
            sl-input {
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                text-align: center;
            }
            sl-input::part(input) {
                text-align: center;
            }
            sl-input::part(input)::selection {
                background: none;
            }
            sl-input::part(input):focus {
                background-color: var(--t-color-theme--1);
            }
        `,
	] as any;

	parts: string[] = [];

	getInitialOptions(): Record<string, any> {
		return {
			template: "0000",
			delimiter: "",
			caseType: "both",
			includeDelimiter: true,
			onlyNumber: false,
		};
	}

	_isValidChar(c: string) {
		if (!this.options.chars) return true;
		return new RegExp(this.options.chars!).test(c);
	}

	_onKeyDown(e: KeyboardEvent) {
		// 获取按键的字符
		const key = e.key;
		// 如果是功能键（如Backspace、Delete等）或修饰键，允许通过
		if (key.length !== 1) return;
		// 检查字符是否有效
		if (!this._isValidChar(key)) {
			// 如果无效，阻止默认行为，即阻止字符输入
			e.preventDefault();
		}
		e.stopPropagation();
	}
	_onPartInput(e: any) {
		const inputs = Array.from(this.shadow.querySelectorAll("sl-input"));
		const chars = inputs.reduce((prev, input) => {
			prev += input.value;
			if (this.options.caseType === "upper") {
				return prev.toUpperCase();
			} else if (this.options.caseType === "lower") {
				return prev.toLowerCase();
			} else {
				return prev;
			}
		}, "");

		let charIndex: number = 0;
		this.parts.forEach((part, i) => {
			if (!this.options.delimiter.includes(part)) {
				this.parts[i] = chars[charIndex++];
			}
		});
		this.onFieldChange();
		this._isLastInput(e);
	}
	getInputValue() {
		return this.options.includeDelimiter
			? this.parts.join("")
			: this.parts.reduce((r, cur) => {
					if (!this.options.delimiter.includes(cur)) {
						return `${r}${cur}`;
					}
					return r;
				}, "");
	}
	_isLastInput(e: Event) {
		const input = e.target as HTMLInputElement;
		// 检查输入值长度是否为3
		if (input.value.length >= 1) {
			input.blur();
			//@ts-ignore
			const nextInput = (input.nextElementSibling ||
				(input.nextElementSibling as any)?.nextElementSibling) as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
				nextInput.select();
			}
		}
	}
	_onPaste(e: ClipboardEvent) {
		e.preventDefault(); // 阻止默认粘贴行为
		const clipboardData = e.clipboardData?.getData("text/plain") || "";
		const parts = this._parseParts(clipboardData);

		const getNextInput = (input: Element | undefined | null) => {
			if (!input) return;
			while (true) {
				inputEle = inputEle!.nextElementSibling;
				if (inputEle) {
					if (inputEle.tagName === "SL-INPUT") {
						return inputEle;
					}
				} else {
					break;
				}
			}
		};
		let inputEle: Element | null | undefined = this.shadow.querySelector("sl-input");
		if (inputEle) {
			for (const part of parts) {
				if (this.options.delimiter.includes(part)) continue;
				// @ts-ignore
				inputEle.value = part;
				inputEle = getNextInput(inputEle);
				if (!inputEle) break;
			}
		}
	}
	connectedCallback(): void {
		super.connectedCallback();
		this.parts = this._parseParts(this.value);
	}

	_parseParts(value: string) {
		const delimiter = this.options.delimiter;
		const template = this.options.template;
		let vIndex: number = 0;
		return Array.from(template).map((char) => {
			if (delimiter.includes(char)) {
				if (value[vIndex] === char) {
					vIndex++;
				}
				return char;
			} else {
				const c = value[vIndex++] || char;
				if (this.options.caseType === "upper") {
					return c.toUpperCase();
				} else if (this.options.caseType === "lower") {
					return c.toLowerCase();
				} else {
					return c;
				}
			}
		});
	}

	_onPartFocus(e: any) {
		const input = e.target as HTMLInputElement;
		input.select();
	}
	renderPart(part: string) {
		return html`<sl-input
            maxLength="1"
            .value=${part}
            noSpinButtons
            autocorrect="off"
            autocomplete="off"
            spellcheck="false"
            @paste=${(e: ClipboardEvent) => this._onPaste(e)}
            @sl-focus=${this._onPartFocus.bind(this)}
            @keydown=${this._onKeyDown.bind(this)}
            @sl-input=${this._onPartInput.bind(this)}
        ></sl-input>`;
	}

	renderInput() {
		return html`
            <auto-flex grow="none" align="center" gap="0.5em" wrap>
                ${repeat(this.parts, (part: string) => {
					if (this.options.delimiter.includes(part)) {
						return html`${part}`;
					} else {
						return this.renderPart(part);
					}
				})}
            </auto-flex>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-field-parts": AutoFieldParts;
	}
}
