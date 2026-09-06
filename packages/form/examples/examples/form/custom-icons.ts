/**
 * 自定义图标示例
 * 演示如何通过 registerIcons 自定义图标库：
 * 1. 注册本地图标（内联 SVG，离线可用，优先命中）
 * 2. 切换远程图标源（{name} 占位符的 URL 模板）
 * 3. 在字段上使用图标：icon 前缀、icons 候选集、操作按钮
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import { registerIcons } from "../../../src";

// ====================================================================
// 核心：调用 registerIcons 自定义图标库
//
// registerIcons(url, icons)
//   - url:   远程图标源模板，必须包含 {name} 占位符。
//            未命中本地图标时按此 URL 按需加载（示例换成了 jsdelivr CDN）
//   - icons: 本地图标集，键为图标名，值为 SVG 字符串。
//            命中本地图标时编码为 dataURL 直接渲染，不发网络请求
//
// 解析优先级：本地图标集（与内置预设同表，同名覆盖）> 远程 URL 模板
// ====================================================================
registerIcons("https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{name}.svg", {
    // 自定义图标：任意 SVG 字符串（stroke=currentColor 使图标跟随文字颜色）
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    palette: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    // 也可以覆盖内置预设图标（同名键直接覆盖）
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6L8 13.6l-6-4.4h7.6z"/></svg>`,
});

@customElement("example-custom-icons")
class CustomIconsExample extends LitElement {
    state = {
        form: {
            // ---- 1. icon：输入框前缀图标（使用上面注册的自定义图标） ----
            keyword: configurable("", {
                label: "搜索",
                widget: "search",
                icon: "rocket",
                help: "icon: 'rocket' 输入框前缀图标（本地内联 SVG，无网络请求）",
            }),
            // ---- 2. 注册即用：star 来自上面的本地图标集（实心五角星） ----
            favorite: configurable("", {
                label: "收藏",
                widget: "input",
                icon: "star",
                help: "star 来自 registerIcons 注册的本地图标集",
            }),
            // ---- 3. icons widget：候选集引用自定义图标 ----
            theme: configurable("palette", {
                label: "界面主题图标",
                widget: "icons",
                icons: "palette,rocket,heart,star",
                builtIn: false,
                help: "icons 候选集全部来自 registerIcons 注册的本地图标",
            }),
            // ---- 4. 远程图标源：未命中本地图标时按 URL 模板加载 ----
            remoteIcon: configurable("", {
                label: "远程图标",
                widget: "input",
                icon: "settings",
                help: "settings 未在本地图标集中，按 URL 模板从 jsdelivr 按需加载",
            }),
            // ---- 5. 操作按钮图标：actions 的 icon（pos: 'before' 前置） ----
            username: configurable("", {
                label: "用户名",
                widget: "input",
                icon: "user",
                actions: [
                    // @ts-expect-error pos/type 是 form 层动作扩展键，core AutoStoreAction 未收录
                    { icon: "palette", label: "调色", pos: "before" },
                    { icon: "heart", label: "收藏" },
                    { icon: "rocket", label: "部署" },
                ],
                help: "操作按钮的 icon 同样来自图标库",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">自定义图标</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    通过 <code>registerIcons(url, icons)</code> 注册本地图标与远程图标源
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="自定义图标演示"
                    style="min-height: 400px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">🧩 如何自定义图标</h4>
                    <ol style="margin: 0; padding-left: 1.5rem; line-height: 2;">
                        <li>
                            应用启动时调用一次
                            <code>registerIcons(url, icons)</code>（本示例在文件顶部）：
                            <code>icons</code> 是「图标名 → SVG 字符串」的本地图标集；
                            <code>url</code> 是含 <code>{name}</code> 占位符的远程模板
                        </li>
                        <li>
                            解析优先级：<strong>本地图标集（同名覆盖内置预设）&gt; 远程 URL</strong>。
                            本地图标编码为 dataURL 直接渲染，离线可用
                        </li>
                        <li>
                            SVG 建议 <code>stroke="currentColor"</code>，图标自动跟随文字/主题颜色
                        </li>
                        <li>
                            注册后在配置中按名称引用：<code>icon: 'rocket'</code>（输入框前缀）、
                            <code>icons: 'palette,rocket'</code>（图标选择候选集）、
                            操作按钮的 <code>action.icon</code>
                        </li>
                    </ol>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-custom-icons": CustomIconsExample;
    }
}

export default CustomIconsExample;
