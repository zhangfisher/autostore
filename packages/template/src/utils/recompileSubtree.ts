import type { AutoTemplateScope } from "../scope";

/**
 * 重编译指定 scope 的子树（以 `scope.template` 当前内容为源）。
 *
 * 提取自 engine 的私有 `_recompileSubtree`，供 `engine.data` / `engine.patch` / `x-html.compile`
 * 复用同一套子树重建逻辑（DRY）：
 *  1. 递归销毁旧子 scope（off watcher + 移出 parent.children；destroy 不删 DOM，下面统一清）
 *  2. 清空 el 子 DOM（旧渲染节点）
 *  3. 用 `scope.template` 重新编译子节点挂到 el（建新 scope + created 订阅 + compile 首渲）
 *  4. `flushAll` 消化编译期 schedule 的首次渲染（如嵌套 x-for）
 *
 * **无 try-catch**：编译期抛错冒泡由调用方处理。抛错时前两步已执行（旧子树已 destroy、el 已清空），
 * el 保持清空——调用方据此决定姿态（`engine.patch._replaceSelf` 与 `x-html.compile` 各自包 try-catch）。
 *
 * 调用前调用方可任意修改 `scope.template`（如 `x-html.compile` 写入注入 HTML），本函数按其当前
 * 内容重编译。注意：`scope.template` 是 `engine.template` 共享模板树的元素，修改即污染该树
 * （`engine.patch` 同理，属命令式改模板的既定语义，详见 ADR-0017）。
 *
 * @param scope 子树根 scope（其 `template` 作编译源、其 `children` 被销毁重建）
 * @param el    `scope.el`，子节点挂载目标（一般传 `scope.el`）
 */
export function recompileSubtree(scope: AutoTemplateScope, el: HTMLElement): void {
    const engine = scope.engine;
    // 1. 销毁旧子 scope（递归 off watcher；destroy 不删 DOM，下面统一清）
    for (const child of scope.children) child.destroy();
    scope.children.clear();
    // 2. 清空 el 的子 DOM（旧渲染节点）
    el.replaceChildren();
    // 3. 用原始模板重新编译子节点挂到 el（建新 scope + created 订阅 + compile 首渲）
    const template = scope.template;
    if (template) {
        engine.compiler.compileSubtree(el, template, scope);
        // 4. 消化编译期 schedule 的首次渲染（如嵌套 x-for）
        engine.scheduler.flushAll();
    }
}
