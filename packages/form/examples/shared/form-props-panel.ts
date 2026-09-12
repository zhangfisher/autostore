/**
 * AutoForm 属性面板组件
 *
 * Tab 布局：
 * - Tab 1「实时状态」：显示绑定的 autostore 的实时 state（JSON 视图）
 * - Tab 2「表单属性」：动态修改 auto-form 的外观和行为属性
 */

import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html, css } from "lit";
import type { Watcher } from "autostore";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";

@customElement("form-props-panel")
export class FormPropsPanel extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 0rem;
            border: none;
            min-width: 0;
            /* 面板由外层拖拽调宽，禁止自身产生水平滚动 */
            overflow: hidden;
            /* 容器查询锚点：面板宽度由拖拽决定而非视口，内部布局跟随容器自身尺寸响应 */
            container-type: inline-size;
        }
        h4 {
            margin: 0 0 0.75rem 0;
            font-size: 0.875rem;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        /* 状态视图 */
        .state-viewer {
            background: #ffffff;
            color: #334155;
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
            font-family: monospace;
            font-size: 0.75rem;
            line-height: 1.5;
            white-space: pre-wrap;
            word-break: break-all;
            /* 仅允许纵向滚动，容器变窄时不得出现水平滚动条 */
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 420px;
            margin: 0;
        }
        .state-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 0.75rem;
            color: #64748b;
            padding: 0.5em;
        }
        .state-meta code {
            word-break: break-all;
        }
        /* 表单属性：默认固定两列（不随拖宽增列），拖窄到放不下两列时经容器查询降为单列 */
        .props-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem;
            min-width: 0;
            padding: 1em;
        }
        @container (max-width: 250px) {
            .props-grid {
                grid-template-columns: 1fr;
            }
        }
        .prop-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            /* 允许 grid 子项收缩，防止固有宽度撑出水平滚动条 */
            min-width: 0;
        }
        /* 复选开关组独占整行 */
        .prop-item--toggles {
            grid-column: 1 / -1;
        }
        .prop-item label {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
        }
        .prop-item select,
        .prop-item input[type="text"] {
            width: 100%;
            box-sizing: border-box;
            min-width: 0;
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
        .section-title {
            grid-column: 1 / -1;
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid #e2e8f0;
        }
    `;

    @property({ type: String }) border: string = "none";
    @property({ type: String }) size: string = "medium";
    @property({ type: String }) validAt: string = "lost-focus";
    @property({ type: Boolean }) compact: boolean = false;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ type: Boolean }) viewonly: boolean = false;
    @property({ type: String }) labelPos: string = "top";
    @property({ type: String }) layout: string = "auto";
    @property({ type: String }) labelWidth: string = "7em";
    @property({ type: Boolean }) dark: boolean = false;
    @property({ type: Boolean }) validAtInit: boolean = false;
    @property({ type: Boolean }) advanced: boolean = false;
    @property({ type: String }) path: string = "";
    @property({ type: String }) group: string = "";
    @property({ type: String }) viewAlign: string = "right";

    /** 实时状态文本（由 store watch 订阅刷新） */
    @state()
    private _stateText: string = "";

    /** 目标 store 的 watch 订阅句柄（Watcher 是带 off() 的对象，非函数） */
    private _unwatch: Watcher | null = null;

    /** 目标 auto-form 元素 */
    private _targetForm: HTMLElement | null = null;

    connectedCallback(): void {
        super.connectedCallback();
        this._findForm();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._stopWatch();
    }

    updated(changed: any) {
        super.updated(changed);
        if (
            changed.has("border") ||
            changed.has("size") ||
            changed.has("validAt") ||
            changed.has("compact") ||
            changed.has("readonly") ||
            changed.has("viewonly") ||
            changed.has("labelPos") ||
            changed.has("layout") ||
            changed.has("labelWidth") ||
            changed.has("dark") ||
            changed.has("validAtInit") ||
            changed.has("advanced") ||
            changed.has("path") ||
            changed.has("group") ||
            changed.has("viewAlign")
        ) {
            this._applyProps();
        }
    }

    private _findForm() {
        // 在父级或 slotted 内容中查找 auto-form
        if (this._targetForm) return;
        const parent = this.parentElement;
        if (parent) {
            this._targetForm =
                parent.querySelector("auto-form") ||
                parent.closest(".example-grid")?.querySelector("auto-form") ||
                null;
        }
    }

    /** 订阅目标 store 的变化，刷新实时状态文本 */
    private _startWatch() {
        const store = (this._targetForm as any)?.activeStore;
        if (!store) return;
        this._stopWatch();
        this._stateText = JSON.stringify(store.state, null, 2);
        this._unwatch = store.watch(() => {
            this._stateText = JSON.stringify(store.state, null, 2);
        });
    }

    private _stopWatch() {
        this._unwatch?.off();
        this._unwatch = null;
    }

    private _applyProps() {
        if (!this._targetForm) {
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
        form.dark = this.dark;
        form.validAtInit = this.validAtInit;
        form.advanced = this.advanced;
        form.setAttribute("label-pos", this.labelPos);
        form.setAttribute("label-width", this.labelWidth);
        form.setAttribute("layout", this.layout);
        form.setAttribute("view-align", this.viewAlign);
        if (this.path) {
            form.setAttribute("path", this.path);
        } else {
            form.removeAttribute("path");
        }
        if (this.group) {
            form.setAttribute("group", this.group);
        } else {
            form.removeAttribute("group");
        }
        // 绑定变化后重新订阅实时状态
        this._startWatch();
    }

    /**
     * 设置目标 auto-form 元素
     */
    setTarget(form: HTMLElement) {
        this._targetForm = form;
        this._applyProps();
    }

    private _renderState() {
        const store = (this._targetForm as any)?.activeStore;
        return html`
            <div class="state-meta">
                <sl-badge size="small" variant="neutral">autostore</sl-badge>
                ${store
                    ? html`id: <code>${store.id}</code>`
                    : html`<span style="color:#f59e0b;">未绑定 store</span>`}
            </div>
            <pre class="state-viewer">${this._stateText || "{}"}</pre>
        `;
    }

    render() {
        return html`
            <sl-tab-group>
                <sl-tab slot="nav" panel="state">实时状态</sl-tab>
                <sl-tab slot="nav" panel="props">表单属性</sl-tab>
                <sl-tab-panel name="state" style="padding:1em;"
                    >${this._renderState()}</sl-tab-panel
                >
                <sl-tab-panel name="props">
                    <div class="props-grid">
                        <div class="prop-item">
                            <label>边框 (border)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.border = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="grid" ?selected=${this.border === "grid"}>
                                    grid
                                </option>
                                <option value="outline" ?selected=${this.border === "outline"}>
                                    outline
                                </option>
                                <option value="none" ?selected=${this.border === "none"}>
                                    none
                                </option>
                            </select>
                        </div>
                        <div class="prop-item">
                            <label>大小 (size)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.size = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="small" ?selected=${this.size === "small"}>
                                    small
                                </option>
                                <option value="medium" ?selected=${this.size === "medium"}>
                                    medium
                                </option>
                                <option value="large" ?selected=${this.size === "large"}>
                                    large
                                </option>
                            </select>
                        </div>
                        <div class="prop-item">
                            <label>标签位置 (labelPos)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.labelPos = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="top" ?selected=${this.labelPos === "top"}>
                                    top
                                </option>
                                <option value="left" ?selected=${this.labelPos === "left"}>
                                    left
                                </option>
                                <option value="none" ?selected=${this.labelPos === "none"}>
                                    none
                                </option>
                            </select>
                        </div>
                        <div class="prop-item">
                            <label>标签宽度 (labelWidth)</label>
                            <input
                                type="text"
                                .value=${this.labelWidth}
                                @change=${(e: Event) => {
                                    this.labelWidth = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>
                        <div class="prop-item">
                            <label>布局 (layout)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.layout = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="auto" ?selected=${this.layout === "auto"}>
                                    auto
                                </option>
                                <option value="row" ?selected=${this.layout === "row"}>row</option>
                                <option value="col" ?selected=${this.layout === "col"}>col</option>
                            </select>
                        </div>
                        <div class="prop-item">
                            <label>浏览对齐 (viewAlign)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.viewAlign = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="left" ?selected=${this.viewAlign === "left"}>
                                    left
                                </option>
                                <option value="center" ?selected=${this.viewAlign === "center"}>
                                    center
                                </option>
                                <option value="right" ?selected=${this.viewAlign === "right"}>
                                    right
                                </option>
                            </select>
                        </div>

                        <div class="prop-item">
                            <label>校验时机 (validAt)</label>
                            <select
                                @change=${(e: Event) => {
                                    this.validAt = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option
                                    value="lost-focus"
                                    ?selected=${this.validAt === "lost-focus"}
                                >
                                    lost-focus
                                </option>
                                <option value="input" ?selected=${this.validAt === "input"}>
                                    input
                                </option>
                            </select>
                        </div>
                        <div class="prop-item">
                            <label>路径过滤 (path)</label>
                            <input
                                type="text"
                                .value=${this.path}
                                placeholder="如: user.name"
                                @change=${(e: Event) => {
                                    this.path = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>
                        <div class="prop-item">
                            <label>分组 (group)</label>
                            <input
                                type="text"
                                .value=${this.group}
                                placeholder="如: basic"
                                @change=${(e: Event) => {
                                    this.group = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>
                        <div
                            class="prop-item prop-item--toggles"
                            style="justify-content: flex-start; margin-top: 0.5rem;"
                        >
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="compact"
                                    .checked=${this.compact}
                                    @change=${(e: Event) => {
                                        this.compact = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="compact">紧凑 (compact)</label>
                            </div>
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="readonly"
                                    .checked=${this.readonly}
                                    @change=${(e: Event) => {
                                        this.readonly = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="readonly">只读 (readonly)</label>
                            </div>
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="viewonly"
                                    .checked=${this.viewonly}
                                    @change=${(e: Event) => {
                                        this.viewonly = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="viewonly">浏览 (viewonly)</label>
                            </div>
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="dark"
                                    .checked=${this.dark}
                                    @change=${(e: Event) => {
                                        this.dark = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="dark">暗色 (dark)</label>
                            </div>
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="validAtInit"
                                    .checked=${this.validAtInit}
                                    @change=${(e: Event) => {
                                        this.validAtInit = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="validAtInit">初始化校验 (validAtInit)</label>
                            </div>
                            <div class="prop-toggle">
                                <input
                                    type="checkbox"
                                    id="advanced"
                                    .checked=${this.advanced}
                                    @change=${(e: Event) => {
                                        this.advanced = (e.target as HTMLInputElement).checked;
                                    }}
                                />
                                <label for="advanced">高级选项 (advanced)</label>
                            </div>
                        </div>
                    </div>
                </sl-tab-panel>
            </sl-tab-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "form-props-panel": FormPropsPanel;
    }
}

export default FormPropsPanel;
