/**
 * 级联选择器示例
 * 演示级联选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

// 模拟异步加载
function asyncLoadData(parentValue: string): Promise<any[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (parentValue === "fujian") {
                resolve([
                    { label: "福州市", value: "350100", children: [
                        { label: "鼓楼区", value: "350102" },
                        { label: "台江区", value: "350103" },
                    ]},
                    { label: "泉州市", value: "350500", children: [
                        { label: "丰泽区", value: "350503" },
                        { label: "鲤城区", value: "350505" },
                        { label: "洛江区", value: "350504" },
                    ]},
                ]);
            } else if (parentValue === "guangdong") {
                resolve([
                    { label: "深圳市", value: "440300", children: [
                        { label: "南山区", value: "440305" },
                        { label: "福田区", value: "440304" },
                        { label: "罗湖区", value: "440303" },
                    ]},
                ]);
            } else {
                resolve([
                    { label: "福建省", value: "fujian" },
                    { label: "广东省", value: "guangdong" },
                ]);
            }
        }, 300);
    });
}

const cars = [
    { label: "宝马", value: "bmw", children: [
        { label: "3系", value: "3series" },
        { label: "5系", value: "5series" },
        { label: "X5", value: "x5" },
    ]},
    { label: "奔驰", value: "benz", children: [
        { label: "C级", value: "cclass" },
        { label: "E级", value: "eclass" },
        { label: "GLC", value: "glc" },
    ]},
    { label: "奥迪", value: "audi", children: [
        { label: "A4", value: "a4" },
        { label: "A6", value: "a6" },
        { label: "Q5", value: "q5" },
    ]},
];

@customElement("example-cascader")
class CascaderExample extends LitElement {
    state = {
        form: {
            // 基础级联
            city: configurable("", {
                label: "选择城市",
                widget: "cascader",
                placeholder: "请选择省-市-区",
                choices: [
                    { label: "福建省", value: "fujian", children: [
                        { label: "福州市", value: "350100", children: [
                            { label: "鼓楼区", value: "350102" },
                            { label: "台江区", value: "350103" },
                        ]},
                        { label: "泉州市", value: "350500", children: [
                            { label: "丰泽区", value: "350503" },
                            { label: "鲤城区", value: "350505" },
                            { label: "洛江区", value: "350504" },
                        ]},
                    ]},
                    { label: "广东省", value: "guangdong", children: [
                        { label: "深圳市", value: "440300", children: [
                            { label: "南山区", value: "440305" },
                            { label: "福田区", value: "440304" },
                            { label: "罗湖区", value: "440303" },
                        ]},
                    ]},
                ],
                icon: "map-pin",
                help: "基础级联选择，自定义图标",
            }),
            // 异步加载
            asyncCity: configurable("", {
                label: "异步加载",
                widget: "cascader",
                placeholder: "异步加载数据",
                choices: asyncLoadData,
                delimiter: " / ",
                help: "异步加载 + 自定义分隔符",
            }),
            // 自定义键名 + 最大层级
            customKeys: configurable("", {
                label: "自定义键名",
                widget: "cascader",
                placeholder: "请选择",
                choices: cars,
                maxLevel: 3,
                help: "异步加载 + 自定义键名 + 最大层级",
            }),
            // 必填
            requiredCascader: configurable("", {
                label: "必填级联",
                widget: "cascader",
                required: true,
                placeholder: "请选择",
                choices: cars,
                help: "必填级联选择",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    @query("#state-viewer")
    stateViewer?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (this.store) {
                this.store.watch(() => {
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
                    }
                });
                this._syncInitialState();
            }
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">级联选择器</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示级联选择器的各种参数配置
                    </p>
                    <auto-form .state="${this.state}" data-label="级联选择参数演示" style="min-height: 500px;"></auto-form>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 0;">
                    <form-props-panel id="props-panel"></form-props-panel>
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                        <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                    </div>
                </div>
            </div>
        `;
    }

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-cascader": CascaderExample; } }
export default CascaderExample;
