/**
 * @autostorejs/form 示例集合主入口
 * 提供动态示例加载和导航功能
 */

import "./navigation/sidebar";
import "./navigation/header";
import "./shared/form-props-panel";
import { findExampleById } from "./navigation/examples-list";

// 预加载所有示例模块
// 快速开始
import exampleSimpleForm from "./examples/form/simple-form";
import exampleValidation from "./examples/form/validation";
import exampleFieldLinkage from "./examples/form/field-linkage";
import exampleComputedFields from "./examples/form/computed-fields";
import exampleFieldWidth from "./examples/form/field-width";
import exampleFieldHelp from "./examples/form/field-help";
import exampleCustomIcons from "./examples/form/custom-icons";

// 基础组件
import exampleWidgetText from "./examples/widgets/widget-text";
import exampleWidgetNumber from "./examples/widgets/widget-number";
import exampleWidgetStepper from "./examples/widgets/widget-stepper";
import exampleWidgetPassword from "./examples/widgets/widget-password";
import exampleWidgetEmail from "./examples/widgets/widget-email";
import exampleWidgetPhone from "./examples/widgets/widget-phone";
import exampleWidgetUrl from "./examples/widgets/widget-url";
import exampleWidgetSearch from "./examples/widgets/widget-search";
import exampleWidgetTextarea from "./examples/widgets/widget-textarea";
import exampleWidgetDate from "./examples/widgets/widget-date";
import exampleWidgetRadio from "./examples/widgets/widget-radio";
import exampleWidgetCheckboxGroup from "./examples/widgets/widget-checkbox-group";
import exampleWidgetSelect from "./examples/widgets/widget-select";
import exampleWidgetSwitch from "./examples/widgets/widget-switch";
import exampleWidgetCron from "./examples/widgets/widget-cron";
import exampleWidgetActions from "./examples/widgets/widget-actions";
import exampleWidgetDatetime from "./examples/widgets/widget-datetime";
import exampleWidgetDateRange from "./examples/widgets/widget-date-range";
import exampleWidgetTime from "./examples/widgets/widget-time";
import exampleWidgetColorPicker from "./examples/widgets/widget-color-picker";
import exampleWidgetRange from "./examples/widgets/widget-range";
import exampleWidgetRating from "./examples/widgets/widget-rating";
import exampleWidgetIcons from "./examples/widgets/widget-icons";
import exampleWidgetIpAddress from "./examples/widgets/widget-ipaddress";
import exampleWidgetRadioButton from "./examples/widgets/widget-radio-button";
import exampleWidgetCheckbox from "./examples/widgets/widget-checkbox";
import exampleWidgetVerifycode from "./examples/widgets/widget-verifycode";
import exampleWidgetUpload from "./examples/widgets/widget-upload";
import exampleWidgetParts from "./examples/widgets/widget-parts";
import exampleWidgetCombine from "./examples/widgets/widget-combine";
import exampleTreeDropdown from "./examples/widgets/widget-tree-dropdown";
import exampleWidgetList from "./examples/widgets/widget-list";
import exampleWidgetCustom from "./examples/widgets/widget-custom";

// 高级组件
import exampleCascader from "./examples/widgets/cascader";
import exampleTreeSelect from "./examples/form/tree-select";
import exampleFormGroups from "./examples/form/form-groups";
import exampleNetworkConfig from "./examples/form/network-config";
import exampleDataSync from "./examples/form/data-sync";

// 示例模块映射
const exampleModules: Record<string, any> = {
    // 快速开始
    "simple-form": exampleSimpleForm,
    validation: exampleValidation,
    "field-linkage": exampleFieldLinkage,
    "computed-fields": exampleComputedFields,
    "field-width": exampleFieldWidth,
    "field-help": exampleFieldHelp,
    "custom-icons": exampleCustomIcons,
    // 基础组件
    "widget-text": exampleWidgetText,
    "widget-number": exampleWidgetNumber,
    "widget-stepper": exampleWidgetStepper,
    "widget-password": exampleWidgetPassword,
    "widget-email": exampleWidgetEmail,
    "widget-phone": exampleWidgetPhone,
    "widget-url": exampleWidgetUrl,
    "widget-search": exampleWidgetSearch,
    "widget-textarea": exampleWidgetTextarea,
    "widget-date": exampleWidgetDate,
    "widget-radio": exampleWidgetRadio,
    "widget-checkbox-group": exampleWidgetCheckboxGroup,
    "widget-select": exampleWidgetSelect,
    "widget-switch": exampleWidgetSwitch,
    "widget-cron": exampleWidgetCron,
    "widget-actions": exampleWidgetActions,
    "widget-datetime": exampleWidgetDatetime,
    "widget-date-range": exampleWidgetDateRange,
    "widget-time": exampleWidgetTime,
    "widget-color-picker": exampleWidgetColorPicker,
    "widget-range": exampleWidgetRange,
    "widget-rating": exampleWidgetRating,
    "widget-icons": exampleWidgetIcons,
    "widget-ipaddress": exampleWidgetIpAddress,
    "widget-radio-button": exampleWidgetRadioButton,
    "widget-checkbox": exampleWidgetCheckbox,
    "widget-verifycode": exampleWidgetVerifycode,
    "widget-upload": exampleWidgetUpload,
    "widget-parts": exampleWidgetParts,
    "widget-combine": exampleWidgetCombine,
    // 高级组件
    cascader: exampleCascader,
    "tree-select": exampleTreeSelect,
    "tree-dropdown": exampleTreeDropdown,
    "widget-list": exampleWidgetList,
    "widget-custom": exampleWidgetCustom,
    "form-groups": exampleFormGroups,
    "network-config": exampleNetworkConfig,
    "data-sync": exampleDataSync,
};

// 示例管理器
class ExampleManager {
    private currentExampleId: string | null = null;
    private loadedExamples: Set<string> = new Set();

    async loadExample(exampleId: string): Promise<boolean> {
        try {
            const exampleInfo = findExampleById(exampleId);
            if (!exampleInfo) {
                console.error(`示例不存在: ${exampleId}`);
                return false;
            }
            this.clearCurrentExample();
            this.updateHeader(exampleInfo);
            if (exampleModules[exampleId]) {
                this._renderExample(exampleModules[exampleId], exampleInfo);
                this.currentExampleId = exampleId;
                this.loadedExamples.add(exampleId);
                return true;
            } else {
                this.showError(`示例模块不存在: ${exampleId}`);
                return false;
            }
        } catch (error) {
            console.error("加载示例时发生错误:", error);
            this.showError("加载示例时发生错误");
            return false;
        }
    }

    private clearCurrentExample(): void {
        const container = document.querySelector("#example-content");
        if (container) {
            container.innerHTML = `
                <div class="loading-state">
                    <sl-spinner></sl-spinner>
                    <span style="margin-left: 1rem;">加载中...</span>
                </div>
            `;
        }
        const oldExample = document.querySelector("[data-active-example]");
        if (oldExample) {
            oldExample.removeAttribute("data-active-example");
        }
    }

    private _renderExample(ExampleClass: any, exampleInfo: any): void {
        const container = document.querySelector("#example-content");
        if (!container) return;
        const tagName = `example-${exampleInfo.id}`;
        const customElement = customElements.get(tagName);
        if (!customElement) {
            this.showError(`示例组件未注册: ${tagName}`);
            return;
        }
        const instance = new ExampleClass();
        instance.setAttribute("data-active-example", "true");
        container.innerHTML = "";
        container.appendChild(instance);
        // 示例渲染后，将全局属性面板绑定到该示例内的 auto-form
        this._bindPropsPanel(instance);
    }

    /**
     * 将全局属性面板绑定到当前示例中的 auto-form
     *
     * 示例是 Lit 组件，auto-form 在其 shadowRoot 内且渲染有先后，
     * 轮询等待目标元素出现后再绑定（最多 ~2s）
     */
    private _bindPropsPanel(example: HTMLElement): void {
        const panel = document.querySelector("#global-props-panel") as any;
        if (!panel) return;
        let retries = 0;
        const tryBind = () => {
            const form = example.shadowRoot?.querySelector("auto-form");
            if (form) {
                panel.setTarget(form);
            } else if (retries++ < 20) {
                setTimeout(tryBind, 100);
            }
        };
        tryBind();
    }

    private updateHeader(exampleInfo: any): void {
        const header = document.querySelector("#header") as any;
        if (header && typeof header.currentExampleTitle !== "undefined") {
            header.currentExampleTitle = String(exampleInfo.title || "");
            header.currentExampleDescription = String(exampleInfo.description || "");
        }
    }

    private showError(message: string): void {
        const container = document.querySelector("#example-content");
        if (container) {
            container.innerHTML = `
                <div class="loading-state" style="color: var(--sl-color-danger-500);">
                    <sl-icon name="exclamation-triangle" style="font-size: 2rem;"></sl-icon>
                    <div style="margin-top: 1rem;">${message}</div>
                    <div style="margin-top: 1rem;">
                        <sl-button variant="primary" onclick="location.reload()">重新加载</sl-button>
                    </div>
                </div>
            `;
        }
    }
}

const exampleManager = new ExampleManager();

/**
 * 初始化右侧属性面板的折叠与拖拽调宽交互
 *
 * 宽度单一数据源是 .app-container 上的 --panel-w 变量：
 * aside 宽度与折叠按钮位置都引用它，拖拽/折叠时按钮自动跟随
 */
function setupPropsPanelResizer(): void {
    const container = document.querySelector(".app-container") as HTMLElement | null;
    const aside = document.querySelector("#props-panel-aside") as HTMLElement | null;
    const resizer = document.querySelector("#panel-resizer") as HTMLElement | null;
    const toggleBtn = document.querySelector("#panel-toggle") as HTMLElement | null;
    if (!container || !aside || !resizer || !toggleBtn) return;

    const MIN_WIDTH = 280;
    const MAX_WIDTH = 640;
    let lastWidth = 360;

    const setWidth = (width: number) => {
        const clamped = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width));
        lastWidth = clamped;
        container.style.setProperty("--panel-w", `${clamped}px`);
    };

    const isCollapsed = () => container.classList.contains("panel-collapsed");

    /** 折叠/展开：切换容器类，按钮图标与语义随之翻转 */
    const toggle = () => {
        const collapsed = !isCollapsed();
        container.classList.toggle("panel-collapsed", collapsed);
        // 宽度归零/恢复须写 inline 变量：拖拽产生的 inline --panel-w 优先级高于类规则
        container.style.setProperty("--panel-w", collapsed ? "0px" : `${lastWidth}px`);
        const icon = toggleBtn.querySelector("sl-icon");
        if (icon) {
            icon.setAttribute("name", collapsed ? "chevron-left" : "chevron-right");
        }
        toggleBtn.title = collapsed ? "展开属性面板" : "折叠面板";
    };

    toggleBtn.addEventListener("click", toggle);

    resizer.addEventListener("mousedown", (e: MouseEvent) => {
        if (isCollapsed()) return;
        e.preventDefault();
        aside.classList.add("resizing");
        // 拖拽期间给 body 加禁用选择，避免选中文本
        document.body.style.userSelect = "none";
        const startX = e.clientX;
        const startWidth = aside.getBoundingClientRect().width;

        const onMouseMove = (ev: MouseEvent) => {
            // 面板在右缘，向左拖增宽
            setWidth(startWidth + (startX - ev.clientX));
        };
        const onMouseUp = () => {
            aside.classList.remove("resizing");
            document.body.style.userSelect = "";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // 双击手柄恢复默认宽度
    resizer.addEventListener("dblclick", () => setWidth(360));
}

setupPropsPanelResizer();

const exampleSelectedHandler = (event: Event) => {
    const customEvent = event as CustomEvent<{ exampleId: string }>;
    const { exampleId } = customEvent.detail;
    if (exampleId) {
        exampleManager.loadExample(exampleId);
        const sidebar = document.querySelector("examples-sidebar") as any;
        if (sidebar) {
            sidebar.setCurrentExample(exampleId);
        }
        if (window.innerWidth <= 768) {
            const sidebarEl = document.querySelector("examples-sidebar");
            if (sidebarEl) {
                sidebarEl.classList.remove("open");
            }
        }
    }
};

document.addEventListener("example-selected", exampleSelectedHandler);

setTimeout(() => {
    const firstExample = findExampleById("simple-form");
    if (firstExample) {
        exampleManager.loadExample("simple-form");
    }
}, 100);

(window as any).exampleManager = exampleManager;
