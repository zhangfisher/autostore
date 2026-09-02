/**
 * AutoForm 属性面板组件
 * 允许动态修改 auto-form 的外观和行为属性
 */

import { customElement, property, query } from "lit/decorators.js";
import { LitElement, html, css } from "lit";

@customElement("form-props-panel")
export class FormPropsPanel extends LitElement {
    static styles = css`
        :host {
            display: block;
            background: #f8fafc;
            border-radius: 8px;
            padding: 1rem;
            border: 1px solid #e2e8f0;
        }
        h4 {
            margin: 0 0 0.75rem 0;
            font-size: 0.875rem;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .props-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }
        .prop-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .prop-item label {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
        }
        .prop-item select,
        .prop-item input[type="text"] {
            padding: 0.375rem 0.5rem;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            font-size: 0.8rem;
            background: white;
            color: #334155;
            outline: none;
        }
        .prop-item select:focus,
        .prop-item input[type="text"]:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.15);
        }
        .prop-toggle {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 0;
        }
        .prop-toggle label {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
            margin: 0;
        }
        .prop-toggle input[type="checkbox"] {
            width: 14px;
            height: 14px;
        }
    `;

    @property({ type: String }) border: string = "grid";
    @property({ type: String }) size: string = "medium";
    @property({ type: String }) validAt: string = "lost-focus";
    @property({ type: Boolean }) compact: boolean = false;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ type: Boolean }) viewonly: boolean = false;
    @property({ type: String }) labelPos: string = "top";
    @property({ type: String }) layout: string = "auto";

    /** 目标 auto-form 元素 */
    @query("slot")
    slotEl?: HTMLSlotElement;

    private _targetForm: HTMLElement | null = null;

    connectedCallback(): void {
        super.connectedCallback();
        this._findForm();
    }

    updated(changed: any) {
        super.updated(changed);
        if (changed.has("border") || changed.has("size") || changed.has("validAt") ||
            changed.has("compact") || changed.has("readonly") || changed.has("viewonly") ||
            changed.has("labelPos") || changed.has("layout")) {
            this._applyProps();
        }
    }

    private _findForm() {
        // 在父级或 slotted 内容中查找 auto-form
        const parent = this.parentElement;
        if (parent) {
            this._targetForm = parent.querySelector("auto-form") ||
                               parent.closest(".example-grid")?.querySelector("auto-form") || null;
        }
        this._applyProps();
    }

    private _applyProps() {
        if (!this._targetForm) {
            // 尝试重新查找
            this._findForm();
        }
        if (!this._targetForm) return;

        const form = this._targetForm as any;
        form.setAttribute("border", this.border);
        form.setAttribute("size", this.size);
        form.setAttribute("valid-at", this.validAt);
        // Boolean 属性必须通过 property 赋值触发 Lit 响应式更新
        form.compact = this.compact;
        form.readonly = this.readonly;
        form.viewonly = this.viewonly;
        form.setAttribute("label-pos", this.labelPos);
        form.setAttribute("layout", this.layout);
    }

    /**
     * 设置目标 auto-form 元素
     */
    setTarget(form: HTMLElement) {
        this._targetForm = form;
        this._applyProps();
    }

    render() {
        return html`
            <h4>⚙️ 属性面板</h4>
            <div class="props-grid">
                <div class="prop-item">
                    <label>边框 (border)</label>
                    <select @change=${(e: Event) => { this.border = (e.target as HTMLSelectElement).value; }}>
                        <option value="grid" ?selected=${this.border === "grid"}>grid</option>
                        <option value="outline" ?selected=${this.border === "outline"}>outline</option>
                        <option value="none" ?selected=${this.border === "none"}>none</option>
                    </select>
                </div>
                <div class="prop-item">
                    <label>大小 (size)</label>
                    <select @change=${(e: Event) => { this.size = (e.target as HTMLSelectElement).value; }}>
                        <option value="small" ?selected=${this.size === "small"}>small</option>
                        <option value="medium" ?selected=${this.size === "medium"}>medium</option>
                        <option value="large" ?selected=${this.size === "large"}>large</option>
                    </select>
                </div>
                <div class="prop-item">
                    <label>校验时机 (validAt)</label>
                    <select @change=${(e: Event) => { this.validAt = (e.target as HTMLSelectElement).value; }}>
                        <option value="lost-focus" ?selected=${this.validAt === "lost-focus"}>lost-focus</option>
                        <option value="input" ?selected=${this.validAt === "input"}>input</option>
                    </select>
                </div>
                <div class="prop-item">
                    <label>标签位置 (labelPos)</label>
                    <select @change=${(e: Event) => { this.labelPos = (e.target as HTMLSelectElement).value; }}>
                        <option value="top" ?selected=${this.labelPos === "top"}>top</option>
                        <option value="left" ?selected=${this.labelPos === "left"}>left</option>
                        <option value="none" ?selected=${this.labelPos === "none"}>none</option>
                    </select>
                </div>
                <div class="prop-item">
                    <label>布局 (layout)</label>
                    <select @change=${(e: Event) => { this.layout = (e.target as HTMLSelectElement).value; }}>
                        <option value="auto" ?selected=${this.layout === "auto"}>auto</option>
                        <option value="row" ?selected=${this.layout === "row"}>row</option>
                        <option value="col" ?selected=${this.layout === "col"}>col</option>
                    </select>
                </div>
                <div class="prop-item" style="justify-content: flex-end;">
                    <div class="prop-toggle">
                        <input type="checkbox" id="compact" .checked=${this.compact}
                               @change=${(e: Event) => { this.compact = (e.target as HTMLInputElement).checked; }}>
                        <label for="compact">紧凑 (compact)</label>
                    </div>
                    <div class="prop-toggle">
                        <input type="checkbox" id="readonly" .checked=${this.readonly}
                               @change=${(e: Event) => { this.readonly = (e.target as HTMLInputElement).checked; }}>
                        <label for="readonly">只读 (readonly)</label>
                    </div>
                    <div class="prop-toggle">
                        <input type="checkbox" id="viewonly" .checked=${this.viewonly}
                               @change=${(e: Event) => { this.viewonly = (e.target as HTMLInputElement).checked; }}>
                        <label for="viewonly">浏览 (viewonly)</label>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "form-props-panel": FormPropsPanel;
    }
}

export default FormPropsPanel;
