import { AutoStore } from "autostore";
import { AutoTemplateEngine } from "../engine";

/**
 * 测试基础设施（纯函数，无副作用；全局 DOM 注册请在各测试文件显式 `import "./setup"`）。
 */

/** 等待 microtask + 一个宏任务，确保 scheduler 的 queueMicrotask flush 已执行 */
export const nextTick = () => new Promise<void>((r) => setTimeout(r, 0));

/** 把 HTML 挂到一个 detached 容器并启动引擎（autostart 默认 true） */
export function mount(html: string, state: any) {
    const root = document.createElement("div");
    root.innerHTML = html.trim();
    const store = new AutoStore(state);
    const engine = new AutoTemplateEngine(root, store);
    return { root, store, engine };
}

// formatHTML 单独放 ./format（不 import engine），便于 setup.ts 早期注册 matcher
// 而不牵连 engine 模块求值顺序。
export { formatHTML } from "./format";
