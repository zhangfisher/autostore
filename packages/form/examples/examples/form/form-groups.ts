/**
 * 表单分组示例
 * 演示 auto-form-tabs 标签页分组与 auto-form-collapse 折叠面板分组
 *
 * 核心机制：
 * - 多个 <auto-form> 通过 .state 属性共享同一份状态定义（AutoForm 内部深拷贝后
 *   各自创建 store，切换分组不丢值由字段级响应式同步保证）
 * - 每个表单用 group 属性只渲染 schema 中声明了对应 group 的字段
 * - tabs/collapse 容器读取子表单的 name/label/icon 属性生成分组导航
 */

import { customElement, state } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import type { Watcher } from "autostore";
import "../../../src";

// 分组导航定义：name 同时是 tabs/collapse 的 active 匹配键
const GROUPS = [
    { name: "basic", label: "基础信息", icon: "user" },
    { name: "work", label: "工作信息", icon: "globe" },
    { name: "skills", label: "技能特长", icon: "copy" },
    { name: "settings", label: "偏好设置", icon: "bell" },
];

// 标签页方向选项
const TAB_DIRECTIONS: Array<{
    value: "top" | "bottom" | "left" | "right";
    label: string;
}> = [
    { value: "top", label: "上" },
    { value: "bottom", label: "下" },
    { value: "left", label: "左" },
    { value: "right", label: "右" },
];

@customElement("example-form-groups")
class FormGroupsExample extends LitElement {
    /**
     * 共享状态定义：所有分组表单通过 .state 传入同一份定义
     * （AutoForm 内部会深拷贝后创建独立的 AutoStore + FormConfigManager，
     * configKey 为空串，各分组字段经响应式 watch 双向同步）
     */
    userState = {
        user: {
            // ---- 基础信息组 ----
            name: configurable("", {
                label: "姓名",
                group: "basic",
                required: true,
            }),
            email: configurable("", {
                label: "邮箱",
                widget: "email",
                group: "basic",
            }),
            phone: configurable("", {
                label: "电话",
                widget: "phone",
                group: "basic",
            }),

            // ---- 工作信息组 ----
            company: configurable("", {
                label: "公司名称",
                group: "work",
                placeholder: "请输入公司名称",
            }),
            position: configurable("", {
                label: "职位",
                group: "work",
                widget: "select",
                choices: ["开发工程师", "产品经理", "设计师", "测试工程师"],
            }),
            workYears: configurable(1, {
                label: "工作年限",
                group: "work",
                widget: "number",
                min: 0,
                max: 40,
            }),

            // ---- 技能特长组 ----
            skills: configurable([], {
                label: "技能栈",
                group: "skills",
                widget: "checkbox-group",
                choices: [
                    { label: "JavaScript", value: "js" },
                    { label: "TypeScript", value: "ts" },
                    { label: "Vue.js", value: "vue" },
                    { label: "React", value: "react" },
                    { label: "Node.js", value: "nodejs" },
                ],
                itemWidth: "33.33%",
            }),
            experience: configurable("中级", {
                label: "经验水平",
                group: "skills",
                widget: "radio",
                choices: ["初级", "中级", "高级", "专家"],
            }),

            // ---- 偏好设置组 ----
            notification: configurable(true, {
                label: "接收通知",
                group: "settings",
                widget: "switch",
            }),
            theme: configurable("light", {
                label: "主题偏好",
                group: "settings",
                widget: "radio",
                choices: [
                    { label: "浅色", value: "light" },
                    { label: "深色", value: "dark" },
                    { label: "自动", value: "auto" },
                ],
            }),
        },
    };

    /** 分组容器模式 */
    groupMode: "tabs" | "collapse" = "tabs";
    /** 标签页方向（仅 tabs 模式） */
    tabDirection: "top" | "bottom" | "left" | "right" = "top";
    /** 折叠面板手风琴模式：同时只展开一个面板（仅 collapse 模式） */
    accordion = false;

    /** 第一个分组表单的实时状态 JSON（由 watch 订阅刷新） */
    @state()
    stateJson = "";

    private unwatch?: Watcher;

    connectedCallback(): void {
        super.connectedCallback();
        // 等首个 auto-form 完成内部 store 初始化后再订阅
        setTimeout(() => this._startWatch());
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.unwatch?.off();
    }

    /** 订阅首个分组表单的内部 store：字段编辑经响应式写入，状态 JSON 实时刷新 */
    private _startWatch() {
        const form = this.renderRoot.querySelector("auto-form");
        const store = (form as any)?.activeStore;
        if (!store) return;
        this.stateJson = JSON.stringify(store.state, null, 2);
        this.unwatch = store.watch(() => {
            this.stateJson = JSON.stringify(store.state, null, 2);
        });
    }

    /** 渲染四个分组表单：传入共享状态定义，各自按 group 过滤字段 */
    private _renderGroupForms() {
        return GROUPS.map(
            (g) => html`<auto-form
                .state="${this.userState}"
                name="${g.name}"
                group="${g.name}"
                label="${g.label}"
                icon="${g.icon}"
            ></auto-form>`,
        );
    }

    private _setMode(mode: "tabs" | "collapse") {
        this.groupMode = mode;
        this.requestUpdate();
    }

    private _setDirection(direction: "top" | "bottom" | "left" | "right") {
        this.tabDirection = direction;
        this.requestUpdate();
    }

    private _onAccordionChange(e: Event) {
        this.accordion = (e.target as HTMLInputElement).checked;
        this.requestUpdate();
    }

    private _reset() {
        const form = this.renderRoot.querySelector("auto-form");
        (form as any)?.activeStore?.reset();
    }

    private _submit() {
        const form = this.renderRoot.querySelector("auto-form");
        const store = (form as any)?.activeStore;
        if (store) {
            alert("表单提交成功！\n" + JSON.stringify(store.state, null, 2));
        }
    }

    render() {
        const isTabs = this.groupMode === "tabs";
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">表单分组示例</h3>
                <p style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    4 个分组表单通过 .state 传入同一份状态定义：切换分组、修改任意字段，下方实时状态同步更新
                </p>

                <div
                    style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;"
                >
                    <sl-button
                        size="small"
                        variant="${isTabs ? "primary" : "neutral"}"
                        @click="${() => this._setMode("tabs")}"
                        >标签页分组</sl-button
                    >
                    <sl-button
                        size="small"
                        variant="${isTabs ? "neutral" : "primary"}"
                        @click="${() => this._setMode("collapse")}"
                        >折叠面板分组</sl-button
                    >
                    <span style="color: var(--auto-border);">|</span>
                    ${isTabs
                        ? html`
                              <span style="font-size: 0.8rem; color: var(--auto-text-light);"
                                  >标签方向</span
                              >
                              ${TAB_DIRECTIONS.map(
                                  (d) => html`
                                      <sl-button
                                          size="small"
                                          variant="${this.tabDirection === d.value
                                              ? "primary"
                                              : "neutral"}"
                                          @click="${() => this._setDirection(d.value)}"
                                          >${d.label}</sl-button
                                      >
                                  `,
                              )}
                          `
                        : html`
                              <sl-switch
                                  size="small"
                                  .checked="${this.accordion}"
                                  @sl-change="${this._onAccordionChange}"
                                  >手风琴模式（同时只展开一个）</sl-switch
                              >
                          `}
                </div>

                ${isTabs
                    ? html`
                          <auto-form-tabs
                              direction="${this.tabDirection}"
                              active="basic"
                              style="height: 480px;"
                          >
                              ${this._renderGroupForms()}
                          </auto-form-tabs>
                      `
                    : html`
                          <auto-form-collapse
                              active="basic,settings"
                              ?accordion="${this.accordion}"
                              style="height: 480px;"
                          >
                              ${this._renderGroupForms()}
                          </auto-form-collapse>
                      `}

                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <sl-button @click="${this._reset}" variant="neutral" size="small"
                        >重置</sl-button
                    >
                    <sl-button @click="${this._submit}" variant="primary" size="small"
                        >提交</sl-button
                    >
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-form-groups": FormGroupsExample;
    }
}

export default FormGroupsExample;
