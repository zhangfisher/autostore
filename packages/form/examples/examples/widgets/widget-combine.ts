/**
 * Combine 组合字段示例
 * 演示组合多种子 widget 输入一个状态值：
 * - toState 将子组件值合并成一个值
 * - toInput 将父组件值拆分给各子组件
 * - dropdown 模式（子字段在下拉面板中）与内联模式（dropdown: false）
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

/** 解析 "上 右 下 左" 形式的 padding 字符串（缺省边复用，单位取首个） */
function parsePadding(padding: string) {
    // 显式标注：unit 动态赋值（match[2]）会把字面量类型 "px" 拓宽，
    // 推导差异会沿 toInput 返回值一路放大，导致 configurable 重载失配
    const result: { top: number; right: number; bottom: number; left: number; unit: string } = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px",
    };
    const parts = padding.trim().split(/\s+/);
    const parseValue = (value: string) => {
        const match = value.match(/^(\d+)([a-z%]*)$/);
        if (!match) return 0;
        if (match[2]) result.unit = match[2];
        return Number.parseInt(match[1], 10) || 0;
    };
    switch (parts.length) {
        case 1: {
            const v = parseValue(parts[0]);
            result.top = v;
            result.right = v;
            result.bottom = v;
            result.left = v;
            break;
        }
        case 2: {
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = result.top;
            result.left = result.right;
            break;
        }
        case 3: {
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = parseValue(parts[2]);
            result.left = result.right;
            break;
        }
        case 4: {
            result.top = parseValue(parts[0]);
            result.right = parseValue(parts[1]);
            result.bottom = parseValue(parts[2]);
            result.left = parseValue(parts[3]);
            break;
        }
        default:
            break;
    }
    return result;
}

/** 解析 "192.168.0.1" 形式的 IP 字符串 */
function parseIp(ip: string) {
    return ip.split(".").map((seg) => Number.parseInt(seg, 10) || 0);
}

/** 解析 "协议://主机 开启" 形式的服务地址字符串 */
function parseEndpoint(endpoint: string) {
    const [address = "", status = ""] = endpoint.split(" ");
    const [protocol = "", rest = ""] = address.split("://");
    return { protocol, host: rest, enabled: status.includes("开启") };
}

@customElement("example-widget-combine")
class WidgetCombineExample extends LitElement {
    state = {
        form: {
            // ---- 上/右/下/左/单位 五要素完整组合：range + number + select + radio-button ----
            padding: configurable("10px 20px", {
                label: "内边距",
                widget: "combine",
                help: "上(范围)/右(数字)/下(下拉)/左(数字)/单位(按钮组) 五种子 widget 组合",
                toState: (values: any[]) =>
                    `${values[0]}${values[4]} ${values[1]}${values[4]} ${values[2]}${values[4]} ${values[3]}${values[4]}`,
                // 显式 any[]：多 widget 子项的联合类型（含 choices?:undefined 等
                // 负属性）与 Computedable 映射不兼容，会令 configurable 重载失配
                children: ([
                    {
                        name: "top",
                        label: "上",
                        widget: "range",
                        min: 0,
                        max: 100,
                        width: "50%",
                        toInput: (value: string) => parsePadding(value).top,
                    },
                    {
                        name: "right",
                        label: "右",
                        widget: "number",
                        min: 0,
                        max: 100,
                        width: "50%",
                        toInput: (value: string) => parsePadding(value).right,
                    },
                    {
                        name: "bottom",
                        label: "下",
                        widget: "select",
                        choices: [0, 5, 10, 20, 40],
                        width: "50%",
                        toInput: (value: string) => {
                            const bottom = parsePadding(value).bottom;
                            // select 选项中不存在当前值时回落到第一项
                            return [0, 5, 10, 20, 40].includes(bottom) ? bottom : 0;
                        },
                    },
                    {
                        name: "left",
                        label: "左",
                        widget: "number",
                        min: 0,
                        max: 100,
                        width: "50%",
                        toInput: (value: string) => parsePadding(value).left,
                    },
                    {
                        name: "unit",
                        label: "单位",
                        widget: "radio-button",
                        choices: ["px", "em", "rem"],
                        width: "100%",
                        toInput: (value: string) => parsePadding(value).unit,
                    },
                ] as any),
            }),
            // ---- 内联模式：dropdown=false，子字段直接展开在行内 ----
            paddingInline: configurable("8px 16px", {
                label: "内边距(内联)",
                widget: "combine",
                ...({ dropdown: false } as any),
                help: "dropdown: false，子字段不收进下拉面板，直接平铺展示",
                toState: (values: any[]) => `${values[0]}px ${values[1]}px`,
                children: ([
                    {
                        name: "top",
                        label: "上",
                        widget: "number",
                        min: 0,
                        max: 100,
                        width: "50%",
                        toInput: (value: string) => parsePadding(value).top,
                    },
                    {
                        name: "left",
                        label: "左",
                        widget: "range",
                        min: 0,
                        max: 100,
                        width: "50%",
                        toInput: (value: string) => parsePadding(value).left,
                    },
                ] as any),
            }),
            // ---- 同构 widget：四个 number 分段输入 IP 地址 ----
            ip: configurable("192.168.0.1", {
                label: "IP地址",
                widget: "combine",
                help: "四个 number 子 widget，toInput/toState 做字符串拆分与聚合",
                toState: (values: any[]) => values.join("."),
                children: ([
                    {
                        name: "seg1",
                        label: "一",
                        widget: "number",
                        min: 0,
                        max: 255,
                        width: "25%",
                        toInput: (value: string) => parseIp(value)[0],
                    },
                    {
                        name: "seg2",
                        label: "二",
                        widget: "number",
                        min: 0,
                        max: 255,
                        width: "25%",
                        toInput: (value: string) => parseIp(value)[1],
                    },
                    {
                        name: "seg3",
                        label: "三",
                        widget: "number",
                        min: 0,
                        max: 255,
                        width: "25%",
                        toInput: (value: string) => parseIp(value)[2],
                    },
                    {
                        name: "seg4",
                        label: "四",
                        widget: "number",
                        min: 0,
                        max: 255,
                        width: "25%",
                        toInput: (value: string) => parseIp(value)[3],
                    },
                ] as any),
            }),
            // ---- select + input + switch 组合：混合类型聚合为一个状态值 ----
            endpoint: configurable("https://api.example.com/v1 开启", {
                label: "服务地址",
                widget: "combine",
                help: "select + input + switch 混合类型组合，聚合为一个状态值",
                toState: (values: any[]) =>
                    `${values[0]}://${values[1]} ${values[2] ? "开启" : "关闭"}`,
                children: ([
                    {
                        name: "protocol",
                        label: "协议",
                        widget: "select",
                        choices: ["https", "http"],
                        width: "30%",
                        toInput: (value: string) => parseEndpoint(value).protocol,
                    },
                    {
                        name: "host",
                        label: "主机",
                        widget: "input",
                        width: "45%",
                        toInput: (value: string) => parseEndpoint(value).host,
                    },
                    {
                        name: "enabled",
                        label: "启用",
                        widget: "switch",
                        width: "25%",
                        toInput: (value: string) => parseEndpoint(value).enabled,
                    },
                ] as any),
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">Combine 组合字段</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    组合多种子 widget（range/number/select/radio-button/input/switch）共同输入一个状态值
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="组合字段参数演示"
                    style="min-height: 600px;"
                ></auto-form>
                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>children</code> 子字段 schema 数组，支持任意 widget</div>
                        <div><code>toState(values)</code> 将子字段值合并成一个状态值</div>
                        <div><code>toInput(value)</code> 将状态值拆分给各子字段</div>
                        <div><code>dropdown: false</code> 子字段内联平铺而非收进下拉面板</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-combine": WidgetCombineExample;
    }
}
export default WidgetCombineExample;
