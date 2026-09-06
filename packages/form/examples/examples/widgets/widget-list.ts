/**
 * 列表选择组件示例
 * 演示 list 组件的单选/多选、下拉渲染、异步候选项等参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-list")
class WidgetListExample extends LitElement {
    state = {
        form: {
            // 单选（默认平铺），候选项带 icon
            single: configurable("js", {
                label: "技能（单选）",
                widget: "list",
                choices: [
                    { label: "JavaScript", value: "js", icon: "braces" },
                    { label: "TypeScript", value: "ts", icon: "code-square" },
                    { label: "Python", value: "py", icon: "bug" },
                    { label: "Golang", value: "go", icon: "cpu" },
                    { label: "Rust", value: "rust", icon: "terminal" },
                ],
                height: "12em",
                help: "默认单选（平铺），icon 显示候选项前置图标",
            }),
            // 多选（平铺）
            languages: configurable(["js", "ts"], {
                label: "编程语言（多选）",
                widget: "list",
                multiple: true,
                choices: [
                    { label: "JavaScript", value: "js" },
                    { label: "TypeScript", value: "ts" },
                    { label: "Python", value: "py" },
                    { label: "Java", value: "java" },
                    { label: "Golang", value: "go" },
                    { label: "Rust", value: "rust" },
                    { label: "C", value: "c" },
                    { label: "C++", value: "cpp" },
                    { label: "C#", value: "csharp" },
                    { label: "Kotlin", value: "kotlin" },
                    { label: "Swift", value: "swift" },
                    { label: "PHP", value: "php" },
                    { label: "Ruby", value: "ruby" },
                    { label: "Scala", value: "scala" },
                    { label: "Dart", value: "dart" },
                    { label: "Elixir", value: "elixir" },
                    { label: "Haskell", value: "haskell" },
                    { label: "Lua", value: "lua" },
                    { label: "Perl", value: "perl" },
                    { label: "Julia", value: "julia" },
                ],
                height: "15em",
                help: "multiple 多选：勾选切换选中态；头部内置全选/反选/清空",
            }),
            // 下拉面板渲染（dropdown）
            dropdownSingle: configurable("", {
                label: "城市（下拉单选）",
                widget: "list",
                dropdown: true,
                placeholder: "请选择城市",
                choices: [
                    { label: "北京", value: "beijing", icon: "building" },
                    { label: "上海", value: "shanghai", icon: "building" },
                    { label: "广州", value: "guangzhou", icon: "building" },
                    { label: "深圳", value: "shenzhen", icon: "building" },
                    { label: "杭州", value: "hangzhou", icon: "building" },
                ],
                required: true,
                help: "dropdown: true 以输入框 + 下拉面板渲染，触发器显示已选标签",
            }),
            dropdownMultiple: configurable(["react", "vue"], {
                label: "框架（下拉多选）",
                widget: "list",
                dropdown: true,
                multiple: true,
                maxTagCount: 4,
                placeholder: "请选择框架",
                choices: [
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue" },
                    { label: "Angular", value: "angular" },
                    { label: "Svelte", value: "svelte" },
                    { label: "Solid", value: "solid" },
                    { label: "Qwik", value: "qwik" },
                ],
                help: "下拉多选：触发器以 tag 展示已选，maxTagCount=2 超出折叠为 +N",
            }),
            // 异步候选项
            asyncChoices: configurable("", {
                label: "部门（异步加载）",
                widget: "list",
                dropdown: true,
                choices: async () => {
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    return [
                        { label: "研发部", value: "dev" },
                        { label: "产品部", value: "product" },
                        { label: "设计部", value: "design" },
                        { label: "市场部", value: "marketing" },
                    ];
                },
                required: true,
                help: "choices 传异步函数，加载期间显示 loading",
            }),
            // 自定义 valueKey/labelKey + renderItem 模板
            framework: configurable("vue", {
                label: "引擎（自定义字段）",
                widget: "list",
                valueKey: "id",
                labelKey: "name",
                choices: [
                    { id: "v8", name: "V8 ⚡" },
                    { id: "spidermonkey", name: "SpiderMonkey 🕷️" },
                    { id: "javascriptcore", name: "JavaScriptCore 🍎" },
                ],
                renderItem:
                    "{name} <small style='color:var(--sl-color-neutral-400)'>（{id}）</small>",
                help: "valueKey/labelKey 指定取值与显示字段；renderItem 字符串模板以 {key} 插值自定义行内容",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">列表选择组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示列表选择的各种参数配置
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="列表选择参数演示"
                    style="min-height: 500px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>choices</code> 选项数组或异步函数</div>
                        <div><code>multiple</code> 是否多选（默认false）</div>
                        <div><code>dropdown</code> 下拉面板渲染（默认平铺）</div>
                        <div><code>valueKey</code> 取值字段名（默认"value"）</div>
                        <div><code>labelKey</code> 标签字段名（默认"label"）</div>
                        <div><code>renderItem</code> 行渲染模板或函数</div>
                        <div><code>maxTagCount</code> 触发器 tag 折叠数</div>
                        <div><code>height</code> 列表最大高度</div>
                        <div><code>icon</code> 候选项前置图标名</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-list": WidgetListExample;
    }
}

export default WidgetListExample;
