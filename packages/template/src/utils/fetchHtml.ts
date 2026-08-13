/**
 * 公共远程 HTML 加载工具（ADR-0022 决策六-2，供 x-slot remote 与 x-import 共用 fetch 逻辑）。
 *
 * fetch url 得 HTML 文本，支持 AbortSignal 中止（url 变化 / scope 销毁时 abort 丢弃过期结果）。
 * 失败抛错（HTTP 非 2xx 或网络错误），由调用方 try-catch 记日志 + 降级（warn + 视为未注册 / 错误占位）。
 *
 * **url 缓存**由调用方各自管理（x-import 按 url 缓存解析出的组件定义；x-slot 不缓存——每次 url 变化重建 child engine）。
 *
 * @param url    目标 url
 * @param signal 可选中止信号
 * @returns HTML 文本
 * @throws HTTP 非 2xx / 网络错误 / abort（abort 时调用方应静默丢弃，非真错误）
 */
export async function fetchHtml(url: string, signal?: AbortSignal): Promise<string> {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
}
