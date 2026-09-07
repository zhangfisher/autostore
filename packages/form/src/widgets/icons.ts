import { property, state } from "lit/decorators.js";
import { AutoField } from "@/field";
import { css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { AutoDropdownField } from "@/field/dropdown";
import { tag } from "@/utils/tag";
const builtIns = [
    "help",
    "error",
    "email",
    "search",
    "lock",
    "user",
    "globe",
    "date",
    "time",
    "phone",
    "copy",
    "remove",
    "refresh",
    "datetime",
];
/**
 * icons 图标选择 widget 的配置类型
 */
export interface AutoFieldIconsOptions {
    /**
     * 候选图标名列表（也接受逗号分隔字符串）
     */
    icons?: string[] | string;
    /**
     * 图标渲染尺寸，默认 "24px"
     */
    size?: string;
    /**
     * 是否多选；多选时组件满宽展示，单选时收缩为一个图标 + 下拉箭头
     */
    multiple?: boolean;
    /**
     * 是否以下拉面板展示（false 时平铺）；多选默认平铺，单选始终为下拉
     */
    dropdown?: boolean;
    /**
     * 是否附带内置图标集，默认 true
     */
    builtIn?: boolean;
}
@tag("auto-field-icons")
export class AutoFieldIcons extends AutoDropdownField<AutoFieldIconsOptions> {
    @property({ type: Boolean, reflect: true })
    multiple: boolean = false;
    static styles = [
        AutoField.styles,
        AutoDropdownField.styles,
        css`
            /* ============ 单选：收缩为单个图标 + 下拉箭头的宽度 ============ */
            :host(:not([multiple])) {
                width: fit-content;
                /* 基类宽度链逐层放开：.autofield{width:100%} → .content（块级默认满宽）
                   → .dropdown{flex-grow:1} → sl-dropdown{width:100%} */
                & > .autofield {
                    width: auto;
                    & > .value > .content {
                        /* fit-content：flex 父级（.value 是普通块、内容行由 .content 自身撑开）
                           下按内容收缩，与 host 的收缩联动 */
                        width: fit-content;
                        & > .dropdown {
                            flex-grow: 0;
                            padding: 0px;
                            & > sl-dropdown {
                                width: auto;
                            }
                        }
                    }
                }
                min-width: var(--auto-line-height);
                /* 下拉面板不跟随触发器收缩（对冲 sl-dropdown 的 sync=width） */
                .popoup-container {
                    min-width: 180px;
                }
            }
            /* ============ 多选：满宽展示 ============ */
            :host([multiple]) {
                width: 100%;
            }
            /* 平铺模式下为图标容器提供输入框外观（.icons 不是 sl-dropdown 直接子元素，选择器须从容器向下到达） */
            .content > .dropdown > sl-dropdown > .icons,
            :host([dropdown]) .popoup-container:not(.dropdown) > .icons {
                padding: 0.5em;
                box-sizing: border-box;
                background-color: var(--sl-input-background-color);
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
            }
            sl-icon::part(svg) {
                stroke-width: 1.1;
            }
            .icons {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5em;
                & > .icon {
                    cursor: pointer;
                    display: inline-flex;
                    &:hover {
                        color: var(--auto-theme-color);
                    }
                    &.selected {
                        color: var(--auto-theme-color);
                    }
                }
            }
            .popoup-container {
                padding: 1em;
            }
        `,
    ] as any;
    @state()
    active: boolean = false;
    @state()
    selected: string[] = [];
    icons: string[] = [];
    getInitialOptions() {
        const opts = {
            icons: [],
            size: "24px",
            multiple: false,
            dropdown: false,
            builtIn: true,
        };
        return opts;
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.icons = Array.isArray(this.options.icons)
            ? this.options.icons
            : (this.options.icons as string).split(",");
        if (this.options.builtIn) {
            builtIns.forEach((icon) => {
                if (!this.icons.includes(icon)) {
                    this.icons.push(icon);
                }
            });
        }
        this.selected = Array.isArray(this.value) ? this.value : this.value.split(",");
    }
    /**
     * options 会在 schema 迟到提交时被 updateOptions 整体重建（见
     * AutoField.updated 对 schema 的补偿初始化），所有派生状态必须在
     * 每次重建后同步，写在 connectedCallback 里会被重建抹掉
     */
    updateOptions() {
        super.updateOptions();
        this.multiple = this.options.multiple || false;
        // 单选强制走下拉：触发器只占一个图标 + 箭头的宽度
        if (!this.multiple) {
            this.options.dropdown = true;
        }
    }
    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        // value 变化（外部写入状态/schema 迟到初始化）时同步选中集合
        if (changedProperties.has("value") && this.value !== undefined) {
            this.selected = Array.isArray(this.value)
                ? [...this.value]
                : String(this.value).split(",");
        }
        // 字段宽度必须写宿主 inline style：表单 .fields > * { width:100% } 在表单
        // shadow 树中作用于本宿主，同特异性下压制本组件 :host() 规则（与
        // AutoField options.width 同一原因，见 field/index.ts render 注释）
        // 单选收缩为内容宽（一个图标 + 箭头），多选满宽
        if (this.multiple) {
            if (this.style.width !== "100%") this.style.width = "100%";
        } else {
            if (this.style.width) this.style.width = "";
        }
    }
    renderView() {
        return this.renderIcons(this.selected);
    }
    _isSelected(name: string) {
        if (this.options.multiple) {
            return this.selected.includes(name);
        } else {
            return this.selected[0] === name;
        }
    }
    _onClickIcon(name: string) {
        if (this.context.viewonly) return;
        if (this.options.multiple) {
            // Lit @state 仅追踪属性赋值，原地 push/splice 不触发重渲染，
            // 须以新数组替换（否则切换图标不实时生效）
            const index = this.selected.findIndex((v) => v === name);
            this.selected =
                index > -1 ? this.selected.filter((v) => v !== name) : [...this.selected, name];
            this.onFieldInput();
        } else {
            this.selected = [name];
            this.onFieldInput();
            // 单选模式下选择图标后关闭下拉面板
            const dropdown = this.shadowRoot?.querySelector("sl-dropdown") as any;
            if (dropdown && typeof dropdown.hide === "function") {
                dropdown.hide();
            }
        }
    }
    getInputValue() {
        if (this.options.multiple) {
            return this.selected;
        } else {
            return this.selected[0];
        }
    }
    renderIcons(icons: string[], highlight: boolean = true) {
        return html`<div class="icons" style="font-size:${this.options.size}">
            ${repeat(icons, (name) => {
                if (name === "") return;
                return html`<span
                    class="icon ${highlight && this._isSelected(name) ? "selected" : undefined}"
                    title="${name}"
                    @click=${() => this._onClickIcon(name)}
                    ><sl-icon name="${name}"></sl-icon
                ></span>`;
            })}
        </div>`;
    }
    renderSelection() {
        // 单选时只显示第一个图标，配合收缩宽度
        return this.renderIcons(this.multiple ? this.selected : this.selected.slice(0, 1), false);
    }
    renderDropdown() {
        return this.renderIcons(this.icons);
    }
}
declare global {
    interface HTMLElementTagNameMap {
        "auto-field-icons": AutoFieldIcons;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        icons: AutoFieldIconsOptions;
    }
}
