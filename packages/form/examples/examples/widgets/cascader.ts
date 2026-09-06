/**
 * 级联选择器示例
 * 演示级联选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

// 模拟异步加载：入参为父节点 value，返回其子节点
// 第一级（parentValue 为空）提供省级，其余按需提供市/区级
function asyncLoadChildren(parentValue?: string): Promise<any[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (parentValue === "fujian") {
                resolve([
                    { label: "福州市", value: "350100" },
                    { label: "泉州市", value: "350500" },
                ]);
            } else if (parentValue === "guangdong") {
                resolve([{ label: "深圳市", value: "440300" }]);
            } else if (parentValue === "350100") {
                resolve([
                    { label: "鼓楼区", value: "350102" },
                    { label: "台江区", value: "350103" },
                ]);
            } else if (parentValue === "350500") {
                resolve([
                    { label: "丰泽区", value: "350503" },
                    { label: "鲤城区", value: "350505" },
                    { label: "洛江区", value: "350504" },
                ]);
            } else if (parentValue === "440300") {
                resolve([
                    { label: "南山区", value: "440305" },
                    { label: "福田区", value: "440304" },
                    { label: "罗湖区", value: "440303" },
                ]);
            } else {
                // 无父节点：首级（省级）
                resolve([
                    { label: "福建省", value: "fujian" },
                    { label: "广东省", value: "guangdong" },
                ]);
            }
        }, 300);
    });
}

// 自定义键名的品牌数据：id/name/models
const cars = [
    {
        id: "bmw",
        name: "宝马",
        models: [
            { id: "3series", name: "3系" },
            { id: "5series", name: "5系" },
            { id: "x5", name: "X5" },
        ],
    },
    {
        id: "benz",
        name: "奔驰",
        models: [
            { id: "cclass", name: "C级" },
            { id: "eclass", name: "E级" },
            { id: "glc", name: "GLC" },
        ],
    },
    {
        id: "audi",
        name: "奥迪",
        models: [
            { id: "a4", name: "A4" },
            { id: "a6", name: "A6" },
            { id: "q5", name: "Q5" },
        ],
    },
];

@customElement("example-cascader")
class CascaderExample extends LitElement {
    state = {
        form: {
            // 基础级联：value+label+children 数据，idKey/valueKey 指向 value
            city: configurable("", {
                label: "选择城市",
                widget: "cascader",
                placeholder: "请选择省-市-区",
                idKey: "value",
                choices: [
                    {
                        label: "福建省",
                        value: "fujian",
                        children: [
                            {
                                label: "福州市",
                                value: "350100",
                                children: [
                                    { label: "鼓楼区", value: "350102" },
                                    { label: "台江区", value: "350103" },
                                ],
                            },
                            {
                                label: "泉州市",
                                value: "350500",
                                children: [
                                    { label: "丰泽区", value: "350503" },
                                    { label: "鲤城区", value: "350505" },
                                    { label: "洛江区", value: "350504" },
                                ],
                            },
                        ],
                    },
                    {
                        label: "广东省",
                        value: "guangdong",
                        children: [
                            {
                                label: "深圳市",
                                value: "440300",
                                children: [
                                    { label: "南山区", value: "440305" },
                                    { label: "福田区", value: "440304" },
                                    { label: "罗湖区", value: "440303" },
                                ],
                            },
                        ],
                    },
                ],
                icon: "map-pin",
                help: "基础级联选择，自定义图标",
            }),
            // 异步加载：choices 提供首级，onLoad 按需加载下级
            asyncCity: configurable("", {
                label: "异步加载",
                widget: "cascader",
                placeholder: "异步加载数据",
                idKey: "value",
                choices: asyncLoadChildren,
                onLoad: asyncLoadChildren,
                delimiter: " / ",
                help: "异步加载 + 自定义分隔符",
            }),
            // 自定义键名：id/name/models + 两级
            customKeys: configurable("", {
                label: "自定义键名",
                widget: "cascader",
                placeholder: "请选择",
                choices: cars,
                idKey: "id",
                labelKey: "name",
                childrenKey: "models",
                maxLevel: 2,
                help: "自定义键名（id/name/models）+ 两层级联",
            }),
            // 必填
            requiredCascader: configurable("", {
                label: "必填级联",
                widget: "cascader",
                required: true,
                placeholder: "请选择",
                choices: cars,
                idKey: "id",
                labelKey: "name",
                childrenKey: "models",
                maxLevel: 2,
                help: "必填级联选择",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">级联选择器</h3>
                <p
                    style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                >
                    演示级联选择器的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="级联选择参数演示"
                    style="min-height: 500px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-cascader": CascaderExample;
    }
}
export default CascaderExample;
